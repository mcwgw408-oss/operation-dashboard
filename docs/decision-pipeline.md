# Decision Pipeline

Epic 4 / Step12-a 時点の判断設計メモです。現時点では `app.js` の挙動を変更せず、現在のAI判断フローが何を読み、何を返しているかを文書化します。Step12-b 以降でゴールデンテストを作る前提として、まず観測対象を固定します。

## Epic 4の方針

Epic 4: Adaptive Intelligence は、判断処理を直列パイプラインとしてではなく、4段の漏斗として整理します。

| 段 | 目的 | 現在の扱い |
|---|---|---|
| 収集 | 予定、タスク、体調、記憶、最近の学び、発信運営、提案学習を集める | `renderBrainPrototype()` 内で複数のstoreとlocalStorageを読む |
| 解釈 | エネルギー水準、制約、勢い、好みの重みを読む | `inferEnergyContext()`、`inferMomentumContext()`、Health / Learning / Memory系で補助文脈を作る |
| 決定 | Priority、候補生成、採点、Recommendationを決める | Priority EngineとRecommendation Engineが中心 |
| 表現 | Adaptive Guidance、今日のひとこと、なぜこの提案、最終返答に変換する | Guidance / Explain / Reply / Reflection系に渡して描画する |

この文書では、現行の判断結果を変えずに、各段の入力と出力を確認できるようにします。

## 現在の司令塔

現在の司令塔に近い関数は `renderBrainPrototype()` です。

`renderBrainPrototype()` は以下を一体で行っています。

- 今日のデータ、外部Labo、記憶、学習、体調文脈の収集
- 優先候補の生成、採点、順位付け
- Recommendationの生成
- 記憶、学習、体調を使った補助説明の合流
- Conversation Context、Reply Plan、最終返答の生成
- 画面描画
- 一部の保存副作用

そのため、Step12-bでテストを作る場合は、まずこの関数内の中間成果物を観測対象として固定します。

## 4段漏斗と現在の関数対応表

### 収集

| 入力 | 主な関数 / 変数 | メモ |
|---|---|---|
| 今日のタスク、予定、プロジェクト、振り返り | `store[activeDate]` | `renderBrainPrototype()` は `store[activeDate] || {}` を直接読む |
| あとで見る / あとで読む | `laterItems` | 未完了だけを `laterOpen` として扱う |
| 残るメモ | `persistentMemos` | 直近7日更新分をPriority候補にする |
| Discovery Labo | `readStoredJson(EXTERNAL_APP_KEYS.discoveries, [])` | 発酵中アイデアを抽出 |
| Substack Labo | `readSubstackWorkspace()`, `collectBrainWritingItems()` | 執筆中記事を抽出 |
| 発信観察 Labo | `readStoredJson(EXTERNAL_APP_KEYS.hasshin, [])` | `nextAction` がある項目を抽出 |
| 交流ログ Labo | `readStoredJson(EXTERNAL_APP_KEYS.koryu, [])` | また見たい人を抽出 |
| 記憶 | `memoryStore`, `buildBrainMemoryContext()` | Priorityの順位付け後に補助文脈として参照 |
| 提案学習 | `learningLog`, `buildLearningSummary()` | Recommendation生成後の強さ調整に使う |
| 体調 | `healthState`, `getLatestHealthContext()` | 提案の順位変更ではなく補助説明に使う |

### 解釈

| 解釈対象 | 主な関数 | 出力 |
|---|---|---|
| エネルギー水準 | `inferEnergyContext(day, completedToday, openToday.length)` | `state`, `modifier`, `text` |
| 勢い | `inferMomentumContext(day, writingInProgress, hasshinNextActions)` | `state`, `modifier`, `text` |
| 予定制約 | `inferEventContext(todayEvents)` | `count`, `level`, `text`, `labels` |
| 体調文脈 | `buildHealthInsight()`, `buildHealthTrend()`, `buildHealthContext()` | capacity、recovery、risk、recommendationContext |
| 記憶文脈 | `buildMemoryRetrievalContext()`, `buildBrainMemoryContext()` | project、tags、retrieved、recent |
| 提案学習 | `buildLearningSummary()`, `buildLearningHint()`, `buildLearningConfidence()` | acceptance、common type、confidence |
| Adaptive Guidance | `buildAdaptiveGuidanceScores()` | writing / coding / health / rest の補助スコア |

