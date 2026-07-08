# operation-dashboard 回帰確認チェックリスト

Step8以降で整理した画面構成、保存データ、バックアップを守るための完成レビュー手順です。
実装変更後は、変更範囲にかかわらず「自動確認」と「差分確認」を実施してください。

## 1. 作業前

- [ ] `git status --short --branch` で開始時点の差分を確認する
- [ ] `git pull --ff-only` で `origin/main` と同期する
- [ ] 保存処理や復元処理を変更する場合は、実データのJSONバックアップを取得する
- [ ] 変更対象ファイルと、変更しない保存キー・データ構造を明記する

## 2. 自動確認

```bash
node tests/brain-golden/run-brain-golden.mjs
node tests/static-regression-check.mjs
node --check app.js
git diff --check
```

- [ ] Brain golden testのfixture（候補なし、予定あり、未完了多数、執筆中、記憶あり、体調低め、学習ログ高信頼）が通る
- [ ] 完了報告に、実行した静的検査の出力を貼り付ける
- [ ] 重複IDがない
- [ ] 主要機能が利用する必須DOM IDが存在する
- [ ] `BACKUP_KEYS` と `createBackup()` の書き出し対象が一致する
- [ ] 学び、記憶、検索の主要DOMと操作クラスが存在する
- [ ] 朝の表示順を決めるCSS orderが維持されている
- [ ] dashboard直下の主要要素にCSS order指定漏れがない
- [ ] 既知の英語空文言が検出された場合は、残務として報告する
- [ ] `localStorage.setItem` の直接使用が許可範囲外に増えていない
- [ ] 720px以下の主要モバイル規則が存在する

## 3. 日付別データ

- [ ] 日付を切り替えられる
- [ ] 今日の入力を保存し、再読み込み後も保持できる
- [ ] 今日のタスクを追加・編集・完了・削除できる
- [ ] 今日の予定と定期予定を保存できる
- [ ] 発信運営を日付別に保存・復元できる
- [ ] 体調チェックを保存・復元できる

## 4. 朝の案内と対話

- [ ] 「今日のはじまり → 今日のひとこと → サマリー → 今日の見通し → 今日の提案」の順で表示される
- [ ] 今日のひとことは短く、Recommendation Actionを重複表示しない
- [ ] 「ひとことの背景」を開閉できる
- [ ] 今日の見通しに4項目が表示される
- [ ] 4つの返答ボタンすべてで最初の返答が表示される
- [ ] 生成された返答が二重表示されない
- [ ] 自然だった／違和感を記録できる
- [ ] 返答メモと提案の学習メモを保存できる
- [ ] 「さくらのなかみ」のON/OFFで対話の順序が崩れない

## 5. 自分の学び・記憶・メモ

- [ ] この日の学びを追加・編集・削除できる
- [ ] この日の学び検索が表示中の日付だけを対象にする
- [ ] 全日付検索で複数日の学びを検索できる
- [ ] 全日付検索結果は読み取り専用である
- [ ] 検索結果から該当日へ移動し、編集できる
- [ ] 「さくらに残したいこと」が空欄なら記憶へ追加されない
- [ ] 初回操作で `memoryStore.shortMemory` に記憶が追加される
- [ ] 同じ学びから再操作すると、同じsourceの記憶が更新される
- [ ] 学びを削除しても、明示的に追加した記憶は残る
- [ ] さくらの記憶一覧を部分一致検索できる
- [ ] 記憶を種類で絞り込める
- [ ] 記憶一覧は初期10件で、さらに10件表示できる
- [ ] 「忘れる」をキャンセルした場合は記憶が残る
- [ ] 「忘れる」を承認した場合は該当する短期記憶だけが削除される
- [ ] 記憶を削除してもプロジェクト記憶は変化しない
- [ ] 残るメモを保存・検索できる

## 6. あとで見る・あとで読む

- [ ] 追加・編集・完了・削除ができる
- [ ] 保存配列の新しい順で表示される
- [ ] 初期表示は先頭10件である
- [ ] 「さらに10件表示」が動作する
- [ ] 検索結果も保存配列の順序を維持する

## 7. JSONバックアップと復元

本番データを直接使った復元試験は避け、別のブラウザプロファイルまたは検証環境で行います。

- [ ] JSONバックアップを書き出せる
- [ ] 日付別データ、あとで見る、残るメモを含む
- [ ] 提案学習ログと返答フィードバックを含む
- [ ] `sakura-memory-store-v1` を含む
- [ ] `sakura-learning-log-v1` を含む
- [ ] `sakura-snapshot-settings-v1` を含む
- [ ] 取り込み前の自動バックアップが生成される
- [ ] 新形式バックアップを復元できる
- [ ] 追加3キーを含まない旧バックアップもエラーなく復元できる
- [ ] 旧バックアップにないキーの現在値が消えない
- [ ] 復元前後で代表データの件数と内容が一致する

## 8. 表示確認

- [ ] デスクトップで4つのゾーンとパネル順が崩れていない
- [ ] 720px以下で1列表示になり、文字や操作がはみ出さない
- [ ] 学び検索の見出し、件数、結果カードがモバイルで折り返される
- [ ] 入力欄、ボタン、説明文が重ならない
- [ ] コンソールエラーがない

## 9. 実ブラウザを自動確認できない場合

