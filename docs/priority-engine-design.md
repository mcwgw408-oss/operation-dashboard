# Priority Engine Design

Status: Epic 2 / Task 2.1 design document

This document defines the design for the Sakura AI Brain Priority Engine.

The Priority Engine is a read-only reasoning layer. It decides which item should be shown as the top priority and explains why that item was selected.

This document is design-only. It does not change application code, localStorage data, snapshot format, or UI behavior.

## 1. Purpose

Sakura AI Brain should not only show a priority. It should also explain the reason behind that priority.

The Priority Engine exists to answer:

- What should be looked at first today?
- Why did this item outrank the others?
- Which signals influenced the decision?
- How confident is the recommendation?
- What could the user adjust if the recommendation feels wrong?

The engine must preserve user agency. It should present priorities as explainable suggestions, not commands.

## 2. Priority Score Concept

Each candidate item receives a `priorityScore`.

A candidate can come from:

- Today's tasks in `operation-dashboard`.
- Daily tasks.
- Active projects.
- Later items.
- Persistent memos.
- Fermenting discoveries.
- Open Hasshin observation next actions.
- Writing items in progress.
- Revisit signals from Koryu records.

The score is a weighted sum of visible signals.

The engine should keep three outputs separate:

- `score`: numeric value used for ordering.
- `reasons`: structured reasons that contributed to the score.
- `explanation`: human-readable text generated from the reasons.

This separation is important because the UI and future AI agent can explain a decision without relying on hidden or unstructured logic.

## 3. Candidate Shape

The internal candidate shape can be:

```json
{
  "id": "source-specific-id",
  "source": "operation-dashboard.todayTasks",
  "title": "Write article draft",
  "status": "open",
  "createdAt": "2026-07-03T08:00:00.000Z",
  "updatedAt": "2026-07-03T10:00:00.000Z",
  "dueDate": null,
  "priorityFlag": true,
  "ageDays": 2,
  "stalenessDays": 1,
  "score": 86,
  "reasons": []
}
```

Candidate fields should be normalized from existing app data. Missing fields should remain missing or null. The engine must not invent due dates, emotional states, or urgency.

## 4. Point Rules

The first version should use simple, inspectable rules.

| Signal | Points | Meaning |
|---|---:|---|
| Explicit priority flag | +40 | User marked this as important. |
| Today's task | +30 | User placed it in today's work area. |
| Daily task still open | +20 | Routine task remains incomplete. |
| Active project item | +16 | Ongoing project needs attention. |
| Open Hasshin next action | +18 | There is an explicit creative next step. |
| Writing item in progress | +18 | Work is already underway and may benefit from continuation. |
| Fermenting idea | +12 | Idea may be ready for review, but should not outrank explicit tasks by default. |
| Later item still open | +8 | Useful backlog item, lower urgency. |
| Persistent memo recently updated | +8 | User touched it recently, may contain live context. |
| Revisit person signal | +10 | Relationship follow-up may be worth noticing. |
| Updated today | +8 | Recent activity increases relevance. |
| Older than 7 days and still open | +6 | Stale open loop. |
| Older than 30 days and still open | +10 | Long-running open loop. |
| Completed item | -100 | Completed items should not become top priorities. |
| Missing title | -20 | Hard to act on or explain. |

The score should be clamped to a practical range such as `0..100` for display, while retaining raw score internally if useful for debugging.

## 5. Weighting

The default weighting should favor explicit user intent over inferred signals.

Recommended weight order:

1. Explicit priority flag.
2. Today's task placement.
3. Open status.
4. Time sensitivity or staleness.
5. Creative continuation.
6. Backlog cleanup.
7. Relationship revisit.

This means:

- A task explicitly placed in "today" should usually outrank a fermenting idea.
- A priority-marked project can outrank a routine daily task.
- A stale item should rise, but not automatically dominate the day.
- Relationship and idea signals should be visible without becoming pressure.

### Example Default Weights

```json
{
  "explicitPriority": 40,
  "todayTask": 30,
  "dailyTask": 20,
  "project": 16,
  "hasshinNextAction": 18,
  "writingInProgress": 18,
  "fermentingIdea": 12,
  "laterItem": 8,
  "persistentMemo": 8,
  "revisitPerson": 10,
  "updatedToday": 8,
  "staleSevenDays": 6,
  "staleThirtyDays": 10,
  "completedPenalty": -100,
  "missingTitlePenalty": -20
}
```

These weights should be configurable later, but fixed and documented in the first implementation.

## 6. Energy Modifier

The Brain should not decide only from `priorityScore`.

The same candidate can be a good recommendation on a day when the user can push forward, and too heavy on a day when recovery should come first. For that reason, the engine should consider the user's current energy state as an `energyModifier`.