### 決定

| 決定段階 | 主な関数 | メモ |
|---|---|---|
| 候補生成 | `collectPriorityCandidates(context)` | 今日のタスク、毎日タスク、プロジェクト、あとで見る、残るメモ、外部Laboから候補を作る |
| 基本採点 | `scorePriorityCandidate(candidate)` | source別点数、優先マーク、今日更新、滞留、完了ペナルティなど |
| 補正 | `applyPriorityModifiers(candidate, energyContext, momentumContext)` | エネルギーと勢いのmodifierを加える |
| 順位付け | `rankPriorityCandidates(candidates, energyContext, momentumContext)` | 調整後スコア、優先マーク、更新日時で並べる |
| 優先理由 | `explainPriorityCandidate(priorityCandidate)` | 上位理由とmodifier理由を説明する |
| Recommendation入力 | `buildRecommendationInput(...)` | Recommendation用の正規化された入力束を作る |
| 提案タイプ | `chooseRecommendationType(input)` | `organize_or_rest`, `schedule_context`, `rest_first`, `start_small`, `continue_flow`, `write_from_idea` など |
| 提案理由 | `buildRecommendationReasons(input)` | 予定、候補source、勢い、エネルギー、完了数を理由化 |
| 提案文 | `generateRecommendationMessage(input, type)` | title、message、actionTextを作る |
| 提案全体 | `buildRecommendation(input)` | type、reasons、message群をまとめる |
| 学習反映 | `adaptRecommendationWithLearning(recommendation, learningHint, learningSummary)` | 条件を満たす場合だけactionTextの強さを少し調整する |

### 表現

| 表現 | 主な関数 | メモ |
|---|---|---|
| なぜこの提案 | `buildExplainLayerDetails()`, `renderExplainLayerDetails()` | 見ている情報、主な理由、不確かな点、energy / momentum影響を表示 |
| 今日のひとこと | `buildMorningGuidanceText()`, `renderMorningGuidanceLayer()` | 体調、今日の入力、記憶を短く反映 |
| 今日の見通し | `buildContextSummary()`, `renderDailyFocusLayer()` | theme、next action、condition、taskを表示 |
| 説明可能な案内 | `buildExplainableGuidanceReasons()`, `renderExplainableGuidanceLayer()` | 優先度、提案、Adaptive Guidance、体調、記憶、今日の入力を理由化 |
| 会話文脈 | `buildConversationContext()`, `renderConversationContext()` | recommendation、explanation、learning、memory、healthを返答用に束ねる |
| 返答計画 | `buildReplyPlan()`, `renderReplyPlan()` | opening、mainPoint、support、uncertainty、closingを作る |
| 最終返答 | `buildReply()`, `renderReply()` | 返答文を生成して表示する |
| 振り返り | `renderReflectionLayer()`, `renderConversationTimeline()` | 提案、返答、学習、会話の流れを表示 |

## buildRecommendationInput() の現在の役割

`buildRecommendationInput()` は、Priority Engineの結果をRecommendation Engineへ渡すための正規化された入力束です。

### 含むもの

- `topCandidate`
- `priorityReasons`
- `energy`
- `momentum`
- `eventContext`
- `hasTodayEvents`
- `hasFermentingIdeas`
- `hasWritingInProgress`
- `hasNextActions`
- `openTodayCount`
- `completedToday`

### 含まないもの

- `memoryStore` の実データ
- `healthContext`
- `healthState`
- `learningLog` 全体
- `conversationFeedback`
- `currentConversationContext`
- `currentRecommendation`
- 画面DOM
- 保存済みのGoal / Priority / Decision / Intent / Execution系state

### Memory / Healthの位置づけ

現状では、`memoryStore` と `healthContext` はPriority候補の順位やRecommendation typeを直接変更する主入力ではありません。

- 記憶は、`buildMemoryRetrievalContext()` と `buildBrainMemoryContext()` で取得され、`applyBrainMemoryContext()` によりRecommendationのmessageへ補助情報として合流します。
- 体調は、`buildHealthAwareRecommendation()` で「体調をふまえた提案」として説明・表現に使われます。
- `buildHealthAwareRecommendation()` の `explanationHint` は、体調が提案の種類・件数・順位を変更しないことを明示しています。

