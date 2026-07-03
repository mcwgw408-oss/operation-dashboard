# Operation Cockpit Integration Plan

日付: 2026-07-04

目的: 旧/別画面である `operation-cockpit` を、今後 Sakura AI Brain にどう接続するかを設計する。

この文書は設計メモです。コード、README、localStorageデータ、Snapshot仕様は変更しません。

## Intent Layer

operation-cockpit は、Sakura AI Brain に
「今日は何を大切にしたいか」
を伝えるための入力画面である。

operation-dashboard は、事実を記録する場所である。

operation-cockpit は、意思を記録する場所である。

Brain は、事実と意思の両方を見て判断する。

つまり、operation-cockpit は
古い画面ではなく、
Sakura AI Brain の Intent Layer として扱う。

## 1. operation-cockpit の現在の役割

`operation-cockpit` は、日々の運用を迷わず始めるための軽量なコックピットです。

主な役割:

- 今日一番大事なことを明文化する。
- 今日の記事メモを残す。
- 今日育てるものを1つ決める。
- 毎日タスクをチェックする。
- メール確認時刻を記録する。
- 毎日見る発信者を確認する。
- コメント、リスタック、Notes交流、ライブ参加などの交流行動を確認する。
- 今日やることと気づいたことを短く残す。

保存キー:

| キー | 内容 |
|---|---|
| `operation-cockpit-v1` | 日別のコックピット記録 |
| `operation-cockpit-daily-creators-v1` | 毎日見る発信者リスト |

## 2. operation-dashboard と重複している部分

`operation-dashboard` と `operation-cockpit` は、日次運用という意味では一部重複しています。

重複している要素:

- 日付単位で記録する。
- 毎日タスクを扱う。
- メール確認を扱う。
- 今日やることを扱う。
- 気づきや振り返りに近い自由記述を扱う。
- localStorageに日別データを保存する。

ただし、重複の性質は同じではありません。

`operation-dashboard` は、日次タスク、振り返り、あとで見る、残るメモ、Snapshot生成、Brain Prototypeまで含むホームベースです。

`operation-cockpit` は、今日の意図、記事、交流、発信者確認に寄った、より狭く軽い開始画面です。

## 3. operation-cockpit にしかない価値

`operation-cockpit` には、現在の `operation-dashboard` だけでは拾いにくい価値があります。

独自価値:

- `topPriority`: 今日一番大事なことを、タスクより上位の意図として扱える。
- `articleNote`: 今日の記事の切り口、タイトル、書き出しメモを持てる。
- `growthTarget`: 今日育てる対象を1つに絞れる。
- `todayFocus`: その日の運用上の焦点を短く残せる。
- `noticed`: 小さな気づきを記録できる。
- `creatorChecks`: 毎日見る発信者との接点を持てる。
- `communityChecks`: コメント返信、リスタック、Notes交流、ライブ参加など、交流行動を分けて見られる。

特に Sakura AI Brain にとって重要なのは、`topPriority`, `articleNote`, `todayFocus`, `growthTarget`, `noticed` です。

これらは「何をしたか」よりも「今日は何を大事にするか」を表すため、Priority Engine と Recommendation Engine の説明に使いやすいです。

## 4. Snapshotに含めるべきデータ

最小構成では、`operation-cockpit-v1` から直近7日分だけを含めるのが安全です。

推奨するSnapshot app key:

```json
"operation-cockpit": {
  "schemaVersion": 1,
  "data": {
    "recentDays": {},
    "creators": []
  }
}
```

含める候補:

| データ | 含める優先度 | 理由 |
|---|---:|---|
| `topPriority` | 高 | 今日の意図としてBrainに有用 |
| `articleNote` | 高 | Substack-Laboと組み合わせて執筆提案に使える |
| `todayFocus` | 高 | Priority Engineの補助理由に使える |
| `growthTarget` | 中 | Learning Layerの観察対象になる |
| `noticed` | 中 | 日次の変化や学びとして使える |
| `mailLastChecked` | 低 | dashboard側のメール確認と重複しやすい |
| `checks` | 低 | dashboard側の毎日タスクと重複しやすい |
| `mailChecks` | 低 | dashboard側のメール確認と重複しやすい |
| `communityChecks` | 中 | 交流行動の判定に使える |
| `creatorChecks` | 中 | 発信者確認の流れを見られる |
| `creators` | 要検討 | 個人名・メモを含むためprivacy対象にしたい |

初回は `creators` を含めず、`creatorChecks` も集計だけにする案が安全です。

## 5. Brain / Priority Engine / Recommendation Engine での使い方

### Brain

Brainでは、`operation-cockpit` を「今日の意図レイヤー」として扱います。

表示例:

- 今日の意図: `topPriority`
- 今日の記事メモ: `articleNote`
- 今日の焦点: `todayFocus`
- 今日育てるもの: `growthTarget`
- 気づき: `noticed`

### Priority Engine

Priority Engineでは、直接タスクを増やすのではなく、既存候補の理由を補強する形で使います。

使い方:

