# First Agent Interaction Design

日付: 2026-07-04

目的: Sakura AI Brain の Recommendation に対して、ユーザーが返事できる最初のAgentを設計する。

この文書は設計メモです。コード、README、localStorageデータ、Snapshot仕様は変更しません。

## 1. First Agent の目的

First Agent は、Recommendation に対するユーザーの返事を受け取るための最初の対話レイヤーです。

First Agent は、実行するAgentではありません。

やらないこと:

- 投稿しない。
- 送信しない。
- 削除しない。
- タスクを完了にしない。
- Laboへ自動で書き戻さない。
- AI APIを自動で呼ばない。
- ユーザーの代わりに判断を確定しない。

やること:

- Recommendation に対するユーザーの反応を受け取る。
- 返事を短く構造化する。
- 次に表示する言葉をやさしく返す。
- 将来のMemory Layerの材料になる最小限の情報を、必要になったときだけ扱えるようにする。

First Agent の成功条件は、ユーザーが「提案されたけれど、選べる」と感じられることです。

## 2. Recommendation との関係

Recommendation Engine は、Priority Engine の結果をもとに、自然な提案文を生成します。

ユーザーは、その提案を見て、自分の状態やIntentに合わせて返事を選びます。

First Agent は Recommendation を直接受け取るAgentではありません。

First Agent が受け取るのは、Recommendationを見たユーザーの返事です。

関係:

```text
First Agent
↓
Memory Layer
↓
Brain
↓
Recommendation
↓
User
↓
First Agent

Learning Layer
  必要時のみ横から参照する
```

Learning Layer は毎回動くものではありません。

Learning Layer は、First Agentの返事を直接処理して即座に提案を変える層ではなく、必要なときだけ横から参照される補助レイヤーです。

Recommendation Engine が出すもの:

- 提案タイプ
- 提案タイトル
- 提案本文
- 提案理由
- 小さな次の一歩

First Agent が受け取るもの:

- どのRecommendationに対する返事か。
- ユーザーがどう反応したか。
- その返事に短いメモがあるか。
- 今日のIntentやEnergyと矛盾しないか。

First Agent は Recommendation の内容を実行しません。返事を受け取り、次の表示文を返すだけです。

## 3. Intent Layer との関係

Intent Layer は、operation-cockpit から渡される「今日は何を大切にしたいか」の入力レイヤーです。

First Agent は、ユーザーの返事を Intent Layer と並べて扱います。

例:

- Intent: 「今日は記事を書く」
- Recommendation: 「記事の下書きを15分だけ進めませんか？」
- User Reply: 「やってみる」

この場合、First Agent は「意思」と「提案」と「返事」が揃っていると判断できます。

別の例:

- Intent: 「今日は休む」
- Recommendation: 「記事を書くタイミングかもしれません」
- User Reply: 「今日は休む」

この場合、First Agent は Recommendation よりもユーザーの返事を優先します。

原則:

- Intent は事前の意思。
- Recommendation はAIからの提案。
- User Reply はその場の選択。
- User Reply が最も強い。

## 4. ユーザーの返事パターン

初回実装では、返事は4つに絞ります。

| 返事 | 意味 | 扱い |
|---|---|---|
| やってみる | 提案を受け入れる | 小さく始める方向で応答する |
| あとで | 今は保留する | 圧をかけず、後で見直せる形にする |
| 今日は休む | 休息を優先する | 休む選択を肯定する |
| 別のことをする | 提案とは違う行動を選ぶ | ユーザーの選択を尊重する |

自由記述メモは任意です。

例:

- 「15分だけ」
- 「夜にやる」
- 「今日は無理」
- 「別件を先にする」

## 5. 返事ごとのAI応答例

### やってみる

```text
いいですね。完了まで行かなくて大丈夫です。
まず15分だけ、軽く触るところから始めましょう。
```

別案:

```text
受け取りました。
今日はこの流れを少しだけ進める日にして良さそうです。
```