このため、Step12-bのゴールデンテストでは「記憶や体調が説明文を変えること」と「Recommendation type / rank を直接変えないこと」を分けて確認します。

## 暗黙入力一覧

現在の判断系は、引数だけではなく以下の暗黙入力にも依存しています。

| 入力 | 用途 |
|---|---|
| `activeDate` | 対象日の選択、保存・表示の日付 |
| `store[activeDate]` | 今日のタスク、予定、プロジェクト、振り返り、発信運営、今日の入力 |
| `laterItems` | あとで見る / あとで読むの未完了候補 |
| `persistentMemos` | 直近更新メモ候補 |
| `learningLog` | 提案学習、Recommendation調整、Adaptive Guidance |
| `conversationFeedback` | Adaptive Guidance、会話の自然さ、振り返り |
| `memoryStore` | 記憶検索、記憶文脈、Recommendation補助文 |
| `healthState` | Health Insight / Trend / Context |
| 外部localStorage | Discovery、Substack、発信観察、交流ログなど |
| `currentRecommendation` | Health aware recommendationなどの既定引数 |
| `currentConversationContext` | Goal / Priority / Decisionなど後段stateの生成 |
| `currentReplyPlan` | 返答計画の保持 |
| `currentLearningLogId` | 現在の提案学習エントリ |
| `personalityProfile`, `relationshipProfile` | 最終返答やIdentity系state |
| `goalState` など各種state配列 | Execution / Executive / Adaptive Intelligence系の現在値 |

Step12-bでは、これらを固定fixtureとして用意するか、関数に渡す入力へ切り出すかを検討します。

## 副作用のある観測点

以下は観測時に注意が必要です。

| 関数 | 副作用 |
|---|---|
| `getDay()` | 対象日の作成、既定dailyTasks / metrics / learnings / publishingOps / todayEvents / dailyInputの補完、`localStorage.setItem()` |
| `syncCurrentLearningLog()` | 提案学習ログの作成または更新、`currentLearningLogId` 更新、保存 |
| `upsertShortMemory()` | `memoryStore.shortMemory` の追加または更新、保存 |
| `renderBrainPrototype()` | 判断、描画、学習ログ同期、短期記憶追加、各種renderを一体で実行 |

`renderBrainPrototype()` は描画・保存・判断を一体で持っているため、ゴールデンテストで直接呼ぶと保存副作用を含めた現行仕様の固定になります。挙動変更ゼロの観測から始める場合は、まず中間成果物を返すトレース関数を別途設計するのが安全です。ただしStep12-aでは実装しません。

## 生成箇所

| 表示 / 生成物 | 主な生成箇所 | 備考 |
|---|---|---|
| なぜこの提案 | `buildExplainLayerDetails()`, `renderExplainLayerDetails()` | seenInfo、mainReasons、uncertaintyを表示 |
| 判断メモ | `priorityCandidateMaterialLabels()`, `#brainPriorityMaterials`, `#brainPriorityReasons` | Priority候補の材料、スコア、modifier理由 |
| 体調をふまえた提案 | `buildHealthAwareRecommendation()`, `renderHealthAwareRecommendation()` | action size、support、priority reason、caution |
| 今日のひとこと | `buildMorningGuidanceText()`, `renderMorningGuidanceLayer()` | 朝の短い案内 |
| 最終返答 | `buildConversationContext()`, `buildReplyPlan()`, `buildReply()`, `renderReply()` | Recommendation、記憶、学習、体調、関係性stateを参照 |

## Step12-bのゴールデンテスト方針

Step12-bでは、変更前に「変わっていないこと」を証明するためのゴールデンテストを追加します。

### 基本方針

- 固定fixtureを使う。
- `Date` と `crypto.randomUUID()` を固定する。
- localStorage相当の入力を固定する。
- `recommendationInput` の安定スナップショットを保存する。
- Recommendation type、priority candidate、reasons、message、actionTextを確認する。
- 記憶・体調・学習による補助表現と、Recommendation type / rank の変化を分けて確認する。

