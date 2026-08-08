# 生活・発信ダッシュボード

生活と発信で使うアプリへの入口と、毎日の行動を一画面で確認するための静的ダッシュボードです。

## 機能

- 全アプリ共通ナビゲーション（ダッシュボード / 各Labo へワンクリック移動）
- 今日の日付、現在時刻、進捗率、完了数の表示
- よく使うLaboアプリへのホーム導線
- あとで見る / あとで読むリスト
- Knowledge Labo（知識ラボ）で、本・PDF・Podcast・ライブ・コメント・実験結果から得た知識を資産化
- 読書テンプレートのワンクリックコピーと、知識ベース登録用の出力管理
- 知識カードのタグ横断検索、未活用知識、情報源ごとのまとまり、コンテンツ実績の確認
- 知識カード上部に一言結論、今日使えること、重要な考え方、明日試すこと、自分評価を表示
- 1冊目サンプル追加で「AI時代の1行コンセプト設計」の知識カードをすぐ登録
- `?seed=smallbiz` で「AI時代の小さく始めるスモビジ実践書」の知識カードをすぐ登録
- `?seed=psychology` で「人生とビジネスに効く10の心理学実践書」の知識カードをすぐ登録
- `?seed=treasure` で「AI時代の宝探し実践書」の知識カードをすぐ登録
- `?seed=idea` で「令和AI時代のアイデア実践書」の知識カードをすぐ登録
- `?seed=story-profile` で「AI時代の自己紹介・発信を物語に変える実践書」の知識カードをすぐ登録
- `?seed=concept-design` で「令和版・コンセプト設計 実践書」の知識カードをすぐ登録
- `?seed=value-os` で「令和版 価値で選ばれる思考OS実践書」の知識カードをすぐ登録
- `?seed=action-profile` で「行動を生む自己紹介 実践書」の知識カードをすぐ登録
- `?seed=copy-target` で「売れる文章は接点で決まる 商品×ターゲット設計 実践書」の知識カードをすぐ登録
- `?seed=trust-charisma` で「信頼で選ばれるカリスマ設計実践書」の知識カードをすぐ登録
- `?seed=three-week-funnel` で「3週間で参加者を集める発信導線実践書」の知識カードをすぐ登録
- `?seed=sns-trust-asset` で「SNS資産を本の代わりにする信頼導線実践書」の知識カードをすぐ登録
- `?seed=selling-copywriting` で「売れるコピーライティング実践書」の知識カードをすぐ登録
- `?seed=forbidden-words` で「挑戦を止める7つの禁止コトバ 実践書」の知識カードをすぐ登録
- `?seed=twelve-questions` で「ピンチを行動に変える12の質問 実践書」の知識カードをすぐ登録
- `?seed=all-knowledge` でKnowledge Laboの登録済みサンプルカードを未登録分だけ一括追加
- `?seed=reset-knowledge` でKnowledge Laboの登録済みサンプルカードを64件に復旧
- 毎日タスクの追加、編集、削除、完了チェック
- 今日やることの追加、編集、削除、並び替え、完了チェック
- 育てるプロジェクトのチェック
- メール（朝・昼・夜チェック＋最後に確認した時間の自動記録）、DMの記録
- 今日の振り返り
- Codexへ渡す日次まとめ（Obsidian投入用）
- 日付ごとの保存、過去データ閲覧、検索
- CSVバックアップ

## 使い方

`index.html` をブラウザで開くと使えます。データはブラウザの `localStorage` に保存されます。

既存のダッシュボードデータは `operation-dashboard-v1`、あとで見る / あとで読むは `operation-dashboard-later-v1` に保存されます。

## Phase1 運用確認手順

1. 既存データが表示されること
2. CSV書き出しができること
3. JSONバックアップを書き出せること
4. さくらAIパネルが表示されること
5. 朝モードのスナップショットを生成できること
6. 夜モードのスナップショットを生成できること
7. スナップショットをコピーできること
8. スナップショットをダウンロードできること
9. Substackデータに `emailList` が含まれていないこと
10. ストックOFF時に `"stock-labo": null` になること

## 回帰確認

Step8以降の画面構成、保存データ、バックアップを守るため、変更後は静的回帰チェックを実行します。
Brain判断を触る場合は、先にゴールデンテストで現在の判断結果を固定します。

```bash
node tests/brain-golden/run-brain-golden.mjs
node tests/static-regression-check.mjs
node --check app.js
git diff --check
```

実ブラウザで確認する操作とデータ保護手順は、[回帰確認チェックリスト](docs/regression-checklist.md)を参照してください。

## 保守メモ

- [app.js Map](docs/app-js-map.md): `app.js` の責務、保存入口、Backup / Snapshot入口、実行時移設一覧
- [Design Rules](docs/design-rules.md): 4ゾーン構成、保存キー追加、CSS order、静的検査の運用ルール
- [Decision Pipeline](docs/decision-pipeline.md): Epic 4の4段漏斗、AI判断フロー、Step12-bゴールデンテスト方針
