const STORAGE_KEY = "operation-dashboard-v1";
const LATER_STORAGE_KEY = "operation-dashboard-later-v1";
const LATER_VIEW_STORAGE_KEY = "operation-dashboard-later-view-v1";
const PERSISTENT_MEMO_STORAGE_KEY = "operation-dashboard-persistent-memos-v1";
const LEARNING_LOG_STORAGE_KEY = "sakura-learning-log-v1";
const MEMORY_STORE_STORAGE_KEY = "sakura-memory-store-v1";
const CONVERSATION_FEEDBACK_STORAGE_KEY = "sakura-conversation-feedback-v1";
const CONVERSATION_IMPROVEMENTS_STORAGE_KEY = "sakura-conversation-improvements-v1";
const CONVERSATION_REFLECTIONS_STORAGE_KEY = "sakura-conversation-reflections-v1";
const CONVERSATION_CONTINUITY_STORAGE_KEY = "sakura-conversation-continuity-v1";
const CONVERSATION_RECOVERY_STORAGE_KEY = "sakura-conversation-recovery-v1";
const PERSONALITY_PROFILE_STORAGE_KEY = "sakura-personality-profile-v1";
const RELATIONSHIP_PROFILE_STORAGE_KEY = "sakura-relationship-profile-v1";
const EMOTIONAL_RESONANCE_STORAGE_KEY = "sakura-emotional-resonance-v1";
const IDENTITY_PROFILE_STORAGE_KEY = "sakura-identity-profile-v1";
const GOAL_STATE_STORAGE_KEY = "sakura-goal-state-v1";
const PRIORITY_STATE_STORAGE_KEY = "sakura-priority-state-v1";
const DECISION_STATE_STORAGE_KEY = "sakura-decision-state-v1";
const STRATEGY_STATE_STORAGE_KEY = "sakura-strategy-state-v1";
const ATTENTION_STATE_STORAGE_KEY = "sakura-attention-state-v1";
const COGNITIVE_STATE_STORAGE_KEY = "sakura-cognitive-state-v1";
const INTENT_STATE_STORAGE_KEY = "sakura-intent-state-v1";
const TASK_PLAN_STATE_STORAGE_KEY = "sakura-task-plan-state-v1";
const WORKFLOW_STATE_STORAGE_KEY = "sakura-workflow-state-v1";
const EXECUTION_DECISION_STORAGE_KEY = "sakura-execution-decision-v1";
const EXECUTION_STATE_STORAGE_KEY = "sakura-execution-state-v1";
const EXECUTION_FEEDBACK_STORAGE_KEY = "sakura-execution-feedback-v1";
const HEALTH_STATE_STORAGE_KEY = "sakura-health-state-v1";
const RECURRING_SCHEDULE_STORAGE_KEY = "sakura-recurring-schedule-v1";
const RECURRING_AUTO_ADD_LOG_STORAGE_KEY = "sakura-recurring-auto-add-log-v1";

// ===== さくらスナップショット（Phase 1）の定数 =====
const SNAPSHOT_FORMAT = "sakura-snapshot";
const SNAPSHOT_VERSION = 1;
const SNAPSHOT_DICTIONARY_VERSION = "v1.2";
const SNAPSHOT_SETTINGS_KEY = "sakura-snapshot-settings-v1";
const SNAPSHOT_DETAIL_DAYS = 7;
const SNAPSHOT_LOG_DAYS = 30;

const EXTERNAL_APP_KEYS = {
  discoveries: "discovery-labo-discoveries",
  discoverySources: "discovery-labo-entry-sources-v1",
  koryu: "koryu-log-labo-entries",
  hasshin: "hasshin-kansatsu-labo-entries",
  substack: "substack-labo-workspace-v2",
  substackLegacy: "substack-labo-store",
  stock: "stock-labo-items-v1",
};

const snapshotSettingDefaults = {
  reflection: true,
  feelings: true,
  mailDmCounts: true,
  stock: false,
};
let snapshotMode = new Date().getHours() < 12 ? "morning" : "night";
const defaultDailyTasks = [
  "メール確認",
  "DM確認（前日分まで）",
  "記事執筆（翌日公開分）",
  "Notes投稿",
  "おはスタック投稿",
  "チャット投稿",
];
const obsoleteDailyTasks = [
  "ボイスメッセージ（翌日公開分）",
];
const defaultProjects = [
  "無料アプリ改善",
  "Substack交流",
  "GitHub",
  "新企画",
  "新アプリ構想",
];

const $ = (selector) => document.querySelector(selector);
const listIds = ["dailyTasks", "todayTasks", "projects"];
const eventTypeLabels = {
  meeting: "打ち合わせ",
  outing: "外出",
  medical: "医療・ケア",
  delivery: "配信",
  broadcast: "コラボ・配信",
  other: "その他",
};
const defaultProjectMemory = [
  {
    project: "さくら",
    title: "さくらの判断メモを継続開発中",
    summary: "判断、優先度、提案、説明、学習、記憶レイヤーを段階的に育てています。",
    tags: ["sakura-ai", "brain"],
  },
  {
    project: "Substack",
    title: "記事公開を継続中",
    summary: "執筆中記事や発酵中アイデアを見ながら、発信の流れを継続しています。",
    tags: ["substack", "writing"],
  },
  {
    project: "生活改善",
    title: "生活の起動と回復を整える",
    summary: "今日やること、予定、回復ログを分けて、無理なく続けられる状態を作っています。",
    tags: ["life", "recovery"],
  },
];
let activeDate = toDateInputValue(new Date());
let store = loadStore();
let laterItems = loadLaterItems();
let showDoneLater = loadShowDoneLater();
let autoDedupeLater = loadAutoDedupeLater();
let laterSearchQuery = "";
let persistentMemos = loadPersistentMemos();
let learningLog = loadLearningLog();
let memoryStore = loadMemoryStore();
let conversationFeedback = loadConversationFeedback();
let conversationImprovements = loadConversationImprovements();
let conversationReflections = loadConversationReflections();
let conversationContinuity = loadConversationContinuity();
let conversationRecovery = loadConversationRecovery();
let personalityProfile = loadPersonalityProfile();
let relationshipProfile = loadRelationshipProfile();
let emotionalResonance = loadEmotionalResonance();
let identityProfile = loadIdentityProfile();
let goalState = loadGoalState();
let priorityState = loadPriorityState();
let decisionState = loadDecisionState();
let strategyState = loadStrategyState();
let attentionState = loadAttentionState();
let cognitiveState = loadCognitiveState();
let intentState = loadIntentState();
let taskPlanState = loadTaskPlanState();
let workflowState = loadWorkflowState();
let executionDecision = loadExecutionDecision();
let executionState = loadExecutionState();
let executionFeedback = loadExecutionFeedback();
let healthState = loadHealthState();
let recurringSchedule = loadRecurringSchedule();
let recurringAutoAddLog = loadRecurringAutoAddLog();
let currentLearningLogId = "";
let currentReplyText = "";
let currentConversationContext = null;
let currentReplyPlan = null;
let currentRecommendation = null;
let currentHealthAwareRecommendation = null;
let currentFirstAgentReply = "";

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function newItem(title = "") {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    priority: false,
  };
}

function newEvent({ title = "", time = "", type = "other", note = "" } = {}) {
  return {
    id: crypto.randomUUID(),
    title,
    time,
    type,
    note,
  };
}

function newLaterItem({ type = "見る", title = "", url = "", memo = "" } = {}) {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    url,
    memo,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

function newLearningItem() {
  const now = new Date().toISOString();
  return {
    createdAt: now,
    id: crypto.randomUUID(),
    date: activeDate,
    source: "",
    title: "",
    summaryLine: "",
    intent: "",
    learned: "",
    useForSelf: "",
    useForPublishing: "",
    sakuraMemory: "",
    tags: "",
    memo: "",
  };
}

function defaultPublishingOps(date = activeDate) {
  return {
    date,
    yoshidaNoteStatus: "未確認",
    yoshidaSubstackStatus: "未確認",
    yoshidaLiveStatus: "未確認",
    yoshidaLearning: "",
    yoshidaTomorrow: "",
    notesCount: "",
    chatCount: "",
    articleCount: "",
    audioArticleCount: "",
    morningStackStatus: "できなかった",
    notesIdeas: "",
    articleIdeas: "",
    chatIdeas: "",
    scheduledPostTiming: "",
    morningStackFlow: "",
    yoshidaBalance: "",
    operationFindings: "",
  };
}

function newPersistentMemo() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    text: "",
    createdAt: now,
    updatedAt: now,
  };
}

function blankDay() {
  return {
    dailyTasks: defaultDailyTasks.map(newItem),
    todayTasks: [],
    todayEvents: [],
    projects: defaultProjects.map(newItem),
    memos: [],
    learnings: [],
    publishingOps: defaultPublishingOps(),
    dailyInput: "",
    metrics: {
      mailUnread: "",
      mailProcessed: "",
      mailMorningChecked: false,
      mailNoonChecked: false,
      mailNightChecked: false,
      mailLastCheckedAt: "",
      dmPending: "",
      dmHandled: "",
      dmPreviousDone: false,
      commentReplies: "",
    },
    reflection: {
      didToday: "",
      blockedToday: "",
      tomorrowPlan: "",
    },
    updatedAt: new Date().toISOString(),
  };
}

function ensureDefaultDailyTasks(day) {
  let changed = false;
  day.dailyTasks ||= [];
  const beforeCount = day.dailyTasks.length;
  day.dailyTasks = day.dailyTasks.filter((item) => !obsoleteDailyTasks.includes(item.title));
  if (day.dailyTasks.length !== beforeCount) changed = true;
  defaultDailyTasks.forEach((title) => {
    if (!day.dailyTasks.some((item) => item.title === title)) {
      day.dailyTasks.push(newItem(title));
      changed = true;
    }
  });
  return changed;
}

function ensureMetricDefaults(day) {
  let changed = false;
  day.metrics ||= {};
  ["mailMorningChecked", "mailNoonChecked", "mailNightChecked"].forEach((key) => {
    if (!(key in day.metrics)) {
      day.metrics[key] = false;
      changed = true;
    }
  });
  if (!("mailLastCheckedAt" in day.metrics)) {
    day.metrics.mailLastCheckedAt = "";
    changed = true;
  }
  return changed;
}

function ensureLearningList(day) {
  if (!Array.isArray(day.learnings)) {
    day.learnings = [];
    return true;
  }
  return false;
}

function ensurePublishingOps(day) {
  if (!day.publishingOps || typeof day.publishingOps !== "object") {
    day.publishingOps = defaultPublishingOps();
    return true;
  }
  const defaults = defaultPublishingOps();
  let changed = false;
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.publishingOps)) {
      day.publishingOps[key] = value;
      changed = true;
    }
  });
  return changed;
}

function ensureTodayEvents(day) {
  if (!Array.isArray(day.todayEvents)) {
    day.todayEvents = [];
    return true;
  }
  return false;
}

function ensureDailyInput(day) {
  if (!("dailyInput" in day)) {
    day.dailyInput = "";
    return true;
  }
  return false;
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function loadLaterItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(LATER_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadShowDoneLater() {
  try {
    return JSON.parse(localStorage.getItem(LATER_VIEW_STORAGE_KEY))?.showDone ?? true;
  } catch {
    return true;
  }
}

function loadAutoDedupeLater() {
  try {
    return JSON.parse(localStorage.getItem(LATER_VIEW_STORAGE_KEY))?.autoDedupe ?? false;
  } catch {
    return false;
  }
}

function loadPersistentMemos() {
  try {
    const saved = JSON.parse(localStorage.getItem(PERSISTENT_MEMO_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadLearningLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEARNING_LOG_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadConversationFeedback() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONVERSATION_FEEDBACK_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadConversationImprovements() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONVERSATION_IMPROVEMENTS_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadConversationReflections() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONVERSATION_REFLECTIONS_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadConversationContinuity() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONVERSATION_CONTINUITY_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadConversationRecovery() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONVERSATION_RECOVERY_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function buildPersonalityProfile() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    warmth: "gentle",
    curiosity: "thoughtful",
    patience: "steady",
    directness: "softly clear",
    humor: "light",
    reflection: "careful",
    supportiveness: "high",
    createdAt: now,
    updatedAt: now,
  };
}

function loadPersonalityProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PERSONALITY_PROFILE_STORAGE_KEY));
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      return {
        ...buildPersonalityProfile(),
        ...saved,
      };
    }
  } catch {
    // Fall through to a default profile.
  }
  const profile = buildPersonalityProfile();
  localStorage.setItem(PERSONALITY_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

function buildRelationshipProfile() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    relationshipStage: "growing",
    familiarity: "developing",
    trust: "building",
    preferredSupport: "gentle structure",
    communicationDistance: "warm but respectful",
    lastInteraction: "",
    createdAt: now,
    updatedAt: now,
  };
}

function loadRelationshipProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(RELATIONSHIP_PROFILE_STORAGE_KEY));
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      return {
        ...buildRelationshipProfile(),
        ...saved,
      };
    }
  } catch {
    // Fall through to a default profile.
  }
  const profile = buildRelationshipProfile();
  localStorage.setItem(RELATIONSHIP_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

function loadEmotionalResonance() {
  try {
    const saved = JSON.parse(localStorage.getItem(EMOTIONAL_RESONANCE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadIdentityProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(IDENTITY_PROFILE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadGoalState() {
  try {
    const saved = JSON.parse(localStorage.getItem(GOAL_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadPriorityState() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRIORITY_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadDecisionState() {
  try {
    const saved = JSON.parse(localStorage.getItem(DECISION_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadStrategyState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STRATEGY_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadAttentionState() {
  try {
    const saved = JSON.parse(localStorage.getItem(ATTENTION_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadCognitiveState() {
  try {
    const saved = JSON.parse(localStorage.getItem(COGNITIVE_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadIntentState() {
  try {
    const saved = JSON.parse(localStorage.getItem(INTENT_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadTaskPlanState() {
  try {
    const saved = JSON.parse(localStorage.getItem(TASK_PLAN_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadWorkflowState() {
  try {
    const saved = JSON.parse(localStorage.getItem(WORKFLOW_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadExecutionDecision() {
  try {
    const saved = JSON.parse(localStorage.getItem(EXECUTION_DECISION_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadExecutionState() {
  try {
    const saved = JSON.parse(localStorage.getItem(EXECUTION_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadExecutionFeedback() {
  try {
    const saved = JSON.parse(localStorage.getItem(EXECUTION_FEEDBACK_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadHealthState() {
  try {
    const saved = JSON.parse(localStorage.getItem(HEALTH_STATE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadRecurringSchedule() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECURRING_SCHEDULE_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadRecurringAutoAddLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECURRING_AUTO_ADD_LOG_STORAGE_KEY));
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
}

function ensureDefaultProjectMemory(projectMemory) {
  const now = new Date().toISOString();
  const memories = [...projectMemory];
  defaultProjectMemory.forEach((template) => {
    if (memories.some((memory) => memory.project === template.project)) return;
    memories.push({
      id: crypto.randomUUID(),
      project: template.project,
      title: template.title,
      summary: template.summary,
      tags: template.tags,
      importance: 3,
      status: "active",
      source: "default",
      createdAt: now,
      updatedAt: now,
    });
  });
  return memories;
}

function ensureProjectMemoryDefaultsSaved() {
  const beforeCount = asArray(memoryStore.projectMemory).length;
  memoryStore.projectMemory = ensureDefaultProjectMemory(asArray(memoryStore.projectMemory));
  if (memoryStore.projectMemory.length !== beforeCount) saveMemoryStore();
}

function loadMemoryStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(MEMORY_STORE_STORAGE_KEY));
    return {
      shortMemory: Array.isArray(saved?.shortMemory) ? saved.shortMemory : [],
      projectMemory: ensureDefaultProjectMemory(Array.isArray(saved?.projectMemory) ? saved.projectMemory : []),
    };
  } catch {
    return { shortMemory: [], projectMemory: ensureDefaultProjectMemory([]) };
  }
}

function saveLaterItems() {
  localStorage.setItem(LATER_STORAGE_KEY, JSON.stringify(laterItems));
}

function saveLaterView() {
  localStorage.setItem(
    LATER_VIEW_STORAGE_KEY,
    JSON.stringify({ showDone: showDoneLater, autoDedupe: autoDedupeLater }),
  );
}

function savePersistentMemos() {
  localStorage.setItem(PERSISTENT_MEMO_STORAGE_KEY, JSON.stringify(persistentMemos));
}

function saveLearningLog() {
  localStorage.setItem(LEARNING_LOG_STORAGE_KEY, JSON.stringify(learningLog));
}

function saveConversationFeedback() {
  localStorage.setItem(CONVERSATION_FEEDBACK_STORAGE_KEY, JSON.stringify(conversationFeedback));
}

function saveConversationImprovements() {
  localStorage.setItem(CONVERSATION_IMPROVEMENTS_STORAGE_KEY, JSON.stringify(conversationImprovements));
}

function saveConversationReflections() {
  localStorage.setItem(CONVERSATION_REFLECTIONS_STORAGE_KEY, JSON.stringify(conversationReflections));
}

function saveConversationContinuity() {
  localStorage.setItem(CONVERSATION_CONTINUITY_STORAGE_KEY, JSON.stringify(conversationContinuity));
}

function saveConversationRecovery() {
  localStorage.setItem(CONVERSATION_RECOVERY_STORAGE_KEY, JSON.stringify(conversationRecovery));
}

function savePersonalityProfile() {
  personalityProfile.updatedAt = new Date().toISOString();
  localStorage.setItem(PERSONALITY_PROFILE_STORAGE_KEY, JSON.stringify(personalityProfile));
  upsertIdentityProfile();
  renderIdentityProfile();
}

function saveRelationshipProfile() {
  relationshipProfile.updatedAt = new Date().toISOString();
  localStorage.setItem(RELATIONSHIP_PROFILE_STORAGE_KEY, JSON.stringify(relationshipProfile));
  upsertEmotionalResonance();
  renderEmotionalResonance();
  upsertIdentityProfile();
  renderIdentityProfile();
}

function saveEmotionalResonance() {
  localStorage.setItem(EMOTIONAL_RESONANCE_STORAGE_KEY, JSON.stringify(emotionalResonance));
}

function saveIdentityProfile() {
  localStorage.setItem(IDENTITY_PROFILE_STORAGE_KEY, JSON.stringify(identityProfile));
  upsertGoalState();
  renderGoalState();
}

function saveGoalState() {
  localStorage.setItem(GOAL_STATE_STORAGE_KEY, JSON.stringify(goalState));
  upsertPriorityState();
  renderPriorityState();
}

function savePriorityState() {
  localStorage.setItem(PRIORITY_STATE_STORAGE_KEY, JSON.stringify(priorityState));
  upsertDecisionState();
  renderDecisionState();
}

function saveDecisionState() {
  localStorage.setItem(DECISION_STATE_STORAGE_KEY, JSON.stringify(decisionState));
  upsertStrategyState();
  renderStrategyState();
}

function saveStrategyState() {
  localStorage.setItem(STRATEGY_STATE_STORAGE_KEY, JSON.stringify(strategyState));
  upsertAttentionState();
  renderAttentionState();
}

function saveAttentionState() {
  localStorage.setItem(ATTENTION_STATE_STORAGE_KEY, JSON.stringify(attentionState));
  upsertCognitiveState();
  renderCognitiveState();
}

function saveCognitiveState() {
  localStorage.setItem(COGNITIVE_STATE_STORAGE_KEY, JSON.stringify(cognitiveState));
  upsertIntentState();
  renderIntentState();
}

function saveIntentState() {
  localStorage.setItem(INTENT_STATE_STORAGE_KEY, JSON.stringify(intentState));
  upsertTaskPlanState();
  renderTaskPlanState();
}

function saveTaskPlanState() {
  localStorage.setItem(TASK_PLAN_STATE_STORAGE_KEY, JSON.stringify(taskPlanState));
  upsertWorkflowState();
  renderWorkflowState();
}

function saveWorkflowState() {
  localStorage.setItem(WORKFLOW_STATE_STORAGE_KEY, JSON.stringify(workflowState));
  upsertExecutionDecision();
  renderExecutionDecision();
  upsertExecutionState();
  renderExecutionState();
  renderExecutionFeedback();
  renderExecutiveSummary();
}

function saveExecutionDecision() {
  localStorage.setItem(EXECUTION_DECISION_STORAGE_KEY, JSON.stringify(executionDecision));
}

function saveExecutionState() {
  localStorage.setItem(EXECUTION_STATE_STORAGE_KEY, JSON.stringify(executionState));
}

function saveExecutionFeedback() {
  localStorage.setItem(EXECUTION_FEEDBACK_STORAGE_KEY, JSON.stringify(executionFeedback));
}

function saveHealthState() {
  localStorage.setItem(HEALTH_STATE_STORAGE_KEY, JSON.stringify(healthState));
}

function saveRecurringSchedule() {
  localStorage.setItem(RECURRING_SCHEDULE_STORAGE_KEY, JSON.stringify(recurringSchedule));
}

function saveRecurringAutoAddLog() {
  localStorage.setItem(RECURRING_AUTO_ADD_LOG_STORAGE_KEY, JSON.stringify(recurringAutoAddLog));
}

function saveMemoryStore() {
  memoryStore.projectMemory = ensureDefaultProjectMemory(asArray(memoryStore.projectMemory));
  localStorage.setItem(MEMORY_STORE_STORAGE_KEY, JSON.stringify(memoryStore));
}

function saveStore() {
  store[activeDate].updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  renderSummary();
  renderHistory();
}

function getDay() {
  if (!store[activeDate]) {
    store[activeDate] = blankDay();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureDefaultDailyTasks(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureMetricDefaults(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureLearningList(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensurePublishingOps(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureTodayEvents(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureDailyInput(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  return store[activeDate];
}

function formatDateLabel(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function renderClock() {
  $("#timeLabel").textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function renderSummary() {
  const day = getDay();
  const tracked = [
    ...day.dailyTasks,
    ...day.todayTasks,
    ...day.projects,
    { done: day.metrics.mailMorningChecked, title: "メール朝チェック" },
    { done: day.metrics.mailNoonChecked, title: "メール昼チェック" },
    { done: day.metrics.mailNightChecked, title: "メール夜チェック" },
    { done: day.metrics.dmPreviousDone, title: "DM前日分" },
  ];
  const total = tracked.length;
  const done = tracked.filter((item) => item.done).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  $("#dateLabel").textContent = formatDateLabel(activeDate);
  $("#progressLabel").textContent = `${progress}%`;
  $("#progressBar").style.width = `${progress}%`;
  $("#completeCount").textContent = `${done} / ${total}`;
}

function renderTaskList(listId) {
  const day = getDay();
  const target = $(`#${listId}`);
  const template = $("#taskTemplate");
  target.replaceChildren();
  day[listId].forEach((item, index) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.classList.toggle("done", item.done);
    row.classList.toggle("priority", item.priority && !item.done);
    const checkbox = row.querySelector(".task-check");
    const title = row.querySelector(".task-title");
    const priority = row.querySelector(".priority-button");
    checkbox.checked = item.done;
    title.value = item.title;
    priority.classList.toggle("active", item.priority);
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      saveStore();
      renderTaskList(listId);
    });
    title.addEventListener("input", () => {
      item.title = title.value;
      saveStore();
    });
    priority.addEventListener("click", () => {
      day[listId].forEach((candidate) => {
        if (candidate.id !== item.id) candidate.priority = false;
      });
      item.priority = !item.priority;
      saveStore();
      renderTaskList(listId);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day[listId] = day[listId].filter((candidate) => candidate.id !== item.id);
      saveStore();
      renderTaskList(listId);
    });
    row.querySelectorAll(".move-button").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.move === "up" ? -1 : 1;
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= day[listId].length) return;
        const [moving] = day[listId].splice(index, 1);
        day[listId].splice(nextIndex, 0, moving);
        saveStore();
        renderTaskList(listId);
      });
    });
    target.append(row);
  });
}

function formatEventLabel(event) {
  return [
    event.time,
    event.title,
    event.type && event.type !== "other" ? `(${eventTypeLabels[event.type] || event.type})` : "",
  ].filter(Boolean).join(" ");
}

function formatEventScheduleLine(event) {
  return [
    event.time,
    event.title,
  ].filter(Boolean).join(" ");
}

function dateKeyToLocalDate(dateKey) {
  if (!dateKey) return null;
  const [year, month, day] = String(dateKey).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function weekdayOfDateKey(dateKey) {
  return dateKeyToLocalDate(dateKey)?.getDay() ?? 0;
}

function weeksBetweenDateKeys(fromKey, toKey) {
  const fromDate = dateKeyToLocalDate(fromKey);
  const toDate = dateKeyToLocalDate(toKey);
  if (!fromDate || !toDate) return null;
  return Math.floor((toDate - fromDate) / (7 * 24 * 60 * 60 * 1000));
}

function buildRecurringScheduleItem({
  title = "",
  type = "medical",
  frequencyType = "weekly",
  weekday = weekdayOfDateKey(activeDate),
  intervalWeeks = 2,
  startDate = activeDate,
  defaultTime = "",
  note = "",
} = {}) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    type,
    frequencyType,
    weekday: Number(weekday),
    intervalWeeks: Math.max(1, Number(intervalWeeks) || 1),
    startDate,
    defaultTime,
    note,
    enabled: true,
    createdAt: now,
    updatedAt: now,
  };
}

function isRecurringScheduleDueOn(item, dateKey = activeDate) {
  if (!item?.enabled || !item.title) return false;
  const targetWeekday = weekdayOfDateKey(dateKey);
  const itemWeekday = Number(item.weekday);
  if (targetWeekday !== itemWeekday) return false;
  if (item.frequencyType === "weekly") return true;
  if (item.frequencyType !== "interval_weeks") return false;
  const interval = Math.max(1, Number(item.intervalWeeks) || 1);
  const weeks = weeksBetweenDateKeys(item.startDate, dateKey);
  return weeks !== null && weeks >= 0 && weeks % interval === 0;
}

function getDueRecurringSchedules(dateKey = activeDate) {
  return recurringSchedule.filter((item) => isRecurringScheduleDueOn(item, dateKey));
}

function recurringEventAlreadyAdded(item) {
  const day = getDay();
  return day.todayEvents.some((event) =>
    event.title === item.title &&
    (event.time || "") === (item.defaultTime || "")
  );
}

function getRecurringAutoAddLogForDate(dateKey = activeDate) {
  const logged = recurringAutoAddLog[dateKey];
  return Array.isArray(logged) ? logged : [];
}

function hasRecurringAutoAddLogged(item, dateKey = activeDate) {
  return getRecurringAutoAddLogForDate(dateKey).includes(item?.id);
}

function markRecurringAutoAddLogged(item, dateKey = activeDate) {
  if (!item?.id) return;
  const logged = new Set(getRecurringAutoAddLogForDate(dateKey));
  logged.add(item.id);
  recurringAutoAddLog[dateKey] = Array.from(logged);
  saveRecurringAutoAddLog();
}

function autoAddDueRecurringSchedules(dateKey = activeDate) {
  const dueItems = getDueRecurringSchedules(dateKey);
  let changed = false;
  dueItems.forEach((item) => {
    if (!item?.id || hasRecurringAutoAddLogged(item, dateKey)) return;
    if (!recurringEventAlreadyAdded(item)) {
      getDay().todayEvents.push(newEvent({
        title: item.title,
        time: item.defaultTime,
        type: item.type,
        note: item.note,
      }));
      changed = true;
    }
    markRecurringAutoAddLogged(item, dateKey);
  });
  if (changed) saveStore();
}

function addRecurringScheduleToToday(item) {
  if (!item || recurringEventAlreadyAdded(item)) return;
  getDay().todayEvents.push(newEvent({
    title: item.title,
    time: item.defaultTime,
    type: item.type,
    note: item.note,
  }));
  saveStore();
  renderEventList();
  renderRecurringSchedule();
  renderBrainPrototype();
}

function renderEventList() {
  const day = getDay();
  const target = $("#todayEvents");
  const template = $("#eventTemplate");
  if (!target || !template) return;
  target.replaceChildren();
  if (!day.todayEvents.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "予定はまだありません";
    target.append(empty);
    return;
  }
  day.todayEvents.forEach((event) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const time = row.querySelector(".event-time");
    const type = row.querySelector(".event-type");
    const title = row.querySelector(".event-title");
    const note = row.querySelector(".event-note");
    const updateEvent = () => {
      event.time = time.value.trim();
      event.type = type.value;
      event.title = title.value.trim();
      event.note = note.value.trim();
      saveStore();
      renderRecurringSchedule();
      renderBrainPrototype();
    };
    time.value = event.time || "";
    type.value = event.type || "other";
    title.value = event.title || "";
    note.value = event.note || "";
    [time, type, title, note].forEach((field) => {
      field.addEventListener("input", updateEvent);
      field.addEventListener("change", updateEvent);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day.todayEvents = day.todayEvents.filter((candidate) => candidate.id !== event.id);
      saveStore();
      renderEventList();
      renderRecurringSchedule();
      renderBrainPrototype();
    });
    target.append(row);
  });
}

function recurringScheduleSummary(item) {
  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  if (item.frequencyType === "weekly") {
    return `毎週${weekdayLabels[Number(item.weekday)] || "-"}曜日`;
  }
  return `${Math.max(1, Number(item.intervalWeeks) || 1)}週間ごとの${weekdayLabels[Number(item.weekday)] || "-"}曜日`;
}

function renderRecurringSchedule() {
  const dueTarget = $("#dueRecurringSchedules");
  const listTarget = $("#recurringScheduleList");
  if (!dueTarget || !listTarget) return;
  const startField = $("#recurringStartDate");
  if (startField && !startField.value) startField.value = activeDate;
  const weekdayField = $("#recurringWeekday");
  if (weekdayField && weekdayField.value === "") weekdayField.value = String(weekdayOfDateKey(activeDate));
  dueTarget.replaceChildren();
  const dueItems = getDueRecurringSchedules();
  if (!dueItems.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "今日該当する定期予定はありません。必要な予定は手動で追加できます。";
    dueTarget.append(empty);
  } else {
    dueItems.forEach((item) => {
      const added = recurringEventAlreadyAdded(item);
      const row = document.createElement("div");
      row.className = "recurring-schedule-row";
      row.innerHTML = `
        <div>
          <strong></strong>
          <p></p>
        </div>
        <button type="button"></button>
      `;
      row.querySelector("strong").textContent = [item.defaultTime, item.title].filter(Boolean).join(" ");
      row.querySelector("p").textContent = [recurringScheduleSummary(item), item.note].filter(Boolean).join(" / ");
      const button = row.querySelector("button");
      button.textContent = added ? "追加済み" : "今日の予定へ追加";
      button.disabled = added;
      button.addEventListener("click", () => addRecurringScheduleToToday(item));
      dueTarget.append(row);
    });
  }

  listTarget.replaceChildren();
  if (!recurringSchedule.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "定期予定テンプレートはまだありません";
    listTarget.append(empty);
    return;
  }
  recurringSchedule.forEach((item) => {
    const row = document.createElement("div");
    row.className = "recurring-template-row";
    row.innerHTML = `
      <label class="check-row"><input type="checkbox" /> 有効</label>
      <div>
        <strong></strong>
        <p></p>
      </div>
      <button type="button">削除</button>
    `;
    const checkbox = row.querySelector("input");
    checkbox.checked = Boolean(item.enabled);
    checkbox.addEventListener("change", () => {
      item.enabled = checkbox.checked;
      item.updatedAt = new Date().toISOString();
      saveRecurringSchedule();
      renderRecurringSchedule();
    });
    row.querySelector("strong").textContent = [item.defaultTime, item.title].filter(Boolean).join(" ");
    const dueStatus = isRecurringScheduleDueOn(item) ? "今日該当" : "今日対象外";
    row.querySelector("p").textContent = [
      dueStatus,
      recurringScheduleSummary(item),
      eventTypeLabels[item.type] || item.type,
      item.note,
    ].filter(Boolean).join(" / ");
    row.querySelector("button").addEventListener("click", () => {
      recurringSchedule = recurringSchedule.filter((candidate) => candidate.id !== item.id);
      saveRecurringSchedule();
      renderRecurringSchedule();
    });
    listTarget.append(row);
  });
}

function renderMailLastChecked() {
  const label = $("#mailLastCheckedLabel");
  if (!label) return;
  const value = getDay().metrics.mailLastCheckedAt;
  if (!value) {
    label.textContent = "未確認";
    return;
  }
  label.textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function renderPersistentMemos({ focusId } = {}) {
  const target = $("#persistentMemoList");
  if (!target) return;
  const template = $("#persistentMemoTemplate");
  target.replaceChildren();
  if (!persistentMemos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "残るメモはまだありません。";
    target.append(empty);
    return;
  }
  persistentMemos.forEach((memo) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const textarea = row.querySelector("textarea");
    const meta = row.querySelector(".persistent-memo-meta");
    textarea.value = memo.text || "";
    meta.textContent = memo.updatedAt
      ? `更新 ${new Intl.DateTimeFormat("ja-JP", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(memo.updatedAt))}`
      : "";
    textarea.addEventListener("input", () => {
      memo.text = textarea.value;
      memo.updatedAt = new Date().toISOString();
      savePersistentMemos();
      meta.textContent = `更新 ${new Intl.DateTimeFormat("ja-JP", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(memo.updatedAt))}`;
    });
    row.querySelector(".edit-button").addEventListener("click", () => {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      if (!confirm("この残るメモを削除しますか？")) return;
      persistentMemos = persistentMemos.filter((candidate) => candidate.id !== memo.id);
      savePersistentMemos();
      renderPersistentMemos();
    });
    target.append(row);
    if (memo.id === focusId) {
      textarea.focus();
    }
  });
}

function renderLearnings() {
  const day = getDay();
  const target = $("#learningList");
  if (!target) return;
  const template = $("#learningTemplate");
  target.replaceChildren();
  if (!day.learnings.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "学びの蓄積はまだありません。";
    target.append(empty);
    return;
  }
  day.learnings.forEach((learning) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const date = row.querySelector(".learning-date");
    const source = row.querySelector(".learning-source");
    const title = row.querySelector(".learning-title");
    const summaryLine = row.querySelector(".learning-summary-line");
    const intent = row.querySelector(".learning-intent");
    const learned = row.querySelector(".learning-learned");
    const useForSelf = row.querySelector(".learning-use-for-self");
    const useForPublishing = row.querySelector(".learning-use-for-publishing");
    const sakuraMemory = row.querySelector(".learning-sakura-memory");
    const tags = row.querySelector(".learning-tags");
    const memo = row.querySelector(".learning-memo");
    date.value = learning.date || activeDate;
    source.value = learning.source || learning.url || "";
    title.value = learning.title || "";
    summaryLine.value = learning.summaryLine || learning.hook || "";
    intent.value = learning.intent || "";
    learned.value = learning.learned || "";
    useForSelf.value = learning.useForSelf || "";
    useForPublishing.value = learning.useForPublishing || learning.experiment || "";
    sakuraMemory.value = learning.sakuraMemory || learning.intro || "";
    tags.value = learning.tags || "";
    memo.value = learning.memo || "";
    [
      ["date", date],
      ["source", source],
      ["title", title],
      ["summaryLine", summaryLine],
      ["intent", intent],
      ["learned", learned],
      ["useForSelf", useForSelf],
      ["useForPublishing", useForPublishing],
      ["sakuraMemory", sakuraMemory],
      ["tags", tags],
      ["memo", memo],
    ].forEach(([key, field]) => {
      field.addEventListener("input", () => {
        learning[key] = field.value;
        saveStore();
      });
    });
    row.querySelector(".copy-learning-memory").addEventListener("click", async () => {
      const text = sakuraMemory.value.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        sakuraMemory.select();
        document.execCommand("copy");
      }
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day.learnings = day.learnings.filter((candidate) => candidate.id !== learning.id);
      saveStore();
      renderLearnings();
    });
    target.append(row);
  });
}

const publishingOpsFields = {
  date: "#publishingOpsDate",
  yoshidaNoteStatus: "#publishingOpsYoshidaNote",
  yoshidaSubstackStatus: "#publishingOpsYoshidaSubstack",
  yoshidaLiveStatus: "#publishingOpsYoshidaLive",
  yoshidaLearning: "#publishingOpsYoshidaLearning",
  yoshidaTomorrow: "#publishingOpsYoshidaTomorrow",
  notesCount: "#publishingOpsNotesCount",
  chatCount: "#publishingOpsChatCount",
  articleCount: "#publishingOpsArticleCount",
  audioArticleCount: "#publishingOpsAudioArticleCount",
  morningStackStatus: "#publishingOpsMorningStack",
  notesIdeas: "#publishingOpsNotesIdeas",
  articleIdeas: "#publishingOpsArticleIdeas",
  chatIdeas: "#publishingOpsChatIdeas",
  scheduledPostTiming: "#publishingOpsScheduledPostTiming",
  morningStackFlow: "#publishingOpsMorningStackFlow",
  yoshidaBalance: "#publishingOpsYoshidaBalance",
  operationFindings: "#publishingOpsOperationFindings",
};

function readPublishingOpsForm() {
  return Object.fromEntries(Object.entries(publishingOpsFields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value : ""];
  }));
}

function renderPublishingOps() {
  const day = getDay();
  const ops = { ...defaultPublishingOps(), ...(day.publishingOps || {}) };
  Object.entries(publishingOpsFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field && field.value !== (ops[key] || "")) {
      field.value = ops[key] || "";
    }
  });
  const status = $("#publishingOpsStatus");
  if (status) {
    status.textContent = "今日の発信運営を記録できます。";
  }
}

function savePublishingOpsFromForm() {
  const day = getDay();
  day.publishingOps = { ...defaultPublishingOps(), ...readPublishingOpsForm() };
  saveStore();
  const status = $("#publishingOpsStatus");
  if (status) {
    status.textContent = "保存済みです。";
  }
}

function renderLaterCounts() {
  const counts = laterItems.reduce(
    (summary, item) => {
      summary.total += 1;
      if (!item.done) summary.open += 1;
      if (item.type === "読む") summary.read += 1;
      else summary.watch += 1;
      return summary;
    },
    { open: 0, watch: 0, read: 0, total: 0 },
  );
  $("#laterOpenCount").textContent = counts.open;
  $("#laterWatchCount").textContent = counts.watch;
  $("#laterReadCount").textContent = counts.read;
  $("#laterTotalCount").textContent = counts.total;
}

function normalizeLaterText(value = "") {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeLaterUrl(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    url.hash = "";
    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return trimmed.replace(/\/$/, "").toLowerCase();
  }
}

function laterDuplicateKey(item) {
  const url = normalizeLaterUrl(item.url || "");
  if (url) return `url:${url}`;

  const title = normalizeLaterText(item.title || "");
  if (!title) return `id:${item.id}`;
  return `text:${item.type || "見る"}:${title}`;
}

function laterMatchesSearch(item, query) {
  if (!query) return true;
  return [item.type, item.title, item.url, item.memo]
    .map((value) => normalizeLaterText(value || ""))
    .join(" ")
    .includes(query);
}

function removeLaterDuplicates() {
  const seen = new Set();
  const before = laterItems.length;
  laterItems = laterItems.filter((item) => {
    const key = laterDuplicateKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return before - laterItems.length;
}

function renderLaterItems() {
  const target = $("#laterList");
  if (!target) return;
  const showDoneField = $("#showDoneLater");
  if (showDoneField) showDoneField.checked = showDoneLater;
  const autoDedupeField = $("#autoDedupeLater");
  if (autoDedupeField) autoDedupeField.checked = autoDedupeLater;
  renderLaterCounts();
  const template = $("#laterTemplate");
  target.replaceChildren();
  const searchField = $("#laterSearch");
  if (searchField && searchField.value !== laterSearchQuery) searchField.value = laterSearchQuery;
  const searchQuery = normalizeLaterText(laterSearchQuery);
  const statusItems = showDoneLater ? laterItems : laterItems.filter((item) => !item.done);
  const visibleItems = statusItems.filter((item) => laterMatchesSearch(item, searchQuery));
  const searchCount = $("#laterSearchCount");
  if (searchCount) {
    searchCount.hidden = !searchQuery;
    searchCount.querySelector("strong").textContent = visibleItems.length;
  }
  if (!visibleItems.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = searchQuery
      ? "検索に一致するあとで見るもの、読むものはありません。"
      : laterItems.length
      ? "未完了のあとで見るもの、読むものはありません。"
      : "あとで見るもの、読むものはまだありません。";
    target.append(empty);
    return;
  }
  visibleItems.forEach((item) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.classList.toggle("done", item.done);
    const check = row.querySelector(".later-check");
    const type = row.querySelector(".later-type");
    const title = row.querySelector(".later-title");
    const url = row.querySelector(".later-url");
    const memo = row.querySelector(".later-memo");
    const open = row.querySelector(".later-open");
    check.checked = item.done;
    type.value = item.type;
    title.value = item.title;
    url.value = item.url;
    memo.value = item.memo;
    open.href = item.url || "#";
    open.classList.toggle("disabled", !item.url);
    check.addEventListener("change", () => {
      item.done = check.checked;
      if (item.done) {
        showDoneLater = true;
        saveLaterView();
      }
      saveLaterItems();
      renderLaterItems();
    });
    type.addEventListener("change", () => {
      item.type = type.value;
      saveLaterItems();
      renderLaterCounts();
    });
    title.addEventListener("input", () => {
      item.title = title.value;
      saveLaterItems();
    });
    url.addEventListener("input", () => {
      item.url = url.value.trim();
      saveLaterItems();
      open.href = item.url || "#";
      open.classList.toggle("disabled", !item.url);
    });
    memo.addEventListener("input", () => {
      item.memo = memo.value;
      saveLaterItems();
    });
    open.addEventListener("click", (event) => {
      if (!item.url) event.preventDefault();
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      laterItems = laterItems.filter((candidate) => candidate.id !== item.id);
      saveLaterItems();
      renderLaterItems();
    });
    target.append(row);
  });
}

function renderFields() {
  const day = getDay();
  const dailyInput = $("#dailyInputText");
  if (dailyInput && document.activeElement !== dailyInput && dailyInput.value !== (day.dailyInput || "")) {
    dailyInput.value = day.dailyInput || "";
  }
  const dailyInputStatus = $("#dailyInputStatus");
  if (dailyInputStatus) {
    dailyInputStatus.textContent = day.dailyInput ? "保存済みです。さくらの判断材料として参照されます。" : "未保存の入力はありません。";
  }
  Object.entries(day.metrics).forEach(([key, value]) => {
    const field = $(`#${key}`);
    if (!field) return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value;
  });
  Object.entries(day.reflection).forEach(([key, value]) => {
    $(`#${key}`).value = value;
  });
}

function collectSearchText(day) {
  return [
    ...day.dailyTasks.map((item) => item.title),
    ...day.todayTasks.map((item) => item.title),
    ...asArray(day.todayEvents).flatMap((event) => [
      event.time,
      event.title,
      eventTypeLabels[event.type] || event.type,
      event.note,
    ]),
    ...day.projects.map((item) => item.title),
    ...(day.memos || []).map((memo) => memo.text),
    day.dailyInput || "",
    ...(day.learnings || []).flatMap((learning) => [
      learning.date,
      learning.source,
      learning.title,
      learning.summaryLine,
      learning.intent,
      learning.learned,
      learning.useForSelf,
      learning.useForPublishing,
      learning.sakuraMemory,
      learning.tags,
      learning.memo,
      learning.url,
      learning.hook,
      learning.experiment,
      learning.intro,
    ]),
    ...Object.values(day.publishingOps || {}),
    ...Object.values(day.reflection),
  ].join(" ");
}

function displayRecommendationType(type = "") {
  const labels = {
    schedule_context: "予定をふまえた提案",
    rest_first: "休息優先",
    start_small: "小さく始める",
    start_tiny: "ごく小さく始める",
    continue_flow: "流れを続ける",
    write_from_idea: "アイデアから書く",
    normal: "通常",
    none: "なし",
    "なし": "なし",
  };
  return labels[type] || type || "なし";
}

function displayAdaptiveCategory(category = "") {
  const labels = {
    writing: "執筆",
    coding: "開発",
    health: "体調",
    rest: "休息",
    none: "なし",
  };
  return labels[category] || category || "なし";
}

function displayLearningLevel(level = "") {
  const labels = {
    low: "低い",
    medium: "中くらい",
    high: "高い",
  };
  return labels[level] || level || "-";
}

function displayLearningSource(source = "") {
  return String(source || "")
    .replaceAll("totalLogs", "ログ全体")
    .replaceAll("recentAcceptanceRate", "最近の一致率")
    .replaceAll("commonRecommendationType", "多い提案タイプ")
    .replaceAll("learningLog", "提案学習ログ")
    .replaceAll("conversationFeedback", "返答フィードバック");
}

function renderHistory() {
  const query = $("#historySearch").value.trim().toLowerCase();
  const target = $("#historyList");
  target.replaceChildren();
  Object.entries(store)
    .sort(([a], [b]) => b.localeCompare(a))
    .filter(([, day]) => !query || collectSearchText(day).toLowerCase().includes(query))
    .slice(0, 30)
    .forEach(([date, day]) => {
      const row = document.createElement("div");
      row.className = "history-item";
      const tracked = [...day.dailyTasks, ...day.todayTasks, ...day.projects];
      const done = tracked.filter((item) => item.done).length;
      const total = tracked.length;
      row.innerHTML = `
        <strong>${date}</strong>
        <span>${done}/${total} 完了</span>
        <button class="ghost-button" type="button">開く</button>
        <button class="delete-button" type="button">削除</button>
      `;
      row.querySelector(".ghost-button").addEventListener("click", () => {
        activeDate = date;
        $("#activeDate").value = activeDate;
        renderAll();
      });
      row.querySelector(".delete-button").addEventListener("click", () => {
        if (!confirm(`${date} のデータを削除しますか？`)) return;
        delete store[date];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        if (activeDate === date) {
          activeDate = toDateInputValue(new Date());
        }
        renderAll();
      });
      target.append(row);
    });
}

function appendBrainItems(target, items, emptyText) {
  if (!target) return;
  target.replaceChildren();
  const visibleItems = items.filter(Boolean).slice(0, 5);
  if (!visibleItems.length) {
    const item = document.createElement("li");
    item.className = "empty-note";
    item.textContent = emptyText;
    target.append(item);
    return;
  }
  visibleItems.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    target.append(item);
  });
}

function upsertShortMemory({ date = activeDate, type, title, summary, source, importance = 2, tags = [] }) {
  if (!type || !title || !summary || !source) return null;
  const now = new Date().toISOString();
  const existing = source === "manual" ? null : memoryStore.shortMemory.find((memory) =>
    memory.date === date &&
    memory.type === type &&
    memory.source === source &&
    memory.title === title
  );
  if (existing) {
    existing.summary = summary;
    existing.importance = importance;
    existing.tags = tags;
    existing.updatedAt = now;
    saveMemoryStore();
    return existing;
  }
  const memory = {
    id: crypto.randomUUID(),
    date,
    type,
    title,
    summary,
    source,
    importance,
    tags,
    createdAt: now,
    updatedAt: now,
  };
  memoryStore.shortMemory.unshift(memory);
  memoryStore.shortMemory = memoryStore.shortMemory.slice(0, 80);
  saveMemoryStore();
  return memory;
}

function normalizeMemoryTags(tags) {
  return asArray(tags).map((tag) => String(tag).trim().toLowerCase()).filter(Boolean);
}

function memoryUpdatedTime(memory) {
  const time = new Date(memory?.updatedAt || memory?.createdAt || memory?.date || 0).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function memoryDisplayTitle(memory) {
  return memory?.title || memory?.summary || memory?.project || "";
}

function getMemorySource(memorySource = memoryStore) {
  return [
    ...asArray(memorySource?.projectMemory),
    ...asArray(memorySource?.shortMemory),
  ];
}

function scoreMemoryForContext(memory, context) {
  const contextProject = String(context?.project || "").trim().toLowerCase();
  const contextTags = normalizeMemoryTags([
    ...asArray(context?.tags),
    context?.recommendationType,
    context?.eventType,
  ]);
  const memoryProject = String(memory?.project || "").trim().toLowerCase();
  const memoryTags = normalizeMemoryTags(memory?.tags);
  const memoryText = [
    memory?.project,
    memory?.title,
    memory?.summary,
    memory?.type,
    memory?.source,
  ].filter(Boolean).join(" ").toLowerCase();
  let score = 0;

  if (contextProject && memoryProject === contextProject) score += 80;
  else if (contextProject && memoryText.includes(contextProject)) score += 35;

  contextTags.forEach((tag) => {
    if (memoryTags.includes(tag)) score += 20;
    else if (tag && memoryText.includes(tag)) score += 8;
  });

  score += Math.min(20, Number(memory?.importance || 0) * 4);

  const updatedTime = memoryUpdatedTime(memory);
  const daysOld = updatedTime ? Math.floor((Date.now() - updatedTime) / 86400000) : null;
  if (daysOld !== null) score += Math.max(0, 16 - Math.min(16, daysOld));

  return score;
}

function getRelevantMemories(context, { limit = 5, memorySource = memoryStore } = {}) {
  const memories = getMemorySource(memorySource);
  const ranked = memories
    .map((memory) => ({ memory, score: scoreMemoryForContext(memory, context) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) =>
      b.score - a.score ||
      Number(b.memory.importance || 0) - Number(a.memory.importance || 0) ||
      memoryUpdatedTime(b.memory) - memoryUpdatedTime(a.memory),
    );
  const fallback = memories
    .map((memory) => ({ memory, score: scoreMemoryForContext(memory, {}) }))
    .sort((a, b) =>
      b.score - a.score ||
      Number(b.memory.importance || 0) - Number(a.memory.importance || 0) ||
      memoryUpdatedTime(b.memory) - memoryUpdatedTime(a.memory),
    );

  return (ranked.length ? ranked : fallback)
    .slice(0, limit)
    .map((entry) => ({ ...entry.memory }));
}

function inferMemoryProjectFromCandidate(candidate, eventContext) {
  const source = candidate?.source || "";
  if (source.includes("substack")) return "Substack";
  if (eventContext?.count) return "\u751f\u6d3b\u6539\u5584";
  if (source === "operation-dashboard.projects") return candidate?.title || "";
  return "";
}

function buildMemoryRetrievalContext({ priorityCandidate = null, recommendationType = "", eventContext = {} } = {}) {
  const source = priorityCandidate?.source || "";
  const sourceTags = {
    "operation-dashboard.todayTasks": ["task", "life"],
    "operation-dashboard.dailyTasks": ["task", "life"],
    "operation-dashboard.projects": ["project"],
    "operation-dashboard.laterItems": ["later"],
    "operation-dashboard.persistentMemos": ["memo"],
    "discovery-labo.discoveries": ["idea", "discovery"],
    "hasshin-kansatsu-labo.entries": ["publishing", "action"],
    "substack-labo.writing": ["substack", "writing"],
    "koryu-log-labo.entries": ["relationship"],
  };
  return {
    project: inferMemoryProjectFromCandidate(priorityCandidate, eventContext),
    tags: [
      ...asArray(sourceTags[source]),
      eventContext?.count ? "schedule" : "",
    ].filter(Boolean),
    recommendationType,
    eventType: eventContext?.level || "",
  };
}

function memoryAgeDays(memory, now = Date.now()) {
  const updatedTime = memoryUpdatedTime(memory);
  if (!updatedTime) return null;
  return Math.max(0, Math.floor((now - updatedTime) / 86400000));
}

function memoryGroupKey(memory) {
  const project = String(memory?.project || "").trim();
  if (project) return { key: `project:${project}`, label: project, type: "project" };
  const tags = normalizeMemoryTags(memory?.tags);
  if (tags.length) return { key: `tags:${tags.join("+")}`, label: tags.join(" / "), type: "tags" };
  return { key: "ungrouped", label: "Ungrouped", type: "none" };
}

function buildMemoryConsolidation(memorySource = memoryStore) {
  const now = Date.now();
  const shortMemory = asArray(memorySource?.shortMemory);
  const memories = getMemorySource(memorySource);
  const candidates = shortMemory
    .filter((memory) => {
      const ageDays = memoryAgeDays(memory, now);
      return Number(memory?.importance || 0) <= 2 && ageDays !== null && ageDays >= 14;
    })
    .map((memory) => ({
      id: memory.id,
      title: memoryDisplayTitle(memory),
      summary: memory.summary || "",
      importance: Number(memory.importance || 0),
      ageDays: memoryAgeDays(memory, now),
      tags: asArray(memory.tags),
      source: memory.source || "",
      updatedAt: memory.updatedAt || memory.createdAt || memory.date || "",
    }))
    .sort((a, b) => b.ageDays - a.ageDays || a.importance - b.importance);
  const groupMap = new Map();

  memories.forEach((memory) => {
    const group = memoryGroupKey(memory);
    if (!groupMap.has(group.key)) {
      groupMap.set(group.key, {
        key: group.key,
        label: group.label,
        type: group.type,
        count: 0,
        latestUpdatedAt: "",
        tags: [],
        sampleTitles: [],
      });
    }
    const entry = groupMap.get(group.key);
    entry.count += 1;
    const updatedAt = memory.updatedAt || memory.createdAt || memory.date || "";
    if (String(updatedAt).localeCompare(String(entry.latestUpdatedAt)) > 0) entry.latestUpdatedAt = updatedAt;
    entry.tags = [...new Set([...entry.tags, ...asArray(memory.tags)])];
    if (entry.sampleTitles.length < 3) entry.sampleTitles.push(memoryDisplayTitle(memory));
  });

  const groups = [...groupMap.values()]
    .filter((group) => group.count > 1 || group.type !== "none")
    .sort((a, b) => b.count - a.count || String(b.latestUpdatedAt).localeCompare(String(a.latestUpdatedAt)));

  return { candidates, groups };
}

function renderMemoryConsolidation(consolidation) {
  const candidateCount = $("#memoryConsolidationCandidateCount");
  if (candidateCount) candidateCount.textContent = `${asArray(consolidation?.candidates).length}件`;
  appendBrainItems(
    $("#memoryConsolidationGroups"),
    asArray(consolidation?.groups).map((group) => `${group.label} (${group.count})`),
    "記憶グループはまだありません。",
  );
}

function buildBrainMemoryContext(retrievalContext = {}, memorySource = memoryStore) {
  const retrieved = getRelevantMemories(retrievalContext, { limit: 3, memorySource });
  const recent = asArray(memorySource?.shortMemory)
    .sort((a, b) => memoryUpdatedTime(b) - memoryUpdatedTime(a))
    .slice(0, 3);
  const project = retrievalContext.project || retrieved.find((memory) => memory.project)?.project || "";
  return {
    project,
    tags: asArray(retrievalContext.tags),
    recommendationType: retrievalContext.recommendationType || "",
    eventType: retrievalContext.eventType || "",
    retrieved,
    recent,
    used: retrieved.length > 0 || recent.length > 0,
  };
}

function brainMemoryContextNote(memoryContext) {
  if (!memoryContext?.used) return "";
  const project = memoryContext.project || memoryContext.retrieved.find((memory) => memory.project)?.project || "";
  const retrievedTitle = memoryDisplayTitle(memoryContext.retrieved[0]);
  if (project && retrievedTitle) {
    return `${project}の記憶も参照すると、「${retrievedTitle}」の流れが続いています。`;
  }
  if (retrievedTitle) return `過去の記憶では「${retrievedTitle}」が近い文脈です。`;
  return "Memory を補助情報として参照しています。";
}

function applyBrainMemoryContext(recommendation, memoryContext) {
  const note = brainMemoryContextNote(memoryContext);
  if (!note) return recommendation;
  return {
    ...recommendation,
    message: `${recommendation.message} ${note}`,
    memoryNote: note,
  };
}

function renderBrainMemoryContext(memoryContext) {
  const project = $("#brainMemoryContextProject");
  if (project) project.textContent = memoryContext?.project || "-";
  appendBrainItems(
    $("#brainMemoryContextRetrieved"),
    asArray(memoryContext?.retrieved).map(memoryDisplayTitle),
    "Retrieved memory is not available yet.",
  );
  appendBrainItems(
    $("#brainMemoryContextRecent"),
    asArray(memoryContext?.recent).map(memoryDisplayTitle),
    "Recent memory is not available yet.",
  );
}

function buildConversationContext({
  project = "",
  recommendation = null,
  explanation = null,
  learningHint = null,
  learningConfidence = null,
  memoryContext = null,
  healthAwareConversation = null,
  todayTasks = [],
  todayEvents = [],
} = {}) {
  return {
    project,
    recommendation: recommendation ? {
      type: recommendation.type,
      title: recommendation.title,
      message: recommendation.message,
      actionText: recommendation.actionText,
    } : null,
    explanation: explanation ? {
      summary: explanation.summary || "",
      reasons: asArray(explanation.reasons),
    } : null,
    learningHint: learningHint ? {
      message: learningHint.message,
      confidence: learningHint.confidence,
      source: learningHint.source,
    } : null,
    learningConfidence: learningConfidence ? {
      score: learningConfidence.score,
      level: learningConfidence.level,
      message: learningConfidence.message,
      source: learningConfidence.source,
    } : null,
    memoryContext,
    healthAwareConversation,
    todayTasks: asArray(todayTasks).map((task) => ({
      title: task.title || "",
      done: Boolean(task.done),
    })),
    todayEvents: asArray(todayEvents).map((event) => ({
      title: event.title || "",
      type: event.type || "",
      time: event.time || "",
    })),
  };
}

function renderConversationContext(context) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#conversationContextProject", context?.project);
  setText("#conversationContextRecommendation", context?.recommendation?.title || context?.recommendation?.type);
  setText("#conversationContextMemory", memoryDisplayTitle(context?.memoryContext?.retrieved?.[0]) || memoryDisplayTitle(context?.memoryContext?.recent?.[0]));
  setText("#conversationContextLearning", context?.learningConfidence ? `確信度 ${context.learningConfidence.score}%` : "");
}

function buildReplyPlan(conversationContext = {}) {
  const firstEvent = asArray(conversationContext.todayEvents).find((event) => event.title);
  const firstTask = asArray(conversationContext.todayTasks).find((task) => task.title && !task.done);
  const memoryTitle = memoryDisplayTitle(conversationContext.memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(conversationContext.memoryContext?.recent?.[0]);
  const confidence = conversationContext.learningConfidence?.score ?? 0;
  const healthAware = conversationContext.healthAwareConversation || null;

  return {
    opening: firstEvent
      ? `今日の予定: ${firstEvent.title}`
      : conversationContext.project
        ? `プロジェクト: ${conversationContext.project}`
        : firstTask
          ? `今日のタスク: ${firstTask.title}`
          : "今日の状況を軽く確認する",
    mainPoint: conversationContext.recommendation?.actionText ||
      conversationContext.recommendation?.message ||
      conversationContext.recommendation?.title ||
      "提案を確認する",
    support: [
      memoryTitle ? `記憶: ${memoryTitle}` : "",
      conversationContext.learningHint?.message ? `学習: ${conversationContext.learningHint.message}` : "",
      healthAware?.supportHint ? `体調: ${healthAware.supportHint}` : "",
    ].filter(Boolean).join(" / ") || "補足情報はまだ少ない",
    uncertainty: confidence >= 60
      ? `学習の確信度は${confidence}%です。参考情報として使える状態です。`
      : `学習の確信度は${confidence}%です。まだ学習途中として控えめに扱います。`,
    closing: "様子を見ながら、次の一歩につなげる",
  };
}

function renderReplyPlan(replyPlan) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#replyPlanOpening", replyPlan?.opening);
  setText("#replyPlanMainPoint", replyPlan?.mainPoint);
  setText("#replyPlanSupport", replyPlan?.support);
  setText("#replyPlanUncertainty", replyPlan?.uncertainty);
  setText("#replyPlanClosing", replyPlan?.closing);
}

function replySentence(value) {
  return String(value || "").trim();
}

function sentenceWithPeriod(value) {
  const text = replySentence(value);
  if (!text) return "";
  return /[。！？!?]$/.test(text) ? text : `${text}。`;
}

function buildReplyOpening(opening) {
  const text = replySentence(opening);
  if (!text) return "";
  const eventMatch = text.match(/^今日の予定[:：]\s*(.+)$/);
  if (eventMatch) return `今日は「${eventMatch[1]}」の予定がありますね。`;
  const projectMatch = text.match(/^プロジェクト[:：]\s*(.+)$/);
  if (projectMatch) return `今日は「${projectMatch[1]}」を見ながら進める流れですね。`;
  const taskMatch = text.match(/^今日のタスク[:：]\s*(.+)$/);
  if (taskMatch) return `今日は「${taskMatch[1]}」が気になっているところですね。`;
  return sentenceWithPeriod(text);
}

function buildReplySupport(support) {
  const parts = replySentence(support).split(/\s*\/\s*/).filter(Boolean);
  if (!parts.length) return "";
  return parts.map((part) => {
    const memoryMatch = part.match(/^(?:Memory|記憶)[:：]\s*(.+)$/);
    if (memoryMatch) return `以前の記録では「${memoryMatch[1]}」が参考になりそうです。`;
    const learningMatch = part.match(/^(?:Learning|学習)[:：]\s*(.+)$/);
    if (learningMatch) return `学習では「${learningMatch[1]}」という傾向も見ています。`;
    return sentenceWithPeriod(part);
  }).join("\n");
}

function shouldIncludeReplyUncertainty(uncertainty) {
  return /確信度は[0-5]?\d%|Confidence [0-5]?\d%|まだ|学習途中|控えめ/.test(uncertainty || "");
}

function conversationImprovementHintsFrom(improvements, limit = 3) {
  return [...asArray(improvements)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))
    .slice(0, limit)
    .map((improvement) => improvement.hint)
    .filter(Boolean);
}

function getRecentConversationImprovementHints(limit = 3) {
  return conversationImprovementHintsFrom(conversationImprovements, limit);
}

function latestConversationReflectionFrom(reflections) {
  return [...asArray(reflections)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestConversationReflection() {
  return latestConversationReflectionFrom(conversationReflections);
}

function latestConversationContinuityFrom(continuityItems) {
  return [...asArray(continuityItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestConversationContinuity() {
  return latestConversationContinuityFrom(conversationContinuity);
}

function latestConversationRecoveryFrom(recoveryItems) {
  return [...asArray(recoveryItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestConversationRecovery() {
  return latestConversationRecoveryFrom(conversationRecovery);
}

function latestEmotionalResonanceFrom(resonanceItems) {
  return [...asArray(resonanceItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestEmotionalResonance() {
  return latestEmotionalResonanceFrom(emotionalResonance);
}

function latestIdentityProfileFrom(identityItems) {
  return [...asArray(identityItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestIdentityProfile() {
  return latestIdentityProfileFrom(identityProfile);
}

function latestGoalStateFrom(goalItems) {
  return [...asArray(goalItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestGoalState() {
  return latestGoalStateFrom(goalState);
}

function latestPriorityStateFrom(priorityItems) {
  return [...asArray(priorityItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestPriorityState() {
  return latestPriorityStateFrom(priorityState);
}

function latestDecisionStateFrom(decisionItems) {
  return [...asArray(decisionItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestDecisionState() {
  return latestDecisionStateFrom(decisionState);
}

function latestStrategyStateFrom(strategyItems) {
  return [...asArray(strategyItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestStrategyState() {
  return latestStrategyStateFrom(strategyState);
}

function latestAttentionStateFrom(attentionItems) {
  return [...asArray(attentionItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestAttentionState() {
  return latestAttentionStateFrom(attentionState);
}

function latestCognitiveStateFrom(cognitiveItems) {
  return [...asArray(cognitiveItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestCognitiveState() {
  return latestCognitiveStateFrom(cognitiveState);
}

function latestIntentStateFrom(intentItems) {
  return [...asArray(intentItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestIntentState() {
  return latestIntentStateFrom(intentState);
}

function latestTaskPlanStateFrom(taskPlanItems) {
  return [...asArray(taskPlanItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestTaskPlanState() {
  return latestTaskPlanStateFrom(taskPlanState);
}

function latestWorkflowStateFrom(workflowItems) {
  return [...asArray(workflowItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestWorkflowState() {
  return latestWorkflowStateFrom(workflowState);
}

function latestExecutionDecisionFrom(decisionItems) {
  return [...asArray(decisionItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestExecutionDecision() {
  return latestExecutionDecisionFrom(executionDecision);
}

function latestExecutionStateFrom(executionItems) {
  return [...asArray(executionItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestExecutionState() {
  return latestExecutionStateFrom(executionState);
}

function latestExecutionFeedbackFrom(feedbackItems) {
  return [...asArray(feedbackItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestExecutionFeedback() {
  return latestExecutionFeedbackFrom(executionFeedback);
}

function latestHealthStateFrom(healthItems) {
  return [...asArray(healthItems)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
}

function getLatestHealthState() {
  return latestHealthStateFrom(healthState);
}

function buildReply(
  replyPlan = {},
  improvementHints = getRecentConversationImprovementHints(),
  latestReflection = getLatestConversationReflection(),
  latestContinuity = getLatestConversationContinuity(),
  latestRecovery = getLatestConversationRecovery(),
  profile = personalityProfile,
  relationship = relationshipProfile,
  resonance = getLatestEmotionalResonance(),
  identity = getLatestIdentityProfile(),
  goal = getLatestGoalState(),
  priority = getLatestPriorityState(),
  decision = getLatestDecisionState(),
  strategy = getLatestStrategyState(),
  attention = getLatestAttentionState(),
  cognitive = getLatestCognitiveState(),
  intent = getLatestIntentState(),
  taskPlan = getLatestTaskPlanState(),
  workflow = getLatestWorkflowState(),
  executionDecisionState = getLatestExecutionDecision(),
  execution = getLatestExecutionState(),
  feedback = getLatestExecutionFeedback(),
  health = getLatestHealthState(),
  healthInsight = buildHealthInsight(getRecentHealthStates()),
  healthTrend = getLatestHealthTrend(),
  healthContext = buildHealthContext(health, healthInsight, healthTrend),
  healthAwareConversation = buildHealthAwareConversation(healthContext),
  healthAwareRecommendation = currentHealthAwareRecommendation || buildHealthAwareRecommendation(currentRecommendation, healthContext),
  executiveSummary = buildExecutiveSummary(
    intent,
    taskPlan,
    workflow,
    executionDecisionState,
    execution,
    feedback,
    health,
    healthContext,
  ),
  adaptiveIntelligence = buildAdaptiveIntelligence({
    conversationContext: currentConversationContext,
    replyPlan,
    profile,
    relationship,
    resonance,
    identity,
    cognitive,
    intent,
    taskPlan,
    workflow,
    executionDecision: executionDecisionState,
    execution,
    feedback,
    health,
    healthInsight,
    healthTrend,
    healthContext,
    healthAwareConversation,
    healthAwareRecommendation,
    executiveSummary,
  }),
) {
  const sections = {
    opening: buildReplyOpening(replyPlan.opening),
    mainPoint: sentenceWithPeriod(replyPlan.mainPoint),
    support: buildReplySupport(replyPlan.support),
    uncertainty: shouldIncludeReplyUncertainty(replyPlan.uncertainty)
      ? sentenceWithPeriod(replyPlan.uncertainty)
      : "",
    closing: sentenceWithPeriod(replyPlan.closing),
  };
  const text = [
    sections.opening,
    sections.mainPoint,
    sections.support,
    sections.uncertainty,
    sections.closing,
  ].filter(Boolean).join("\n\n");
  const executionStateMetadata = execution ? {
    sourceWorkflowId: execution.sourceWorkflowId,
    title: execution.title,
    actionType: execution.actionType,
    status: execution.status,
    reason: execution.reason,
    executedAt: execution.executedAt,
    resultNote: execution.resultNote,
  } : null;
  const executionFeedbackMetadata = feedback ? {
    executionId: feedback.executionId,
    outcome: feedback.outcome,
    difficulty: feedback.difficulty,
    completedAt: feedback.completedAt,
    durationMinutes: feedback.durationMinutes,
    note: feedback.note,
  } : null;
  const executionDecisionMetadata = executionDecisionState ? {
    workflowId: executionDecisionState.workflowId,
    selectedTitle: executionDecisionState.selectedTitle,
    selectedActionType: executionDecisionState.selectedActionType,
    priority: executionDecisionState.priority,
    decisionStatus: executionDecisionState.decisionStatus,
    decisionReason: executionDecisionState.decisionReason,
    confidence: executionDecisionState.confidence,
  } : null;
  const healthSummary = buildHealthSummary(health);

  return {
    text,
    sections,
    metadata: {
      healthSummary,
      healthInsight,
      healthTrend,
      healthContext,
      healthAwareConversation,
      healthAwareRecommendation,
      executiveSummary,
      adaptiveIntelligence,
      executionDecision: executionDecisionMetadata,
      executionState: executionStateMetadata,
      executionFeedback: executionFeedbackMetadata,
    },
    improvementHints: asArray(improvementHints),
    latestReflection: latestReflection ? {
      summary: latestReflection.summary,
      tone: latestReflection.tone,
      userNeed: latestReflection.userNeed,
      nextReplyHint: latestReflection.nextReplyHint,
    } : null,
    latestContinuity: latestContinuity ? {
      previousTopic: latestContinuity.previousTopic,
      emotionalState: latestContinuity.emotionalState,
      unresolvedNeed: latestContinuity.unresolvedNeed,
      nextOpeningHint: latestContinuity.nextOpeningHint,
      relatedMemoryIds: asArray(latestContinuity.relatedMemoryIds),
    } : null,
    latestRecovery: latestRecovery ? {
      trigger: latestRecovery.trigger,
      detectedIssue: latestRecovery.detectedIssue,
      recoveryStrategy: latestRecovery.recoveryStrategy,
      suggestedOpening: latestRecovery.suggestedOpening,
    } : null,
    personalityProfile: profile ? {
      warmth: profile.warmth,
      curiosity: profile.curiosity,
      patience: profile.patience,
      directness: profile.directness,
      humor: profile.humor,
      reflection: profile.reflection,
      supportiveness: profile.supportiveness,
    } : null,
    relationshipProfile: relationship ? {
      relationshipStage: relationship.relationshipStage,
      familiarity: relationship.familiarity,
      trust: relationship.trust,
      preferredSupport: relationship.preferredSupport,
      communicationDistance: relationship.communicationDistance,
      lastInteraction: relationship.lastInteraction,
    } : null,
    emotionalResonance: resonance ? {
      detectedMode: resonance.detectedMode,
      emotionalEnergy: resonance.emotionalEnergy,
      supportLevel: resonance.supportLevel,
      responseTone: resonance.responseTone,
      reasoning: resonance.reasoning,
    } : null,
    identityProfile: identity ? {
      identityMode: identity.identityMode,
      coreTraits: asArray(identity.coreTraits),
      relationshipContext: identity.relationshipContext,
      currentTone: identity.currentTone,
      responsePrinciple: identity.responsePrinciple,
    } : null,
    goalState: goal ? {
      currentGoal: goal.currentGoal,
      userGoal: goal.userGoal,
      assistantGoal: goal.assistantGoal,
      successCondition: goal.successCondition,
      nextStep: goal.nextStep,
      confidence: goal.confidence,
    } : null,
    priorityState: priority ? {
      primaryPriority: priority.primaryPriority,
      secondaryPriority: priority.secondaryPriority,
      ignoredTopics: asArray(priority.ignoredTopics),
      urgency: priority.urgency,
      reasoning: priority.reasoning,
    } : null,
    decisionState: decision ? {
      selectedApproach: decision.selectedApproach,
      alternativeApproaches: asArray(decision.alternativeApproaches),
      decisionReason: decision.decisionReason,
      confidence: decision.confidence,
      expectedOutcome: decision.expectedOutcome,
    } : null,
    strategyState: strategy ? {
      strategyType: strategy.strategyType,
      steps: asArray(strategy.steps),
      communicationPlan: strategy.communicationPlan,
      risk: strategy.risk,
      fallback: strategy.fallback,
    } : null,
    attentionState: attention ? {
      focusTarget: attention.focusTarget,
      secondaryFocus: attention.secondaryFocus,
      avoidFocus: attention.avoidFocus,
      attentionReason: attention.attentionReason,
      responseCue: attention.responseCue,
    } : null,
    cognitiveState: cognitive ? {
      cognitiveMode: cognitive.cognitiveMode,
      activeGoal: cognitive.activeGoal,
      activePriority: cognitive.activePriority,
      activeDecision: cognitive.activeDecision,
      activeStrategy: cognitive.activeStrategy,
      activeAttention: cognitive.activeAttention,
      reasoningSummary: cognitive.reasoningSummary,
    } : null,
    intentState: intent ? {
      primaryIntent: intent.primaryIntent,
      secondaryIntent: intent.secondaryIntent,
      executionType: intent.executionType,
      expectedResult: intent.expectedResult,
      reasoning: intent.reasoning,
    } : null,
    taskPlanState: taskPlan ? {
      objective: taskPlan.objective,
      plannedSteps: asArray(taskPlan.plannedSteps),
      dependencies: asArray(taskPlan.dependencies),
      estimatedComplexity: taskPlan.estimatedComplexity,
      completionCriteria: taskPlan.completionCriteria,
    } : null,
    workflowState: workflow ? {
      workflowStatus: workflow.workflowStatus,
      currentStep: workflow.currentStep,
      totalSteps: workflow.totalSteps,
      completedSteps: workflow.completedSteps,
      nextAction: workflow.nextAction,
      retryCount: workflow.retryCount,
    } : null,
    healthSummary,
    healthInsight,
    healthContext,
    healthAwareConversation,
    executiveSummary,
    adaptiveIntelligence,
    executionDecision: executionDecisionMetadata,
    executionState: executionStateMetadata,
    executionFeedback: executionFeedbackMetadata,
  };
}

function renderReply(reply) {
  const target = $("#generatedReplyText");
  if (!target) return;
  target.textContent = reply?.text || "-";
}

function renderPersonalityProfile(profile = personalityProfile) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#personalityWarmth", profile?.warmth);
  setText("#personalityCuriosity", profile?.curiosity);
  setText("#personalityPatience", profile?.patience);
  setText("#personalityDirectness", profile?.directness);
  setText("#personalityHumor", profile?.humor);
  setText("#personalityReflection", profile?.reflection);
  setText("#personalitySupportiveness", profile?.supportiveness);
}

function renderRelationshipProfile(profile = relationshipProfile) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#relationshipStage", profile?.relationshipStage);
  setText("#relationshipFamiliarity", profile?.familiarity);
  setText("#relationshipTrust", profile?.trust);
  setText("#relationshipPreferredSupport", profile?.preferredSupport);
  setText("#relationshipCommunicationDistance", profile?.communicationDistance);
  setText("#relationshipLastInteraction", profile?.lastInteraction);
}

function buildEmotionalResonance(context = {}, relationship = relationshipProfile, latestReflection = null) {
  const hasLowConfidence = Number(context?.learningConfidence?.score ?? 100) < 40;
  const wantsSoftening = latestReflection?.tone === "softer";
  const hasNeed = Boolean(replySentence(latestReflection?.userNeed));
  const trust = relationship?.trust || "building";
  let detectedMode = "steady_support";
  let emotionalEnergy = "medium";
  let supportLevel = "balanced";
  let responseTone = "warm and clear";
  const reasoning = [];

  if (wantsSoftening) {
    detectedMode = "repair";
    emotionalEnergy = "low";
    supportLevel = "high";
    responseTone = "soft, validating, and careful";
    reasoning.push("Latest reflection asks for a softer tone.");
  }
  if (hasLowConfidence) {
    detectedMode = detectedMode === "repair" ? "repair_with_uncertainty" : "uncertain";
    supportLevel = "high";
    responseTone = "careful and non-directive";
    reasoning.push("Learning confidence is low.");
  }
  if (hasNeed) {
    reasoning.push(`User need is visible: ${latestReflection.userNeed}`);
  }
  if (trust === "building") {
    reasoning.push("Relationship trust is still building.");
  }
  if (!reasoning.length) {
    reasoning.push("Conversation context looks stable.");
  }

  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    detectedMode,
    emotionalEnergy,
    supportLevel,
    responseTone,
    reasoning: reasoning.join(" "),
    createdAt: now,
    updatedAt: now,
  };
}

function upsertEmotionalResonance() {
  if (!currentConversationContext && !relationshipProfile) return null;
  const built = buildEmotionalResonance(
    currentConversationContext || {},
    relationshipProfile,
    getLatestConversationReflection(),
  );
  const now = new Date().toISOString();
  let resonance = emotionalResonance.find((entry) => entry.date === activeDate);
  if (resonance) {
    resonance.detectedMode = built.detectedMode;
    resonance.emotionalEnergy = built.emotionalEnergy;
    resonance.supportLevel = built.supportLevel;
    resonance.responseTone = built.responseTone;
    resonance.reasoning = built.reasoning;
    resonance.updatedAt = now;
  } else {
    resonance = built;
    emotionalResonance.unshift(resonance);
  }
  saveEmotionalResonance();
  upsertIdentityProfile();
  return resonance;
}

function renderEmotionalResonance() {
  const resonance = getLatestEmotionalResonance();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#emotionalResonanceMode", resonance?.detectedMode);
  setText("#emotionalResonanceEnergy", resonance?.emotionalEnergy);
  setText("#emotionalResonanceSupport", resonance?.supportLevel);
  setText("#emotionalResonanceTone", resonance?.responseTone);
  setText("#emotionalResonanceReasoning", resonance?.reasoning);
}

function buildIdentityProfile(profile = personalityProfile, relationship = relationshipProfile, resonance = getLatestEmotionalResonance()) {
  const coreTraits = [
    profile?.warmth,
    profile?.curiosity,
    profile?.patience,
    profile?.supportiveness,
  ].filter(Boolean);
  const identityMode = resonance?.detectedMode
    ? `${resonance.detectedMode}_identity`
    : "steady_identity";
  const relationshipContext = [
    relationship?.relationshipStage,
    relationship?.familiarity,
    relationship?.trust,
  ].filter(Boolean).join(" / ") || "relationship context is still forming";
  const currentTone = resonance?.responseTone || profile?.directness || "warm and clear";
  const responsePrinciple = `Respond with ${profile?.warmth || "warmth"}, ${profile?.patience || "patience"}, and ${relationship?.preferredSupport || "gentle support"}.`;
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    identityMode,
    coreTraits,
    relationshipContext,
    currentTone,
    responsePrinciple,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertIdentityProfile() {
  const built = buildIdentityProfile(personalityProfile, relationshipProfile, getLatestEmotionalResonance());
  const now = new Date().toISOString();
  let identity = identityProfile.find((entry) => entry.date === activeDate);
  if (identity) {
    identity.identityMode = built.identityMode;
    identity.coreTraits = built.coreTraits;
    identity.relationshipContext = built.relationshipContext;
    identity.currentTone = built.currentTone;
    identity.responsePrinciple = built.responsePrinciple;
    identity.updatedAt = now;
  } else {
    identity = built;
    identityProfile.unshift(identity);
  }
  saveIdentityProfile();
  return identity;
}

function renderIdentityProfile() {
  const identity = getLatestIdentityProfile();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#identityMode", identity?.identityMode);
  setText("#identityCoreTraits", asArray(identity?.coreTraits).join(" / "));
  setText("#identityRelationshipContext", identity?.relationshipContext);
  setText("#identityCurrentTone", identity?.currentTone);
  setText("#identityResponsePrinciple", identity?.responsePrinciple);
}

function buildGoalState(context = {}, latestReflection = null, identity = getLatestIdentityProfile()) {
  const recommendation = context?.recommendation || {};
  const currentGoal = recommendation.actionText ||
    recommendation.message ||
    recommendation.title ||
    context?.project ||
    "会話の目的を整える";
  const userGoal = latestReflection?.userNeed ||
    context?.project ||
    "今の状況に合う次の一歩を見つける";
  const assistantGoal = identity?.responsePrinciple ||
    "ユーザーの目的に沿って、自然で無理のない返答をする";
  const successCondition = latestReflection?.nextReplyHint ||
    "ユーザーが次に進みやすい返答になっている";
  const nextStep = recommendation.actionText ||
    latestReflection?.nextReplyHint ||
    "必要なら確認し、短い次の一歩を提案する";
  const confidence = Number(context?.learningConfidence?.score ?? 50);
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    currentGoal,
    userGoal,
    assistantGoal,
    successCondition,
    nextStep,
    confidence,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertGoalState() {
  if (!currentConversationContext && !getLatestIdentityProfile()) return null;
  const built = buildGoalState(
    currentConversationContext || {},
    getLatestConversationReflection(),
    getLatestIdentityProfile(),
  );
  const now = new Date().toISOString();
  let goal = goalState.find((entry) => entry.date === activeDate);
  if (goal) {
    goal.currentGoal = built.currentGoal;
    goal.userGoal = built.userGoal;
    goal.assistantGoal = built.assistantGoal;
    goal.successCondition = built.successCondition;
    goal.nextStep = built.nextStep;
    goal.confidence = built.confidence;
    goal.updatedAt = now;
  } else {
    goal = built;
    goalState.unshift(goal);
  }
  saveGoalState();
  return goal;
}

function renderGoalState() {
  const goal = getLatestGoalState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#goalCurrentGoal", goal?.currentGoal);
  setText("#goalUserGoal", goal?.userGoal);
  setText("#goalAssistantGoal", goal?.assistantGoal);
  setText("#goalSuccessCondition", goal?.successCondition);
  setText("#goalNextStep", goal?.nextStep);
  setText("#goalConfidence", goal?.confidence !== undefined ? `${goal.confidence}%` : "");
}

function buildPriorityState(goal = getLatestGoalState(), context = {}, identity = getLatestIdentityProfile()) {
  const confidence = Number(goal?.confidence ?? context?.learningConfidence?.score ?? 50);
  const hasUncertainty = confidence < 40 || Boolean(context?.replyPlan?.uncertainty);
  const ignoredTopics = [
    hasUncertainty ? "確信度が低い断定" : "",
    context?.recommendation ? "Recommendation と無関係な話題転換" : "",
  ].filter(Boolean);
  const urgency = confidence < 35
    ? "low"
    : asArray(context?.todayEvents).length > 0 || asArray(context?.todayTasks).length > 0
      ? "medium"
      : "normal";
  const primaryPriority = goal?.nextStep ||
    goal?.currentGoal ||
    context?.recommendation?.actionText ||
    "ユーザーが次に進みやすい一歩を明確にする";
  const secondaryPriority = goal?.successCondition ||
    identity?.responsePrinciple ||
    "返答の自然さと目的の一貫性を保つ";
  const reasoning = [
    goal?.userGoal ? `User goal: ${goal.userGoal}` : "",
    identity?.currentTone ? `Tone: ${identity.currentTone}` : "",
    context?.project ? `Context: ${context.project}` : "",
    `Confidence: ${confidence}%`,
  ].filter(Boolean).join(" / ");
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    primaryPriority,
    secondaryPriority,
    ignoredTopics,
    urgency,
    reasoning,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertPriorityState() {
  if (!getLatestGoalState() && !currentConversationContext && !getLatestIdentityProfile()) return null;
  const built = buildPriorityState(
    getLatestGoalState(),
    currentConversationContext || {},
    getLatestIdentityProfile(),
  );
  const now = new Date().toISOString();
  let priority = priorityState.find((entry) => entry.date === activeDate);
  if (priority) {
    priority.primaryPriority = built.primaryPriority;
    priority.secondaryPriority = built.secondaryPriority;
    priority.ignoredTopics = built.ignoredTopics;
    priority.urgency = built.urgency;
    priority.reasoning = built.reasoning;
    priority.updatedAt = now;
  } else {
    priority = built;
    priorityState.unshift(priority);
  }
  savePriorityState();
  return priority;
}

function renderPriorityState() {
  const priority = getLatestPriorityState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#priorityPrimaryPriority", priority?.primaryPriority);
  setText("#prioritySecondaryPriority", priority?.secondaryPriority);
  setText("#priorityIgnoredTopics", asArray(priority?.ignoredTopics).join(" / "));
  setText("#priorityUrgency", priority?.urgency);
  setText("#priorityReasoning", priority?.reasoning);
}

function buildDecisionState(
  goal = getLatestGoalState(),
  priority = getLatestPriorityState(),
  identity = getLatestIdentityProfile(),
  context = {},
) {
  const goalConfidence = Number(goal?.confidence ?? context?.learningConfidence?.score ?? 50);
  const urgency = priority?.urgency || "normal";
  const selectedApproach = priority?.primaryPriority ||
    goal?.nextStep ||
    context?.recommendation?.actionText ||
    "目的に沿った短い次の一歩を提案する";
  const alternativeApproaches = [
    priority?.secondaryPriority || goal?.successCondition,
    identity?.responsePrinciple,
    context?.recommendation?.message,
  ].filter(Boolean).filter((item, index, items) => items.indexOf(item) === index).slice(0, 3);
  const confidence = Math.max(0, Math.min(100, Math.round(
    goalConfidence + (urgency === "medium" ? 5 : 0) - (urgency === "low" ? 10 : 0),
  )));
  const decisionReason = [
    priority?.reasoning,
    identity?.currentTone ? `Identity tone: ${identity.currentTone}` : "",
    goal?.assistantGoal ? `Assistant goal: ${goal.assistantGoal}` : "",
  ].filter(Boolean).join(" / ") || "Goal State と Priority State に沿って判断します。";
  const expectedOutcome = goal?.successCondition ||
    priority?.secondaryPriority ||
    "ユーザーが次に進みやすく、返答の目的がぶれない状態になる";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    selectedApproach,
    alternativeApproaches,
    decisionReason,
    confidence,
    expectedOutcome,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertDecisionState() {
  if (!getLatestPriorityState() && !getLatestGoalState() && !getLatestIdentityProfile()) return null;
  const built = buildDecisionState(
    getLatestGoalState(),
    getLatestPriorityState(),
    getLatestIdentityProfile(),
    currentConversationContext || {},
  );
  const now = new Date().toISOString();
  let decision = decisionState.find((entry) => entry.date === activeDate);
  if (decision) {
    decision.selectedApproach = built.selectedApproach;
    decision.alternativeApproaches = built.alternativeApproaches;
    decision.decisionReason = built.decisionReason;
    decision.confidence = built.confidence;
    decision.expectedOutcome = built.expectedOutcome;
    decision.updatedAt = now;
  } else {
    decision = built;
    decisionState.unshift(decision);
  }
  saveDecisionState();
  return decision;
}

function renderDecisionState() {
  const decision = getLatestDecisionState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#decisionSelectedApproach", decision?.selectedApproach);
  setText("#decisionAlternativeApproaches", asArray(decision?.alternativeApproaches).join(" / "));
  setText("#decisionReason", decision?.decisionReason);
  setText("#decisionConfidence", decision?.confidence !== undefined ? `${decision.confidence}%` : "");
  setText("#decisionExpectedOutcome", decision?.expectedOutcome);
}

function buildStrategyState(
  goal = getLatestGoalState(),
  priority = getLatestPriorityState(),
  decision = getLatestDecisionState(),
  identity = getLatestIdentityProfile(),
) {
  const confidence = Number(decision?.confidence ?? goal?.confidence ?? 50);
  const strategyType = confidence < 40
    ? "careful_stepwise"
    : priority?.urgency === "medium"
      ? "focused_action"
      : "steady_support";
  const steps = [
    decision?.selectedApproach || priority?.primaryPriority || goal?.nextStep,
    priority?.secondaryPriority || decision?.expectedOutcome || goal?.successCondition,
    identity?.currentTone ? `Tone: ${identity.currentTone}` : "",
  ].filter(Boolean).slice(0, 3);
  const communicationPlan = [
    identity?.responsePrinciple || goal?.assistantGoal,
    priority?.ignoredTopics?.length ? `Avoid: ${asArray(priority.ignoredTopics).join(" / ")}` : "",
  ].filter(Boolean).join(" / ") || "目的に沿って短く自然に進める";
  const risk = confidence < 40
    ? "確信度が低いため、断定しすぎると違和感が出る可能性があります。"
    : asArray(priority?.ignoredTopics).join(" / ") || "大きなリスクはまだ検出されていません。";
  const fallback = decision?.alternativeApproaches?.[0] ||
    goal?.successCondition ||
    "反応を見て、より短く確認する返答に切り替える";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    strategyType,
    steps,
    communicationPlan,
    risk,
    fallback,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertStrategyState() {
  if (!getLatestDecisionState() && !getLatestPriorityState() && !getLatestGoalState()) return null;
  const built = buildStrategyState(
    getLatestGoalState(),
    getLatestPriorityState(),
    getLatestDecisionState(),
    getLatestIdentityProfile(),
  );
  const now = new Date().toISOString();
  let strategy = strategyState.find((entry) => entry.date === activeDate);
  if (strategy) {
    strategy.strategyType = built.strategyType;
    strategy.steps = built.steps;
    strategy.communicationPlan = built.communicationPlan;
    strategy.risk = built.risk;
    strategy.fallback = built.fallback;
    strategy.updatedAt = now;
  } else {
    strategy = built;
    strategyState.unshift(strategy);
  }
  saveStrategyState();
  return strategy;
}

function renderStrategyState() {
  const strategy = getLatestStrategyState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#strategyType", strategy?.strategyType);
  setText("#strategySteps", asArray(strategy?.steps).join(" / "));
  setText("#strategyCommunicationPlan", strategy?.communicationPlan);
  setText("#strategyRisk", strategy?.risk);
  setText("#strategyFallback", strategy?.fallback);
}

function buildAttentionState(
  goal = getLatestGoalState(),
  priority = getLatestPriorityState(),
  decision = getLatestDecisionState(),
  strategy = getLatestStrategyState(),
  context = {},
) {
  const focusTarget = strategy?.steps?.[0] ||
    decision?.selectedApproach ||
    priority?.primaryPriority ||
    goal?.nextStep ||
    "次に進むための一歩";
  const secondaryFocus = strategy?.steps?.[1] ||
    priority?.secondaryPriority ||
    decision?.expectedOutcome ||
    goal?.successCondition ||
    "返答の自然さ";
  const avoidFocus = strategy?.risk ||
    asArray(priority?.ignoredTopics).join(" / ") ||
    "目的から離れた話題転換";
  const attentionReason = [
    strategy?.strategyType ? `Strategy: ${strategy.strategyType}` : "",
    priority?.reasoning,
    context?.project && !String(priority?.reasoning || "").includes(`Context: ${context.project}`)
      ? `Context: ${context.project}`
      : "",
  ].filter(Boolean).join(" / ") || "Goal、Priority、Decision、Strategy の現在値に基づきます。";
  const responseCue = strategy?.communicationPlan ||
    decision?.decisionReason ||
    "焦点を一つに絞り、短く自然に返答する";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    focusTarget,
    secondaryFocus,
    avoidFocus,
    attentionReason,
    responseCue,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertAttentionState() {
  if (!getLatestStrategyState() && !getLatestDecisionState() && !getLatestPriorityState() && !getLatestGoalState()) return null;
  const built = buildAttentionState(
    getLatestGoalState(),
    getLatestPriorityState(),
    getLatestDecisionState(),
    getLatestStrategyState(),
    currentConversationContext || {},
  );
  const now = new Date().toISOString();
  let attention = attentionState.find((entry) => entry.date === activeDate);
  if (attention) {
    attention.focusTarget = built.focusTarget;
    attention.secondaryFocus = built.secondaryFocus;
    attention.avoidFocus = built.avoidFocus;
    attention.attentionReason = built.attentionReason;
    attention.responseCue = built.responseCue;
    attention.updatedAt = now;
  } else {
    attention = built;
    attentionState.unshift(attention);
  }
  saveAttentionState();
  return attention;
}

function renderAttentionState() {
  const attention = getLatestAttentionState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#attentionFocusTarget", attention?.focusTarget);
  setText("#attentionSecondaryFocus", attention?.secondaryFocus);
  setText("#attentionAvoidFocus", attention?.avoidFocus);
  setText("#attentionReason", attention?.attentionReason);
  setText("#attentionResponseCue", attention?.responseCue);
}

function buildCognitiveState(
  goal = getLatestGoalState(),
  priority = getLatestPriorityState(),
  decision = getLatestDecisionState(),
  strategy = getLatestStrategyState(),
  attention = getLatestAttentionState(),
) {
  const cognitiveMode = strategy?.strategyType ||
    (decision?.confidence !== undefined && decision.confidence < 40 ? "careful_integration" : "steady_integration");
  const activeGoal = goal?.currentGoal || goal?.nextStep || "";
  const activePriority = priority?.primaryPriority || "";
  const activeDecision = decision?.selectedApproach || "";
  const activeStrategy = strategy?.strategyType || "";
  const activeAttention = attention?.focusTarget || "";
  const reasoningSummary = [
    goal?.userGoal ? `Goal: ${goal.userGoal}` : "",
    priority?.urgency ? `Priority urgency: ${priority.urgency}` : "",
    decision?.confidence !== undefined ? `Decision confidence: ${decision.confidence}%` : "",
    attention?.responseCue ? `Cue: ${attention.responseCue}` : "",
  ].filter(Boolean).join(" / ") || "Goal、Priority、Decision、Strategy、Attention を統合しています。";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    cognitiveMode,
    activeGoal,
    activePriority,
    activeDecision,
    activeStrategy,
    activeAttention,
    reasoningSummary,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertCognitiveState() {
  if (!getLatestAttentionState() && !getLatestStrategyState() && !getLatestDecisionState() && !getLatestPriorityState() && !getLatestGoalState()) return null;
  const built = buildCognitiveState(
    getLatestGoalState(),
    getLatestPriorityState(),
    getLatestDecisionState(),
    getLatestStrategyState(),
    getLatestAttentionState(),
  );
  const now = new Date().toISOString();
  let cognitive = cognitiveState.find((entry) => entry.date === activeDate);
  if (cognitive) {
    cognitive.cognitiveMode = built.cognitiveMode;
    cognitive.activeGoal = built.activeGoal;
    cognitive.activePriority = built.activePriority;
    cognitive.activeDecision = built.activeDecision;
    cognitive.activeStrategy = built.activeStrategy;
    cognitive.activeAttention = built.activeAttention;
    cognitive.reasoningSummary = built.reasoningSummary;
    cognitive.updatedAt = now;
  } else {
    cognitive = built;
    cognitiveState.unshift(cognitive);
  }
  saveCognitiveState();
  return cognitive;
}

function renderCognitiveState() {
  const cognitive = getLatestCognitiveState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#cognitiveMode", cognitive?.cognitiveMode);
  setText("#cognitiveActiveGoal", cognitive?.activeGoal);
  setText("#cognitiveActivePriority", cognitive?.activePriority);
  setText("#cognitiveActiveDecision", cognitive?.activeDecision);
  setText("#cognitiveActiveStrategy", cognitive?.activeStrategy);
  setText("#cognitiveActiveAttention", cognitive?.activeAttention);
  setText("#cognitiveReasoningSummary", cognitive?.reasoningSummary);
}

function buildIntentState(cognitive = getLatestCognitiveState(), identity = getLatestIdentityProfile(), context = {}) {
  const primaryIntent = cognitive?.activeDecision ||
    cognitive?.activeGoal ||
    context?.recommendation?.actionText ||
    "ユーザーが次に進みやすい返答を実行する";
  const secondaryIntent = cognitive?.activeAttention ||
    identity?.responsePrinciple ||
    "返答の自然さと一貫性を保つ";
  const executionType = cognitive?.cognitiveMode?.includes("careful")
    ? "careful_response"
    : context?.recommendation?.type
      ? `recommendation_${context.recommendation.type}`
      : "supportive_response";
  const expectedResult = context?.recommendation?.message ||
    cognitive?.reasoningSummary ||
    "ユーザーが目的と次の一歩を自然に受け取れる";
  const reasoning = [
    cognitive?.reasoningSummary,
    identity?.currentTone ? `Identity tone: ${identity.currentTone}` : "",
    context?.project ? `Context: ${context.project}` : "",
  ].filter(Boolean).join(" / ") || "Cognitive State、Identity Profile、Conversation Context に基づきます。";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    primaryIntent,
    secondaryIntent,
    executionType,
    expectedResult,
    reasoning,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertIntentState() {
  if (!getLatestCognitiveState() && !getLatestIdentityProfile() && !currentConversationContext) return null;
  const built = buildIntentState(
    getLatestCognitiveState(),
    getLatestIdentityProfile(),
    currentConversationContext || {},
  );
  const now = new Date().toISOString();
  let intent = intentState.find((entry) => entry.date === activeDate);
  if (intent) {
    intent.primaryIntent = built.primaryIntent;
    intent.secondaryIntent = built.secondaryIntent;
    intent.executionType = built.executionType;
    intent.expectedResult = built.expectedResult;
    intent.reasoning = built.reasoning;
    intent.updatedAt = now;
  } else {
    intent = built;
    intentState.unshift(intent);
  }
  saveIntentState();
  return intent;
}

function renderIntentState() {
  const intent = getLatestIntentState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#intentPrimaryIntent", intent?.primaryIntent);
  setText("#intentSecondaryIntent", intent?.secondaryIntent);
  setText("#intentExecutionType", intent?.executionType);
  setText("#intentExpectedResult", intent?.expectedResult);
  setText("#intentReasoning", intent?.reasoning);
}

function buildTaskPlanState(intent = getLatestIntentState(), cognitive = getLatestCognitiveState()) {
  const objective = intent?.primaryIntent ||
    cognitive?.activeDecision ||
    "現在の Intent に沿って返答を実行する";
  const plannedSteps = [
    cognitive?.activeAttention ? `Focus: ${cognitive.activeAttention}` : "",
    intent?.secondaryIntent ? `Support: ${intent.secondaryIntent}` : "",
    intent?.executionType ? `Execute as ${intent.executionType}` : "",
  ].filter(Boolean);
  const dependencies = [
    cognitive?.cognitiveMode ? `Cognitive mode: ${cognitive.cognitiveMode}` : "",
    intent?.reasoning ? "Intent reasoning" : "",
  ].filter(Boolean);
  const estimatedComplexity = intent?.executionType?.includes("careful") || cognitive?.cognitiveMode?.includes("careful")
    ? "medium"
    : "low";
  const completionCriteria = intent?.expectedResult ||
    cognitive?.reasoningSummary ||
    "返答が Intent と Cognitive State に沿っている";
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    objective,
    plannedSteps,
    dependencies,
    estimatedComplexity,
    completionCriteria,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertTaskPlanState() {
  if (!getLatestIntentState() && !getLatestCognitiveState()) return null;
  const built = buildTaskPlanState(getLatestIntentState(), getLatestCognitiveState());
  const now = new Date().toISOString();
  let plan = taskPlanState.find((entry) => entry.date === activeDate);
  if (plan) {
    plan.objective = built.objective;
    plan.plannedSteps = built.plannedSteps;
    plan.dependencies = built.dependencies;
    plan.estimatedComplexity = built.estimatedComplexity;
    plan.completionCriteria = built.completionCriteria;
    plan.updatedAt = now;
  } else {
    plan = built;
    taskPlanState.unshift(plan);
  }
  saveTaskPlanState();
  return plan;
}

function renderTaskPlanState() {
  const plan = getLatestTaskPlanState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#taskPlanObjective", plan?.objective);
  setText("#taskPlanPlannedSteps", asArray(plan?.plannedSteps).join(" / "));
  setText("#taskPlanDependencies", asArray(plan?.dependencies).join(" / "));
  setText("#taskPlanEstimatedComplexity", plan?.estimatedComplexity);
  setText("#taskPlanCompletionCriteria", plan?.completionCriteria);
}

function buildWorkflowState(plan = getLatestTaskPlanState()) {
  const steps = asArray(plan?.plannedSteps);
  const totalSteps = steps.length;
  const workflowStatus = totalSteps > 0 ? "ready" : "pending";
  const currentStep = totalSteps > 0 ? 1 : 0;
  const completedSteps = 0;
  const nextAction = steps[0] || plan?.objective || "Task Plan を作成する";
  const retryCount = 0;
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    workflowStatus,
    currentStep,
    totalSteps,
    completedSteps,
    nextAction,
    retryCount,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertWorkflowState() {
  if (!getLatestTaskPlanState()) return null;
  const built = buildWorkflowState(getLatestTaskPlanState());
  const now = new Date().toISOString();
  let workflow = workflowState.find((entry) => entry.date === activeDate);
  if (workflow) {
    const totalSteps = built.totalSteps;
    workflow.totalSteps = totalSteps;
    workflow.completedSteps = Math.min(Number(workflow.completedSteps || 0), totalSteps);
    workflow.currentStep = totalSteps > 0
      ? Math.min(Math.max(Number(workflow.currentStep || 1), 1), totalSteps)
      : 0;
    if (!["pending", "ready", "running", "waiting", "completed", "failed"].includes(workflow.workflowStatus)) {
      workflow.workflowStatus = built.workflowStatus;
    }
    if (workflow.completedSteps >= totalSteps && totalSteps > 0) {
      workflow.workflowStatus = "completed";
    } else if (workflow.workflowStatus === "completed" && workflow.completedSteps < totalSteps) {
      workflow.workflowStatus = built.workflowStatus;
    }
    workflow.nextAction = asArray(getLatestTaskPlanState()?.plannedSteps)[workflow.completedSteps] ||
      built.nextAction;
    workflow.retryCount = Number(workflow.retryCount || 0);
    workflow.updatedAt = now;
  } else {
    workflow = built;
    workflowState.unshift(workflow);
  }
  saveWorkflowState();
  return workflow;
}

function renderWorkflowState() {
  const workflow = getLatestWorkflowState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#workflowStatus", workflow?.workflowStatus);
  setText("#workflowCurrentStep", workflow?.currentStep !== undefined ? String(workflow.currentStep) : "");
  setText("#workflowTotalSteps", workflow?.totalSteps !== undefined ? String(workflow.totalSteps) : "");
  setText("#workflowCompletedSteps", workflow?.completedSteps !== undefined ? String(workflow.completedSteps) : "");
  setText("#workflowNextAction", workflow?.nextAction);
  setText("#workflowRetryCount", workflow?.retryCount !== undefined ? String(workflow.retryCount) : "");
}

function buildExecutionDecision(workflow = getLatestWorkflowState()) {
  const now = new Date().toISOString();
  const workflowStatus = workflow?.workflowStatus || "";
  const selectedTitle = workflow?.nextAction || "";
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    workflowId: workflow?.id || "",
    selectedTitle,
    selectedActionType: workflowStatus === "ready" ? "manual_confirm" : "review",
    priority: workflowStatus === "ready" ? "normal" : "low",
    decisionStatus: "proposed",
    decisionReason: selectedTitle
      ? `Workflow status is ${workflowStatus || "unknown"}, so "${selectedTitle}" is proposed for review.`
      : `Workflow status is ${workflowStatus || "unknown"}, so the next execution candidate needs review.`,
    confidence: "medium",
    createdAt: now,
    updatedAt: now,
  };
}

function upsertExecutionDecision() {
  const workflow = getLatestWorkflowState();
  if (!workflow) return null;
  const built = buildExecutionDecision(workflow);
  const now = new Date().toISOString();
  let decision = executionDecision.find((entry) =>
    entry.date === activeDate &&
    entry.workflowId === built.workflowId
  );
  if (decision) {
    decision.selectedTitle = built.selectedTitle;
    decision.selectedActionType = built.selectedActionType;
    decision.priority = built.priority;
    decision.decisionReason = built.decisionReason;
    decision.confidence = built.confidence;
    decision.updatedAt = now;
  } else {
    decision = built;
    executionDecision.unshift(decision);
  }
  saveExecutionDecision();
  return decision;
}

function renderExecutionDecision() {
  const decision = getLatestExecutionDecision();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#executionDecisionPriority", decision?.priority);
  setText("#executionDecisionStatus", decision?.decisionStatus);
  setText("#executionDecisionTitle", decision?.selectedTitle);
  setText("#executionDecisionActionType", decision?.selectedActionType);
  setText("#executionDecisionConfidence", decision?.confidence);
  setText("#executionDecisionReason", decision?.decisionReason);
}

function buildExecutionState(
  workflow = getLatestWorkflowState(),
  plan = getLatestTaskPlanState(),
  decision = getLatestExecutionDecision(),
) {
  const now = new Date().toISOString();
  const title = decision?.selectedTitle || workflow?.nextAction || "";
  const actionType = decision?.selectedActionType ||
    (workflow?.workflowStatus === "ready" ? "manual_confirm" : "review");
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    sourceWorkflowId: workflow?.id || "",
    title,
    actionType,
    status: "pending",
    reason: decision?.decisionReason || plan?.completionCriteria || workflow?.workflowStatus || "",
    createdAt: now,
    updatedAt: now,
    executedAt: "",
    resultNote: "",
  };
}

function upsertExecutionState() {
  const workflow = getLatestWorkflowState();
  if (!workflow) return null;
  const built = buildExecutionState(workflow, getLatestTaskPlanState(), getLatestExecutionDecision());
  const now = new Date().toISOString();
  let execution = executionState.find((entry) =>
    entry.date === activeDate &&
    entry.sourceWorkflowId === built.sourceWorkflowId
  );
  if (execution) {
    execution.title = built.title;
    execution.actionType = built.actionType;
    execution.reason = built.reason;
    execution.updatedAt = now;
  } else {
    execution = built;
    executionState.unshift(execution);
  }
  saveExecutionState();
  return execution;
}

function renderExecutionState() {
  const execution = getLatestExecutionState();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#executionStatus", execution?.status);
  setText("#executionTitle", execution?.title);
  setText("#executionActionType", execution?.actionType);
  setText("#executionReason", execution?.reason);
  setText("#executionExecutedAt", execution?.executedAt);
  setText("#executionResultNote", execution?.resultNote);
}

function buildExecutionFeedback(execution = getLatestExecutionState()) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    executionId: execution?.id || "",
    outcome: "pending",
    difficulty: "unknown",
    completedAt: "",
    durationMinutes: "",
    note: "",
    createdAt: now,
    updatedAt: now,
  };
}

function upsertExecutionFeedback(updates = {}) {
  const execution = getLatestExecutionState();
  if (!execution) return null;
  const built = buildExecutionFeedback(execution);
  const now = new Date().toISOString();
  let feedback = executionFeedback.find((entry) =>
    entry.date === activeDate &&
    entry.executionId === built.executionId
  );
  if (feedback) {
    if ("outcome" in updates) feedback.outcome = updates.outcome || "pending";
    if ("difficulty" in updates) feedback.difficulty = updates.difficulty || "unknown";
    if ("completedAt" in updates) feedback.completedAt = updates.completedAt || "";
    if ("durationMinutes" in updates) feedback.durationMinutes = updates.durationMinutes || "";
    if ("note" in updates) feedback.note = updates.note || "";
    feedback.updatedAt = now;
  } else {
    feedback = { ...built, ...updates, updatedAt: now };
    feedback.outcome = feedback.outcome || "pending";
    feedback.difficulty = feedback.difficulty || "unknown";
    feedback.completedAt = feedback.completedAt || "";
    feedback.durationMinutes = feedback.durationMinutes || "";
    feedback.note = feedback.note || "";
    executionFeedback.unshift(feedback);
  }
  saveExecutionFeedback();
  return feedback;
}

function renderExecutionFeedback() {
  const execution = getLatestExecutionState();
  const feedback = execution
    ? executionFeedback.find((entry) => entry.date === activeDate && entry.executionId === execution.id)
    : null;
  const setValue = (selector, value) => {
    const target = $(selector);
    if (!target) return;
    target.disabled = !execution;
    if (target.value !== (value || "")) target.value = value || "";
  };
  setValue("#executionFeedbackOutcome", feedback?.outcome || "pending");
  setValue("#executionFeedbackDifficulty", feedback?.difficulty || "unknown");
  setValue("#executionFeedbackDuration", feedback?.durationMinutes);
  setValue("#executionFeedbackCompletedAt", feedback?.completedAt);
  setValue("#executionFeedbackNote", feedback?.note);
  const status = $("#executionFeedbackStatus");
  if (!status) return;
  if (!execution) {
    status.textContent = "Execution State is not available yet.";
  } else if (feedback?.updatedAt) {
    status.textContent = "Execution Feedback saved.";
  } else {
    status.textContent = "Record execution results manually.";
  }
}

function buildExecutiveSummary(
  intent = getLatestIntentState(),
  plan = getLatestTaskPlanState(),
  workflow = getLatestWorkflowState(),
  decision = getLatestExecutionDecision(),
  execution = getLatestExecutionState(),
  feedback = getLatestExecutionFeedback(),
  health = getLatestHealthState(),
  healthContext = getLatestHealthContext(),
) {
  const workflowStatus = workflow?.workflowStatus || "";
  const healthSummary = buildHealthSummary(health);
  const summaryDate = intent?.date ||
    plan?.date ||
    workflow?.date ||
    decision?.date ||
    execution?.date ||
    feedback?.date ||
    health?.date ||
    activeDate;
  const decisionParts = [
    decision?.priority ? `priority: ${decision.priority}` : "",
    decision?.decisionStatus ? `status: ${decision.decisionStatus}` : "",
    decision?.decisionReason || "",
  ].filter(Boolean);
  const feedbackParts = [
    feedback?.outcome || "",
    feedback?.difficulty ? `difficulty: ${feedback.difficulty}` : "",
    feedback?.note || "",
  ].filter(Boolean);
  const executionStatus = execution?.status || "pending";
  const feedbackOutcome = feedbackParts.join(" / ") || "pending";
  const executiveMode = feedback?.outcome === "completed"
    ? "reviewed"
    : executionStatus === "pending"
      ? "ready_for_review"
      : workflowStatus || "observing";
  const risk = [
    feedback?.difficulty === "hard" ? "Feedback marked hard." : "",
    feedback?.outcome === "failed" ? "Execution failed." : "",
    workflowStatus === "failed" ? "Workflow failed." : "",
    healthContext.currentRisk || healthSummary.risk,
    !execution ? "Execution candidate is not available." : "",
  ].filter(Boolean).join(" ") || "No immediate risk detected.";

  return {
    date: summaryDate,
    executiveMode,
    currentIntent: intent?.primaryIntent || "",
    currentObjective: plan?.objective || "",
    workflowStatus,
    decisionSummary: decisionParts.join(" / "),
    executionStatus,
    feedbackOutcome,
    nextAction: workflow?.nextAction || execution?.title || decision?.selectedTitle || "",
    healthContext: healthContext.executiveNote || healthSummary.healthContext,
    risk,
    updatedAt: new Date().toISOString(),
  };
}

function renderExecutiveSummary() {
  const executiveSummary = buildExecutiveSummary();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#executiveSummaryMode", executiveSummary.executiveMode);
  setText("#executiveSummaryIntent", executiveSummary.currentIntent);
  setText("#executiveSummaryObjective", executiveSummary.currentObjective);
  setText("#executiveSummaryWorkflow", executiveSummary.workflowStatus);
  setText("#executiveSummaryDecision", executiveSummary.decisionSummary);
  setText("#executiveSummaryExecution", executiveSummary.executionStatus);
  setText("#executiveSummaryFeedback", executiveSummary.feedbackOutcome);
  setText("#executiveSummaryNextAction", executiveSummary.nextAction);
  setText("#executiveSummaryHealth", executiveSummary.healthContext);
  setText("#executiveSummaryRisk", executiveSummary.risk);
}

function buildAdaptiveIntelligence(inputs = {}) {
  const healthContext = inputs.healthContext || getLatestHealthContext();
  const healthTrend = inputs.healthTrend || getLatestHealthTrend();
  const executiveSummary = inputs.executiveSummary || buildExecutiveSummary();
  const cognitive = inputs.cognitive || getLatestCognitiveState();
  const identity = inputs.identity || getLatestIdentityProfile();
  const healthAwareConversation = inputs.healthAwareConversation || buildHealthAwareConversation(healthContext);
  const healthAwareRecommendation = inputs.healthAwareRecommendation || getLatestHealthAwareRecommendation();
  const feedback = inputs.feedback || getLatestExecutionFeedback();
  const workflow = inputs.workflow || getLatestWorkflowState();
  const recovery = inputs.recovery || getLatestConversationRecovery();
  const riskText = [
    executiveSummary?.risk,
    healthContext?.currentRisk,
    healthAwareConversation?.cautionNote,
    healthAwareRecommendation?.cautionNote,
  ].filter(Boolean).join(" ").toLowerCase();
  const lowCapacity = ["low", "very_low"].includes(healthContext?.currentCapacity);
  const needsRecovery = ["depleted", "low"].includes(healthContext?.recoveryStatus);
  const elevatedRisk = riskText.includes("high") ||
    riskText.includes("overwhelming") ||
    riskText.includes("failed") ||
    riskText.includes("hard") ||
    Boolean(recovery?.detectedIssue);
  const readyWorkflow = workflow?.workflowStatus === "ready" || executiveSummary?.executiveMode === "ready_for_review";
  const recoveryMomentum = healthTrend?.recoveryMomentum || "insufficient_data";
  const adaptiveMode = elevatedRisk
    ? "careful"
    : lowCapacity || needsRecovery
      ? "recovery_support"
      : readyWorkflow
        ? "focused"
        : "steady";
  const responseStyle = adaptiveMode === "careful" || adaptiveMode === "recovery_support"
    ? "gentle_contextual"
    : identity?.currentTone || healthAwareConversation?.conversationTone || "steady";
  const recommendationBias = lowCapacity || needsRecovery
    ? "small_step"
    : recoveryMomentum === "improving"
      ? "maintain_momentum"
      : "keep_current";
  const executionBias = elevatedRisk
    ? "review_before_action"
    : readyWorkflow
      ? "manual_confirm"
      : "observe";
  const riskSensitivity = elevatedRisk
    ? "high"
    : lowCapacity || needsRecovery
      ? "medium"
      : "normal";
  const supportLevel = adaptiveMode === "careful" || adaptiveMode === "recovery_support"
    ? "high"
    : "normal";
  const attentionTarget = cognitive?.activeAttention ||
    executiveSummary?.nextAction ||
    healthContext?.recommendationContext ||
    "current_context";
  const reasoning = [
    executiveSummary?.executiveMode ? `executive:${executiveSummary.executiveMode}` : "",
    cognitive?.cognitiveMode ? `cognitive:${cognitive.cognitiveMode}` : "",
    healthContext?.currentCapacity ? `capacity:${healthContext.currentCapacity}` : "",
    healthContext?.recoveryStatus ? `recovery:${healthContext.recoveryStatus}` : "",
    healthTrend?.recoveryMomentum ? `momentum:${healthTrend.recoveryMomentum}` : "",
    feedback?.outcome ? `feedback:${feedback.outcome}` : "",
  ].filter(Boolean).join(" / ");

  return {
    date: executiveSummary?.date || healthContext?.date || activeDate,
    adaptiveMode,
    responseStyle,
    recommendationBias,
    executionBias,
    riskSensitivity,
    supportLevel,
    attentionTarget,
    reasoning,
    sourceSummary: "Built from Conversation, Identity, Cognitive, Executive, and Health context.",
    updatedAt: new Date().toISOString(),
  };
}

function getLatestAdaptiveIntelligence() {
  return buildAdaptiveIntelligence({
    conversationContext: currentConversationContext,
    replyPlan: currentReplyPlan,
    profile: personalityProfile,
    relationship: relationshipProfile,
    resonance: getLatestEmotionalResonance(),
    identity: getLatestIdentityProfile(),
    cognitive: getLatestCognitiveState(),
    intent: getLatestIntentState(),
    taskPlan: getLatestTaskPlanState(),
    workflow: getLatestWorkflowState(),
    executionDecision: getLatestExecutionDecision(),
    execution: getLatestExecutionState(),
    feedback: getLatestExecutionFeedback(),
    health: getLatestHealthState(),
    healthInsight: buildHealthInsight(getRecentHealthStates()),
    healthTrend: getLatestHealthTrend(),
    healthContext: getLatestHealthContext(),
    healthAwareConversation: getLatestHealthAwareConversation(),
    healthAwareRecommendation: getLatestHealthAwareRecommendation(),
    executiveSummary: buildExecutiveSummary(),
    recovery: getLatestConversationRecovery(),
  });
}

const ADAPTIVE_INTELLIGENCE_UI_LABELS = {
  steady: "安定",
  focused: "集中",
  careful: "慎重",
  recovery_support: "回復寄り",
  gentle_contextual: "やさしく文脈重視",
  small_step: "小さな一歩",
  maintain_momentum: "流れを保つ",
  keep_current: "現在の方針を維持",
  review_before_action: "実行前に確認",
  manual_confirm: "手動確認",
  observe: "観察",
  high: "高め",
  medium: "中くらい",
  normal: "通常",
  current_context: "現在の文脈",
};

function adaptiveIntelligenceUiValue(value) {
  return ADAPTIVE_INTELLIGENCE_UI_LABELS[value] || value || "-";
}

function adaptiveIntelligenceUiText(value) {
  return String(value || "-")
    .replace(/Built from Conversation, Identity, Cognitive, Executive, and Health context\./g, "Conversation / Identity / Cognitive / Executive / Health の文脈から作成。")
    .replace(/executive:([a-z_]+)/g, (_, label) => `Executive: ${adaptiveIntelligenceUiValue(label)}`)
    .replace(/cognitive:([a-z_]+)/g, (_, label) => `Cognitive: ${adaptiveIntelligenceUiValue(label)}`)
    .replace(/capacity:([a-z_]+)/g, (_, label) => `行動しやすさ: ${healthUiValue(label)}`)
    .replace(/recovery:([a-z_]+)/g, (_, label) => `回復状態: ${healthUiValue(label)}`)
    .replace(/momentum:([a-z_]+)/g, (_, label) => `回復の流れ: ${healthTrendUiValue(label)}`)
    .replace(/feedback:([a-z_]+)/g, (_, label) => `Feedback: ${adaptiveIntelligenceUiValue(label)}`);
}

function renderAdaptiveIntelligence(adaptiveIntelligence = getLatestAdaptiveIntelligence()) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#adaptiveMode", adaptiveIntelligenceUiValue(adaptiveIntelligence.adaptiveMode));
  setText("#adaptiveResponseStyle", adaptiveIntelligenceUiValue(adaptiveIntelligence.responseStyle));
  setText("#adaptiveRecommendationBias", adaptiveIntelligenceUiValue(adaptiveIntelligence.recommendationBias));
  setText("#adaptiveExecutionBias", adaptiveIntelligenceUiValue(adaptiveIntelligence.executionBias));
  setText("#adaptiveRiskSensitivity", adaptiveIntelligenceUiValue(adaptiveIntelligence.riskSensitivity));
  setText("#adaptiveSupportLevel", adaptiveIntelligenceUiValue(adaptiveIntelligence.supportLevel));
  setText("#adaptiveAttentionTarget", adaptiveIntelligenceUiText(adaptiveIntelligence.attentionTarget));
  setText("#adaptiveReasoning", adaptiveIntelligenceUiText(adaptiveIntelligence.reasoning));
  setText("#adaptiveSourceSummary", adaptiveIntelligenceUiText(adaptiveIntelligence.sourceSummary));
}

const HEALTH_UI_VALUE_LABELS = {
  unknown: "わからない",
  poor: "かなり悪い",
  light: "少し悪い",
  okay: "普通",
  good: "良い",
  deep: "とても良い",
  depleted: "かなり消耗している",
  low: "低い",
  neutral: "普通",
  recovered: "回復している",
  refreshed: "すっきりしている",
  satisfied: "満足している",
  too_much: "多すぎた",
  taken: "飲んだ",
  skipped: "飲まなかった",
  partial: "一部のみ",
  not_applicable: "該当なし",
  very_low: "かなり低い",
  medium: "普通",
  high: "高い",
  unstable: "不安定",
  overwhelming: "圧倒される",
  calm: "落ち着いている",
  flat: "平坦",
  anxious: "不安",
  sad: "悲しい",
  hopeful: "前向き",
  irritated: "いらいら",
  mixed: "混ざっている",
  needs_recovery: "回復を優先したい状態",
  steady: "安定",
  normal: "通常",
  normal_or_light: "通常から軽め",
  smaller_or_flexible: "小さめ・調整しやすい",
  gentle: "やさしめ",
  low_key: "控えめ",
  normal_or_steady: "通常・安定",
  no_immediate_health_context_risk: "大きな注意点は見えていません",
};

const HEALTH_UI_TOKEN_LABELS = {
  energy_very_low: "エネルギーがかなり低い",
  energy_low: "エネルギーが低い",
  energy_unstable: "エネルギーが不安定",
  recovery_depleted: "回復感がかなり低い",
  recovery_low: "回復感が低い",
  stress_high: "ストレスが高い",
  stress_overwhelming: "ストレスが強い",
};

const HEALTH_TREND_UI_LABELS = {
  improving: "改善傾向",
  declining: "低下傾向",
  stable: "安定",
  mixed: "ばらつきあり",
  insufficient_data: "記録がまだ少ない",
};

function healthUiValue(value) {
  return HEALTH_UI_VALUE_LABELS[value] || HEALTH_UI_TOKEN_LABELS[value] || value || "-";
}

function healthTrendUiValue(value) {
  return HEALTH_TREND_UI_LABELS[value] || healthUiValue(value);
}

function healthUiRisk(value) {
  if (!value) return "-";
  return String(value)
    .split(" / ")
    .map((part) => healthUiValue(part))
    .join(" / ");
}

function buildHealthSummaryUi(health) {
  if (!health) return "ヘルスチェックはまだ記録されていません。";
  return [
    health.sleepHours ? `睡眠 ${health.sleepHours}時間` : "",
    health.sleepQuality && health.sleepQuality !== "unknown" ? `睡眠の質 ${healthUiValue(health.sleepQuality)}` : "",
    health.recoveryFeeling && health.recoveryFeeling !== "unknown" ? `回復感 ${healthUiValue(health.recoveryFeeling)}` : "",
    health.nutritionSatisfaction && health.nutritionSatisfaction !== "unknown" ? `食事 ${healthUiValue(health.nutritionSatisfaction)}` : "",
    health.medicationStatus && health.medicationStatus !== "unknown" ? `服薬状況 ${healthUiValue(health.medicationStatus)}` : "",
    health.energyLevel ? `エネルギー ${healthUiValue(health.energyLevel)}` : "",
    health.mood ? `気分 ${healthUiValue(health.mood)}` : "",
    health.stressLevel && health.stressLevel !== "unknown" ? `ストレス ${healthUiValue(health.stressLevel)}` : "",
    health.bodyNote || "",
  ].filter(Boolean).join(" / ") || "ヘルスチェックは大きな偏りがありません。";
}

function localizeHealthUiText(value) {
  if (!value) return "-";
  const text = String(value);
  const exact = {
    "No recent Health Check records yet.": "最近のヘルスチェック記録はまだありません。",
    "No recent energy trend yet.": "最近のエネルギー傾向はまだありません。",
    "Sleep and recovery can be reviewed after a few records.": "記録が少し増えると、睡眠と回復の関係を振り返れます。",
    "Nutrition satisfaction can be reviewed after a few records.": "記録が少し増えると、食事の満足感を振り返れます。",
    "Stress and mood can be reviewed after a few records.": "記録が少し増えると、ストレスと気分を振り返れます。",
    "Health Insight will appear after Health Check records are added.": "ヘルスチェックを記録すると、気づきが表示されます。",
    "Sleep entries are still limited, so the recovery relationship is not visible yet.": "睡眠の記録がまだ少ないため、回復との関係はまだ見えにくいです。",
    "Nutrition satisfaction is not visible yet.": "食事の満足感はまだ見えにくいです。",
    "Recent records suggest smaller, flexible actions may fit better today.": "最近の記録では、今日は小さく調整しやすい行動が合うかもしれません。",
    "Recent records suggest normal action size may be usable as context.": "最近の記録では、通常の行動サイズも参考にできそうです。",
    "Recent records suggest starting with a softer check-in may fit.": "最近の記録では、やさしい確認から始めると合うかもしれません。",
    "Recent records suggest a steady opening may fit.": "最近の記録では、落ち着いた始め方が合いそうです。",
    "Use this only as conversation context, not as medical judgment.": "会話の参考情報として扱い、医療判断としては扱いません。",
    "Prefer gentle wording and flexible next steps.": "やさしい言葉づかいと、調整しやすい次の一歩を優先します。",
    "Keep the reply steady while leaving room to adjust.": "返答は落ち着かせつつ、調整できる余白を残します。",
    "Recent records suggest a smaller step may fit as supporting context.": "最近の記録では、小さめの一歩が合うかもしれない、という補助情報です。",
    "Recent records suggest the current recommendation can stay steady as supporting context.": "最近の記録では、現在の提案を落ち着いて進められそう、という補助情報です。",
    "Health Context can explain why approaching this recommendation lightly may be easier today.": "今日はこの提案を軽めに扱うと進めやすいかもしれない、という説明に使えます。",
    "Health Context does not add a strong constraint to this recommendation.": "ヘルスコンテキスト上、この提案に強い制約は加えていません。",
    "Reference context only; this is not medical judgment or instruction.": "参考情報のみです。医療判断や指示ではありません。",
    "Health Check is not recorded yet.": "ヘルスチェックはまだ記録されていません。",
    "Health Check is neutral.": "ヘルスチェックは大きな偏りがありません。",
  };
  if (exact[text]) return exact[text];
  return text
    .replace(/sleep ([0-9.]+)h/g, "睡眠 $1時間")
    .replace(/sleep ([a-z_]+)/g, (_, valueLabel) => `睡眠の質 ${healthUiValue(valueLabel)}`)
    .replace(/recovery ([a-z_]+)/g, (_, valueLabel) => `回復感 ${healthUiValue(valueLabel)}`)
    .replace(/nutrition ([a-z_]+)/g, (_, valueLabel) => `食事 ${healthUiValue(valueLabel)}`)
    .replace(/medication ([a-z_]+)/g, (_, valueLabel) => `服薬状況 ${healthUiValue(valueLabel)}`)
    .replace(/energy ([a-z_]+)/g, (_, valueLabel) => `エネルギー ${healthUiValue(valueLabel)}`)
    .replace(/mood ([a-z_]+)/g, (_, valueLabel) => `気分 ${healthUiValue(valueLabel)}`)
    .replace(/stress ([a-z_]+)/g, (_, valueLabel) => `ストレス ${healthUiValue(valueLabel)}`)
    .replace(/Recent records with sleep entries show recovery as ([a-z_]+)\. This may be useful context, not a cause\./g, (_, valueLabel) =>
      `睡眠の記録がある最近の記録では、回復感は「${healthUiValue(valueLabel)}」です。原因ではなく参考情報として扱います。`)
    .replace(/Recent energy is often ([a-z_]+), so smaller actions may fit the recent pattern\./g, (_, valueLabel) =>
      `最近のエネルギーは「${healthUiValue(valueLabel)}」が多めです。最近の傾向として、小さめの行動が合うかもしれません。`)
    .replace(/Recent energy is mostly ([a-z_]+)\./g, (_, valueLabel) =>
      `最近のエネルギーは「${healthUiValue(valueLabel)}」が多めです。`)
    .replace(/Recent nutrition satisfaction is often ([a-z_]+)\./g, (_, valueLabel) =>
      `最近の食事の満足感は「${healthUiValue(valueLabel)}」が多めです。`)
    .replace(/Recent mood is mostly ([a-z_]+)\. Stress records are still limited\./g, (_, valueLabel) =>
      `最近の気分は「${healthUiValue(valueLabel)}」が多めです。ストレスの記録はまだ少なめです。`)
    .replace(/Recent records show stress ([a-z_]+) and mood ([a-z_]+)\./g, (_, stress, mood) =>
      `最近の記録では、ストレスは「${healthUiValue(stress)}」、気分は「${healthUiValue(mood)}」です。`)
    .replace(/Recent Health Check records: (\d+)\./g, "最近のヘルスチェック記録: $1件。")
    .replace(/Recovery has been low in some sleep-related records\./g, "睡眠に関連する一部の記録で、回復感が低めです。")
    .replace(/Energy may be a useful context when choosing task size\./g, "行動サイズを考えるとき、エネルギーが参考になりそうです。")
    .replace(/This is a reflection aid, not a medical judgment\./g, "これは振り返り用の情報で、医療判断ではありません。")
    .replace(/Capacity context: ([a-z_]+)\./g, (_, valueLabel) => `行動しやすさ: ${healthUiValue(valueLabel)}。`)
    .replace(/Recovery status: ([a-z_]+)\./g, (_, valueLabel) => `回復状態: ${healthUiValue(valueLabel)}。`)
    .replace(/Useful context: ([a-z_ /]+)\./g, (_, valueLabel) => `参考になる注意点: ${healthUiRisk(valueLabel)}。`)
    .replace(/Recovery momentum: ([a-z_]+)\./g, (_, valueLabel) => `回復の流れ: ${healthTrendUiValue(valueLabel)}。`)
    .replace(/Health Check is not recorded yet\./g, "ヘルスチェックはまだ記録されていません。")
    .replace(/Health Check is neutral\./g, "ヘルスチェックは大きな偏りがありません。")
    .replace(/Built from Health State, Health Insight, and Health Trend\. ?/g, "ヘルス状態・ヘルスインサイト・ヘルストレンドから作成。")
    .replace(/Built from Health State and Health Insight\. ?/g, "ヘルス状態とヘルスインサイトから作成。")
    .replace(/Built from Health Context\. ?/g, "ヘルスコンテキストから作成。")
    .replace(/No strong health context\./g, "強い体調文脈はありません。")
    .replace(/Health Context supports how to approach (.*); it does not change the recommendation type, count, or ranking\./g, (_, label) =>
      `ヘルスコンテキストは「${label}」への取り組み方の参考です。提案の種類・件数・順位は変更しません。`);
}

function buildHealthSummary(health = getLatestHealthState()) {
  if (!health) {
    return {
      date: activeDate,
      healthContext: "Health Check is not recorded yet.",
      recoveryFeeling: "unknown",
      energyLevel: "medium",
      stressLevel: "unknown",
      risk: "",
    };
  }
  const healthContext = [
    health.sleepHours ? `sleep ${health.sleepHours}h` : "",
    health.sleepQuality && health.sleepQuality !== "unknown" ? `sleep ${health.sleepQuality}` : "",
    health.recoveryFeeling && health.recoveryFeeling !== "unknown" ? `recovery ${health.recoveryFeeling}` : "",
    health.nutritionSatisfaction && health.nutritionSatisfaction !== "unknown" ? `nutrition ${health.nutritionSatisfaction}` : "",
    health.medicationStatus && health.medicationStatus !== "unknown" ? `medication ${health.medicationStatus}` : "",
    health.energyLevel ? `energy ${health.energyLevel}` : "",
    health.mood ? `mood ${health.mood}` : "",
    health.stressLevel && health.stressLevel !== "unknown" ? `stress ${health.stressLevel}` : "",
    health.bodyNote || "",
  ].filter(Boolean).join(" / ") || "Health Check is neutral.";
  const risk = [
    ["depleted", "low"].includes(health.recoveryFeeling) ? "Recovery is low." : "",
    ["very_low", "low", "unstable"].includes(health.energyLevel) ? "Energy may limit action size." : "",
    ["high", "overwhelming"].includes(health.stressLevel) ? "Stress is elevated." : "",
    health.medicationStatus === "skipped" ? "Medication status is skipped." : "",
  ].filter(Boolean).join(" ");
  return {
    date: health.date || activeDate,
    healthContext,
    recoveryFeeling: health.recoveryFeeling || "unknown",
    energyLevel: health.energyLevel || "medium",
    stressLevel: health.stressLevel || "unknown",
    risk,
  };
}

function upsertHealthState(updates = {}) {
  const now = new Date().toISOString();
  let entry = healthState.find((item) => item.date === activeDate);
  if (!entry) {
    entry = {
      id: crypto.randomUUID(),
      date: activeDate,
      sleepHours: "",
      sleepQuality: "unknown",
      recoveryFeeling: "unknown",
      nutritionSatisfaction: "unknown",
      medicationStatus: "unknown",
      energyLevel: "medium",
      mood: "mixed",
      stressLevel: "unknown",
      bodyNote: "",
      healthSummary: "",
      createdAt: now,
      updatedAt: now,
    };
    healthState.unshift(entry);
  }
  Object.assign(entry, updates);
  entry.date = activeDate;
  entry.healthSummary = buildHealthSummary(entry).healthContext;
  entry.updatedAt = now;
  saveHealthState();
  return entry;
}

function renderHealthState() {
  const health = healthState.find((item) => item.date === activeDate) || null;
  const setValue = (selector, value) => {
    const target = $(selector);
    if (!target) return;
    if (target.value !== (value || "")) target.value = value || "";
  };
  setValue("#healthSleepHours", health?.sleepHours);
  setValue("#healthSleepQuality", health?.sleepQuality || "unknown");
  setValue("#healthRecoveryFeeling", health?.recoveryFeeling || "unknown");
  setValue("#healthNutritionSatisfaction", health?.nutritionSatisfaction || "unknown");
  setValue("#healthMedicationStatus", health?.medicationStatus || "unknown");
  setValue("#healthEnergyLevel", health?.energyLevel || "medium");
  setValue("#healthMood", health?.mood || "mixed");
  setValue("#healthStressLevel", health?.stressLevel || "unknown");
  setValue("#healthBodyNote", health?.bodyNote);
  const status = $("#healthStateStatus");
  if (status) {
    status.textContent = health?.updatedAt
      ? "体調チェックを保存し、今日の提案・体調をふまえた提案・さくらの返答の補助情報に反映しました。"
      : "今日の体調メモを記録できます。保存後、今日の提案・さくらの返答の補助情報になります。";
  }
  const summaryTarget = $("#healthStateSummary");
  if (summaryTarget) summaryTarget.textContent = buildHealthSummaryUi(health);
}

function getRecentHealthStates(limit = 7) {
  return [...asArray(healthState)]
    .sort((a, b) =>
      String(b.date || b.updatedAt || b.createdAt).localeCompare(String(a.date || a.updatedAt || a.createdAt)),
    )
    .slice(0, limit);
}

function mostCommonHealthValue(items, key, fallback = "unknown") {
  const counts = new Map();
  asArray(items).forEach((item) => {
    const value = item?.[key];
    if (!value || value === "unknown") return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || fallback;
}

function buildHealthInsight(healthItems = getRecentHealthStates()) {
  const items = asArray(healthItems).filter(Boolean);
  const latest = items[0] || null;
  const recordCount = items.length;
  if (!recordCount) {
    return {
      date: activeDate,
      recordCount: 0,
      recentRecovery: "No recent Health Check records yet.",
      recentEnergyTrend: "No recent energy trend yet.",
      sleepRecoveryNote: "Sleep and recovery can be reviewed after a few records.",
      nutritionTrend: "Nutrition satisfaction can be reviewed after a few records.",
      stressMoodNote: "Stress and mood can be reviewed after a few records.",
      insightText: "Health Insight will appear after Health Check records are added.",
      updatedAt: new Date().toISOString(),
    };
  }

  const recentRecovery = mostCommonHealthValue(items, "recoveryFeeling");
  const recentEnergy = mostCommonHealthValue(items, "energyLevel", "medium");
  const recentNutrition = mostCommonHealthValue(items, "nutritionSatisfaction");
  const recentStress = mostCommonHealthValue(items, "stressLevel");
  const recentMood = mostCommonHealthValue(items, "mood", "mixed");
  const sleepItems = items.filter((item) => item.sleepHours || (item.sleepQuality && item.sleepQuality !== "unknown"));
  const lowRecoveryWithSleep = sleepItems.filter((item) => ["depleted", "low"].includes(item.recoveryFeeling)).length;
  const sleepRecoveryNote = sleepItems.length
    ? `Recent records with sleep entries show recovery as ${recentRecovery}. This may be useful context, not a cause.`
    : "Sleep entries are still limited, so the recovery relationship is not visible yet.";
  const energyLowCount = items.filter((item) => ["very_low", "low", "unstable"].includes(item.energyLevel)).length;
  const recentEnergyTrend = energyLowCount >= Math.ceil(recordCount / 2)
    ? `Recent energy is often ${recentEnergy}, so smaller actions may fit the recent pattern.`
    : `Recent energy is mostly ${recentEnergy}.`;
  const nutritionTrend = recentNutrition === "unknown"
    ? "Nutrition satisfaction is not visible yet."
    : `Recent nutrition satisfaction is often ${recentNutrition}.`;
  const stressMoodNote = recentStress === "unknown"
    ? `Recent mood is mostly ${recentMood}. Stress records are still limited.`
    : `Recent records show stress ${recentStress} and mood ${recentMood}.`;
  const insightText = [
    `Recent Health Check records: ${recordCount}.`,
    lowRecoveryWithSleep ? "Recovery has been low in some sleep-related records." : "",
    energyLowCount ? "Energy may be a useful context when choosing task size." : "",
    "This is a reflection aid, not a medical judgment.",
  ].filter(Boolean).join(" ");

  return {
    date: latest?.date || activeDate,
    recordCount,
    recentRecovery,
    recentEnergyTrend,
    sleepRecoveryNote,
    nutritionTrend,
    stressMoodNote,
    insightText,
    updatedAt: new Date().toISOString(),
  };
}

function renderHealthInsight() {
  const insight = buildHealthInsight(getRecentHealthStates());
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#healthInsightRecovery", healthUiValue(insight.recentRecovery));
  setText("#healthInsightEnergyTrend", localizeHealthUiText(insight.recentEnergyTrend));
  setText("#healthInsightSleepRecovery", localizeHealthUiText(insight.sleepRecoveryNote));
  setText("#healthInsightNutrition", localizeHealthUiText(insight.nutritionTrend));
  setText("#healthInsightStressMood", localizeHealthUiText(insight.stressMoodNote));
  setText("#healthInsightText", localizeHealthUiText(insight.insightText));
}

function getRecentHealthTrendStates(limit = 14) {
  return getRecentHealthStates(limit);
}

const HEALTH_TREND_SCORE_MAPS = {
  recoveryFeeling: {
    depleted: 1,
    low: 2,
    neutral: 3,
    recovered: 4,
    refreshed: 5,
  },
  sleepQuality: {
    poor: 1,
    light: 2,
    okay: 3,
    good: 4,
    deep: 5,
  },
  energyLevel: {
    very_low: 1,
    low: 2,
    medium: 3,
    high: 4,
    unstable: 2,
  },
  stressLevel: {
    low: 1,
    medium: 2,
    high: 3,
    overwhelming: 4,
  },
};

function averageHealthScore(items, key, scoreMap) {
  const scores = asArray(items)
    .map((item) => scoreMap[item?.[key]])
    .filter((score) => Number.isFinite(score));
  if (!scores.length) return null;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function averageSleepScore(items) {
  const scores = asArray(items).flatMap((item) => {
    const values = [];
    const sleepHours = Number.parseFloat(item?.sleepHours);
    if (Number.isFinite(sleepHours)) {
      values.push(Math.max(1, Math.min(5, sleepHours / 2)));
    }
    const qualityScore = HEALTH_TREND_SCORE_MAPS.sleepQuality[item?.sleepQuality];
    if (Number.isFinite(qualityScore)) values.push(qualityScore);
    return values;
  });
  if (!scores.length) return null;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function compareHealthTrendScores(recentScore, previousScore, { lowerIsBetter = false } = {}) {
  if (!Number.isFinite(recentScore) || !Number.isFinite(previousScore)) return "insufficient_data";
  const delta = recentScore - previousScore;
  if (Math.abs(delta) < 0.35) return "stable";
  const positiveTrend = lowerIsBetter ? delta < 0 : delta > 0;
  return positiveTrend ? "improving" : "declining";
}

function buildWindowedHealthTrend(items, scoreBuilder, options = {}) {
  if (items.length < 3) return "insufficient_data";
  const windowSize = Math.ceil(items.length / 2);
  const recentItems = items.slice(0, windowSize);
  const previousItems = items.slice(windowSize);
  if (recentItems.length < 2 || previousItems.length < 1) return "insufficient_data";
  const recentScore = scoreBuilder(recentItems);
  const previousScore = scoreBuilder(previousItems);
  return compareHealthTrendScores(recentScore, previousScore, options);
}

function buildHealthTrend(healthItems = getRecentHealthTrendStates()) {
  const items = asArray(healthItems).filter(Boolean);
  const latest = items[0] || null;
  const recordCount = items.length;
  const windowDays = 14;
  if (recordCount < 3) {
    return {
      date: latest?.date || activeDate,
      recordCount,
      windowDays,
      recoveryTrend: "insufficient_data",
      sleepTrend: "insufficient_data",
      energyTrend: "insufficient_data",
      stressTrend: "insufficient_data",
      recoveryMomentum: "insufficient_data",
      trendSummary: "insufficient_data",
      recoveryMemory: "Recent Health Check records are still limited.",
      updatedAt: new Date().toISOString(),
    };
  }

  const recoveryTrend = buildWindowedHealthTrend(
    items,
    (windowItems) => averageHealthScore(windowItems, "recoveryFeeling", HEALTH_TREND_SCORE_MAPS.recoveryFeeling),
  );
  const sleepTrend = buildWindowedHealthTrend(items, averageSleepScore);
  const energyTrend = buildWindowedHealthTrend(
    items,
    (windowItems) => averageHealthScore(windowItems, "energyLevel", HEALTH_TREND_SCORE_MAPS.energyLevel),
  );
  const stressTrend = buildWindowedHealthTrend(
    items,
    (windowItems) => averageHealthScore(windowItems, "stressLevel", HEALTH_TREND_SCORE_MAPS.stressLevel),
    { lowerIsBetter: true },
  );
  const recoveryMomentum = recoveryTrend === "improving" && energyTrend !== "declining"
    ? "improving"
    : recoveryTrend === "declining" || energyTrend === "declining"
      ? "declining"
      : recoveryTrend === "insufficient_data"
        ? "insufficient_data"
        : "stable";
  const trendSummary = [
    `recovery:${recoveryTrend}`,
    `sleep:${sleepTrend}`,
    `energy:${energyTrend}`,
    `stress:${stressTrend}`,
  ].join(" / ");
  const recoveryMemory = recoveryMomentum === "declining"
    ? "Recent records suggest recovery momentum may be lower; use this only as context."
    : recoveryMomentum === "improving"
      ? "Recent records suggest recovery momentum may be improving; use this only as context."
      : "Recent records suggest recovery momentum is mostly stable or mixed.";

  return {
    date: latest?.date || activeDate,
    recordCount,
    windowDays,
    recoveryTrend,
    sleepTrend,
    energyTrend,
    stressTrend,
    recoveryMomentum,
    trendSummary,
    recoveryMemory,
    updatedAt: new Date().toISOString(),
  };
}

function getLatestHealthTrend() {
  return buildHealthTrend(getRecentHealthTrendStates());
}

function healthTrendMemoryUi(value) {
  const exact = {
    "Recent Health Check records are still limited.": "最近のヘルスチェック記録はまだ少なめです。",
    "Recent records suggest recovery momentum may be lower; use this only as context.": "最近の記録では、回復の流れが少し下がっている可能性があります。参考情報として扱います。",
    "Recent records suggest recovery momentum may be improving; use this only as context.": "最近の記録では、回復の流れが少し上向いている可能性があります。参考情報として扱います。",
    "Recent records suggest recovery momentum is mostly stable or mixed.": "最近の記録では、回復の流れは安定またはばらつきがあります。",
  };
  return exact[value] || value || "-";
}

function renderHealthTrend() {
  const trend = getLatestHealthTrend();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#healthTrendRecovery", healthTrendUiValue(trend.recoveryTrend));
  setText("#healthTrendSleep", healthTrendUiValue(trend.sleepTrend));
  setText("#healthTrendEnergy", healthTrendUiValue(trend.energyTrend));
  setText("#healthTrendStress", healthTrendUiValue(trend.stressTrend));
  setText("#healthTrendMomentum", healthTrendUiValue(trend.recoveryMomentum));
  setText("#healthTrendMemory", healthTrendMemoryUi(trend.recoveryMemory));
}

function buildHealthContext(
  health = getLatestHealthState(),
  healthInsight = buildHealthInsight(getRecentHealthStates()),
  healthTrend = getLatestHealthTrend(),
) {
  const summary = buildHealthSummary(health);
  const recovery = health?.recoveryFeeling || healthInsight?.recentRecovery || "unknown";
  const energy = health?.energyLevel || "medium";
  const stress = health?.stressLevel || "unknown";
  const capacity = ["very_low", "low"].includes(energy) || ["depleted", "low"].includes(recovery)
    ? "low"
    : energy === "unstable"
      ? "unstable"
      : energy === "high" && ["recovered", "refreshed"].includes(recovery)
        ? "high"
        : "medium";
  const recoveryStatus = ["depleted", "low"].includes(recovery)
    ? "needs_recovery"
    : ["recovered", "refreshed"].includes(recovery)
      ? "recovered"
      : recovery === "unknown"
        ? "unknown"
        : "steady";
  const riskParts = [
    ["very_low", "low", "unstable"].includes(energy) ? `energy_${energy}` : "",
    ["depleted", "low"].includes(recovery) ? `recovery_${recovery}` : "",
    ["high", "overwhelming"].includes(stress) ? `stress_${stress}` : "",
  ].filter(Boolean);
  const currentRisk = riskParts.join(" / ") || "no_immediate_health_context_risk";
  const trendContext = healthTrend?.recoveryMomentum && healthTrend.recoveryMomentum !== "insufficient_data"
    ? `Recovery momentum: ${healthTrend.recoveryMomentum}.`
    : "";
  const recommendationContext = [
    capacity === "low" || capacity === "unstable"
      ? "Recent records suggest smaller, flexible actions may fit better today."
      : "Recent records suggest normal action size may be usable as context.",
    trendContext,
  ].filter(Boolean).join(" ");
  const executiveNote = [
    `Capacity context: ${capacity}.`,
    `Recovery status: ${recoveryStatus}.`,
    trendContext,
    riskParts.length ? `Useful context: ${currentRisk}.` : "",
  ].filter(Boolean).join(" ");

  return {
    date: health?.date || healthInsight?.date || activeDate,
    currentCapacity: capacity,
    recoveryStatus,
    currentRisk,
    recommendationContext,
    executiveNote,
    sourceSummary: `Built from Health State, Health Insight, and Health Trend. ${summary.healthContext}`,
    updatedAt: new Date().toISOString(),
  };
}

function getLatestHealthContext() {
  return buildHealthContext(getLatestHealthState(), buildHealthInsight(getRecentHealthStates()), getLatestHealthTrend());
}

function renderHealthContext() {
  const context = getLatestHealthContext();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#healthContextCapacity", healthUiValue(context.currentCapacity));
  setText("#healthContextRecovery", healthUiValue(context.recoveryStatus));
  setText("#healthContextRisk", healthUiRisk(context.currentRisk));
  setText("#healthContextRecommendation", localizeHealthUiText(context.recommendationContext));
  setText("#healthContextExecutiveNote", localizeHealthUiText(context.executiveNote));
  setText("#healthContextSource", localizeHealthUiText(context.sourceSummary));
}

function buildHealthAwareConversation(healthContext = getLatestHealthContext()) {
  const capacity = healthContext?.currentCapacity || "medium";
  const recovery = healthContext?.recoveryStatus || "unknown";
  const risk = healthContext?.currentRisk || "";
  const lowCapacity = ["low", "unstable"].includes(capacity);
  const needsRecovery = recovery === "needs_recovery";
  const conversationTone = lowCapacity || needsRecovery ? "gentle" : "steady";
  const openingHint = lowCapacity || needsRecovery
    ? "Recent records suggest starting with a softer check-in may fit."
    : "Recent records suggest a steady opening may fit.";
  const supportHint = lowCapacity || needsRecovery
    ? "最近の記録では、小さめの一歩が合うかもしれません。"
    : "最近の記録では、通常の一歩を無理なく扱えそうです。";
  const cautionNote = "Use this only as conversation context, not as medical judgment.";
  const replyAdjustment = lowCapacity || needsRecovery
    ? "Prefer gentle wording and flexible next steps."
    : "Keep the reply steady while leaving room to adjust.";

  return {
    date: healthContext?.date || activeDate,
    conversationTone,
    openingHint,
    supportHint,
    cautionNote,
    replyAdjustment,
    sourceSummary: `Built from Health Context. ${healthContext?.executiveNote || risk || "No strong health context."}`,
    updatedAt: new Date().toISOString(),
  };
}

function getLatestHealthAwareConversation() {
  return buildHealthAwareConversation(getLatestHealthContext());
}

function renderHealthAwareConversation() {
  const healthAware = getLatestHealthAwareConversation();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#healthAwareConversationTone", healthUiValue(healthAware.conversationTone));
  setText("#healthAwareOpeningHint", localizeHealthUiText(healthAware.openingHint));
  setText("#healthAwareSupportHint", localizeHealthUiText(healthAware.supportHint));
  setText("#healthAwareCautionNote", localizeHealthUiText(healthAware.cautionNote));
  setText("#healthAwareReplyAdjustment", localizeHealthUiText(healthAware.replyAdjustment));
  setText("#healthAwareSourceSummary", localizeHealthUiText(healthAware.sourceSummary));
}

function buildHealthAwareRecommendation(recommendation = null, healthContext = getLatestHealthContext()) {
  const capacity = healthContext?.currentCapacity || "medium";
  const recovery = healthContext?.recoveryStatus || "unknown";
  const lowCapacity = ["low", "unstable"].includes(capacity);
  const needsRecovery = recovery === "needs_recovery";
  const recommendationLabel = recommendation?.title || recommendation?.type || "this recommendation";
  const actionSizeHint = lowCapacity || needsRecovery
    ? "smaller_or_flexible"
    : capacity === "high"
      ? "normal"
      : "normal_or_light";
  const recommendationSupport = lowCapacity || needsRecovery
    ? "Recent records suggest a smaller step may fit as supporting context."
    : "Recent records suggest the current recommendation can stay steady as supporting context.";
  const priorityReason = lowCapacity || needsRecovery
    ? "Health Context can explain why approaching this recommendation lightly may be easier today."
    : "Health Context does not add a strong constraint to this recommendation.";
  const cautionNote = "Reference context only; this is not medical judgment or instruction.";
  const explanationHint = `Health Context supports how to approach ${recommendationLabel}; it does not change the recommendation type, count, or ranking.`;
  const sourceSummary = `Built from Health Context. ${healthContext?.recommendationContext || healthContext?.executiveNote || "No strong health context."}`;

  return {
    date: healthContext?.date || activeDate,
    recommendationSupport,
    priorityReason,
    actionSizeHint,
    cautionNote,
    explanationHint,
    sourceSummary,
    updatedAt: new Date().toISOString(),
  };
}

function getLatestHealthAwareRecommendation(recommendation = currentRecommendation) {
  return buildHealthAwareRecommendation(recommendation, getLatestHealthContext());
}

function renderHealthAwareRecommendation(healthAwareRecommendation = getLatestHealthAwareRecommendation()) {
  currentHealthAwareRecommendation = healthAwareRecommendation;
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#healthAwareRecommendationActionSize", healthUiValue(healthAwareRecommendation.actionSizeHint));
  setText("#healthAwareRecommendationSupport", localizeHealthUiText(healthAwareRecommendation.recommendationSupport));
  setText("#healthAwareRecommendationPriority", localizeHealthUiText(healthAwareRecommendation.priorityReason));
  setText("#healthAwareRecommendationCaution", localizeHealthUiText(healthAwareRecommendation.cautionNote));
}

function findConversationFeedback(replyText) {
  return conversationFeedback.find((entry) =>
    entry.date === activeDate &&
    entry.replyText === replyText,
  ) || null;
}

function upsertConversationFeedback(replyText, updates = {}) {
  const text = replySentence(replyText);
  if (!text) return null;
  const now = new Date().toISOString();
  let entry = findConversationFeedback(text);
  if (entry) {
    entry.date = activeDate;
    entry.replyText = text;
    if ("natural" in updates) entry.natural = updates.natural;
    if ("note" in updates) entry.note = updates.note;
    entry.updatedAt = now;
  } else {
    entry = {
      id: crypto.randomUUID(),
      date: activeDate,
      replyText: text,
      natural: "natural" in updates ? updates.natural : null,
      note: "note" in updates ? updates.note : "",
      createdAt: now,
      updatedAt: now,
    };
    conversationFeedback.unshift(entry);
  }
  saveConversationFeedback();
  return entry;
}

function buildConversationImprovementHint(feedback) {
  if (!feedback) return "";
  const note = replySentence(feedback.note);
  if (feedback.natural === true) {
    return note
      ? `自然だった返答として記録されています。次回も同じ調子を保ちつつ、メモ「${note}」を表現の参考にします。`
      : "自然だった返答として記録されています。次回も同じ調子、長さ、やわらかさを保ちます。";
  }
  if (feedback.natural === false) {
    return note
      ? `違和感があった返答として記録されています。次回はメモ「${note}」を避ける方向の手がかりにします。`
      : "違和感があった返答として記録されています。次回は言い切りを弱め、より自然なつながりに整えます。";
  }
  return note
    ? `返答へのメモ「${note}」があります。次回の表現調整の参考にします。`
    : "";
}

function upsertConversationImprovement(feedback) {
  const hint = buildConversationImprovementHint(feedback);
  if (!feedback?.id || !hint) return null;
  const now = new Date().toISOString();
  let improvement = conversationImprovements.find((entry) => entry.feedbackId === feedback.id);
  if (improvement) {
    improvement.date = feedback.date;
    improvement.replyText = feedback.replyText;
    improvement.natural = feedback.natural;
    improvement.note = feedback.note || "";
    improvement.hint = hint;
    improvement.updatedAt = now;
  } else {
    improvement = {
      id: crypto.randomUUID(),
      feedbackId: feedback.id,
      date: feedback.date,
      replyText: feedback.replyText,
      natural: feedback.natural,
      note: feedback.note || "",
      hint,
      createdAt: now,
      updatedAt: now,
    };
    conversationImprovements.unshift(improvement);
  }
  saveConversationImprovements();
  return improvement;
}

function renderConversationImprovementHints() {
  const target = $("#conversationImprovementHints");
  if (!target) return;
  appendBrainItems(target, getRecentConversationImprovementHints(3), "改善ヒントはまだありません。");
}

function buildConversationReflection(context = {}, feedbacks = [], improvements = []) {
  const latestFeedback = [...asArray(feedbacks)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
  const latestImprovement = [...asArray(improvements)]
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))[0] || null;
  const recommendationLabel = context?.recommendation?.title || context?.recommendation?.type || "生成された返答";
  const feedbackLabel = latestFeedback?.natural === true
    ? "自然"
    : latestFeedback?.natural === false
      ? "違和感あり"
      : "未評価";
  const summary = `${recommendationLabel} への返答は「${feedbackLabel}」として振り返られています。`;
  const tone = latestFeedback?.natural === false
    ? "softer"
    : latestFeedback?.natural === true
      ? "natural"
      : "observing";
  const userNeed = replySentence(latestFeedback?.note) ||
    (latestFeedback?.natural === false ? "より自然で違和感の少ない返答" : "自然な返答の維持");
  const nextReplyHint = latestImprovement?.hint ||
    (latestFeedback?.natural === false
      ? "次回は言い切りを弱め、文のつながりをやわらかくします。"
      : latestFeedback?.natural === true
        ? "次回も同じ調子と長さを保ちます。"
        : "次回の返答後に自然さを確認します。");
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    summary,
    tone,
    userNeed,
    nextReplyHint,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertConversationReflection() {
  if (!currentReplyText && !currentConversationContext) return null;
  const relatedFeedbacks = conversationFeedback.filter((feedback) =>
    feedback.date === activeDate &&
    (!currentReplyText || feedback.replyText === currentReplyText),
  );
  const relatedImprovements = conversationImprovements.filter((improvement) =>
    improvement.date === activeDate &&
    (!currentReplyText || improvement.replyText === currentReplyText),
  );
  const built = buildConversationReflection(currentConversationContext || {}, relatedFeedbacks, relatedImprovements);
  const now = new Date().toISOString();
  let reflection = conversationReflections.find((entry) => entry.date === activeDate);
  if (reflection) {
    reflection.summary = built.summary;
    reflection.tone = built.tone;
    reflection.userNeed = built.userNeed;
    reflection.nextReplyHint = built.nextReplyHint;
    reflection.updatedAt = now;
  } else {
    reflection = built;
    conversationReflections.unshift(reflection);
  }
  saveConversationReflections();
  upsertGoalState();
  return reflection;
}

function renderConversationReflection() {
  const reflection = getLatestConversationReflection();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#conversationReflectionSummary", reflection?.summary);
  setText("#conversationReflectionTone", reflection?.tone);
  setText("#conversationReflectionUserNeed", reflection?.userNeed);
  setText("#conversationReflectionNextReplyHint", reflection?.nextReplyHint);
}

function buildConversationContinuityHint(context = {}, latestReflection = null, memories = []) {
  const memoryItems = asArray(memories);
  const relatedMemoryIds = memoryItems.map((memory) => memory?.id).filter(Boolean).slice(0, 3);
  const memoryTitle = memoryDisplayTitle(memoryItems[0]);
  const previousTopic = context?.recommendation?.title ||
    context?.recommendation?.type ||
    context?.project ||
    memoryTitle ||
    "生成された返答";
  const emotionalState = latestReflection?.tone || "observing";
  const unresolvedNeed = latestReflection?.userNeed ||
    (memoryTitle ? `前回の記憶「${memoryTitle}」を踏まえて自然につなげる` : "次回の会話を自然に始める");
  const nextOpeningHint = latestReflection?.nextReplyHint
    ? `前回は「${previousTopic}」について話しました。${latestReflection.nextReplyHint}`
    : memoryTitle
      ? `前回の「${previousTopic}」から入り、関連する記憶「${memoryTitle}」に軽く触れます。`
      : `前回の「${previousTopic}」から、短く自然に話をつなげます。`;
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    previousTopic,
    emotionalState,
    unresolvedNeed,
    nextOpeningHint,
    relatedMemoryIds,
    createdAt: now,
    updatedAt: now,
  };
}

function conversationContinuityMemories(context = currentConversationContext) {
  const memoryContext = context?.memoryContext || {};
  return [
    ...asArray(memoryContext.retrieved),
    ...asArray(memoryContext.recent),
  ].filter(Boolean);
}

function upsertConversationContinuity() {
  if (!currentConversationContext && !currentReplyText) return null;
  const latestReflection = getLatestConversationReflection();
  const built = buildConversationContinuityHint(
    currentConversationContext || {},
    latestReflection,
    conversationContinuityMemories(currentConversationContext),
  );
  const now = new Date().toISOString();
  let continuity = conversationContinuity.find((entry) => entry.date === activeDate);
  if (continuity) {
    continuity.previousTopic = built.previousTopic;
    continuity.emotionalState = built.emotionalState;
    continuity.unresolvedNeed = built.unresolvedNeed;
    continuity.nextOpeningHint = built.nextOpeningHint;
    continuity.relatedMemoryIds = built.relatedMemoryIds;
    continuity.updatedAt = now;
  } else {
    continuity = built;
    conversationContinuity.unshift(continuity);
  }
  saveConversationContinuity();
  return continuity;
}

function renderConversationContinuity() {
  const continuity = getLatestConversationContinuity();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#conversationContinuityPreviousTopic", continuity?.previousTopic);
  setText("#conversationContinuityEmotionalState", continuity?.emotionalState);
  setText("#conversationContinuityUnresolvedNeed", continuity?.unresolvedNeed);
  setText("#conversationContinuityNextOpeningHint", continuity?.nextOpeningHint);
  setText("#conversationContinuityMemoryIds", asArray(continuity?.relatedMemoryIds).join(" / "));
}

function buildConversationRecovery(context = {}, latestReflection = null, latestContinuity = null, replyPlan = {}) {
  const uncertaintyText = replySentence(replyPlan.uncertainty);
  const hasLowConfidence = /Confidence [0-5]?\d%|まだ|学習途中|控えめ/.test(uncertaintyText);
  const needsSofterTone = latestReflection?.tone === "softer" || latestContinuity?.emotionalState === "softer";
  const hasUnresolvedNeed = Boolean(replySentence(latestContinuity?.unresolvedNeed || latestReflection?.userNeed));
  const hasTopicGap = !context?.recommendation?.title && !context?.recommendation?.type && !context?.project;
  let trigger = "stable";
  let detectedIssue = "大きな立て直しは不要です。";
  let recoveryStrategy = "前回の流れを保ちながら、短く自然に続けます。";
  if (hasLowConfidence) {
    trigger = "low_confidence";
    detectedIssue = "AIの確信度が低く、断定すると噛み合わない可能性があります。";
    recoveryStrategy = "まず確認を挟み、提案を控えめにします。";
  } else if (needsSofterTone) {
    trigger = "tone_mismatch";
    detectedIssue = "前回の返答に違和感があり、調子をやわらげる必要があります。";
    recoveryStrategy = "前回の違和感を踏まえ、言い切りを弱めて始めます。";
  } else if (hasUnresolvedNeed) {
    trigger = "unresolved_need";
    detectedIssue = "前回から残っている必要やメモがあります。";
    recoveryStrategy = "未解決の必要を軽く受け止めてから次の話題に入ります。";
  } else if (hasTopicGap) {
    trigger = "unclear_topic";
    detectedIssue = "会話の目的や話題がまだ曖昧です。";
    recoveryStrategy = "話題を決めつけず、今見えていることを短く確認します。";
  }
  const topic = latestContinuity?.previousTopic || context?.recommendation?.title || context?.project || "前回の話";
  const suggestedOpening = trigger === "stable"
    ? `前回の「${topic}」の流れから、無理なく続けましょう。`
    : `前回の「${topic}」はいったん軽く確認してから進めましょう。`;
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    trigger,
    detectedIssue,
    recoveryStrategy,
    suggestedOpening,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertConversationRecovery() {
  if (!currentConversationContext && !currentReplyPlan) return null;
  const built = buildConversationRecovery(
    currentConversationContext || {},
    getLatestConversationReflection(),
    getLatestConversationContinuity(),
    currentReplyPlan || {},
  );
  const now = new Date().toISOString();
  let recovery = conversationRecovery.find((entry) => entry.date === activeDate);
  if (recovery) {
    recovery.trigger = built.trigger;
    recovery.detectedIssue = built.detectedIssue;
    recovery.recoveryStrategy = built.recoveryStrategy;
    recovery.suggestedOpening = built.suggestedOpening;
    recovery.updatedAt = now;
  } else {
    recovery = built;
    conversationRecovery.unshift(recovery);
  }
  saveConversationRecovery();
  return recovery;
}

function renderConversationRecovery() {
  const recovery = getLatestConversationRecovery();
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value || "-";
  };
  setText("#conversationRecoveryTrigger", recovery?.trigger);
  setText("#conversationRecoveryDetectedIssue", recovery?.detectedIssue);
  setText("#conversationRecoveryStrategy", recovery?.recoveryStrategy);
  setText("#conversationRecoverySuggestedOpening", recovery?.suggestedOpening);
}

function renderConversationFeedback(reply) {
  currentReplyText = replySentence(reply?.text);
  const entry = currentReplyText ? findConversationFeedback(currentReplyText) : null;
  const note = $("#conversationFeedbackNote");
  const status = $("#conversationFeedbackStatus");
  const saveButton = $("#saveConversationFeedbackNote");
  document.querySelectorAll("[data-conversation-feedback]").forEach((button) => {
    const value = button.dataset.conversationFeedback === "true";
    button.classList.toggle("active", entry?.natural === value);
    button.disabled = !currentReplyText;
  });
  if (note) {
    note.disabled = !currentReplyText;
    if (note.value !== (entry?.note || "")) {
      note.value = entry?.note || "";
    }
  }
  if (saveButton) saveButton.disabled = !currentReplyText;
  if (!status) return;
  if (!currentReplyText) {
    status.textContent = "生成された返答がまだありません。";
  } else if (entry?.natural === true) {
    status.textContent = "直前のさくらの返答は自然だった、と記録しました。";
  } else if (entry?.natural === false) {
    status.textContent = "直前のさくらの返答は違和感があった、と記録しました。";
  } else if (entry?.note) {
    status.textContent = "直前のさくらの返答へのメモを記録しました。";
  } else {
    status.textContent = "直前のさくらの返答の自然さを記録できます。";
  }
}

function refreshConversationFeedbackAnalysis(feedback) {
  upsertConversationImprovement(feedback);
  upsertConversationReflection();
  upsertEmotionalResonance();
  upsertConversationContinuity();
  upsertConversationRecovery();
  renderConversationFeedback({ text: currentReplyText });
  renderConversationImprovementHints();
  renderConversationReflection();
  renderEmotionalResonance();
  renderIdentityProfile();
  renderGoalState();
  renderPriorityState();
  renderDecisionState();
  renderStrategyState();
  renderAttentionState();
  renderCognitiveState();
  renderIntentState();
  renderTaskPlanState();
  renderWorkflowState();
  renderExecutionDecision();
  renderExecutionState();
  renderExecutionFeedback();
  renderExecutiveSummary();
  renderConversationContinuity();
  renderConversationRecovery();
}

function renderMemoryLayer(context = {}) {
  ensureProjectMemoryDefaultsSaved();
  const consolidation = buildMemoryConsolidation(memoryStore);
  const recent = memoryStore.shortMemory
    .filter((memory) => memory.date >= dateKeyDaysAgo(3))
    .sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)))
    .map((memory) => memory.title);
  appendBrainItems($("#shortMemoryList"), recent, "最近の記憶はまだありません。");
  appendBrainItems(
    $("#retrievedMemoryList"),
    getRelevantMemories(context).map(memoryDisplayTitle),
    "Retrieved memory is not available yet.",
  );
  renderMemoryConsolidation(consolidation);

  const target = $("#projectMemoryList");
  if (!target) return;
  target.replaceChildren();
  memoryStore.projectMemory.forEach((memory) => {
    const item = document.createElement("li");
    item.className = "project-memory-item";
    item.innerHTML = `
      <strong></strong>
      <span></span>
    `;
    item.querySelector("strong").textContent = memory.project;
    item.querySelector("span").textContent = memory.title;
    target.append(item);
  });
}

const PRIORITY_ENGINE_WEIGHTS = {
  explicitPriority: 40,
  todayTask: 30,
  dailyTask: 20,
  project: 16,
  hasshinNextAction: 18,
  writingInProgress: 18,
  fermentingIdea: 12,
  laterItem: 8,
  persistentMemo: 8,
  revisitPerson: 10,
  updatedToday: 8,
  staleSevenDays: 6,
  staleThirtyDays: 10,
  completedPenalty: -100,
  missingTitlePenalty: -20,
};

function brainTitleOf(item, fallback = "無題") {
  if (!item || typeof item !== "object") return fallback;
  return item.title || item.name || item.memo || item.text || item.body || fallback;
}

function brainIsOpen(item) {
  return item && !item.done && item.status !== "done" && item.status !== "完了";
}

function brainStatusMatches(value, labels) {
  return labels.includes(String(value || "").trim());
}

function brainFormatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function brainRecentDateOf(item) {
  return item?.updatedAt || item?.createdAt || item?.date || "";
}

function brainDaysSince(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
}

function readSubstackWorkspace() {
  const raw = readFirstStoredJson([EXTERNAL_APP_KEYS.substack, EXTERNAL_APP_KEYS.substackLegacy], null);
  if (!raw || typeof raw !== "object") return null;
  return raw;
}

function collectBrainWritingItems(workspace) {
  if (!workspace) return [];
  if (workspace.writings) {
    return [
      ...asArray(workspace.writings.notes),
      ...asArray(workspace.writings.articles),
    ];
  }
  if (workspace.content) {
    return Object.values(workspace.content).flatMap((entry) => asArray(entry));
  }
  return [];
}

function createPriorityCandidate({ item, source, sourceLabel, baseReason, basePoints }) {
  const title = brainTitleOf(item, "");
  const updatedAt = brainRecentDateOf(item);
  return {
    id: item?.id || `${source}:${title}`,
    item,
    source,
    sourceLabel,
    title,
    done: Boolean(item?.done),
    status: item?.status || "open",
    priorityFlag: Boolean(item?.priority),
    createdAt: item?.createdAt || item?.date || "",
    updatedAt,
    ageDays: brainDaysSince(item?.createdAt || item?.date),
    stalenessDays: brainDaysSince(updatedAt || item?.createdAt || item?.date),
    baseReason,
    basePoints,
  };
}

function collectPriorityCandidates(context) {
  const candidates = [];
  context.todayTasks.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.todayTasks",
    sourceLabel: "今日やること",
    baseReason: "今日やることに入っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.todayTask,
  })));
  context.dailyTasks.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.dailyTasks",
    sourceLabel: "毎日タスク",
    baseReason: "毎日タスクとして残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.dailyTask,
  })));
  context.projects.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.projects",
    sourceLabel: "育てるプロジェクト",
    baseReason: "育てるプロジェクトに入っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.project,
  })));
  context.laterOpen.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.laterItems",
    sourceLabel: "あとで見る/読む",
    baseReason: "あとで見る/読むに未完了で残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.laterItem,
  })));
  context.persistentMemos.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.persistentMemos",
    sourceLabel: "残るメモ",
    baseReason: "最近更新された残るメモです。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.persistentMemo,
  })));
  context.fermentingIdeas.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "discovery-labo.discoveries",
    sourceLabel: "発酵中アイデア",
    baseReason: "発酵中アイデアとして残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.fermentingIdea,
  })));
  context.hasshinNextActions.forEach((item) => candidates.push(createPriorityCandidate({
    item: { ...item, title: item.nextAction || item.title || item.memo },
    source: "hasshin-kansatsu-labo.entries",
    sourceLabel: "発信観察",
    baseReason: item.nextAction ? `次のアクション: ${item.nextAction}` : "発信観察に具体的な次の行動があります。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.hasshinNextAction,
  })));
  context.writingInProgress.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "substack-labo.writing",
    sourceLabel: "執筆中記事",
    baseReason: "執筆中の記事です。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.writingInProgress,
  })));
  context.revisitPeople.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "koryu-log-labo.entries",
    sourceLabel: "また見たい人",
    baseReason: "また見たい人として記録されています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.revisitPerson,
  })));
  return candidates;
}

function scorePriorityCandidate(candidate) {
  const reasons = [];
  let score = 0;
  if (candidate.basePoints) {
    score += candidate.basePoints;
    reasons.push({ points: candidate.basePoints, text: candidate.baseReason });
  }
  if (candidate.priorityFlag) {
    score += PRIORITY_ENGINE_WEIGHTS.explicitPriority;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.explicitPriority, text: "優先マークが付いています。" });
  }
  if (candidate.updatedAt && brainDaysSince(candidate.updatedAt) === 0) {
    score += PRIORITY_ENGINE_WEIGHTS.updatedToday;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.updatedToday, text: "今日更新されています。" });
  }
  if (candidate.stalenessDays >= 30) {
    score += PRIORITY_ENGINE_WEIGHTS.staleThirtyDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleThirtyDays, text: "30日以上残っている未完了の項目です。" });
  } else if (candidate.stalenessDays >= 7) {
    score += PRIORITY_ENGINE_WEIGHTS.staleSevenDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleSevenDays, text: "7日以上残っている未完了の項目です。" });
  }
  if (candidate.done || candidate.status === "done" || candidate.status === "完了") {
    score += PRIORITY_ENGINE_WEIGHTS.completedPenalty;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.completedPenalty, text: "完了済みのため優先度を下げています。" });
  }
  if (!candidate.title) {
    score += PRIORITY_ENGINE_WEIGHTS.missingTitlePenalty;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.missingTitlePenalty, text: "タイトルがないため判断しにくい項目です。" });
  }
  const clampedScore = Math.max(0, Math.min(100, score));
  return { ...candidate, score: clampedScore, rawScore: score, reasons };
}

function inferEnergyContext(day, completedToday, openTodayCount) {
  const totalOpen = openTodayCount + asArray(day.dailyTasks).filter(brainIsOpen).length;
  const reflection = day.reflection || {};
  const reflectionText = [reflection.didToday, reflection.blockedToday, reflection.tomorrowPlan].join(" ");
  if (/休|疲|無理|しんど|回復/.test(reflectionText)) {
    return { state: "Recovery", modifier: -30, text: "回復を優先したい記録があるため、重い提案を控えめにしています。" };
  }
  if (completedToday >= 4) {
    return { state: "High Energy", modifier: 10, text: "今日は完了が多く、進める力がありそうです。" };
  }
  if (totalOpen >= 8 && completedToday === 0) {
    return { state: "Low Energy", modifier: -15, text: "未完了が多いため、短時間で触れる形に寄せています。" };
  }
  return { state: "Normal", modifier: 0, text: "通常の優先度で表示しています。" };
}

function inferMomentumContext(day, writingInProgress, hasshinNextActions) {
  const recentlyUpdatedWriting = writingInProgress.filter((item) => brainDaysSince(brainRecentDateOf(item)) !== null && brainDaysSince(brainRecentDateOf(item)) <= 2);
  const recentActions = hasshinNextActions.filter((item) => brainDaysSince(brainRecentDateOf(item)) !== null && brainDaysSince(brainRecentDateOf(item)) <= 3);
  if (recentlyUpdatedWriting.length || recentActions.length) {
    return { state: "Rising", modifier: 8, text: "最近の更新や次アクションがあり、流れが続いています。" };
  }
  const staleOpen = [...asArray(day.todayTasks), ...asArray(day.projects)].some((item) => brainIsOpen(item) && brainDaysSince(brainRecentDateOf(item)) >= 14);
  if (staleOpen) {
    return { state: "Declining", modifier: -6, text: "止まっている項目があるため、再開しやすい一手として扱います。" };
  }
  return { state: "Stable", modifier: 0, text: "大きな勢いの偏りはないため、基本スコアを優先しています。" };
}

function applyPriorityModifiers(candidate, energyContext, momentumContext) {
  const adjustedScore = Math.max(
    0,
    Math.min(100, candidate.score + energyContext.modifier + momentumContext.modifier),
  );
  return {
    ...candidate,
    adjustedScore,
    modifiers: [energyContext, momentumContext],
  };
}

function rankPriorityCandidates(candidates, energyContext, momentumContext) {
  return candidates
    .map(scorePriorityCandidate)
    .filter((candidate) => candidate.title && !candidate.done && candidate.status !== "done" && candidate.status !== "完了")
    .map((candidate) => applyPriorityModifiers(candidate, energyContext, momentumContext))
    .sort((a, b) => {
      if (b.adjustedScore !== a.adjustedScore) return b.adjustedScore - a.adjustedScore;
      if (Number(b.priorityFlag) !== Number(a.priorityFlag)) return Number(b.priorityFlag) - Number(a.priorityFlag);
      return String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a)));
    });
}

function explainPriorityCandidate(candidate) {
  if (!candidate) {
    return {
      summary: "未完了の候補が少ないため、今日は整える日として表示しています。",
      reasons: ["今日の優先候補として強く出る項目はありません。"],
    };
  }
  const topReasons = candidate.reasons
    .filter((reason) => reason.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
    .map((reason) => reason.text);
  const modifierReasons = candidate.modifiers
    .filter((modifier) => modifier.modifier !== 0)
    .map((modifier) => `${modifier.state}: ${modifier.text}`);
  return {
    summary: `${candidate.sourceLabel}から選ばれました。スコア ${candidate.adjustedScore} / 100 の最優先候補です。`,
    reasons: [...topReasons, ...modifierReasons],
  };
}

function priorityCandidateMaterialLabels(candidate) {
  if (!candidate) {
    return ["今日の予定・タスク・記憶を確認しました。"];
  }
  const scoreParts = [
    `参照元: ${candidate.sourceLabel || candidate.source || "不明"}`,
    `基本スコア: ${candidate.score ?? 0}`,
    `調整後スコア: ${candidate.adjustedScore ?? candidate.score ?? 0}`,
  ];
  const reasonParts = asArray(candidate.reasons).map((reason) =>
    `${reason.points > 0 ? "+" : ""}${reason.points}: ${reason.text}`
  );
  const modifierParts = asArray(candidate.modifiers)
    .filter((modifier) => modifier.modifier !== 0)
    .map((modifier) => `${modifier.modifier > 0 ? "+" : ""}${modifier.modifier}: ${modifier.text}`);
  return [...scoreParts, ...reasonParts, ...modifierParts].filter(Boolean);
}

function inferEventContext(todayEvents) {
  const events = asArray(todayEvents).filter((event) => (event.title || "").trim());
  if (!events.length) {
    return {
      count: 0,
      level: "Open",
      text: "今日は予定はありません。",
      labels: [],
    };
  }
  const labels = events.map(formatEventScheduleLine);
  if (events.length >= 2) {
    return {
      count: events.length,
      level: "Busy",
      text: `今日の予定: ${labels.join(" / ")}`,
      labels,
    };
  }
  return {
    count: events.length,
    level: "Scheduled",
    text: `今日の予定: ${labels[0]}`,
    labels,
  };
}

function buildRecommendationInput(priorityCandidate, explanation, energyContext, momentumContext, context) {
  return {
    topCandidate: priorityCandidate || null,
    priorityReasons: asArray(explanation?.reasons),
    energy: energyContext,
    momentum: momentumContext,
    eventContext: context.eventContext,
    hasTodayEvents: context.eventContext.count > 0,
    hasFermentingIdeas: context.fermentingIdeas.length > 0,
    hasWritingInProgress: context.writingInProgress.length > 0,
    hasNextActions: context.hasshinNextActions.length > 0,
    openTodayCount: context.openTodayCount,
    completedToday: context.completedToday,
  };
}

function chooseRecommendationType(input) {
  if (!input.topCandidate) return "organize_or_rest";
  if (input.hasTodayEvents && input.eventContext.level !== "Open") return "schedule_context";
  if (input.energy.state === "Recovery") return "rest_first";
  if (input.energy.state === "Low Energy") return "start_small";
  if (input.momentum.state === "Rising" && (input.hasWritingInProgress || input.hasNextActions)) {
    return "continue_flow";
  }
  if (input.hasFermentingIdeas && input.hasWritingInProgress) return "write_from_idea";
  return "start_small";
}

function recommendationReasonForSource(source, candidate = null) {
  const sourceReasons = {
    "operation-dashboard.todayTasks": "今日やることに入っています。",
    "operation-dashboard.dailyTasks": "毎日タスクとして残っています。",
    "operation-dashboard.projects": "育てているプロジェクトに入っています。",
    "operation-dashboard.laterItems": "あとで見る項目として残っています。",
    "operation-dashboard.persistentMemos": "最近更新されたメモがあります。",
    "discovery-labo.discoveries": "発酵中アイデアがあります。",
    "hasshin-kansatsu-labo.entries": candidate?.title ? `次のアクション: ${candidate.title}` : "発信観察に具体的な次の行動があります。",
    "substack-labo.writing": "執筆中の記事があります。",
    "koryu-log-labo.entries": "また見たい人の記録があります。",
  };
  return sourceReasons[source] || "優先候補として読み取れる項目があります。";
}

function buildRecommendationReasons(input) {
  const scheduleReasons = input.hasTodayEvents
    ? input.eventContext.labels.map((label) => `予定: ${label}`)
    : [input.eventContext.text];
  if (!input.topCandidate) {
    const reasons = [
      "強く急ぐ候補は見つかっていません。",
      "今日は整理や回復を優先しても良さそうです。",
    ];
    reasons.unshift(...scheduleReasons);
    return reasons;
  }

  const reasons = [recommendationReasonForSource(input.topCandidate.source, input.topCandidate)];
  reasons.push(...scheduleReasons);
  if (input.hasFermentingIdeas && !reasons.includes("発酵中アイデアがあります。")) {
    reasons.push("発酵中アイデアがあります。");
  }
  if (input.hasWritingInProgress && !reasons.includes("執筆中の記事があります。")) {
    reasons.push("執筆中の記事があります。");
  }
  if (input.momentum.state === "Rising") reasons.push("今日は勢いがあります。");
  if (input.energy.state === "Low Energy") reasons.push("今日は短時間で触れる形が合いそうです。");
  if (input.energy.state === "Recovery") reasons.push("今日は回復を優先した方が良さそうです。");
  if (input.completedToday > 0) reasons.push(`今日はすでに${input.completedToday}件進んでいます。`);
  return [...new Set(reasons)].slice(0, 4);
}

function generateRecommendationMessage(input, type) {
  const title = input.topCandidate?.title || "";
  if (type === "organize_or_rest") {
    if (input.hasTodayEvents) {
      return {
        title: "おはよう、さくら。",
        message: `${input.eventContext.text} 新しい作業を増やすより、準備と休息を優先しても良さそうです。`,
        actionText: "まず予定の時間と持ち物だけ確認しておきませんか？",
      };
    }
    return {
      title: "おはよう、さくら。",
      message: "今日は少し休みながら整理する日にしても良さそうです。",
      actionText: "まず今日やることを1つだけ眺めてみませんか？",
    };
  }
  if (type === "rest_first") {
    return {
      title: "おはよう、さくら。",
      message: `「${title}」が候補ですが、今日は回復を優先して良さそうです。`,
      actionText: "完了を目指さず、開くだけでも十分です。",
    };
  }
  if (type === "continue_flow") {
    return {
      title: "おはよう、さくら。",
      message: `今日は「${title}」の流れを少し続けるタイミングかもしれません。`,
      actionText: "まず15分だけ始めてみませんか？",
    };
  }
  if (type === "schedule_context") {
    return {
      title: "おはよう、さくら。",
      message: `${input.eventContext.text} 「${title}」は余力があれば軽く触れるくらいで良さそうです。`,
      actionText: "大きな作業より、予定の準備や少し休むことを優先しても良さそうです。",
    };
  }
  if (type === "write_from_idea") {
    return {
      title: "おはよう、さくら。",
      message: "今日は記事を書くタイミングかもしれません。",
      actionText: "まず15分だけ始めてみませんか？",
    };
  }
  return {
    title: "おはよう、さくら。",
    message: `今日は「${title}」に少し触れてみるのが良さそうです。`,
    actionText: "まず15分だけ、軽く始めてみませんか？",
  };
}

function buildRecommendation(input) {
  const type = chooseRecommendationType(input);
  return {
    type,
    reasons: buildRecommendationReasons(input),
    ...generateRecommendationMessage(input, type),
  };
}

function adaptRecommendationWithLearning(recommendation, learningHint, learningSummary) {
  const adapted = {
    ...recommendation,
    adaptiveNote: "学習ヒントは参考情報として見ています。今日の判断はさくらの状態整理を優先しています。",
  };
  const canAdapt = learningHint.confidence >= 60 &&
    learningSummary.recentAcceptanceRate >= 60 &&
    learningSummary.commonRecommendationType === recommendation.type;
  if (!canAdapt) return adapted;

  const adaptiveText = "最近のフィードバック傾向を参考に、提案の強さだけを少し調整しています。";
  if (recommendation.type === "schedule_context") {
    return {
      ...adapted,
      actionText: "最近の傾向も踏まえて、予定の準備や少し休むことを優先しても良さそうです。",
      adaptiveNote: adaptiveText,
    };
  }
  if (recommendation.type === "rest_first") {
    return {
      ...adapted,
      actionText: "最近の傾向も踏まえて、今日は開くだけでも十分です。",
      adaptiveNote: adaptiveText,
    };
  }
  if (["start_small", "continue_flow", "write_from_idea"].includes(recommendation.type)) {
    return {
      ...adapted,
      actionText: "最近の傾向も踏まえて、まず15分だけ軽く始めてみませんか？",
      adaptiveNote: adaptiveText,
    };
  }
  return adapted;
}

function inferLearningMode(input, recommendation) {
  if (input.hasTodayEvents) return "schedule-aware";
  if (input.energy.state === "Recovery") return "recovery";
  if (input.energy.state === "Low Energy") return "low-energy";
  if (input.momentum.state === "Rising") return "momentum";
  return recommendation.type || "normal";
}

function buildLearningLogEntry(input, recommendation, context) {
  const recommendationText = [recommendation.message, recommendation.actionText]
    .filter(Boolean)
    .join(" ");
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    energy: input.energy.state,
    mode: inferLearningMode(input, recommendation),
    taskCount: context.taskCount,
    eventCount: input.eventContext.count,
    recommendationType: recommendation.type,
    recommendationText,
    accepted: null,
    note: "",
    createdAt: new Date().toISOString(),
  };
}

function syncCurrentLearningLog(input, recommendation, context) {
  const latestSameRecommendation = learningLog.find((entry) =>
    entry.date === activeDate &&
    entry.recommendationType === recommendation.type &&
    entry.recommendationText === [recommendation.message, recommendation.actionText].filter(Boolean).join(" "),
  );
  if (latestSameRecommendation) {
    currentLearningLogId = latestSameRecommendation.id;
    latestSameRecommendation.energy = input.energy.state;
    latestSameRecommendation.mode = inferLearningMode(input, recommendation);
    latestSameRecommendation.taskCount = context.taskCount;
    latestSameRecommendation.eventCount = input.eventContext.count;
    saveLearningLog();
    return latestSameRecommendation;
  }
  const entry = buildLearningLogEntry(input, recommendation, context);
  learningLog.unshift(entry);
  currentLearningLogId = entry.id;
  saveLearningLog();
  return entry;
}

function currentLearningLogEntry() {
  return learningLog.find((entry) => entry.id === currentLearningLogId) || null;
}

function renderLearningFeedback(entry) {
  const note = $("#learningFeedbackNote");
  const status = $("#learningFeedbackStatus");
  document.querySelectorAll("[data-learning-feedback]").forEach((button) => {
    const value = button.dataset.learningFeedback === "true";
    button.classList.toggle("active", entry?.accepted === value);
  });
  if (note && note.value !== (entry?.note || "")) {
    note.value = entry?.note || "";
  }
  if (!status) return;
  if (!entry) {
    status.textContent = "まだ記録はありません。";
  } else if (entry.accepted === true) {
    status.textContent = "この提案は合っていた、と記録しました。";
  } else if (entry.accepted === false) {
    status.textContent = "この提案は違った、と記録しました。";
  } else {
    status.textContent = "この提案を学習ログに記録しました。";
  }
}

function energyToScore(energy) {
  const scores = {
    "High Energy": 85,
    Normal: 60,
    "Low Energy": 35,
    Recovery: 20,
  };
  return scores[energy] ?? null;
}

function mostCommonValue(items, key) {
  const counts = items.reduce((result, item) => {
    const value = item[key];
    if (!value) return result;
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "なし";
}

function buildLearningSummary(logItems = learningLog) {
  const logs = asArray(logItems);
  const recent = logs.slice(0, 7);
  const acceptedCount = logs.filter((entry) => entry.accepted === true).length;
  const rejectedCount = logs.filter((entry) => entry.accepted === false).length;
  const answeredRecent = recent.filter((entry) => entry.accepted === true || entry.accepted === false);
  const acceptedRecent = recent.filter((entry) => entry.accepted === true).length;
  const energyScores = recent.map((entry) => energyToScore(entry.energy)).filter((score) => score !== null);
  return {
    totalLogs: logs.length,
    acceptedCount,
    rejectedCount,
    unansweredCount: logs.filter((entry) => entry.accepted !== true && entry.accepted !== false).length,
    recentAcceptanceRate: answeredRecent.length ? Math.round((acceptedRecent / answeredRecent.length) * 100) : null,
    commonRecommendationType: mostCommonValue(recent, "recommendationType"),
    averageEnergy: energyScores.length ? Math.round(energyScores.reduce((sum, score) => sum + score, 0) / energyScores.length) : null,
  };
}

function learningConfidenceScore(totalLogs) {
  if (totalLogs >= 30) return 90;
  if (totalLogs >= 10) return 60;
  if (totalLogs >= 3) return 20;
  return 10;
}

function buildLearningConfidence(summary = buildLearningSummary(), hint = null) {
  const baseScore = learningConfidenceScore(summary.totalLogs);
  const answeredCount = summary.acceptedCount + summary.rejectedCount;
  const answerBonus = answeredCount >= 10 ? 10 : answeredCount >= 3 ? 5 : 0;
  const consistencyBonus = summary.recentAcceptanceRate !== null && summary.recentAcceptanceRate >= 70 ? 5 : 0;
  const score = Math.min(100, baseScore + answerBonus + consistencyBonus);
  const level = score >= 80 ? "high" : score >= 50 ? "medium" : "low";
  return {
    score,
    level,
    message: score >= 50
      ? "Learning Layerは参考情報として使える状態です。"
      : "Learning Layerはまだ学習中のため、参考情報として控えめに扱います。",
    source: [...new Set([
      "totalLogs",
      answeredCount ? "feedbackCount" : "",
      summary.recentAcceptanceRate !== null ? "recentAcceptanceRate" : "",
      hint?.source || "",
    ].filter(Boolean).flatMap((source) => source.split(",").map((item) => item.trim()).filter(Boolean)))].join(", "),
  };
}

function buildLearningHint(summary = buildLearningSummary()) {
  const confidence = learningConfidenceScore(summary.totalLogs);
  if (summary.totalLogs < 3 || summary.recentAcceptanceRate === null) {
    return {
      message: "フィードバック数が少ないため、まだ学習中です。",
      confidence,
      source: "totalLogs",
    };
  }
  if (summary.commonRecommendationType === "schedule_context" && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は予定がある日に準備や休息を優先する提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  if (["start_small", "continue_flow", "write_from_idea"].includes(summary.commonRecommendationType) && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は小さな一歩の提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  if (summary.commonRecommendationType === "rest_first" && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は休息を優先する提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  return {
    message: "最近の傾向はまだはっきりしていないため、参考情報として見ています。",
    confidence,
    source: "recentAcceptanceRate",
  };
}

function renderLearningSummary(summary = buildLearningSummary()) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value;
  };
  setText("#learningSummaryTotal", `${summary.totalLogs}件`);
  setText("#learningSummaryAccepted", `${summary.acceptedCount}件`);
  setText("#learningSummaryRejected", `${summary.rejectedCount}件`);
  setText("#learningSummaryUnanswered", `${summary.unansweredCount}件`);
  setText("#learningSummaryRate", summary.recentAcceptanceRate === null ? "-" : `${summary.recentAcceptanceRate}%`);
  setText("#learningSummaryType", displayRecommendationType(summary.commonRecommendationType));
  setText("#learningSummaryEnergy", summary.averageEnergy === null ? "-" : String(summary.averageEnergy));
}

function renderLearningHint(hint = buildLearningHint()) {
  const message = $("#learningHintMessage");
  const confidence = $("#learningHintConfidence");
  const source = $("#learningHintSource");
  if (message) message.textContent = hint.message;
  if (confidence) confidence.textContent = `${hint.confidence}%`;
  if (source) source.textContent = displayLearningSource(hint.source);
}

function renderLearningConfidence(confidence = buildLearningConfidence()) {
  const score = $("#learningConfidenceScore");
  const level = $("#learningConfidenceLevel");
  const message = $("#learningConfidenceMessage");
  const source = $("#learningConfidenceSource");
  if (score) score.textContent = `${confidence.score}%`;
  if (level) level.textContent = displayLearningLevel(confidence.level);
  if (message) message.textContent = confidence.message;
  if (source) source.textContent = displayLearningSource(confidence.source);
}

const ADAPTIVE_GUIDANCE_CATEGORY_RULES = {
  writing: {
    keywords: /write|writing|article|substack|note|idea|発信|記事|執筆|投稿|文章/,
    recommendationTypes: ["write_from_idea"],
    modes: [],
    energies: [],
  },
  coding: {
    keywords: /code|coding|codex|github|app|js|css|html|commit|push|sakura ai|開発|実装/,
    recommendationTypes: [],
    modes: [],
    energies: [],
  },
  health: {
    keywords: /health|recovery|energy|sleep|mood|stress|体調|回復|睡眠|気分|ストレス/,
    recommendationTypes: [],
    modes: ["recovery", "low-energy"],
    energies: ["Recovery"],
  },
  rest: {
    keywords: /rest|break|pause|low-energy|recovery|休|無理|回復/,
    recommendationTypes: ["rest_first", "start_tiny"],
    modes: ["recovery", "low-energy"],
    energies: ["Recovery"],
  },
};

const ADAPTIVE_GUIDANCE_CATEGORIES = Object.keys(ADAPTIVE_GUIDANCE_CATEGORY_RULES);

function adaptiveGuidanceCategoriesForText(...parts) {
  const text = parts.map((part) => String(part || "").toLowerCase()).join(" ");
  const categories = new Set();
  Object.entries(ADAPTIVE_GUIDANCE_CATEGORY_RULES).forEach(([category, rule]) => {
    if (rule.keywords.test(text)) categories.add(category);
  });
  return [...categories];
}

function adaptiveGuidanceCategoriesForLearning(entry) {
  const categories = new Set(adaptiveGuidanceCategoriesForText(
    entry?.recommendationType,
    entry?.recommendationText,
    entry?.mode,
    entry?.energy,
    entry?.note,
  ));
  Object.entries(ADAPTIVE_GUIDANCE_CATEGORY_RULES).forEach(([category, rule]) => {
    if (rule.recommendationTypes.includes(entry?.recommendationType)) categories.add(category);
    if (rule.modes.includes(entry?.mode)) categories.add(category);
    if (rule.energies.includes(entry?.energy)) categories.add(category);
  });
  return [...categories];
}

function buildAdaptiveGuidanceScores({
  learningItems = learningLog,
  conversationItems = conversationFeedback,
} = {}) {
  const state = Object.fromEntries(
    ADAPTIVE_GUIDANCE_CATEGORIES.map((category) => [category, { total: 1, score: 0.5, signals: 0 }]),
  );
  const addSignal = (category, value, weight) => {
    if (!state[category]) return;
    state[category].score += value * weight;
    state[category].total += weight;
    state[category].signals += 1;
  };

  asArray(learningItems).slice(0, 20).forEach((entry, index) => {
    if (entry?.accepted !== true && entry?.accepted !== false) return;
    const value = entry.accepted ? 1 : 0;
    const weight = Math.max(0.45, 1 - index * 0.03);
    adaptiveGuidanceCategoriesForLearning(entry).forEach((category) => addSignal(category, value, weight));
  });

  asArray(conversationItems).slice(0, 20).forEach((entry, index) => {
    if (entry?.natural !== true && entry?.natural !== false) return;
    const value = entry.natural ? 0.75 : 0.25;
    const weight = Math.max(0.25, 0.55 - index * 0.015);
    adaptiveGuidanceCategoriesForText(entry.replyText, entry.note).forEach((category) => addSignal(category, value, weight));
  });

  const scores = Object.fromEntries(
    ADAPTIVE_GUIDANCE_CATEGORIES.map((category) => [
      category,
      Number((state[category].score / state[category].total).toFixed(2)),
    ]),
  );
  const signalCounts = Object.fromEntries(
    ADAPTIVE_GUIDANCE_CATEGORIES.map((category) => [category, state[category].signals]),
  );
  const topCategory = ADAPTIVE_GUIDANCE_CATEGORIES
    .filter((category) => signalCounts[category] > 0)
    .sort((a, b) => scores[b] - scores[a])[0] || "none";

  return {
    scores,
    signalCounts,
    topCategory,
    sourceSummary: `提案学習:${asArray(learningItems).length} / 返答:${asArray(conversationItems).length}`,
  };
}

function renderAdaptiveGuidanceLayer(guidance = buildAdaptiveGuidanceScores()) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value;
  };
  setText("#adaptiveGuidanceWriting", guidance.scores.writing.toFixed(2));
  setText("#adaptiveGuidanceCoding", guidance.scores.coding.toFixed(2));
  setText("#adaptiveGuidanceHealth", guidance.scores.health.toFixed(2));
  setText("#adaptiveGuidanceRest", guidance.scores.rest.toFixed(2));
  setText(
    "#adaptiveGuidanceSummary",
    guidance.topCategory === "none"
      ? "まだ十分なフィードバック傾向はありません。提案にはまだ反映していません。"
      : `最近は「${displayAdaptiveCategory(guidance.topCategory)}」への反応が相対的に高めです。提案にはまだ反映していません。`,
  );
  setText("#adaptiveGuidanceSource", guidance.sourceSummary);
}

function renderLearningStatus() {
  const summary = buildLearningSummary();
  const hint = buildLearningHint(summary);
  const confidence = buildLearningConfidence(summary, hint);
  renderLearningSummary(summary);
  renderLearningHint(hint);
  renderLearningConfidence(confidence);
  renderAdaptiveGuidanceLayer();
}

function buildExplainLayerDetails(input, recommendation, memoryContext = {}, healthAwareRecommendation = null) {
  const seenInfo = [
    input.topCandidate ? `${input.topCandidate.sourceLabel}の候補を見ています。` : "今日の候補全体を軽く見ています。",
    input.openTodayCount ? `今日やることに未完了が${input.openTodayCount}件あります。` : "今日やることの未完了は少なめです。",
    input.hasTodayEvents ? `今日の予定が${input.eventContext.count}件あります。` : "",
    input.hasFermentingIdeas ? "発酵中アイデアがあります。" : "",
    input.hasWritingInProgress ? "執筆中の記事があります。" : "",
    input.hasNextActions ? "発信観察の次アクションがあります。" : "",
  ].filter(Boolean);
  if (memoryContext.used) {
    seenInfo.push(`記憶を参照しています: ${brainMemoryContextNote(memoryContext)}`);
  }

  if (healthAwareRecommendation?.explanationHint) {
    seenInfo.push(`体調をふまえた提案: ${healthAwareRecommendation.explanationHint}`);
  }

  const mainReasons = input.topCandidate
    ? asArray(recommendation.reasons).map((reason) => `${reason} そのため、この提案にしています。`)
    : ["強く急ぐ候補が見えていないため、整理や回復寄りの提案にしています。"];

  const uncertainty = [
    "画面上とlocalStorageにある情報だけを見ています。",
    "今日の体調や気持ちは、記録されている範囲だけを手がかりにしています。",
  ];
  const learningSummary = buildLearningSummary();
  const learningHint = buildLearningHint(learningSummary);
  const learningConfidence = buildLearningConfidence(learningSummary, learningHint);
  if (memoryContext.used) {
    uncertainty.push("記憶は補助情報として参照しています。優先度判断や提案の種類は記憶で上書きしていません。");
  }
  if (learningSummary.commonRecommendationType !== "なし" && learningSummary.recentAcceptanceRate !== null) {
    uncertainty.push(`最近は「${displayRecommendationType(learningSummary.commonRecommendationType)}」の提案が記録されており、一致率は${learningSummary.recentAcceptanceRate}%です。`);
  }
  uncertainty.push(`${learningHint.message} このヒントは過去のフィードバックから生成されています。まだ学習途中のため、参考情報として扱っています。`);
  uncertainty.push(`学習の確信度は${learningConfidence.score}%です。さくらはこの信頼度を見ながら、学習結果を補助情報として扱います。`);
  if (recommendation.adaptiveNote) {
    uncertainty.push("学習は補助役として扱い、今日の候補・予定・エネルギーを見たさくらの判断を優先しています。");
  }
  if (!input.topCandidate) {
    uncertainty.push("候補が少ないため、優先順位は軽めに扱っています。");
  }
  if (input.hasTodayEvents) {
    uncertainty.push("予定は着手候補ではなく、今日の余白や負荷を見る材料として扱っています。");
  }
  if (input.energy.state === "Normal" && input.momentum.state === "Stable") {
    uncertainty.push("EnergyとMomentumに大きな偏りが見えていないため、説明は控えめにしています。");
  }

  if (healthAwareRecommendation?.cautionNote) {
    uncertainty.push(`体調をふまえた提案: ${healthAwareRecommendation.cautionNote}`);
  }

  return {
    seenInfo,
    mainReasons,
    energyImpact: input.energy.text,
    momentumImpact: input.momentum.text,
    uncertainty,
  };
}

function setExplainLayerExpanded(isExpanded) {
  const toggle = $("#explainLayerToggle");
  const body = $("#explainLayerBody");
  if (!toggle || !body) return;
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.textContent = isExpanded ? "理由を閉じる" : "理由を見る";
  body.hidden = !isExpanded;
}

function renderExplainLayerDetails(details) {
  appendBrainItems($("#explainSeenInfo"), details.seenInfo, "見ている情報はまだ少なめです。");
  appendBrainItems($("#explainMainReasons"), details.mainReasons, "主な理由はまだありません。");
  appendBrainItems($("#explainUncertainty"), details.uncertainty, "不確かな点は少なめです。");
  const energyTarget = $("#explainEnergyImpact");
  const momentumTarget = $("#explainMomentumImpact");
  if (energyTarget) energyTarget.textContent = details.energyImpact;
  if (momentumTarget) momentumTarget.textContent = details.momentumImpact;
  setExplainLayerExpanded(false);
}

const FIRST_AGENT_RESPONSES = {
  try: "いいですね。まず15分だけ始めてみましょう。",
  later: "了解です。必要になったらまた一緒に考えましょう。",
  rest: "今日は回復を優先しましょう。それも大切な選択です。",
  other: "了解です。今日は今の自分に合うことを選びましょう。",
};

function showFirstAgentResponse(reply) {
  currentFirstAgentReply = reply || "";
  document.querySelectorAll("[data-first-agent-reply]").forEach((button) => {
    button.classList.toggle("active", button.dataset.firstAgentReply === currentFirstAgentReply);
  });
  const target = $("#firstAgentResponse");
  if (!target) return;
  const message = FIRST_AGENT_RESPONSES[reply];
  target.textContent = message || "";
  target.hidden = !message;
}

function dailyFocusValue(value) {
  const text = String(value || "").trim();
  return text && text !== "-" ? text : "";
}

function pickDailyFocusTask(todayTasks = [], dailyTasks = []) {
  const openTodayTasks = asArray(todayTasks).filter(brainIsOpen);
  const openDailyTasks = asArray(dailyTasks).filter(brainIsOpen);
  return (
    openTodayTasks.find((task) => task.priority) ||
    openTodayTasks[0] ||
    openDailyTasks.find((task) => task.priority) ||
    openDailyTasks[0] ||
    null
  );
}

function buildContextSummary({
  priorityCandidate = null,
  recommendation = null,
  healthAwareRecommendation = null,
  memoryContext = null,
  todayTasks = [],
  dailyTasks = [],
  dailyInput = "",
  adaptiveGuidance = buildAdaptiveGuidanceScores(),
} = {}) {
  const focusTask = pickDailyFocusTask(todayTasks, dailyTasks);
  const dailyInputNote = dailyFocusValue(dailyInput);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));
  const taskCount = asArray(todayTasks).filter(brainIsOpen).length + asArray(dailyTasks).filter(brainIsOpen).length;
  const theme = dailyFocusValue(priorityCandidate?.title) ||
    dailyFocusValue(recommendation?.title) ||
    dailyFocusValue(focusTask?.title) ||
    "整える日";
  const signals = [
    priorityCandidate?.title ? "priority" : "",
    recommendation?.title ? "recommendation" : "",
    adaptiveGuidance.topCategory && adaptiveGuidance.topCategory !== "none" ? `adaptive:${adaptiveGuidance.topCategory}` : "",
    support || caution ? "health" : "",
    memoryTitle ? "memory" : "",
    dailyInputNote ? "dailyInput" : "",
    taskCount ? `tasks:${taskCount}` : "",
  ].filter(Boolean);
  const lines = [
    `今日は「${theme}」が文脈の中心です。`,
    support || caution || memoryTitle || dailyInputNote
      ? `${support || caution || (memoryTitle ? `記憶では「${memoryTitle}」を見ています。` : "今日の入力メモも参考にしています。")} 一つずつ進める流れが向いています。`
      : "一つずつ進める流れが向いています。",
  ];
  if (dailyInputNote && (support || caution || memoryTitle)) {
    lines.push("今日の入力メモも参考にしています。");
  }

  return {
    theme,
    focusTask,
    memoryTitle,
    support,
    caution,
    dailyInputNote,
    taskCount,
    adaptiveTopCategory: adaptiveGuidance.topCategory,
    text: lines.join("\n"),
    signals,
  };
}

function renderContextSummary(context = {}) {
  const summary = buildContextSummary(context);
  const text = $("#contextSummaryText");
  const theme = $("#contextSummaryTheme");
  const signals = $("#contextSummarySignals");
  if (text) text.textContent = summary.text;
  if (theme) theme.textContent = summary.theme;
  if (signals) signals.textContent = summary.signals.length ? summary.signals.join(" / ") : "-";
  return summary;
}

function buildDailyFocusCondition(healthAwareRecommendation, memoryContext, dailyInput = "") {
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));
  const dailyInputNote = dailyFocusValue(dailyInput);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );

  if (dailyInputNote && (support || caution || memoryTitle)) {
    return `${support || caution || `記憶では「${memoryTitle}」を見ています。`} 今日の入力メモも参考にしています。`;
  }
  if (dailyInputNote) return "今日の入力メモも参考にしながら、ひとつずつ進める流れが向いています。";
  if (support && memoryTitle) {
    return `${support} 「${memoryTitle}」も意識して、会話は軽く始めます。`;
  }
  if (caution && memoryTitle) {
    return `${caution} 記憶では「${memoryTitle}」を見ています。`;
  }
  if (support) return support;
  if (caution) return caution;
  if (memoryTitle) return `記憶では「${memoryTitle}」を見ながら、今日の話を組み立てます。`;
  return "体調と記憶の入力が増えると、今日の会話の意識点をここにまとめます。";
}

function buildMorningGuidanceText({ priorityCandidate, recommendation, healthAwareRecommendation, memoryContext, contextSummary = null, dailyInput = "" } = {}) {
  const priority = dailyFocusValue(contextSummary?.theme) ||
    dailyFocusValue(priorityCandidate?.title) ||
    dailyFocusValue(recommendation?.title);
  const action = dailyFocusValue(recommendation?.actionText);
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));
  const dailyInputNote = dailyFocusValue(dailyInput);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const lines = [];

  if (priority) {
    lines.push(`今日は「${priority}」を中心に進めるとよさそうです。`);
  } else {
    lines.push("今日は無理に増やさず、最初の一歩をひとつ決めましょう。");
  }

  if (action) {
    lines.push(action);
  } else if (support) {
    lines.push(support);
  } else if (caution) {
    lines.push(caution);
  } else {
    lines.push("小さく始めて、流れが出たら次へ進みましょう。");
  }

  if (dailyInputNote && lines.length < 3) {
    lines.push("今日の入力メモも参考にしています。");
  } else if (memoryTitle && lines.length < 3) {
    lines.push(`記憶では「${memoryTitle}」も見ています。`);
  }

  return lines.slice(0, 3).join("\n");
}

function renderMorningGuidanceLayer({
  priorityCandidate = null,
  recommendation = null,
  healthAwareRecommendation = null,
  memoryContext = null,
  contextSummary = null,
  dailyInput = "",
} = {}) {
  const target = $("#morningGuidanceText");
  if (!target) return;
  target.textContent = buildMorningGuidanceText({
    priorityCandidate,
    recommendation,
    healthAwareRecommendation,
    memoryContext,
    contextSummary,
    dailyInput,
  });
}

function renderDailyFocusLayer({
  priorityCandidate = null,
  recommendation = null,
  healthAwareRecommendation = null,
  memoryContext = null,
  todayTasks = [],
  dailyTasks = [],
  contextSummary = null,
  dailyInput = "",
} = {}) {
  if (!$("#dailyFocusPriority")) return;
  const focusTask = pickDailyFocusTask(todayTasks, dailyTasks);
  $("#dailyFocusPriority").textContent =
    dailyFocusValue(contextSummary?.theme) ||
    dailyFocusValue(priorityCandidate?.title) ||
    dailyFocusValue(recommendation?.title) ||
    "今日はまず整えることを優先します。";
  $("#dailyFocusNextAction").textContent =
    dailyFocusValue(recommendation?.actionText) ||
    (focusTask ? `「${focusTask.title}」を5分だけ始める` : "最初の一手を1つだけ決める");
  $("#dailyFocusCondition").textContent = buildDailyFocusCondition(
    healthAwareRecommendation,
    memoryContext,
    dailyInput,
  );
  $("#dailyFocusTask").textContent = focusTask?.title || "今日のタスクはまだありません。";
}

function buildExplainableGuidanceReasons({
  priorityCandidate = null,
  recommendation = null,
  healthAwareRecommendation = null,
  memoryContext = null,
  todayTasks = [],
  dailyTasks = [],
  dailyInput = "",
  adaptiveGuidance = buildAdaptiveGuidanceScores(),
} = {}) {
  const reasons = [];
  const focusTask = pickDailyFocusTask(todayTasks, dailyTasks);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));

  if (priorityCandidate?.title) {
    reasons.push(`優先度: 今日の候補では「${priorityCandidate.title}」が強く出ています。`);
  } else if (recommendation?.title) {
    reasons.push(`提案: 今日の提案は「${recommendation.title}」を中心にしています。`);
  }

  if (adaptiveGuidance?.topCategory && adaptiveGuidance.topCategory !== "none") {
    const score = adaptiveGuidance.scores?.[adaptiveGuidance.topCategory];
    reasons.push(`提案調整: 最近は「${displayAdaptiveCategory(adaptiveGuidance.topCategory)}」の反応が高めです（${Number(score).toFixed(2)}）。`);
  }

  if (support || caution) {
    reasons.push(`体調: ${support || caution}`);
  }

  if (memoryTitle) {
    reasons.push(`記憶: 「${memoryTitle}」を補助情報として見ています。`);
  }

  if (dailyFocusValue(dailyInput)) {
    reasons.push("今日の入力: 予定・体調・気になることのメモを参考にしています。");
  }

  if (focusTask?.title) {
    reasons.push(`今日やること: 次に触るタスクとして「${focusTask.title}」を見ています。`);
  }

  if (!reasons.length) {
    reasons.push("優先度 / 提案 / 体調 / 記憶 / 今日やること の既存情報から、軽めの提案にしています。");
  }

  return reasons.slice(0, 5);
}

function renderExplainableGuidanceLayer(context = {}) {
  const target = $("#explainableGuidanceReasons");
  if (!target) return;
  target.replaceChildren();
  buildExplainableGuidanceReasons(context).forEach((reason) => {
    const item = document.createElement("li");
    item.textContent = reason;
    target.append(item);
  });
}

function buildReflectionLayerItems({
  priorityCandidate = null,
  recommendation = null,
  learningEntry = null,
  reply = null,
  todayTasks = [],
  adaptiveGuidance = buildAdaptiveGuidanceScores(),
} = {}) {
  const items = [];
  const replyText = replySentence(reply?.text);
  const replyFeedback = replyText ? findConversationFeedback(replyText) : null;
  const focusTask = pickDailyFocusTask(todayTasks, []);

  if (recommendation?.title || priorityCandidate?.title) {
    items.push(`今日は「${recommendation?.title || priorityCandidate.title}」を提案しました。`);
  }

  if (replyFeedback?.natural === true) {
    items.push("返答は自然だったと評価されています。");
  } else if (replyFeedback?.natural === false) {
    items.push("返答には違和感があったと評価されています。");
  } else {
    items.push("返答フィードバックはまだありません。");
  }

  if (learningEntry?.accepted === true) {
    items.push("提案は受け入れられました。");
  } else if (learningEntry?.accepted === false) {
    items.push("提案は合わなかったと記録されています。");
  } else {
    items.push("提案フィードバックはまだありません。");
  }

  if (adaptiveGuidance.topCategory && adaptiveGuidance.topCategory !== "none") {
    items.push(`提案調整では「${displayAdaptiveCategory(adaptiveGuidance.topCategory)}」を少し強めに見ています。`);
  } else {
    items.push("提案調整はまだ十分な傾向を持っていません。");
  }

  if (learningEntry?.accepted === true && recommendation?.title) {
    items.push(`次回も似た日は「${recommendation.title}」を優先候補にできます。`);
  } else if (focusTask?.title) {
    items.push(`次回は「${focusTask.title}」の進み具合も見直せます。`);
  } else {
    items.push("次回はフィードバックが増えるほど、より具体的に振り返れます。");
  }

  return items.slice(0, 6);
}

function buildReflectionTomorrowNote({
  recommendation = null,
  learningEntry = null,
  reply = null,
  adaptiveGuidance = buildAdaptiveGuidanceScores(),
  contextSummary = null,
} = {}) {
  const replyText = replySentence(reply?.text);
  const replyFeedback = replyText ? findConversationFeedback(replyText) : null;

  if (replyFeedback?.natural === false) {
    return "今日は返答に違和感がありました。\n次回は説明を少し簡潔にします。";
  }
  if (learningEntry?.accepted === true && recommendation?.title) {
    return `今日は提案が受け入れられました。\n明日も似た条件なら「${recommendation.title}」を優先候補にします。`;
  }
  if (learningEntry?.accepted === false) {
    return "今日は提案が合わなかったと記録されています。\n明日は別の切り口や小さめの一歩を優先します。";
  }
  if (adaptiveGuidance.topCategory === "health" || adaptiveGuidance.topCategory === "rest") {
    return "今日は体調や回復を強めに見ています。\n明日も無理のない提案を維持します。";
  }
  if (contextSummary?.theme) {
    return `今日は「${contextSummary.theme}」が文脈の中心でした。\n明日もこの流れを見ながら提案を整えます。`;
  }
  return "今日はまだ判断材料を集めている段階です。\n明日はフィードバックを見ながら提案を少しずつ整えます。";
}

function renderReflectionLayer(context = {}) {
  const target = $("#reflectionLayerList");
  if (target) {
    target.replaceChildren();
    buildReflectionLayerItems(context).forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      target.append(item);
    });
  }
  const tomorrowNote = $("#reflectionTomorrowNote");
  if (tomorrowNote) tomorrowNote.textContent = buildReflectionTomorrowNote(context);
}

function buildConversationTimelineItems({
  recommendation = null,
  memoryContext = null,
  contextSummary = null,
  learningEntry = null,
  reply = null,
} = {}) {
  const recentMemory = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const recentFeedback = asArray(conversationFeedback)
    .filter((entry) => entry?.natural === true || entry?.natural === false || dailyFocusValue(entry?.note))
    .slice(0, 3);
  const replyText = replySentence(reply?.text);
  const replyFeedback = replyText ? findConversationFeedback(replyText) : null;
  const items = [];

  items.push(`最近のテーマ: ${contextSummary?.theme || recommendation?.title || recentMemory || "まだ整理中です"}`);

  if (recentFeedback.length) {
    const naturalCount = recentFeedback.filter((entry) => entry.natural === true).length;
    const awkwardCount = recentFeedback.filter((entry) => entry.natural === false).length;
    items.push(`変化: 直近の返答フィードバックは自然 ${naturalCount}件 / 違和感 ${awkwardCount}件です。`);
  } else if (recentMemory) {
    items.push(`変化: 記憶では「${recentMemory}」が流れの手がかりです。`);
  } else {
    items.push("変化: まだ会話フィードバックや記憶の手がかりは少なめです。");
  }

  if (recommendation?.title) {
    items.push(`現在の流れ: 「${recommendation.title}」を中心に、今日の提案を組み立てています。`);
  } else {
    items.push("現在の流れ: 今日の入力を見ながら、軽めの提案に寄せています。");
  }

  if (replyFeedback?.natural === false) {
    items.push("さくらが感じている方向性: 次の返答は説明を短くし、違和感を減らす方向です。");
  } else if (learningEntry?.accepted === true) {
    items.push("さくらが感じている方向性: 似た文脈では今回の提案方向を続けられそうです。");
  } else if (contextSummary?.adaptiveTopCategory && contextSummary.adaptiveTopCategory !== "none") {
    items.push(`さくらが感じている方向性: 「${displayAdaptiveCategory(contextSummary.adaptiveTopCategory)}」の傾向を補助情報として見ています。`);
  } else {
    items.push("さくらが感じている方向性: もう少しフィードバックを集めながら、流れを見極めます。");
  }

  return items.slice(0, 4);
}

function renderConversationTimeline(context = {}) {
  const target = $("#conversationTimelineList");
  if (!target) return;
  target.replaceChildren();
  buildConversationTimelineItems(context).forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    target.append(item);
  });
}

function renderBrainPrototype() {
  if (!$("#brainPriority")) return;

  const day = store[activeDate] || {};
  const dailyTasks = asArray(day.dailyTasks);
  const todayTasks = asArray(day.todayTasks);
  const todayEvents = asArray(day.todayEvents);
  const projects = asArray(day.projects);
  const completedToday = [...todayTasks, ...dailyTasks].filter((item) => item.done).length;
  const openToday = todayTasks.filter(brainIsOpen);
  const laterOpen = laterItems.filter((item) => !item.done);
  const reflection = day.reflection || {};
  const discoveries = asArray(readStoredJson(EXTERNAL_APP_KEYS.discoveries, []));
  const fermentingIdeas = discoveries.filter((seed) =>
    brainStatusMatches(seed.status, ["発酵中", "逋ｺ驟ｵ荳ｭ"]),
  );
  const writingItems = collectBrainWritingItems(readSubstackWorkspace());
  const writingInProgress = writingItems.filter((item) =>
    brainStatusMatches(item.status, ["執筆中", "蝓ｷ遲・ｸｭ"]),
  );
  const hasshinEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.hasshin, []));
  const hasshinNextActions = hasshinEntries.filter((entry) => (entry.nextAction || "").trim());
  const koryuEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.koryu, []));
  const revisitPeople = koryuEntries.filter((entry) => brainStatusMatches(entry.revisit, ["はい", "縺ｯ縺・"]));
  const newestMemo = persistentMemos
    .filter((memo) => memo.updatedAt || memo.createdAt)
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const recentMemos = persistentMemos.filter((memo) => brainDaysSince(memo.updatedAt || memo.createdAt) !== null && brainDaysSince(memo.updatedAt || memo.createdAt) <= 7);
  const energyContext = inferEnergyContext(day, completedToday, openToday.length);
  const momentumContext = inferMomentumContext(day, writingInProgress, hasshinNextActions);
  const eventContext = inferEventContext(todayEvents);
  const candidates = collectPriorityCandidates({
    todayTasks,
    dailyTasks,
    projects,
    laterOpen,
    persistentMemos: recentMemos,
    fermentingIdeas,
    hasshinNextActions,
    writingInProgress,
    revisitPeople,
  });
  const rankedCandidates = rankPriorityCandidates(candidates, energyContext, momentumContext);
  const priorityCandidate = rankedCandidates[0];
  const explanation = explainPriorityCandidate(priorityCandidate);
  const recommendationInput = buildRecommendationInput(
    priorityCandidate,
    explanation,
    energyContext,
    momentumContext,
    {
      fermentingIdeas,
      writingInProgress,
      hasshinNextActions,
      eventContext,
      openTodayCount: openToday.length,
      completedToday,
    },
  );
  const learningSummary = buildLearningSummary();
  const learningHint = buildLearningHint(learningSummary);
  const baseRecommendation = buildRecommendation(recommendationInput);
  const memoryRetrievalContext = buildMemoryRetrievalContext({
    priorityCandidate,
    recommendationType: baseRecommendation.type,
    eventContext,
  });
  const brainMemoryContext = buildBrainMemoryContext(memoryRetrievalContext);
  const recommendation = applyBrainMemoryContext(adaptRecommendationWithLearning(
    baseRecommendation,
    learningHint,
    learningSummary,
  ), brainMemoryContext);
  currentRecommendation = recommendation;
  const healthAwareRecommendation = getLatestHealthAwareRecommendation(recommendation);
  const explainLayerDetails = buildExplainLayerDetails(
    recommendationInput,
    recommendation,
    brainMemoryContext,
    healthAwareRecommendation,
  );
  const learningEntry = syncCurrentLearningLog(recommendationInput, recommendation, {
    taskCount: todayTasks.length,
  });
  const latestLearningSummary = buildLearningSummary();
  const latestLearningHint = buildLearningHint(latestLearningSummary);
  const latestLearningConfidence = buildLearningConfidence(latestLearningSummary, latestLearningHint);
  const healthAwareConversation = getLatestHealthAwareConversation();
  const conversationContext = buildConversationContext({
    project: brainMemoryContext.project || priorityCandidate?.title || "",
    recommendation,
    explanation,
    learningHint: latestLearningHint,
    learningConfidence: latestLearningConfidence,
    memoryContext: brainMemoryContext,
    healthAwareConversation,
    todayTasks,
    todayEvents,
  });
  currentConversationContext = conversationContext;
  const replyPlan = buildReplyPlan(conversationContext);
  currentReplyPlan = replyPlan;
  upsertEmotionalResonance();
  const reply = buildReply(
    replyPlan,
    getRecentConversationImprovementHints(),
    getLatestConversationReflection(),
    getLatestConversationContinuity(),
    getLatestConversationRecovery(),
    personalityProfile,
    relationshipProfile,
    getLatestEmotionalResonance(),
    getLatestIdentityProfile(),
    getLatestGoalState(),
    getLatestPriorityState(),
    getLatestDecisionState(),
    getLatestStrategyState(),
    getLatestAttentionState(),
    getLatestCognitiveState(),
    getLatestIntentState(),
    getLatestTaskPlanState(),
    getLatestWorkflowState(),
    getLatestExecutionDecision(),
    getLatestExecutionState(),
    getLatestExecutionFeedback(),
    getLatestHealthState(),
    buildHealthInsight(getRecentHealthStates()),
    getLatestHealthTrend(),
    getLatestHealthContext(),
    healthAwareConversation,
    healthAwareRecommendation,
  );

  $("#brainPriority").textContent = priorityCandidate?.title || "今日は整える日";
  $("#brainPriorityNote").textContent = explanation.summary;
  const priorityScore = $("#brainPriorityScore");
  if (priorityScore) {
    priorityScore.textContent = priorityCandidate
      ? `${priorityCandidate.adjustedScore} / 100（基本 ${priorityCandidate.score}）`
      : "候補なし";
  }
  appendBrainItems(
    $("#brainPriorityMaterials"),
    priorityCandidateMaterialLabels(priorityCandidate),
    "判断材料はまだありません。",
  );
  appendBrainItems($("#brainPriorityReasons"), explanation.reasons, "理由はまだありません。");

  $("#brainRecommendationTitle").textContent = recommendation.title;
  $("#brainRecommendationMessage").textContent = recommendation.message;
  $("#brainRecommendationAction").textContent = recommendation.actionText;
  const adaptiveNote = $("#brainAdaptiveNote");
  if (adaptiveNote) {
    adaptiveNote.textContent = recommendation.adaptiveNote || "";
    adaptiveNote.hidden = !recommendation.adaptiveNote;
  }
  appendBrainItems($("#brainRecommendationReasons"), recommendation.reasons, "今日は理由を少なくして、軽く整える提案です。");
  renderHealthAwareRecommendation(healthAwareRecommendation);
  renderExplainLayerDetails(explainLayerDetails);
  renderLearningFeedback(learningEntry);
  renderLearningSummary(latestLearningSummary);
  renderLearningHint(latestLearningHint);
  renderLearningConfidence(latestLearningConfidence);
  const adaptiveGuidance = buildAdaptiveGuidanceScores();
  renderAdaptiveGuidanceLayer(adaptiveGuidance);
  renderConversationContext(conversationContext);
  renderReplyPlan(replyPlan);
  renderReply(reply);
  renderPersonalityProfile();
  renderRelationshipProfile();
  renderEmotionalResonance();
  renderIdentityProfile();
  renderGoalState();
  renderPriorityState();
  renderDecisionState();
  renderStrategyState();
  renderAttentionState();
  renderCognitiveState();
  renderIntentState();
  renderTaskPlanState();
  renderWorkflowState();
  renderExecutionDecision();
  renderExecutionState();
  renderExecutionFeedback();
  renderHealthState();
  renderHealthInsight();
  renderHealthTrend();
  renderHealthContext();
  renderHealthAwareConversation();
  renderExecutiveSummary();
  renderAdaptiveIntelligence();
  renderConversationFeedback(reply);
  renderConversationImprovementHints();
  renderConversationReflection();
  renderConversationContinuity();
  renderConversationRecovery();
  showFirstAgentResponse("");

  if (eventContext.count) {
    upsertShortMemory({
      type: "event_context",
      title: "今日は予定がある日",
      summary: eventContext.labels.join(" / "),
      source: "todayEvents",
      importance: eventContext.count >= 2 ? 4 : 3,
      tags: ["schedule", "short"],
    });
  }
  upsertShortMemory({
    type: "recommendation",
    title: "提案が出た",
    summary: [recommendation.message, recommendation.actionText].filter(Boolean).join(" "),
    source: "recommendation",
    importance: 2,
    tags: ["recommendation", recommendation.type],
  });
  renderMemoryLayer(memoryRetrievalContext);
  renderBrainMemoryContext(brainMemoryContext);

  appendBrainItems(
    $("#brainTodayTasks"),
    openToday.map((item) => item.title),
    "今日だけのタスクはまだありません。",
  );

  appendBrainItems(
    $("#brainTodayEvents"),
    eventContext.labels,
    "今日の予定はまだありません。",
  );

  const suggestions = [
    eventContext.count ? "今日の予定前後に休む余白を残す" : priorityCandidate ? `まず「${priorityCandidate.title}」を5分だけ触る` : "最初の一手を1つだけ決める",
    laterOpen.length ? `あとで見る/読むが${laterOpen.length}件あります。1件だけ処理する` : "あとで見る/読むは落ち着いています",
    completedToday ? `今日はすでに${completedToday}件完了しています。追加しすぎない` : "完了がまだ少ないので、短いタスクから始める",
    reflection.tomorrowPlan ? "昨日の「明日やること」を見直す" : "夜に短い振り返りを残す",
  ];
  appendBrainItems($("#brainSuggestions"), suggestions, "提案はまだありません。");

  appendBrainItems(
    $("#brainFermentingIdeas"),
    fermentingIdeas.map((seed) => brainTitleOf(seed, "無題のアイデア")),
    "発酵中アイデアはまだありません。",
  );

  appendBrainItems(
    $("#brainWritingItems"),
    writingInProgress.map((item) => brainTitleOf(item, "無題の記事")),
    "執筆中の記事はまだありません。",
  );

  const newestHasshin = hasshinNextActions
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const newestRevisit = revisitPeople
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const recentChanges = [
    getLatestHealthState()?.updatedAt ? `体調入力: 体調チェック更新 ${brainFormatDateTime(getLatestHealthState().updatedAt)}` : "",
    day.dailyInput ? "今日の入力: 自由入力メモを参照" : "",
    newestHasshin?.nextAction ? `発信観察の次アクション: ${newestHasshin.nextAction}` : "",
    newestRevisit?.name ? `また見たい人: ${newestRevisit.name}` : "",
    newestMemo ? `残るメモ更新: ${brainFormatDateTime(newestMemo.updatedAt || newestMemo.createdAt)}` : "",
    day.updatedAt ? `今日の記録更新: ${brainFormatDateTime(day.updatedAt)}` : "",
  ];
  appendBrainItems($("#brainRecentChanges"), recentChanges, "最近の変化はまだありません。");
  const contextSummary = renderContextSummary({
    priorityCandidate,
    recommendation,
    healthAwareRecommendation,
    memoryContext: brainMemoryContext,
    todayTasks,
    dailyTasks,
    dailyInput: day.dailyInput,
    adaptiveGuidance,
  });
  renderDailyFocusLayer({
    priorityCandidate,
    recommendation,
    healthAwareRecommendation,
    memoryContext: brainMemoryContext,
    todayTasks,
    dailyTasks,
    contextSummary,
    dailyInput: day.dailyInput,
  });
  renderMorningGuidanceLayer({
    priorityCandidate,
    recommendation,
    healthAwareRecommendation,
    memoryContext: brainMemoryContext,
    contextSummary,
    dailyInput: day.dailyInput,
  });
  renderExplainableGuidanceLayer({
    priorityCandidate,
    recommendation,
    healthAwareRecommendation,
    memoryContext: brainMemoryContext,
    todayTasks,
    dailyTasks,
    dailyInput: day.dailyInput,
    adaptiveGuidance,
  });
  renderReflectionLayer({
    priorityCandidate,
    recommendation,
    learningEntry,
    reply,
    todayTasks,
    adaptiveGuidance,
    contextSummary,
  });
  renderConversationTimeline({
    recommendation,
    memoryContext: brainMemoryContext,
    contextSummary,
    learningEntry,
    reply,
  });
}
function renderAll() {
  getDay();
  autoAddDueRecurringSchedules();
  $("#activeDate").value = activeDate;
  listIds.forEach(renderTaskList);
  renderEventList();
  renderRecurringSchedule();
  renderMailLastChecked();
  renderPersistentMemos();
  renderLearnings();
  renderPublishingOps();
  renderLaterItems();
  renderFields();
  renderSummary();
  renderHistory();
  renderBrainPrototype();
}

function moveDashboardNode(selector, targetSelector) {
  const node = document.querySelector(selector);
  const target = document.querySelector(targetSelector);
  if (!node || !target || node.parentElement === target) return;
  target.append(node);
}

function arrangeDashboardUxSections() {
  moveDashboardNode(".generated-reply-panel", "#generatedReplyMount");
  moveDashboardNode(".health-check-panel", "#healthCheckInputMount");
  moveDashboardNode(".health-insight-panel", "#healthAnalysisMount");
  moveDashboardNode(".health-trend-panel", "#healthAnalysisMount");
  moveDashboardNode(".health-context-panel", "#healthAnalysisMount");
  moveDashboardNode("#memoryMemoForm", "#memoryMemoInputMount");
  moveDashboardNode(".conversation-feedback-panel", "#replyFeedbackMount");
}

function bindEvents() {
  $("#explainLayerToggle")?.addEventListener("click", () => {
    const body = $("#explainLayerBody");
    setExplainLayerExpanded(Boolean(body?.hidden));
  });
  document.querySelectorAll("[data-first-agent-reply]").forEach((button) => {
    button.addEventListener("click", () => {
      showFirstAgentResponse(button.dataset.firstAgentReply);
    });
  });
  document.querySelectorAll("[data-learning-feedback]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = currentLearningLogEntry();
      if (!entry) return;
      entry.accepted = button.dataset.learningFeedback === "true";
      saveLearningLog();
      renderLearningFeedback(entry);
      renderLearningStatus();
      upsertShortMemory({
        type: "learning_feedback",
        title: "提案フィードバックが記録された",
        summary: entry.accepted ? "この提案は合っていた、と記録されました。" : "この提案は違った、と記録されました。",
        source: "learningLog",
        importance: 3,
        tags: ["learning", "feedback"],
      });
      renderMemoryLayer();
    });
  });
  $("#learningFeedbackNote")?.addEventListener("input", (event) => {
    const entry = currentLearningLogEntry();
    if (!entry) return;
    entry.note = event.target.value;
    saveLearningLog();
    renderLearningFeedback(entry);
    renderLearningStatus();
  });
  document.querySelectorAll("[data-conversation-feedback]").forEach((button) => {
    button.addEventListener("click", () => {
      const feedback = upsertConversationFeedback(currentReplyText, {
        natural: button.dataset.conversationFeedback === "true",
      });
      refreshConversationFeedbackAnalysis(feedback);
    });
  });
  $("#conversationFeedbackNote")?.addEventListener("input", (event) => {
    const status = $("#conversationFeedbackStatus");
    if (status) {
      status.textContent = currentReplyText
        ? "未保存の返答メモがあります。「返答メモを保存する」を押してください。"
        : "生成された返答がまだありません。";
    }
  });
  $("#saveConversationFeedbackNote")?.addEventListener("click", () => {
    if (!currentReplyText) return;
    const feedback = upsertConversationFeedback(currentReplyText, {
      note: $("#conversationFeedbackNote")?.value || "",
    });
    refreshConversationFeedbackAnalysis(feedback);
    const status = $("#conversationFeedbackStatus");
    if (status) status.textContent = "返答メモを保存し、会話分析へ反映しました。";
  });
  $("#dailyInputText")?.addEventListener("input", () => {
    const status = $("#dailyInputStatus");
    if (status) status.textContent = "未保存の入力があります。「今日の入力を保存する」を押してください。";
  });
  $("#saveDailyInput")?.addEventListener("click", () => {
    const day = getDay();
    day.dailyInput = $("#dailyInputText")?.value || "";
    saveStore();
    renderSummary();
    renderHistory();
    renderBrainPrototype();
    const status = $("#dailyInputStatus");
    if (status) status.textContent = "今日の入力を保存し、さくら判断の材料に反映しました。";
  });
  $("#executionFeedbackOutcome")?.addEventListener("change", (event) => {
    upsertExecutionFeedback({ outcome: event.target.value });
    renderExecutionFeedback();
    renderExecutiveSummary();
  });
  $("#executionFeedbackDifficulty")?.addEventListener("change", (event) => {
    upsertExecutionFeedback({ difficulty: event.target.value });
    renderExecutionFeedback();
    renderExecutiveSummary();
  });
  $("#executionFeedbackDuration")?.addEventListener("input", (event) => {
    upsertExecutionFeedback({ durationMinutes: event.target.value });
    renderExecutionFeedback();
    renderExecutiveSummary();
  });
  $("#executionFeedbackCompletedAt")?.addEventListener("input", (event) => {
    upsertExecutionFeedback({ completedAt: event.target.value });
    renderExecutionFeedback();
    renderExecutiveSummary();
  });
  $("#executionFeedbackNote")?.addEventListener("input", (event) => {
    upsertExecutionFeedback({ note: event.target.value });
    renderExecutionFeedback();
    renderExecutiveSummary();
  });
  const bindHealthInput = (selector, key, eventName = "change") => {
    $(selector)?.addEventListener(eventName, (event) => {
      upsertHealthState({ [key]: event.target.value });
      renderHealthState();
      renderHealthInsight();
      renderHealthTrend();
      renderHealthContext();
      renderHealthAwareConversation();
      renderHealthAwareRecommendation();
      renderAdaptiveIntelligence();
      renderExecutiveSummary();
    });
  };
  bindHealthInput("#healthSleepHours", "sleepHours", "input");
  bindHealthInput("#healthSleepQuality", "sleepQuality");
  bindHealthInput("#healthRecoveryFeeling", "recoveryFeeling");
  bindHealthInput("#healthNutritionSatisfaction", "nutritionSatisfaction");
  bindHealthInput("#healthMedicationStatus", "medicationStatus");
  bindHealthInput("#healthEnergyLevel", "energyLevel");
  bindHealthInput("#healthMood", "mood");
  bindHealthInput("#healthStressLevel", "stressLevel");
  bindHealthInput("#healthBodyNote", "bodyNote", "input");
  $("#memoryMemoForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const memo = $("#memoryMemoText")?.value.trim();
    if (!memo) return;
    upsertShortMemory({
      type: "manual",
      title: "今日の記憶メモ",
      summary: memo,
      source: "manual",
      importance: 3,
      tags: ["manual", "short"],
    });
    $("#memoryMemoText").value = "";
    renderMemoryLayer();
  });
  $("#activeDate").addEventListener("change", (event) => {
    activeDate = event.target.value || toDateInputValue(new Date());
    renderAll();
  });
  $("#prevDay").addEventListener("click", () => shiftDate(-1));
  $("#nextDay").addEventListener("click", () => shiftDate(1));
  document.querySelectorAll("[data-add-list]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const title = input.value.trim();
      if (!title) return;
      getDay()[form.dataset.addList].push(newItem(title));
      input.value = "";
      saveStore();
      renderTaskList(form.dataset.addList);
    });
  });
  $("#eventForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#eventTitle").value.trim();
    const time = $("#eventTime").value.trim();
    const note = $("#eventNote").value.trim();
    if (!title) return;
    getDay().todayEvents.push(newEvent({
      title,
      time,
      type: $("#eventType").value,
      note,
    }));
    $("#eventTitle").value = "";
    $("#eventTime").value = "";
    $("#eventNote").value = "";
    $("#eventType").value = "meeting";
    saveStore();
    renderEventList();
    renderRecurringSchedule();
    renderBrainPrototype();
  });
  $("#recurringScheduleForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#recurringTitle")?.value.trim();
    if (!title) return;
    recurringSchedule.unshift(buildRecurringScheduleItem({
      title,
      type: $("#recurringType")?.value || "medical",
      frequencyType: $("#recurringFrequency")?.value || "weekly",
      weekday: $("#recurringWeekday")?.value || weekdayOfDateKey(activeDate),
      intervalWeeks: $("#recurringIntervalWeeks")?.value || 2,
      startDate: $("#recurringStartDate")?.value || activeDate,
      defaultTime: $("#recurringTime")?.value.trim() || "",
      note: $("#recurringNote")?.value.trim() || "",
    }));
    saveRecurringSchedule();
    ["#recurringTitle", "#recurringTime", "#recurringNote"].forEach((selector) => {
      const field = $(selector);
      if (field) field.value = "";
    });
    renderRecurringSchedule();
  });
  $("#addPersistentMemo")?.addEventListener("click", () => {
    const memo = newPersistentMemo();
    persistentMemos.unshift(memo);
    savePersistentMemos();
    renderPersistentMemos({ focusId: memo.id });
  });
  $("#addLearning")?.addEventListener("click", () => {
    getDay().learnings.unshift(newLearningItem());
    saveStore();
    renderLearnings();
  });
  $("#laterForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#laterTitle").value.trim();
    if (!title) return;
    laterItems.unshift(newLaterItem({
      type: $("#laterType").value,
      title,
      url: $("#laterUrl").value.trim(),
      memo: $("#laterMemo").value.trim(),
    }));
    if (autoDedupeLater) removeLaterDuplicates();
    $("#laterTitle").value = "";
    $("#laterUrl").value = "";
    $("#laterMemo").value = "";
    saveLaterItems();
    renderLaterItems();
  });
  $("#showDoneLater")?.addEventListener("change", (event) => {
    showDoneLater = event.target.checked;
    saveLaterView();
    renderLaterItems();
  });
  $("#laterSearch")?.addEventListener("input", (event) => {
    laterSearchQuery = event.target.value;
    renderLaterItems();
  });
  $("#autoDedupeLater")?.addEventListener("change", (event) => {
    autoDedupeLater = event.target.checked;
    saveLaterView();
  });
  $("#dedupeLater")?.addEventListener("click", () => {
    const removed = removeLaterDuplicates();
    if (!removed) {
      alert("重複している項目はありません。");
      return;
    }
    saveLaterItems();
    renderLaterItems();
    alert(`${removed}件の重複を削除しました。`);
  });
  $("#clearDoneLater")?.addEventListener("click", () => {
    laterItems = laterItems.filter((item) => !item.done);
    saveLaterItems();
    renderLaterItems();
  });
  Object.keys(getDay().metrics).forEach((key) => {
    const field = $(`#${key}`);
    if (!field) return;
    field.addEventListener("input", () => updateField("metrics", key, field));
    field.addEventListener("change", () => updateField("metrics", key, field));
  });
  Object.keys(getDay().reflection).forEach((key) => {
    const field = $(`#${key}`);
    if (!field) return;
    field.addEventListener("input", () => updateField("reflection", key, field));
  });
  $("#savePublishingOps")?.addEventListener("click", savePublishingOpsFromForm);
  Object.values(publishingOpsFields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    field.addEventListener("input", () => {
      const status = $("#publishingOpsStatus");
      if (status) status.textContent = "未保存の変更があります。";
    });
    field.addEventListener("change", () => {
      const status = $("#publishingOpsStatus");
      if (status) status.textContent = "未保存の変更があります。";
    });
  });
  $("#historySearch").addEventListener("input", renderHistory);
  $("#downloadCsv").addEventListener("click", downloadCsv);
  $("#exportBackup")?.addEventListener("click", handleExportBackup);
  $("#importBackup")?.addEventListener("click", () => $("#importBackupFile")?.click());
  $("#importBackupFile")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) handleImportBackupFile(file);
  });
  bindSnapshotPanel();
}

const mailCheckKeys = ["mailMorningChecked", "mailNoonChecked", "mailNightChecked"];

function updateField(group, key, field) {
  const day = getDay();
  const value = field.type === "checkbox" ? field.checked : field.value;
  day[group][key] = value;
  if (group === "metrics" && mailCheckKeys.includes(key) && value === true) {
    day.metrics.mailLastCheckedAt = new Date().toISOString();
    renderMailLastChecked();
  }
  saveStore();
}

function shiftDate(delta) {
  const date = new Date(`${activeDate}T00:00:00`);
  date.setDate(date.getDate() + delta);
  activeDate = toDateInputValue(date);
  renderAll();
}

function escapeCsv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const rows = [
    [
      "date",
      "progress_done",
      "progress_total",
      "daily_tasks",
      "today_tasks",
      "today_events",
      "projects",
      "memos",
      "learnings",
      "publishing_ops",
      "mail_morning_checked",
      "mail_noon_checked",
      "mail_night_checked",
      "dm_pending",
      "dm_handled",
      "did_today",
      "blocked_today",
      "tomorrow_plan",
    ],
  ];
  Object.entries(store)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([date, day]) => {
      ensureMetricDefaults(day);
      ensurePublishingOps(day);
      const tracked = [
        ...day.dailyTasks,
        ...day.todayTasks,
        ...day.projects,
        { done: day.metrics.mailMorningChecked },
        { done: day.metrics.mailNoonChecked },
        { done: day.metrics.mailNightChecked },
      ];
      rows.push([
        date,
        tracked.filter((item) => item.done).length,
        tracked.length,
        day.dailyTasks.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        day.todayTasks.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        asArray(day.todayEvents).map(formatEventLabel).join(" / "),
        day.projects.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        (day.memos || []).map((memo) => memo.text).join(" / "),
        (day.learnings || [])
          .map((learning) => [
            learning.date,
            learning.source,
            learning.title,
            learning.summaryLine,
            learning.intent,
            learning.learned,
            learning.useForSelf,
            learning.useForPublishing,
            learning.sakuraMemory,
            learning.tags,
            learning.memo,
            learning.url,
            learning.hook,
            learning.experiment,
            learning.intro,
          ].filter(Boolean).join(" | "))
          .join(" / "),
        Object.values(day.publishingOps || {}).filter(Boolean).join(" | "),
        day.metrics.mailMorningChecked ? "1" : "0",
        day.metrics.mailNoonChecked ? "1" : "0",
        day.metrics.mailNightChecked ? "1" : "0",
        day.metrics.dmPending,
        day.metrics.dmHandled,
        day.reflection.didToday,
        day.reflection.blockedToday,
        day.reflection.tomorrowPlan,
      ]);
    });
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `operation-dashboard-${toDateInputValue(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

arrangeDashboardUxSections();
bindEvents();
renderAll();
renderClock();
setInterval(renderClock, 1000);

// ===== さくらバックアップ形式（Phase 0 共通の封筒） =====
// 参照：さくらAI Phase 0 詳細設計書 / さくらLaboデータ辞書 v1
const BACKUP_FORMAT = "sakura-backup";
const BACKUP_APP_NAME = "operation-dashboard";
const BACKUP_SCHEMA_VERSION = 1;
const BACKUP_DICTIONARY_VERSION = "v1";
const BACKUP_KEYS = [
  STORAGE_KEY,
  LATER_STORAGE_KEY,
  PERSISTENT_MEMO_STORAGE_KEY,
  LATER_VIEW_STORAGE_KEY,
  CONVERSATION_FEEDBACK_STORAGE_KEY,
  CONVERSATION_IMPROVEMENTS_STORAGE_KEY,
  CONVERSATION_REFLECTIONS_STORAGE_KEY,
  CONVERSATION_CONTINUITY_STORAGE_KEY,
  CONVERSATION_RECOVERY_STORAGE_KEY,
  PERSONALITY_PROFILE_STORAGE_KEY,
  RELATIONSHIP_PROFILE_STORAGE_KEY,
  EMOTIONAL_RESONANCE_STORAGE_KEY,
  IDENTITY_PROFILE_STORAGE_KEY,
  GOAL_STATE_STORAGE_KEY,
  PRIORITY_STATE_STORAGE_KEY,
  DECISION_STATE_STORAGE_KEY,
  STRATEGY_STATE_STORAGE_KEY,
  ATTENTION_STATE_STORAGE_KEY,
  COGNITIVE_STATE_STORAGE_KEY,
  INTENT_STATE_STORAGE_KEY,
  TASK_PLAN_STATE_STORAGE_KEY,
  WORKFLOW_STATE_STORAGE_KEY,
  EXECUTION_DECISION_STORAGE_KEY,
  EXECUTION_STATE_STORAGE_KEY,
  EXECUTION_FEEDBACK_STORAGE_KEY,
  HEALTH_STATE_STORAGE_KEY,
  RECURRING_SCHEDULE_STORAGE_KEY,
  RECURRING_AUTO_ADD_LOG_STORAGE_KEY,
];

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function readFirstStoredJson(keys, fallback) {
  for (const key of keys) {
    const value = readStoredJson(key, null);
    if (value !== null) return value;
  }
  return fallback;
}

function createBackup() {
  const data = {};
  data[STORAGE_KEY] = readStoredJson(STORAGE_KEY, {});
  data[LATER_STORAGE_KEY] = readStoredJson(LATER_STORAGE_KEY, []);
  data[PERSISTENT_MEMO_STORAGE_KEY] = readStoredJson(PERSISTENT_MEMO_STORAGE_KEY, []);
  data[LATER_VIEW_STORAGE_KEY] = readStoredJson(LATER_VIEW_STORAGE_KEY, {});
  data[CONVERSATION_FEEDBACK_STORAGE_KEY] = readStoredJson(CONVERSATION_FEEDBACK_STORAGE_KEY, []);
  data[CONVERSATION_IMPROVEMENTS_STORAGE_KEY] = readStoredJson(CONVERSATION_IMPROVEMENTS_STORAGE_KEY, []);
  data[CONVERSATION_REFLECTIONS_STORAGE_KEY] = readStoredJson(CONVERSATION_REFLECTIONS_STORAGE_KEY, []);
  data[CONVERSATION_CONTINUITY_STORAGE_KEY] = readStoredJson(CONVERSATION_CONTINUITY_STORAGE_KEY, []);
  data[CONVERSATION_RECOVERY_STORAGE_KEY] = readStoredJson(CONVERSATION_RECOVERY_STORAGE_KEY, []);
  data[PERSONALITY_PROFILE_STORAGE_KEY] = readStoredJson(PERSONALITY_PROFILE_STORAGE_KEY, buildPersonalityProfile());
  data[RELATIONSHIP_PROFILE_STORAGE_KEY] = readStoredJson(RELATIONSHIP_PROFILE_STORAGE_KEY, buildRelationshipProfile());
  data[EMOTIONAL_RESONANCE_STORAGE_KEY] = readStoredJson(EMOTIONAL_RESONANCE_STORAGE_KEY, []);
  data[IDENTITY_PROFILE_STORAGE_KEY] = readStoredJson(IDENTITY_PROFILE_STORAGE_KEY, []);
  data[GOAL_STATE_STORAGE_KEY] = readStoredJson(GOAL_STATE_STORAGE_KEY, []);
  data[PRIORITY_STATE_STORAGE_KEY] = readStoredJson(PRIORITY_STATE_STORAGE_KEY, []);
  data[DECISION_STATE_STORAGE_KEY] = readStoredJson(DECISION_STATE_STORAGE_KEY, []);
  data[STRATEGY_STATE_STORAGE_KEY] = readStoredJson(STRATEGY_STATE_STORAGE_KEY, []);
  data[ATTENTION_STATE_STORAGE_KEY] = readStoredJson(ATTENTION_STATE_STORAGE_KEY, []);
  data[COGNITIVE_STATE_STORAGE_KEY] = readStoredJson(COGNITIVE_STATE_STORAGE_KEY, []);
  data[INTENT_STATE_STORAGE_KEY] = readStoredJson(INTENT_STATE_STORAGE_KEY, []);
  data[TASK_PLAN_STATE_STORAGE_KEY] = readStoredJson(TASK_PLAN_STATE_STORAGE_KEY, []);
  data[WORKFLOW_STATE_STORAGE_KEY] = readStoredJson(WORKFLOW_STATE_STORAGE_KEY, []);
  data[EXECUTION_DECISION_STORAGE_KEY] = readStoredJson(EXECUTION_DECISION_STORAGE_KEY, []);
  data[EXECUTION_STATE_STORAGE_KEY] = readStoredJson(EXECUTION_STATE_STORAGE_KEY, []);
  data[EXECUTION_FEEDBACK_STORAGE_KEY] = readStoredJson(EXECUTION_FEEDBACK_STORAGE_KEY, []);
  data[HEALTH_STATE_STORAGE_KEY] = readStoredJson(HEALTH_STATE_STORAGE_KEY, []);
  data[RECURRING_SCHEDULE_STORAGE_KEY] = readStoredJson(RECURRING_SCHEDULE_STORAGE_KEY, []);
  data[RECURRING_AUTO_ADD_LOG_STORAGE_KEY] = readStoredJson(RECURRING_AUTO_ADD_LOG_STORAGE_KEY, {});
  return {
    format: BACKUP_FORMAT,
    app: BACKUP_APP_NAME,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    dictionaryVersion: BACKUP_DICTIONARY_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

function backupFilename(autoBeforeImport) {
  const date = toDateInputValue(new Date());
  return autoBeforeImport
    ? `${BACKUP_APP_NAME}-backup-auto-before-import-${date}.json`
    : `${BACKUP_APP_NAME}-backup-${date}.json`;
}

function downloadJson(value, filename) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function validateBackup(parsed) {
  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "JSONファイルとして読み取れませんでした。" };
  }
  if (parsed.format !== BACKUP_FORMAT) {
    return { ok: false, error: "さくらバックアップ形式のファイルではありません。" };
  }
  if (parsed.app !== BACKUP_APP_NAME) {
    return {
      ok: false,
      error: `これは「${parsed.app ?? "不明"}」のバックアップです。生活・発信ダッシュボードには取り込めません。`,
    };
  }
  if (typeof parsed.data !== "object" || parsed.data === null) {
    return { ok: false, error: "ファイルにデータが入っていません。" };
  }
  return { ok: true, backup: parsed };
}

function handleExportBackup() {
  downloadJson(createBackup(), backupFilename(false));
}

async function handleImportBackupFile(file) {
  let parsed;
  try {
    parsed = JSON.parse(await file.text());
  } catch (error) {
    alert("JSONファイルとして読み取れませんでした。");
    return;
  }

  const result = validateBackup(parsed);
  if (!result.ok) {
    alert(result.error);
    return;
  }

  const incomingStore = result.backup.data[STORAGE_KEY];
  if (typeof incomingStore !== "object" || incomingStore === null || Array.isArray(incomingStore)) {
    alert("ファイルにデータが入っていません。");
    return;
  }

  // 取り込み前に、今のデータを自動でバックアップ
  downloadJson(createBackup(), backupFilename(true));

  const currentStore = readStoredJson(STORAGE_KEY, {});
  const currentLater = readStoredJson(LATER_STORAGE_KEY, []);
  const incomingLater = Array.isArray(result.backup.data[LATER_STORAGE_KEY])
    ? result.backup.data[LATER_STORAGE_KEY]
    : [];

  const accepted = confirm(
    `今のデータ（記録${Object.keys(currentStore).length}日分・あとで見る${currentLater.length}件）を、\n` +
      `ファイルの内容（記録${Object.keys(incomingStore).length}日分・あとで見る${incomingLater.length}件）で置き換えます。\n` +
      "直前のデータは自動バックアップとしてダウンロードされています。\nよろしいですか？",
  );
  if (!accepted) return;

  BACKUP_KEYS.forEach((key) => {
    if (key in result.backup.data) {
      localStorage.setItem(key, JSON.stringify(result.backup.data[key]));
    }
  });

  alert("取り込みが完了しました。画面を読み込み直します。");
  location.reload();
}

// ===== さくらスナップショット（Phase 1） =====
// 参照：さくらAI Phase 1 詳細設計書

function loadSnapshotSettings() {
  const stored = readStoredJson(SNAPSHOT_SETTINGS_KEY, {});
  return { ...snapshotSettingDefaults, ...stored };
}

function saveSnapshotSettings(settings) {
  localStorage.setItem(SNAPSHOT_SETTINGS_KEY, JSON.stringify(settings));
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function flattenRecordArrays(value) {
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap((entry) => asArray(entry));
}

function daysBetween(fromIso, now) {
  const from = new Date(fromIso).getTime();
  if (Number.isNaN(from)) return null;
  return Math.max(0, Math.floor((now.getTime() - from) / 86400000));
}

function dateKeyDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateInputValue(date);
}

function buildSakuraSnapshot(mode) {
  const settings = loadSnapshotSettings();
  const now = new Date();
  const fromKey = dateKeyDaysAgo(SNAPSHOT_DETAIL_DAYS - 1);
  const toKey = toDateInputValue(now);
  const logFromKey = dateKeyDaysAgo(SNAPSHOT_LOG_DAYS - 1);

  // --- ダッシュボード：直近7日分の詳細＋それ以前は日数のみ ---
  const fullStore = readStoredJson(STORAGE_KEY, {});
  const recentDays = {};
  let olderDaysCount = 0;
  Object.keys(fullStore)
    .sort()
    .forEach((dateKey) => {
      if (dateKey < fromKey) {
        olderDaysCount += 1;
        return;
      }
      const day = deepCopy(fullStore[dateKey]);
      if (!settings.reflection) {
        day.reflection = null;
      }
      if (!settings.mailDmCounts && day.metrics) {
        ["dmPending", "dmHandled", "mailUnread", "mailProcessed"].forEach((key) => {
          if (key in day.metrics) day.metrics[key] = null;
        });
      }
      recentDays[dateKey] = day;
    });

  const laterItems = asArray(readStoredJson(LATER_STORAGE_KEY, [])).filter((item) => !item.done);
  const persistentMemos = asArray(readStoredJson(PERSISTENT_MEMO_STORAGE_KEY, []));
  const learningLogItems = asArray(readStoredJson(LEARNING_LOG_STORAGE_KEY, []));
  const conversationFeedbackItems = asArray(readStoredJson(CONVERSATION_FEEDBACK_STORAGE_KEY, []));
  const conversationImprovementItems = asArray(readStoredJson(CONVERSATION_IMPROVEMENTS_STORAGE_KEY, []));
  const conversationReflectionItems = asArray(readStoredJson(CONVERSATION_REFLECTIONS_STORAGE_KEY, []));
  const conversationContinuityItems = asArray(readStoredJson(CONVERSATION_CONTINUITY_STORAGE_KEY, []));
  const conversationRecoveryItems = asArray(readStoredJson(CONVERSATION_RECOVERY_STORAGE_KEY, []));
  const savedPersonalityProfile = readStoredJson(PERSONALITY_PROFILE_STORAGE_KEY, buildPersonalityProfile());
  const savedRelationshipProfile = readStoredJson(RELATIONSHIP_PROFILE_STORAGE_KEY, buildRelationshipProfile());
  const emotionalResonanceItems = asArray(readStoredJson(EMOTIONAL_RESONANCE_STORAGE_KEY, []));
  const identityProfileItems = asArray(readStoredJson(IDENTITY_PROFILE_STORAGE_KEY, []));
  const goalStateItems = asArray(readStoredJson(GOAL_STATE_STORAGE_KEY, []));
  const priorityStateItems = asArray(readStoredJson(PRIORITY_STATE_STORAGE_KEY, []));
  const decisionStateItems = asArray(readStoredJson(DECISION_STATE_STORAGE_KEY, []));
  const strategyStateItems = asArray(readStoredJson(STRATEGY_STATE_STORAGE_KEY, []));
  const attentionStateItems = asArray(readStoredJson(ATTENTION_STATE_STORAGE_KEY, []));
  const cognitiveStateItems = asArray(readStoredJson(COGNITIVE_STATE_STORAGE_KEY, []));
  const intentStateItems = asArray(readStoredJson(INTENT_STATE_STORAGE_KEY, []));
  const taskPlanStateItems = asArray(readStoredJson(TASK_PLAN_STATE_STORAGE_KEY, []));
  const workflowStateItems = asArray(readStoredJson(WORKFLOW_STATE_STORAGE_KEY, []));
  const executionDecisionItems = asArray(readStoredJson(EXECUTION_DECISION_STORAGE_KEY, []));
  const executionStateItems = asArray(readStoredJson(EXECUTION_STATE_STORAGE_KEY, []));
  const executionFeedbackItems = asArray(readStoredJson(EXECUTION_FEEDBACK_STORAGE_KEY, []));
  const healthStateItems = asArray(readStoredJson(HEALTH_STATE_STORAGE_KEY, []));
  const latestHealthState = latestHealthStateFrom(healthStateItems);
  const healthSummary = buildHealthSummary(latestHealthState);
  const healthInsight = buildHealthInsight(
    [...healthStateItems]
      .sort((a, b) =>
        String(b.date || b.updatedAt || b.createdAt).localeCompare(String(a.date || a.updatedAt || a.createdAt)),
      )
      .slice(0, 7),
  );
  const sortedHealthItems = [...healthStateItems]
    .sort((a, b) =>
      String(b.date || b.updatedAt || b.createdAt).localeCompare(String(a.date || a.updatedAt || a.createdAt)),
    );
  const healthTrend = buildHealthTrend(sortedHealthItems.slice(0, 14));
  const healthContext = buildHealthContext(latestHealthState, healthInsight, healthTrend);
  const healthAwareConversation = buildHealthAwareConversation(healthContext);
  const learningSummary = buildLearningSummary(learningLogItems);
  const learningHint = buildLearningHint(learningSummary);
  const learningConfidence = buildLearningConfidence(learningSummary, learningHint);
  const savedMemoryStore = readStoredJson(MEMORY_STORE_STORAGE_KEY, {});
  const savedShortMemory = asArray(savedMemoryStore?.shortMemory);
  const latestRecommendationMemory = [...savedShortMemory]
    .filter((memoryItem) => memoryItem.type === "recommendation")
    .sort((a, b) => memoryUpdatedTime(b) - memoryUpdatedTime(a))[0];
  const latestRecommendation = latestRecommendationMemory ? {
    type: asArray(latestRecommendationMemory.tags).find((tag) => tag !== "recommendation") || "",
    title: latestRecommendationMemory.title || "",
    message: latestRecommendationMemory.summary || "",
    actionText: "",
  } : null;
  const healthAwareRecommendation = buildHealthAwareRecommendation(latestRecommendation, healthContext);
  const memory = {
    shortMemory: savedShortMemory,
    projectMemory: ensureDefaultProjectMemory(asArray(savedMemoryStore?.projectMemory)),
  };
  memory.retrieved = getRelevantMemories(
    {
      tags: asArray(latestRecommendationMemory?.tags),
      recommendationType: asArray(latestRecommendationMemory?.tags).find((tag) => tag !== "recommendation") || "",
    },
    { memorySource: memory },
  );
  memory.consolidation = buildMemoryConsolidation(memory);
  const brain = {
    memoryContext: buildBrainMemoryContext(
      {
        tags: asArray(latestRecommendationMemory?.tags),
        recommendationType: asArray(latestRecommendationMemory?.tags).find((tag) => tag !== "recommendation") || "",
      },
      memory,
    ),
  };
  const conversationContext = buildConversationContext({
      project: brain.memoryContext.project,
      recommendation: latestRecommendation,
      explanation: null,
      learningHint,
      learningConfidence,
      memoryContext: brain.memoryContext,
      healthAwareConversation,
      todayTasks: asArray(fullStore[toKey]?.todayTasks),
      todayEvents: asArray(fullStore[toKey]?.todayEvents),
    });
  const conversation = {
    context: conversationContext,
    replyPlan: buildReplyPlan(conversationContext),
    feedback: deepCopy(conversationFeedbackItems),
    improvements: deepCopy(conversationImprovementItems),
    reflections: deepCopy(conversationReflectionItems),
    continuity: deepCopy(conversationContinuityItems),
    recovery: deepCopy(conversationRecoveryItems),
    healthAware: deepCopy(healthAwareConversation),
    healthAwareRecommendation: deepCopy(healthAwareRecommendation),
  };
  const executiveSummary = buildExecutiveSummary(
    latestIntentStateFrom(intentStateItems),
    latestTaskPlanStateFrom(taskPlanStateItems),
    latestWorkflowStateFrom(workflowStateItems),
    latestExecutionDecisionFrom(executionDecisionItems),
    latestExecutionStateFrom(executionStateItems),
    latestExecutionFeedbackFrom(executionFeedbackItems),
    latestHealthState,
    healthContext,
  );
  const adaptiveIntelligence = buildAdaptiveIntelligence({
    conversationContext,
    replyPlan: conversation.replyPlan,
    profile: savedPersonalityProfile,
    relationship: savedRelationshipProfile,
    resonance: latestEmotionalResonanceFrom(emotionalResonanceItems),
    identity: latestIdentityProfileFrom(identityProfileItems),
    cognitive: latestCognitiveStateFrom(cognitiveStateItems),
    intent: latestIntentStateFrom(intentStateItems),
    taskPlan: latestTaskPlanStateFrom(taskPlanStateItems),
    workflow: latestWorkflowStateFrom(workflowStateItems),
    executionDecision: latestExecutionDecisionFrom(executionDecisionItems),
    execution: latestExecutionStateFrom(executionStateItems),
    feedback: latestExecutionFeedbackFrom(executionFeedbackItems),
    health: latestHealthState,
    healthInsight,
    healthTrend,
    healthContext,
    healthAwareConversation,
    healthAwareRecommendation,
    executiveSummary,
    recovery: latestConversationRecoveryFrom(conversationRecoveryItems),
  });
  conversation.reply = buildReply(
    conversation.replyPlan,
    conversationImprovementHintsFrom(conversationImprovementItems, 3),
    latestConversationReflectionFrom(conversationReflectionItems),
    latestConversationContinuityFrom(conversationContinuityItems),
    latestConversationRecoveryFrom(conversationRecoveryItems),
    savedPersonalityProfile,
    savedRelationshipProfile,
    latestEmotionalResonanceFrom(emotionalResonanceItems),
    latestIdentityProfileFrom(identityProfileItems),
    latestGoalStateFrom(goalStateItems),
    latestPriorityStateFrom(priorityStateItems),
    latestDecisionStateFrom(decisionStateItems),
    latestStrategyStateFrom(strategyStateItems),
    latestAttentionStateFrom(attentionStateItems),
    latestCognitiveStateFrom(cognitiveStateItems),
    latestIntentStateFrom(intentStateItems),
    latestTaskPlanStateFrom(taskPlanStateItems),
    latestWorkflowStateFrom(workflowStateItems),
    latestExecutionDecisionFrom(executionDecisionItems),
    latestExecutionStateFrom(executionStateItems),
    latestExecutionFeedbackFrom(executionFeedbackItems),
    latestHealthState,
    healthInsight,
    healthTrend,
    healthContext,
    healthAwareConversation,
    healthAwareRecommendation,
    executiveSummary,
    adaptiveIntelligence,
  );

  // --- Discovery-Labo：種と発生源は全件 ---
  const discoveries = deepCopy(asArray(readStoredJson(EXTERNAL_APP_KEYS.discoveries, [])));
  const discoverySources = asArray(readStoredJson(EXTERNAL_APP_KEYS.discoverySources, []));

  // --- 交流ログ：直近30日＋「また見たい：はい」は期間外でも全件 ---
  const koryuAll = asArray(readStoredJson(EXTERNAL_APP_KEYS.koryu, []));
  const koryuEntries = deepCopy(
    koryuAll.filter((entry) => entry.date >= logFromKey || entry.revisit === "はい"),
  );
  if (!settings.feelings) {
    koryuEntries.forEach((entry) => {
      ["tension", "impression", "happyMoment"].forEach((key) => {
        if (key in entry) entry[key] = null;
      });
    });
  }

  // --- 発信観察：直近30日＋nextActionが残っているものは期間外でも全件 ---
  const hasshinAll = asArray(readStoredJson(EXTERNAL_APP_KEYS.hasshin, []));
  const hasshinEntries = deepCopy(
    hasshinAll.filter(
      (entry) => entry.date >= logFromKey || (entry.nextAction || "").trim() !== "",
    ),
  );

  // --- Substack-Labo：emailListだけは構造ごと除外（常に） ---
  const substackRaw = readFirstStoredJson(
    [EXTERNAL_APP_KEYS.substack, EXTERNAL_APP_KEYS.substackLegacy],
    null,
  );
  let substackData = null;
  if (substackRaw && typeof substackRaw === "object") {
    if (substackRaw.writings || substackRaw.articleReviews || substackRaw.quickMemos) {
      substackData = {
        writings: deepCopy(substackRaw.writings ?? { notes: [], articles: [] }),
        people: deepCopy(substackRaw.people ?? { follows: [], followers: [] }),
        articleReviews: deepCopy(substackRaw.articleReviews ?? []),
        ideas: deepCopy(substackRaw.ideas ?? []),
        quickMemos: deepCopy(substackRaw.quickMemos ?? []),
      };
    } else {
      substackData = {
        content: deepCopy(substackRaw.content ?? { notes: [], articles: [], posts: [] }),
        people: deepCopy(substackRaw.people ?? { following: [], followers: [] }),
        ideas: deepCopy(substackRaw.ideas ?? { ideas: [], quick: [] }),
      };
    }
  }

  // --- ストック管理：スイッチがオンのときだけ ---
  const stockItems = settings.stock
    ? deepCopy(asArray(readStoredJson(EXTERNAL_APP_KEYS.stock, [])))
    : null;

  // --- summary（計算済みの要約） ---
  const todayRecord = fullStore[toKey];
  let todayProgress = "0/0";
  let todayEventCount = 0;
  if (todayRecord) {
    const tracked = [
      ...(todayRecord.dailyTasks || []),
      ...(todayRecord.todayTasks || []),
    ].map((task) => Boolean(task.done));
    todayEventCount = asArray(todayRecord.todayEvents).length;
    const metrics = todayRecord.metrics || {};
    tracked.push(
      Boolean(metrics.mailMorningChecked),
      Boolean(metrics.mailNoonChecked),
      Boolean(metrics.mailNightChecked),
      Boolean(metrics.dmPreviousDone),
    );
    todayProgress = `${tracked.filter(Boolean).length}/${tracked.length}`;
  }

  const fermenting = discoveries.filter((seed) => seed.status === "発酵中");
  const fermentingDays = fermenting
    .map((seed) => (seed.statusChangedAt ? daysBetween(seed.statusChangedAt, now) : null))
    .filter((value) => value !== null);

  const revisitNames = new Set(
    koryuAll.filter((entry) => entry.revisit === "はい").map((entry) => entry.name),
  );

  let writingInProgress = 0;
  if (substackData) {
    const writingItems = substackData.content
      ? flattenRecordArrays(substackData.content)
      : [
          ...asArray(substackData.writings?.notes),
          ...asArray(substackData.writings?.articles),
        ];
    writingInProgress = writingItems.filter((item) => item.status === "執筆中").length;
  }

  const openNextActions = hasshinAll.filter(
    (entry) => (entry.nextAction || "").trim() !== "",
  ).length;

  return {
    format: SNAPSHOT_FORMAT,
    snapshotVersion: SNAPSHOT_VERSION,
    dictionaryVersion: SNAPSHOT_DICTIONARY_VERSION,
    createdAt: now.toISOString(),
    mode,
    period: { detailDays: SNAPSHOT_DETAIL_DAYS, from: fromKey, to: toKey },
    privacy: {
      reflection: settings.reflection,
      feelings: settings.feelings,
      mailDmCounts: settings.mailDmCounts,
      stock: settings.stock,
    },
    summary: {
      todayProgress,
      todayEventCount,
      seedsFermenting: fermenting.length,
      longestFermentingDays: fermentingDays.length ? Math.max(...fermentingDays) : null,
      revisitPeople: revisitNames.size,
      writingInProgress,
      openNextActions,
    },
    brain,
    personality: {
      profile: deepCopy(savedPersonalityProfile),
      relationship: deepCopy(savedRelationshipProfile),
      emotionalResonance: deepCopy(emotionalResonanceItems),
      identity: deepCopy(identityProfileItems),
    },
    cognitive: {
      goal: deepCopy(goalStateItems),
      priority: deepCopy(priorityStateItems),
      decision: deepCopy(decisionStateItems),
      strategy: deepCopy(strategyStateItems),
      attention: deepCopy(attentionStateItems),
      state: deepCopy(cognitiveStateItems),
    },
    executive: {
      intent: deepCopy(intentStateItems),
      taskPlan: deepCopy(taskPlanStateItems),
      workflow: deepCopy(workflowStateItems),
      executionDecision: deepCopy(executionDecisionItems),
      execution: deepCopy(executionStateItems),
      executionFeedback: deepCopy(executionFeedbackItems),
      summary: deepCopy(executiveSummary),
    },
    intelligence: {
      adaptive: deepCopy(adaptiveIntelligence),
    },
    health: {
      state: deepCopy(healthStateItems),
      latest: deepCopy(latestHealthState),
      summary: deepCopy(healthSummary),
      insight: deepCopy(healthInsight),
      trend: deepCopy(healthTrend),
      context: deepCopy(healthContext),
      awareConversation: deepCopy(healthAwareConversation),
      awareRecommendation: deepCopy(healthAwareRecommendation),
    },
    conversation,
    apps: {
      "operation-dashboard": {
        schemaVersion: 1,
        data: { recentDays, olderDaysCount, laterItems, persistentMemos, learningLog: learningLogItems, learningSummary, learningHint, learningConfidence, memory },
      },
      "discovery-labo": {
        schemaVersion: 1,
        data: { discoveries, sources: discoverySources },
      },
      "koryu-log-labo": { schemaVersion: 1, data: { entries: koryuEntries } },
      "hasshin-kansatsu-labo": { schemaVersion: 1, data: { entries: hasshinEntries } },
      "substack-labo": substackData ? { schemaVersion: 1, data: substackData } : null,
      "stock-labo": stockItems ? { schemaVersion: 1, data: { items: stockItems } } : null,
    },
  };
}

function snapshotFilename(mode) {
  const date = new Date().toISOString().slice(0, 10);
  return `sakura-snapshot-${mode}-${date}.json`;
}

async function copySnapshotText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // HTTPのローカル確認環境などではClipboard APIが拒否されるため、下の旧式コピーに落とす。
    }
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.append(field);
  field.select();
  const copied = document.execCommand?.("copy");
  field.remove();
  if (!copied) throw new Error("copy failed");
}

function renderSnapshotPanel() {
  const settings = loadSnapshotSettings();
  const reflection = $("#snapReflection");
  if (!reflection) return;
  reflection.checked = settings.reflection;
  $("#snapFeelings").checked = settings.feelings;
  $("#snapMailDm").checked = settings.mailDmCounts;
  $("#snapStock").checked = settings.stock;
  $("#snapModeMorning").classList.toggle("active", snapshotMode === "morning");
  $("#snapModeNight").classList.toggle("active", snapshotMode === "night");
  const label = $("#snapshotLastCreated");
  if (settings.lastCreatedAt) {
    const time = new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(settings.lastCreatedAt));
    label.textContent = `最後に作成：${time}（${settings.lastMode === "morning" ? "朝" : "夜"}）`;
  } else {
    label.textContent = "まだ作成していません";
  }
}

function rememberSnapshotCreated(mode) {
  const settings = loadSnapshotSettings();
  settings.lastCreatedAt = new Date().toISOString();
  settings.lastMode = mode;
  saveSnapshotSettings(settings);
  renderSnapshotPanel();
}

function bindSnapshotPanel() {
  if (!$("#snapReflection")) return;
  const switchMap = [
    ["#snapReflection", "reflection"],
    ["#snapFeelings", "feelings"],
    ["#snapMailDm", "mailDmCounts"],
    ["#snapStock", "stock"],
  ];
  switchMap.forEach(([selector, key]) => {
    $(selector).addEventListener("change", (event) => {
      const settings = loadSnapshotSettings();
      settings[key] = event.target.checked;
      saveSnapshotSettings(settings);
    });
  });
  $("#snapModeMorning").addEventListener("click", () => {
    snapshotMode = "morning";
    renderSnapshotPanel();
  });
  $("#snapModeNight").addEventListener("click", () => {
    snapshotMode = "night";
    renderSnapshotPanel();
  });
  $("#snapshotDownload").addEventListener("click", () => {
    const snapshot = buildSakuraSnapshot(snapshotMode);
    downloadJson(snapshot, snapshotFilename(snapshotMode));
    rememberSnapshotCreated(snapshotMode);
  });
  $("#snapshotCopy").addEventListener("click", async () => {
    const snapshot = buildSakuraSnapshot(snapshotMode);
    const text = JSON.stringify(snapshot, null, 2);
    try {
      await copySnapshotText(text);
      alert(`クリップボードにコピーしました（約${Math.round(text.length / 1000)}千文字）。`);
      rememberSnapshotCreated(snapshotMode);
    } catch (error) {
      alert("コピーできませんでした。「ダウンロード」をお使いください。");
    }
  });
  renderSnapshotPanel();
}
