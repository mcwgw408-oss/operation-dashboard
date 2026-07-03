# Fabl5 Assets Inventory

日付: 2026-07-04

目的: Sakura AI Brain が今後、既存のLabo・アプリ資産を読み取り、Priority Engine / Recommendation Engine / Future Agent で活用できるようにするための棚卸し。

この文書は調査メモです。コード、README、localStorageデータ、Snapshot仕様は変更しません。

## 1. 現在のリポジトリ内に存在するLabo / アプリ一覧

このリポジトリ内に実体ファイルがあるもの:

| アプリ | 実体ファイル | 役割 |
|---|---|---|
| operation-dashboard | `index.html`, `app.js`, `styles.css` | 日次タスク、振り返り、あとで見る、残るメモ、Sakura AI Brain Prototype、Snapshot生成 |
| operation-cockpit | `cockpit.html`, `cockpit.js`, `styles.css` | 旧/別系統の運用コックピット。日次チェック、重要事項、記事メモ、クリエイター確認 |
| Sakura AI Brain Prototype | `index.html`, `app.js`, `styles.css` | Priority Engine / Recommendation Engine を使う読み取り専用パネル |
| Sakura Snapshot | `app.js`, `docs/sakura-snapshot-json-spec.md` | 各LaboのlocalStorageを読み取り、AI引き渡し用JSONを生成 |

このリポジトリ内にソースはないが、リンクとlocalStorage連携契約が存在するもの:

| Labo | リンク | localStorage連携 |
|---|---|---|
| Substack-Labo | `https://mcwgw408-oss.github.io/substack-labo/` | あり |
| Discovery-Labo | `https://mcwgw408-oss.github.io/discovery-Labo/` | あり |
| 交流ログ / action-Labo | `https://mcwgw408-oss.github.io/action-Labo/` | `koryu-log-labo` として連携 |
| 発信観察Labo / observation-Labo | `https://mcwgw408-oss.github.io/observation-Labo/` | `hasshin-kansatsu-labo` として連携 |
| ストック管理Labo | `https://mcwgw408-oss.github.io/Stock-Labo/` | あり |
| 記事Labo | `https://mcwgw408-oss.github.io/article-Labo/` | このリポジトリ内ではlocalStorageキー未確認 |
| atode-Labo相当 | operation-dashboard内の「あとで見る / あとで読む」 | `operation-dashboard-later-v1` で代替 |

## 2. 各Laboのファイル構成

### operation-dashboard

- `index.html`: 画面構造。ホームリンク、Brain Prototype、日次タスク、あとで見る、振り返り、Snapshotパネルを含む。
- `app.js`: 保存処理、表示処理、Backup、Snapshot生成、Brain Prototype、Priority Engine、Recommendation Engineを含む。
- `styles.css`: 全体UI、Brainカード、Snapshotパネルなどのスタイル。
- `README.md`: 運用確認手順と概要。
- `docs/*`: Snapshot仕様、Validator設計、Brain設計、Engine設計、議事録。

### operation-cockpit

- `cockpit.html`: コックピット画面。
- `cockpit.js`: 日次チェック、クリエイター確認、重要事項などの保存処理。
- `styles.css`: operation-dashboardと共有。

### 外部Labo

このリポジトリ内には外部Labo本体のファイルはありません。operation-dashboardは、同一ブラウザ・同一オリジン上のlocalStorageキーを読む前提で連携しています。

## 3. 各Laboが使っているlocalStorageキー

### operation-dashboard

| キー | 用途 |
|---|---|
| `operation-dashboard-v1` | 日次レコード。毎日タスク、今日やること、プロジェクト、メトリクス、振り返りなど |
| `operation-dashboard-later-v1` | あとで見る / あとで読む |
| `operation-dashboard-later-view-v1` | あとで見る表示設定 |
| `operation-dashboard-persistent-memos-v1` | 残るメモ |
| `sakura-snapshot-settings-v1` | Snapshotのプライバシー設定、最終作成時刻 |

### operation-cockpit