### あとで

```text
了解です。今は保留で大丈夫です。
あとで見直せる候補として、そのまま置いておきましょう。
```

別案:

```text
今すぐ動かなくて大丈夫です。
必要になったら、もう一度候補として見直しましょう。
```

### 今日は休む

```text
了解です。今日は休む選択を優先しましょう。
提案は置いておいて、回復を先にして大丈夫です。
```

別案:

```text
休む日にしましょう。
何かを進めるより、整えることを今日の一歩にして良さそうです。
```

### 別のことをする

```text
了解です。今の自分に合う方を選んで大丈夫です。
この提案は候補として残しつつ、今日は別のことを優先しましょう。
```

別案:

```text
受け取りました。
提案と違う選択でも問題ありません。今日の判断を優先しましょう。
```

## 6. 保存する情報

初回実装では保存しません。

これは一時的な制限ではなく、First Agentの初回設計思想です。

最初のFirst Agentは、ユーザーの返事を受け取り、その場でやさしく応答するだけにします。

localStorageへ保存せず、Snapshotにも含めず、Memory Layerにも渡しません。

保存は、ユーザーがFirst Agentとのやり取りに慣れ、明示的に「残したい」と選べる段階になってから追加します。

将来保存する場合も、書き込みは最小限にします。

保存候補:

```json
{
  "id": "agent-reply-2026-07-04-001",
  "createdAt": "2026-07-04T09:00:00.000Z",
  "date": "2026-07-04",
  "recommendationId": "rec-2026-07-04-001",
  "recommendationType": "start_small",
  "candidateId": "task-1",
  "reply": "やってみる",
  "memo": "15分だけ",
  "energyState": "Normal",
  "momentumState": "Rising",
  "intentSummary": "今日は記事を書く"
}
```

初回実装で保存する最小項目:

- なし

将来、明示保存を実装する場合の最小項目:

- `createdAt`
- `date`
- `recommendationType`
- `candidateId`
- `reply`
- `memo`

保存先候補:

- `sakura-first-agent-replies-v1`

保存はユーザー操作によってのみ行います。

自動保存は禁止です。

## 7. 保存しない情報

初回実装では、以下は保存しません。

- 実行結果
- 作業時間
- 完了/未完了
- 投稿本文
- 送信内容
- 削除対象
- 外部サービスへの操作履歴
- AI APIの応答全文
- 個人名や連絡先
- Substackの `emailList`
- ユーザーが入力していない推測情報

First Agent は「返事」だけを扱います。

## 8. Memory Layer への橋渡し

Memory Layer は、ユーザーの選択の履歴を読み取り、将来の文脈にする層です。

First Agent は Memory Layer に直接学習させません。

初回実装では、First Agent は Memory Layer に何も保存しません。

Memory Layer への橋渡しは、将来の明示保存フェーズで検討します。

橋渡しとして残せるもの:

- どのタイプのRecommendationに返事したか。
- どの返事を選んだか。
- どの日付に選んだか。
- そのときのEnergy / Momentum。
- 任意メモ。

Memory Layerで将来使える読み方:

- 「Low Energy のときは休む返事が多い」
- 「執筆系Recommendationには、やってみるが多い」
- 「夜はあとでが増える」
- 「IntentとRecommendationが一致すると受け入れやすい」

Memory Layer は、記録を参照するだけで、自動で行動を変えないことが重要です。

## 9. Learning Layer への橋渡し

Learning Layer は、ユーザーに合う提案の形を必要時に見直すための補助レイヤーです。

Learning Layer は、First Agentの返事のたびに毎回動くものではありません。

基本の循環は、First Agent、Memory Layer、Brain、Recommendation、User、First Agentです。

Learning Layer は、この循環の外側から必要時のみ参照されます。

将来、ユーザーが明示的に許可した場合、First Agent の返事は Learning Layer にとって安全なフィードバックになります。

将来の学習例:

- `やってみる` が多いRecommendation typeを少し優先する。
- `今日は休む` が多いEnergy状態では、休息提案を増やす。
- `あとで` が続く候補は、提案文を軽くする。
- `別のことをする` が多いカテゴリは、Priority重みを見直す。

ただし、初回実装では学習しません。

また、初回実装では保存もしないため、Learning Layer が参照する履歴も作りません。

Learning Layerへの発展条件:

- ユーザーが明示的に学習ONを選ぶ。
- 学習内容を表示できる。
- いつでもリセットできる。
- 自動実行や自動保存を増やさない。

## 10. UI案

Recommendationカードの下に、短い返事ボタンを置きます。

UI案:

```text
Recommendation

おはよう、さくら。
今日は記事を書くタイミングかもしれません。

理由
- 発酵中アイデアがあります。
- 執筆中の記事があります。
- 今日は勢いがあります。

まず15分だけ始めてみませんか？

[やってみる] [あとで] [今日は休む] [別のことをする]

メモ（任意）
[ 15分だけ / 夜にやる / 今日は無理 など ]
```

UI原則:

- ボタンは4つだけ。
- 返事は1タップで選べる。
- メモは任意。
- 保存前に確認文を出してもよい。
- 返事後の文は短くやさしくする。
- 返事を選んでもタスク完了にはしない。

## 11. 最小実装ステップ

1. First Agent の保存キーを設計する。
2. Recommendation に安定した `recommendationId` を付ける。
3. Recommendationカードに4つの返事ボタンを追加する。
4. 任意メモ欄を追加する。
5. ボタン選択時にFirst Agent応答文を表示する。
6. 初回は保存なしでUI反応だけ実装する。
7. 次段階で、ユーザーが明示的に保存する場合のみ `sakura-first-agent-replies-v1` に保存する。
8. Snapshotには初回では含めない。
9. Memory Layer設計後に、必要な範囲だけSnapshotへ含める。
10. `node --check app.js` とブラウザコンソール確認を行う。

推奨する初回スコープ:

- UI表示
- 返事ボタン
- 返事に応じたAI応答文
- localStorage保存なし

次段階スコープ:

- 明示保存
- 最小ログ
- Snapshot連携
- Memory Layer連携

## 12. リスクと注意点

| リスク | 内容 | 対策 |
|---|---|---|
| 実行Agentに見える | ボタンがタスク実行や完了に見える | 文言を「返事」に寄せ、完了処理はしない |
| 書き込みが増えすぎる | 返事ログが多くなる | 初回は保存なし、次段階でも最小項目だけ |
| ユーザーに圧がかかる | 「やる」前提に見える | 「あとで」「今日は休む」を同じ重みで置く |
| 学習が勝手に始まる | 返事を元に自動調整してしまう | Learning Layerは明示ONまで実装しない |
| プライバシー | メモに個人情報が入る可能性 | メモは任意、Snapshot連携は後回し |
| 自動実行 | 返事を選ぶとタスク完了や投稿が走る | First Agentは表示応答のみ。外部副作用は禁止 |
| Recommendation ID不安定 | 履歴と候補を結びにくい | 初回は保存しない。保存段階でID設計を行う |

## 結論

First Agent は、Sakura AI Brain がユーザーに提案した後、ユーザーの返事を受け取るための最初の対話レイヤーです。

最初のAgentは実行しません。記録を消したり、投稿したり、タスクを完了にしたりしません。

初回は、Recommendationカードに4つの返事を置き、返事に応じたやさしい応答文を表示するところから始めるのが安全です。

保存、Memory Layer、Learning Layerは次の段階で、明示的な同意と最小データから始めます。

## Design Philosophy

First Agent の目的は、
AIに従わせることではありません。

AIと人が
一緒に選ぶことです。

Recommendation は提案です。

最終判断は
常にユーザーが行います。

First Agent は
その選択を尊重します。

Sakura AI は
ユーザーの代わりに決めるAIではなく、
ユーザーと一緒に考えるAIを目指します。
