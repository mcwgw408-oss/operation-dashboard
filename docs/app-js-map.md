# app.js Map

Epic 3 / Step11-d 時点の保守用地図です。`app.js` はまだ分割しません。分割は別Epicで、保存形式と初期化順を固定してから行います。

## 責務マップ

| 範囲 | 主な責務 |
|---|---|
| 1-154 | localStorageキー、Snapshot定数、外部Laboキー、初期データ、共通DOMヘルパー |
| 156-346 | 日付、タスク、予定、あとで見る、学び、発信運営、日次データの初期値生成 |
| 346-699 | load関数、プロフィール初期補完、Memory初期化 |
| 699-858 | save関数、メインstore保存 |
| 858-1523 | 日次データ取得、サマリー、タスク、定期予定、メモ、学びの描画 |
| 1524-1776 | 発信運営、最近7日の発信運営 |
| 1776-2105 | あとで見る、日次入力、履歴表示 |
| 2105-2563 | Memory追加、記憶一覧、記憶検索、記憶文脈 |
| 2563-5512 | 会話文脈、返答設計、人格/関係/実行状態、Health、Conversation feedback |
| 5513-6208 | Priority Engine、Recommendation Engine、Learning Layer |
| 6209-6836 | Adaptive guidance、Explain Layer、朝のひとこと、今日の見通し、振り返りレイヤー |
| 6837-7176 | Brain Prototype全体描画、`renderAll()` |
| 7177-7222 | 実行時移設、Sakura inner toggle |
| 7223-7659 | `bindEvents()`、入力イベント、CSV出力 |
| 7660-7849 | JSON Backup / restore |
| 7849-8354 | Sakura Snapshot生成、Snapshotパネル |

## localStorageキー一覧

| 定数 | 実キー | 用途 |
|---|---|---|
| `STORAGE_KEY` | `operation-dashboard-v1` | 日付別メインstore |
| `DAILY_TASK_ORDER_STORAGE_KEY` | `operation-dashboard-daily-task-order-v1` | 毎日タスクの最後の表示順 |
| `LATER_STORAGE_KEY` | `operation-dashboard-later-v1` | あとで見る / あとで読む |
| `LATER_VIEW_STORAGE_KEY` | `operation-dashboard-later-view-v1` | あとで見る表示設定 |
| `PERSISTENT_MEMO_STORAGE_KEY` | `operation-dashboard-persistent-memos-v1` | 残るメモ |
| `LEARNING_LOG_STORAGE_KEY` | `sakura-learning-log-v1` | 提案学習ログ |
| `MEMORY_STORE_STORAGE_KEY` | `sakura-memory-store-v1` | さくらの記憶 |
| `CONVERSATION_FEEDBACK_STORAGE_KEY` | `sakura-conversation-feedback-v1` | 返答フィードバック |
| `CONVERSATION_IMPROVEMENTS_STORAGE_KEY` | `sakura-conversation-improvements-v1` | 会話改善ヒント |
| `CONVERSATION_REFLECTIONS_STORAGE_KEY` | `sakura-conversation-reflections-v1` | 会話振り返り |
| `CONVERSATION_CONTINUITY_STORAGE_KEY` | `sakura-conversation-continuity-v1` | 会話のつながり |
| `CONVERSATION_RECOVERY_STORAGE_KEY` | `sakura-conversation-recovery-v1` | 会話の立て直し |
| `PERSONALITY_PROFILE_STORAGE_KEY` | `sakura-personality-profile-v1` | 人格プロフィール |
| `RELATIONSHIP_PROFILE_STORAGE_KEY` | `sakura-relationship-profile-v1` | 関係性プロフィール |
| `EMOTIONAL_RESONANCE_STORAGE_KEY` | `sakura-emotional-resonance-v1` | 感情の響き |
| `IDENTITY_PROFILE_STORAGE_KEY` | `sakura-identity-profile-v1` | 自己認識プロフィール |
| `GOAL_STATE_STORAGE_KEY` | `sakura-goal-state-v1` | 目標状態 |
| `PRIORITY_STATE_STORAGE_KEY` | `sakura-priority-state-v1` | 優先度状態 |
| `DECISION_STATE_STORAGE_KEY` | `sakura-decision-state-v1` | 判断状態 |
| `STRATEGY_STATE_STORAGE_KEY` | `sakura-strategy-state-v1` | 戦略状態 |
| `ATTENTION_STATE_STORAGE_KEY` | `sakura-attention-state-v1` | 注意状態 |
| `COGNITIVE_STATE_STORAGE_KEY` | `sakura-cognitive-state-v1` | 認知状態 |
| `INTENT_STATE_STORAGE_KEY` | `sakura-intent-state-v1` | 意図状態 |
| `TASK_PLAN_STATE_STORAGE_KEY` | `sakura-task-plan-state-v1` | タスク計画 |
| `WORKFLOW_STATE_STORAGE_KEY` | `sakura-workflow-state-v1` | 作業の流れ |
| `EXECUTION_DECISION_STORAGE_KEY` | `sakura-execution-decision-v1` | 実行判断 |
| `EXECUTION_STATE_STORAGE_KEY` | `sakura-execution-state-v1` | 実行状態 |
| `EXECUTION_FEEDBACK_STORAGE_KEY` | `sakura-execution-feedback-v1` | 実行フィードバック |
| `HEALTH_STATE_STORAGE_KEY` | `sakura-health-state-v1` | 体調状態 |
| `RECURRING_SCHEDULE_STORAGE_KEY` | `sakura-recurring-schedule-v1` | 定期予定 |
| `RECURRING_AUTO_ADD_LOG_STORAGE_KEY` | `sakura-recurring-auto-add-log-v1` | 定期予定の自動追加ログ |
| `SNAPSHOT_SETTINGS_KEY` | `sakura-snapshot-settings-v1` | Snapshot設定 |

