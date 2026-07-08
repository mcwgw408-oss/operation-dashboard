# Design Rules

Epic 3 / Step11-d 時点の保守ルールです。迷った場合は、機能追加よりも保存データと朝の流れを守ります。

## 画面構成

- 4ゾーン構成を崩さない。
  - 今日のはじまり
  - ここから、今日を書く
  - 今日をためていく
  - ふだんは閉じているもの
- 朝の一本道の順序を守る。
- `dashboard` 直下に要素を追加する場合は、CSSで `order` を必ず指定する。
- ページ内移動など、アンカーやHTML/CSSだけで成立するUIではJavaScriptを増やさない。
- UI表示文言は原則日本語にする。ユーザーに見える空文言やエラー文に英語を残さない。

## 保存データ

- localStorageキーを追加・変更する場合は、以下を同じStepで更新する。
  - `BACKUP_KEYS`
  - `createBackup()`
  - restore処理
  - Snapshot対象にするかどうかの判断
  - 関連docs
  - `tests/static-regression-check.mjs`
- `localStorage.setItem` は原則として保存関数、バックアップ復元、Snapshot設定、既存初期化補完の中だけで使う。
- 保存形式、バックアップ形式、復元処理を変えるStepでは、完了報告に差分確認結果を明記する。

## 実行時移設

- `moveDashboardNode()` による実行時移設を増やす場合は、`docs/app-js-map.md` の一覧へ同時追記する。
- 移設元と移設先のDOM ID / classを静的検査で守る。
- 移設で朝の一本道や4ゾーンの意味を変えない。

## docs

- 現役docs、設計メモ、archive候補を混ぜない。
- `cockpit.html` / `cockpit.js` は未接続の Intent Layer 候補であり、削除判断は別タスクで行う。
- `app.js` 分割は別Epicで行う。Step11-dでは地図とルールで触り方を固定する。

## 作業単位

- 1Step = 1コミットを原則にする。
- 完了報告には、実行した静的検査の出力を添付する。
- 最低限、以下を実行する。

```bash
node tests/static-regression-check.mjs
node --check app.js
git diff --check
git status --short
```

- 本体ファイルを触らないStepでは、`app.js` / `index.html` / `styles.css` に差分がないことを明記する。
