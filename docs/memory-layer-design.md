# Memory Layer Design

日付: 2026-07-04

目的: Sakura AI が将来ユーザーとの対話を文脈として扱えるようにするための Memory Layer を設計する。

この文書は設計メモです。コード、README、localStorageデータ、Snapshot仕様は変更しません。

## 1. Memory Layer の目的

Memory Layer の目的は、Sakura AI がユーザーとのやり取りを将来の文脈として安全に扱えるようにすることです。

Memory Layer は「たくさん覚える」ための層ではありません。

Memory Layer は「安心して覚えられる」ための層です。

目的:

- ユーザーの選択を、必要最小限だけ残す。
- 何を覚えているかをユーザーが確認できるようにする。
- いつでも削除・リセットできるようにする。
- Recommendation や Conversation を少し自然にする。
- Learning Layer が勝手に動かないよう、記憶と学習を分ける。

Memory Layer は、ユーザーの代わりに判断するための記憶ではありません。

ユーザーが自分で選び続けるために、必要な文脈だけをそっと支えるための記憶です。

## 2. Brainとの関係

Brain は、その日の状態、Priority、Recommendation、Intent、First Agentの返事などを見て判断する中心です。

Memory Layer は、Brainに過去の軽い文脈を渡します。

関係:

```text
Memory Layer
↓
Brain
↓
Recommendation
↓
User
↓
First Agent
```

Brain が Memory Layer から受け取るもの:

- 最近よく選ばれている返事傾向。
- 休む選択が増えているか。
- あとでが続いている候補があるか。
- Intent と User Reply が一致しやすいか。
- 受け取りやすいConversation表現の傾向。

Brain がしてはいけないこと:

- Memoryだけで優先順位を決める。
- Memoryを理由にユーザーへ圧をかける。
- 古い記憶を現在のユーザーより優先する。
- Memoryを使って自動実行する。

Memory はBrainを補助しますが、Brainの判断を支配しません。

## 3. First Agentとの関係

First Agent は、Recommendationを見たユーザーの返事を受け取るレイヤーです。

初回実装では、First Agentは保存しません。

Memory Layerと接続するのは、将来、ユーザーが明示的に保存を許可した段階です。

First Agentから将来Memory Layerへ渡せるもの:

- 返事種別: `やってみる`, `あとで`, `今日は休む`, `別のことをする`
- 対象Recommendationの種類
- 対象候補ID
- 任意メモ
- 日付
- Energy
- Momentum
- Intentの要約

重要な原則:

- First Agentは自動保存しない。
- 保存はユーザー操作でのみ行う。
- 保存しない選択も自然にできる。
- 保存しなくてもFirst AgentのUIは成立する。

## 4. Conversation Engineとの関係

Conversation Engine は、First Agentの返事に対して短い `Companion Response` を返すレイヤーです。

初回実装では、Conversation Engineも保存しません。

Memory Layerと将来接続する場合、保存対象は会話全文ではなく、最小限の構造化情報にします。

将来保存してよい候補:

- 表示したConversationタイプ
- ユーザーが選んだ返事
- Energyに応じた表現種別
- Intentとの一致/不一致

保存しないもの:

- 会話全文
- 長い自由記述
- AIの内部判断
- ユーザーが明示していない感情推測

Conversation Engine は、Memory Layerに「その人らしい文体」を直接学習させません。

文体調整はLearning Layerの領域であり、Memory Layerは参照可能な材料を安全に保つだけです。

## 5. 覚える情報

Memory Layer が覚える情報は、少なく、構造化され、ユーザーが意味を理解できるものに限定します。

保存候補:

```json
{
  "id": "memory-2026-07-04-001",
  "createdAt": "2026-07-04T09:00:00.000Z",
  "date": "2026-07-04",
  "source": "first-agent",
  "recommendationType": "start_small",
  "candidateSource": "substack-labo.writing",
  "reply": "やってみる",
  "energyState": "Normal",
  "momentumState": "Rising",
  "intentMatched": true,
  "memo": "15分だけ"
}
```

覚えてよい情報:

- 返事種別
- 日付
- Recommendation種別
- 候補の出どころ
- Energy / Momentum
- Intentと返事の一致
- ユーザーが任意で書いた短いメモ

集計として覚えてよい情報:

- 最近 `今日は休む` が多い
- `あとで` が続いている
- 執筆系の提案には `やってみる` が多い
- Low Energy時は小さい提案が受け入れられやすい

## 6. 覚えない情報

Memory Layer は、何でも覚えてはいけません。

覚えない情報:

- 投稿本文
- メッセージ本文
- 送信先
- メールアドレス
- Substackの `emailList`
- 個人名や連絡先
- 削除対象
- 外部サービスの操作履歴
- 会話全文
- AI APIの応答全文
- ユーザーが明示していない感情推測
- 医療、法律、金融など高感度な判断材料
- パスワード、トークン、秘密情報

また、Memory Layer は「やらなかったこと」を失敗として覚えません。

`あとで` や `今日は休む` は、失敗ではなく選択として扱います。