- `topPriority` と近いタイトルのタスクを加点する。
- `todayFocus` と一致するLabo候補を少し加点する。
- `articleNote` がある日は、Substack-Laboや記事系候補を少し加点する。
- `growthTarget` がある日は、関連する継続活動を補助理由にする。
- `noticed` は直接加点せず、説明文やMemory Layerの材料にする。

### Recommendation Engine

Recommendation Engineでは、命令ではなく提案の自然さを上げるために使います。

例:

- `articleNote` がある場合: 「今日は記事の切り口が出ているので、下書きを15分だけ進めるのが良さそうです。」
- `topPriority` がある場合: 「今日はすでに大事にしたいことが見えているので、まずそこに軽く触れる提案にします。」
- `growthTarget` がある場合: 「今日は育てたい対象があるので、完了よりも小さく継続する形が合いそうです。」

## 6. 統合する場合のメリット・デメリット

ここでの統合とは、`operation-cockpit` の機能を `operation-dashboard` 側に吸収することです。

メリット:

- 日次入力画面が1つになり、迷いが減る。
- localStorageキーやSnapshot生成が単純になる。
- 重複する毎日タスク、メール確認、今日やることを整理できる。
- Brain Prototypeと同じ画面で今日の意図を扱える。

デメリット:

- 既存の軽いコックピット感が失われる可能性がある。
- dashboardがさらに大きくなり、疲れている日に重く感じる可能性がある。
- 既存の `operation-cockpit-v1` データ移行が必要になる。
- 誤って既存データ構造を壊すリスクがある。

## 7. 独立維持する場合のメリット・デメリット

ここでの独立維持とは、`operation-cockpit` を別画面のまま残し、SnapshotとBrainだけが読むことです。

メリット:

- 既存の画面とデータを壊しにくい。
- cockpitを「朝の開始画面」として軽く使い続けられる。
- dashboardはホームベース、cockpitは意図入力という役割分担ができる。
- Snapshot連携だけなら最小変更で始められる。

デメリット:

- 2つの画面を使い分ける必要がある。
- 同じような入力が重複しやすい。
- どちらが正なのか判断が必要になる。
- 将来的にはデータ統合方針が必要になる。

## 8. 推奨方針

推奨は、短期では独立維持、中期では一部統合です。

短期方針:

- `operation-cockpit` は別画面のまま残す。
- Snapshotに読み取り専用で追加する。
- Brainでは「今日の意図」として表示する。
- Priority Engineでは補助理由として使う。
- Recommendation Engineでは提案文の自然さを上げるために使う。

中期方針:

- dashboard側に「今日の意図」カードを作るか検討する。
- cockpitの入力項目をdashboardに統合するか判断する。
- `operation-cockpit-v1` の移行は、必要性が高まるまで行わない。

この方針なら、既存データを壊さずに Sakura AI Brain の知性を増やせます。

## 9. 最小実装ステップ

最小実装は、読み取り専用のSnapshot拡張から始めます。

1. `docs/sakura-snapshot-json-spec.md` に `operation-cockpit` の設計追記案を作る。
2. `app.js` に `OPERATION_COCKPIT_KEYS` または同等の読み取りキー定義を追加する。
3. `operation-cockpit-v1` から直近7日分を読む。
4. 初回は `topPriority`, `articleNote`, `todayFocus`, `growthTarget`, `noticed`, `communityChecks` のみ含める。
5. `operation-cockpit-daily-creators-v1` は初回では含めない、または件数だけにする。
6. Snapshot summaryに `hasCockpitIntent`, `hasArticleNote` などの軽い集計を追加するか検討する。
7. Brain Prototypeに「今日の意図」カードを追加する。
8. Priority Engineで `topPriority` / `todayFocus` による補助理由を追加する。
9. Recommendation Engineで `articleNote` を使った執筆提案文を追加する。
10. `node --check app.js` とブラウザコンソール確認を行う。

## 10. リスクと注意点

| リスク | 内容 | 対策 |
|---|---|---|
| データ重複 | dashboardとcockpitで同じ意味の項目がある | cockpitは「意図」、dashboardは「実行記録」と分ける |
| 個人情報 | creatorsに名前やメモが含まれる | 初回は含めない、またはprivacy設定を追加する |
| Snapshot肥大化 | 日次データが増えすぎる | 直近7日分に限定する |
| 正のデータ不明 | dashboardとcockpitで内容が違う場合がある | Brainでは矛盾として扱い、片方を勝手に上書きしない |
| 書き込み事故 | Future Agentがcockpitへ書き戻す可能性 | Phase2では読み取り専用を維持する |
| 文字化け | cockpitの表示文に文字化けが残っている | データ連携とは別タスクでUTF-8表示修正を扱う |
| 役割肥大化 | cockpitを統合しすぎるとdashboardが重くなる | 最初はSnapshot連携だけにする |

## 結論

`operation-cockpit` は、完全に廃止するよりも、まずはSakura AI Brainの「今日の意図レイヤー」として読み取るのが安全です。

最初の実装では、既存画面を壊さず、`operation-cockpit-v1` をSnapshotに読み取り専用で追加するのがよいです。

その後、Brain / Priority Engine / Recommendation Engineで、`topPriority`, `articleNote`, `todayFocus` を使い、提案の理由と自然さを強化するのが次の一歩です。