## save/load関数

load入口:

- `loadStore()`
- `loadDailyTaskOrder()`
- `loadLaterItems()`, `loadShowDoneLater()`, `loadAutoDedupeLater()`
- `loadPersistentMemos()`
- `loadLearningLog()`
- `loadConversationFeedback()`, `loadConversationImprovements()`, `loadConversationReflections()`, `loadConversationContinuity()`, `loadConversationRecovery()`
- `loadPersonalityProfile()`, `loadRelationshipProfile()`, `loadEmotionalResonance()`, `loadIdentityProfile()`
- `loadGoalState()`, `loadPriorityState()`, `loadDecisionState()`, `loadStrategyState()`, `loadAttentionState()`, `loadCognitiveState()`, `loadIntentState()`
- `loadTaskPlanState()`, `loadWorkflowState()`, `loadExecutionDecision()`, `loadExecutionState()`, `loadExecutionFeedback()`
- `loadHealthState()`, `loadRecurringSchedule()`, `loadRecurringAutoAddLog()`
- `loadMemoryStore()`, `loadSnapshotSettings()`

save入口:

- `saveStore()`
- `saveDailyTaskOrder()`, `saveDailyTaskOrderFromDay()`
- `saveLaterItems()`, `saveLaterView()`
- `savePersistentMemos()`
- `saveLearningLog()`
- `saveConversationFeedback()`, `saveConversationImprovements()`, `saveConversationReflections()`, `saveConversationContinuity()`, `saveConversationRecovery()`
- `savePersonalityProfile()`, `saveRelationshipProfile()`, `saveEmotionalResonance()`, `saveIdentityProfile()`
- `saveGoalState()`, `savePriorityState()`, `saveDecisionState()`, `saveStrategyState()`, `saveAttentionState()`, `saveCognitiveState()`, `saveIntentState()`
- `saveTaskPlanState()`, `saveWorkflowState()`, `saveExecutionDecision()`, `saveExecutionState()`, `saveExecutionFeedback()`
- `saveHealthState()`, `saveRecurringSchedule()`, `saveRecurringAutoAddLog()`
- `saveMemoryStore()`, `saveSnapshotSettings()`

`localStorage.setItem` は原則として上記save関数、バックアップ復元、Snapshot設定、既存初期化補完の中だけに置きます。