### 記録すべき中間成果物

- `energyContext`
- `momentumContext`
- `eventContext`
- `candidates.length`
- `rankedCandidates` の上位候補
- `priorityCandidate`
- `explanation`
- `recommendationInput`
- `baseRecommendation`
- `learningSummary`
- `learningHint`
- `brainMemoryContext`
- `recommendation`
- `healthAwareRecommendation`
- `explainLayerDetails`
- `contextSummary`
- `replyPlan`

### 優先fixture

| fixture | 期待する確認 |
|---|---|
| 候補なし | `organize_or_rest` になり、軽い整理・休息提案になる |
| 予定あり | `schedule_context` になり、予定準備や余白を優先する |
| 回復文言あり | `rest_first` または回復寄りの説明になる |
| 未完了多数 | `start_small` になり、短時間で触れる形になる |
| 執筆中 | `continue_flow` または執筆継続の流れを確認する |
| 発酵中アイデア + 執筆中 | `write_from_idea` を確認する |
| 記憶あり | messageにmemory noteが補助追加される |
| 体調低め | `healthAwareRecommendation` が小さめ・柔らかめの説明を出す |
| 学習ログ高信頼 | `adaptiveNote` または `actionText` の調整だけが起きる |

### リスク

- `getDay()` が保存副作用を持つため、純粋な読み取りテストになりにくい。
- `renderBrainPrototype()` が学習ログと短期記憶を更新するため、直接呼ぶテストではfixtureの事後状態も固定する必要がある。
- 時刻、ID、localStorageの初期補完がスナップショットを不安定にする。
- 体調と記憶はRecommendationの順位を変えないが、表示文には影響するため、出力差分を分けて読む必要がある。

## Step12-b-1 実装範囲

Step12-b-1では、Brain判断を変更する前の安全網として、非DOMの判断関数だけを固定環境で呼ぶゴールデンテスト土台を追加します。

対象外:

- `renderBrainPrototype()` 全体の直接実行
- DOM描画
- `syncCurrentLearningLog()` による保存副作用
- `upsertShortMemory()` による記憶更新
- `reply` 生成
- 記憶あり、体調低め、学習ログ高信頼fixture

固定環境:

- `activeDate` をfixtureごとに固定する。
- `Date` / `Date.now()` を固定する。
- `crypto.randomUUID()` を固定連番にする。
- `localStorage` はMapベースのfake実装を使う。
- `store`, `laterItems`, `persistentMemos`, `learningLog`, `memoryStore`, `healthState` はfixtureで明示する。

初回fixture:

| fixture | 期待する確認 |
|---|---|
| 候補なし | `organize_or_rest` になる |
| 予定あり | `schedule_context` になる |
| 未完了多数 | `Low Energy` と `start_small` になる |
| 執筆中 | `continue_flow` になる |

ゴールデン化する出力:

- `energyContext`
- `momentumContext`
- `eventContext`
- `rankedCandidates` 上位3件
- `priorityCandidate`
- `explanation`
- `recommendationInput`
- `baseRecommendation`
- `learningSummary`
- `learningHint`

実行コマンド:

```bash
node tests/brain-golden/run-brain-golden.mjs
```

## Step12-b-2 実装範囲

Step12-b-2では、Step12-b-1の非DOMゴールデンテストに、補助文脈の確認を追加します。

追加fixture:

| fixture | 期待する確認 |
|---|---|
| 記憶あり | `brainMemoryContext` と `recommendation.memoryNote` が出るが、`baseRecommendation.type` と上位候補は変えない |
| 体調低め | `healthAwareRecommendation.actionSizeHint` が小さめになるが、`baseRecommendation.type` と上位候補は変えない |
| 学習ログ高信頼 | `recommendation.actionText` / `adaptiveNote` が学習反映で変わるが、`baseRecommendation.type` と上位候補は変えない |

追加でゴールデン化する出力:

- `brainMemoryContext`
- 学習・記憶反映後の `recommendation`
- `healthAwareRecommendation`

## Step12-c 実装範囲

Step12-cでは、AI判断の収集フェーズを `collectBrainContext()` に一本化します。

目的:

