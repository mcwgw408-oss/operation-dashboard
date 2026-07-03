# Recommendation Engine Design

Status: Epic 2 / Recommendation Engine design document

This document defines the design for the Sakura AI Brain Recommendation Engine.

The Recommendation Engine receives explainable results from the Priority Engine and turns them into natural, gentle, user-facing suggestions.

This document is design-only. It does not change application code, localStorage data, snapshot format, or UI behavior.

## 1. Purpose

The Recommendation Engine exists to turn priority results into language the user can actually use.

The Priority Engine answers:

- What is the strongest candidate?
- Why was it ranked highly?
- What score, confidence, Energy, and Momentum signals affected it?

The Recommendation Engine answers:

- How should Sakura AI say this to the user?
- What action is small enough to start?
- Should Sakura AI suggest action, rest, review, or no suggestion?
- How can the suggestion stay gentle and explainable?

The Recommendation Engine should not create pressure. It should translate priority information into a short, grounded, reversible next step.

## 2. Inputs

The Recommendation Engine should receive normalized, read-only output from the Priority Engine.

Recommended input shape:

```json
{
  "topCandidate": {
    "id": "task-1",
    "source": "operation-dashboard.todayTasks",
    "sourceLabel": "今日やること",
    "title": "Write article draft",
    "score": 86,
    "adjustedScore": 71,
    "confidence": "medium",
    "reasons": [
      "今日やることに入っています。",
      "優先マークが付いています。"
    ],
    "modifiers": [
      {
        "type": "energy",
        "state": "Low Energy",
        "modifier": -15,
        "text": "今日はエネルギーが低めなので、短時間の着手として提案しています。"
      },
      {
        "type": "momentum",
        "state": "Rising",
        "modifier": 8,
        "text": "執筆の流れが続いています。"
      }
    ]
  },
  "rankedCandidates": [],
  "context": {
    "mode": "morning",
    "date": "2026-07-03",
    "energyState": "Low Energy",
    "momentumState": "Rising",
    "completedToday": 2,
    "openTodayCount": 4
  }
}
```

The Recommendation Engine should not read localStorage directly in its pure form. It should receive already-normalized data from the Priority Engine or a caller.

## 3. Outputs

The output should be structured before it is rendered as text.

Recommended output shape:

```json
{
  "kind": "start_small",
  "title": "まず5分だけ着手する",
  "message": "今日やることに入っていて、優先マークも付いています。ただし今日はエネルギーが低めなので、完了ではなく5分だけ触る提案にしています。",
  "actionText": "Write article draft を5分だけ開く",
  "reasonSummary": [
    "今日やることに入っています。",
    "優先マークが付いています。",
    "今日はエネルギーが低めです。"
  ],
  "confidence": "medium",
  "shouldSuggest": true
}
```

The UI can choose to show only:

- `title`
- `message`
- `actionText`

The additional fields remain useful for future debugging, testing, and AI learning.

## 4. Recommendation Types

The engine should classify suggestions into a small set of recommendation types.

| Type | Use Case | Example |
|---|---|---|
| `start_small` | Good candidate, but action should be small. | "5分だけ着手する" |
| `continue_flow` | Momentum is rising and energy is enough. | "続きから少し進める" |
| `review_before_action` | Candidate is stale or unclear. | "まず内容を見直す" |
| `close_loop` | Item is old or near completion. | "終わらせるか保留にするか決める" |
| `rest_first` | Recovery or low energy is dominant. | "今日は休む前提で、触るなら1分だけ" |
| `choose_one` | Many close candidates exist. | "候補から1つだけ選ぶ" |
| `no_recommendation` | Data is too sparse or suggestion may create pressure. | "今日は提案を出さない" |

The type should be deterministic for the same input.

## 5. Explanation Generation Rules

The recommendation message should be generated from:

1. The top candidate title.
2. The strongest Priority Engine reasons.
3. Confidence.
4. Energy context.
5. Momentum context.
6. Whether the suggestion is action-oriented or rest-oriented.

The explanation should be short. It should not repeat the full scoring logic unless the user asks for details.

### Message Template Examples

High confidence:

```text
「{title}」が最優先候補です。今日やることに入っていて、優先マークも付いているためです。まずここから始めるのがおすすめです。
```

Low energy:

```text
「{title}」が候補ですが、今日はエネルギーが低めです。完了を目指すより、5分だけ触るくらいで十分です。
```

Rising momentum:

```text
「{title}」は流れが続いている候補です。勢いを切らさないために、続きから少し進めるのが合いそうです。
```

Low confidence:

```text
はっきりした優先候補はまだありません。未完了の項目から、いちばん軽く触れそうなものを1つ選ぶのがおすすめです。
```

No recommendation:

```text
今は無理に提案を出さない方がよさそうです。必要なら、今日やることを1つだけ追加してから見直せます。
```

## 6. Gentle Expression Rules

The engine should use soft, non-commanding language.

Prefer:

- "おすすめです"
- "よさそうです"
- "候補です"
- "まず5分だけ"
- "完了ではなく、触るだけ"
- "今日は休む前提でも大丈夫です"

Avoid:

- "必ず"
- "すぐに"
- "やるべき"
- "遅れています"
- "失敗しています"
- "放置されています"

The message should preserve user agency:

- The user can ignore the suggestion.
- The user can choose rest.
- The user can ask for another candidate.
- The suggestion should not imply moral failure.

## 7. Cases Where No Suggestion Should Be Made

The engine should sometimes return `shouldSuggest: false`.

No suggestion should be made when:

- There is no usable candidate.
- All candidates are completed.
- Confidence is low and Energy is `Recovery`.
- The candidate has no title or meaningful label.
- The only available signals are stale and ambiguous.
- The user has explicitly chosen a rest or recovery mode.
- The recommendation would require private data that was not provided.

No-suggestion output should still be helpful:

```json
{
  "kind": "no_recommendation",
  "title": "今日は提案なし",
  "message": "今は判断材料が少ないため、無理に優先順位を出さない方がよさそうです。",
  "actionText": "必要なら、今日やることを1つだけ追加する",
  "confidence": "low",
  "shouldSuggest": false
}
```

## 8. Confidence Use

Confidence should affect how strongly the recommendation is phrased.

| Confidence | Expression Style | Behavior |
|---|---|---|
| `high` | Clear and direct, but still gentle. | Suggest one clear action. |
| `medium` | Suggestive and flexible. | Offer one action with room to adjust. |
| `low` | Cautious. | Ask the user to choose or review before acting. |

Examples:

- `high`: "まずこれから始めるのがおすすめです。"
- `medium`: "最初の候補にしてよさそうです。"
- `low`: "暫定候補です。違う感じがあれば、別の候補を選んで大丈夫です。"

Confidence should not be displayed as a technical score unless the UI has a clear reason to show it.

## 9. Relationship With Energy and Momentum

Energy and Momentum should shape the recommendation type and language.

Energy examples:

- `High Energy`: Suggest action if confidence is medium or high.
- `Normal`: Use the base recommendation.
- `Low Energy`: Suggest a smaller version of the action.
- `Recovery`: Prefer rest, review, or very small contact with the item.

Momentum examples:

- `Rising`: "continue_flow" can be selected if Energy is not Recovery.
- `Stable`: Use the top candidate normally.
- `Declining`: Suggest review, restart preparation, or closure.

Conflict rule:

If Energy and Momentum conflict, Energy should protect the user.

Example:

```text
流れはありますが、今日は回復寄りです。続けるとしても、完了ではなく下書きを開くだけで十分です。
```

## 10. Future AI Learning Design

The first implementation should be rule-based. Future AI learning can improve recommendation style only with explicit consent.

Future learning can track:

- Which recommendation types the user accepts.
- Which phrasing feels useful.
- Whether small-step suggestions lead to completion.
- Whether rest-first suggestions prevent overload.
- Whether the user prefers writing, admin, relationship, or idea work in certain contexts.
- Whether Energy and Momentum calibration needs adjustment.

Possible future feedback shape:

```json
{
  "recommendationId": "rec-2026-07-03-001",
  "candidateId": "task-1",
  "kind": "start_small",
  "confidence": "medium",
  "energyState": "Low Energy",
  "momentumState": "Rising",
  "userResponse": "accepted",
  "actedAt": "2026-07-03T10:20:00.000Z"
}
```

Future learning should not silently change behavior. It should produce inspectable preference updates such as:

- "Low Energy のときは、5分提案を優先する"
- "Rising Momentum の執筆項目を少し高めに扱う"
- "Recovery のときは提案を出さない頻度を上げる"

## 11. Safety and Boundaries

The Recommendation Engine must remain read-only by default.

It must not:

- Modify localStorage records.
- Mark tasks done.
- Add tasks.
- Delete stale items.
- Send messages.
- Publish writing.
- Record user behavior without consent.
- Call an AI API by itself.

It may:

- Receive Priority Engine results.
- Generate a recommendation object.
- Generate gentle text.
- Explain why a suggestion was made.
- Decide not to suggest anything.

## 12. Implementation Notes for Later Tasks

Recommended pure functions:

- `buildRecommendationInput(priorityResult, context)`
- `chooseRecommendationType(input)`
- `generateRecommendationMessage(input, type)`
- `buildRecommendation(input)`

These functions should:

- Accept data as arguments.
- Return new objects.
- Avoid DOM access.
- Avoid localStorage access.
- Avoid mutating inputs.

This keeps the engine testable and safe for future UI or AI-agent use.

## Operating Contract

The Recommendation Engine should be:

- Gentle.
- Explainable.
- Read-only.
- Confidence-aware.
- Energy-aware.
- Momentum-aware.
- User-controlled.

The engine is successful when the user receives a suggestion that feels usable, not pressuring.