Energy does not replace the Priority Score. It is a modifier applied after the base score is calculated, and it should also influence the explanation.

Initial energy states:

- `High Energy`
- `Normal`
- `Low Energy`
- `Recovery`

Initial modifier examples:

| Energy State | Modifier | Meaning |
|---|---:|---|
| `High Energy` | +10 | The user may be able to take on a larger or more demanding item. |
| `Normal` | 0 | No adjustment. Use the base score as-is. |
| `Low Energy` | -15 | Prefer smaller, clearer, lower-friction actions. |
| `Recovery` | -30 | Avoid heavy recommendations unless explicitly marked urgent or important. |

The purpose is to distinguish between:

- "今日は頑張れる日"
- "今日は無理しない方がいい日"

The modifier should be applied conservatively. A low-energy state should not hide important items, but it can change the suggested action from "finish this" to "touch this for five minutes" or "prepare the next step only."

Example:

```json
{
  "baseScore": 86,
  "energyState": "Low Energy",
  "energyModifier": -15,
  "adjustedScore": 71,
  "energyExplanation": "今日はエネルギーが低めなので、完了ではなく短時間の着手を提案します。"
}
```

## 7. Momentum Modifier

The Brain should also consider current momentum.

Momentum describes whether a flow is building, stable, or declining. It is useful for creative work, writing, relationship follow-up, and recurring operations.

Example momentum signals:

- Work has been progressing across consecutive days.
- Articles are being written continuously.
- Exchanges or relationship touchpoints are continuing.
- A task or project has stopped midway.

Initial momentum states:

- `Rising`
- `Stable`
- `Declining`

Momentum can affect ranking through a separate `momentumModifier`, but it should also be available to explanation generation.

Example interpretation:

| Momentum State | Suggested Use |
|---|---|
| `Rising` | Continue the current flow if it is not harmful or overloaded. |
| `Stable` | Keep the recommendation neutral and grounded in the base score. |
| `Declining` | Suggest a restart step, closure step, or gentle review instead of a large push. |

The goal is to support suggestions such as:

- "今日は流れがあるので続けよう"
- "今日は一区切りついたので休もう"
- "途中で止まっているので、再開の準備だけしよう"

Momentum should not silently override the Priority Score. It should be represented as structured context:

```json
{
  "momentumState": "Rising",
  "momentumModifier": 8,
  "momentumReason": "執筆中の記事が連続して更新されています。",
  "explanationHint": "流れがあるため、続きから進める候補として表示しています。"
}
```

When Energy and Momentum conflict, Energy should protect the user from overcommitment. For example, `Rising` momentum with `Recovery` energy should produce a gentle continuation or rest suggestion, not a heavy push.

## 8. Tie-Breaking

When scores are equal or close, the engine should use deterministic tie-breakers.

Recommended tie-break order:

1. Explicit priority flag.
2. Source order: today tasks, daily tasks, projects, writing, Hasshin next actions, discoveries, later items, memos, revisit people.
3. Most recently updated.
4. Oldest created date.
5. Original order in source list.

Tie-breaking must be stable. The same input should produce the same output.

## 9. Explanation Generation Rules

The explanation should be generated from structured reasons.

It should avoid vague statements such as:

- "AI thinks this is important."
- "This is best."
- "You should do this."

It should use concrete visible signals:

- "今日やることに入っています。"
- "優先マークが付いています。"
- "未完了のまま残っています。"
- "執筆中の記事です。"
- "発信観察に次アクションが残っています。"

Energy and Momentum may also contribute explanation hints:

- "今日はエネルギーが低めなので、短時間の着手として提案しています。"
- "流れが続いているため、続きを進める候補として表示しています。"
- "一区切りついているため、今日は休む選択も候補に入ります。"

### Explanation Shape

The engine can generate:

```json
{
  "title": "Write article draft",
  "score": 86,
  "adjustedScore": 71,
  "confidence": "medium",
  "summary": "今日やることに入っていて、優先マークも付いているため最初に表示しています。ただし今日はエネルギーが低めなので、完了ではなく短時間の着手を提案します。",
  "reasons": [
    "今日やることに入っています。",
    "優先マークが付いています。",
    "まだ完了していません。"
  ],
  "modifiers": [
    "Low Energy のため -15 補正しています。",
    "Rising Momentum のため、流れを活かせる候補です。"
  ],
  "gentleAction": "まず5分だけ着手するのがおすすめです。"
}
```

### Explanation Text Rules

The explanation should:

- Mention at most 2 or 3 strongest reasons.
- Use "表示しています", "候補です", "おすすめです" rather than commands.
- Say when confidence is low.
- Say when data is missing.
- Mention Energy or Momentum only when it changes the recommendation meaningfully.
- Avoid emotional interpretation unless the user explicitly wrote it.
- Avoid judging the user for incomplete items.