毎日タスクの表示順は 2026-07-15 を基準にし、それ以降の日付では前日の並びを引き継ぎます。

## Backup / Snapshot入口

Backup:

- 定数: `BACKUP_FORMAT`, `BACKUP_APP_NAME`, `BACKUP_SCHEMA_VERSION`, `BACKUP_DICTIONARY_VERSION`, `BACKUP_KEYS`
- 作成: `createBackup()`
- 検証: `validateBackup()`
- 書き出し: `handleExportBackup()`
- 復元: `handleImportBackupFile()`

Snapshot:

- 定数: `SNAPSHOT_FORMAT`, `SNAPSHOT_VERSION`, `SNAPSHOT_DICTIONARY_VERSION`, `SNAPSHOT_DETAIL_DAYS`, `SNAPSHOT_LOG_DAYS`
- 設定: `loadSnapshotSettings()`, `saveSnapshotSettings()`
- 生成: `buildSakuraSnapshot(mode)`
- 表示: `renderSnapshotPanel()`
- イベント: `bindSnapshotPanel()`

## Brain / Priority / Recommendation / Memory / Health入口

Brain:

- `renderBrainPrototype()`
- `buildContextSummary()`
- `renderMorningGuidanceLayer()`
- `renderDailyFocusLayer()`
- `renderExplainableGuidanceLayer()`

Priority:

- `collectPriorityCandidates(context)`
- `scorePriorityCandidate(candidate)`
- `applyPriorityModifiers(candidate, energyContext, momentumContext)`
- `rankPriorityCandidates(candidates, energyContext, momentumContext)`
- `explainPriorityCandidate(candidate)`

Recommendation:

- `buildRecommendationInput(priorityCandidate, explanation, energyContext, momentumContext, context)`
- `chooseRecommendationType(input)`
- `buildRecommendationReasons(input)`
- `generateRecommendationMessage(input, type)`
- `buildRecommendation(input)`
- `adaptRecommendationWithLearning(recommendation, learningHint, learningSummary)`

Memory:

- `upsertShortMemory()`
- `upsertLearningMemory()`
- `renderMemoryLibrary()`
- `getRelevantMemories()`
- `buildMemoryRetrievalContext()`
- `buildBrainMemoryContext()`
- `renderMemoryLayer()`

Health:

- `buildHealthSummary()`
- `upsertHealthState()`
- `renderHealthState()`
- `buildHealthInsight()`
- `renderHealthInsight()`
- `buildHealthTrend()`
- `renderHealthTrend()`
- `buildHealthContext()`
- `renderHealthContext()`
- `buildHealthAwareRecommendation()`

## renderAll / bindEvents / arrangeDashboardUxSections

- `arrangeDashboardUxSections()` は、HTML上にある一部の詳細パネルを実表示位置へ移します。
- `bindEvents()` は入力、保存、検索、バックアップ、Snapshotなどのイベントを登録します。
- `renderAll()` は日付変更や保存後の再描画入口です。
- 初期化では、実行時移設を済ませた上でイベント登録と描画が行われます。

## moveDashboardNodeによる実行時移設一覧

| 移設元 | 移設先 | 目的 |
|---|---|---|
| `.generated-reply-panel` | `#generatedReplyMount` | 生成返答を会話導線の位置に置く |
| `.health-check-panel` | `#healthCheckInputMount` | 体調入力を今日を書くゾーンへ移す |
| `.health-insight-panel` | `#healthAnalysisMount` | 体調分析詳細へ移す |
| `.health-trend-panel` | `#healthAnalysisMount` | 体調トレンド詳細へ移す |
| `.health-context-panel` | `#healthAnalysisMount` | 体調文脈詳細へ移す |
| `#memoryMemoForm` | `#memoryMemoInputMount` | 記憶メモ入力を今日を書くゾーンへ移す |
| `.conversation-feedback-panel` | `#replyFeedbackMount` | 返答フィードバックを生成返答の近くへ移す |

実行時移設を増やす場合は、この表と静的検査を同時に更新します。