| キー | 用途 |
|---|---|
| `operation-cockpit-v1` | コックピット日次レコード |
| `operation-cockpit-daily-creators-v1` | クリエイター確認リスト |

### 外部Labo

| Labo | キー | 用途 |
|---|---|---|
| Discovery-Labo | `discovery-labo-discoveries` | 発見・種・アイデア |
| Discovery-Labo | `discovery-labo-entry-sources-v1` | 発生源 |
| 交流ログ / action-Labo | `koryu-log-labo-entries` | 交流記録、また見たい人、感情系メモ |
| 発信観察Labo / observation-Labo | `hasshin-kansatsu-labo-entries` | 発信観察、気づき、次アクション |
| Substack-Labo | `substack-labo-workspace-v2` | 現行ワークスペース |
| Substack-Labo | `substack-labo-store` | 旧形式フォールバック |
| ストック管理Labo | `stock-labo-items-v1` | 在庫・日用品・食材 |

このリポジトリから確認できないもの:

- 記事LaboのlocalStorageキー
- 外部Labo本体の内部ファイル構成
- 外部Labo側の追加キーや移行キー

## 4. Sakura Snapshotにすでに含まれているもの

Snapshot生成対象:

| Snapshot app key | 含まれるデータ |
|---|---|
| `operation-dashboard` | 直近7日分の日次レコード、古い日付件数、未完了later items、persistent memos |
| `discovery-labo` | discoveries全件、sources全件 |
| `koryu-log-labo` | 直近30日、または `revisit` が有効な交流記録 |
| `hasshin-kansatsu-labo` | 直近30日、または `nextAction` が残っている発信観察 |
| `substack-labo` | writings / people / articleReviews / ideas / quickMemos、または旧形式content / people / ideas |
| `stock-labo` | privacy設定でONのときのみstock items |

Snapshot summaryに含まれる集計:

- 今日の進捗
- 発酵中の種の数
- 最長発酵日数
- また見たい人の数
- 執筆中記事数
- 未完了の次アクション数

プライバシー制御:

- 振り返りは `privacy.reflection` で除外可能。
- 交流ログの感情系フィールドは `privacy.feelings` でnull化可能。
- メール/DM数値は `privacy.mailDmCounts` でnull化可能。
- stock-laboは `privacy.stock` がfalseなら `null`。
- Substackの `emailList` は常に含めない。

## 5. まだSnapshotに含まれていないもの

| 項目 | 状態 |
|---|---|
| operation-cockpit | Snapshotに未含有 |
| 記事Labo | リンクはあるがSnapshotに未含有 |
| atode-Labo本体 | 独立Laboとしては未確認。operation-dashboard laterで代替 |
| 外部Laboの画面設定 | Snapshotに未含有 |
| 外部Laboの詳細スキーマ | Snapshot仕様では柔軟に扱う前提。深い検証は未実装 |
| Snapshot履歴 | 未実装。現在は明示的なコピー/ダウンロードのみ |
| Memory Layer / Learning Layer | 未実装 |
| First Agent | 未実装 |

## 6. Brain / Priority Engine / Recommendation Engine と連携できそうなもの

すでにBrain Prototypeが読んでいるもの:

| データ | 現在の使われ方 |
|---|---|
| 今日やること | Priority候補 |
| 毎日タスク | Priority候補 |
| プロジェクト | Priority候補 |
| あとで見る / あとで読む | Priority候補、AIからの提案 |
| 残るメモ | Priority候補、最近の変化 |
| Discovery-Laboの発酵中アイデア | Priority候補、Recommendation理由 |
| 発信観察のnextAction | Priority候補、Momentum判定、最近の変化 |
| Substack-Laboの執筆中記事 | Priority候補、Momentum判定、Recommendation理由 |
| 交流ログのまた見たい人 | Priority候補、最近の変化 |

今後連携できそうなもの:

| データ | 活用案 |
|---|---|
| operation-cockpitのtopPriority | Brainの「今日の意図」として使う |
| operation-cockpitのarticleNote | Writing Agent / Recommendationに使う |
| operation-cockpitのtodayFocus | Priority Engineの補助重みとして使う |
| operation-cockpitのgrowthTarget | Learning Layerの観察対象にする |
| 記事Labo | Substack-Laboとは別の執筆成果・下書き候補として使う |
| stock-labo | 生活メンテナンス提案。ただしprivacy ON時のみ |

## 7. 優先的につなげるべきLabo

優先度1: Substack-Labo

- Recommendation Engineの「記事を書くタイミングかもしれません」と相性がよい。
- 執筆中記事、アイデア、quickMemosをPriority / Momentumに使いやすい。
- ただし `emailList` は引き続き除外必須。

優先度2: Discovery-Labo

- 発酵中アイデアはSakura AI Brainの「考える」材料になる。
- Recommendationの理由文に自然に出しやすい。
- 停滞した種、育ち始めた種、記事化候補の判定に使える。

優先度3: 発信観察Labo

- `nextAction` が行動候補として強い。
- Priority Engineの候補化がすでに実装されている。
- First Agentの「次の一手」に発展させやすい。

優先度4: 交流ログ / action-Labo

- 「また見たい人」は小さな行動提案に向いている。
- 感情系データは扱いに注意が必要。

優先度5: operation-cockpit

- 現在Snapshotに未含有だが、今日の意図・重点・記事メモがBrainに有用。
- ただしoperation-dashboardと役割が重なるため、先に統合方針を決めたい。

優先度6: stock-labo

- 生活面の提案には有用。
- デフォルトではprivacy OFFなので、AI連携は明示ON前提にする。

## 8. 連携時のリスク

| リスク | 内容 | 対策 |
|---|---|---|
| localStorageキーの不一致 | 外部Labo側でキーが変わると読めない | キー一覧を仕様化し、fallbackを明示する |
| 文字化け | 既存ファイルの一部に表示上の文字化けがある | UTF-8確認とサンプル修正を分けて扱う |
| プライバシー | 交流ログ、Substack people、stockは個人性が高い | Snapshot privacyを維持し、AI提案では必要最小限に使う |
| emailList混入 | SubstackのメールリストはAIに渡さない前提 | 現行の再構築方式を維持し、validatorで検査する |
| 書き込み事故 | Future AgentがLaboへ書き戻す可能性 | Phase2では読み取り専用を維持。書き込みは別設計と明示承認が必要 |
| 重複候補 | 同じアイデアがDiscovery、Substack、dashboardに重複する | 将来Candidate ID正規化や重複検出を入れる |
| 古いデータの過大評価 | 古い未完了項目が強く出すぎる | staleness理由とEnergy/Momentumで調整する |
| Snapshot肥大化 | 全件コピーが増えるとAIに渡しにくい | summaryとrecent windowを分ける |

## 9. 次に実装するなら何から始めるべきか

次の最小実装案:

1. Snapshotに `operation-cockpit` を読み取り専用で追加する設計を書く。
2. `operation-cockpit-v1` から直近7日分だけをSnapshotに含める。
3. `topPriority`, `articleNote`, `todayFocus`, `growthTarget`, `noticed` をBrain入力にする。
4. Priority Engineでは `todayFocus` と `topPriority` を補助理由として使う。
5. Recommendation Engineでは `articleNote` と Substack-Laboを組み合わせて、執筆提案の自然さを上げる。

実装前に決めたいこと:

- operation-cockpitを今後も独立アプリとして残すか。
- operation-dashboardへ統合するか。
- Snapshotのapp keyを `operation-cockpit` として追加するか。
- cockpitのクリエイターリストをAIに渡すか、privacy対象にするか。

## 結論

現時点でSakura AI Brainが活用しやすい資産は、すでにSnapshotとBrain Prototypeにかなり接続されています。

次に効果が大きいのは、未接続の `operation-cockpit` と、既存連携済みの `Substack-Labo` / `Discovery-Labo` / `発信観察Labo` をPriorityとRecommendationの説明文へさらに深く接続することです。

当面は読み取り専用を維持し、Snapshotの契約を広げるところから進めるのが安全です。