### Confidence Rules

| Confidence | Condition |
|---|---|
| `high` | Clear explicit priority or today's task with multiple supporting signals. |
| `medium` | Good open candidate with one or two supporting signals. |
| `low` | Sparse data, only weak signals, or many candidates with similar scores. |

Low-confidence explanation example:

```text
目立つ優先マークはありません。未完了の今日タスクがあるため、暫定的に最初の候補として表示しています。
```

## 10. Future AI Learning Design

The first implementation should be rule-based. Future AI learning can be layered on top only after the rule-based explanation is stable.

The design should preserve these future extension points:

- Store only derived feedback with explicit consent.
- Track whether the user accepted, skipped, completed, or ignored a recommendation.
- Compare recommended priority with the user's actual next completed item.
- Learn per-source preferences, such as whether writing should outrank backlog cleanup.
- Learn preferred time-of-day patterns.
- Learn acceptable workload size.
- Learn how Energy and Momentum modifiers should be calibrated for the user.

Possible future feedback shape:

```json
{
  "candidateId": "abc",
  "source": "operation-dashboard.todayTasks",
  "recommendedAt": "2026-07-03T09:00:00.000Z",
  "rank": 1,
  "score": 86,
  "adjustedScore": 71,
  "energyState": "Low Energy",
  "momentumState": "Rising",
  "userAction": "completed",
  "actedAt": "2026-07-03T10:15:00.000Z"
}
```

Future learning should never silently override the explainable rule engine. It should adjust configurable weights or suggest new defaults that the user can inspect.

## 11. Customizable Items

The user should eventually be able to customize:

- Source priority order.
- Weight for explicit priority marks.
- Weight for today's tasks.
- Weight for stale items.
- Whether stale items should rise aggressively or gently.
- Whether writing items should be favored.
- Whether relationship revisit items should appear in daily priority.
- Energy state options and Energy Modifier values.
- Momentum state options and Momentum Modifier values.
- Maximum number of suggestions.
- Explanation tone: concise, gentle, analytical.
- Confidence threshold for showing a top recommendation.
- Whether low-confidence recommendations should ask a question instead.

Customization should be stored separately from source app data. Changing engine preferences must not mutate task, memo, discovery, writing, or relationship records.

## 12. Safety and Boundaries

The Priority Engine must remain read-only by default.

It must not:

- Modify localStorage records.
- Mark tasks done.
- Reorder source lists.
- Delete stale items.
- Create new tasks.
- Send messages.
- Publish writing.
- Infer private emotional meaning from missing or nulled fields.

The engine may:

- Read normalized snapshot data.
- Score candidate items.
- Apply Energy and Momentum modifiers.
- Generate explanations.
- Produce suggestions.
- Warn when data is sparse or stale.

## 13. Proposed Output for Sakura AI Brain Panel

The UI can show:

- Priority title.
- Short reason summary.
- Score or confidence badge, if useful.
- Top contributing reasons.
- Energy / Momentum context, when useful.
- One gentle next action.

Suggested display:

```text
今日の優先順位
Write article draft

理由:
- 今日やることに入っています。
- 優先マークが付いています。
- まだ完了していません。

状態補正:
- 今日はエネルギーが低めなので、短時間の着手として提案しています。
- 執筆の流れが続いているため、続きを進める候補として表示しています。

提案:
まず5分だけ着手する。
```

The score itself does not need to be prominent. The explanation matters more than the number.

## 14. Implementation Notes for Later Tasks

When implementation begins, the engine should be built as pure functions:

- `collectPriorityCandidates(snapshot)`
- `scorePriorityCandidate(candidate, weights)`
- `applyEnergyModifier(candidate, energyState, config)`
- `applyMomentumModifier(candidate, momentumState, config)`
- `rankPriorityCandidates(candidates, weights)`
- `explainPriorityCandidate(candidate, scoreResult)`

These functions should:

- Accept data as arguments.
- Return new objects.
- Avoid DOM access.
- Avoid localStorage access.
- Avoid mutating inputs.

This keeps the engine testable and safe for future AI agent use.

## 15. Non-Goals

This design does not define:

- A machine learning model.
- A server-side ranking service.
- A write-back mechanism.
- A full task scheduler.
- A calendar integration.
- Automatic user behavior tracking.

Those require separate consent, privacy, and implementation design.

## Operating Contract

The Priority Engine should be:

- Explainable.
- Read-only.
- Deterministic.
- User-adjustable.
- Gentle by default.
- Compatible with future AI learning.

The engine is successful when the user can understand why a priority appeared and can easily disagree with it.
