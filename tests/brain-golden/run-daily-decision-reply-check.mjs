import { createBrainGoldenHarness } from "./harness.mjs";
import scheduledDay from "./fixtures/scheduled-day.mjs";
import healthLow from "./fixtures/health-low.mjs";
import candidateNone from "./fixtures/candidate-none.mjs";
import { intentCases, INTENT_DIRECTION } from "./fixtures/intent-cases.mjs";

const harness = createBrainGoldenHarness();
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const scheduled = harness.runReplyFixture(scheduledDay);
check(
  scheduled.brainDecision.priorityCandidate?.title === "今日の予定を無理なく進める",
  "予定がある日の中心判断が予定になっていません",
);
check(
  scheduled.brainDecision.recommendation.type === "schedule_context",
  "予定がある日の提案種別が予定中心ではありません",
);
check(
  scheduled.replyPlan.opening.includes("10:30 編集打ち合わせ"),
  "生成された返答に予定時刻と予定名が渡っていません",
);
check(
  scheduled.replyPlan.mainPoint.includes(scheduled.expression.recommendation.message) &&
    scheduled.replyPlan.mainPoint.includes(scheduled.expression.recommendation.actionText),
  "判断メモの最終提案が生成された返答へそのまま渡っていません",
);

const lowHealth = harness.runReplyFixture(healthLow);
check(
  lowHealth.brainDecision.energyContext.state === "Recovery",
  "選択日の低い体調が回復優先へ反映されていません",
);
check(
  lowHealth.brainDecision.priorityCandidate?.title === "休息を優先する",
  "低体調の日に作業より休息が中心になっていません",
);
check(
  lowHealth.brainDecision.activeHealthState?.date === healthLow.activeDate,
  "別の日の新しい体調記録ではなく選択日の体調を参照できていません",
);
check(
  lowHealth.reply.text.includes("回復を優先"),
  "生成された返答に回復優先の最終判断が反映されていません",
);

const dailyInputRecoveryFixture = {
  ...candidateNone,
  name: "daily-input-recovery",
  store: {
    ...candidateNone.store,
    [candidateNone.activeDate]: {
      ...candidateNone.store[candidateNone.activeDate],
      dailyInput: "睡眠が少なくて眠い。今日は無理をしない。",
    },
  },
};
const dailyInputRecovery = harness.runReplyFixture(dailyInputRecoveryFixture);
check(
  dailyInputRecovery.brainDecision.energyContext.state === "Recovery",
  "今日の入力にある体調・休息の手がかりが全体判断へ反映されていません",
);
check(
  dailyInputRecovery.reply.text.includes("睡眠が少なくて眠い"),
  "今日の入力の内容が生成された返答の補助情報に反映されていません",
);

const dailyInputLifeFixture = {
  ...candidateNone,
  name: "daily-input-life",
  store: {
    ...candidateNone.store,
    [candidateNone.activeDate]: {
      ...candidateNone.store[candidateNone.activeDate],
      dailyInput: "買い出しと薬局へ行く。",
      dailyInputUpdatedAt: "2026-07-04T08:00:00.000Z",
    },
  },
};
const dailyInputLife = harness.runReplyFixture(dailyInputLifeFixture);
check(
  dailyInputLife.brainDecision.priorityCandidate?.source === "operation-dashboard.dailyInput" &&
    dailyInputLife.brainDecision.priorityCandidate?.title.includes("買い出し"),
  "今日の入力に書いた生活上の用事が発信候補より先に扱われていません",
);

const lowIntentFixture = intentCases.find((item) => item.name === "intent-low-health")?.fixture;
const lowIntent = harness.runReplyFixture(lowIntentFixture);
check(
  lowIntent.reply.text.includes(INTENT_DIRECTION),
  "体調で歩幅を調整したときも、受け取った今日の意図が生成された返答に残っていません",
);

if (failures.length) {
  console.error("Daily decision/reply check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Daily decision/reply check: OK");
