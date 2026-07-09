# Epic: app.js の機械的分割 — 実装指示書

作成日: 2026-07-10
作成: Fable 5（設計）／実装担当: Codex
対象: operation-dashboard

この文書だけでCodexが完走できるように書いてある。判断に迷ったら実装せず、
docs/design-decisions.md（特にD10・D11）と docs/review-playbook.md に照らし、
それでも決まらなければ質問として持ち帰ること。

---

## 0. 目的と大原則

約8,700行・400超の関数を持つapp.jsを、**挙動を1ミリも変えずに**責務ごとの複数ファイルへ分割する。

- **機能変更・改善・リネーム・整形は一切禁止。** 関数は「移動」のみ。「ついでに直す」は本Epicで最も危険な行為
- **ES Modules（import / export / type="module"）は使用禁止。** file://直開きで動かなくなるため（design-decisions D10）。従来型`<script>`タグの並び順とグローバル共有で実現する
- 1ファイルの切り出し＝1コミット。**一括分割は禁止**。各コミットで全検査を通してから次へ
- 分割中は他の変更（機能・文言・CSS）を一切混ぜない

## 1. 分割の完成形

`js/` ディレクトリを作り、読み込み順が名前で分かる番号付きファイルにする:

| ファイル | 中身 | 目安 |
|---|---|---|
| js/01-constants.js | 全STORAGE_KEY定数・BACKUP_KEYS・固定文言・設定値 | 定数のみ |
| js/02-state.js | 可変状態（activeDate, laterItems, memoryStore等のlet群）と、状態のload/save関数 | データ層 |
| js/03-utils.js | 純粋ヘルパー（日付整形・正規化・sortLaterItemsForDisplay等。DOM/保存に触れないもの） | 純粋関数 |
| js/04-brain.js | 判断パイプライン一式（collectBrainContext / buildBrainDecision / buildBrainExpression と配下のエンジン群） | 判断層 |
| js/05-features.js | 各パネルの機能ロジック（later / learning / memory / publishing / schedule / health 等）。大きければ05a/05bに分けてよい | 機能層 |
| js/06-render.js | render系関数と表現の描画 | 描画層 |
| js/07-snapshot-backup.js | スナップショット生成・バックアップ/復元 | 入出力 |
| js/99-init.js | 起動処理・イベント登録・moveDashboardNodeの移設リスト・renderAll呼び出し | 起動（必ず最後） |

区画の特定には docs/app-js-map.md を使う。マップと実態がズレている箇所を見つけたら、マップ側を修正するコミットを先に積む。

## 2. 技術規則（従来型script分割の落とし穴。全て必読）

1. **index.htmlの`<script>`タグは上表の番号順に並べる。** 読み込み順＝依存順
2. **99-init.js以外のファイルには、トップレベルで実行されるコードを置かない。** 宣言（function / const / let）のみ。ファイル読み込み時に何かが走る構造は、順序バグの温床になる。現在のapp.jsに宣言以外のトップレベル実行文がある場合、すべて99-init.jsへ集める
3. トップレベルの const / let は従来型scriptでは全ファイル共有のグローバルになる。**同名の再宣言は即エラー**になるため、定数・状態は01/02に一度だけ宣言する
4. 関数の巻き上げ（hoisting）はファイル内でしか効かない。**「定義より先に呼ぶ」関係がファイルをまたぐ場合、呼ぶ側が後の番号になるよう配置する**（規則2を守れば、実行はすべて99なので自然に満たされる）
5. cockpit.html / cockpit.js は本Epicの対象外。触らない

## 3. テストの改修（分割の前にやる。ここが本Epicの安全網）

**Step 0（最初のコミット）**: 各テスト（startup-smoke / brain-golden / expression golden / later-items-sort-check / static-regression-check）のコード読み込み部を、**「index.htmlの`<script>`タグを解析し、書かれている順に全ファイルを読み込む」方式に変更する**。app.jsのパスを直書きしている箇所を全廃する。
理由: これを先にやれば、分割の全過程でテストが「実際のページと同じ読み込み」を検査し続ける。分割後にテストだけ古いapp.jsを見ている、という空洞化を構造的に防ぐ。

**Step 0に含める追加検査（static-regression-checkへ）**:
- 関数名の棚卸し: 分割前のapp.jsから全関数名一覧を採取して検査に固定し、分割後も**全ファイル合計の関数名集合が完全一致**することを検査する（移動漏れ・重複の機械的検出）
- index.htmlのscriptタグが js/01→99 の番号順であることの検査

## 4. 実行手順

- **Step 0**: テスト改修＋関数棚卸し検査（上記）。app.jsはまだ触らない
- **Step 1**: js/01-constants.js を切り出す（最小リスク・定数のみ）。index.htmlにscriptタグ追加。全検査＋手動確認
- **Step 2〜7**: 02→03→04→05→06→07 の順に、1ファイル＝1コミットで切り出す。毎回、app.jsから該当部分を削除し、残りが空に近づいていく
- **Step 8**: 残ったトップレベル実行文と起動処理を js/99-init.js へ。app.jsが空になったら削除し、index.htmlの`<script src="./app.js">`を除去
- **Step 9**: docs/app-js-map.md を新ファイル構成で書き直す。README等にapp.jsへの言及があれば更新

## 5. 各Stepの確認手順（毎回すべて）

1. node tests/startup-smoke.mjs（起動が例外なく完走）
2. brain / expression / snapshot ゴールデン全通過（**バイト一致**）
3. node tests/later-items-sort-check.mjs
4. node tests/static-regression-check.mjs（関数棚卸し一致を含む）
5. 手動: ブラウザでfile://直開き＋GitHub Pages経由の両方で、時刻・ひとこと・朝の対話一式・保存→リロード復元・バックアップのエクスポートが動くこと
6. 完了報告: コミットhash＋切り出した関数数＋棚卸し検査の出力＋手動確認の列挙

## 6. 中断とロールバック

- どのStepで検査が落ちても、そのコミットをrevertすれば直前の健全な状態に戻る（1Step=1コミットの目的はこれ）
- 原因が10分調べて分からなければ、深追いせずrevertして質問として持ち帰る
- 分割は急ぎの作業ではない。運用観察期間の、静かな日に少しずつ進めてよい

## 7. 完了の定義

- app.jsが消え、js/01〜99が番号順に読み込まれている
- 全自動検査が緑、手動確認が全項目通過
- 分割前後で、さくらの画面・データ・提案・言葉に**いかなる違いもない**（利用者が分割に気づかないことが、本Epicの成功)