- [ ] `node tests/static-regression-check.mjs` を実行する
- [ ] 対象関数をインメモリで実行し、境界条件を確認する
- [ ] `git diff` で保存処理、キー、バックアップ形式への意図しない変更がないことを確認する
- [ ] 実ブラウザ未確認であることを報告に明記する

静的検査は、クリック、再読み込み、localStorageの実保存、見た目、コンソールエラーを完全には代替しません。

## 10. 完了時

- [ ] `git diff --check` が成功する
- [ ] `node --check app.js` が成功する
- [ ] `node tests/static-regression-check.mjs` の出力を完了報告に貼り付ける
- [ ] commit対象が依頼範囲だけである
- [ ] push後に `git status --short --branch` がcleanである
- [ ] `main` と `origin/main` が同期している

## Step11-d. Epic 3保守ルール固定

- [ ] `docs/app-js-map.md` が存在し、`app.js` の責務、保存入口、Backup / Snapshot入口、実行時移設一覧を確認できる
- [ ] `docs/design-rules.md` が存在し、4ゾーン、朝の一本道、保存キー追加、CSS order、UI文言、1Step=1コミットのルールを確認できる
- [ ] READMEから `docs/app-js-map.md` と `docs/design-rules.md` へ辿れる
- [ ] `app.js` 分割は今回行わず、別Epicへ送る方針が明記されている
- [ ] `cockpit.html` / `cockpit.js` は未接続の Intent Layer 候補として残す
- [ ] cockpit関連ファイルの削除判断、表示文字化け修正、dashboard統合判断は別タスクで扱う
- [ ] `app.js` / `index.html` / `styles.css` に意図しない差分がない
- [ ] `BACKUP_KEYS` / `createBackup()` / restore周辺に意図しない差分がない

## Step12-c. Brain収集フェーズ一本化

- [ ] `collectBrainContext()` が `renderBrainPrototype()` の直前にあり、Brain判断の収集値を返している
- [ ] `collectBrainContext()` が `getDay()`、`saveStore()`、`localStorage.setItem()` を呼んでいない
- [ ] `renderBrainPrototype()` と Brain golden test が同じ `collectBrainContext()` を使っている
- [ ] Brain golden testの期待値JSONに差分がない
- [ ] Priority採点、Recommendation type、Explain / Replyの判断順に意図しない変更がない
- [ ] localStorageキー・`BACKUP_KEYS`・`createBackup()`・restore周辺に差分がない

## Step12-d. Brain決定フェーズ一本化

- [ ] `buildBrainDecision(brainContext)` がPriority / Recommendationの決定段をまとめている
- [ ] `renderBrainPrototype()` と Brain golden test が同じ `buildBrainDecision()` を使っている
- [ ] `buildBrainDecision()` にDOM描画や保存副作用が含まれていない
- [ ] `syncCurrentLearningLog()`、`upsertShortMemory()`、`upsertEmotionalResonance()` の呼び出し位置と挙動が変わっていない
- [ ] Priorityの重み、条件順、sort順、理由文が変わっていない
- [ ] `rankedCandidates` 上位3件、`priorityCandidate`、`recommendationInput` が変わっていない
- [ ] `baseRecommendation` のtype、reasons、message、actionTextが変わっていない
- [ ] 記憶ありfixtureでrank / base Recommendation typeが変わらず、`memoryNote` が維持されている
- [ ] 体調低めfixtureでrank / base Recommendation typeが変わらず、`healthAwareRecommendation` が維持されている
- [ ] 学習ログ高信頼fixtureでrank / base Recommendation typeが変わらず、`actionText` / `adaptiveNote` の調整が維持されている
- [ ] Brain golden testの期待値JSONに差分がない
- [ ] `index.html` / `styles.css` に差分がない
- [ ] localStorageキー・`BACKUP_KEYS`・`createBackup()`・restore周辺に差分がない

## Step12-e-1. Brain表現出力のgolden固定

- [ ] `node tests/brain-golden/run-brain-expression-golden.mjs` が成功する
- [ ] Recommendationのtitle、message、actionText、reasonsが固定されている
- [ ] Explain Layer、朝のひとこと、Daily Focus、Context Summary、Focus Taskが固定されている
- [ ] `pickDailyFocusTask(todayTasks, dailyTasks)` の呼び出し条件が `buildContextSummary()` と `renderDailyFocusLayer()` で同一である
- [ ] 既存のBrain golden testが成功する
- [ ] `app.js`、`index.html`、`styles.css` に差分がない
- [ ] localStorageキー・`BACKUP_KEYS`・`createBackup()`・restore周辺に差分がない

## Step11-b. 最近7日の発信運営

- [ ] 発信運営パネル内に「最近7日の発信運営」が表示される
- [ ] 基準日（activeDate）を含む過去7日間だけが対象になる
- [ ] 月またぎ・年またぎでも日付キーがローカル日付基準で生成される
- [ ] 日付切り替えで対象期間と日別カードが切り替わる
- [ ] 存在しない日付や欠損 `publishingOps` があっても `store` に日付データを追加しない
- [ ] 4種類の投稿数は空欄・不正値を0として数値合計される
- [ ] おはスタック「できた／少しできた」の日数が集計される
- [ ] 「未確認」「できなかった」だけの日は記録済み扱いにならず「記録なし」になる
- [ ] 保存後に最近7日表示が更新される
- [ ] localStorageキー・バックアップ形式・保存形式に変更がない
- [ ] 720px以下で集計カードと日別カードが1列表示になり、はみ出さない