- `renderBrainPrototype()` 冒頭で直接行っていたstore、外部localStorage、学習、記憶、体調stateの読み取りを1箇所へ集める。
- Step12-bのBrain golden testも同じ収集関数を使い、ブラウザ描画側とテスト側の収集ロジック重複を減らす。
- 判断結果は変えない。

対象:

- `activeDate`
- `day`
- `dailyTasks`, `todayTasks`, `todayEvents`, `projects`
- `reflection`
- `completedToday`, `openToday`, `laterOpen`
- `persistentMemos`, `recentMemos`
- `discoveries`, `fermentingIdeas`
- `writingItems`, `writingInProgress`
- `hasshinEntries`, `hasshinNextActions`
- `koryuEntries`, `revisitPeople`
- `learningLog`, `memoryStore`, `healthState`

対象外:

- Priorityの採点、順位付け、Recommendation typeの変更
- `buildBrainDecision()` などの判断パイプライン抽出
- DOM描画処理の整理
- `syncCurrentLearningLog()` や `upsertShortMemory()` の副作用整理
- 保存形式、localStorageキー、Backup / restoreの変更

成功条件:

- Step12-bの期待値JSONに差分が出ない。
- `collectBrainContext()` は読み取り専用で、`getDay()`、`saveStore()`、`localStorage.setItem()` を呼ばない。

## Step12-d 実装範囲

Step12-dでは、Epic 4の決定段を `buildBrainDecision(brainContext)` にまとめます。

目的:

- `collectBrainContext()` の収集結果から、Priority候補、順位、Recommendation、補助文脈までを1つの入口で組み立てる。
- ブラウザ描画側とBrain golden testが同じ決定処理を使う。
- 重み、条件順、sort順、理由文、message文、actionTextを変えずに責務境界を明確にする。

`buildBrainDecision()` がまとめる処理:

1. Energy、Momentum、Event Contextの生成
2. Priority候補の生成、基本採点、補正、順位付け
3. 最上位候補の説明生成
4. Recommendation入力の正規化
5. base Recommendationの生成
6. Learning Summary / Hintによる提案強度の補助調整
7. Memory Contextの検索とRecommendation messageへの補助追加
8. Health ContextによるRecommendationへの接近方法の説明生成

境界:

- Health、Memory、Learningは現時点ではPriorityの順位とbase Recommendation typeを変更しない。
- Learningは条件を満たす場合に `actionText` と `adaptiveNote` を調整する。
- Memoryは `message` と `memoryNote` に補助情報を追加する。
- Healthは `healthAwareRecommendation` で行動サイズや注意点を説明する。
- `syncCurrentLearningLog()`、`upsertShortMemory()`、`upsertEmotionalResonance()` などの保存副作用は `buildBrainDecision()` に含めない。
- DOM描画、Explain Layer、朝のひとこと、Reply生成は決定関数の外に残す。

成功条件:

- Brain golden testの期待値JSONに差分が出ない。
- `rankedCandidates` 上位3件、`priorityCandidate`、`recommendationInput` が変わらない。
- `baseRecommendation` のtype、reasons、message、actionTextが変わらない。
- 記憶あり、体調低め、学習ログ高信頼fixtureでrankとbase Recommendation typeが変わらない。
- localStorageキー、Backup / restore、UI構造に差分が出ない。

## Step12-eへの送り

Step12-eでは「どう言うか」の分離を扱います。

対象候補:

- `explainPriorityCandidate()`
- `buildRecommendationReasons()`
- `generateRecommendationMessage()`
- `buildExplainLayerDetails()`
- `buildMorningGuidanceText()`
- `buildReplyPlan()` / `buildReply()`

Step12-dでは、これらの文言、条件順、生成結果を変更しません。

## Step12-e-1 表現出力の固定

Step12-e-1では、表現層を分離する前の観測点として、現在のBrain出力を表現golden testに固定します。

固定対象:

- Recommendationのtitle、message、actionText、reasons
- Explain Layerの表示詳細
- 朝のひとこと
- Daily Focusの優先テーマ、次の一歩、条件、対象タスク
- Context Summary
- `pickDailyFocusTask()` が選ぶFocus Task

既存のBrain golden fixtureを再利用し、決定結果から描画直前の表現値を組み立てます。Step12-e-1では `app.js` の表現ロジック、文言、UI、保存処理を変更しません。