## 7. 保存期間の考え方

Memory Layer の保存期間は、短期・中期・長期に分けて考えます。

| 種別 | 期間 | 用途 |
|---|---|---|
| Short Memory | 7日 | 最近の状態、Energy、返事傾向を見る |
| Working Memory | 30日 | しばらく続く傾向を見る |
| Long Memory | 明示保存のみ | ユーザーが残したい傾向や好みだけ |

初回の推奨:

- 自動保存なし。
- 将来実装する場合も、まずは7日または30日で十分。
- 長期保存はユーザーの明示操作がある場合だけ。

古いMemoryの扱い:

- 古いMemoryは自動的に弱く扱う。
- 古いMemoryを現在の判断より優先しない。
- 長期保存する場合は、ユーザーが見て意味が分かる形にする。

## 8. ユーザーが削除・リセットできる設計

Memory Layer は、ユーザーがいつでも消せることを前提にします。

必要なUI:

- Memory一覧を見る。
- 1件ずつ削除する。
- 期間を指定して削除する。
- 全Memoryをリセットする。
- Memory保存をOFFにする。
- Long Memoryだけを確認する。

削除の原則:

- 削除したMemoryは復元前提にしない。
- 削除しても既存Laboデータは消さない。
- Memory削除は、タスクやSnapshotとは独立させる。
- 「リセットしてもSakura AIは使える」と明示する。

ユーザーがMemoryを消しても、Sakura AI Brainはその日のSnapshotとIntentだけで動ける必要があります。

## 9. Privacy Design

Memory Layer は、Privacyを中心に設計します。

基本方針:

- Memory保存は初期OFF。
- 保存する場合は明示的にON。
- 保存内容はユーザーが読める形にする。
- 個人名、連絡先、メール、送信内容は保存しない。
- Sensitiveな自由記述は保存しない、または短い任意メモだけにする。
- Snapshotへ含める場合は別のprivacyスイッチを設ける。

Privacyスイッチ案:

| 設定 | 初期値 | 内容 |
|---|---|---|
| Memory保存 | OFF | First Agentの返事を保存するか |
| MemoryをSnapshotに含める | OFF | AI引き渡しSnapshotにMemory要約を含めるか |
| 任意メモ保存 | OFF | ユーザーの短いメモを保存するか |
| Long Memory | OFF | 長期保存を許可するか |

Privacy上の重要ルール:

- 保存よりも安心を優先する。
- 迷う情報は保存しない。
- AIのためにユーザーへ記録を強制しない。
- Memoryはユーザーの所有物として扱う。

## 10. Learning Layerとの違い

Memory Layer と Learning Layer は別物です。

| Layer | 役割 | 自動性 |
|---|---|---|
| Memory Layer | 過去の選択や文脈を安全に保持する | 基本は保存・参照のみ |
| Learning Layer | 提案や文体の調整ルールを改善する | 明示ONのときのみ |

Memory Layer:

- 覚える。
- 見せる。
- 消せる。
- 参照する。

Learning Layer:

- 傾向を解釈する。
- 重みや表現を調整する。
- 変更理由を説明する。
- ユーザーの許可が必要。

重要:

MemoryがあるだけでLearningしてはいけません。

Learning Layer は、Memoryを材料にすることはできますが、ユーザーの明示許可なしに挙動を変えてはいけません。

## 11. 将来Snapshotとどう連携するか

初回実装では、Memory LayerはSnapshotに含めません。

将来連携する場合は、全文ではなく要約だけを含めます。

Snapshotに含める候補:

```json
"memory-layer": {
  "schemaVersion": 1,
  "data": {
    "enabled": true,
    "periodDays": 30,
    "summary": {
      "replyCounts": {
        "try": 4,
        "later": 3,
        "rest": 2,
        "other": 1
      },
      "energyNotes": [
        "Low Energyの日は休む選択が増えています。"
      ],
      "intentAlignment": "Intentと返事が一致する日が多いです。"
    }
  }
}
```

Snapshot連携ルール:

- 初期OFF。
- ユーザーがONにした場合のみ含める。
- 原文ではなく要約を優先する。
- 個人情報や会話全文は含めない。
- Snapshotを見れば、何が含まれているか分かるようにする。

Memory LayerがSnapshotに入っても、AIはそれを命令として扱いません。

あくまで文脈として参照します。

## 12. Design Philosophy

Memoryは、AIのためではなく、ユーザーのために存在する。

Memory Layer の目的は、
たくさん覚えることではありません。

安心して覚えられることです。

Sakura AI は、
ユーザーを監視するAIではありません。

ユーザーの代わりに決めるAIでもありません。

Memory は、
ユーザーが自分で選んできたことを、
必要なときにそっと思い出せるようにするためのものです。

覚えることより、
消せること。

長く残すことより、
安心して扱えること。

詳しく記録することより、
ユーザーが見て理解できること。

Memory Layer は、
ユーザーの自由を狭めるためではなく、
ユーザーが自分の流れを取り戻すために存在します。
