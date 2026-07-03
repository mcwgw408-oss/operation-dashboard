# Epic2 Architecture Overview

日付: 2026-07-04

目的: Epic2全体の設計思想、アーキテクチャ、各レイヤーの役割、読み取り専用の境界、将来拡張の方向をまとめる。

この文書は設計書です。コード、README、localStorageデータ、Snapshot仕様は変更しません。

## 1. Epic2 の目的

Epic2 の目的は、Sakura AI Brain を「データを表示する画面」から「理由を説明し、提案し、ユーザーの選択を受け止めるBrain」へ育てることです。

Epic2 で作るもの:

- 既存Dashboard / Laboデータを読む土台。
- SnapshotとしてAIに渡せる文脈。
- Brainとして状態を整理する中心。
- Priority Engineとして優先候補と理由を出す仕組み。
- Recommendation Engineとして自然な提案文を出す仕組み。
- First Agentとしてユーザーの返事を受け取るUI。
- Conversation Engineとして返事に一言添える仕組み。
- Memory Layerとして、将来安心して覚えられる設計。
- Learning Layer / Future Agentへ進むための境界。

Epic2 は、AIが勝手に動く段階ではありません。

Epic2 は、AIが理由を説明し、人が選べる状態を作る段階です。

## 2. 全体アーキテクチャ図

```text
Dashboard
↓
Snapshot
↓
Brain
↓
Priority Engine
↓
Recommendation Engine
↓
User
↓
First Agent
↓
Conversation Engine
↓
Memory Layer
↓
Learning Layer
↓
Future Agent
```

この流れは、上から下へ自動実行する命令列ではありません。

現時点の中心は、DashboardからBrainまでの読み取りと、RecommendationからUserまでの提案です。

First Agent以降は、ユーザーの返事を受け止めるための対話レイヤーとして段階的に育てます。

## 3. 各レイヤーの役割

| Layer | 役割 | 現在の状態 |
|---|---|---|
| Dashboard | 日々の事実を記録する場所 | 実装済み |
| Snapshot | LaboデータをAIへ渡す読み取り専用JSON | 実装済み |
| Brain | 事実、Intent、候補、変化を整理する中心 | Prototype実装済み |
| Priority Engine | 最優先候補と理由を計算する | 初回実装済み |
| Recommendation Engine | Priority結果を自然な提案文に変換する | 初回実装済み |
| User | 提案を見て選ぶ主体 | 設計の中心 |
| First Agent | ユーザーの返事を受け取る | UI Prototype実装済み |
| Conversation Engine | 返事に短いCompanion Responseを返す | 設計済み |
| Memory Layer | 安心して覚えられる文脈を扱う | 設計済み |
| Learning Layer | 必要時のみ傾向を参照し、調整案を作る | 未実装 |
| Future Agent | 明示承認のもとで将来の行動支援を行う | 未実装 |

## 4. データの流れ

### 事実の流れ

Dashboard と各Laboは、日々の事実をlocalStorageに保存します。

Snapshotは、それらのデータを読み取り、AI引き渡し用のJSONにまとめます。

Brainは、Snapshotや画面上の読み取りデータをもとに、今日の状態を整理します。

### 判断の流れ

Priority Engineは、候補を集め、点数と理由を作ります。

Recommendation Engineは、Priority結果をそのまま命令にせず、ユーザーが受け取りやすい提案文に変換します。

### 選択の流れ

UserはRecommendationを見て、選びます。

First Agentは、その返事を受け取ります。

Conversation Engineは、その返事に対して短いCompanion Responseを返します。

### 文脈の流れ

Memory Layerは、将来ユーザーが明示的に許可した場合のみ、返事や傾向を最小限に覚えます。

Learning Layerは、毎回動くものではありません。

Learning Layerは、必要時のみMemoryを参照し、調整案を出す補助レイヤーです。

Future Agentは、読み取り専用の土台が安定し、明示承認の設計ができてから扱います。

## 5. 「AIが決める」のではなく「人が選ぶ」思想

Epic2の中心思想は、AIが決めることではありません。

人が選べるようにすることです。

Priority Engineは、候補を決めつけるためではなく、理由を説明するためにあります。

Recommendation Engineは、命令するためではなく、提案するためにあります。

First Agentは、提案に従わせるためではなく、ユーザーの返事を受け取るためにあります。

Conversation Engineは、会話を支配するためではなく、選択を安心して受け止めるためにあります。

Memory Layerは、監視するためではなく、ユーザーが必要なときに自分の流れを思い出せるようにするためにあります。

Sakura AI Brainは、ユーザーの代わりに決めるAIではありません。

ユーザーが自分で決められるよう、そばで支えるAIを目指します。

## 6. 読み取り専用の境界

Epic2では、読み取り専用を基本境界にします。

やってよいこと:

- localStorageから既存データを読む。
- Snapshotを生成する。
- 候補を集める。
- Priority Scoreを計算する。
- 理由を表示する。
- Recommendationを表示する。
- First Agentの返事に応じて画面内の短い文を表示する。

やってはいけないこと:

- ユーザーの許可なくlocalStorageへ新しい記録を保存する。
- 外部APIへ送信する。
- 投稿する。
- メッセージを送る。
- タスクを完了にする。
- 削除する。
- Snapshotをインポートして既存データを書き換える。
- Learning Layerを自動で動かす。
- Future Agentが勝手に実行する。

境界の考え方:

- Brainは読んで考える。
- Recommendationは提案する。
- Userが選ぶ。
- First Agentは返事を受け取る。
- Conversationは受け止める。
- Memoryは明示許可があるまで保存しない。

## 7. 将来拡張

将来拡張は、読み取り専用の土台が安定してから進めます。

候補:

- operation-cockpitをIntent LayerとしてSnapshotへ含める。
- First Agentの返事を明示保存できるようにする。
- Memory LayerのON/OFFと削除UIを作る。
- SnapshotにMemory要約を含めるprivacy設定を作る。
- Learning Layerを明示ONで試せるようにする。
- Priority Engineの重みをユーザーが調整できるようにする。
- Conversation Engineの文体をユーザーが選べるようにする。
- Future Agentで、明示承認つきの小さな支援を検討する。

Future Agentに進む条件:

- 何をするAgentかが明確である。
- 実行前にユーザーが確認できる。
- 実行結果を取り消せる、または安全に扱える。
- 投稿、送信、削除など外部副作用は明示承認がある。
- Memory / Learning が勝手に行動へつながらない。

## 8. Design Philosophy

Epic2 は、
AIを強くするためだけの設計ではありません。

ユーザーが自分で選ぶ力を、
AIが静かに支えるための設計です。

Dashboard は事実を記録します。

Snapshot は文脈を渡します。

Brain は整理します。

Priority Engine は理由を説明します。

Recommendation Engine は提案します。

User は選びます。

First Agent は返事を受け取ります。

Conversation Engine はその選択を受け止めます。

Memory Layer は、安心して覚えられることだけを扱います。

Learning Layer は、必要なときだけ参照されます。

Future Agent は、明示承認の先にあります。

Sakura AI は、
人の代わりに決めるAIではありません。

人が自分で決められるよう、
そばで支えるAIです。

そのため Epic2 の基本方針は、

- 読む
- 整理する
- 理由を示す
- 提案する
- 選択を尊重する
- 勝手に実行しない

ことです。

Epic2 は、Sakura AI Brain が「考えるAI」になるための土台であり、同時に「人が選ぶ余白」を守るための設計です。

Epic2は完成形ではありません。
人とAIが一緒に育っていくための土台です。