Step12-e-1時点では、`pickDailyFocusTask(todayTasks, dailyTasks)` が `buildContextSummary()` と `renderDailyFocusLayer()` の両方から同じ引数と条件で呼ばれていることを確認しました。この段階では関数を移動せず、現状をgolden testに固定しました。

Step12-e-2以降で、固定した出力を維持しながら表現生成の責務分離を進めます。

## Step12-e-2 表現層の集約

Step12-e-2では、Step12-e-1で固定した表現出力を `buildBrainExpression()` に集約します。

入力:

- `brainContext`
- `brainDecision`
- Learning同期後のAdaptive Guidance
- Explain Layerが参照するLearning同期前のSummary / Hint / Confidence

出力:

- 決定済みRecommendationのtitle、message、actionText、reasons
- Explain Layer Details
- Context Summary
- Morning Guidance Text
- Daily Focusの表示値
- Focus Task

`pickDailyFocusTask()` の優先条件は変更せず、`buildBrainExpression()` 内で一度だけ選択した結果をContext SummaryとDaily Focusで共有します。

境界:

- Recommendation type、Priority、Learning適用、Memory適用、Health適用は `buildBrainDecision()` 側に残す。
- `buildBrainExpression()` はDOM操作と保存処理を行わない。
- render関数は構築済みの表現値をDOMへ反映する。
- Reply、Reflection、Explainable GuidanceはStep12-e-2の対象外とする。
- localStorage、Backup、restore、UI構造は変更しない。

## Step13-b operation-cockpit IntentのContext接続

Step13-bでは、`operation-cockpit-v1` の表示対象日Intentを `collectBrainContext()` の `cockpitIntent` として追加します。

`cockpitIntent`:

- `date`
- `topPriority`
- `articleNote`
- `todayFocus`
- `growthTarget`
- `noticed`
- `updatedAt`

欠損、不正JSON、未知の旧形式、対象日のrecordなしの場合は `null` とします。`communityChecks`、通常checks、mail checks、creator checks、creator masterはBrain Contextへ含めません。

境界:

- 読み取りと正規化は `readOperationCockpitStore()`、`buildOperationCockpitRecentDays()`、`buildOperationCockpitIntentContext()` を経由する。
- `collectBrainContext()` は保存、修復、migrationを行わない。
- `buildBrainDecision()` と `buildBrainExpression()` は `cockpitIntent` を参照しない。
- Priority、Recommendation、表示文言、Snapshot、Backup / restoreは変更しない。

## Step13-c-1 operation-cockpit IntentのDecision接続

Intentがある場合は、原文の方向を `operation-cockpit.intent` 候補としてPriority候補へ追加します。Intent候補は最上位を維持し、Energy / Momentum / Healthによって別方向へ差し替えません。

方向の優先順:

1. `topPriority`
2. `todayFocus`
3. `articleNote`
4. `growthTarget`
5. `noticed`

既存Health Stateの`energyLevel`が`very_low` / `low` / `unstable`、または`recoveryFeeling`が`depleted` / `low`の場合だけ、`intentDecision.safetyAdjustment`を有効にします。Health Stateがない場合は発火しません。このフラグは方向を変えず、Step13-c-2の歩幅表現だけに使います。

Intentがない場合は、候補生成、採点、Recommendationを含む既存Decision結果を変更しません。

## Step13-c-2 operation-cockpit IntentのExpression接続

`buildBrainExpression()` は生の `cockpitIntent` ではなく、Decisionで確定した `intentDecision` を受け取ります。

Intentあり:

- Recommendation messageの1行目でIntent原文をそのまま復唱し、受領を明記する。
- 2行目で、その方向へ進むための今日の一歩を示す。
- Explain LayerにIntent受領と歩幅決定の理由を残す。
- Health低下時は方向を変えず、actionTextを小さくする。
- Health低下時のmessageには「その方向でいきましょう。今日は少し小さめの入口から始めると良さそうです。」を一字一句変更せず使う。

Intentなし:

- Recommendation、Explain Layer、Context Summary、Morning Guidance、Daily Focusの既存出力を変更しない。
- 空欄への催促や言及を追加しない。
