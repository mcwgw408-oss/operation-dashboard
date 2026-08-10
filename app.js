const STORAGE_KEY = "operation-dashboard-v1";
const LATER_STORAGE_KEY = "operation-dashboard-later-v1";
const LATER_VIEW_STORAGE_KEY = "operation-dashboard-later-view-v1";
const PERSISTENT_MEMO_STORAGE_KEY = "operation-dashboard-persistent-memos-v1";
const READING_QUEUE_STORAGE_KEY = "operation-dashboard-reading-queue-v2";
const READING_NOTES_STORAGE_KEY = "operation-dashboard-reading-notes-v1";
const LEARNING_ASSETS_STORAGE_KEY = "operation-dashboard-learning-assets-v1";
const SUBSTA_VILLAGE_STORAGE_KEY = "operation-dashboard-substa-village-v1";
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
const OPERATION_EXPERIMENT_STORAGE_KEY = "operation-dashboard-experiments-v1";
const X_EXPERIMENT_LOG_STORAGE_KEY = "operation-dashboard-x-experiment-logs-v1";
const PUBLISHING_SEEDS_STORAGE_KEY = "operation-dashboard-publishing-seeds-v1";
const PUBLISHING_SEED_CANDIDATES_STORAGE_KEY = "operation-dashboard-publishing-seed-candidates-v1";
const CUSTOM_DAILY_TASKS_STORAGE_KEY = "operation-dashboard-custom-daily-tasks-v1";
const DAILY_TASK_ORDER_STORAGE_KEY = "operation-dashboard-daily-task-order-v1";
const DELETED_DAILY_TASKS_STORAGE_KEY = "operation-dashboard-deleted-daily-tasks-v1";
const AFTER_TEN_MODE_OPTIONS_STORAGE_KEY = "operation-dashboard-after-ten-mode-options-v1";
const AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY = "operation-dashboard-after-ten-mode-deleted-options-v1";

// ===== さくらスナップショット（Phase 1）の定数 =====
const SNAPSHOT_FORMAT = "sakura-snapshot";
const SNAPSHOT_VERSION = 1;
const SNAPSHOT_DICTIONARY_VERSION = "v1.4";
const SNAPSHOT_SETTINGS_KEY = "sakura-snapshot-settings-v1";
const SNAPSHOT_DETAIL_DAYS = 7;
const SNAPSHOT_LOG_DAYS = 30;
const LATER_INITIAL_DISPLAY_LIMIT = 10;
const MEMORY_LIBRARY_PAGE_SIZE = 10;
const DAILY_TASK_ORDER_BASE_DATE = "2026-07-15";

const EXTERNAL_APP_KEYS = {
  discoveries: "discovery-labo-discoveries",
  discoverySources: "discovery-labo-entry-sources-v1",
  koryu: "koryu-log-labo-entries",
  hasshin: "hasshin-kansatsu-labo-entries",
  substack: "substack-labo-workspace-v2",
  substackLegacy: "substack-labo-store",
  stock: "stock-labo-items-v1",
};
const OPERATION_COCKPIT_STORAGE_KEY = "operation-cockpit-v1";

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
const DEFAULT_AFTER_TEN_MODE_OPTIONS = ["Seed", "読書", "Brain", "生活", "発信"];
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
const X_EXPERIMENT_POST_TYPES = [
  "共感",
  "気づき",
  "問いかけ",
  "学び",
  "体験談",
  "記事からの派生",
  "告知",
  "その他",
];
const X_EXPERIMENT_BRANDS = ["ブランドA", "ブランドB", "その他"];
const X_EXPERIMENT_STATUSES = ["💡 アイデア", "🛠 準備中", "🧪 実験中", "📊 検証中", "✅ 検証完了"];
const X_EXPERIMENT_TYPES = ["投稿仮説", "導線検証", "ブランド検証", "反応観察", "継続運用", "その他"];
const PUBLISHING_SEED_STATUSES = ["種", "記事化", "保留"];
const PUBLISHING_SEED_CANDIDATE_STATUSES = ["未確認", "Seed化", "見送り"];
const LEARNING_ASSET_STATUSES = ["知識化待ち", "Codex抽出済み", "実践待ち", "コンテンツ化待ち", "資産化完了"];
const LEARNING_ASSET_LEGACY_STATUS_MAP = {
  "学び待ち": "知識化待ち",
  "対話済み": "Codex抽出済み",
  "実験待ち": "実践待ち",
  "記事化待ち": "コンテンツ化待ち",
};
const LEARNING_ASSET_SOURCES = ["本", "PDF", "Kindle Unlimited", "Brain", "ポッドキャスト", "YouTube", "ライブ配信", "人との会話", "その他"];
const LEARNING_ASSET_PUBLISHING_PLACES = ["Substack", "note", "Podcast", "ライブ配信", "WordPress", "X", "Notes", "Kindle", "Brain"];
const LEARNING_ASSET_CONNECTIONS = ["発信", "AI", "ブランディング", "マーケティング", "心理", "習慣", "信頼構築", "コンテンツ化", "暮らし", "回復", "OS", "その他"];
const FIRST_KNOWLEDGE_SAMPLE_TITLE = "AI時代の1行コンセプト設計";
const SMALL_BIZ_SAMPLE_TITLE = "AI時代の小さく始めるスモビジ実践書";
const PSYCHOLOGY_SAMPLE_TITLE = "人生とビジネスに効く「10の心理学」実践書";
const TREASURE_SAMPLE_TITLE = "AI時代の宝探し実践書";
const IDEA_SAMPLE_TITLE = "令和AI時代のアイデア実践書";
const STORY_PROFILE_SAMPLE_TITLE = "AI時代の自己紹介・発信を物語に変える実践書";
const CONCEPT_DESIGN_SAMPLE_TITLE = "令和版・コンセプト設計 実践書";
const VALUE_OS_SAMPLE_TITLE = "令和版 価値で選ばれる思考OS実践書";
const ACTION_PROFILE_SAMPLE_TITLE = "行動を生む自己紹介 実践書";
const COPY_TARGET_SAMPLE_TITLE = "売れる文章は接点で決まる 商品×ターゲット設計 実践書";
const TRUST_CHARISMA_SAMPLE_TITLE = "信頼で選ばれるカリスマ設計実践書";
const THREE_WEEK_FUNNEL_SAMPLE_TITLE = "3週間で参加者を集める発信導線実践書";
const SNS_TRUST_ASSET_SAMPLE_TITLE = "SNS資産を本の代わりにする信頼導線実践書";
const SELLING_COPYWRITING_SAMPLE_TITLE = "売れるコピーライティング実践書";
const FORBIDDEN_WORDS_SAMPLE_TITLE = "挑戦を止める7つの禁止コトバ 実践書";
const TWELVE_QUESTIONS_SAMPLE_TITLE = "ピンチを行動に変える12の質問 実践書";
const SOCIAL_CONTRIBUTION_SAMPLE_TITLE = "社会貢献を仕事にする実践書";
const COMMUNITY_VILLAGE_SAMPLE_TITLE = "また来たくなる村 コミュニティづくり実践書";
const MARKETING_EQUATION_SAMPLE_TITLE = "3つの数字で理解するマーケティングの方程式";
const READING_LABO_TEMPLATE = `このPDFは、本の内容を理解・整理する目的で使用します。

私は本の要約が欲しいわけではありません。
今後の発信活動や仕事に活かせる知識だけを、できるだけ実践的な形で整理してください。

本の内容をそのまま並べるのではなく、「この本から何を活用できるか」という視点でまとめてください。

出力してほしい内容:
Version 1: 1冊を最大限活用するための整理
1. この本の要点
2. 発信活動に役立つ内容
3. 私の活動への活かし方
4. Substack初心者向けに応用できること
5. AI活用
6. コンテンツ化
7. 明日から実践できること
8. 名言・印象に残る考え方
9. 80:20分析
10. 優先順位
11. 今後読みたい本とのつながり

Version 2: 知識ベースを育てるための整理
12. 知識タグ
この本から得られる知識をタグ化してください。
例: 発信、マーケティング、AI、ブランディング、心理、習慣、セールス、コミュニティ、ライティング

13. 他の本と統合しやすい形
この本だけで完結するのではなく、あとから他の本と比較・統合できるように整理してください。

14. 重複しそうな内容
他の本でも出てきそうな考え方を分けてください。

15. オリジナルな内容
この本にしかない考え方があれば教えてください。

16. 知識ベース登録用
最後に以下の形式でまとめてください。

知識名：
概要：
活用場面：
初心者向け説明：
記事アイデア：
Podcastアイデア：
AI活用：
タグ：

ルール:
- 本の内容をそのまま長く要約しない
- 活動に活かせる内容を優先する
- 実践できる内容を重視する
- 具体例を入れる
- 初心者にも説明できるレベルまで噛み砕く
- 知識ではなく行動に変換する
- 本単位で閉じず、複数の本やPodcast、ライブ、コメント、自分の実験結果と統合しやすい形にする
- 他の本でも共通して出てきそうな考え方と、この本ならではの考え方を分ける
- 後から検索・横断比較しやすいキーワードを残す
- 最初の1冊目はテンプレート実験として扱い、2冊目以降で改善できる形にする`;
const X_EXPERIMENT_MEDIA = {
  "ブランドA": ["Substack", "Substack Notes", "note（回復・AI・暮らし）", "X", "WordPress", "Live"],
  "ブランドB": ["note（Substack初心者向け）"],
  "その他": [],
};

const xExperimentFormFields = {
  postDate: "#xExperimentPostDate",
  postTime: "#xExperimentPostTime",
  postContent: "#xExperimentPostContent",
  postUrl: "#xExperimentPostUrl",
  postType: "#xExperimentPostType",
  hypothesis: "#xExperimentHypothesis",
  experiment: "#xExperimentExperiment",
  resultMemo: "#xExperimentResultMemo",
  insight: "#xExperimentInsight",
  nextHypothesis: "#xExperimentNextHypothesis",
  impressions: "#xExperimentImpressions",
  engagements: "#xExperimentEngagements",
  detailClicks: "#xExperimentDetailClicks",
  profileAccesses: "#xExperimentProfileAccesses",
  linkClicks: "#xExperimentLinkClicks",
};

const activityLogFields = {
  todayStep: "#activityTodayStep",
  startSubstackSubscribers: "#activityStartSubstackSubscribers",
  startSubstackFollowers: "#activityStartSubstackFollowers",
  startNoteFollowers: "#activityStartNoteFollowers",
  startExtraMetrics: "#activityStartExtraMetrics",
  endSubstackSubscribers: "#activityEndSubstackSubscribers",
  endSubstackFollowers: "#activityEndSubstackFollowers",
  endNoteFollowers: "#activityEndNoteFollowers",
  endExtraMetrics: "#activityEndExtraMetrics",
  actions: "#activityActions",
  intent: "#activityIntent",
  reactions: "#activityReactions",
  insight: "#activityInsight",
  tomorrowTrial: "#activityTomorrowTrial",
  lifeLog: "#activityLifeLog",
};

let activeDate = toDateInputValue(new Date());
let store = loadStore();
let customDailyTasks = loadCustomDailyTasks();
saveCustomDailyTasks();
let customAfterTenModeOptions = loadCustomAfterTenModeOptions();
let deletedAfterTenModeOptions = loadDeletedAfterTenModeOptions();
let deletedDailyTasks = loadDeletedDailyTasks();
saveDeletedDailyTasks();
let dailyTaskOrder = loadDailyTaskOrder();
let laterItems = loadLaterItems();
let showDoneLater = loadShowDoneLater();
let autoDedupeLater = loadAutoDedupeLater();
let laterSortOrder = loadLaterSortOrder();
let laterSearchQuery = "";
let laterVisibleLimit = LATER_INITIAL_DISPLAY_LIMIT;
let persistentMemos = loadPersistentMemos();
let persistentMemoSearchQuery = "";
let readingQueue = [];
let readingNotes = loadReadingNotes();
let readingNoteSearchQuery = "";
let editingReadingNoteId = "";
let learningAssets = loadLearningAssets();
let substaVillageStore = loadSubstaVillageStore();
let editingSubstaVillageLogId = "";
let learningAssetSearchQuery = "";
let learningAssetStatusFilter = "all";
let editingLearningAssetId = "";
let learningSearchQuery = "";
let learningGlobalSearchQuery = "";
let learningLog = loadLearningLog();
let memoryStore = loadMemoryStore();
let memoryLibrarySearchQuery = "";
let memoryLibraryTypeFilter = "all";
let memoryLibraryVisibleLimit = MEMORY_LIBRARY_PAGE_SIZE;
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
let operationExperimentStore = loadOperationExperimentStore();
let xExperimentLogs = loadXExperimentLogs();
let publishingSeeds = loadPublishingSeeds();
let publishingSeedStatusFilter = "all";
let publishingSeedCandidates = loadPublishingSeedCandidates();
let publishingSeedCandidateStatusFilter = "all";
let activePublishingSeedCandidateId = "";
let editingPublishingSeedCandidateId = "";
let publishingSeedActiveView = "news";
let editingPublishingSeedId = "";
let mergingPublishingSeedId = "";
linkPublishingSeedRecords();
let editingXExperimentId = "";
let activeXExperimentDetailId = "";
let savingXExperiment = false;
let xExperimentFilters = {
  brand: "all",
  status: "all",
  experimentType: "all",
};
let activePageEntry = "";
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
    completed: false,
    priority: false,
  };
}

function isItemCompleted(item) {
  return Boolean(item?.done || item?.completed);
}

function setItemCompleted(item, completed) {
  if (!item || typeof item !== "object") return;
  const value = Boolean(completed);
  item.done = value;
  item.completed = value;
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

function defaultSubstack() {
  return {
    articleTitle: "",
    articlePublished: false,
    quoteRestacks: "",
    newSubscribers: "",
    totalFollowers: "",
    didArticle: false,
    didNotes: false,
    didComments: false,
    didMorningStack: false,
    didLive: false,
    insight: "",
    todayArticleTheme: "",
    todayTasks: "",
    todayExperiment: "",
    stockArticleIdeas: "",
    stockNotesIdeas: "",
    stockSeed: "",
  };
}

function defaultNotePage(extraStockKey = "stockExtra") {
  return {
    articleTitle: "",
    articlePublished: false,
    views: "",
    likes: "",
    insight: "",
    todayArticleTheme: "",
    todayTasks: "",
    stockArticleIdeas: "",
    [extraStockKey]: "",
  };
}

function defaultXPageV1() {
  return {
    yesterdayPost1: "",
    yesterdayPost2: "",
    yesterdayPost3: "",
    impressions: "",
    likes: "",
    engagements: "",
    detailClicks: "",
    profileAccesses: "",
    post1Impressions: "",
    post1Likes: "",
    post1Engagements: "",
    post1DetailClicks: "",
    post1ProfileAccesses: "",
    post2Impressions: "",
    post2Likes: "",
    post2Engagements: "",
    post2DetailClicks: "",
    post2ProfileAccesses: "",
    post3Impressions: "",
    post3Likes: "",
    post3Engagements: "",
    post3DetailClicks: "",
    post3ProfileAccesses: "",
    followers: "",
    insight: "",
    todayPost1: "",
    todayPost2: "",
    todayPost3: "",
    todayTasks: "",
    stockPostIdeas: "",
    stockPostIdea1: "",
    stockPostIdea2: "",
  };
}

function defaultWordPressPageV1() {
  return {
    articleTitle: "",
    articlePublished: false,
    insight: "",
    todayNewArticle: "",
    todayWritingArticle: "",
    todayFixedPage: "",
    todayPageProgress: "",
    todayTasks: "",
    stockNewArticle: "",
    stockArticleIdeas: "",
    stockFixedPage: "",
    stockImprovementIdeas: "",
  };
}

function defaultXAnalysis(date = activeDate) {
  return {
    date,
    xPost1: "",
    xPost1Impressions: "",
    xPost1Engagements: "",
    xPost1DetailClicks: "",
    xPost1ProfileAccesses: "",
    xPost1FollowDelta: "",
    xPost1Takeaway: "",
    xPost2: "",
    xPost2Impressions: "",
    xPost2Engagements: "",
    xPost2DetailClicks: "",
    xPost2ProfileAccesses: "",
    xPost2FollowDelta: "",
    xPost2Takeaway: "",
    xPost3: "",
    xPost3Impressions: "",
    xPost3Engagements: "",
    xPost3DetailClicks: "",
    xPost3ProfileAccesses: "",
    xPost3FollowDelta: "",
    xPost3Takeaway: "",
    hypothesis: "",
    result: "",
    nextTry: "",
  };
}

function defaultOperationExperimentStore() {
  return {
    experiments: [{
      id: "notes-10-per-day",
      name: "Notesを1日10投稿",
      purpose: "記事を増やすのではなく、入口を増やして交流や購読につながるかを検証する",
      status: "active",
      startDate: "",
      endDate: "",
      channel: "substack",
      targetMetric: "交流・購読への反応",
      createdAt: new Date().toISOString(),
    }],
    dailyLogs: {},
  };
}

function blankOperationExperimentLog() {
  return {
    execution: "",
    reaction: "",
    observation: "",
    notesCount: "",
    subscribers: "",
    replies: "",
    restacks: "",
    otherReactions: "",
    updatedAt: "",
  };
}

function blankXExperimentLog() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    postDate: activeDate,
    postTime: "",
    postContent: "",
    postUrl: "",
    postType: "その他",
    title: "",
    brand: "ブランドA",
    status: "💡 アイデア",
    experimentType: "投稿仮説",
    hypothesis: "",
    startReason: "",
    experiment: "",
    resultMemo: "",
    insight: "",
    learning: "",
    nextHypothesis: "",
    media: [],
    impressions: "",
    engagements: "",
    detailClicks: "",
    profileAccesses: "",
    linkClicks: "",
    createdAt: now,
    updatedAt: now,
  };
}

function blankPublishingSeed() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    summary: "",
    themeName: "",
    originalTheme: "",
    personalTake: "",
    tags: "",
    savedDate: activeDate,
    status: "種",
    source: "",
    sourceUrl: "",
    seedCandidateId: "",
    candidateIds: [],
    articleExperimentId: "",
    used: false,
    usedAt: "",
    createdAt: now,
    updatedAt: now,
  };
}

function blankPublishingSeedCandidate() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    originalTopic: "",
    summary: "",
    reason: "",
    sourceName: "",
    sourceUrl: "",
    fetchedDate: activeDate,
    status: "未確認",
    collapsed: false,
    seedIds: [],
    decisionNote: "",
    createdAt: now,
    updatedAt: now,
  };
}

function normalizePublishingSeed(raw) {
  const base = blankPublishingSeed();
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const seed = { ...base, ...source };
  seed.id = typeof source.id === "string" && source.id ? source.id : base.id;
  seed.summary = source.summary ?? source.description ?? "";
  seed.themeName = source.themeName ?? source.theme ?? "";
  ["title", "summary", "themeName", "originalTheme", "personalTake", "tags", "savedDate", "source", "sourceUrl", "seedCandidateId", "articleExperimentId", "createdAt", "updatedAt"].forEach((key) => {
    seed[key] = String(seed[key] ?? "");
  });
  seed.candidateIds = [...new Set([
    ...(Array.isArray(source.candidateIds) ? source.candidateIds : []),
    source.seedCandidateId,
  ].filter(Boolean).map(String))];
  seed.status = PUBLISHING_SEED_STATUSES.includes(source.status) ? source.status : "種";
  seed.used = Boolean(source.used);
  seed.usedAt = typeof source.usedAt === "string" ? source.usedAt : "";
  if (seed.used && !seed.usedAt) seed.usedAt = seed.updatedAt || seed.createdAt || base.createdAt;
  if (!seed.savedDate) seed.savedDate = activeDate;
  if (!seed.createdAt) seed.createdAt = seed.updatedAt || base.createdAt;
  if (!seed.updatedAt) seed.updatedAt = seed.createdAt;
  return seed;
}

function normalizePublishingSeedCandidate(raw) {
  const base = blankPublishingSeedCandidate();
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const aliases = {
    originalTopic: source.originalTopic ?? source.topic ?? source.title ?? source.originalTheme ?? source["元の話題"] ?? "",
    summary: source.summary ?? source.point ?? source.description ?? source["要点"] ?? "",
    reason: source.reason ?? source.whySakura ?? source.why ?? source.questionForSelf ?? source.question ?? source.prompt ?? source["なぜ、さくら向け？"] ?? source["自分に向けた問い"] ?? "",
    sourceName: source.sourceName ?? source.source ?? source.media ?? source["出典名"] ?? "",
    sourceUrl: source.sourceUrl ?? source.url ?? source.link ?? source["出典URL"] ?? "",
    fetchedDate: source.fetchedDate ?? source.date ?? source.createdDate ?? source["取得日"] ?? "",
  };
  const candidate = { ...base, ...source, ...aliases };
  candidate.id = typeof source.id === "string" && source.id ? source.id : base.id;
  ["originalTopic", "summary", "reason", "sourceName", "sourceUrl", "fetchedDate", "decisionNote", "createdAt", "updatedAt"].forEach((key) => {
    candidate[key] = String(candidate[key] ?? "");
  });
  candidate.seedIds = Array.isArray(source.seedIds) ? [...new Set(source.seedIds.filter(Boolean).map(String))] : [];
  candidate.collapsed = Boolean(source.collapsed);
  delete candidate.questionForSelf;
  candidate.status = PUBLISHING_SEED_CANDIDATE_STATUSES.includes(source.status) ? source.status : "未確認";
  if (!candidate.fetchedDate) candidate.fetchedDate = activeDate;
  if (!candidate.createdAt) candidate.createdAt = candidate.updatedAt || base.createdAt;
  if (!candidate.updatedAt) candidate.updatedAt = candidate.createdAt;
  return candidate;
}

function normalizeXExperimentLog(raw) {
  const base = blankXExperimentLog();
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const log = { ...base, ...source };
  log.id = typeof source.id === "string" && source.id ? source.id : base.id;
  log.postType = X_EXPERIMENT_POST_TYPES.includes(source.postType) ? source.postType : "その他";
  log.brand = X_EXPERIMENT_BRANDS.includes(source.brand) ? source.brand : source.brand === "note（Substack初心者向け）" ? "ブランドB" : base.brand;
  const statusAliases = {
    設計中: "💡 アイデア",
    実行中: "🧪 実験中",
    観察中: "📊 検証中",
    完了: "✅ 検証完了",
    保留: "🛠 準備中",
  };
  const normalizedStatus = statusAliases[source.status] || source.status;
  log.status = X_EXPERIMENT_STATUSES.includes(normalizedStatus) ? normalizedStatus : base.status;
  log.experimentType = X_EXPERIMENT_TYPES.includes(source.experimentType) ? source.experimentType : base.experimentType;
  ["postDate", "postTime", "postContent", "postUrl", "title", "hypothesis", "startReason", "experiment", "resultMemo", "insight", "learning", "nextHypothesis", "createdAt", "updatedAt"].forEach((key) => {
    log[key] = String(log[key] ?? "");
  });
  const mediaOptions = X_EXPERIMENT_MEDIA[log.brand] || [];
  log.media = Array.isArray(source.media)
    ? source.media.filter((item) => mediaOptions.includes(item))
    : [];
  ["impressions", "engagements", "detailClicks", "profileAccesses", "linkClicks"].forEach((key) => {
    log[key] = log[key] === null || log[key] === undefined ? "" : String(log[key]);
  });
  if (!log.postDate) log.postDate = activeDate;
  if (!log.createdAt) log.createdAt = log.updatedAt || base.createdAt;
  if (!log.updatedAt) log.updatedAt = log.createdAt;
  return log;
}

function newPersistentMemo() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    text: "",
    createdAt: now,
    updatedAt: now,
  };
}

function normalizePersistentMemo(memo) {
  const normalized = {
    ...newPersistentMemo(),
    ...(memo && typeof memo === "object" ? memo : {}),
  };
  normalized.title = normalized.title || "";
  normalized.text = normalized.text || "";
  if (!normalized.createdAt) normalized.createdAt = normalized.updatedAt || new Date().toISOString();
  if (!normalized.updatedAt) normalized.updatedAt = normalized.createdAt;
  return normalized;
}

const READING_QUEUE_STATUSES = ["未読", "読み途中", "完読", "保留"];
const READING_QUEUE_SOURCES = ["Unlimited", "Prime Reading", "購入済み", "サンプル", "その他"];
const DEFAULT_READING_QUEUE = [
  {
    id: "ai-kindle-7days",
    title: "7日で1冊仕上げるAI✖️Kindle: 出版&マーケティング完全実装マニュアル",
    author: "蝶乃舞",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "Kindle出版とマーケティングを一気通貫で確認する。",
  },
  {
    id: "ai-sns-automation-story",
    title: "AIでSNS投稿を自動化しようとしたらぐちゃぐちゃになった私の話",
    author: "AIアイデア工房 / 黒川 葵",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "自動化の失敗例から、運用設計の注意点を拾う。",
  },
  {
    id: "notebooklm-super-use",
    title: "読む・まとめる・考えるが速くなる NotebookLM超活用術",
    author: "たかみつ",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "読書とリサーチを資産化する道具本として読む。",
  },
  {
    id: "small-selling",
    title: "売り込めない人のための小さく売る技術",
    author: "小谷地市朗",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "note・Kindle・Brainの売り方、信頼導線の参考にする。",
  },
  {
    id: "kindle-before-publish-improvements",
    title: "【副業】Kindle出版: 出版前にできる改善10選",
    author: "シンプリストやまだ",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "出版前の改善点、離脱防止、導線構築を確認する。",
  },
  {
    id: "note-kindle-sidejob",
    title: "note×Kindle副業完全攻略",
    author: "すねーく博士",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "noteとKindleをつなぐ収益化設計を確認する。",
  },
  {
    id: "new-era-note",
    title: "新時代の副業 note",
    author: "小田 純也",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "AIを使ったnote記事作成の型を確認する。",
  },
  {
    id: "ai-notebooklm-note",
    title: "AIで書いても売れない理由、副業初心者が知らないNotebookLM活用法",
    author: "AI効率化コンサルタントSora",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "AI記事が埋もれる理由と、失敗談の活かし方を拾う。",
  },
  {
    id: "small-access-blog",
    title: "少ないアクセスで稼ぐブログ運営法",
    author: "なにわ",
    source: "Unlimited",
    status: "読み途中",
    progress: 21,
    memo: "現在読み途中。少ないPVから収益化する考え方を確認する。",
  },
  {
    id: "second-brain-publishing-manga",
    title: "マンガでわかる 稼ぐ発信は「第二の脳」が9割",
    author: "会社員のAI副業ガイド / まんがく舎ブックス",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "Obsidian・Claude Code・発信の仕組み化を確認する。",
  },
  {
    id: "note-first-month",
    title: "読んでもらえるnote術 大切な「最初の1か月」の取り組み方",
    author: "ももんか",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "noteの初期設計、プロフィール、タイトル周りを見る。",
  },
  {
    id: "yorokobareru-hito",
    title: "喜ばれる人になりなさい",
    author: "永松 茂久",
    source: "Prime Reading",
    status: "未読",
    progress: 0,
    memo: "発信の人格や読者との距離感づくりの補助にする。",
  },
  {
    id: "note-50000",
    title: "note副業で月5万円稼ぐ方法",
    author: "ごっちん",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "note収益化の導線と初心者向けの設計を確認する。",
  },
  {
    id: "simple-writing",
    title: "伝わるシンプル文章術",
    author: "飯間浩明",
    source: "Prime Reading",
    status: "未読",
    progress: 0,
    memo: "読みやすい文章の基礎固め。",
  },
  {
    id: "solo-business-textbook",
    title: "ひとりビジネスの教科書 Premium",
    author: "佐藤 伝",
    source: "Prime Reading",
    status: "未読",
    progress: 0,
    memo: "個人事業・発信・商品化の全体像を補助的に読む。",
  },
  {
    id: "dementia-care",
    title: "認知症介護を楽にしよう！",
    author: "近藤 淳子",
    source: "購入済み",
    status: "未読",
    progress: 0,
    memo: "作業直結ではないため、必要な時に読む。",
  },
  {
    id: "online-secretary-first-step",
    title: "オンライン秘書のはじめの一歩",
    author: "ゆりえもん",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "サポート業務やサービス設計の参考にする。",
  },
  {
    id: "twitter-basic-strategy",
    title: "Twitterの基礎と戦略がわかる本",
    author: "なべたろ",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "X運用の基礎確認用。",
  },
  {
    id: "web-writer-roadmap",
    title: "Webライターで月50万稼ぐロードマップ",
    author: "ゆらり",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "記事制作の仕事化・単価アップの参考にする。",
  },
  {
    id: "math-relearn",
    title: "大人の数学学び直し",
    author: "たかひろ",
    source: "購入済み",
    status: "未読",
    progress: 0,
    memo: "作業直結ではないため、必要な時に読む。",
  },
  {
    id: "ikiru-tree",
    title: "生きるの木がまた育つまで",
    author: "かしん",
    source: "購入済み",
    status: "未読",
    progress: 0,
    memo: "回復・生活側の文脈で必要な時に読む。",
  },
  {
    id: "writing-as-weapon",
    title: "武器としての書く技術",
    author: "イケダ ハヤト",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "ブログ・noteの表現と構成の参考。",
  },
  {
    id: "money-creation",
    title: "誰でもできるのに9割の人が気づいていない、お金の生み出し方",
    author: "今井孝",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "商品化・価値提供の考え方を拾う。",
  },
  {
    id: "deadline-work",
    title: "〆切仕事術",
    author: "上阪 徹",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "執筆・納期・継続運用の参考にする。",
  },
  {
    id: "ai-sns-marketing",
    title: "AI×SNSマーケティング 活用大全",
    author: "おだじゅん / やまちゃん",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "ChatGPTを使ったSNS・note運用の材料にする。",
  },
  {
    id: "content-marketing",
    title: "コンテンツマーケティングは設計が9割",
    author: "竹田四郎",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "発信全体の設計に使う。",
  },
  {
    id: "ai-digital-marketing",
    title: "AI×デジタルマーケティング 最強の戦略販売を秒で実装する方法",
    author: "MIRAI ITO",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "AI時代のマーケティング施策実装を確認する。",
  },
  {
    id: "creative-direction",
    title: "すべての仕事はクリエイティブディレクションである。",
    author: "古川裕也",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "企画・編集・発信の判断軸を育てるために読む。",
  },
  {
    id: "local-web-marketing",
    title: "ローカルビジネスのためのWebマーケティングが基礎から学べる本",
    author: "栃本 常幸",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "地域向けの集客視点が必要なときに読む。",
  },
  {
    id: "blog-writing-100x",
    title: "100倍稼ぐ人のブログ術 ライティング編",
    author: "竹内洋平",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "アフィリエイト記事の構成と収益化の参考にする。",
  },
  {
    id: "x-note-kindle",
    title: "X・note・Kindleの「点」を「線」に変える最強の導線",
    author: "SAGOL",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "note・Kindle・Xをつなぐ導線づくりの最優先候補。",
  },
  {
    id: "barista-fire",
    title: "バリスタFIRE 入門編",
    author: "さいとう",
    source: "その他",
    status: "未読",
    progress: 0,
    memo: "作業直結ではないため、必要な時に読む。",
  },
  {
    id: "web-writer-100000",
    title: "月10万円稼げるWebライターになるための黄金法則",
    author: "田郷倉人",
    source: "サンプル",
    status: "未読",
    progress: 0,
    memo: "サンプル。必要なら購入・借り直しを検討する。",
  },
  {
    id: "seo-intro",
    title: "SEO対策・超入門2023",
    author: "滝口健太郎",
    source: "Prime Reading",
    status: "未読",
    progress: 0,
    memo: "SEO記事の基礎確認用。",
  },
  {
    id: "zero-chapter-zero",
    title: "ゼロ 第0章",
    author: "堀江 貴文",
    source: "購入済み",
    status: "未読",
    progress: 0,
    memo: "作業直結ではないため、必要な時に読む。",
  },
];

function newReadingQueueBook() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    author: "",
    source: "Unlimited",
    status: "未読",
    progress: 0,
    memo: "",
    createdAt: now,
    updatedAt: now,
  };
}

function normalizeReadingQueueBook(book) {
  const base = newReadingQueueBook();
  const source = book && typeof book === "object" ? book : {};
  const normalized = { ...base, ...source };
  normalized.id = typeof source.id === "string" && source.id ? source.id : base.id;
  normalized.title = typeof source.title === "string" ? source.title : "";
  normalized.author = typeof source.author === "string" ? source.author : "";
  normalized.source = READING_QUEUE_SOURCES.includes(source.source) ? source.source : "その他";
  normalized.status = READING_QUEUE_STATUSES.includes(source.status) ? source.status : "未読";
  normalized.progress = Math.min(100, Math.max(0, Number(source.progress) || 0));
  normalized.memo = typeof source.memo === "string" ? source.memo : "";
  normalized.createdAt = source.createdAt || base.createdAt;
  normalized.updatedAt = source.updatedAt || normalized.createdAt;
  return normalized;
}

readingQueue = loadReadingQueue();

function newReadingNote() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    source: "",
    title: "",
    state: "未読",
    url: "",
    learning: "",
    use: "",
    memo: "",
    createdAt: now,
    updatedAt: now,
  };
}

function normalizeReadingNote(note) {
  const normalized = {
    ...newReadingNote(),
    ...(note && typeof note === "object" ? note : {}),
  };
  normalized.date = normalized.date || activeDate;
  normalized.source = normalized.source || normalized.url || "";
  normalized.state = normalized.state || normalized.status || "未読";
  normalized.title = normalized.title || "";
  normalized.memo = normalized.memo || "";
  if (!normalized.createdAt) normalized.createdAt = normalized.updatedAt || new Date().toISOString();
  if (!normalized.updatedAt) normalized.updatedAt = normalized.createdAt;
  return normalized;
}

function blankLearningAsset() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    sourceType: "本",
    title: "",
    knowledgeName: "",
    oneLineConclusion: "",
    knowledgeOverview: "",
    todayAction: "",
    useScene: "",
    beginnerExplanation: "",
    articleIdeas: "",
    podcastIdeas: "",
    aiUseSimple: "",
    tagsSimple: "",
    author: "",
    genre: "",
    rating: "",
    importanceRating: "",
    practicalRating: "",
    beginnerRating: "",
    rereadRating: "",
    status: "知識化待ち",
    impression: "",
    rayDialogue: "",
    myThought: "",
    summary3Lines: "",
    coreIdea: "",
    top10: "",
    publishingUse: "",
    useSubstack: "",
    useNote: "",
    usePodcast: "",
    useLive: "",
    useNotes: "",
    useX: "",
    useAi: "",
    contentIdeas: "",
    hypothesis: "",
    experimentIdea: "",
    articleIdea: "",
    experimentResult: "",
    practiceTomorrow: "",
    practiced: "",
    result: "",
    learning: "",
    nextTrial: "",
    knowledgeTags: "",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    contentLinks: "",
    relatedArticleTitle: "",
    relatedArticleUrl: "",
    publishedTo: [],
    connectsTo: [],
    createdAt: now,
    updatedAt: now,
  };
}

function normalizeLearningAsset(raw) {
  const base = blankLearningAsset();
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const item = { ...base, ...source };
  item.id = typeof source.id === "string" && source.id ? source.id : base.id;
  ["date", "title", "knowledgeName", "oneLineConclusion", "knowledgeOverview", "todayAction", "useScene", "beginnerExplanation", "articleIdeas", "podcastIdeas", "aiUseSimple", "tagsSimple", "author", "genre", "rating", "importanceRating", "practicalRating", "beginnerRating", "rereadRating", "impression", "rayDialogue", "myThought", "summary3Lines", "coreIdea", "top10", "publishingUse", "useSubstack", "useNote", "usePodcast", "useLive", "useNotes", "useX", "useAi", "contentIdeas", "hypothesis", "experimentIdea", "articleIdea", "experimentResult", "practiceTomorrow", "practiced", "result", "learning", "nextTrial", "knowledgeTags", "contentLinks", "relatedArticleTitle", "relatedArticleUrl", "createdAt", "updatedAt"].forEach((key) => {
    item[key] = String(item[key] ?? "");
  });
  item.sourceType = LEARNING_ASSET_SOURCES.includes(source.sourceType) ? source.sourceType : base.sourceType;
  const mappedStatus = LEARNING_ASSET_LEGACY_STATUS_MAP[source.status] || source.status;
  item.status = LEARNING_ASSET_STATUSES.includes(mappedStatus) ? mappedStatus : base.status;
  item.publishedTo = Array.isArray(source.publishedTo)
    ? source.publishedTo.filter((value) => LEARNING_ASSET_PUBLISHING_PLACES.includes(value))
    : [];
  item.connectsTo = Array.isArray(source.connectsTo)
    ? source.connectsTo.filter((value) => LEARNING_ASSET_CONNECTIONS.includes(value))
    : [];
  const counts = source.contentCounts && typeof source.contentCounts === "object" ? source.contentCounts : {};
  item.contentCounts = Object.fromEntries(
    Object.keys(base.contentCounts).map((key) => [key, Math.max(0, Number.parseInt(counts[key], 10) || 0)])
  );
  if (!item.date) item.date = activeDate;
  if (!item.createdAt) item.createdAt = item.updatedAt || base.createdAt;
  if (!item.updatedAt) item.updatedAt = item.createdAt;
  return item;
}

function configuredDailyTaskTitles() {
  const deletedTitles = new Set(deletedDailyTasks);
  return [...defaultDailyTasks, ...customDailyTasks].filter((title) => !deletedTitles.has(title));
}

function afterTenModeOptions() {
  const deletedOptions = new Set(deletedAfterTenModeOptions);
  return [...new Set([...DEFAULT_AFTER_TEN_MODE_OPTIONS, ...customAfterTenModeOptions]
    .map(normalizeAfterTenModeOption)
    .filter(Boolean))]
    .filter((option) => !deletedOptions.has(option));
}

function dailyTaskTitlesFromDay(day) {
  return asArray(day?.dailyTasks)
    .map((item) => String(item?.title || "").trim())
    .filter((title) => title && !obsoleteDailyTasks.includes(title) && !deletedDailyTasks.includes(title));
}

function mergeDailyTaskTitles(primaryTitles = [], requiredTitles = configuredDailyTaskTitles()) {
  return [...new Set([...primaryTitles, ...requiredTitles])]
    .filter((title) => title && !obsoleteDailyTasks.includes(title) && !deletedDailyTasks.includes(title));
}

function latestDailyTaskTitlesBefore(dateKey) {
  return Object.entries(store || {})
    .filter(([candidateDate]) => candidateDate < dateKey)
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([, day]) => dailyTaskTitlesFromDay(day))
    .find((titles) => titles.length) || [];
}

function previousDateKey(dateKey) {
  const date = dateKeyToLocalDate(dateKey);
  if (!date) return "";
  date.setDate(date.getDate() - 1);
  return toDateInputValue(date);
}

function dailyTaskTitlesForDate(dateKey = activeDate) {
  const ownOrder = dailyTaskTitlesFromDay(store?.[dateKey]);
  if (ownOrder.length) return mergeDailyTaskTitles(ownOrder);

  const previousDayOrder = dailyTaskTitlesFromDay(store?.[previousDateKey(dateKey)]);
  if (previousDayOrder.length) return mergeDailyTaskTitles(previousDayOrder);

  const baseOrder = dateKey > DAILY_TASK_ORDER_BASE_DATE
    ? dailyTaskTitlesFromDay(store?.[DAILY_TASK_ORDER_BASE_DATE])
    : [];
  if (baseOrder.length) return mergeDailyTaskTitles(baseOrder);

  const previousOrder = latestDailyTaskTitlesBefore(dateKey);
  if (previousOrder.length) return mergeDailyTaskTitles(previousOrder);

  const savedOrder = dailyTaskOrder.length ? dailyTaskOrder : defaultDailyTasks;
  return mergeDailyTaskTitles(
    savedOrder,
  );
}

function buildDailyTasksForDate(dateKey = activeDate) {
  return dailyTaskTitlesForDate(dateKey).map(newItem);
}

function syncFutureDailyTaskOrder(sourceDay, baseDate = activeDate) {
  const sourceTitles = dailyTaskTitlesFromDay(sourceDay);
  if (!sourceTitles.length) return false;
  const orderedTitles = mergeDailyTaskTitles(sourceTitles);
  let changed = false;
  Object.entries(store).forEach(([dateKey, day]) => {
    if (dateKey <= baseDate || !Array.isArray(day?.dailyTasks)) return;
    const existingTasks = day.dailyTasks.filter((item) => !obsoleteDailyTasks.includes(item.title) && !deletedDailyTasks.includes(item.title));
    const existingByTitle = new Map(existingTasks.map((item) => [item.title, item]));
    const reorderedTasks = orderedTitles.map((title) => existingByTitle.get(title) || newItem(title));
    existingTasks.forEach((item) => {
      if (item.title && !orderedTitles.includes(item.title)) reorderedTasks.push(item);
    });
    if (JSON.stringify(day.dailyTasks.map((item) => item.title)) !== JSON.stringify(reorderedTasks.map((item) => item.title))) {
      day.dailyTasks = reorderedTasks;
      changed = true;
    }
  });
  return changed;
}

function applySavedDailyTaskOrder(day) {
  if (!Array.isArray(day?.dailyTasks)) return false;
  const orderedTitles = dailyTaskTitlesForDate(activeDate);
  const existingTasks = day.dailyTasks.filter((item) => !obsoleteDailyTasks.includes(item.title) && !deletedDailyTasks.includes(item.title));
  const existingByTitle = new Map(existingTasks.map((item) => [item.title, item]));
  const orderedTasks = orderedTitles.map((title) => existingByTitle.get(title) || newItem(title));
  existingTasks.forEach((item) => {
    if (item.title && !orderedTitles.includes(item.title)) orderedTasks.push(item);
  });
  if (JSON.stringify(day.dailyTasks.map((item) => item.title)) === JSON.stringify(orderedTasks.map((item) => item.title))) {
    return false;
  }
  day.dailyTasks = orderedTasks;
  return true;
}

const CAPACITY_CHECK_ITEMS = [
  { key: "expression", label: "表情" },
  { key: "mood", label: "気分" },
  { key: "reading", label: "読む" },
  { key: "writing", label: "書く（新規記事）" },
  { key: "comments", label: "コメント・交流" },
  { key: "housework", label: "掃除・家事" },
  { key: "development", label: "実装・開発" },
];

const CAPACITY_CHECK_OPTIONS = [
  { value: "double_circle", label: "◎", title: "できそう" },
  { value: "circle", label: "○", title: "少しできそう" },
  { value: "triangle", label: "△", title: "軽くなら" },
  { value: "cross", label: "×", title: "今日は難しい" },
];

const ARCHIVE_PAGE_SELECTORS = [
  "#sns-posting",
  "#x-analysis-room",
  ".publishing-seed-workbench-tabs",
  "#publishing-seed-candidates",
  ".operation-experiment-panel",
  ".dashboard-health-input-panel",
  ".dashboard-memory-input-panel",
  ".dashboard-ai-analysis-panel",
  ".publishing-ops-history-panel",
  ".later-panel",
  ".panel:has(#projects)",
  ".memory-library-panel",
  ".data-panel",
  "#dashboard-closed",
  ".sakura-panel",
];

const TODAY_INPUT_PAGE_SELECTORS = [
  "#dashboard-input",
  ".daily-input-panel",
  "#dashboard-accumulation",
  ".reflection-panel",
  "#publishing-experiment-lab",
  ".learning-panel",
  "#codex-daily-log",
];

function blankDay() {
  return {
    dailyTasks: buildDailyTasksForDate(activeDate),
    todayTasks: [],
    todayEvents: [],
    projects: defaultProjects.map(newItem),
    memos: [],
    learnings: [],
    publishingOps: defaultPublishingOps(),
    publishingOpsUpdatedAt: "",
    substack: defaultSubstack(),
    substackUpdatedAt: "",
    noteAiRecovery: defaultNotePage("seoQueue"),
    noteAiRecoveryUpdatedAt: "",
    noteSubstackBeginner: defaultNotePage("commonQuestions"),
    noteSubstackBeginnerUpdatedAt: "",
    xPageV1: defaultXPageV1(),
    xPageV1UpdatedAt: "",
    wordpressPageV1: defaultWordPressPageV1(),
    wordpressPageV1UpdatedAt: "",
    xAnalysis: defaultXAnalysis(),
    xAnalysisUpdatedAt: "",
    dailyInput: "",
    dailyInputUpdatedAt: "",
    capacityCheck: {},
    capacityCheckUpdatedAt: "",
    afterTenMode: [],
    afterTenModeUpdatedAt: "",
    todayWeather: "",
    todayWeatherUpdatedAt: "",
    activityLog: defaultActivityLog(),
    activityLogUpdatedAt: "",
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
    codexDailyLog: defaultCodexDailyLog(),
    codexDailyLogUpdatedAt: "",
    updatedAt: new Date().toISOString(),
  };
}

function defaultActivityLog() {
  return {
    todayStep: "",
    startSubstackSubscribers: "",
    startSubstackFollowers: "",
    startNoteFollowers: "",
    startExtraMetrics: "",
    endSubstackSubscribers: "",
    endSubstackFollowers: "",
    endNoteFollowers: "",
    endExtraMetrics: "",
    actions: "",
    intent: "",
    reactions: "",
    insight: "",
    tomorrowTrial: "",
    lifeLog: "",
  };
}

function defaultCodexDailyLog() {
  return {
    tried: "",
    learned: "",
    people: "",
    ai: "",
    ideas: "",
    experiments: "",
    failures: "",
    successes: "",
    conversations: "",
    tomorrow: "",
    prompt: "",
  };
}

function ensureDefaultDailyTasks(day) {
  let changed = false;
  day.dailyTasks ||= [];
  const beforeCount = day.dailyTasks.length;
  day.dailyTasks = day.dailyTasks.filter((item) => !obsoleteDailyTasks.includes(item.title) && !deletedDailyTasks.includes(item.title));
  if (day.dailyTasks.length !== beforeCount) changed = true;
  dailyTaskTitlesForDate(activeDate).forEach((title) => {
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

function ensureActivityLog(day) {
  let changed = false;
  if (!day.activityLog || typeof day.activityLog !== "object") {
    day.activityLog = defaultActivityLog();
    changed = true;
  }
  Object.entries(defaultActivityLog()).forEach(([key, value]) => {
    if (!(key in day.activityLog)) {
      day.activityLog[key] = value;
      changed = true;
    }
  });
  if (!("activityLogUpdatedAt" in day)) {
    day.activityLogUpdatedAt = "";
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
  let changed = false;
  if (!day.publishingOps || typeof day.publishingOps !== "object") {
    day.publishingOps = defaultPublishingOps();
    changed = true;
  }
  const defaults = defaultPublishingOps();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.publishingOps)) {
      day.publishingOps[key] = value;
      changed = true;
    }
  });
  if (!("publishingOpsUpdatedAt" in day)) {
    day.publishingOpsUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureSubstack(day) {
  let changed = false;
  if (!day.substack || typeof day.substack !== "object" || Array.isArray(day.substack)) {
    day.substack = defaultSubstack();
    changed = true;
  }
  const defaults = defaultSubstack();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.substack)) {
      day.substack[key] = value;
      changed = true;
    }
  });
  if (!("substackUpdatedAt" in day)) {
    day.substackUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureNotePage(day, key, updatedAtKey, extraStockKey) {
  let changed = false;
  if (!day[key] || typeof day[key] !== "object" || Array.isArray(day[key])) {
    day[key] = defaultNotePage(extraStockKey);
    changed = true;
  }
  const defaults = defaultNotePage(extraStockKey);
  Object.entries(defaults).forEach(([fieldKey, value]) => {
    if (!(fieldKey in day[key])) {
      day[key][fieldKey] = value;
      changed = true;
    }
  });
  if (!(updatedAtKey in day)) {
    day[updatedAtKey] = "";
    changed = true;
  }
  return changed;
}

function ensureXPageV1(day) {
  let changed = false;
  if (!day.xPageV1 || typeof day.xPageV1 !== "object" || Array.isArray(day.xPageV1)) {
    day.xPageV1 = defaultXPageV1();
    changed = true;
  }
  const defaults = defaultXPageV1();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.xPageV1)) {
      day.xPageV1[key] = value;
      changed = true;
    }
  });
  if (day.xPageV1.stockPostIdeas && !day.xPageV1.stockPostIdea1) {
    day.xPageV1.stockPostIdea1 = day.xPageV1.stockPostIdeas;
    changed = true;
  }
  [
    ["impressions", "post1Impressions"],
    ["likes", "post1Likes"],
    ["engagements", "post1Engagements"],
    ["detailClicks", "post1DetailClicks"],
    ["profileAccesses", "post1ProfileAccesses"],
  ].forEach(([legacyKey, postKey]) => {
    if (day.xPageV1[legacyKey] && !day.xPageV1[postKey]) {
      day.xPageV1[postKey] = day.xPageV1[legacyKey];
      changed = true;
    }
  });
  if (!("xPageV1UpdatedAt" in day)) {
    day.xPageV1UpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureWordPressPageV1(day) {
  let changed = false;
  if (!day.wordpressPageV1 || typeof day.wordpressPageV1 !== "object" || Array.isArray(day.wordpressPageV1)) {
    day.wordpressPageV1 = defaultWordPressPageV1();
    changed = true;
  }
  const defaults = defaultWordPressPageV1();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.wordpressPageV1)) {
      day.wordpressPageV1[key] = value;
      changed = true;
    }
  });
  if (!("wordpressPageV1UpdatedAt" in day)) {
    day.wordpressPageV1UpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureXAnalysis(day) {
  let changed = false;
  if (!day.xAnalysis || typeof day.xAnalysis !== "object") {
    day.xAnalysis = defaultXAnalysis();
    changed = true;
  }
  const defaults = defaultXAnalysis();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.xAnalysis)) {
      day.xAnalysis[key] = value;
      changed = true;
    }
  });
  const legacyOps = day.publishingOps && typeof day.publishingOps === "object" ? day.publishingOps : {};
  [
    ["xPostIdea1", "xPost1"],
    ["xPostIdea2", "xPost2"],
    ["xPostIdea3", "xPost3"],
  ].forEach(([legacyKey, nextKey]) => {
    if (!day.xAnalysis[nextKey] && legacyOps[legacyKey]) {
      day.xAnalysis[nextKey] = legacyOps[legacyKey];
      changed = true;
    }
  });
  [
    ["impressions", "xPost1Impressions"],
    ["engagements", "xPost1Engagements"],
    ["detailClicks", "xPost1DetailClicks"],
    ["profileAccesses", "xPost1ProfileAccesses"],
    ["followDelta", "xPost1FollowDelta"],
  ].forEach(([legacyKey, nextKey]) => {
    if (!day.xAnalysis[nextKey] && day.xAnalysis[legacyKey]) {
      day.xAnalysis[nextKey] = day.xAnalysis[legacyKey];
      changed = true;
    }
  });
  if (!("xAnalysisUpdatedAt" in day)) {
    day.xAnalysisUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureCodexDailyLog(day) {
  let changed = false;
  if (!day.codexDailyLog || typeof day.codexDailyLog !== "object") {
    day.codexDailyLog = defaultCodexDailyLog();
    changed = true;
  }
  const defaults = defaultCodexDailyLog();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in day.codexDailyLog)) {
      day.codexDailyLog[key] = value;
      changed = true;
    }
  });
  if (!("codexDailyLogUpdatedAt" in day)) {
    day.codexDailyLogUpdatedAt = "";
    changed = true;
  }
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
  let changed = false;
  if (!("dailyInput" in day)) {
    day.dailyInput = "";
    changed = true;
  }
  if (!("dailyInputUpdatedAt" in day)) {
    day.dailyInputUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureCapacityCheck(day) {
  let changed = false;
  if (!day.capacityCheck || typeof day.capacityCheck !== "object" || Array.isArray(day.capacityCheck)) {
    day.capacityCheck = {};
    changed = true;
  }
  if (!("capacityCheckUpdatedAt" in day)) {
    day.capacityCheckUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureAfterTenMode(day) {
  let changed = false;
  if (!Array.isArray(day.afterTenMode)) {
    day.afterTenMode = [];
    changed = true;
  }
  if (!("afterTenModeUpdatedAt" in day)) {
    day.afterTenModeUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function ensureTodayWeather(day) {
  let changed = false;
  if (!("todayWeather" in day)) {
    day.todayWeather = "";
    changed = true;
  }
  if (!("todayWeatherUpdatedAt" in day)) {
    day.todayWeatherUpdatedAt = "";
    changed = true;
  }
  return changed;
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function loadCustomDailyTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_DAILY_TASKS_STORAGE_KEY));
    if (Array.isArray(saved)) return saved.filter((title) => typeof title === "string" && title.trim());
  } catch {
    // Fall through to migration from existing daily records.
  }
  const builtInTitles = new Set([...defaultDailyTasks, ...obsoleteDailyTasks]);
  const migrated = [...new Set(Object.values(store).flatMap((day) =>
    asArray(day?.dailyTasks)
      .map((item) => String(item?.title || "").trim())
      .filter((title) => title && !builtInTitles.has(title))))];
  return migrated;
}

function normalizeAfterTenModeOption(value) {
  return String(value || "").trim();
}

function loadCustomAfterTenModeOptions() {
  try {
    const saved = JSON.parse(localStorage.getItem(AFTER_TEN_MODE_OPTIONS_STORAGE_KEY));
    if (Array.isArray(saved)) {
      return [...new Set(saved.map(normalizeAfterTenModeOption).filter(Boolean))]
        .filter((option) => !DEFAULT_AFTER_TEN_MODE_OPTIONS.includes(option));
    }
  } catch {
    // Ignore malformed saved data.
  }
  return [];
}

function loadDeletedAfterTenModeOptions() {
  try {
    const saved = JSON.parse(localStorage.getItem(AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY));
    if (Array.isArray(saved)) {
      return [...new Set(saved.map(normalizeAfterTenModeOption).filter(Boolean))];
    }
  } catch {
    // Ignore malformed saved data.
  }
  return [];
}

function loadDeletedDailyTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(DELETED_DAILY_TASKS_STORAGE_KEY));
    if (Array.isArray(saved)) return [...new Set(saved.filter((title) => typeof title === "string" && title.trim()))];
  } catch {
    // Ignore malformed saved data.
  }
  return [];
}

function loadDailyTaskOrder() {
  try {
    const saved = JSON.parse(localStorage.getItem(DAILY_TASK_ORDER_STORAGE_KEY));
    if (Array.isArray(saved)) return mergeDailyTaskTitles(saved.filter((title) => typeof title === "string" && title.trim()));
  } catch {
    // Fall through to migration from the latest existing daily task order.
  }
  const latestOrder = latestDailyTaskTitlesBefore("9999-12-31");
  return mergeDailyTaskTitles(latestOrder.length ? latestOrder : defaultDailyTasks);
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

function loadLaterSortOrder() {
  try {
    const savedOrder = JSON.parse(localStorage.getItem(LATER_VIEW_STORAGE_KEY))?.sortOrder;
    return savedOrder === "newest" ? "newest" : "oldest";
  } catch {
    return "oldest";
  }
}

function loadPersistentMemos() {
  try {
    const saved = JSON.parse(localStorage.getItem(PERSISTENT_MEMO_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizePersistentMemo) : [];
  } catch {
    return [];
  }
}

function loadReadingQueue() {
  try {
    const saved = JSON.parse(localStorage.getItem(READING_QUEUE_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizeReadingQueueBook) : DEFAULT_READING_QUEUE.map(normalizeReadingQueueBook);
  } catch {
    return DEFAULT_READING_QUEUE.map(normalizeReadingQueueBook);
  }
}

function loadReadingNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(READING_NOTES_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizeReadingNote) : [];
  } catch {
    return [];
  }
}

function loadLearningAssets() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEARNING_ASSETS_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizeLearningAsset) : [];
  } catch {
    return [];
  }
}

function blankSubstaVillageStore() {
  return {
    daily: {},
    video: {},
    pdf: {},
    question: {},
    theme: {
      theme: "Substack初心者支援を形にする",
      nextExperiment: "",
    },
    logs: [],
  };
}

function normalizeSubstaVillageStore(raw) {
  const base = blankSubstaVillageStore();
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const store = { ...base, ...source };
  store.daily = source.daily && typeof source.daily === "object" ? { ...source.daily } : {};
  store.video = source.video && typeof source.video === "object" ? { ...source.video } : {};
  store.pdf = source.pdf && typeof source.pdf === "object" ? { ...source.pdf } : {};
  store.question = source.question && typeof source.question === "object" ? { ...source.question } : {};
  store.theme = {
    ...base.theme,
    ...(source.theme && typeof source.theme === "object" ? source.theme : {}),
  };
  store.logs = Array.isArray(source.logs)
    ? source.logs.filter((entry) => entry && typeof entry === "object").slice(0, 50)
    : [];
  return store;
}

function loadSubstaVillageStore() {
  try {
    return normalizeSubstaVillageStore(JSON.parse(localStorage.getItem(SUBSTA_VILLAGE_STORAGE_KEY)));
  } catch {
    return blankSubstaVillageStore();
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

function loadOperationExperimentStore() {
  const defaults = defaultOperationExperimentStore();
  try {
    const saved = JSON.parse(localStorage.getItem(OPERATION_EXPERIMENT_STORAGE_KEY));
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return defaults;
    return {
      experiments: Array.isArray(saved.experiments) && saved.experiments.length
        ? saved.experiments
        : defaults.experiments,
      dailyLogs: saved.dailyLogs && typeof saved.dailyLogs === "object" && !Array.isArray(saved.dailyLogs)
        ? saved.dailyLogs
        : {},
    };
  } catch {
    return defaults;
  }
}

function loadXExperimentLogs() {
  try {
    const saved = JSON.parse(localStorage.getItem(X_EXPERIMENT_LOG_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizeXExperimentLog) : [];
  } catch {
    return [];
  }
}

function loadPublishingSeeds() {
  try {
    const saved = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizePublishingSeed) : [];
  } catch {
    return [];
  }
}

function loadPublishingSeedCandidates() {
  try {
    const saved = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalizePublishingSeedCandidate) : [];
  } catch {
    return [];
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
    JSON.stringify({ showDone: showDoneLater, autoDedupe: autoDedupeLater, sortOrder: laterSortOrder }),
  );
}

function savePersistentMemos() {
  localStorage.setItem(PERSISTENT_MEMO_STORAGE_KEY, JSON.stringify(persistentMemos));
}

function saveReadingQueue() {
  localStorage.setItem(READING_QUEUE_STORAGE_KEY, JSON.stringify(readingQueue.map(normalizeReadingQueueBook)));
}

function saveReadingNotes() {
  localStorage.setItem(READING_NOTES_STORAGE_KEY, JSON.stringify(readingNotes));
}

function saveLearningAssets() {
  localStorage.setItem(LEARNING_ASSETS_STORAGE_KEY, JSON.stringify(learningAssets));
}

function saveSubstaVillageStore() {
  localStorage.setItem(SUBSTA_VILLAGE_STORAGE_KEY, JSON.stringify(substaVillageStore));
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

function saveOperationExperimentStore() {
  localStorage.setItem(OPERATION_EXPERIMENT_STORAGE_KEY, JSON.stringify(operationExperimentStore));
}

function saveXExperimentLogs() {
  localStorage.setItem(X_EXPERIMENT_LOG_STORAGE_KEY, JSON.stringify(xExperimentLogs));
}

function savePublishingSeeds() {
  localStorage.setItem(PUBLISHING_SEEDS_STORAGE_KEY, JSON.stringify(publishingSeeds));
}

function savePublishingSeedCandidates() {
  localStorage.setItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY, JSON.stringify(publishingSeedCandidates));
}

function saveCustomDailyTasks() {
  localStorage.setItem(CUSTOM_DAILY_TASKS_STORAGE_KEY, JSON.stringify(customDailyTasks));
}

function saveCustomAfterTenModeOptions() {
  customAfterTenModeOptions = [...new Set(customAfterTenModeOptions.map(normalizeAfterTenModeOption).filter(Boolean))]
    .filter((option) => !DEFAULT_AFTER_TEN_MODE_OPTIONS.includes(option));
  localStorage.setItem(AFTER_TEN_MODE_OPTIONS_STORAGE_KEY, JSON.stringify(customAfterTenModeOptions));
}

function saveDeletedAfterTenModeOptions() {
  deletedAfterTenModeOptions = [...new Set(deletedAfterTenModeOptions.map(normalizeAfterTenModeOption).filter(Boolean))];
  localStorage.setItem(AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY, JSON.stringify(deletedAfterTenModeOptions));
}

function removeAfterTenModeOption(option) {
  const normalizedOption = normalizeAfterTenModeOption(option);
  if (!normalizedOption) return false;
  if (DEFAULT_AFTER_TEN_MODE_OPTIONS.includes(normalizedOption)) {
    deletedAfterTenModeOptions.push(normalizedOption);
  }
  customAfterTenModeOptions = customAfterTenModeOptions.filter((candidate) => candidate !== normalizedOption);
  Object.values(store).forEach((day) => {
    if (!Array.isArray(day?.afterTenMode)) return;
    day.afterTenMode = day.afterTenMode.filter((candidate) => candidate !== normalizedOption);
  });
  saveCustomAfterTenModeOptions();
  saveDeletedAfterTenModeOptions();
  saveStore();
  return true;
}

function saveDeletedDailyTasks() {
  deletedDailyTasks = [...new Set(deletedDailyTasks.filter((title) => typeof title === "string" && title.trim()))];
  localStorage.setItem(DELETED_DAILY_TASKS_STORAGE_KEY, JSON.stringify(deletedDailyTasks));
}

function saveDailyTaskOrder() {
  dailyTaskOrder = mergeDailyTaskTitles(dailyTaskOrder);
  localStorage.setItem(DAILY_TASK_ORDER_STORAGE_KEY, JSON.stringify(dailyTaskOrder));
}

function saveDailyTaskOrderFromDay(day) {
  dailyTaskOrder = mergeDailyTaskTitles(dailyTaskTitlesFromDay(day));
  saveDailyTaskOrder();
  syncFutureDailyTaskOrder(day);
}

function addCustomDailyTask(title) {
  const normalizedTitle = String(title || "").trim();
  if (!normalizedTitle) return;
  deletedDailyTasks = deletedDailyTasks.filter((candidate) => candidate !== normalizedTitle);
  if (defaultDailyTasks.includes(normalizedTitle) || customDailyTasks.includes(normalizedTitle)) {
    saveDeletedDailyTasks();
    saveDailyTaskOrder();
    return;
  }
  customDailyTasks.push(normalizedTitle);
  dailyTaskOrder = mergeDailyTaskTitles(dailyTaskOrder);
  if (!dailyTaskOrder.includes(normalizedTitle)) dailyTaskOrder.push(normalizedTitle);
  saveDeletedDailyTasks();
  saveDailyTaskOrder();
  saveCustomDailyTasks();
}

function updateCustomDailyTask(oldTitle, newTitle) {
  const index = customDailyTasks.indexOf(oldTitle);
  if (index < 0 || !newTitle || oldTitle === newTitle) return;
  customDailyTasks[index] = newTitle;
  customDailyTasks = [...new Set(customDailyTasks)];
  Object.entries(store).forEach(([dateKey, day]) => {
    if (dateKey <= activeDate) return;
    asArray(day.dailyTasks).forEach((task) => {
      if (task.title === oldTitle) task.title = newTitle;
    });
  });
  dailyTaskOrder = dailyTaskOrder.map((title) => title === oldTitle ? newTitle : title);
  saveDailyTaskOrderFromDay(getDay());
  saveCustomDailyTasks();
  saveStore();
}

function removeCustomDailyTask(title) {
  const normalizedTitle = String(title || "").trim();
  if (!normalizedTitle) return;
  if (defaultDailyTasks.includes(normalizedTitle) && !deletedDailyTasks.includes(normalizedTitle)) {
    deletedDailyTasks.push(normalizedTitle);
  }
  customDailyTasks = customDailyTasks.filter((candidate) => candidate !== normalizedTitle);
  Object.entries(store).forEach(([dateKey, day]) => {
    if (dateKey <= activeDate) return;
    day.dailyTasks = asArray(day.dailyTasks).filter((task) => task.title !== normalizedTitle);
  });
  dailyTaskOrder = dailyTaskOrder.filter((candidate) => candidate !== normalizedTitle);
  saveDeletedDailyTasks();
  saveDailyTaskOrder();
  saveCustomDailyTasks();
}

function saveMemoryStore() {
  memoryStore.projectMemory = ensureDefaultProjectMemory(asArray(memoryStore.projectMemory));
  localStorage.setItem(MEMORY_STORE_STORAGE_KEY, JSON.stringify(memoryStore));
}

function saveStore() {
  persistStore();
  renderSummary();
  renderHistory();
}

function persistStore() {
  store[activeDate].updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function renderAfterTaskListChange(listId) {
  try {
    persistStore();
  } catch (error) {
    console.error("Failed to save task list change", error);
  }
  try {
    renderSummary();
  } catch (error) {
    console.error("Failed to render summary after task list change", error);
  }
  try {
    renderHistory();
  } catch (error) {
    console.error("Failed to render history after task list change", error);
  }
  renderTaskList(listId);
  renderBrainPrototype();
}

function getDay() {
  if (!store[activeDate]) {
    store[activeDate] = blankDay();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureDefaultDailyTasks(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (applySavedDailyTaskOrder(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureMetricDefaults(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureActivityLog(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureLearningList(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensurePublishingOps(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureSubstack(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureNotePage(store[activeDate], "noteAiRecovery", "noteAiRecoveryUpdatedAt", "seoQueue")) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureNotePage(store[activeDate], "noteSubstackBeginner", "noteSubstackBeginnerUpdatedAt", "commonQuestions")) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureXPageV1(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureWordPressPageV1(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureXAnalysis(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureTodayEvents(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureDailyInput(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureCapacityCheck(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureAfterTenMode(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureTodayWeather(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureCodexDailyLog(store[activeDate])) {
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

function formatSavedAt(value) {
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

function dateKeyWithOffset(dateKey, offsetDays) {
  const date = dateKeyToLocalDate(dateKey);
  if (!date) return dateKey;
  date.setDate(date.getDate() + offsetDays);
  return toDateInputValue(date);
}

function formatActivityDelta(startValue, endValue) {
  const start = Number(startValue);
  const end = Number(endValue);
  if (!Number.isFinite(start) || !Number.isFinite(end) || startValue === "" || endValue === "") return "";
  const delta = end - start;
  if (delta === 0) return "±0";
  return delta > 0 ? `+${delta}` : String(delta);
}

function activityLogHasContent(log = {}) {
  return Object.values(log).some((value) => String(value ?? "").trim());
}

function renderActivityLogStatus(day = getDay(), message = "") {
  const status = $("#activityLogStatus");
  if (!status) return;
  if (message) {
    status.textContent = message;
    return;
  }
  const savedAt = formatSavedAt(day.activityLogUpdatedAt);
  status.textContent = savedAt
    ? `自動保存済み ${savedAt}`
    : "活動ログは入力すると自動保存されます。";
}

function renderActivityLogWeekList() {
  const target = $("#activityLogWeekList");
  if (!target) return;
  target.replaceChildren();
  for (let index = 6; index >= 0; index -= 1) {
    const dateKey = dateKeyWithOffset(activeDate, -index);
    const day = store[dateKey];
    const log = day?.activityLog || {};
    const row = document.createElement("article");
    row.className = "activity-log-week-row";
    const deltas = [
      ["Substack購読者", formatActivityDelta(log.startSubstackSubscribers, log.endSubstackSubscribers)],
      ["Substackフォロワー", formatActivityDelta(log.startSubstackFollowers, log.endSubstackFollowers)],
      ["noteフォロワー", formatActivityDelta(log.startNoteFollowers, log.endNoteFollowers)],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label} ${value}`)
      .join(" / ");
    const title = document.createElement("strong");
    title.textContent = formatDateLabel(dateKey);
    const summary = document.createElement("p");
    summary.textContent = activityLogHasContent(log)
      ? [
          String(log.todayStep || "").split("\n").find(Boolean),
          String(log.actions || "").split("\n").find(Boolean),
          deltas,
          String(log.insight || "").split("\n").find(Boolean),
          String(log.tomorrowTrial || "").split("\n").find(Boolean),
        ].filter(Boolean).join(" / ")
      : "まだ活動ログはありません。";
    row.append(title, summary);
    target.append(row);
  }
}

function renderActivityLog() {
  const day = getDay();
  const label = $("#activityLogDateLabel");
  if (label) label.textContent = formatDateLabel(activeDate);
  Object.entries(activityLogFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field || document.activeElement === field) return;
    field.value = day.activityLog?.[key] ?? "";
  });
  renderActivityLogStatus(day);
  renderActivityLogWeekList();
}

function saveActivityLogFromField(key, field) {
  const day = getDay();
  day.activityLog[key] = field.value;
  day.activityLogUpdatedAt = new Date().toISOString();
  saveStore();
  renderActivityLogStatus(day);
  renderActivityLogWeekList();
}

function renderClock() {
  $("#timeLabel").textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function todayAchievementItems(day) {
  return [
    ...asArray(day?.dailyTasks),
    ...asArray(day?.todayTasks),
  ];
}

function todayCompletionStats(day) {
  const tracked = todayAchievementItems(day);
  const total = tracked.length;
  const done = tracked.filter(isItemCompleted).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  return { tracked, total, done, progress };
}

function renderSummary() {
  const day = getDay();
  const { total, done, progress } = todayCompletionStats(day);
  $("#dateLabel").textContent = formatDateLabel(activeDate);
  $("#progressLabel").textContent = `${progress}%`;
  $("#progressBar").style.width = `${progress}%`;
  $("#completeCount").textContent = `${done} / ${total}`;
}

function renderTaskList(listId) {
  const day = getDay();
  const target = $(`#${listId}`);
  const template = $("#taskTemplate");
  const sourceByListId = {
    todayTasks: "operation-dashboard.todayTasks",
    dailyTasks: "operation-dashboard.dailyTasks",
    projects: "operation-dashboard.projects",
  };
  target.replaceChildren();
  day[listId].forEach((item, index) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.brainSource = sourceByListId[listId] || listId;
    row.dataset.brainId = item.id || `${sourceByListId[listId] || listId}:${item.title || ""}`;
    const completed = isItemCompleted(item);
    row.classList.toggle("done", completed);
    row.classList.toggle("priority", item.priority && !completed);
    const checkbox = row.querySelector(".task-check");
    const title = row.querySelector(".task-title");
    const priority = row.querySelector(".priority-button");
    checkbox.checked = completed;
    title.value = item.title;
    let templateTitle = item.title;
    priority.classList.toggle("active", item.priority);
    checkbox.addEventListener("change", () => {
      setItemCompleted(item, checkbox.checked);
      renderAfterTaskListChange(listId);
    });
    title.addEventListener("input", () => {
      item.title = title.value;
      saveStore();
    });
    title.addEventListener("change", () => {
      if (listId === "dailyTasks") {
        updateCustomDailyTask(templateTitle, title.value.trim());
        templateTitle = title.value.trim();
      }
      renderBrainPrototype();
    });
    priority.addEventListener("click", () => {
      day[listId].forEach((candidate) => {
        if (candidate.id !== item.id) candidate.priority = false;
      });
      item.priority = !item.priority;
      renderAfterTaskListChange(listId);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      const currentIndex = day[listId].findIndex((candidate) => candidate === item || (item.id && candidate.id === item.id));
      if (currentIndex < 0) return;
      const [removed] = day[listId].splice(currentIndex, 1);
      if (listId === "dailyTasks") {
        removeCustomDailyTask(removed.title);
        saveDailyTaskOrderFromDay(day);
      }
      renderAfterTaskListChange(listId);
    });
    row.querySelectorAll(".move-button").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.move === "up" ? -1 : 1;
        const currentIndex = day[listId].findIndex((candidate) => candidate === item || (item.id && candidate.id === item.id));
        if (currentIndex < 0) return;
        const nextIndex = currentIndex + direction;
        if (nextIndex < 0 || nextIndex >= day[listId].length) return;
        const [moving] = day[listId].splice(currentIndex, 1);
        day[listId].splice(nextIndex, 0, moving);
        if (listId === "dailyTasks") saveDailyTaskOrderFromDay(day);
        renderAfterTaskListChange(listId);
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

function parseEventTimeMinutes(value) {
  const source = String(value || "").trim();
  if (!source) return Number.POSITIVE_INFINITY;
  const normalized = source
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/[：]/g, ":");
  const clockMatch = normalized.match(/(\d{1,2})\s*[:時]\s*(\d{1,2})?/);
  if (!clockMatch) return Number.POSITIVE_INFINITY;
  let hour = Number(clockMatch[1]);
  const minute = Number(clockMatch[2] || 0);
  if (!Number.isFinite(hour) || hour < 0 || hour > 24 || !Number.isFinite(minute) || minute < 0 || minute > 59) {
    return Number.POSITIVE_INFINITY;
  }
  const hasPm = /午後|PM|pm|p\.m\./.test(normalized);
  const hasAm = /午前|AM|am|a\.m\./.test(normalized);
  if (hasPm && hour < 12) hour += 12;
  if (hasAm && hour === 12) hour = 0;
  if (hour === 24 && minute > 0) return Number.POSITIVE_INFINITY;
  return hour * 60 + minute;
}

function sortTodayEvents(day = getDay()) {
  day.todayEvents = asArray(day.todayEvents)
    .map((event, index) => ({ event, index }))
    .sort((left, right) => {
      const leftTime = parseEventTimeMinutes(left.event?.time);
      const rightTime = parseEventTimeMinutes(right.event?.time);
      if (leftTime !== rightTime) return leftTime - rightTime;
      return left.index - right.index;
    })
    .map(({ event }) => event);
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
      sortTodayEvents(getDay());
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
  sortTodayEvents(getDay());
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
  sortTodayEvents(day);
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
    const updateEvent = ({ shouldSort = false } = {}) => {
      event.time = time.value.trim();
      event.type = type.value;
      event.title = title.value.trim();
      event.note = note.value.trim();
      if (shouldSort) sortTodayEvents(day);
      saveStore();
      if (shouldSort) renderEventList();
      renderRecurringSchedule();
      renderBrainPrototype();
    };
    time.value = event.time || "";
    type.value = event.type || "other";
    title.value = event.title || "";
    note.value = event.note || "";
    [time, type, title, note].forEach((field) => {
      field.addEventListener("input", () => updateEvent());
      field.addEventListener("change", () => updateEvent({ shouldSort: field === time }));
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
  const searchField = $("#persistentMemoSearch");
  if (searchField && searchField.value !== persistentMemoSearchQuery) {
    searchField.value = persistentMemoSearchQuery;
  }
  const searchQuery = normalizeLaterText(persistentMemoSearchQuery);
  const visibleMemos = persistentMemos.filter((memo) =>
    normalizeLaterText([memo.title, memo.text].filter(Boolean).join(" ")).includes(searchQuery)
  );
  const searchCount = $("#persistentMemoSearchCount");
  if (searchCount) {
    searchCount.hidden = !searchQuery;
    searchCount.querySelector("strong").textContent = visibleMemos.length;
  }
  if (!visibleMemos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = searchQuery
      ? "検索に一致するメモはありません。"
      : "メモはまだありません。";
    target.append(empty);
    return;
  }
  visibleMemos.forEach((memo) => {
    memo = normalizePersistentMemo(memo);
    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.brainSource = "operation-dashboard.persistentMemos";
    row.dataset.brainId = memo.id || `operation-dashboard.persistentMemos:${memo.title || memo.text || ""}`;
    const title = row.querySelector(".persistent-memo-title");
    const textarea = row.querySelector("textarea");
    const meta = row.querySelector(".persistent-memo-meta");
    title.value = memo.title || "";
    textarea.value = memo.text || "";
    meta.textContent = memo.updatedAt
      ? `更新 ${new Intl.DateTimeFormat("ja-JP", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(memo.updatedAt))}`
      : "";
    const persistMemoEdit = () => {
      const targetMemo = persistentMemos.find((candidate) => candidate.id === memo.id);
      if (!targetMemo) return;
      targetMemo.title = title.value;
      targetMemo.text = textarea.value;
      targetMemo.updatedAt = new Date().toISOString();
      persistentMemos = persistentMemos.map(normalizePersistentMemo);
      savePersistentMemos();
      meta.textContent = `更新 ${new Intl.DateTimeFormat("ja-JP", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(targetMemo.updatedAt))}`;
    };
    title.addEventListener("input", persistMemoEdit);
    textarea.addEventListener("input", persistMemoEdit);
    row.querySelector(".edit-button").addEventListener("click", () => {
      const field = title.value ? textarea : title;
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      if (!confirm("このメモを削除しますか？")) return;
      persistentMemos = persistentMemos.filter((candidate) => candidate.id !== memo.id);
      savePersistentMemos();
      renderPersistentMemos();
    });
    target.append(row);
    if (memo.id === focusId) {
      title.focus();
    }
  });
}

function readingQueueCounts() {
  return readingQueue.reduce(
    (counts, book) => {
      counts[book.status] = (counts[book.status] || 0) + 1;
      if (book.source === "Unlimited") counts.unlimited += 1;
      return counts;
    },
    { 未読: 0, 読み途中: 0, 完読: 0, 保留: 0, unlimited: 0 },
  );
}

function renderReadingQueue() {
  const target = $("#readingQueueList");
  if (!target) return;

  readingQueue = readingQueue.map(normalizeReadingQueueBook);
  const counts = readingQueueCounts();
  const nextBook = readingQueue.find((book) => book.status !== "完読");
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  setText("#readingQueueNext", nextBook?.title || "すべて完読");
  setText("#readingQueueUnreadCount", `${counts.未読 || 0}件`);
  setText("#readingQueueReadingCount", `${counts.読み途中 || 0}件`);
  setText("#readingQueueFinishedCount", `${counts.完読 || 0}件`);
  setText("#readingQueueUnlimitedCount", `${counts.unlimited || 0}/20`);

  target.replaceChildren();
  if (!readingQueue.length) {
    const empty = document.createElement("p");
    empty.className = "section-note";
    empty.textContent = "読む本はまだありません。";
    target.append(empty);
    return;
  }

  readingQueue.forEach((book, index) => {
    const row = document.createElement("article");
    row.className = "reading-queue-row";
    row.classList.toggle("is-reading", book.status === "読み途中");
    row.classList.toggle("is-finished", book.status === "完読");

    const rank = document.createElement("div");
    rank.className = "reading-queue-rank";
    rank.textContent = String(index + 1);

    const body = document.createElement("div");
    body.className = "reading-queue-body";

    const title = document.createElement("input");
    title.className = "reading-queue-title";
    title.type = "text";
    title.value = book.title;
    title.placeholder = "本のタイトル";
    title.setAttribute("aria-label", "本のタイトル");
    title.addEventListener("input", (event) => {
      book.title = event.target.value;
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
    });

    const meta = document.createElement("div");
    meta.className = "reading-queue-meta";

    const author = document.createElement("input");
    author.type = "text";
    author.value = book.author;
    author.placeholder = "著者";
    author.setAttribute("aria-label", "著者");
    author.addEventListener("input", (event) => {
      book.author = event.target.value;
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
    });

    const source = document.createElement("select");
    source.setAttribute("aria-label", "種別");
    READING_QUEUE_SOURCES.forEach((sourceName) => {
      const option = document.createElement("option");
      option.value = sourceName;
      option.textContent = sourceName;
      option.selected = book.source === sourceName;
      source.append(option);
    });
    source.addEventListener("change", (event) => {
      book.source = event.target.value;
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
      renderReadingQueue();
    });

    const status = document.createElement("select");
    status.setAttribute("aria-label", "読書状態");
    READING_QUEUE_STATUSES.forEach((statusName) => {
      const option = document.createElement("option");
      option.value = statusName;
      option.textContent = statusName;
      option.selected = book.status === statusName;
      status.append(option);
    });
    status.addEventListener("change", (event) => {
      book.status = event.target.value;
      if (book.status === "完読") book.progress = 100;
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
      renderReadingQueue();
    });

    meta.append(author, source, status);

    const progressLabel = document.createElement("label");
    progressLabel.className = "reading-queue-progress";
    const progressText = document.createElement("span");
    progressText.textContent = `進捗 ${book.progress}%`;
    const progress = document.createElement("input");
    progress.type = "range";
    progress.min = "0";
    progress.max = "100";
    progress.value = String(book.progress);
    progress.addEventListener("input", (event) => {
      book.progress = Number(event.target.value);
      if (book.progress >= 100) book.status = "完読";
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
      renderReadingQueue();
    });
    progressLabel.append(progressText, progress);

    const memo = document.createElement("textarea");
    memo.value = book.memo;
    memo.placeholder = "読む目的、使えそうな章、読後メモ";
    memo.rows = 2;
    memo.setAttribute("aria-label", "読書メモ");
    memo.addEventListener("input", (event) => {
      book.memo = event.target.value;
      book.updatedAt = new Date().toISOString();
      saveReadingQueue();
    });

    body.append(title, meta, progressLabel, memo);

    const actions = document.createElement("div");
    actions.className = "reading-queue-actions";

    const moveUp = document.createElement("button");
    moveUp.type = "button";
    moveUp.className = "ghost-button";
    moveUp.textContent = "↑";
    moveUp.title = "上へ";
    moveUp.disabled = index === 0;
    moveUp.addEventListener("click", () => {
      const [item] = readingQueue.splice(index, 1);
      readingQueue.splice(index - 1, 0, item);
      saveReadingQueue();
      renderReadingQueue();
    });

    const moveDown = document.createElement("button");
    moveDown.type = "button";
    moveDown.className = "ghost-button";
    moveDown.textContent = "↓";
    moveDown.title = "下へ";
    moveDown.disabled = index === readingQueue.length - 1;
    moveDown.addEventListener("click", () => {
      const [item] = readingQueue.splice(index, 1);
      readingQueue.splice(index + 1, 0, item);
      saveReadingQueue();
      renderReadingQueue();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "ghost-button danger-text-button";
    remove.textContent = "削除";
    remove.addEventListener("click", () => {
      if (!confirm("この本を読む本リストから削除しますか？")) return;
      readingQueue = readingQueue.filter((candidate) => candidate.id !== book.id);
      saveReadingQueue();
      renderReadingQueue();
    });

    actions.append(moveUp, moveDown, remove);
    row.append(rank, body, actions);
    target.append(row);
  });
}

function readingNoteSearchText(note) {
  return [
    note.date,
    note.source,
    note.state,
    note.title,
    note.url,
    note.learning,
    note.use,
    note.memo,
  ]
    .map((value) => normalizeLaterText(value || ""))
    .join(" ");
}

function visibleReadingNotes() {
  const searchQuery = normalizeLaterText(readingNoteSearchQuery);
  return readingNotes
    .filter((note) => !searchQuery || readingNoteSearchText(note).includes(searchQuery))
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
}

function formatReadingNoteTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function autoResizeReadingTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight + 2}px`;
}

function autoResizeReadingNoteTextareas() {
  document.querySelectorAll(".reading-note-form textarea").forEach(autoResizeReadingTextarea);
}

function readReadingNoteForm() {
  return {
    date: $("#readingNoteDate")?.value || activeDate,
    source: $("#readingNoteSource")?.value.trim() || "",
    title: $("#readingNoteTitle")?.value.trim() || "",
    state: $("#readingNoteState")?.value || "未読",
    memo: $("#readingNoteMemo")?.value.trim() || "",
  };
}

function fillReadingNoteForm(note) {
  const normalized = normalizeReadingNote(note || newReadingNote());
  $("#readingNoteDate").value = normalized.date || activeDate;
  $("#readingNoteSource").value = normalized.source || "";
  $("#readingNoteTitle").value = normalized.title || "";
  $("#readingNoteState").value = normalized.state || "未読";
  $("#readingNoteMemo").value = normalized.memo || [normalized.learning, normalized.use && `活かし方: ${normalized.use}`]
    .filter(Boolean)
    .join("\n\n");
  autoResizeReadingNoteTextareas();
}

function openReadingNoteForm(note = null) {
  const form = $("#readingNoteForm");
  if (!form) return;
  editingReadingNoteId = note?.id || "";
  form.hidden = false;
  $("#readingNoteFormTitle").textContent = note ? "読書メモを編集" : "新しい読書メモ";
  $("#deleteReadingNote").hidden = !note;
  const saveButton = $("#saveReadingNote");
  if (saveButton) saveButton.textContent = note ? "更新する" : "追加する";
  const status = $("#readingNoteStatus");
  if (status) status.textContent = note ? "編集できます。" : "タイトルかメモを書くと保存できます。";
  fillReadingNoteForm(note || newReadingNote());
  renderReadingNotes();
  requestAnimationFrame(() => {
    $("#readingNoteTitle")?.focus();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function closeReadingNoteForm() {
  const form = $("#readingNoteForm");
  if (!form) return;
  editingReadingNoteId = "";
  form.hidden = true;
  fillReadingNoteForm(newReadingNote());
  const saveButton = $("#saveReadingNote");
  if (saveButton) saveButton.textContent = "追加する";
  renderReadingNotes();
}

function saveReadingNoteFromForm(event) {
  event?.preventDefault();
  const values = readReadingNoteForm();
  const status = $("#readingNoteStatus");
  if (!values.title && !values.memo) {
    if (status) status.textContent = "タイトルかメモを書いてください。";
    $("#readingNoteTitle")?.focus();
    return;
  }
  const now = new Date().toISOString();
  const existing = readingNotes.find((note) => note.id === editingReadingNoteId);
  if (existing) {
    Object.assign(existing, values, { updatedAt: now });
  } else {
    readingNotes.unshift({
      ...newReadingNote(),
      ...values,
      createdAt: now,
      updatedAt: now,
    });
  }
  readingNotes = readingNotes.map(normalizeReadingNote);
  saveReadingNotes();
  closeReadingNoteForm();
}

function deleteEditingReadingNote() {
  if (!editingReadingNoteId) return;
  if (!confirm("この読書メモを削除しますか？")) return;
  readingNotes = readingNotes.filter((note) => note.id !== editingReadingNoteId);
  saveReadingNotes();
  closeReadingNoteForm();
}

function renderReadingNotes() {
  const target = $("#readingNoteList");
  if (!target) return;
  const searchField = $("#readingNoteSearch");
  if (searchField && searchField.value !== readingNoteSearchQuery) {
    searchField.value = readingNoteSearchQuery;
  }
  const notes = visibleReadingNotes();
  const count = $("#readingNoteCount");
  if (count) count.textContent = `${notes.length}件`;
  target.replaceChildren();
  if (!notes.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = normalizeLaterText(readingNoteSearchQuery)
      ? "検索に一致する読書メモはありません。"
      : "読書メモはまだありません。";
    target.append(empty);
    return;
  }
  notes.forEach((note) => {
    const article = document.createElement("article");
    article.className = "reading-note-card";
    article.classList.toggle("editing", note.id === editingReadingNoteId);

    const meta = document.createElement("div");
    meta.className = "reading-note-card-meta";
    const date = document.createElement("span");
    date.textContent = note.date || "";
    const source = document.createElement("span");
    source.textContent = note.source ? `インプット元: ${note.source}` : "インプット元未入力";
    const state = document.createElement("span");
    state.textContent = note.state || "未読";
    const time = document.createElement("span");
    time.textContent = note.updatedAt ? `更新 ${formatReadingNoteTime(note.updatedAt)}` : "";
    meta.append(date, source, state, time);

    const title = document.createElement("h3");
    title.textContent = note.title || "タイトル未入力の読書メモ";
    const memo = document.createElement("p");
    memo.className = "reading-note-card-memo";
    memo.textContent = note.memo || note.learning || "";

    const actions = document.createElement("div");
    actions.className = "reading-note-card-actions";
    const edit = document.createElement("button");
    edit.className = "ghost-button";
    edit.type = "button";
    edit.textContent = "編集";
    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "削除";
    actions.append(edit, remove);

    edit.addEventListener("click", () => openReadingNoteForm(note));
    remove.addEventListener("click", () => {
      if (!confirm("この読書メモを削除しますか？")) return;
      readingNotes = readingNotes.filter((candidate) => candidate.id !== note.id);
      saveReadingNotes();
      if (editingReadingNoteId === note.id) closeReadingNoteForm();
      renderReadingNotes();
    });

    article.append(meta, title, memo);
    article.append(actions);
    target.append(article);
  });
}

function selectedLearningAssetValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function setLearningAssetCheckedValues(name, values) {
  const selected = new Set(Array.isArray(values) ? values : []);
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function setLearningAssetFieldValue(selector, value) {
  const field = $(selector);
  if (field) field.value = value ?? "";
}

function readLearningAssetForm() {
  return {
    date: $("#learningAssetDate")?.value || activeDate,
    sourceType: $("#learningAssetSourceType")?.value || "本",
    title: $("#learningAssetTitle")?.value.trim() || "",
    knowledgeName: $("#learningAssetKnowledgeName")?.value.trim() || "",
    oneLineConclusion: $("#learningAssetOneLineConclusion")?.value.trim() || "",
    knowledgeOverview: $("#learningAssetKnowledgeOverview")?.value.trim() || "",
    todayAction: $("#learningAssetTodayAction")?.value.trim() || "",
    useScene: $("#learningAssetUseScene")?.value.trim() || "",
    beginnerExplanation: $("#learningAssetBeginnerExplanation")?.value.trim() || "",
    articleIdeas: $("#learningAssetArticleIdeas")?.value.trim() || "",
    podcastIdeas: $("#learningAssetPodcastIdeas")?.value.trim() || "",
    aiUseSimple: $("#learningAssetAiUseSimple")?.value.trim() || "",
    tagsSimple: $("#learningAssetTagsSimple")?.value.trim() || "",
    author: $("#learningAssetAuthor")?.value.trim() || "",
    genre: $("#learningAssetGenre")?.value.trim() || "",
    rating: $("#learningAssetRating")?.value || "",
    importanceRating: $("#learningAssetImportanceRating")?.value || "",
    practicalRating: $("#learningAssetPracticalRating")?.value || "",
    beginnerRating: $("#learningAssetBeginnerRating")?.value || "",
    rereadRating: $("#learningAssetRereadRating")?.value || "",
    status: $("#learningAssetStatus")?.value || "知識化待ち",
    summary3Lines: $("#learningAssetSummary3Lines")?.value.trim() || "",
    coreIdea: $("#learningAssetCoreIdea")?.value.trim() || "",
    top10: $("#learningAssetTop10")?.value.trim() || "",
    publishingUse: $("#learningAssetPublishingUse")?.value.trim() || "",
    useSubstack: $("#learningAssetUseSubstack")?.value.trim() || "",
    useNote: $("#learningAssetUseNote")?.value.trim() || "",
    usePodcast: $("#learningAssetUsePodcast")?.value.trim() || "",
    useLive: $("#learningAssetUseLive")?.value.trim() || "",
    useNotes: $("#learningAssetUseNotes")?.value.trim() || "",
    useX: $("#learningAssetUseX")?.value.trim() || "",
    useAi: $("#learningAssetUseAi")?.value.trim() || "",
    contentIdeas: $("#learningAssetContentIdeas")?.value.trim() || "",
    impression: $("#learningAssetImpression")?.value.trim() || "",
    rayDialogue: $("#learningAssetRayDialogue")?.value.trim() || "",
    myThought: $("#learningAssetMyThought")?.value.trim() || "",
    hypothesis: $("#learningAssetHypothesis")?.value.trim() || "",
    experimentIdea: $("#learningAssetExperimentIdea")?.value.trim() || "",
    articleIdea: $("#learningAssetArticleIdea")?.value.trim() || "",
    experimentResult: $("#learningAssetExperimentResult")?.value.trim() || "",
    practiceTomorrow: $("#learningAssetPracticeTomorrow")?.value.trim() || "",
    practiced: $("#learningAssetPracticed")?.value.trim() || "",
    result: $("#learningAssetResult")?.value.trim() || "",
    learning: $("#learningAssetLearning")?.value.trim() || "",
    nextTrial: $("#learningAssetNextTrial")?.value.trim() || "",
    knowledgeTags: $("#learningAssetKnowledgeTags")?.value.trim() || "",
    contentCounts: {
      article: Number.parseInt($("#learningAssetCountArticle")?.value, 10) || 0,
      podcast: Number.parseInt($("#learningAssetCountPodcast")?.value, 10) || 0,
      notes: Number.parseInt($("#learningAssetCountNotes")?.value, 10) || 0,
      x: Number.parseInt($("#learningAssetCountX")?.value, 10) || 0,
      kindle: Number.parseInt($("#learningAssetCountKindle")?.value, 10) || 0,
      brain: Number.parseInt($("#learningAssetCountBrain")?.value, 10) || 0,
    },
    contentLinks: $("#learningAssetContentLinks")?.value.trim() || "",
    relatedArticleTitle: $("#learningAssetRelatedArticleTitle")?.value.trim() || "",
    relatedArticleUrl: $("#learningAssetRelatedArticleUrl")?.value.trim() || "",
    publishedTo: selectedLearningAssetValues("learningAssetPublishedTo"),
    connectsTo: selectedLearningAssetValues("learningAssetConnectsTo"),
  };
}

function fillLearningAssetForm(item) {
  const asset = item || blankLearningAsset();
  setLearningAssetFieldValue("#learningAssetDate", asset.date || activeDate);
  setLearningAssetFieldValue("#learningAssetSourceType", asset.sourceType || "本");
  setLearningAssetFieldValue("#learningAssetTitle", asset.title || "");
  setLearningAssetFieldValue("#learningAssetKnowledgeName", asset.knowledgeName || asset.coreIdea || "");
  setLearningAssetFieldValue("#learningAssetOneLineConclusion", asset.oneLineConclusion || asset.coreIdea || asset.knowledgeName || "");
  setLearningAssetFieldValue("#learningAssetKnowledgeOverview", asset.knowledgeOverview || asset.summary3Lines || "");
  setLearningAssetFieldValue("#learningAssetTodayAction", asset.todayAction || asset.practiceTomorrow || asset.experimentIdea || "");
  setLearningAssetFieldValue("#learningAssetUseScene", asset.useScene || asset.publishingUse || "");
  setLearningAssetFieldValue("#learningAssetBeginnerExplanation", asset.beginnerExplanation || "");
  setLearningAssetFieldValue("#learningAssetArticleIdeas", asset.articleIdeas || asset.contentIdeas || asset.articleIdea || "");
  setLearningAssetFieldValue("#learningAssetPodcastIdeas", asset.podcastIdeas || "");
  setLearningAssetFieldValue("#learningAssetAiUseSimple", asset.aiUseSimple || asset.useAi || "");
  setLearningAssetFieldValue("#learningAssetTagsSimple", asset.tagsSimple || asset.knowledgeTags || "");
  setLearningAssetFieldValue("#learningAssetAuthor", asset.author || "");
  setLearningAssetFieldValue("#learningAssetGenre", asset.genre || "");
  setLearningAssetFieldValue("#learningAssetRating", asset.rating || "");
  setLearningAssetFieldValue("#learningAssetImportanceRating", asset.importanceRating || asset.rating || "");
  setLearningAssetFieldValue("#learningAssetPracticalRating", asset.practicalRating || "");
  setLearningAssetFieldValue("#learningAssetBeginnerRating", asset.beginnerRating || "");
  setLearningAssetFieldValue("#learningAssetRereadRating", asset.rereadRating || "");
  setLearningAssetFieldValue("#learningAssetStatus", asset.status || "知識化待ち");
  setLearningAssetFieldValue("#learningAssetSummary3Lines", asset.summary3Lines || asset.impression || "");
  setLearningAssetFieldValue("#learningAssetCoreIdea", asset.coreIdea || asset.myThought || "");
  setLearningAssetFieldValue("#learningAssetTop10", asset.top10 || "");
  setLearningAssetFieldValue("#learningAssetPublishingUse", asset.publishingUse || "");
  setLearningAssetFieldValue("#learningAssetUseSubstack", asset.useSubstack || "");
  setLearningAssetFieldValue("#learningAssetUseNote", asset.useNote || "");
  setLearningAssetFieldValue("#learningAssetUsePodcast", asset.usePodcast || "");
  setLearningAssetFieldValue("#learningAssetUseLive", asset.useLive || "");
  setLearningAssetFieldValue("#learningAssetUseNotes", asset.useNotes || "");
  setLearningAssetFieldValue("#learningAssetUseX", asset.useX || "");
  setLearningAssetFieldValue("#learningAssetUseAi", asset.useAi || "");
  setLearningAssetFieldValue("#learningAssetContentIdeas", asset.contentIdeas || asset.articleIdea || "");
  setLearningAssetFieldValue("#learningAssetImpression", asset.impression || "");
  setLearningAssetFieldValue("#learningAssetRayDialogue", asset.rayDialogue || "");
  setLearningAssetFieldValue("#learningAssetMyThought", asset.myThought || "");
  setLearningAssetFieldValue("#learningAssetHypothesis", asset.hypothesis || "");
  setLearningAssetFieldValue("#learningAssetExperimentIdea", asset.experimentIdea || "");
  setLearningAssetFieldValue("#learningAssetArticleIdea", asset.articleIdea || "");
  setLearningAssetFieldValue("#learningAssetExperimentResult", asset.experimentResult || "");
  setLearningAssetFieldValue("#learningAssetPracticeTomorrow", asset.practiceTomorrow || asset.experimentIdea || "");
  setLearningAssetFieldValue("#learningAssetPracticed", asset.practiced || "");
  setLearningAssetFieldValue("#learningAssetResult", asset.result || asset.experimentResult || "");
  setLearningAssetFieldValue("#learningAssetLearning", asset.learning || "");
  setLearningAssetFieldValue("#learningAssetNextTrial", asset.nextTrial || "");
  setLearningAssetFieldValue("#learningAssetKnowledgeTags", asset.knowledgeTags || "");
  setLearningAssetFieldValue("#learningAssetCountArticle", asset.contentCounts?.article || "");
  setLearningAssetFieldValue("#learningAssetCountPodcast", asset.contentCounts?.podcast || "");
  setLearningAssetFieldValue("#learningAssetCountNotes", asset.contentCounts?.notes || "");
  setLearningAssetFieldValue("#learningAssetCountX", asset.contentCounts?.x || "");
  setLearningAssetFieldValue("#learningAssetCountKindle", asset.contentCounts?.kindle || "");
  setLearningAssetFieldValue("#learningAssetCountBrain", asset.contentCounts?.brain || "");
  setLearningAssetFieldValue("#learningAssetContentLinks", asset.contentLinks || "");
  setLearningAssetFieldValue("#learningAssetRelatedArticleTitle", asset.relatedArticleTitle || "");
  setLearningAssetFieldValue("#learningAssetRelatedArticleUrl", asset.relatedArticleUrl || "");
  setLearningAssetCheckedValues("learningAssetPublishedTo", asset.publishedTo);
  setLearningAssetCheckedValues("learningAssetConnectsTo", asset.connectsTo);
}

function openLearningAssetForm(item = null) {
  const form = $("#learningAssetForm");
  if (!form) return;
  editingLearningAssetId = item?.id || "";
  form.hidden = false;
  $("#learningAssetFormTitle").textContent = item ? "知識カードを編集" : "新しい知識カード";
  $("#deleteLearningAsset").hidden = !item;
  const status = $("#learningAssetStatusMessage");
  if (status) status.textContent = item ? "後日追記や状態変更ができます。" : "知識名、概要、活用場面のどれかを書くと保存できます。";
  fillLearningAssetForm(item || blankLearningAsset());
  renderLearningAssets();
  requestAnimationFrame(() => {
    $("#learningAssetTitle")?.focus();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function closeLearningAssetForm() {
  const form = $("#learningAssetForm");
  if (!form) return;
  editingLearningAssetId = "";
  form.hidden = true;
  fillLearningAssetForm(blankLearningAsset());
  renderLearningAssets();
}

function saveLearningAssetFromForm(event) {
  event?.preventDefault();
  const values = readLearningAssetForm();
  const status = $("#learningAssetStatusMessage");
  if (!values.title && !values.knowledgeName && !values.oneLineConclusion && !values.todayAction && !values.summary3Lines && !values.coreIdea && !values.publishingUse) {
    if (status) status.textContent = "知識名、一言結論、今日すぐ実践、タイトル、3行要約、一番重要な考え方のどれかを入れると保存できます。";
    $("#learningAssetKnowledgeName")?.focus();
    return;
  }
  const now = new Date().toISOString();
  const existing = learningAssets.find((item) => item.id === editingLearningAssetId);
  if (existing) {
    Object.assign(existing, normalizeLearningAsset({ ...existing, ...values, updatedAt: now }));
  } else {
    learningAssets.unshift(normalizeLearningAsset({
      ...blankLearningAsset(),
      ...values,
      createdAt: now,
      updatedAt: now,
    }));
  }
  saveLearningAssets();
  closeLearningAssetForm();
}

function deleteEditingLearningAsset() {
  if (!editingLearningAssetId) return;
  if (!confirm("この知識カードを削除しますか？")) return;
  learningAssets = learningAssets.filter((item) => item.id !== editingLearningAssetId);
  saveLearningAssets();
  closeLearningAssetForm();
}

function learningAssetSearchText(item) {
  return [
    item.date,
    item.sourceType,
    item.title,
    item.knowledgeName,
    item.oneLineConclusion,
    item.knowledgeOverview,
    item.todayAction,
    item.useScene,
    item.beginnerExplanation,
    item.articleIdeas,
    item.podcastIdeas,
    item.aiUseSimple,
    item.tagsSimple,
    item.author,
    item.genre,
    item.rating,
    item.importanceRating,
    item.practicalRating,
    item.beginnerRating,
    item.rereadRating,
    item.status,
    item.summary3Lines,
    item.coreIdea,
    item.top10,
    item.publishingUse,
    item.useSubstack,
    item.useNote,
    item.usePodcast,
    item.useLive,
    item.useNotes,
    item.useX,
    item.useAi,
    item.contentIdeas,
    item.impression,
    item.rayDialogue,
    item.myThought,
    item.hypothesis,
    item.experimentIdea,
    item.articleIdea,
    item.experimentResult,
    item.practiceTomorrow,
    item.practiced,
    item.result,
    item.learning,
    item.nextTrial,
    item.knowledgeTags,
    item.contentLinks,
    item.relatedArticleTitle,
    item.relatedArticleUrl,
    ...(item.publishedTo || []),
    ...(item.connectsTo || []),
  ].map((value) => normalizeLaterText(value || "")).join(" ");
}

function visibleLearningAssets() {
  const query = normalizeLaterText(learningAssetSearchQuery);
  return learningAssets
    .filter((item) => learningAssetStatusFilter === "all" || item.status === learningAssetStatusFilter)
    .filter((item) => !query || learningAssetSearchText(item).includes(query))
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
}

function renderLearningAssetSummary() {
  const counts = Object.fromEntries(LEARNING_ASSET_STATUSES.map((status) => [status, 0]));
  const outputCounts = { article: 0, podcast: 0, notes: 0, x: 0 };
  learningAssets.forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    outputCounts.article += Number(item.contentCounts?.article || 0);
    outputCounts.podcast += Number(item.contentCounts?.podcast || 0);
    outputCounts.notes += Number(item.contentCounts?.notes || 0);
    outputCounts.x += Number(item.contentCounts?.x || 0);
  });
  const targets = {
    "知識化待ち": "#learningAssetWaitingCount",
    "Codex抽出済み": "#learningAssetDialoguedCount",
    "実践待ち": "#learningAssetExperimentCount",
    "コンテンツ化待ち": "#learningAssetArticleCount",
    "資産化完了": "#learningAssetDoneCount",
  };
  Object.entries(targets).forEach(([status, selector]) => {
    const target = $(selector);
    if (target) target.textContent = `${counts[status] || 0}件`;
  });
  [
    ["#readingLaboArticleCount", outputCounts.article],
    ["#readingLaboPodcastCount", outputCounts.podcast],
    ["#readingLaboNotesCount", outputCounts.notes],
    ["#readingLaboXCount", outputCounts.x],
  ].forEach(([selector, value]) => {
    const target = $(selector);
    if (target) target.textContent = `${value}本`;
  });
}

function learningAssetSplitTags(value) {
  return String(value || "")
    .split(/[,\u3001\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function knowledgeAssetTags(item) {
  return [...new Set([
    ...(item.connectsTo || []),
    ...learningAssetSplitTags(item.tagsSimple),
    ...learningAssetSplitTags(item.knowledgeTags),
    ...learningAssetSplitTags(item.genre),
  ].filter(Boolean))];
}

function learningAssetOutputTotal(item) {
  return Object.values(item.contentCounts || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function renderKnowledgeTagCloud() {
  const target = $("#knowledgeTagCloud");
  if (!target) return;
  const tagCounts = new Map();
  learningAssets.forEach((item) => {
    knowledgeAssetTags(item).forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  const tags = [...tagCounts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "ja"));
  target.replaceChildren();
  if (!tags.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "タグはまだありません。知識カードにタグを入れるとここに並びます。";
    target.append(empty);
    return;
  }
  tags.slice(0, 32).forEach(([tag, count]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "knowledge-tag-button";
    button.classList.toggle("is-active", normalizeLaterText(learningAssetSearchQuery) === normalizeLaterText(tag));
    button.textContent = `${tag} ${count}`;
    button.addEventListener("click", () => {
      learningAssetSearchQuery = tag;
      renderLearningAssets();
      $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    target.append(button);
  });
}

function createKnowledgeMiniItem(titleText, metaText, noteText = "") {
  const item = document.createElement("article");
  item.className = "knowledge-mini-item";
  const title = document.createElement("strong");
  title.textContent = titleText;
  const meta = document.createElement("span");
  meta.textContent = metaText;
  item.append(title, meta);
  if (noteText) {
    const note = document.createElement("p");
    note.textContent = noteText;
    item.append(note);
  }
  return item;
}

function renderKnowledgeUntappedList() {
  const target = $("#knowledgeUntappedList");
  if (!target) return;
  const items = learningAssets
    .filter((item) => learningAssetOutputTotal(item) === 0 && item.status !== "資産化完了")
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 6);
  target.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "未活用の知識はありません。";
    target.append(empty);
    return;
  }
  items.forEach((item) => {
    const title = item.knowledgeName || item.title || "知識名未入力";
    const meta = [item.status, knowledgeAssetTags(item).slice(0, 3).join(" / ")].filter(Boolean).join(" - ");
    const row = createKnowledgeMiniItem(title, meta || "タグ未設定", item.useScene || item.beginnerExplanation || "");
    row.addEventListener("click", () => {
      learningAssetSearchQuery = title;
      renderLearningAssets();
      $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    target.append(row);
  });
}

function renderKnowledgeSourceSummary() {
  const target = $("#knowledgeSourceSummary");
  if (!target) return;
  const groups = new Map();
  learningAssets.forEach((item) => {
    const key = item.title || item.sourceType || "情報源未入力";
    const group = groups.get(key) || { title: key, count: 0, output: 0, tags: new Map(), latest: "" };
    group.count += 1;
    group.output += learningAssetOutputTotal(item);
    if (!group.latest || String(item.updatedAt || item.createdAt || "") > group.latest) {
      group.latest = item.updatedAt || item.createdAt || "";
    }
    knowledgeAssetTags(item).forEach((tag) => group.tags.set(tag, (group.tags.get(tag) || 0) + 1));
    groups.set(key, group);
  });
  const summaries = [...groups.values()]
    .sort((a, b) => new Date(b.latest || 0) - new Date(a.latest || 0))
    .slice(0, 6);
  target.replaceChildren();
  if (!summaries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "情報源ごとのまとまりはまだありません。";
    target.append(empty);
    return;
  }
  summaries.forEach((group) => {
    const tags = [...group.tags.entries()].sort((left, right) => right[1] - left[1]).slice(0, 3).map(([tag]) => tag).join(" / ");
    const row = createKnowledgeMiniItem(group.title, `知識${group.count}件 - 成果${group.output}本`, tags ? `主なタグ: ${tags}` : "");
    row.addEventListener("click", () => {
      learningAssetSearchQuery = group.title;
      renderLearningAssets();
      $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    target.append(row);
  });
}

function renderKnowledgeLaboInsights() {
  renderKnowledgeTagCloud();
  renderKnowledgeUntappedList();
  renderKnowledgeSourceSummary();
}

function appendLearningAssetDetail(details, label, value) {
  if (!value) return;
  const row = document.createElement("p");
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  row.append(labelNode, value);
  details.append(row);
}

function learningAssetStars(value) {
  const count = Math.max(0, Math.min(5, Number.parseInt(value, 10) || 0));
  return count ? "★".repeat(count) : "未評価";
}

function appendLearningAssetUseItem(target, label, value) {
  if (!value) return;
  const item = document.createElement("div");
  item.className = "learning-asset-use-item";
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  const valueNode = document.createElement("p");
  valueNode.textContent = value;
  item.append(labelNode, valueNode);
  target.append(item);
}

function createLearningAssetDetailSection(title, rows) {
  const section = document.createElement("section");
  section.className = "learning-asset-detail-section";
  const heading = document.createElement("h4");
  heading.textContent = title;
  const details = document.createElement("div");
  details.className = "learning-asset-card-details";
  rows.forEach(([label, value]) => appendLearningAssetDetail(details, label, value));
  if (!details.children.length) return null;
  section.append(heading, details);
  return section;
}

function createLearningAssetCard(item) {
  const card = document.createElement("article");
  card.className = `learning-asset-card status-${item.status}`;
  card.classList.toggle("editing", item.id === editingLearningAssetId);

  const meta = document.createElement("div");
  meta.className = "learning-asset-card-meta";
  const source = document.createElement("span");
  source.textContent = `${item.date || "読了日未入力"} / ${item.sourceType || "その他"}`;
  const bookMeta = document.createElement("span");
  bookMeta.textContent = [item.title, item.author, item.genre].filter(Boolean).join(" / ") || "基本情報未入力";
  const status = document.createElement("select");
  status.setAttribute("aria-label", "知識カードの状態");
  LEARNING_ASSET_STATUSES.forEach((statusName) => {
    const option = document.createElement("option");
    option.value = statusName;
    option.textContent = statusName;
    option.selected = item.status === statusName;
    status.append(option);
  });
  status.addEventListener("change", (event) => {
    item.status = event.target.value;
    item.updatedAt = new Date().toISOString();
    saveLearningAssets();
    renderLearningAssets();
  });
  meta.append(source, bookMeta, status);

  const title = document.createElement("h3");
  title.textContent = item.knowledgeName || item.title || "知識名未入力の知識カード";
  const conclusion = document.createElement("p");
  conclusion.className = "learning-asset-conclusion";
  conclusion.textContent = `結論: ${item.oneLineConclusion || item.coreIdea || item.knowledgeName || "この知識を一言で表す結論は未入力です。"}`;
  const impression = document.createElement("p");
  impression.className = "learning-asset-card-impression";
  impression.textContent = item.knowledgeOverview || item.summary3Lines || item.impression || "概要は未入力です。";

  const dailyUse = document.createElement("section");
  dailyUse.className = "learning-asset-daily-use";
  const dailyUseHeading = document.createElement("h4");
  dailyUseHeading.textContent = "今日使えること";
  const dailyUseGrid = document.createElement("div");
  dailyUseGrid.className = "learning-asset-daily-use-grid";
  appendLearningAssetUseItem(dailyUseGrid, "この教材から実践する1つ", item.practiceTomorrow || item.todayAction || item.experimentIdea);
  appendLearningAssetUseItem(dailyUseGrid, "一番重要な考え方", item.coreIdea || item.myThought);
  appendLearningAssetUseItem(dailyUseGrid, "次に試すこと", item.nextTrial || item.experimentIdea);
  appendLearningAssetUseItem(dailyUseGrid, "使う場面", item.useScene || item.publishingUse);
  if (!dailyUseGrid.children.length) appendLearningAssetUseItem(dailyUseGrid, "今日すぐ実践", "実践内容は未入力です。");
  dailyUse.append(dailyUseHeading, dailyUseGrid);

  const ratings = document.createElement("div");
  ratings.className = "learning-asset-rating-grid";
  [
    ["重要度", item.importanceRating || item.rating],
    ["すぐ使える度", item.practicalRating],
    ["初心者向け度", item.beginnerRating],
    ["再読したい度", item.rereadRating],
  ].forEach(([label, value]) => {
    const rating = document.createElement("span");
    rating.textContent = `${label}: ${learningAssetStars(value)}`;
    ratings.append(rating);
  });

  const tags = document.createElement("div");
  tags.className = "learning-asset-tags";
  [...knowledgeAssetTags(item), ...(item.publishedTo || [])].forEach((value) => {
    const tag = document.createElement("span");
    tag.textContent = value;
    tags.append(tag);
  });

  const counts = document.createElement("div");
  counts.className = "reading-labo-content-counts";
  [
    ["記事", item.contentCounts?.article],
    ["Podcast", item.contentCounts?.podcast],
    ["Notes", item.contentCounts?.notes],
    ["X", item.contentCounts?.x],
    ["Kindle", item.contentCounts?.kindle],
    ["Brain", item.contentCounts?.brain],
  ].forEach(([label, value]) => {
    if (!value) return;
    const count = document.createElement("span");
    count.textContent = `${label} ${value}本`;
    counts.append(count);
  });

  const practicalDetails = createLearningAssetDetailSection("実践用", [
    ["記事アイデア", item.articleIdeas],
    ["Podcastアイデア", item.podcastIdeas],
    ["Notes / X / Kindle / Brain", item.contentIdeas],
    ["AI活用", item.aiUseSimple || item.useAi],
    ["発信活動への応用", item.publishingUse],
    ["Substack", item.useSubstack],
    ["note", item.useNote],
    ["Podcast", item.usePodcast],
    ["ライブ配信", item.useLive],
    ["Notes", item.useNotes],
    ["X", item.useX],
    ["実践したこと", item.practiced],
    ["結果", item.result || item.experimentResult],
    ["学び", item.learning],
    ["次に試すこと", item.nextTrial],
    ["紐付けた成果物", item.contentLinks],
  ]);
  const savedDetails = createLearningAssetDetailSection("保存用", [
    ["本・入口", item.title],
    ["概要", item.knowledgeOverview || item.summary3Lines],
    ["3行要約", item.summary3Lines],
    ["初心者向け説明", item.beginnerExplanation],
    ["重要ポイントTOP10", item.top10],
    ["タグ", item.knowledgeTags || item.tagsSimple],
    ["仮説", item.hypothesis],
    ["記事候補", item.articleIdea],
  ]);
  if (item.relatedArticleTitle || item.relatedArticleUrl) {
    const row = document.createElement("p");
    const labelNode = document.createElement("span");
    labelNode.textContent = "関連する記事";
    row.append(labelNode);
    if (item.relatedArticleUrl) {
      const link = document.createElement("a");
      link.href = item.relatedArticleUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = item.relatedArticleTitle || item.relatedArticleUrl;
      row.append(link);
    } else {
      row.append(item.relatedArticleTitle);
    }
    practicalDetails?.querySelector(".learning-asset-card-details")?.append(row);
  }

  const actions = document.createElement("div");
  actions.className = "learning-asset-card-actions";
  const edit = document.createElement("button");
  edit.className = "ghost-button";
  edit.type = "button";
  edit.textContent = "編集";
  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.textContent = "削除";
  edit.addEventListener("click", () => openLearningAssetForm(item));
  remove.addEventListener("click", () => {
    if (!confirm("この知識カードを削除しますか？")) return;
    learningAssets = learningAssets.filter((candidate) => candidate.id !== item.id);
    saveLearningAssets();
    if (editingLearningAssetId === item.id) closeLearningAssetForm();
    renderLearningAssets();
  });
  actions.append(edit, remove);

  card.append(meta, title, conclusion, dailyUse, ratings, impression);
  if (tags.children.length) card.append(tags);
  if (counts.children.length) card.append(counts);
  if (practicalDetails) card.append(practicalDetails);
  if (savedDetails) card.append(savedDetails);
  card.append(actions);
  return card;
}

function renderLearningAssets() {
  const target = $("#learningAssetList");
  if (!target) return;
  const searchField = $("#learningAssetSearch");
  if (searchField && searchField.value !== learningAssetSearchQuery) searchField.value = learningAssetSearchQuery;
  const filter = $("#learningAssetStatusFilter");
  if (filter && filter.value !== learningAssetStatusFilter) filter.value = learningAssetStatusFilter;
  renderLearningAssetSummary();
  renderKnowledgeLaboInsights();
  const items = visibleLearningAssets();
  const count = $("#learningAssetSearchCount");
  if (count) count.textContent = `${items.length}件表示`;
  target.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = learningAssets.length ? "条件に一致する知識カードはありません。" : "知識カードはまだありません。";
    target.append(empty);
    return;
  }
  target.append(...items.map(createLearningAssetCard));
}

function renderReadingLaboTemplate() {
  const field = $("#readingLaboTemplate");
  if (field && field.value !== READING_LABO_TEMPLATE) {
    field.value = READING_LABO_TEMPLATE;
  }
}

async function copyReadingLaboTemplate() {
  const status = $("#readingLaboTemplateStatus");
  try {
    await copySnapshotText(READING_LABO_TEMPLATE);
    if (status) status.textContent = "読書テンプレートをコピーしました。PDFと一緒にCodexへ送れます。";
  } catch (error) {
    if (status) status.textContent = "コピーできませんでした。テキストを選択してコピーしてください。";
  }
}

function getSubstaVillageValue(selector) {
  const field = $(selector);
  if (!field) return "";
  return field.type === "checkbox" ? field.checked : field.value.trim();
}

function setSubstaVillageValue(selector, value) {
  const field = $(selector);
  if (!field) return;
  if (field.type === "checkbox") field.checked = Boolean(value);
  else field.value = value || "";
}

function collectSubstaVillageDaily() {
  return {
    date: activeDate,
    morningGreeting: getSubstaVillageValue("#substaVillageMorningGreeting"),
    goal: getSubstaVillageValue("#substaVillageGoal"),
    step: getSubstaVillageValue("#substaVillageStep"),
    result: getSubstaVillageValue("#substaVillageResult"),
    action: getSubstaVillageValue("#substaVillageAction"),
    insight: getSubstaVillageValue("#substaVillageInsight"),
    next: getSubstaVillageValue("#substaVillageNext"),
  };
}

function collectSubstaVillageVideo() {
  return {
    date: activeDate,
    title: getSubstaVillageValue("#substaVillageVideoTitle"),
    language: getSubstaVillageValue("#substaVillageVideoLanguage"),
    oneLine: getSubstaVillageValue("#substaVillageVideoOneLine"),
    why: getSubstaVillageValue("#substaVillageVideoWhy"),
    myCase: getSubstaVillageValue("#substaVillageVideoMyCase"),
    action: getSubstaVillageValue("#substaVillageVideoAction"),
    tryThis: getSubstaVillageValue("#substaVillageVideoTry"),
    did: getSubstaVillageValue("#substaVillageVideoDid"),
    result: getSubstaVillageValue("#substaVillageVideoResult"),
    next: getSubstaVillageValue("#substaVillageVideoNext"),
  };
}

function collectSubstaVillagePdf() {
  return {
    date: activeDate,
    title: getSubstaVillageValue("#substaVillagePdfTitle"),
    need: getSubstaVillageValue("#substaVillagePdfNeed"),
    content: getSubstaVillageValue("#substaVillagePdfContent"),
    contentize: getSubstaVillageValue("#substaVillagePdfContentize"),
    writing: getSubstaVillageValue("#substaVillagePdfWriting"),
    design: getSubstaVillageValue("#substaVillagePdfDesign"),
    read: getSubstaVillageValue("#substaVillagePdfRead"),
  };
}

function collectSubstaVillageQuestion() {
  return {
    date: activeDate,
    body: getSubstaVillageValue("#substaVillageQuestionBody"),
    why: getSubstaVillageValue("#substaVillageQuestionWhy"),
    tried: getSubstaVillageValue("#substaVillageQuestionTried"),
    result: getSubstaVillageValue("#substaVillageQuestionResult"),
    answer: getSubstaVillageValue("#substaVillageQuestionAnswer"),
    next: getSubstaVillageValue("#substaVillageQuestionNext"),
  };
}

function collectSubstaVillageTheme() {
  return {
    theme: getSubstaVillageValue("#substaVillageTheme") || "Substack初心者支援を形にする",
    nextExperiment: getSubstaVillageValue("#substaVillageThemeNext"),
  };
}

function substaVillageLine(label, value) {
  return value ? `${label}：\n${value}` : "";
}

function buildSubstaVillageDailyText() {
  const daily = collectSubstaVillageDaily();
  return [
    "【今日の一歩】",
    substaVillageLine("やりたいこと", daily.goal),
    substaVillageLine("今日の一歩", daily.step),
    substaVillageLine("結果", daily.result),
    substaVillageLine("実際に取った行動", daily.action),
    substaVillageLine("気づき", daily.insight),
    substaVillageLine("次に試すこと", daily.next),
  ].filter(Boolean).join("\n\n");
}

function buildSubstaVillageQuestionText() {
  const question = collectSubstaVillageQuestion();
  return [
    "【質問・相談】",
    substaVillageLine("質問内容", question.body),
    substaVillageLine("なぜ質問したい？", question.why),
    substaVillageLine("自分で試したこと", question.tried),
    substaVillageLine("結果", question.result),
    substaVillageLine("次に試すこと", question.next),
  ].filter(Boolean).join("\n\n");
}

function pushSubstaVillageLog(kind, data) {
  const editingIndex = substaVillageStore.logs.findIndex((entry) => entry.id === editingSubstaVillageLogId && entry.kind === kind);
  if (editingIndex >= 0) {
    substaVillageStore.logs[editingIndex] = {
      ...substaVillageStore.logs[editingIndex],
      date: activeDate,
      updatedAt: new Date().toISOString(),
      data,
    };
    editingSubstaVillageLogId = "";
    return "updated";
  }
  substaVillageStore.logs.unshift({
    id: crypto.randomUUID(),
    kind,
    date: activeDate,
    savedAt: new Date().toISOString(),
    data,
  });
  substaVillageStore.logs = substaVillageStore.logs.slice(0, 50);
  return "created";
}

function renderSubstaVillagePreview() {
  const preview = $("#substaVillageDiscordPreview");
  if (preview) preview.value = buildSubstaVillageDailyText();
}

function renderSubstaVillageRecentList() {
  const target = $("#substaVillageRecentList");
  const count = $("#substaVillageLogCount");
  if (count) count.textContent = `${substaVillageStore.logs.length}件`;
  if (!target) return;
  target.replaceChildren();
  const items = substaVillageStore.logs.slice(0, 8);
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "まだログはありません。今日の一歩から軽く始められます。";
    target.append(empty);
    return;
  }
  items.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "sakura-substa-recent-item";
    const title = document.createElement("strong");
    const data = entry.data || {};
    title.textContent = `${entry.date || ""} / ${entry.kind}`;
    const body = document.createElement("p");
    body.textContent = data.goal || data.step || data.title || data.body || data.theme || "保存済み";
    const actions = document.createElement("div");
    actions.className = "sakura-substa-recent-actions";
    const edit = document.createElement("button");
    edit.className = "ghost-button";
    edit.type = "button";
    edit.textContent = "このログを編集";
    edit.addEventListener("click", () => editSubstaVillageLog(entry.id));
    actions.append(edit);
    item.append(title, body, actions);
    target.append(item);
  });
}

function updateSubstaVillageEditButtons(kind = "") {
  const buttonMap = {
    "今日の一歩": { selector: "#saveSubstaVillageDailyButton", save: "今日の一歩を保存", update: "今日の一歩を更新" },
    "動画講座": { selector: "#substaVillageVideoForm button[type=\"submit\"]", save: "動画講座を保存", update: "動画講座を更新" },
    "PDF一次分析": { selector: "#substaVillagePdfForm button[type=\"submit\"]", save: "PDF分析を保存", update: "PDF分析を更新" },
    "質問・相談": { selector: "#substaVillageQuestionForm button[type=\"submit\"]", save: "質問ログを保存", update: "質問ログを更新" },
    "メインテーマ": { selector: "#saveSubstaVillageTheme", save: "テーマを保存", update: "テーマを更新" },
  };
  Object.entries(buttonMap).forEach(([entryKind, config]) => {
    const button = $(config.selector);
    if (!button) return;
    const isEditingThisKind = editingSubstaVillageLogId && entryKind === kind;
    button.textContent = isEditingThisKind ? config.update : config.save;
  });
  const notice = $("#substaVillageEditNotice");
  if (notice) notice.hidden = !(editingSubstaVillageLogId && kind === "今日の一歩");
}

function editSubstaVillageLog(id) {
  const entry = substaVillageStore.logs.find((item) => item.id === id);
  if (!entry) return;
  editingSubstaVillageLogId = entry.id;
  if (entry.kind === "今日の一歩") substaVillageStore.daily = { ...(entry.data || {}) };
  if (entry.kind === "動画講座") substaVillageStore.video = { ...(entry.data || {}) };
  if (entry.kind === "PDF一次分析") substaVillageStore.pdf = { ...(entry.data || {}) };
  if (entry.kind === "質問・相談") substaVillageStore.question = { ...(entry.data || {}) };
  if (entry.kind === "メインテーマ") substaVillageStore.theme = { ...substaVillageStore.theme, ...(entry.data || {}) };
  fillSubstaVillagePage();
  updateSubstaVillageEditButtons(entry.kind);
  const statusMap = {
    "今日の一歩": "#substaVillageDailyStatus",
    "動画講座": "#substaVillageVideoStatus",
    "PDF一次分析": "#substaVillagePdfStatus",
    "質問・相談": "#substaVillageQuestionStatus",
  };
  const status = $(statusMap[entry.kind]);
  if (status) status.textContent = "編集中です。内容を直して「更新」を押すと、このログを上書きします。";
}

function cancelSubstaVillageEdit() {
  editingSubstaVillageLogId = "";
  updateSubstaVillageEditButtons();
  const status = $("#substaVillageDailyStatus");
  if (status) status.textContent = "編集をやめました。次に保存すると新しいログになります。";
}

function fillSubstaVillagePage() {
  const daily = substaVillageStore.daily || {};
  setSubstaVillageValue("#substaVillageMorningGreeting", daily.morningGreeting);
  setSubstaVillageValue("#substaVillageGoal", daily.goal);
  setSubstaVillageValue("#substaVillageStep", daily.step);
  setSubstaVillageValue("#substaVillageResult", daily.result);
  setSubstaVillageValue("#substaVillageAction", daily.action);
  setSubstaVillageValue("#substaVillageInsight", daily.insight);
  setSubstaVillageValue("#substaVillageNext", daily.next);

  const video = substaVillageStore.video || {};
  setSubstaVillageValue("#substaVillageVideoTitle", video.title);
  setSubstaVillageValue("#substaVillageVideoLanguage", video.language);
  setSubstaVillageValue("#substaVillageVideoOneLine", video.oneLine);
  setSubstaVillageValue("#substaVillageVideoWhy", video.why);
  setSubstaVillageValue("#substaVillageVideoMyCase", video.myCase);
  setSubstaVillageValue("#substaVillageVideoAction", video.action);
  setSubstaVillageValue("#substaVillageVideoTry", video.tryThis);
  setSubstaVillageValue("#substaVillageVideoDid", video.did);
  setSubstaVillageValue("#substaVillageVideoResult", video.result);
  setSubstaVillageValue("#substaVillageVideoNext", video.next);

  const pdf = substaVillageStore.pdf || {};
  setSubstaVillageValue("#substaVillagePdfTitle", pdf.title);
  setSubstaVillageValue("#substaVillagePdfNeed", pdf.need);
  setSubstaVillageValue("#substaVillagePdfContent", pdf.content);
  setSubstaVillageValue("#substaVillagePdfContentize", pdf.contentize);
  setSubstaVillageValue("#substaVillagePdfWriting", pdf.writing);
  setSubstaVillageValue("#substaVillagePdfDesign", pdf.design);
  setSubstaVillageValue("#substaVillagePdfRead", pdf.read);

  const question = substaVillageStore.question || {};
  setSubstaVillageValue("#substaVillageQuestionBody", question.body);
  setSubstaVillageValue("#substaVillageQuestionWhy", question.why);
  setSubstaVillageValue("#substaVillageQuestionTried", question.tried);
  setSubstaVillageValue("#substaVillageQuestionResult", question.result);
  setSubstaVillageValue("#substaVillageQuestionAnswer", question.answer);
  setSubstaVillageValue("#substaVillageQuestionNext", question.next);

  const theme = substaVillageStore.theme || {};
  setSubstaVillageValue("#substaVillageTheme", theme.theme || "Substack初心者支援を形にする");
  setSubstaVillageValue("#substaVillageThemeNext", theme.nextExperiment);
  renderSubstaVillagePreview();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
}

function saveSubstaVillageDaily(event) {
  event?.preventDefault();
  substaVillageStore.daily = collectSubstaVillageDaily();
  const action = pushSubstaVillageLog("今日の一歩", substaVillageStore.daily);
  saveSubstaVillageStore();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
  const status = $("#substaVillageDailyStatus");
  if (status) status.textContent = action === "updated" ? "今日の一歩を更新しました。" : "今日の一歩を保存しました。うまくいかなかった結果も材料です。";
}

function saveSubstaVillageVideo(event) {
  event?.preventDefault();
  substaVillageStore.video = collectSubstaVillageVideo();
  const action = pushSubstaVillageLog("動画講座", substaVillageStore.video);
  saveSubstaVillageStore();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
  const status = $("#substaVillageVideoStatus");
  if (status) status.textContent = action === "updated" ? "動画講座メモを更新しました。" : "動画講座メモを保存しました。共通言語だけの日でも大丈夫です。";
}

function saveSubstaVillagePdf(event) {
  event?.preventDefault();
  substaVillageStore.pdf = collectSubstaVillagePdf();
  const action = pushSubstaVillageLog("PDF一次分析", substaVillageStore.pdf);
  saveSubstaVillageStore();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
  const status = $("#substaVillagePdfStatus");
  if (status) status.textContent = action === "updated" ? "PDF一次分析を更新しました。" : "PDF一次分析を保存しました。読む場所を絞るためのメモです。";
}

function saveSubstaVillageQuestion(event) {
  event?.preventDefault();
  substaVillageStore.question = collectSubstaVillageQuestion();
  const action = pushSubstaVillageLog("質問・相談", substaVillageStore.question);
  saveSubstaVillageStore();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
  const status = $("#substaVillageQuestionStatus");
  if (status) status.textContent = action === "updated" ? "質問・相談ログを更新しました。" : "質問・相談ログを保存しました。";
}

function saveSubstaVillageTheme() {
  substaVillageStore.theme = collectSubstaVillageTheme();
  pushSubstaVillageLog("メインテーマ", substaVillageStore.theme);
  saveSubstaVillageStore();
  renderSubstaVillageRecentList();
  updateSubstaVillageEditButtons();
}

async function copySubstaVillageText(text, statusSelector) {
  const status = $(statusSelector);
  try {
    await copySnapshotText(text);
    if (status) status.textContent = "コピーしました。Discordに貼れます。";
  } catch (error) {
    if (status) status.textContent = "コピーできませんでした。テキストを選択してコピーしてください。";
  }
}

function clearSubstaVillageDaily() {
  ["#substaVillageGoal", "#substaVillageStep", "#substaVillageResult", "#substaVillageAction", "#substaVillageInsight", "#substaVillageNext"].forEach((selector) => setSubstaVillageValue(selector, ""));
  renderSubstaVillagePreview();
}

function firstKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: FIRST_KNOWLEDGE_SAMPLE_TITLE,
    author: "",
    genre: "発信 / AI / ライティング",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "X", "Notes"],
    connectsTo: ["発信", "AI", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "AIに考えさせる前に、何を考えるかを決める",
      oneLineConclusion: "AI活用の前に、誰に何を届けるかを1行で決める。",
      knowledgeOverview: "AI時代は文章量より、最初に思考の芯を1行で決める力が重要になる。",
      todayAction: "次に作る投稿を、誰に・どんな場面で・何が変わるかの1行にする。",
      useScene: "Substack記事の企画、Podcastテーマ決め、X投稿、講座設計の最初の判断に使う。",
      beginnerExplanation: "AIに文章を書いてもらう前に、誰に何を届けるかを自分で決めるということ。",
      articleIdeas: "AIに書かせる前に決めるべき3つのこと / Substack初心者が最初に作る1行コンセプト",
      podcastIdeas: "AI時代に残る人間の仕事 / 書く前に決める力",
      aiUseSimple: "ChatGPTに本文を書かせる前に、ターゲット・状況・変化を整理させる。",
      tagsSimple: "AI, 発信, ライティング, コンセプト設計, Substack",
      summary3Lines: "情報が増えるほど、発信者には削る力が必要になる。AIは展開が得意だが、何を言うか決めるのは人間の役割。1行に絞ることで発信や企画が判断しやすくなる。",
      coreIdea: "1行は人間の仕事。展開はAIの仕事。",
      top10: "全員向けは刺さらない / 誰に届けるかを1人に絞る / 困っている瞬間を決める / Before Afterの変化を1つにする / 修飾語を削る / 判断できる1行にする",
      publishingUse: "記事や配信の前に、読者が何を判断できるようになるかを1行で決める。",
      useSubstack: "各号の冒頭に、誰の何を変える記事かを書く。",
      useNote: "タイトルをテーマではなく読後の変化で作る。",
      usePodcast: "1エピソード1テーマに絞り、聞いた後に試せることを決める。",
      useLive: "配信前に視聴者が持ち帰る判断を1つにする。",
      useNotes: "今日の発信テーマを1行にして投稿する。",
      useX: "1ポスト1主張にし、誰に止まってほしいかを決める。",
      useAi: "1行コンセプトを作ってから、AIにタイトル・構成・投稿展開を依頼する。",
      contentIdeas: "記事、Podcast、Notes、X、講座、テンプレートに展開できる。",
      practiceTomorrow: "次に書く投稿を、誰に・どの状況で・何が変わるかの1行にする。",
      knowledgeTags: "AI, 発信, ライティング, コンセプト設計, Substack, 知識資産",
    },
    {
      ...common,
      knowledgeName: "伝わらない原因は情報不足ではなく、捨てきれていないこと",
      oneLineConclusion: "伝える力は、足す力より捨てる力で決まる。",
      knowledgeOverview: "説明を増やすほど伝わるのではなく、相手が判断できる材料だけ残すと伝わりやすくなる。",
      todayAction: "直近の記事タイトルから抽象語を3つ削り、読者の変化が見える言葉にする。",
      useScene: "記事の導入、プロフィール、商品説明、ライブ告知、コミュニティ説明に使う。",
      beginnerExplanation: "たくさん説明するより、相手が迷わない言い方にするということ。",
      articleIdeas: "発信がぼやける人が最初に削るべき言葉 / 説明しすぎるほど伝わらない理由",
      podcastIdeas: "情報を足すより削る / 相手が判断できる発信",
      aiUseSimple: "AIに文章を短くするだけでなく、相手がYES/NO判断できるかを点検させる。",
      tagsSimple: "信頼構築, 発信, マーケティング, ブランディング, ライティング",
      summary3Lines: "情報爆発の時代は、相手の注意が少ない。発信者は言いたいことではなく、相手が知りたいことを残す必要がある。1行化は思考の交通整理になる。",
      coreIdea: "相手に必要な判断材料だけを残す。",
      publishingUse: "読者が迷わず判断できるよう、記事の結論と対象者を最初に出す。",
      useSubstack: "ニュースレターの説明文を、誰のどんな迷いを解く場所かに変える。",
      usePodcast: "タイトルを話題名ではなく、聞いた後の判断にする。",
      useX: "1投稿に複数論点を入れず、1つの判断だけ残す。",
      useAi: "AIに『この文章で読者は何を判断できますか』と確認させる。",
      contentIdeas: "プロフィール添削、タイトル添削、告知文改善テンプレートにできる。",
      practiceTomorrow: "直近の記事タイトルから抽象語を3つ削る。",
      knowledgeTags: "信頼構築, 発信, マーケティング, ブランディング, ライティング",
    },
    {
      ...common,
      knowledgeName: "ターゲット・状況・変化を決めるとコンテンツが資産になる",
      oneLineConclusion: "読者・場面・変化が決まると、投稿は単発ではなく資産になる。",
      knowledgeOverview: "誰に、どの困りごとの瞬間で、何がどう変わるかを決めると、記事や商品に展開しやすくなる。",
      todayAction: "この知識をSubstack・Podcast・Xのどこに転用するか1つ決める。",
      useScene: "Substack初心者向け発信、講座づくり、KindleやBrainの商品設計に使う。",
      beginnerExplanation: "書き始める前に、読む人・困っている場面・読んだ後の変化を決めること。",
      articleIdeas: "Substack初心者のための1行コンセプト設計 / 発信テーマが決まらない時の3問",
      podcastIdeas: "初心者が最初に決める読者像 / コンテンツを資産に変える問い",
      aiUseSimple: "AIにターゲット、状況、変化を10案出させて、最後は自分で選ぶ。",
      tagsSimple: "Substack, 初心者, コンテンツ化, 講座, Kindle, Brain",
      summary3Lines: "1行コンセプトは、短い文章を作る技術ではなく、活用できる知識に変える設計。対象者と変化が決まると、媒体ごとに展開できる。複数の本を横断する知識カードにも向いている。",
      coreIdea: "知識は、使う場面まで決めると資産になる。",
      publishingUse: "1つの学びから記事、Podcast、Notes、X、講座の展開案を作る。",
      useSubstack: "初心者向けに、毎回1つの迷いを解く記事にする。",
      useNote: "発信テーマの決め方を体験談に変える。",
      usePodcast: "1つの問いを音声で深掘りする。",
      useNotes: "知識カードの要点を短いメモとして出す。",
      useX: "知識カード1枚から3投稿を作る。",
      useAi: "AIに知識カードを媒体別に展開させる。",
      contentIdeas: "Substack初心者向けテンプレート、講座、Kindle、Brainにできる。",
      practiceTomorrow: "Knowledge Laboに、この本から3枚の知識カードを作る。",
      knowledgeTags: "Substack, 初心者, コンテンツ化, 講座, Kindle, Brain",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addFirstKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(FIRST_KNOWLEDGE_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("AIに考えさせる前に")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "1行コンセプト";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "1冊目サンプルはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...firstKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "1行コンセプト";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "1冊目サンプルを知識カードとして3件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function smallBizKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: SMALL_BIZ_SAMPLE_TITLE,
    author: "",
    genre: "スモールビジネス / AI / マーケティング",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "4",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "マーケティング", "ブランディング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "スモビジは大きく賭けず、小さく試して反応で磨く",
      oneLineConclusion: "スモビジは完成品を作る前に、小さく売って反応で磨く。",
      knowledgeOverview: "AI時代のスモールビジネスは、最初から完成品を作るより、低予算の試作品で反応を見ながら育てるほうが現実的。",
      todayAction: "今ある企画を、無料資料か1投稿で反応確認できる最小版にする。",
      useScene: "新サービス、PDF教材、無料資料、講座、Brain、Substack企画の初期検証に使う。",
      beginnerExplanation: "いきなり大きく作らず、小さく出して『欲しい人がいるか』を先に確かめるということ。",
      articleIdeas: "スモビジ初心者が最初に作るべきは商品ではなく試作品 / AI時代は小さく試す人が強い理由",
      podcastIdeas: "完璧な商品より先に反応を見る / 小さく始めるスモビジの現実感",
      aiUseSimple: "AIに商品案を作らせる前に、ターゲット・小さな試作品・検証方法を出させる。",
      tagsSimple: "スモビジ, AI, 検証, 商品設計, 小さく始める",
      summary3Lines: "大きく賭けず、小さく試して、売りながら磨く。最初の目的は完成ではなく反応確認。売れない時は商品だけでなく届け方や順番も見直す。",
      coreIdea: "完成品を作る前に、反応確認できる最小単位を出す。",
      top10: "テーマを定義する / 小さく試す / 反応を見る / 売り方を磨く / 導線を作る / 低予算で検証する / 商品の順番を見直す",
      publishingUse: "新企画を記事・Notes・ライブで小さく出し、反応を見てから商品化する。",
      useSubstack: "読者に無料資料や小さなワークを出して反応を確認する。",
      useNote: "小さく始めた実験記録として書く。",
      usePodcast: "試した企画の反応や改善点を話す。",
      useLive: "商品化前の相談会や質問回で需要を確認する。",
      useNotes: "企画の種を出して読者の反応を見る。",
      useX: "商品案を問いかけ投稿で検証する。",
      useAi: "AIにLP、無料資料、導線案、検証チェックリストを作らせる。",
      contentIdeas: "スモビジ30日実験記、無料資料、Brain、講座、テンプレートに展開できる。",
      practiceTomorrow: "今ある企画を、無料資料か1投稿で反応確認できる形に小さくする。",
      knowledgeTags: "スモビジ, AI, 検証, 商品設計, 小さく始める, 発信",
    },
    {
      ...common,
      knowledgeName: "選択肢が多い時代ほど、比較基準を持つ人が強い",
      oneLineConclusion: "最強の副業ではなく、自分に合う選択肢を基準で選ぶ。",
      knowledgeOverview: "在宅スモビジは選択肢が多いため、最強を探すより自分の条件に合うものを選ぶ基準が必要。",
      todayAction: "自分の企画を、始めやすさ・継続性・AI相性・資産化の4軸で採点する。",
      useScene: "事業テーマ選び、媒体選び、商品形式選び、読者へのおすすめ比較記事に使う。",
      beginnerExplanation: "何が一番稼げるかではなく、自分に続けやすくAIとも相性がいい形を選ぶということ。",
      articleIdeas: "在宅スモビジの選び方を比較する5つの基準 / 自分に合う副業を選ぶチェックリスト",
      podcastIdeas: "最強探しをやめる / スモビジ選びの判断軸",
      aiUseSimple: "AIに選択肢を表で比較させ、始めやすさ・収益化の早さ・継続性・AI相性で整理する。",
      tagsSimple: "スモビジ, 比較, 判断基準, AI活用, 在宅",
      summary3Lines: "選択肢が多いほど、比較基準が必要になる。始めやすさ、収益化の早さ、継続しやすさ、AIとの相性で見る。時間売りだけでなく資産化も判断軸にする。",
      coreIdea: "最強の選択肢ではなく、自分の条件に合う選択肢を選ぶ。",
      publishingUse: "初心者向けに『どれを選べばいいか』を比較記事やPodcastにする。",
      useSubstack: "Substack読者向けに、在宅スモビジ比較表を配布する。",
      useNote: "自分の条件別おすすめとして記事化する。",
      usePodcast: "選択肢を一つずつ比較しながら話すシリーズにする。",
      useX: "比較基準を短いリスト投稿にする。",
      useAi: "AIに比較表と診断チャートを作らせる。",
      contentIdeas: "比較記事、診断テンプレート、無料チェックシート、講座導入に使える。",
      practiceTomorrow: "自分の企画を、始めやすさ・継続性・AI相性・資産化の4軸で採点する。",
      knowledgeTags: "スモビジ, 比較, 判断基準, AI活用, 在宅, 資産化",
    },
    {
      ...common,
      knowledgeName: "売り込みではなく、判断基準を渡す導線が信頼を作る",
      oneLineConclusion: "売る前に判断基準を渡すと、売り込みではなく信頼導線になる。",
      knowledgeOverview: "無料資料、LINE、オープンチャット、説明会、本命商品という流れで、売り込み感より納得感を高める。",
      todayAction: "今ある商品やサービスの前に、無料で渡せる判断基準を1つ作る。",
      useScene: "メルマガ導線、Substackから商品への流れ、無料資料、LINE誘導、講座販売に使う。",
      beginnerExplanation: "いきなり売るのではなく、先に役立つ判断材料を渡して信頼を積み上げるということ。",
      articleIdeas: "売り込まずに商品につなげる導線設計 / 無料資料から信頼を作る流れ",
      podcastIdeas: "売り込み感を減らす導線 / 納得して買ってもらう設計",
      aiUseSimple: "AIに無料資料、LINE配信、説明会、本命商品の順番とメッセージ案を作らせる。",
      tagsSimple: "導線, 信頼構築, マーケティング, セールス, 無料資料",
      summary3Lines: "スモビジは商品だけでなく導線で勝つ。最初から売らず、判断基準を渡して信頼を積み上げる。売り込み感より納得感を高める設計が大事。",
      coreIdea: "商品単体ではなく、信頼が積み上がる導線を作る。",
      publishingUse: "記事や配信の終わりに、購入ではなく無料資料や判断材料へつなげる。",
      useSubstack: "ニュースレターから無料資料、相談、講座へ自然につなげる。",
      useNote: "無料資料の価値や使い方を記事化する。",
      usePodcast: "信頼導線の作り方を音声で説明する。",
      useLive: "説明会前にオープンな質問回を作る。",
      useNotes: "無料資料の一部を小出しにする。",
      useX: "判断基準をスレッド化して、資料へ導線を置く。",
      useAi: "AIに導線ごとの役割とCTA文を整理させる。",
      contentIdeas: "無料資料、LINEステップ、説明会台本、セールス導線テンプレートに展開できる。",
      practiceTomorrow: "今ある商品やサービスの前に、無料で渡せる判断基準を1つ作る。",
      knowledgeTags: "導線, 信頼構築, マーケティング, セールス, 無料資料, Substack",
    },
    {
      ...common,
      knowledgeName: "30日で回る状態を作ると、スモビジは現実になる",
      oneLineConclusion: "30日で一周回すと、知識は事業の実験に変わる。",
      knowledgeOverview: "現実確認、テーマ選定、一言定義、無料資料、導線、発信、反応確認、改善までを30日で回す。",
      todayAction: "1週目の現実確認とテーマ選定だけを今日のタスクにする。",
      useScene: "新企画のロードマップ、講座カリキュラム、Substack企画、実験ログに使う。",
      beginnerExplanation: "完璧を目指さず、30日で一周だけ試して改善できる状態にするということ。",
      articleIdeas: "スモビジを30日で立ち上げるロードマップ / 完璧より先に一周回す",
      podcastIdeas: "30日で小さく立ち上げる / 1週目から4週目にやること",
      aiUseSimple: "AIに4週間の実行計画、毎日のタスク、振り返り項目を作らせる。",
      tagsSimple: "30日, ロードマップ, 習慣, 実験, スモビジ",
      summary3Lines: "完璧を目指さず、まず30日で回る状態を作る。1週目は現実確認とテーマ選定、2週目は無料資料と導線、3週目は発信と反応確認、4週目は改善と次の商品設計。",
      coreIdea: "才能より、選び方と進め方で差が出る。",
      publishingUse: "自分の30日スモビジ実験として連載化する。",
      useSubstack: "週ごとの進捗をニュースレターにする。",
      useNote: "30日ロードマップを初心者向け記事にする。",
      usePodcast: "毎週の進捗や気づきを話す。",
      useLive: "週1回の公開作業会にする。",
      useNotes: "毎日の小さな進捗を記録する。",
      useX: "30日チャレンジの進捗を投稿する。",
      useAi: "AIに日次タスクと改善案を出させる。",
      contentIdeas: "30日講座、進捗テンプレート、実験ログ、チェックリストに展開できる。",
      practiceTomorrow: "1週目の現実確認とテーマ選定だけを今日のタスクにする。",
      knowledgeTags: "30日, ロードマップ, 習慣, 実験, スモビジ, 進め方",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addSmallBizKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(SMALL_BIZ_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("スモビジは大きく賭けず")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "スモビジ";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "スモビジ実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...smallBizKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "スモビジ";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "スモビジ実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function psychologyKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: PSYCHOLOGY_SAMPLE_TITLE,
    author: "",
    genre: "心理学 / ビジネス / AI時代の思考",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes"],
    connectsTo: ["発信", "AI", "マーケティング", "心理", "習慣", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "心理学は人を操る武器ではなく、消耗を減らす理解の地図",
      oneLineConclusion: "心理学は、相手や自分を責めずに行動の前提を整える地図である。",
      knowledgeOverview: "AIが情報や選択肢を増やしても、不安・比較・迷い・決断の重さは人間側に残る。心理学はそれを能力不足ではなく構造として理解するために使う。",
      todayAction: "今日の不安や迷いを『自分がダメ』ではなく『どの心理構造が働いているか』で1つ言語化する。",
      useScene: "Substack初心者への励まし、相談対応、講座導入、AI活用記事、人間関係や仕事の整理に使う。",
      beginnerExplanation: "心理学は人を動かす裏技ではなく、自分や相手がなぜ止まるのかを分かりやすく見るための地図。",
      articleIdeas: "AI時代に心理学が必要な理由 / 心理学を人を操る技術として使わないために",
      podcastIdeas: "AIが速くなっても人が迷う理由 / 心理学は消耗を減らす地図",
      aiUseSimple: "AIに悩みをそのまま解決させる前に、不安・比較・損失回避・境界線など心理タグで分類させる。",
      tagsSimple: "心理学, AI, 自己理解, 消耗予防, 判断",
      summary3Lines: "AIは情報整理や最適化が得意だが、意味・価値・決断は人間側に残る。心理学は感情や迷いを消す魔法ではなく、前提を整える地図。心の構造を理解すると、無駄な自己否定と消耗を減らせる。",
      coreIdea: "心理学は操作ではなく理解のために使う。",
      top10: "心理学は理解の地図 / AIは速さ、人間は意味と決断 / 感情は消す対象ではない / 消耗は能力不足ではなく構造で起きる / 心のクセを前提に設計する",
      publishingUse: "読者の悩みを『怠け』『性格』ではなく、心理構造としてやさしく説明する記事に使う。",
      useSubstack: "初心者が発信で止まる理由を心理学の地図としてシリーズ化する。",
      useNote: "自分を責めない働き方・発信の考え方として記事化する。",
      usePodcast: "悩み相談型の音声テーマに向いている。",
      useLive: "ライブ相談で、悩みを心理タグに分けて整理する。",
      useNotes: "『心理学は武器ではなく地図』という短文投稿にする。",
      useX: "心理学を使う目的を短い原則として投稿する。",
      useAi: "AIに悩みを心理タグで分類させ、次の行動に変換するプロンプトを作る。",
      contentIdeas: "心理学×発信の連載、初心者向け相談テンプレート、講座導入、AIプロンプト集に展開できる。",
      practiceTomorrow: "自分か読者の悩みを1つ選び、『能力不足ではなく構造で説明すると？』と書き換える。",
      knowledgeTags: "心理学, AI, 自己理解, 発信, 相談, 消耗予防, 知識資産",
    },
    {
      ...common,
      knowledgeName: "不安は敵ではなく、未処理の論点を知らせる通知",
      oneLineConclusion: "不安は消すものではなく、整理すべき論点を教えるサインである。",
      knowledgeOverview: "不安を消そうとするほど脳は重要な脅威として認識しやすい。不安が出たら、何が未整理なのかを言語化することで行動に変えられる。",
      todayAction: "今日の不安を3つ書き出し、それぞれ『何が未処理だから怖いのか』に変換する。",
      useScene: "発信前の不安、商品づくり前の不安、ライブ前の緊張、相談対応、読者の背中を押す記事に使う。",
      beginnerExplanation: "不安は『やめろ』ではなく『まだ整理できていないことがあるよ』という通知。",
      articleIdeas: "発信前の不安を消そうとしなくていい理由 / 不安を行動に変える3つの質問",
      podcastIdeas: "不安は敵じゃない / 未処理の論点を見つける音声ワーク",
      aiUseSimple: "AIに不安リストを渡し、『未処理の論点』『確認すべきこと』『今日できる一歩』に分解させる。",
      tagsSimple: "不安, 心理学, 自己理解, 行動, 発信",
      summary3Lines: "不安は危険を察知する正常な機能。消そうとするより、何が整理されていないのかを見る。不安を論点化すると、自己否定ではなく行動計画に変わる。",
      coreIdea: "不安は止めるボタンではなく、整えるための通知。",
      publishingUse: "初心者が発信前に不安になる理由を、正常な反応として説明する。",
      useSubstack: "不安を整理するワークシートをニュースレターにする。",
      useNote: "自分の不安を論点化した体験記事にする。",
      usePodcast: "リスナーの不安を一緒にほどく回を作る。",
      useLive: "ライブで『不安を論点に変える』公開ワークをする。",
      useNotes: "不安は通知、という一文から短い投稿を作る。",
      useX: "不安を3分解するチェックリスト投稿にする。",
      useAi: "AIに不安を『事実・解釈・未処理論点・次の一手』へ分けさせる。",
      contentIdeas: "不安整理テンプレート、発信前チェックリスト、相談用質問集にできる。",
      practiceTomorrow: "漠然とした不安を1つ選び、『未処理の論点』として3行で書く。",
      knowledgeTags: "不安, 心理学, 発信, 自己理解, AI活用, 行動",
    },
    {
      ...common,
      knowledgeName: "決断とは正解を選ぶことではなく、何を捨てるかを決めること",
      oneLineConclusion: "迷いの正体は正解不足ではなく、捨てる痛みを引き受けられないこと。",
      knowledgeOverview: "選択肢が増えるほど、人は後悔しない選択を探して止まりやすい。プロスペクト理論や損失回避を前提に、選ぶ前に捨てるものを言語化する。",
      todayAction: "今迷っていることを1つ選び、『これを選ぶ代わりに捨てるもの』を1つ書く。",
      useScene: "媒体選び、商品設計、企画の優先順位、読者への選択サポート、相談・コーチングに使う。",
      beginnerExplanation: "決められない時は、正解が足りないのではなく、どれも捨てたくない状態になっている。",
      articleIdeas: "決められない人に必要なのは情報ではなく捨てる基準 / 発信テーマを決める時に捨てるもの",
      podcastIdeas: "決断と損失回避 / 正解探しをやめる練習",
      aiUseSimple: "AIに選択肢ごとのメリットだけでなく『捨てるもの』『後悔しそうな点』『守れる基準』を表にさせる。",
      tagsSimple: "決断, 損失回避, マーケティング, 発信, 優先順位",
      summary3Lines: "人は最善より後悔しない選択を求める。損失回避が強いと、現状維持や決断回避が起きる。決断は正解選びではなく、何を捨てるかを決める作業。",
      coreIdea: "選ぶとは、同時に捨てることを受け入れること。",
      publishingUse: "読者が迷う場面に、比較表だけでなく『捨てる基準』を提示する。",
      useSubstack: "Substack初心者向けに媒体選び・テーマ選びの捨てる基準を書く。",
      useNote: "自分の選択と捨てたものを振り返る記事にする。",
      usePodcast: "迷い相談に対して『何を捨てるか』を一緒に考える回にする。",
      useLive: "参加者の迷いを、選択肢と捨てるものに分けるワークにする。",
      useNotes: "今日捨てることを1つ投稿する。",
      useX: "決断とは何を捨てるか、という短文投稿にする。",
      useAi: "AIに選択肢の比較だけでなく、捨てる痛みと対策を出させる。",
      contentIdeas: "意思決定テンプレート、媒体選びチェックリスト、相談用ワークシートにできる。",
      practiceTomorrow: "今週やらないことを1つ決める。",
      knowledgeTags: "決断, 損失回避, 優先順位, 発信, マーケティング, 相談",
    },
    {
      ...common,
      knowledgeName: "行動は意志ではなく、判断不要レベルまで小さく設計すると続く",
      oneLineConclusion: "先延ばしと継続の問題は、やる気ではなく行動設計で解決する。",
      knowledgeOverview: "先延ばしは怠けではなく脳の危険回避。継続は意志の強さではなく、環境・トリガー・摩擦の少なさで決まる。",
      todayAction: "今日やるタスクを1つ選び、『30秒で着手できる最初の動作』まで小さくする。",
      useScene: "発信習慣、Podcast収録、記事作成、講座準備、コミュニティ運営、AI作業フローに使う。",
      beginnerExplanation: "続かないのは根性がないからではなく、始めるまでのハードルが高すぎることが多い。",
      articleIdeas: "発信が続かない人は意志力より摩擦を減らそう / 30秒で始める記事作成術",
      podcastIdeas: "やる気を待たない発信習慣 / 先延ばしを責めない設計",
      aiUseSimple: "AIに大きなタスクを30秒・3分・15分の行動に分解させ、最初の一歩だけ選ぶ。",
      tagsSimple: "習慣, 先延ばし, 行動設計, 発信継続, AI活用",
      summary3Lines: "先延ばしは危険回避の反応。継続は意志ではなく環境とトリガーで起きる。行動を判断不要レベルまで小さくすると、脳の警戒が下がる。",
      coreIdea: "やる気を出すより、摩擦を減らす。",
      publishingUse: "読者に『頑張れ』ではなく、行動を小さくする具体策を渡す。",
      useSubstack: "記事作成を30秒単位に分けた初心者向けワークにする。",
      useNote: "発信習慣の作り方として体験談にする。",
      usePodcast: "作業前の摩擦を減らす話にする。",
      useLive: "公開作業会で最初の30秒だけ一緒にやる。",
      useNotes: "今日の最小行動を1つ投稿する。",
      useX: "先延ばし対策の小さな行動リストにする。",
      useAi: "AIにタスク分解、チェックリスト化、毎日の開始文を作らせる。",
      contentIdeas: "発信習慣テンプレート、30秒着手チェックリスト、AIタスク分解プロンプトにできる。",
      practiceTomorrow: "次の記事作成を『ファイルを開いて仮タイトルを1行書く』まで小さくする。",
      knowledgeTags: "習慣, 先延ばし, 行動設計, 発信, AI活用, 継続",
    },
    {
      ...common,
      knowledgeName: "関係の消耗は性格ではなく、境界線と責任範囲の設計で減らせる",
      oneLineConclusion: "人間関係は相性だけでなく、期待と責任の線引きで楽になる。",
      knowledgeOverview: "人間関係の消耗や燃え尽きは、性格の弱さではなく境界線の曖昧さや自己犠牲で起きやすい。相手を尊重しながら、自分の責任範囲を言語化する。",
      todayAction: "今しんどい関係や仕事を1つ選び、『ここまでは自分の責任、ここからは相手の課題』と書く。",
      useScene: "相談対応、コミュニティ運営、ライブ配信、クライアントワーク、仕事の線引き、燃え尽き予防に使う。",
      beginnerExplanation: "相手の気分や反応まで全部背負わなくていい。自分ができる範囲と相手の範囲を分けること。",
      articleIdeas: "やさしい人ほど境界線が必要な理由 / コミュニティ運営で疲れない責任範囲の作り方",
      podcastIdeas: "境界線は冷たさではない / 持続可能な善意の作り方",
      aiUseSimple: "AIに相談文や断り文を、相手を尊重しつつ責任範囲を明確にする形で整えてもらう。",
      tagsSimple: "境界線, 信頼構築, コミュニティ, バーンアウト, 相談",
      summary3Lines: "消耗の多くは性格ではなく境界線の曖昧さから起きる。燃え尽きは弱さではなく、使命感と自己犠牲が結びついた時に起きる。貢献を続けるために、自分を守る設計が必要。",
      coreIdea: "持続可能な善意のために、責任範囲を線引きする。",
      publishingUse: "読者やコミュニティに、やさしさと線引きは両立することを伝える。",
      useSubstack: "相談・発信・コミュニティで疲れない境界線の作り方を書く。",
      useNote: "自分の消耗パターンと境界線の見直しを記事にする。",
      usePodcast: "人間関係で疲れる時の責任範囲の話にする。",
      useLive: "コミュニティ運営の悩み相談テーマにする。",
      useNotes: "『持続可能な善意』という短文投稿にする。",
      useX: "境界線の言語化テンプレートを投稿する。",
      useAi: "AIに境界線を保った返信文、断り文、説明文を作らせる。",
      contentIdeas: "境界線チェックリスト、相談文テンプレート、コミュニティ運営講座、燃え尽き予防ワークにできる。",
      practiceTomorrow: "今週引き受けすぎていることを1つ選び、責任範囲を一文で書く。",
      knowledgeTags: "境界線, 信頼構築, コミュニティ, 相談, バーンアウト, 仕事",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addPsychologyKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(PSYCHOLOGY_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("心理学は人を操る武器ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "心理学";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "10の心理学実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...psychologyKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "心理学";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "10の心理学実践書を知識カードとして5件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function treasureKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: TREASURE_SAMPLE_TITLE,
    author: "",
    genre: "AI / コンテンツ / 事業テーマ選定",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "マーケティング", "ブランディング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "海外事例は探すより、自分の人生で語れるものを選ぶ",
      oneLineConclusion: "AI時代の宝探しは、流行探しではなく、自分の人生で語れるテーマ選びである。",
      knowledgeOverview: "海外の成功事例は、そのまま日本に持ち込んでも続かないことがある。市場性や利益構造だけでなく、自分の痛み・物語・思想と接続しているかが重要になる。",
      todayAction: "気になっている海外事例を1つ選び、『自分の人生を使って語れる理由』を3行で書く。",
      useScene: "海外トレンド調査、Substackテーマ選定、Brain企画、講座テーマ、Podcastシリーズの候補選びに使う。",
      beginnerExplanation: "儲かりそうだから選ぶのではなく、自分が長く語れる理由があるかを見るということ。",
      articleIdeas: "海外で流行っているだけのテーマが続かない理由 / AI時代の宝探しは探すより選ぶ",
      podcastIdeas: "海外事例を日本で活かす前に見るべきこと / 自分の人生で語れるテーマとは",
      aiUseSimple: "AIに海外事例を出させた後、自分の体験・痛み・思想との接点を質問形式で点検させる。",
      tagsSimple: "宝探し, 海外事例, テーマ選定, AI, 発信",
      summary3Lines: "既存の判断基準は市場性、利益構造、法規リスク、再現性、継続性。だがそれだけでは、儲かっても続かないことがある。第6の軸は、自分の人生を使って語れるか。",
      coreIdea: "第6の軸は、自分の人生を使って語れるか。",
      top10: "市場性 / 利益構造 / 法規リスク / 再現性 / 継続性 / 痛みとの接続 / 物語 / 5年後も語れるか / AIに奪われない思想 / 捨てる力",
      publishingUse: "トレンド紹介ではなく、自分の体験や思想と接続した発信テーマに変換する。",
      useSubstack: "海外事例を紹介する前に、自分がなぜそれに惹かれたのかを書く。",
      useNote: "テーマ選びの迷いを、体験談として記事化する。",
      usePodcast: "気になる海外トレンドを、自分の人生との接点から話す。",
      useLive: "候補テーマを夢フィルターで一緒に選別する配信にする。",
      useNotes: "気になるテーマと惹かれた理由を短く記録する。",
      useX: "『探すな、選べ』を軸にテーマ選定投稿にする。",
      useAi: "AIにトレンド候補を出させ、最後は人生接続・思想・継続性で絞る。",
      contentIdeas: "海外トレンド選定テンプレート、夢フィルターワーク、講座テーマ選定チェックリストにできる。",
      practiceTomorrow: "気になる海外事例を1つだけ選び、儲かる理由ではなく語れる理由を書く。",
      knowledgeTags: "宝探し, 海外事例, テーマ選定, AI, 発信, ブランディング",
    },
    {
      ...common,
      knowledgeName: "市場性・利益構造・再現性は前提条件でしかない",
      oneLineConclusion: "儲かるかどうかだけでは、続くテーマかどうかは判断できない。",
      knowledgeOverview: "市場性、利益構造、法規リスク、再現性、継続性は大事だが、誰もが見る前提条件。そこだけで選ぶと、正解なのに燃え尽きることがある。",
      todayAction: "今ある企画を、市場性・利益構造・リスク・再現性・継続性・人生接続の6軸で採点する。",
      useScene: "事業アイデア評価、教材企画、発信テーマの優先順位、Brainや講座の企画判断に使う。",
      beginnerExplanation: "売れそうかだけで選ぶと続かない。売れそうかに加えて、自分が続けられる理由を見る。",
      articleIdeas: "儲かるテーマなのに続かない理由 / 事業テーマを選ぶ6つ目の基準",
      podcastIdeas: "正解なのに燃え尽きるテーマ / 市場性だけで選ばない",
      aiUseSimple: "AIに企画案を6軸評価させ、数値だけでなく違和感の理由も出させる。",
      tagsSimple: "事業判断, 市場性, 継続性, テーマ選定, AI",
      summary3Lines: "基本の5条件は重要だが、それだけでは足りない。儲かるテーマでも、自分の思想や痛みと接続していなければ続かない。判断基準に人生接続を加えることで、消耗しにくいテーマ選定になる。",
      coreIdea: "儲かるテーマと続けられるテーマは別。",
      publishingUse: "読者に『売れるテーマ』だけでなく『続けられるテーマ』の選び方を伝える。",
      useSubstack: "Substackテーマ選びの6軸チェックとして配布する。",
      useNote: "テーマ選定の失敗談・成功談にできる。",
      usePodcast: "事業アイデアを6軸で評価する回にする。",
      useLive: "参加者の企画を6軸で公開診断する。",
      useNotes: "企画の6軸メモとして投稿する。",
      useX: "市場性だけで選ぶ危険を短く投稿する。",
      useAi: "AIに候補を評価させたあと、人間側で違和感と熱量を確認する。",
      contentIdeas: "企画評価シート、テーマ選定講座、Brain企画診断テンプレートに展開できる。",
      practiceTomorrow: "自分の候補テーマを6軸で1から5点評価する。",
      knowledgeTags: "事業判断, 市場性, 継続性, テーマ選定, AI, マーケティング",
    },
    {
      ...common,
      knowledgeName: "夢フィルターは、流行への飛びつきを防ぐ7問チェック",
      oneLineConclusion: "惹かれたテーマは、羨望ではなく必然かを7問で確認する。",
      knowledgeOverview: "海外事例を見た瞬間に飛びつく前に、惹かれた理由、過去の痛み、否定されても語れるか、AIが完璧にやっても悔しくないかを点検する。",
      todayAction: "気になるテーマに対して『羨望か、必然か？』を1つ答える。",
      useScene: "新企画の衝動買い防止、海外トレンド選別、発信テーマの深掘り、ライブ相談、講座ワークに使う。",
      beginnerExplanation: "流行っているからではなく、自分にとって避けられないテーマか確認するための質問リスト。",
      articleIdeas: "海外トレンドに飛びつく前の7つの質問 / 羨望と必然を見分ける方法",
      podcastIdeas: "夢フィルター7問 / それは本当に自分のテーマか",
      aiUseSimple: "AIに7問の回答を深掘りさせ、薄い理由と強い理由を分けてもらう。",
      tagsSimple: "夢フィルター, テーマ選定, 自己理解, AI, ブランディング",
      summary3Lines: "海外事例は魅力的に見えるが、羨望だけで選ぶと続かない。夢フィルターは、過去の痛み・自然な継続・否定されても語れるかを確認する。答えが弱いテーマは、まだ飛びつかない。",
      coreIdea: "羨望ではなく必然で選ぶ。",
      publishingUse: "読者が新しいテーマを選ぶ前に使えるチェックリストとして提供する。",
      useSubstack: "夢フィルター7問をニュースレター特典にする。",
      useNote: "自分がテーマを選んだ理由を7問で公開する。",
      usePodcast: "1問ずつ答える音声ワークにする。",
      useLive: "参加者のテーマを夢フィルターで一緒に点検する。",
      useNotes: "7問のうち1問だけを日替わりで投稿する。",
      useX: "『それは羨望か、必然か』を軸に投稿する。",
      useAi: "AIに夢フィルターの回答を問い返させ、テーマの深さを確認する。",
      contentIdeas: "夢フィルターPDF、テーマ診断テンプレート、講座ワーク、相談メニューにできる。",
      practiceTomorrow: "候補テーマを1つ選び、夢フィルター7問に短く答える。",
      knowledgeTags: "夢フィルター, テーマ選定, 自己理解, ブランディング, 発信",
    },
    {
      ...common,
      knowledgeName: "宝探しの本質は、候補を広げたあとに削ぎ落として一点突破すること",
      oneLineConclusion: "宝は見つけるものではなく、選び続けて深く掘るもの。",
      knowledgeOverview: "ロードマップは、候補を広げる、夢・適性・思想で削ぎ落とす、一点突破で深く掘るという流れ。日本初・日本一は、探した人ではなく選び続けた人に来る。",
      todayAction: "今ある候補を3つ書き出し、今日は1つだけ『やらない候補』を決める。",
      useScene: "発信テーマ整理、商品ラインナップ整理、講座テーマ決定、Substackの方向性見直しに使う。",
      beginnerExplanation: "最初は広く見ていい。でも最後は全部やらず、選んだ1つを深く掘ることが大事。",
      articleIdeas: "宝探しは探すことではなく捨てること / 一点突破できるテーマの選び方",
      podcastIdeas: "探すな、選べ、捨てろ / テーマを削ぎ落とす勇気",
      aiUseSimple: "AIに候補を広げさせた後、夢フィルターと6軸評価で削ぎ落とし、1つの突破テーマに絞る。",
      tagsSimple: "一点突破, 捨てる力, テーマ選定, 発信戦略, AI",
      summary3Lines: "宝探しは候補を広げるだけでは終わらない。夢・適性・思想で削ぎ落とし、覚悟を決めて一点突破する。捨てる力こそ才能になる。",
      coreIdea: "探すな。選べ。捨てろ。",
      publishingUse: "自分の発信テーマを絞る過程をコンテンツ化し、読者にも選ぶ勇気を渡す。",
      useSubstack: "Substackのテーマ棚卸し記事にする。",
      useNote: "やらないことを決めた記録として書く。",
      usePodcast: "候補を削ぎ落とす過程を話す。",
      useLive: "テーマ棚卸しライブをする。",
      useNotes: "今日捨てる候補をメモ投稿する。",
      useX: "探すな、選べ、捨てろの3行投稿にする。",
      useAi: "AIを候補を広げる役、Codexを知識DB整理役、自分を最後に選ぶ役として分担する。",
      contentIdeas: "テーマ棚卸しテンプレート、発信戦略講座、Brain企画、相談メニューに展開できる。",
      practiceTomorrow: "候補を広げるリストと、捨てるリストを分けて作る。",
      knowledgeTags: "一点突破, 捨てる力, テーマ選定, 発信戦略, AI, Substack",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addTreasureKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(TREASURE_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("海外事例は探すより")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "宝探し";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "AI時代の宝探し実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...treasureKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "宝探し";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "AI時代の宝探し実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ideaKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: IDEA_SAMPLE_TITLE,
    author: "",
    genre: "AI / アイデア / コンテンツ制作",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "マーケティング", "ブランディング", "習慣", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "アイデアは才能ではなく、5つの工程で生まれる",
      oneLineConclusion: "アイデアが出ない時は、才能ではなく抜けている工程を点検する。",
      knowledgeOverview: "アイデアは突然降ってくるものではなく、集める、噛み砕く、寝かせる、ひらめく、形にするという工程で生まれる。出ない原因は能力不足ではなく工程ミスとして見直せる。",
      todayAction: "今止まっている企画を1つ選び、5工程のどこで止まっているか丸をつける。",
      useScene: "記事企画、Podcastテーマ、講座設計、Brain企画、X投稿、ライブ配信テーマの詰まり解消に使う。",
      beginnerExplanation: "ひらめきは才能ではなく、材料を集めて、考えて、少し寝かせて、出てきたものを形にする流れで作れる。",
      articleIdeas: "アイデアが出ない人は才能ではなく工程を疑おう / AI時代のアイデア5工程",
      podcastIdeas: "ひらめきは才能ではなく工程 / いまどの工程で止まっているか",
      aiUseSimple: "AIに企画の状態を渡し、集める・噛み砕く・寝かせる・ひらめく・形にするのどこが不足しているか診断させる。",
      tagsSimple: "アイデア, AI, 企画, 発信, コンテンツ化",
      summary3Lines: "アイデアは天才の特権ではなく、誰でも習得できる技術。正解主義や自己検閲で止まる人ほど、工程として扱うと動きやすい。5工程を循環させるほど、アイデアの質は高まり続ける。",
      coreIdea: "アイデアは才能ではなく工程である。",
      top10: "集める / 噛み砕く / 寝かせる / ひらめく / 形にする / 工程ミスを疑う / 自己検閲を止める / 量を出す / 60点で出す / 回し続ける",
      publishingUse: "発信ネタが出ない時に、読者へ『どの工程で止まっているか』を問いかける記事にする。",
      useSubstack: "Substackの企画づくりを5工程テンプレートとして配布する。",
      useNote: "自分の企画が止まった工程を振り返る記事にする。",
      usePodcast: "5工程を1つずつ話すシリーズにする。",
      useLive: "参加者の企画を5工程で診断するライブにする。",
      useNotes: "今日のアイデア工程メモとして投稿する。",
      useX: "アイデアが出ない時の5工程チェックを投稿する。",
      useAi: "AIに工程診断と次の一歩を出させる。",
      contentIdeas: "アイデア工程チェックリスト、企画作成テンプレート、講座、Brainに展開できる。",
      practiceTomorrow: "未完成の企画を1つ選び、5工程のうち足りない工程を1つだけ進める。",
      knowledgeTags: "アイデア, AI, 企画, 発信, コンテンツ化, Substack",
    },
    {
      ...common,
      knowledgeName: "素材は広く浅くではなく、深く偏って集める",
      oneLineConclusion: "いいアイデアは、日常の違和感・体験・失敗・専門外の知識を偏愛的に集めた先に生まれる。",
      knowledgeOverview: "アイデアの材料は一次情報、体験、観察、日常の違和感、失敗談、他人の成功・失敗事例。広く浅くではなく、深く偏って集めることで独自性が出る。",
      todayAction: "今日気になった違和感・失敗・観察を3つメモする。",
      useScene: "Substackネタ帳、Podcast素材、Notes投稿、相談事例、商品アイデア、講座の教材づくりに使う。",
      beginnerExplanation: "ネタは机の上で考えるだけではなく、日常で気になったことを集めると増えていく。",
      articleIdeas: "発信ネタは日常の違和感から生まれる / アイデア素材の集め方",
      podcastIdeas: "違和感メモが企画になる / 深く偏って集める力",
      aiUseSimple: "日常メモをAIに渡し、テーマ別・読者の悩み別・記事化しやすさ別に整理させる。",
      tagsSimple: "素材集め, 違和感, 発信ネタ, アイデア, 観察",
      summary3Lines: "アイデアの質は材料の質に左右される。一次情報や体験、違和感、失敗談を集めるほど、自分にしか出せない視点になる。専門外の知識も組み合わせの火種になる。",
      coreIdea: "素材集めは、発信の鉱脈づくりである。",
      publishingUse: "日常の違和感を発信素材として貯める仕組みを作る。",
      useSubstack: "週1回、違和感メモからニュースレターを作る。",
      useNote: "失敗談や観察を記事の入口にする。",
      usePodcast: "日常で引っかかったことを音声で深掘りする。",
      useLive: "参加者から違和感を集めて企画に変えるライブにする。",
      useNotes: "違和感メモを短く投稿する。",
      useX: "今日の違和感を1投稿にする。",
      useAi: "AIに素材メモを分類・タイトル化・シリーズ化させる。",
      contentIdeas: "違和感メモ帳、発信ネタ収集テンプレート、企画素材DBにできる。",
      practiceTomorrow: "今日から『違和感・観察・失敗』を3つだけKnowledge Laboかメモに残す。",
      knowledgeTags: "素材集め, 違和感, 発信ネタ, アイデア, 観察, 知識資産",
    },
    {
      ...common,
      knowledgeName: "AIは集める・噛み砕くを加速し、人間は寝かせる・決める・形にする",
      oneLineConclusion: "AIは発散と構造化、人間は意味付け・決断・責任を担う。",
      knowledgeOverview: "AIは情報収集、構造化、パターン認識、大量案出しが得意。一方で人間は違和感を拾い、意味付けし、文脈を読み、決断と責任を持つ。工程1・2はAIで加速し、3・4・5は人間の領域として守る。",
      todayAction: "1つのテーマについて、AIに別視点を10個出させた後、自分が違和感のある1案だけ選ぶ。",
      useScene: "ChatGPT・Claudeでの企画出し、Codexへの知識整理、記事構成、Podcast案出し、商品企画に使う。",
      beginnerExplanation: "AIに全部決めてもらうのではなく、たくさん出してもらい、最後に意味を決めるのは自分。",
      articleIdeas: "AI時代のアイデア役割分担 / AIに任せる工程と人間が守る工程",
      podcastIdeas: "AIは考える相棒、人間は決める人 / ひらめきをAIに奪われない使い方",
      aiUseSimple: "AIに素材収集、比較、ずらし、組み替え、前提破壊をさせ、人間が寝かせて最終判断する。",
      tagsSimple: "AI活用, アイデア, 役割分担, 意味付け, 決断",
      summary3Lines: "AIは思考を加速させるが、深める・決める部分は人間の役割。プロセスの前半はAIで広げ、後半は人間が寝かせて意味付けする。AI時代ほど、違和感を拾う力が重要になる。",
      coreIdea: "AIは加速、人間は意味付けと決断。",
      publishingUse: "AI活用を『全部任せる』ではなく『工程分担』として教える。",
      useSubstack: "AIで企画を広げ、人間が選ぶプロセスを記事化する。",
      useNote: "AIと人間の役割分担の実例を書く。",
      usePodcast: "AIに出させた案を人間がどう選ぶか話す。",
      useLive: "AIで大量案出しし、その場で人間が選ぶライブをする。",
      useNotes: "AIが出した案と自分の違和感をメモする。",
      useX: "AIは加速、人間は決断という短文投稿にする。",
      useAi: "AIを発散役・構造化役として使い、自分は選定と意味付けに集中する。",
      contentIdeas: "AI企画出しプロンプト、役割分担テンプレート、講座、Brainにできる。",
      practiceTomorrow: "AIに10案出させ、自分の違和感で1案だけ選んでメモする。",
      knowledgeTags: "AI活用, アイデア, 役割分担, 意味付け, 決断, 発信",
    },
    {
      ...common,
      knowledgeName: "アイデアを殺す最大の敵は早すぎる評価と自己検閲",
      oneLineConclusion: "最初は良い悪いを判断せず、量だけを追う。",
      knowledgeOverview: "良い悪いの早期判定、正解探し、他人の目、自己検閲はアイデアを殺す。最初は10分で20案など、判断禁止で量を出すことが対抗策になる。",
      todayAction: "10分タイマーをかけて、良し悪しを判断せずに20案出す。",
      useScene: "記事タイトル、Podcastテーマ、X投稿、講座名、商品名、ライブ企画の発散に使う。",
      beginnerExplanation: "最初から良い案を出そうとしなくていい。まずは変な案も含めてたくさん出す。",
      articleIdeas: "アイデアが出ない原因は早く評価しすぎること / 10分で20案出す練習",
      podcastIdeas: "自己検閲を止める / 量を出すと質が上がる理由",
      aiUseSimple: "AIに『判断禁止で20案』を出させ、自分も追加で10案出してから選ぶ。",
      tagsSimple: "自己検閲, 発散, アイデア, 企画, 習慣",
      summary3Lines: "早すぎる評価はアイデアの芽を摘む。正解主義や他人の目を一度外し、最初は量だけを追う。60点でも形に出し、反応を見て磨くことが大事。",
      coreIdea: "量を出す時間と評価する時間を分ける。",
      publishingUse: "読者に『まず20案』という発信ワークを提供する。",
      useSubstack: "タイトル20案ワークをニュースレターにする。",
      useNote: "自己検閲で止まった経験を記事化する。",
      usePodcast: "良い案を出そうとしすぎる怖さを話す。",
      useLive: "10分20案チャレンジをライブで行う。",
      useNotes: "未完成案をあえて投稿する。",
      useX: "10分20案の実況や結果を投稿する。",
      useAi: "AIに大量案を出させる時も、先に評価基準を入れず発散させる。",
      contentIdeas: "タイトル20案テンプレート、企画発散ワーク、発信習慣講座にできる。",
      practiceTomorrow: "次の記事タイトルを10分で20個出し、すぐには評価しない。",
      knowledgeTags: "自己検閲, 発散, アイデア, 企画, 習慣, コンテンツ化",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addIdeaKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(IDEA_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("アイデアは才能ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "アイデア";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "令和AI時代のアイデア実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...ideaKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "アイデア";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "令和AI時代のアイデア実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function storyProfileKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: STORY_PROFILE_SAMPLE_TITLE,
    author: "",
    genre: "自己紹介 / 発信 / 物語設計 / AI活用",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "自己紹介は経歴の羅列ではなく、変化の流れとして語る",
      oneLineConclusion: "自己紹介は何をしている人かより、なぜ今そこにいるのかを伝える物語である。",
      knowledgeOverview: "経歴や実績だけを並べても印象に残りにくい。自己紹介は、過去の状況、転機、今の活動、これからの方向をつなげると、相手が理解しやすくなる。",
      todayAction: "自分の自己紹介を『今何をしているか、なぜか、土台となる体験』の3点で30秒版に書き換える。",
      useScene: "Substackプロフィール、SNS名刺、初対面の一言、Podcast冒頭、ライブ自己紹介、講座プロフィールに使う。",
      beginnerExplanation: "自己紹介は肩書きを並べるより、『こういう経験があって、今これをしています』と流れで話すと伝わりやすい。",
      articleIdeas: "自己紹介が伝わらない人は経歴を並べすぎている / AI時代のプロフィールは物語で作る",
      podcastIdeas: "自己紹介を物語に変える / 経歴ではなく変化を語る",
      aiUseSimple: "AIに経歴を整理させた後、『なぜ今の活動に至ったのか』の流れに組み替えさせる。",
      tagsSimple: "自己紹介, プロフィール, 物語, ブランディング, 発信",
      summary3Lines: "従来型の自己紹介は、情報だけ、実績だけ、価値観だけになりがち。物語型にすると、情報と変化、実績と背景、価値観と体験がつながる。相手は何者かではなく、なぜそうなったかで理解する。",
      coreIdea: "自己紹介は、変化の流れとして語る。",
      top10: "今の活動 / なぜか / 土台となる体験 / 過去 / 転機 / 今 / これから / 相手が自分ごと化できる具体性 / 余白 / 体温",
      publishingUse: "プロフィールや固定投稿を、経歴紹介ではなく発信の世界観を伝える入口に変える。",
      useSubstack: "Aboutページを、活動紹介ではなく変化の物語として書く。",
      useNote: "自己紹介記事を、過去・転機・今・これからの流れで書く。",
      usePodcast: "冒頭の自己紹介を30秒の物語にする。",
      useLive: "ライブ冒頭で、肩書きより今の活動に至った理由を話す。",
      useNotes: "短い自己紹介文を投稿して反応を見る。",
      useX: "固定ポストを、今の活動と転機が分かる文章にする。",
      useAi: "AIに短い版、標準版、長い版の自己紹介を作らせる。",
      contentIdeas: "自己紹介テンプレート、プロフィール添削、Substack About講座、固定投稿ワークにできる。",
      practiceTomorrow: "30秒版の自己紹介を1本作り、SubstackやXのプロフィール候補にする。",
      knowledgeTags: "自己紹介, プロフィール, 物語, ブランディング, 発信, Substack",
    },
    {
      ...common,
      knowledgeName: "物語の基本構造は、主人公・欠落・衝突・転機・回復・使命",
      oneLineConclusion: "物語は何が起きたかではなく、何を乗り越えて今どうなったかで伝わる。",
      knowledgeOverview: "物語は主人公、欠落、衝突、転機、回復、使命の6要素で整理できる。短い自己紹介では3要素でも機能し、順番は状況に応じて入れ替えられる。",
      todayAction: "自分の人生の出来事を時系列で並べ、転機を3つ選び、その前後で何が変わったかを書く。",
      useScene: "プロフィール文、体験談投稿、サービス紹介の背景ストーリー、講座LP、Podcast自己紹介回に使う。",
      beginnerExplanation: "ただ出来事を話すのではなく、何に困って、何が変わって、今何をしているのかを並べること。",
      articleIdeas: "自己紹介を物語にする6要素 / 体験談がただの苦労話で終わる理由",
      podcastIdeas: "人生の転機を発信の素材にする / 物語の6要素",
      aiUseSimple: "AIに出来事リストを渡し、主人公・欠落・衝突・転機・回復・使命に整理させる。",
      tagsSimple: "物語構造, 自己紹介, 体験談, 発信, 信頼構築",
      summary3Lines: "人は何が起きたかより、何を乗り越えて今どうなったかで相手を理解する。6要素を使うと、体験談がただの出来事ではなく発信の文脈になる。短い自己紹介なら、今の活動、なぜか、土台となる体験だけでも伝わる。",
      coreIdea: "相手は出来事ではなく、変化の意味を聞いている。",
      publishingUse: "体験談投稿を、感情だけでなく変化が見える構成にする。",
      useSubstack: "自己紹介連載やプロフィール記事の骨格にする。",
      useNote: "過去の転機から現在の活動につながる記事を書く。",
      usePodcast: "自己紹介回を、転機ごとの物語として構成する。",
      useLive: "参加者に転機を3つ選んでもらうワークにする。",
      useNotes: "転機を1つ選び、その前後の変化を短く投稿する。",
      useX: "過去・転機・今の3行プロフィール投稿にする。",
      useAi: "AIに抜け漏れチェックと複数パターン生成を任せる。",
      contentIdeas: "物語整理シート、自己紹介ワーク、プロフィール講座、体験談投稿テンプレートにできる。",
      practiceTomorrow: "人生の転機を3つ選び、それぞれの前後で変わったことを1行ずつ書く。",
      knowledgeTags: "物語構造, 自己紹介, 体験談, 信頼構築, ブランディング",
    },
    {
      ...common,
      knowledgeName: "発信は媒体ごとに物語の圧縮率を変える",
      oneLineConclusion: "単発投稿は転機、連投は変化の流れ、固定投稿は世界観を凝縮する。",
      knowledgeOverview: "同じ物語でも、媒体や形式によって入れる情報量を変える。単発投稿は転機に絞り、連投やスレッドは変化の前後を見せ、固定投稿やプロフィールでは世界観と約束を示す。",
      todayAction: "1つの体験談を、単発投稿・連投・プロフィール文の3パターンに分けて書く。",
      useScene: "X投稿、Notes、Substack記事、固定投稿、プロフィール文、サービス紹介、LPに使う。",
      beginnerExplanation: "同じ話でも、短い投稿では一番大事な転機だけ、長い文章では背景から順番に書く。",
      articleIdeas: "体験談を媒体別に使い分ける方法 / 同じ自己紹介を短・中・長で持つ理由",
      podcastIdeas: "媒体ごとの物語の圧縮率 / プロフィール文と投稿の違い",
      aiUseSimple: "AIに1つの体験談を、30秒版、200字版、800字版、X投稿版、Substack版に変換させる。",
      tagsSimple: "発信設計, X, Substack, プロフィール, コンテンツ化",
      summary3Lines: "物語は毎回全部説明する必要はない。短い投稿は転機、連投は変化の流れ、固定投稿は世界観、プロフィールは役割と背景を圧縮する。媒体によって物語の圧縮率を変えると、同じ素材を何度も活用できる。",
      coreIdea: "媒体ごとに、物語の長さと役割を変える。",
      publishingUse: "1つの体験談からX、Notes、Substack、プロフィールへ横展開する。",
      useSubstack: "長い版で背景と変化を丁寧に書く。",
      useNote: "標準版の自己紹介・体験談記事にする。",
      usePodcast: "体験談の背景や感情を音声で深掘りする。",
      useLive: "同じ体験を媒体別に変換する実演にする。",
      useNotes: "転機だけを短文で投稿する。",
      useX: "単発投稿は転機に絞り、スレッドは起承転結で組む。",
      useAi: "AIに媒体別の圧縮率で文章を展開させる。",
      contentIdeas: "媒体別プロフィールテンプレート、体験談リライト講座、固定投稿作成ワークにできる。",
      practiceTomorrow: "同じ自己紹介を30秒版、200字版、800字版で作る。",
      knowledgeTags: "発信設計, X, Substack, プロフィール, コンテンツ化, AI活用",
    },
    {
      ...common,
      knowledgeName: "AIで骨格を作り、自分で体温を入れる",
      oneLineConclusion: "AIは構造補助の道具であり、意味と体温の責任者は自分である。",
      knowledgeOverview: "AIには出来事整理、投稿案生成、自己紹介ドラフト、構造チェックを任せられる。一方で、本音、言いたくないこと、一次情報、自分だけが知る体験、感情の重さは自分で調整する。",
      todayAction: "AIに自己紹介の骨格を作らせた後、自分だけが知っている一次情報を1つ足す。",
      useScene: "ChatGPT・Claudeでのプロフィール作成、Codexへの知識整理、投稿案作成、自己紹介改善に使う。",
      beginnerExplanation: "AIに文章を作ってもらっても、最後に自分の本音や体験を入れないと自分らしさは出ない。",
      articleIdeas: "AIでプロフィールを作る時に失われやすいもの / AIに骨格、自分に体温",
      podcastIdeas: "AIに任せる部分と自分が担う部分 / 自分らしさはどこに宿るか",
      aiUseSimple: "AIに構成、叩き台、複数パターンを作らせ、自分が本音・体験・言わないことを決める。",
      tagsSimple: "AI活用, 自己紹介, 体温, 一次情報, ブランディング",
      summary3Lines: "AIは構造補助には強いが、人生そのものは借りられない。骨格はAIで速く作れるが、体温や一次情報は自分が入れる必要がある。AI時代ほど、自分だけの経験と意味づけが重要になる。",
      coreIdea: "構造は借りられるが、人生は借りられない。",
      publishingUse: "AIで効率化しながらも、自分の体験や本音を発信の核にする。",
      useSubstack: "AI生成の下書きに、自分の一次情報と体温を加えて記事化する。",
      useNote: "AI時代の自分らしいプロフィール作成について書く。",
      usePodcast: "AIで作った文章と自分で直した文章の違いを話す。",
      useLive: "AIで骨格を作り、その場で体温を入れる実演をする。",
      useNotes: "AIには出せない自分の一文を投稿する。",
      useX: "AIは構造、自分は体温という短文投稿にする。",
      useAi: "AIに抜け漏れチェックをさせつつ、最終判断は自分が行う。",
      contentIdeas: "AIプロフィール作成プロンプト、自己紹介添削、体温を入れるチェックリストにできる。",
      practiceTomorrow: "AIで作った自己紹介に、自分の本音・一次情報・言いたくないことの線引きを追記する。",
      knowledgeTags: "AI活用, 自己紹介, 体温, 一次情報, ブランディング, 発信",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addStoryProfileKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(STORY_PROFILE_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("自己紹介は経歴の羅列ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "自己紹介";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "自己紹介・発信を物語に変える実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...storyProfileKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "自己紹介";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "自己紹介・発信を物語に変える実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function conceptDesignKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: CONCEPT_DESIGN_SAMPLE_TITLE,
    author: "",
    genre: "コンセプト設計 / 企画 / マーケティング / AI活用",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "コンセプトは言葉ではなく、選ばれるための判断装置",
      oneLineConclusion: "コンセプトは相手が考えずに選べる状態をつくる設計である。",
      knowledgeOverview: "企画や発信が伝わらない原因は、中身の弱さよりも判断しづらさにある。コンセプトはきれいな言葉ではなく、相手が自分に必要か、他と何が違うか、今選ぶべきかを判断するための装置として設計する。",
      todayAction: "今出したい記事・企画・サービスを1つ選び、『誰が、何を、なぜ今選ぶのか』を1文で書く。",
      useScene: "記事タイトル、Substackの説明文、講座コンセプト、相談メニュー、Podcast企画、商品LP、提案資料に使う。",
      beginnerExplanation: "コンセプトはかっこいいキャッチコピーではなく、相手が『これは私に必要だ』と迷わず分かるようにする道しるべ。",
      articleIdeas: "コンセプトはキャッチコピーではない / 選ばれる発信に必要な判断装置の作り方",
      podcastIdeas: "伝わる企画と伝わらない企画の違い / コンセプトは判断を助けるもの",
      aiUseSimple: "AIに企画案を渡し、『誰が何を判断しやすくなるか』の観点で一言コンセプトを複数案出させる。",
      tagsSimple: "コンセプト設計, 判断装置, マーケティング, 発信, ブランディング",
      summary3Lines: "企画が通らない理由は、説明不足ではなく判断しづらさにある。コンセプトは一言の飾りではなく、相手が選ぶ理由を整理する判断装置。選ばれるには、即時理解、納得、今やる理由をそろえる必要がある。",
      coreIdea: "コンセプトとは『言葉』ではなく『判断の設計』である。",
      top10: "判断装置 / 選ばれる理由 / 即時理解 / 納得 / 今やる理由 / 比較優位 / 費用対効果 / やらないリスク / 説明なしで伝わるか / 選ばなかった理由を説明できるか",
      publishingUse: "発信テーマを、思いつきではなく『読者が選ぶ理由』から設計する。記事やPodcastの冒頭で、誰の何の判断を助ける内容かを明確にする。",
      useSubstack: "ニュースレターの説明文を『誰のどんな判断を助ける場所か』に書き換える。",
      useNote: "記事の冒頭で、読者がこの記事を読む理由を先に提示する。",
      usePodcast: "各回の冒頭に『今日は何を判断できるようになる回か』を入れる。",
      useLive: "ライブ告知を、話す内容ではなく参加後に判断できること中心にする。",
      useNotes: "一言コンセプト候補を短文で投稿して反応を見る。",
      useX: "『○○とは言葉ではなく判断装置』型の投稿にする。",
      useAi: "AIに対象読者、選ばれる理由、競合との差を整理させ、一言コンセプトに圧縮する。",
      contentIdeas: "コンセプト診断テンプレート、発信コンセプト作成講座、Substack説明文添削、相談メニュー設計ワークにできる。",
      practiceTomorrow: "自分のSubstackを一言で説明する文を3案作り、最も判断しやすいものを選ぶ。",
      knowledgeTags: "コンセプト設計, 判断装置, 発信, マーケティング, ブランディング, Substack",
    },
    {
      ...common,
      knowledgeName: "コンセプトは表層・中層・深層の3層で作る",
      oneLineConclusion: "一瞬で分かる、納得できる、今動きたくなるの3層がそろうと選ばれやすい。",
      knowledgeOverview: "表層は何ができるかをすぐ理解させる層。中層はなぜ可能かを仕組み・データ・安全性で納得させる層。深層はなぜ今なのかをタイミング・機会損失・費用対効果で決断させる層。",
      todayAction: "次に出す企画を『何ができる』『なぜ可能』『なぜ今』の3見出しでメモする。",
      useScene: "講座説明、記事構成、Podcast台本、LP、提案資料、サービス紹介、ライブ告知に使う。",
      beginnerExplanation: "伝わる説明は、最初に分かりやすく、次に信じられる理由を出し、最後に今やる理由を出す。",
      articleIdeas: "企画が通る3層コンセプト / 発信テーマを一瞬で伝える表層・中層・深層",
      podcastIdeas: "なぜ今やる理由まで設計するのか / 伝わるコンセプトの3階建て",
      aiUseSimple: "AIに『表層・中層・深層で整理して』と依頼し、説明の抜けをチェックする。",
      tagsSimple: "3層設計, 企画, マーケティング, セールス, 発信",
      summary3Lines: "コンセプトは一言だけでは足りない。表層で即時理解、中層で納得、深層で決断を作る。発信や商品説明でも、この3層に分けると読者や顧客が迷いにくくなる。",
      coreIdea: "理解、納得、決断の順番で設計する。",
      top10: "表層 / 中層 / 深層 / 何ができるか / なぜ可能か / なぜ今か / 仕組み / データ / ガードレール / ROI",
      publishingUse: "記事構成を『まず分かる、次に納得する、最後に行動する』流れにする。",
      useSubstack: "有料記事や講座案内を3層で組み、読者が申し込む理由を作る。",
      useNote: "ノウハウ記事を、結論、根拠、今試す理由の順で書く。",
      usePodcast: "台本を3部構成にして、最後に行動提案を入れる。",
      useLive: "ライブの説明を3層で話し、参加者が次に何をするかまで決める。",
      useNotes: "『何ができる』『なぜ可能』『なぜ今』の短い連投にする。",
      useX: "3層フレームを図解風の箇条書き投稿にする。",
      useAi: "AIに既存文章を3層に分解させ、不足している層を補わせる。",
      contentIdeas: "3層コンセプト設計シート、記事構成テンプレート、講座LPチェックリストにできる。",
      practiceTomorrow: "次の投稿案を3層に分け、弱い層を1つ補強する。",
      knowledgeTags: "コンセプト設計, 3層設計, 企画, マーケティング, セールス, 発信",
    },
    {
      ...common,
      knowledgeName: "AIは選択肢を作り、人は問い・判断・責任を持つ",
      oneLineConclusion: "AI時代の価値は作業量ではなく、何を選ぶかを決める力に移る。",
      knowledgeOverview: "AIは情報収集、選択肢の列挙、要約、構造化が得意。一方で目的の定義、使う・捨てる判断、制約設定、リスク管理、最終責任は人が担う。コンセプト設計ではAIを実行役にし、人が方向性を決める。",
      todayAction: "AIに企画案を10個出させた後、自分で『使う案・捨てる案・保留案』に分け、理由を1行ずつ書く。",
      useScene: "ChatGPTやClaudeでの企画出し、Codexへの読書整理、講座設計、商品企画、発信テーマ選定に使う。",
      beginnerExplanation: "AIはたくさん案を出してくれるけれど、どれを使うか、なぜそれを選ぶかは自分が決める。",
      articleIdeas: "AI時代に人間がやるべきこと / AIに任せることと自分で決めること",
      podcastIdeas: "AIは実行、人は方向性 / 判断力が発信の差になる",
      aiUseSimple: "AIに発散と整理を任せ、自分は目的、基準、採用判断、リスク確認を担当する。",
      tagsSimple: "AI活用, 判断, 企画, コンセプト設計, 仕事術",
      summary3Lines: "AIは選択肢を増やすのが得意だが、判断と責任は人に残る。問いの定義が弱いと、AIの出力も使いづらくなる。AI共存時代のコンセプト設計では、人が方向を決め、AIが整理と案出しを支える。",
      coreIdea: "AIに作業を渡しても、判断は手放さない。",
      top10: "情報収集 / 整理 / 選択肢生成 / 要約 / 目的定義 / 判断 / 制約設定 / リスク管理 / 説明責任 / 意思決定",
      publishingUse: "AIで大量に出した企画を、自分の読者に必要かどうかで選別して発信する。",
      useSubstack: "AIに記事案を出させ、読者の悩みと自分の方針に合う案だけ連載化する。",
      useNote: "AI活用の実験記事として、採用した案と捨てた案の理由を書く。",
      usePodcast: "AIが出した案を自分がどう判断したかを話す回にする。",
      useLive: "AIで案出しし、その場で判断基準を説明するライブにする。",
      useNotes: "『AIに出してもらった案から、これを選んだ理由』を投稿する。",
      useX: "AIは選択肢、人は判断という短文投稿にする。",
      useAi: "プロンプトに目的、読者、採用基準、NG条件を入れて、選択肢の質を上げる。",
      contentIdeas: "AI企画判断テンプレート、プロンプト集、AI時代のコンセプト設計講座にできる。",
      practiceTomorrow: "AIで投稿テーマを10個出し、採用基準を3つ決めて1つだけ選ぶ。",
      knowledgeTags: "AI活用, 判断, 企画, コンセプト設計, 発信, 仕事術",
    },
    {
      ...common,
      knowledgeName: "コンセプトは説明なしで伝わるか、比較に勝てるか、選ばない理由を説明できるかで検証する",
      oneLineConclusion: "良いコンセプトは作った瞬間ではなく、検証質問に耐えたときに強くなる。",
      knowledgeOverview: "最後に確認すべき問いは、説明なしで伝わるか、比較された時に勝てるか、選ばなかった理由を説明できるか。曖昧なまま公開せず、読者や顧客が迷うポイントを先に潰すことで実用性が上がる。",
      todayAction: "今あるサービス説明や記事タイトルに対して、3つの検証質問をYES/NOでチェックする。",
      useScene: "タイトル改善、講座案内、セールスページ、プロフィール、相談メニュー、企画書、X固定投稿の見直しに使う。",
      beginnerExplanation: "作った言葉が本当に伝わるかは、自分の満足ではなく、相手が迷わず分かるかで確認する。",
      articleIdeas: "コンセプトを公開前にチェックする3つの質問 / 選ばれる理由を検証する方法",
      podcastIdeas: "企画を出す前のYES/NOチェック / 比較されても残るコンセプト",
      aiUseSimple: "AIに『この説明は3つの質問にYESと言えるか』を判定させ、改善案を出させる。",
      tagsSimple: "検証, コンセプト設計, マーケティング, ブランディング, セールス",
      summary3Lines: "コンセプトは作って終わりではない。説明なしで伝わるか、比較に勝てるか、選ばなかった理由を説明できるかで検証する。検証を通すと、発信や商品説明が読者の判断に近づく。",
      coreIdea: "コンセプトは検証して初めて使える資産になる。",
      top10: "説明なしで伝わるか / 比較に勝てるか / 選ばない理由 / YES/NO検証 / 読者視点 / 競合比較 / 判断基準 / 改善 / 公開前チェック / 資産化",
      publishingUse: "記事や商品案を出す前に3つの質問でチェックし、弱い部分を直してから公開する。",
      useSubstack: "About文や有料案内を、説明なしで価値が伝わるか検証する。",
      useNote: "公開前の記事タイトルを、競合記事と比べて選ばれる理由があるか見直す。",
      usePodcast: "番組説明と各回タイトルを、初見の人が聞く理由でチェックする。",
      useLive: "ライブ告知文を、参加しない理由まで説明できるかで整える。",
      useNotes: "候補タイトルを投稿し、どれが一番分かりやすいか反応を見る。",
      useX: "コンセプト検証3質問をチェックリスト投稿にする。",
      useAi: "AIに初見読者役、競合比較役、辛口レビュアー役をさせて改善する。",
      contentIdeas: "コンセプト検証チェックリスト、タイトル改善テンプレート、講座案内診断、AI添削プロンプトにできる。",
      practiceTomorrow: "Substackの説明文を3質問で見直し、1文だけ改善する。",
      knowledgeTags: "コンセプト設計, 検証, マーケティング, ブランディング, 信頼構築, Substack",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addConceptDesignKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(CONCEPT_DESIGN_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("コンセプトは言葉ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "コンセプト設計";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "令和版・コンセプト設計 実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...conceptDesignKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "コンセプト設計";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "令和版・コンセプト設計 実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function valueOsKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: VALUE_OS_SAMPLE_TITLE,
    author: "",
    genre: "価値設計 / 思考OS / マーケティング / 発信 / 継続設計",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化", "OS"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "価値は価格ではなく、相手にとっての意味で決まる",
      oneLineConclusion: "高く売るのではなく、意味が立ち上がるから選ばれる。",
      knowledgeOverview: "人は価格そのものではなく、自分の人生や仕事にどんな意味があるかに反応する。価格を先に考えるより、誰のどんな状態をどう変えるのか、なぜその人に必要なのかを設計することが価値になる。",
      todayAction: "自分の商品・記事・相談メニューを1つ選び、『これは誰の人生や仕事で何の役に立つか』を1文で書く。",
      useScene: "Substackの有料案内、相談メニュー、講座設計、記事タイトル、Podcast企画、商品説明、プロフィールに使う。",
      beginnerExplanation: "値段を上げる前に、『これを受け取ると相手にどんな意味があるのか』を言葉にすること。",
      articleIdeas: "価値は価格ではなく意味で決まる / 高く売ろうとすると選ばれない理由",
      podcastIdeas: "人は何にお金を払っているのか / 価格ではなく意味を作る",
      aiUseSimple: "AIに商品説明を渡し、『価格ではなく意味が伝わる表現』に変換させる。",
      tagsSimple: "価値設計, 意味, マーケティング, ブランディング, 発信",
      summary3Lines: "令和の時代はノウハウが古くなり、正解も人によって違う。だから価格や機能だけでは選ばれにくい。相手にとっての意味を設計し、誰のどんな状態をどう変えるかを言語化することが価値になる。",
      coreIdea: "価値は意味の設計から生まれる。",
      top10: "意味 / 価格 / 購入理由 / 文脈 / 役割 / 誰の課題か / どんな状態を変えるか / 一文定義 / 価値の再定義 / 選ばれる理由",
      publishingUse: "発信を情報提供だけで終わらせず、読者にとっての意味を冒頭で示す。",
      useSubstack: "有料記事やメルマガ説明を『何が読めるか』ではなく『読者の何が変わるか』で書く。",
      useNote: "記事冒頭に、読むことで得られる意味を1文で入れる。",
      usePodcast: "各回の導入で、聴く意味を先に伝える。",
      useLive: "ライブ告知を、話題ではなく参加後の変化で書く。",
      useNotes: "『価格ではなく意味』を短文で投稿し、自分の商品に当てはめる。",
      useX: "価値は価格ではなく意味、という切り口で投稿する。",
      useAi: "AIに読者別の意味づけを複数案出させ、最も自分の文脈に合うものを選ぶ。",
      contentIdeas: "価値言語化テンプレート、相談メニュー改善ワーク、Substack有料案内添削、価値設計講座にできる。",
      practiceTomorrow: "今ある発信テーマを『誰のどんな状態をどう変えるか』の一文に直す。",
      knowledgeTags: "価値設計, 意味, マーケティング, ブランディング, 発信, Substack",
    },
    {
      ...common,
      knowledgeName: "価値は足すより、削ることで輪郭が立つ",
      oneLineConclusion: "誰に向けないか、何をやらないか、何を言わないかが差別化になる。",
      knowledgeOverview: "全員に向けるほど、メッセージは薄まる。価値は機能や説明を足した総量ではなく、選ばなかったものによって輪郭が生まれる。対象外、やらないこと、言わないことを決めると、発信や商品が鋭くなる。",
      todayAction: "今の発信で『やらないこと』を1つ決め、プロフィールやメモに残す。",
      useScene: "発信テーマの絞り込み、講座内容の整理、サービス設計、プロフィール、固定投稿、記事カテゴリ設計に使う。",
      beginnerExplanation: "何でも入れると分かりにくくなる。誰に届けたいかを決めるために、届けない人も決める。",
      articleIdeas: "発信がぼやける原因は足しすぎ / やらないことを決めると選ばれやすくなる",
      podcastIdeas: "削る勇気が価値を作る / 全員向けをやめる話",
      aiUseSimple: "AIに発信テーマやサービス案を渡し、『削るべき要素』『対象外にする人』を提案させる。",
      tagsSimple: "削る, 差別化, ターゲット, ブランディング, 発信設計",
      summary3Lines: "価値は足し算だけでは強くならない。誰に向けないか、何をやらないか、何を言わないかを決めることで輪郭が立つ。発信や商品は、削るほど相手が判断しやすくなる。",
      coreIdea: "選ばなかったものの総量が、価値の輪郭を作る。",
      top10: "削る / 対象外 / やらないこと / 言わないこと / ターゲット / 輪郭 / 差別化 / メッセージ / 判断しやすさ / 勇気",
      publishingUse: "記事やPodcastのテーマを広げすぎず、今回扱わないことを決めてから作る。",
      useSubstack: "ニュースレターの対象読者と対象外読者を明確にする。",
      useNote: "記事内で言いたいことを1つに絞り、余談を別記事に分ける。",
      usePodcast: "1回のテーマを狭くし、話さないことを先に決める。",
      useLive: "ライブのテーマを1つに絞り、参加者に持ち帰ってほしい行動だけ残す。",
      useNotes: "『私はこれはやらない』という発信の線引きを投稿する。",
      useX: "やらないことリストを短文投稿にする。",
      useAi: "AIに文章を短くさせるだけでなく、『削っても価値が残る部分』を見つけさせる。",
      contentIdeas: "やらないことリストテンプレート、発信テーマ整理ワーク、講座内容の削り方チェックリストにできる。",
      practiceTomorrow: "次の記事で扱わないことを3つ書いてから本文を書く。",
      knowledgeTags: "削る, 差別化, ブランディング, 発信設計, ターゲット, マーケティング",
    },
    {
      ...common,
      knowledgeName: "共感はゴールではなく、参加を生む入口",
      oneLineConclusion: "見てくれる人を増やすより、一緒に動ける役割を渡す。",
      knowledgeOverview: "共感してもらうだけでは、相手は観客席にいる。熱量は参加できる条件、役割、貢献の場があると生まれる。発信では『分かる』で終わらせず、『一緒にやってみよう』に変える設計が重要になる。",
      todayAction: "次の投稿の最後に、読者が1分で参加できる小さな問いや行動を入れる。",
      useScene: "コミュニティ運営、ライブ配信、Substackコメント、Podcast感想募集、Notes投稿、講座ワークに使う。",
      beginnerExplanation: "読者に共感してもらうだけでなく、『あなたもここで一緒にできます』という参加の入口を作ること。",
      articleIdeas: "共感だけではコミュニティは育たない / 読者を参加者に変える小さな設計",
      podcastIdeas: "フォロワーとキョウカンシャの違い / 参加のしやすさを作る",
      aiUseSimple: "AIに記事やライブ案を渡し、読者が参加できる問い、ワーク、コメント導線を作らせる。",
      tagsSimple: "参加設計, 共感, コミュニティ, 信頼構築, 発信",
      summary3Lines: "共感はゴールではなく入口。フォロワーは見ている人で、キョウカンシャは参加している人。参加条件、役割、貢献の場を明示すると、発信は一方通行から一緒に作る場へ変わる。",
      coreIdea: "共感を求めるのではなく、参加を設計する。",
      top10: "共感 / 参加 / キョウカンシャ / 役割 / 貢献の場 / 当事者意識 / コメント / 行動 / コミュニティ / 熱量",
      publishingUse: "投稿の最後に読者が参加できる問いや小さな実験を置く。",
      useSubstack: "記事末に返信テーマを入れ、読者の経験を次回記事に反映する。",
      useNote: "コメントで答えやすい問いを1つだけ置く。",
      usePodcast: "感想募集ではなく、次回扱う問いへの参加を呼びかける。",
      useLive: "視聴者がその場で答えられるワークや投票を入れる。",
      useNotes: "短い問いかけ投稿で読者の参加を促す。",
      useX: "『あなたならどうする？』ではなく、選択肢付きの参加投稿にする。",
      useAi: "AIに投稿ごとの参加導線を作らせ、コメントしやすさをチェックする。",
      contentIdeas: "参加設計テンプレート、ライブ台本、コメントが増える記事末チェックリスト、コミュニティ運営講座にできる。",
      practiceTomorrow: "次のSubstack記事末に、読者が返信できる問いを1つ入れる。",
      knowledgeTags: "参加設計, 共感, コミュニティ, 信頼構築, 発信, Substack",
    },
    {
      ...common,
      knowledgeName: "令和型の意思決定は、正解探しより仮説・実験・学習",
      oneLineConclusion: "正しかったかより、早く動いて早く修正できたかを評価する。",
      knowledgeOverview: "変化が速い時代は、全員の合意や完璧な計画を待つほど価値が古くなる。確からしい仮説を持って小さく動き、反応を見て学習する。判断に迷ったら、誰の課題か、本当に困っているか、自分がやる理由、削るもの、続く形かを確認する。",
      todayAction: "止まっている企画を1つ選び、完璧版ではなく24時間以内に試せる最小版にする。",
      useScene: "新企画、記事連載、講座づくり、相談メニュー、ライブ企画、AI実験、発信改善に使う。",
      beginnerExplanation: "最初から正解を作ろうとせず、小さく試して反応を見ながら直していくこと。",
      articleIdeas: "正解探しをやめると発信は進む / 令和型の意思決定は仮説と実験",
      podcastIdeas: "完璧主義より学習速度 / 迷った時の5つの質問",
      aiUseSimple: "AIに企画を最小実験に分解させ、検証する指標と次の修正案を作らせる。",
      tagsSimple: "仮説, 実験, 学習, 継続, 意思決定",
      summary3Lines: "令和型の意思決定では、正しいかどうかより動いたかどうかが価値を生む。仮説を立て、小さく実験し、学習速度を指標にする。迷ったら5つの問いに戻り、続く形かどうかを確認する。",
      coreIdea: "価値は正解ではなく、仮説・実験・学習のサイクルから育つ。",
      top10: "スピード / 仮説 / 実験 / 学習 / 修正 / 5つの問い / 誰の課題か / 自分がやる理由 / 削るもの / 続く形",
      publishingUse: "発信を完成品として出すだけでなく、実験として出して反応から学ぶ。",
      useSubstack: "新連載をまず1本だけ出し、開封率や返信で次回を修正する。",
      useNote: "記事テーマを小さく試し、反応があるものを深掘りする。",
      usePodcast: "仮説回として話し、リスナー反応を次回に活かす。",
      useLive: "新しい企画をライブで小さく試し、質問内容を教材化する。",
      useNotes: "企画の仮説を短文で出して反応を見る。",
      useX: "投稿をテストとして出し、保存や返信の多いテーマを育てる。",
      useAi: "AIに実験計画、観察指標、改善案を作らせる。",
      contentIdeas: "仮説実験シート、迷った時の5問テンプレート、発信実験ログ、継続設計講座にできる。",
      practiceTomorrow: "やらないことを1つ決め、対象の誰を1人まで絞って小さな投稿を出す。",
      knowledgeTags: "仮説, 実験, 学習, 継続, 意思決定, 発信, AI活用",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addValueOsKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(VALUE_OS_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("価値は価格ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "価値設計";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "価値で選ばれる思考OS実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...valueOsKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "価値設計";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "価値で選ばれる思考OS実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function actionProfileKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: ACTION_PROFILE_SAMPLE_TITLE,
    author: "",
    genre: "自己紹介 / プロフィール / 信頼構築 / 営業導線 / 発信設計",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "自己紹介は自分の説明ではなく、相手の未来を提示する設計物",
      oneLineConclusion: "自己紹介の目的は覚えてもらうことではなく、次の行動を生むこと。",
      knowledgeOverview: "多くの自己紹介は想い、経歴、肩書きから始まるため、相手にとっての判断材料にならない。行動を生む自己紹介は、相手が得られる変化を先に示し、その根拠と次の一手まで設計する。",
      todayAction: "今の自己紹介を『私は誰に、どんな変化をもたらす人か』の1文に書き換える。",
      useScene: "Substackプロフィール、X固定投稿、Podcast冒頭、交流会、商談、ライブ冒頭、講座自己紹介に使う。",
      beginnerExplanation: "自己紹介は『私は何者か』を話す場ではなく、『あなたに何ができる人か』を伝える場。",
      articleIdeas: "自己紹介で行動が生まれない理由 / 肩書きより先に相手の未来を話す",
      podcastIdeas: "自己紹介は自分語りではなく導線設計 / 覚えられる人の話し方",
      aiUseSimple: "AIに今の自己紹介を渡し、『相手の未来が先に見える形』へ書き換えさせる。",
      tagsSimple: "自己紹介, プロフィール, 導線設計, 信頼構築, ブランディング",
      summary3Lines: "自己紹介で成果が出ない原因は能力不足ではなく伝達設計の不備。相手は過去や肩書きではなく、自分にどんな変化をもたらす人かを知りたい。未来、根拠、次の行動の順で設計すると、記憶と行動につながる。",
      coreIdea: "自己紹介は相手の未来を提示し、次の行動を引き出す設計物である。",
      top10: "相手の未来 / 伝達設計 / 変化 / 根拠 / 次の行動 / 肩書きではなく提供価値 / 15〜25秒 / 行動要請は1つ / 記憶 / 紹介される状態",
      publishingUse: "プロフィールや冒頭文を、活動紹介ではなく読者が得られる変化から始める。",
      useSubstack: "Aboutページの最初を『誰にどんな変化を届けるか』にする。",
      useNote: "自己紹介記事を、経歴ではなく読者に提供できる未来から書く。",
      usePodcast: "冒頭の名乗りを、肩書きではなくリスナーが得る変化で始める。",
      useLive: "ライブ冒頭で、今日参加すると何が変わるかを先に伝える。",
      useNotes: "短い自己紹介文を投稿し、どの表現が覚えられるか反応を見る。",
      useX: "固定ポストを『私は誰にどんな変化をもたらす人か』に書き換える。",
      useAi: "AIに読者別の自己紹介案を作らせ、最も行動につながる表現を選ぶ。",
      contentIdeas: "行動を生む自己紹介テンプレート、プロフィール添削、Substack About改善講座、交流会用15秒自己紹介ワークにできる。",
      practiceTomorrow: "自己紹介の1文目を『私は［対象］に［変化］をもたらす人です』で作る。",
      knowledgeTags: "自己紹介, プロフィール, 導線設計, 信頼構築, ブランディング, Substack",
    },
    {
      ...common,
      knowledgeName: "三文自己紹介は、未来・過去・現在の順で作る",
      oneLineConclusion: "未来で興味を作り、過去で信頼を作り、現在で行動をお願いする。",
      knowledgeOverview: "行動を生む自己紹介の基本型は、1文目に相手のメリットや変化、2文目に根拠となる実績や経験、3文目に今してほしい行動を置く。順番を変えると、相手が判断する前に情報が散らばりやすい。",
      todayAction: "未来、過去、現在の3文で15〜25秒の自己紹介を1本作る。",
      useScene: "交流会、商談、Podcastゲスト紹介、ライブ自己紹介、講座募集、相談案内に使う。",
      beginnerExplanation: "最初に『何が変わるか』、次に『なぜ信じられるか』、最後に『何をしてほしいか』を言う。",
      articleIdeas: "自己紹介は未来・過去・現在の順で話す / 15秒で信頼される三文自己紹介",
      podcastIdeas: "三文自己紹介の作り方 / 経歴から話すと伝わらない理由",
      aiUseSimple: "AIに『未来・過去・現在の三文自己紹介にして』と依頼し、15〜25秒に圧縮させる。",
      tagsSimple: "三文自己紹介, 未来過去現在, CTA, 信頼構築, 営業",
      summary3Lines: "自己紹介は、未来、過去、現在の順番が重要。未来で相手の興味を固定し、過去の実績で納得を作り、現在の行動要請で次の一手を生む。行動要請は1つに絞ることで相手が動きやすくなる。",
      coreIdea: "未来、過去、現在の順番が、興味、信頼、行動を作る。",
      top10: "未来 / 過去 / 現在 / ベネフィット / 実績 / 経験 / 行動要請 / 15〜25秒 / 1CTA / 成約",
      publishingUse: "記事や音声の冒頭を、読者の変化、根拠、次の行動の順に整える。",
      useSubstack: "ニュースレター紹介文を三文自己紹介型にする。",
      useNote: "プロフィール記事の冒頭に三文版を置く。",
      usePodcast: "番組紹介とゲスト紹介を三文型で作る。",
      useLive: "ライブ開始時に三文自己紹介を固定で話す。",
      useNotes: "三文版を1投稿で試す。",
      useX: "三文自己紹介を固定ポスト候補にする。",
      useAi: "AIに長い自己紹介を三文型、30秒型、X固定投稿型に変換させる。",
      contentIdeas: "三文自己紹介テンプレート、15秒自己紹介作成ワーク、営業プロフィール添削、Podcast導入文テンプレートにできる。",
      practiceTomorrow: "三文自己紹介を音読して、25秒以内に収まるまで削る。",
      knowledgeTags: "三文自己紹介, CTA, 信頼構築, 営業, 発信, プロフィール",
    },
    {
      ...common,
      knowledgeName: "自己紹介はベネフィット型とビジョン型を使い分ける",
      oneLineConclusion: "初対面や商談はベネフィット型、仲間集めや登壇はビジョン型が効く。",
      knowledgeOverview: "自己紹介には、今すぐ役立つ変化を示すベネフィット型と、中長期の方向性や世界観を示すビジョン型がある。相手がまだ自分に興味を持っていない場ではベネフィット型が無難で、物語を聞く姿勢がある場ではビジョン型が使える。",
      todayAction: "同じ自分について、ベネフィット型とビジョン型の自己紹介を1本ずつ作る。",
      useScene: "交流会、商談、採用、登壇、共創募集、Substack紹介文、Podcastプロフィールに使う。",
      beginnerExplanation: "すぐ役に立つことを伝える自己紹介と、これから一緒に作りたい未来を伝える自己紹介を分けて持つ。",
      articleIdeas: "自己紹介は場面で使い分ける / ベネフィット型とビジョン型の違い",
      podcastIdeas: "今役立つ人として語るか、未来を作る人として語るか / 自己紹介の使い分け",
      aiUseSimple: "AIに同じ素材から、商談用のベネフィット型と登壇用のビジョン型を作らせる。",
      tagsSimple: "ベネフィット型, ビジョン型, 場面設計, ブランディング, 共創",
      summary3Lines: "自己紹介は1種類だけでは足りない。直近の課題解決にはベネフィット型、仲間や協力者を集める場にはビジョン型が向く。迷ったらベネフィット型を使い、相手が物語を聞く姿勢になっている時にビジョン型を使う。",
      coreIdea: "自己紹介は場面ごとに目的を変える。",
      top10: "ベネフィット型 / ビジョン型 / 即効性 / 共感性 / 商談 / 交流会 / 採用 / 登壇 / 共創募集 / 使い分け",
      publishingUse: "媒体や場面ごとに、すぐ役立つ紹介文と世界観を伝える紹介文を持つ。",
      useSubstack: "Aboutページにはビジョン型、購読導線にはベネフィット型を使う。",
      useNote: "プロフィール記事ではビジョン型、ノウハウ記事冒頭ではベネフィット型にする。",
      usePodcast: "番組紹介はビジョン型、各回冒頭はベネフィット型にする。",
      useLive: "企画告知はベネフィット型、コミュニティ募集はビジョン型にする。",
      useNotes: "2種類の自己紹介を投稿して反応差を見る。",
      useX: "固定ポストはベネフィット型、プロフィール欄はビジョン型を混ぜる。",
      useAi: "AIに媒体別、相手別の自己紹介パターンを作らせる。",
      contentIdeas: "媒体別プロフィール集、自己紹介使い分けテンプレート、共創募集文テンプレート、Substack導線改善講座にできる。",
      practiceTomorrow: "商談用と登壇用の自己紹介を1つずつスマホメモに保存する。",
      knowledgeTags: "自己紹介, ベネフィット型, ビジョン型, ブランディング, 共創, Substack",
    },
    {
      ...common,
      knowledgeName: "自己紹介の最終ゴールは、他人に紹介される状態を作ること",
      oneLineConclusion: "良い自己紹介は、自分がいない場所でも伝言できる短さを持つ。",
      knowledgeOverview: "自己紹介の完成形は、自分が話して終わることではなく、他人が『あの人は○○な人』と紹介できる状態。20〜30文字程度の紹介用一文、対象と変化、根拠1つを設計し、実戦で使って反応を観察しながら更新する。",
      todayAction: "『あの人は、○○で△△を起こす人』という紹介用一文を作る。",
      useScene: "紹介依頼、口コミ、Xプロフィール、Substack About、名刺代わりの一文、登壇者紹介に使う。",
      beginnerExplanation: "自分だけが言える自己紹介ではなく、他の人もまねして言える短い言葉にすること。",
      articleIdeas: "紹介される人は自己紹介が短い / 他人が言いやすいプロフィールの作り方",
      podcastIdeas: "自分がいない場所で名前が出る自己紹介 / 紹介用一文の作り方",
      aiUseSimple: "AIに自己紹介を20〜30文字の紹介用一文に圧縮させ、言いやすさを比較する。",
      tagsSimple: "紹介される, 口コミ, 記憶, プロフィール, 改善ログ",
      summary3Lines: "自己紹介の最終ゴールは、他人に紹介される状態を作ること。対象、変化、根拠1つに絞ると、伝言ゲームでも残りやすい。完成形はなく、使う、観察する、改稿する、再テストするサイクルで育てる。",
      coreIdea: "自己紹介は一度作って終わりではなく、反応を見て育てる。",
      top10: "紹介用一文 / 20〜30文字 / 対象×変化 / 根拠1つ / 伝言しやすさ / 復唱された言葉 / 質問 / 次の行動 / 改稿 / 再テスト",
      publishingUse: "プロフィールや固定投稿を、他人が紹介しやすい短い一文に圧縮する。",
      useSubstack: "Aboutページの冒頭に紹介用一文を置く。",
      useNote: "プロフィール記事のタイトルを紹介用一文に近づける。",
      usePodcast: "番組紹介文を、リスナーが人に説明できる短さにする。",
      useLive: "参加者に自分を一言で紹介してもらい、残った言葉をログにする。",
      useNotes: "紹介用一文候補を複数投稿して反応を見る。",
      useX: "プロフィール欄と固定ポストに20〜30文字の短縮形を入れる。",
      useAi: "AIに復唱されやすさ、専門用語の有無、Before/Afterの明確さをチェックさせる。",
      contentIdeas: "紹介用一文メーカー、プロフィール改善ログ、口コミされる自己紹介講座、AI添削プロンプトにできる。",
      practiceTomorrow: "今週3回使う自己紹介ログ欄を作り、反応・質問・次の行動を記録する。",
      knowledgeTags: "紹介される, 口コミ, 記憶, プロフィール, 改善, 信頼構築",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addActionProfileKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(ACTION_PROFILE_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("自己紹介は自分の説明ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "自己紹介";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "行動を生む自己紹介 実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...actionProfileKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "自己紹介";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "行動を生む自己紹介 実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function copyTargetKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: COPY_TARGET_SAMPLE_TITLE,
    author: "",
    genre: "コピーライティング / 商品設計 / ターゲット設計 / マーケティング / 発信導線",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: {
      article: 0,
      podcast: 0,
      notes: 0,
      x: 0,
      kindle: 0,
      brain: 0,
    },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "AI", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "売れる文章は書き方ではなく、商品理解・相手理解・接点発見で決まる",
      oneLineConclusion: "売れる文章はうまい言い回しではなく、商品価値と相手の願望が重なる接点の翻訳である。",
      knowledgeOverview: "文章が売れない原因は、表現力不足よりも設計不足にある。商品を深く理解し、相手の悩みや感情を言語化し、その両者が重なる接点を相手の言葉に翻訳すると、自然に反応される文章になる。",
      todayAction: "今売りたい商品や企画を1つ選び、『商品理解・相手理解・接点』の3列でメモする。",
      useScene: "Substack有料導線、募集文、固定投稿、講座LP、相談メニュー、Podcast告知、X投稿に使う。",
      beginnerExplanation: "売れる文章はかっこいい文章ではなく、『相手が欲しい変化』と『商品ができること』が重なる場所を言葉にしたもの。",
      articleIdeas: "売れる文章は書き方より接点で決まる / 文章がうまいのに売れない理由",
      podcastIdeas: "コピーライティングの前にやるべき3つの設計 / 接点が見えると文章は変わる",
      aiUseSimple: "AIに商品説明と読者像を渡し、商品理解・相手理解・接点を表に整理させる。",
      tagsSimple: "コピーライティング, 接点, 商品理解, ターゲット理解, マーケティング",
      summary3Lines: "売れる文章は、書き方より設計で決まる。商品理解、ターゲット理解、接点発見が浅いと、文章は一方通行になる。商品価値と相手の悩みや願望が重なる翻訳地点を見つけると、相手が自分ごととして反応する。",
      coreIdea: "書き方の前に、商品と相手と接点を設計する。",
      top10: "商品理解 / ターゲット理解 / 接点発見 / 変化 / 悩み / 感情 / 願望 / 翻訳地点 / 相手の言葉 / 設計",
      publishingUse: "記事や募集文を書く前に、読者の悩みと自分の提供価値が重なる一点を決める。",
      useSubstack: "有料記事やニュースレターの説明文を、機能説明ではなく読者の変化から書く。",
      useNote: "商品紹介記事を、商品の特徴ではなく読者の悩みから始める。",
      usePodcast: "告知文で、今回聴くと何が解決するかを先に出す。",
      useLive: "ライブ告知を、話す内容ではなく参加者の悩みと変化で組む。",
      useNotes: "接点の一文を短く投稿して反応を見る。",
      useX: "『売れる文章は書き方ではなく接点』の切り口で投稿する。",
      useAi: "AIに商品価値、相手の悩み、相手の願望を3つずつ出させ、最も強い接点を選ぶ。",
      contentIdeas: "接点発見テンプレート、募集文添削、商品理解ワーク、Substack有料導線講座にできる。",
      practiceTomorrow: "次に売りたいものについて、商品価値3つ、相手の悩み3つ、願望3つを書き出す。",
      knowledgeTags: "コピーライティング, 接点, 商品理解, ターゲット理解, マーケティング, Substack",
    },
    {
      ...common,
      knowledgeName: "商品理解は、特徴ではなく相手に起きる変化まで言える状態",
      oneLineConclusion: "商品説明を売る側の言葉から、買った後の変化に翻訳する。",
      knowledgeOverview: "商品理解とは、何をする商品かだけでなく、相手にどんな変化が起きるか、他と何が違うか、なぜ今必要か、向いている人と向いていない人は誰かまで言える状態。特徴ではなく変化で語るほど、文章は相手に届く。",
      todayAction: "自分の商品や発信メニューについて、『買った後、何が楽になるか』『何を失わずに済むか』を書く。",
      useScene: "商品ページ、講座説明、相談メニュー、メルマガ案内、記事導入、ライブ販売導線に使う。",
      beginnerExplanation: "商品の機能を説明するだけではなく、それを使うと相手の日常や仕事がどう楽になるかを書く。",
      articleIdeas: "商品説明が売れない理由は特徴ばかりだから / 変化で語る商品理解ワーク",
      podcastIdeas: "特徴を変化に翻訳する / 買った後に何が楽になるのか",
      aiUseSimple: "AIに機能一覧を渡し、『相手に起きる変化』『楽になること』『防げる損失』に変換させる。",
      tagsSimple: "商品理解, 変化, ベネフィット, 商品設計, セールス",
      summary3Lines: "商品理解はスペック把握ではない。相手に起きる大きな変化、小さな変化、違い、必要なタイミング、向き不向きまで言えること。商品を変化で語ると、売る側の説明から相手側の言葉に近づく。",
      coreIdea: "特徴より、買った後の変化を書く。",
      top10: "商品名 / 何をする商品か / 大きな変化 / 小さな変化 / 違い / なぜ今必要か / 向いている人 / 向いていない人 / 楽になること / 失わずに済むこと",
      publishingUse: "発信や商品紹介で、機能紹介の前に読者のBefore/Afterを示す。",
      useSubstack: "有料購読の説明を、読める内容ではなく読者が得る変化で書く。",
      useNote: "商品紹介記事に『向いている人・向いていない人』を入れる。",
      usePodcast: "サービス説明回で、機能ではなく変化の事例を話す。",
      useLive: "販売ライブで、買った後に楽になることを具体的に話す。",
      useNotes: "商品特徴を1つ選び、相手の変化に言い換える投稿をする。",
      useX: "『機能: ○○ → 変化: △△』型の投稿にする。",
      useAi: "AIに特徴をベネフィット、リスク回避、時間短縮、苦痛除去へ分解させる。",
      contentIdeas: "商品理解10問シート、特徴から変化への翻訳テンプレート、商品ページ改善講座にできる。",
      practiceTomorrow: "商品の特徴を3つ選び、それぞれ『だから相手はどう変わるか』を1文にする。",
      knowledgeTags: "商品理解, 変化, ベネフィット, 商品設計, セールス, マーケティング",
    },
    {
      ...common,
      knowledgeName: "ターゲット理解は属性ではなく、頭の中と感情を言語化すること",
      oneLineConclusion: "年齢や職業より、相手が夜に何でモヤモヤしているかを書く。",
      knowledgeOverview: "ターゲット理解は、30代女性や会社員といったプロフィール設定では足りない。今の状況、困りごと、恐れ、本当の願望、止まっている言い訳、反応する言葉や冷める言葉まで掘ることで、相手の言葉に近づける。",
      todayAction: "読者やお客さんを1人思い浮かべ、『何を怖がっているか』『本当はどうなりたいか』を書く。",
      useScene: "記事企画、募集文、固定投稿、Substack読者設計、Podcastテーマ、講座LP、相談メニューに使う。",
      beginnerExplanation: "ターゲット設定は年齢や肩書きではなく、その人が何に困って、どんな言葉に反応するかを考えること。",
      articleIdeas: "ターゲットは属性ではなく頭の中で決まる / 読者のモヤモヤを言葉にする方法",
      podcastIdeas: "読者理解はプロフィール設定で終わらない / 相手の冷める言葉を知る",
      aiUseSimple: "AIに読者像を渡し、悩み、恐れ、願望、言い訳、反応する言葉、冷める言葉を出させる。",
      tagsSimple: "ターゲット理解, 読者理解, 感情, ペルソナ, 発信",
      summary3Lines: "ターゲット理解は属性分類ではなく、相手の頭の中と感情を言語化すること。何に困り、何を恐れ、何を望み、何を言い訳に止まっているかを見る。相手の言葉に近づくほど、文章は押し売りではなく自分ごとになる。",
      coreIdea: "相手の属性ではなく、相手の内側の言葉を書く。",
      top10: "今の状況 / 困りごと / 進まない原因 / 恐れ / 願望 / 諦め / 反応する言葉 / 冷める言葉 / 試してダメだったこと / 捨てたくない希望",
      publishingUse: "記事の冒頭を、読者が普段言えずにいるモヤモヤから始める。",
      useSubstack: "読者像を『属性』ではなく『悩みと言葉』で保存し、連載テーマに反映する。",
      useNote: "読者の本音を見出しに入れる。",
      usePodcast: "リスナーの言えない悩みをテーマにする。",
      useLive: "参加者のモヤモヤを事前に質問として集める。",
      useNotes: "読者が反応しそうな一言を短文でテストする。",
      useX: "『○○で止まってる人へ』型の投稿を作る。",
      useAi: "AIに読者インタビュー役をさせ、深掘り質問を10個作らせる。",
      contentIdeas: "読者理解10問シート、冷める言葉チェックリスト、発信ペルソナ再設計ワークにできる。",
      practiceTomorrow: "自分の読者が『人に言えずにいること』を5個書く。",
      knowledgeTags: "ターゲット理解, 読者理解, 感情, ペルソナ, 発信, 信頼構築",
    },
    {
      ...common,
      knowledgeName: "接点は、商品価値と相手の悩み・願望が重なる翻訳地点",
      oneLineConclusion: "接点を1行にすると、見出し、VSL冒頭、募集文、固定投稿に展開できる。",
      knowledgeOverview: "接点は商品の特徴そのものではなく、商品価値、相手の悩み、相手の願望が重なる場所。接点を1文に圧縮し、相手、変化、方法を加えると、見出しや募集文、固定投稿、VSL冒頭に横展開できる。",
      todayAction: "商品価値1つと相手の悩み1つを選び、『○○な人でも△△できる』の1文にする。",
      useScene: "記事タイトル、X投稿、Substack固定導線、募集文、VSL冒頭、LP見出し、Podcastタイトルに使う。",
      beginnerExplanation: "商品の良さをそのまま言うのではなく、相手が『それ私のことだ』と思える言葉に変えること。",
      articleIdeas: "接点を見つけるとタイトルが決まる / 売れる募集文は接点の順番で作る",
      podcastIdeas: "相手が自分のことだと思う言葉 / 接点からVSL冒頭を作る",
      aiUseSimple: "AIに接点の1文を、見出し、VSL冒頭、募集文、固定投稿、X投稿に展開させる。",
      tagsSimple: "接点, 見出し, VSL, 募集文, 固定投稿",
      summary3Lines: "接点は商品価値と相手の悩み、願望が重なる翻訳地点。接点がずれると、反応はあっても申込につながらない。接点を1行にしてから、媒体ごとの温度に合わせて見出し、冒頭、募集文、固定投稿へ変換する。",
      coreIdea: "接点を見つけ、相手の言葉に翻訳してから文章にする。",
      top10: "商品価値 / 相手の悩み / 相手の願望 / 翻訳地点 / 1行化 / 見出し / 問題提起 / 誤解の指摘 / 新しい視点 / 媒体ごとの温度",
      publishingUse: "1つの接点から複数媒体へ展開し、段階的に信頼を積む。",
      useSubstack: "接点を有料導線の見出し、記事冒頭、固定案内に分けて使う。",
      useNote: "接点を記事タイトルと冒頭の問題提起に入れる。",
      usePodcast: "接点を回タイトルと冒頭の問いにする。",
      useLive: "ライブ告知を『問題提起、誤解、新視点』で作る。",
      useNotes: "接点1行を投稿し、反応がある表現を固定投稿に育てる。",
      useX: "接点を『まだ○○で止まってる？』型に変換する。",
      useAi: "AIに接点が売る側の言葉になっていないか、痛みが浅くないかを点検させる。",
      contentIdeas: "接点1行メーカー、VSL冒頭テンプレート、募集文3ブロックテンプレート、固定投稿6ステップ講座にできる。",
      practiceTomorrow: "接点1行を1つ作り、それを記事見出し、X投稿、募集文冒頭に変換する。",
      knowledgeTags: "接点, 見出し, VSL, 募集文, 固定投稿, マーケティング, Substack",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addCopyTargetKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(COPY_TARGET_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("売れる文章は書き方ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "接点";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "売れる文章は接点で決まる実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...copyTargetKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "接点";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "売れる文章は接点で決まる実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function trustCharismaKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: TRUST_CHARISMA_SAMPLE_TITLE,
    author: "",
    genre: "信頼設計 / ブランディング / 発信設計 / 影響力 / 導線設計",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "信頼で選ばれる影響力は、才能ではなく一貫した構造で作る",
      oneLineConclusion: "カリスマは演じるものではなく、世界観・基準・実績を一貫運用して育てるもの。",
      knowledgeOverview: "信頼される発信は、単発のバズや盛った演出では作れない。何者かが分かる肩書き、救う相手、否定する価値観、提示する基準、実績、行動導線が一貫していると、読者の中に信頼が積み上がる。",
      todayAction: "自分の発信について『誰を救うか』『何を否定するか』『どんな基準を示すか』を1行ずつ書く。",
      useScene: "SubstackのAbout、Xプロフィール、固定投稿、講座コンセプト、Podcast番組設計、ライブ冒頭に使う。",
      beginnerExplanation: "信頼される人は、毎回違うことを言うのではなく『この人はこういう基準で考える人』と分かる発信を続けている。",
      articleIdeas: "カリスマは才能ではなく信頼の構造 / バズより大事な一貫性の作り方",
      podcastIdeas: "演じない影響力の作り方 / 信頼が積み上がる発信とは",
      aiUseSimple: "AIに自分の投稿やプロフィールを渡し、肩書き・世界観・基準・導線の一貫性をチェックさせる。",
      tagsSimple: "信頼構築, カリスマ設計, ブランディング, 発信設計, 一貫性",
      summary3Lines: "影響力は生まれつきの資質ではなく設計できる。単発の拡散より、読者の判断基準を書き換える一貫した言葉が信頼を作る。肩書き、世界観、象徴ワード、物語、導線、実績をつなげると発信が資産化する。",
      coreIdea: "信頼は単発投稿ではなく、一貫した構造の反復で積み上がる。",
      top10: "肩書き設計 / 世界観設計 / 象徴ワード / 物語設計 / 固定導線 / シリーズ化 / 実績設計 / 行動導線 / 一貫性 / 信頼資産",
      publishingUse: "発信を反応取りではなく、読者の中に判断基準を残す連続体として設計する。",
      useSubstack: "Aboutと固定記事を、誰の何を解決するかと自分の基準が分かる構成にする。",
      useNote: "自己紹介記事ではなく、信頼の土台になる世界観記事を書く。",
      usePodcast: "番組の冒頭に毎回同じ判断基準や象徴ワードを入れる。",
      useLive: "ライブ冒頭で、今日はどんな基準を持ち帰れるかを伝える。",
      useNotes: "自分の基準を短く断定する投稿を出す。",
      useX: "肩書き、基準、象徴ワードを固定ポストに反映する。",
      useAi: "AIに過去投稿からブレている主張、強い基準、頻出ワードを抽出させる。",
      contentIdeas: "信頼設計チェックリスト、発信世界観ワーク、プロフィール添削、固定導線講座にできる。",
      practiceTomorrow: "肩書き3案を作り、誰向けか・何をする人か・個性があるかで見直す。",
      knowledgeTags: "信頼構築, カリスマ設計, ブランディング, 発信設計, 一貫性, Substack",
    },
    {
      ...common,
      knowledgeName: "肩書きと世界観は、救う相手・否定する価値観・提示する基準で作る",
      oneLineConclusion: "何者かを一言で示し、誰の味方で何に反対する人かを明確にする。",
      knowledgeOverview: "抽象的な肩書きや自分語りでは、誰の役に立つ人か伝わらない。対象、手段、問題、解決、世界観、実務を組み合わせ、救う相手、否定する価値観、提示する基準を決めることで、発信の入口が明確になる。",
      todayAction: "プロフィールを『対象×手段』『問題×解決』『世界観×実務』の3パターンで書く。",
      useScene: "SNS肩書き、Substack説明文、講座名、相談メニュー、プロフィール、登壇者紹介に使う。",
      beginnerExplanation: "肩書きはかっこよさより、『誰の何を助ける人か』がすぐ分かることが大事。",
      articleIdeas: "肩書きが伝わらない人は対象が曖昧 / 世界観は救う相手と否定する価値観で決まる",
      podcastIdeas: "何者かが伝わる肩書き設計 / 救う相手を決める勇気",
      aiUseSimple: "AIに活動内容を渡し、対象×手段、問題×解決、世界観×実務の肩書き案を出させる。",
      tagsSimple: "肩書き設計, 世界観, プロフィール, ブランディング, 発信",
      summary3Lines: "肩書きは認知の入口であり、世界観は信頼の土台。誰向けか、何をする人か、少しの違和感や個性が必要。救う相手、否定する価値観、提示する基準が決まると、発信の軸がぶれにくくなる。",
      coreIdea: "肩書きは肩書きではなく、信頼の入口である。",
      top10: "誰向けか / 何をする人か / 違和感 / 対象×手段 / 問題×解決 / 世界観×実務 / 救う相手 / 否定する価値観 / 提示する基準 / 認知固定",
      publishingUse: "プロフィールや固定投稿の先頭を、活動説明ではなく読者が判断できる肩書きにする。",
      useSubstack: "Aboutの冒頭に、救う相手と提示する基準を置く。",
      useNote: "プロフィール記事で、自分が否定する価値観と新しい基準を書く。",
      usePodcast: "番組説明に、誰のどんな停滞を解決する番組かを入れる。",
      useLive: "ライブタイトルを対象と問題が分かる形にする。",
      useNotes: "肩書き3案を投稿して反応を見る。",
      useX: "プロフィール欄を対象×手段の短い肩書きにする。",
      useAi: "AIに肩書き案を比較させ、抽象度・依頼しやすさ・独自性を評価させる。",
      contentIdeas: "肩書き3案ワーク、世界観設計シート、プロフィール改善テンプレートにできる。",
      practiceTomorrow: "救う相手、否定する価値観、提示する基準を各1行で書く。",
      knowledgeTags: "肩書き設計, 世界観, プロフィール, ブランディング, 発信, 信頼構築",
    },
    {
      ...common,
      knowledgeName: "象徴ワードと発信ルールが、一貫性と記憶を作る",
      oneLineConclusion: "読者は文章全体ではなく、繰り返される単語と判断基準で覚える。",
      knowledgeOverview: "発信者は文章全体よりも単語で記憶される。象徴ワードを10個以内に固定し、曖昧な禁句を避け、物語、判断基準、実例、募集の比率を決めることで『この人らしさ』が蓄積される。",
      todayAction: "自分の象徴ワード10個と、使わない禁句5個を決める。",
      useScene: "X投稿、Notes、Substack連載、Podcastタイトル、ライブテーマ、講座名に使う。",
      beginnerExplanation: "毎回違う言葉を使うより、自分らしい言葉を繰り返すと覚えてもらいやすい。",
      articleIdeas: "発信者は単語で記憶される / 一貫性を作る象徴ワードの決め方",
      podcastIdeas: "言葉のルールがブランドになる / 使わない言葉を決める意味",
      aiUseSimple: "AIに過去投稿を分析させ、象徴ワード候補と曖昧な禁句を抽出させる。",
      tagsSimple: "象徴ワード, 一貫性, 発信ルール, シリーズ化, ブランディング",
      summary3Lines: "記憶は単語で残る。象徴ワードを繰り返し、曖昧な言葉を避け、発信の終わり方や比率を決めると、読者の中に一貫した印象が残る。単発投稿ではなくシリーズ化すると、次も読みたい期待が生まれる。",
      coreIdea: "一貫性は気分ではなく、言葉の運用ルールで作る。",
      top10: "象徴ワード / 禁句リスト / 判断基準 / 物語30% / 判断基準30% / 実例実績20% / 募集行動20% / シリーズ化 / 共通冒頭 / 共通結び",
      publishingUse: "毎回の投稿に、自分らしい象徴ワードと具体的な行動を入れる。",
      useSubstack: "連載名と冒頭の型を固定し、象徴ワードを継続して使う。",
      useNote: "記事カテゴリを象徴ワードで整理する。",
      usePodcast: "シリーズ名を固定し、判断基準回を作る。",
      useLive: "毎回同じ締め方や宿題を用意する。",
      useNotes: "象徴ワードを使った短文投稿を継続する。",
      useX: "失敗例シリーズ、判断基準シリーズ、誤解を壊すシリーズを回す。",
      useAi: "AIに投稿案へ象徴ワードと行動導線が入っているか確認させる。",
      contentIdeas: "象徴ワード辞書、発信ルール表、シリーズ投稿テンプレート、判断基準投稿講座にできる。",
      practiceTomorrow: "今週使う象徴ワードを3つ選び、投稿案を3本作る。",
      knowledgeTags: "象徴ワード, 一貫性, シリーズ化, 発信設計, ブランディング, コンテンツ化",
    },
    {
      ...common,
      knowledgeName: "実績と行動導線は、作為感を消して小さな参加から始める",
      oneLineConclusion: "信頼は結果自慢ではなく、数字・提出物・変化・第三者反応・途中経過で増える。",
      knowledgeOverview: "影響力設計の敵は作っている感。自慢に見える実績ではなく、数字、提出物、Before/After、第三者反応、途中経過を見せると信用が増える。行動導線は、投稿、固定記事、軽い参加、本命導線の順に設計する。",
      todayAction: "見せられる途中経過、提出物、第三者反応を1つ選び、投稿用メモにする。",
      useScene: "実績投稿、固定記事、無料配布、DM相談、講座募集、ライブ後の導線設計に使う。",
      beginnerExplanation: "すごい結果だけを見せるより、途中で何を直したか、相手がどう変わったかを見せる方が信頼されやすい。",
      articleIdeas: "実績投稿が胡散臭く見える理由 / 信頼される途中経過の見せ方",
      podcastIdeas: "作ってる感を消す実績設計 / いきなり売らず小さく参加してもらう",
      aiUseSimple: "AIに実績メモを渡し、自慢ではなく貢献・変化・過程が伝わる投稿に直させる。",
      tagsSimple: "実績設計, 行動導線, 信頼構築, ファネル, リスク管理",
      summary3Lines: "強い実績は、数字、提出物、変化、第三者反応、途中経過で構成される。過度な演出や断言は信頼を失いやすい。投稿から固定記事、軽い参加、本命導線へ進めると、影響力を行動に変えやすくなる。",
      coreIdea: "信頼は結果だけでなく、過程と条件を見せることで育つ。",
      top10: "数字 / 提出物 / BeforeAfter / 第三者反応 / 途中経過 / 失敗と修正 / 断言＋条件 / 対象外明記 / 軽い参加導線 / 1秒でできる行動",
      publishingUse: "実績投稿を結果自慢ではなく、変化と修正プロセスの共有にする。",
      useSubstack: "固定記事に判断材料、実績、向いている人、次の行動を入れる。",
      useNote: "実績記事では結果だけでなく、途中経過と失敗修正を書く。",
      usePodcast: "実績の裏側や修正プロセスを話す。",
      useLive: "ライブ終わりに提出物、期限、提出先を明確にする。",
      useNotes: "途中経過や小さな提出物を投稿する。",
      useX: "Before/Afterと第三者反応を短く投稿する。",
      useAi: "AIに断言が強すぎないか、再現条件や対象外が書けているかチェックさせる。",
      contentIdeas: "実績投稿テンプレート、行動導線ファネル、無料配布導線、リスク管理チェックリストにできる。",
      practiceTomorrow: "投稿、固定記事、軽い参加、本命導線を1行ずつ書く。",
      knowledgeTags: "実績設計, 行動導線, 信頼構築, ファネル, リスク管理, マーケティング",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addTrustCharismaKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(TRUST_CHARISMA_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("信頼で選ばれる影響力は")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "信頼構築";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "信頼で選ばれるカリスマ設計実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...trustCharismaKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "信頼構築";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "信頼で選ばれるカリスマ設計実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function threeWeekFunnelKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: THREE_WEEK_FUNNEL_SAMPLE_TITLE,
    author: "",
    genre: "発信導線 / 集客 / CTA / マーケティング / コミュニティ",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "マーケティング", "信頼構築", "コミュニティ", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "参加者が集まらない原因は発信量不足ではなく導線設計不足",
      oneLineConclusion: "反応で終わる発信を、入口・途中・出口で参加につなぎ直す。",
      knowledgeOverview: "価値提供ができていて反応もあるのに参加につながらない場合、問題は中身ではなく導線にある。入口、途中、出口がつながっていないと読者は迷子になる。今ある発信を捨てず、正しい順番に配置し直すことが重要。",
      todayAction: "今の導線を『投稿→固定投稿→プロフィール→相談→参加』の1本線で書き出し、止まっている箇所を1つ選ぶ。",
      useScene: "Substack購読導線、講座募集、ライブ参加、Podcast相談導線、X固定投稿、Notesからの申込導線に使う。",
      beginnerExplanation: "もっと投稿する前に、読んだ人が次にどこへ行けばいいか分かるようにすること。",
      articleIdeas: "参加者が集まらない原因は発信量ではない / 入口・途中・出口で発信をつなぐ",
      podcastIdeas: "反応で終わる発信を参加につなげる / 導線設計不足の見つけ方",
      aiUseSimple: "AIに自分のプロフィール、固定投稿、募集文を渡し、入口・途中・出口の抜けを診断させる。",
      tagsSimple: "発信導線, 集客, 参加者募集, CTA, マーケティング",
      summary3Lines: "良いコンテンツを出していても、導線が切れていると参加にはつながらない。読者は入口、途中、出口が見えないと迷子になる。発信量を増やす前に、今ある投稿、固定投稿、プロフィール、相談導線をつなぎ直す。",
      coreIdea: "発信は反応を取るだけでなく、次の行動へ案内する導線である。",
      top10: "入口 / 途中 / 出口 / 反応止まり / 記事末CTA / 固定投稿 / プロフィール / 相談導線 / 参加申込 / 導線設計",
      publishingUse: "投稿ごとに、読者が次に何をすればいいかを明確にする。",
      useSubstack: "記事末に固定記事や無料配布への導線を置き、購読や参加へつなぐ。",
      useNote: "記事の最後に次に読む記事、受け取るもの、相談先を1つ置く。",
      usePodcast: "概要欄に次の一手を1つだけ書く。",
      useLive: "ライブ終わりに参加導線を短く案内する。",
      useNotes: "短文投稿から固定投稿や募集ページへ自然につなぐ。",
      useX: "投稿末にプロフィール遷移や固定投稿への一言CTAを入れる。",
      useAi: "AIに導線マップを作らせ、読者が迷う箇所を洗い出す。",
      contentIdeas: "発信導線診断シート、3週間導線改善チャレンジ、CTA添削、Substack導線設計講座にできる。",
      practiceTomorrow: "固定投稿の叩き台とCTA3本の初稿を60%で作る。",
      knowledgeTags: "発信導線, 集客, 参加者募集, CTA, マーケティング, Substack",
    },
    {
      ...common,
      knowledgeName: "改善指標はいいねやインプレッションではなく、遷移と参加数を見る",
      oneLineConclusion: "全部直すのではなく、数字が落ちている1箇所だけ直す。",
      knowledgeOverview: "いいねやインプレッションは見栄えの指標になりやすい。本当に見るべきは、プロフィール遷移率、固定投稿からCTAへの反応、相談や説明会の件数、参加・成約数。数字を見て詰まりを1箇所に絞ると改善しやすい。",
      todayAction: "直近の投稿から、プロフ遷移、固定投稿反応、相談数、参加数のどこが弱いか1つ選ぶ。",
      useScene: "X分析、Substack導線改善、note記事改善、Podcast概要欄、ライブ募集、講座販売に使う。",
      beginnerExplanation: "たくさん見られたかより、見た人が次の場所に進んだかを見ること。",
      articleIdeas: "いいねより見るべき発信KPI / 集客導線は1箇所ずつ直す",
      podcastIdeas: "数字で見る発信導線 / なんとなく全部頑張るをやめる",
      aiUseSimple: "AIに数値を渡し、どこで落ちているかと次に直す1箇所を提案させる。",
      tagsSimple: "KPI, 導線改善, プロフ遷移, CTA反応, 成約",
      summary3Lines: "発信改善では、いいねやインプレッションだけを追わない。プロフィール遷移、固定投稿反応、相談数、参加数を見る。全部いじらず、最も落ちている1箇所だけを直すと改善の焦点が合う。",
      coreIdea: "反応ではなく遷移を見る。",
      top10: "いいね / インプレッション / プロフ遷移率 / 固定CTA反応 / 相談説明会 / 参加成約数 / 詰まり / 1箇所改善 / 数字 / 検証",
      publishingUse: "投稿を出した後、反応数ではなく次の導線に進んだ人数を確認する。",
      useSubstack: "記事末リンクのクリック、返信、登録を観察する。",
      useNote: "記事からプロフィールや募集ページに移動したかを見る。",
      usePodcast: "概要欄リンクやDM数を確認する。",
      useLive: "ライブ後のアンケート、DM、申込数を記録する。",
      useNotes: "短文投稿から固定投稿へ移動するかテストする。",
      useX: "プロフ遷移率と固定投稿反応を見てCTAを調整する。",
      useAi: "AIに改善ログを読み込ませ、次の実験案を作らせる。",
      contentIdeas: "発信KPI管理表、導線改善ログ、3週間検証シート、Xプロフ遷移改善講座にできる。",
      practiceTomorrow: "1つの投稿にCTAを入れ、プロフ遷移やクリックを記録する。",
      knowledgeTags: "KPI, 導線改善, 検証, マーケティング, 発信, 集客",
    },
    {
      ...common,
      knowledgeName: "発信は共感・信頼構築・判断基準・募集の4種類をそろえる",
      oneLineConclusion: "共感だけでは参加しない。判断材料と行動要請まで揃えて人は動く。",
      knowledgeOverview: "参加につながる発信には、悩みを代弁する共感、選び方や比較軸を示す信頼構築、Before/Afterや証拠を見せる事例、条件・手順・期限を示す募集が必要。どれかに偏ると、読まれても動かれにくい。",
      todayAction: "今週の投稿を、共感、判断基準、事例、募集の4枠に分けて1本ずつ企画する。",
      useScene: "Substack連載、X投稿設計、note記事、Podcastテーマ、ライブ配信、講座募集に使う。",
      beginnerExplanation: "読者に『分かる』と思ってもらうだけでなく、『この人に頼む理由』と『今何をするか』まで出すこと。",
      articleIdeas: "共感だけでは人は動かない / 参加につながる4種類の発信",
      podcastIdeas: "発信が反応止まりになる理由 / 共感から募集までの流れ",
      aiUseSimple: "AIにテーマを渡し、共感投稿、判断基準投稿、事例投稿、募集投稿へ展開させる。",
      tagsSimple: "発信設計, 共感, 信頼構築, 判断基準, 募集",
      summary3Lines: "発信には役割がある。共感は悩みの代弁、信頼構築は選び方、事例は可能性、募集は行動要請を担う。4種類を揃えると、読者は納得して次の行動へ進みやすくなる。",
      coreIdea: "発信は役割別に配置すると導線になる。",
      top10: "共感 / 悩みの言語化 / 信頼構築 / 判断基準 / 専門性 / 事例 / 証拠 / 募集 / 条件 / 期限",
      publishingUse: "単発投稿ではなく、読者の心理を進める順番でコンテンツを並べる。",
      useSubstack: "連載を共感回、判断基準回、事例回、募集回に分ける。",
      useNote: "ノウハウ記事の後に事例記事と募集記事を置く。",
      usePodcast: "悩み代弁回、選び方回、事例回、募集案内回を作る。",
      useLive: "ライブ内で共感、判断基準、事例、行動案内を順番に話す。",
      useNotes: "4種類の短文投稿を1週間で回す。",
      useX: "共感投稿だけで終わらせず、事例と募集も混ぜる。",
      useAi: "AIに投稿カレンダーを作らせ、4種類の偏りを確認させる。",
      contentIdeas: "4種類発信カレンダー、募集前7日投稿テンプレート、Substack連載設計表にできる。",
      practiceTomorrow: "共感投稿1本と判断基準投稿1本を作る。",
      knowledgeTags: "発信設計, 共感, 信頼構築, 判断基準, 募集, コンテンツ化",
    },
    {
      ...common,
      knowledgeName: "CTAは提出物・期限・提出先の3点セットで迷いを消す",
      oneLineConclusion: "人は面倒くさいと離脱する。何を、いつまでに、どこへ出すかを1つに絞る。",
      knowledgeOverview: "記事末CTAは、何を出すか、いつまでか、どこに出すかを明確にする。30秒でできる低いハードル、48〜72時間の限定性、リンク1本への集約があると、読者は迷わず行動しやすい。",
      todayAction: "次の投稿末に『提出物・期限・提出先』が入ったCTAを1つ作る。",
      useScene: "記事末、X投稿、ライブ終わり、Podcast概要欄、無料配布、説明会案内、コミュニティ募集に使う。",
      beginnerExplanation: "『興味があればどうぞ』ではなく、『これを、いつまでに、ここへ送ってください』まで書くこと。",
      articleIdeas: "CTAが弱いと読者は動かない / 30秒で動ける行動要請の作り方",
      podcastIdeas: "迷いを消すCTA3点セット / 参加ハードルを下げる方法",
      aiUseSimple: "AIに投稿内容を渡し、提出物、期限、提出先が明確なCTAを3案作らせる。",
      tagsSimple: "CTA, 行動要請, 参加導線, 募集, コミュニティ",
      summary3Lines: "読者は小さな迷いで離脱する。CTAには提出物、期限、提出先の3点が必要。置換、最小検証、捨てる宣言など、30秒でできる小さな行動から始めると参加のハードルが下がる。",
      coreIdea: "CTAはお願いではなく、迷いを消す設計である。",
      top10: "提出物 / 期限 / 提出先 / 30秒 / 48〜72時間 / リンク1本 / 置換 / 最小検証 / 捨てる宣言 / 軽い参加",
      publishingUse: "全ての投稿に重い申込ではなく、小さな参加導線を置く。",
      useSubstack: "記事末に返信、無料配布、アンケートなどの小さな行動を1つ置く。",
      useNote: "記事末に提出先つきのワークを入れる。",
      usePodcast: "概要欄に期限つきの一言アクションを書く。",
      useLive: "ライブ終わりに提出物、期限、提出先を口頭と固定コメントで出す。",
      useNotes: "スタンプや一言返信で参加できるCTAにする。",
      useX: "『参加希望とリプ』『固定投稿を引用』など1アクションに絞る。",
      useAi: "AIにCTAのハードルが高すぎないか、迷う点がないかチェックさせる。",
      contentIdeas: "CTA3点セットテンプレート、参加導線ミニ講座、ライブ締め台本、無料配布CTA集にできる。",
      practiceTomorrow: "置換、最小検証、捨てる宣言のCTAを1本ずつ作る。",
      knowledgeTags: "CTA, 行動要請, 参加導線, 募集, コミュニティ, マーケティング",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addThreeWeekFunnelKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(THREE_WEEK_FUNNEL_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("参加者が集まらない原因は")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "発信導線";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "3週間で参加者を集める発信導線実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...threeWeekFunnelKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "発信導線";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "3週間で参加者を集める発信導線実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function snsTrustAssetKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: SNS_TRUST_ASSET_SAMPLE_TITLE,
    author: "",
    genre: "SNS資産化 / 信頼導線 / 発信設計 / ブランディング / コンテンツ再編集",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["発信", "ブランディング", "マーケティング", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "SNS投稿は流れて消える情報ではなく、本の代わりになる信頼資産にできる",
      oneLineConclusion: "発信は量より、後から読まれる形に束ねることで信頼になる。",
      knowledgeOverview: "本が担っていた信頼、権威、体系性、前提理解、紹介材料の役割は、SNSの蓄積でも一部代替できる。ただし単発投稿のままでは弱い。一貫性、判断基準、蓄積、導線、再編集性を持たせることで、投稿は流れる情報から読まれる資産へ変わる。",
      todayAction: "過去投稿を見返し、後から読ませたい投稿を10本だけ選んでテーマ別に並べる。",
      useScene: "Xの固定投稿、Substackのまとめ記事、noteマガジン、Podcast概要欄、ライブ後の案内、講座前の信頼形成に使う。",
      beginnerExplanation: "毎日投稿して終わりではなく、良い投稿をあとから読める棚に並べ直すこと。",
      articleIdeas: "SNSは本の代わりになるのか / 流れる投稿を読まれる資産に変える方法",
      podcastIdeas: "本がなくても信頼される発信設計 / 投稿を資産化する5つの条件",
      aiUseSimple: "AIに過去投稿を渡し、テーマ、一貫性、判断基準、導線の有無で分類させる。",
      tagsSimple: "SNS資産, 信頼構築, 発信, ブランディング, コンテンツ再編集",
      summary3Lines: "SNS投稿は単発で流すだけでは信頼になりにくい。本の役割は、信頼、権威、体系性、前提理解、紹介材料にある。投稿を束ね、基準と導線を持たせると、本の代わりになる信頼資産へ変わる。",
      coreIdea: "発信する視点から、資産化する視点へ切り替える。",
      top10: "一貫性 / 判断基準 / 蓄積 / 導線 / 再編集性 / 信頼 / 権威 / 体系性 / 紹介材料 / 読まれる資産",
      publishingUse: "反応の良かった投稿をテーマ別に束ね、次に読む記事や相談導線へつなげる。",
      useSubstack: "代表記事を目次化し、初めて来た読者が一気読みできる入口を作る。",
      useNote: "テーマ別マガジンを作り、SNS投稿を長文記事へ再編集する。",
      usePodcast: "過去配信をテーマ別プレイリスト化し、概要欄に関連回を置く。",
      useLive: "ライブ後に話した内容をまとめ投稿、記事、チェックリストへ変換する。",
      useNotes: "短文の気づきを蓄積し、反応があるものを記事化候補にする。",
      useX: "固定投稿に代表コンテンツ、判断基準、次の導線をまとめる。",
      useAi: "AIに投稿群を章立てさせ、記事、PDF、講座の下書きに変換する。",
      contentIdeas: "SNS資産化チェックリスト、固定投稿テンプレート、信頼導線診断、投稿の再編集講座にできる。",
      practiceTomorrow: "『後から読まれる投稿10本』を選び、1つのまとめ記事タイトルを付ける。",
      knowledgeTags: "SNS資産, 信頼構築, 発信, ブランディング, コンテンツ再編集, Substack",
    },
    {
      ...common,
      knowledgeName: "プロフィールは本の帯、固定投稿は目次と序章として設計する",
      oneLineConclusion: "初見の読者が数秒で『この人は自分に必要』と分かる入口を作る。",
      knowledgeOverview: "SNSのプロフィールは何者かを伝える本の帯、固定投稿は世界観と導線を伝える目次と序章の役割を持つ。肩書、対象、提供価値、判断基準、代表実例、まとめ導線、軽いCTAを置くと、初見の読者が信頼しやすくなる。",
      todayAction: "プロフィールに『誰の、何を、どう変えるか』と判断基準の一文を入れる。",
      useScene: "Xプロフィール、Substack About、noteプロフィール、Podcast番組説明、ライブ配信の冒頭説明に使う。",
      beginnerExplanation: "初めて見た人に、何の専門家で、自分に何をしてくれる人かをすぐ伝えること。",
      articleIdeas: "プロフィールは本の帯である / 固定投稿に入れるべき6項目",
      podcastIdeas: "初見で信頼されるプロフィール設計 / 固定投稿を目次にする",
      aiUseSimple: "AIに現プロフィールを渡し、肩書、対象、価値、判断基準、導線が入っているか添削させる。",
      tagsSimple: "プロフィール, 固定投稿, 信頼導線, ブランディング, 自己紹介",
      summary3Lines: "SNSの入口はプロフィールと固定投稿で決まる。プロフィールは本の帯、固定投稿は目次と序章の役割を持つ。何者か、誰をどう変えるか、判断基準、実例、まとめ導線、CTAを置くと信頼されやすい。",
      coreIdea: "入口設計が整うと、投稿の信頼蓄積が見つけてもらいやすくなる。",
      top10: "プロフィール / 固定投稿 / 本の帯 / 目次 / 序章 / 肩書 / 対象 / 判断基準 / 実例 / CTA",
      publishingUse: "すべての発信媒体のプロフィールを、読者が次に進める入口として整える。",
      useSubstack: "Aboutページに代表記事、対象読者、約束する変化、購読導線を置く。",
      useNote: "プロフィールと固定記事にテーマ別まとめへのリンクを入れる。",
      usePodcast: "番組説明に誰向けか、得られる変化、関連リンクを入れる。",
      useLive: "冒頭30秒で何者か、誰向けか、今日の価値を伝える。",
      useNotes: "プロフィールに短い判断基準と主要リンクを置く。",
      useX: "固定投稿を『何者か、価値、基準、実例、まとめ、CTA』で作る。",
      useAi: "AIに媒体別プロフィールを同じ軸で整えさせ、表現だけ媒体ごとに変える。",
      contentIdeas: "プロフィール改善テンプレート、固定投稿骨格、Substack About添削企画、自己紹介導線講座にできる。",
      practiceTomorrow: "固定投稿の骨格を6項目で作り、既存リンクを3つだけ並べる。",
      knowledgeTags: "プロフィール, 固定投稿, 信頼導線, ブランディング, 自己紹介, X",
    },
    {
      ...common,
      knowledgeName: "投稿は共感・判断基準・実例・行動の4種類に分けて信頼を積み上げる",
      oneLineConclusion: "1投稿で全部伝えず、役割を分けると読者の認識が進む。",
      knowledgeOverview: "SNS投稿には、読者の悩みに寄り添う共感、良し悪しを示す判断基準、再現性を示す実例、次の行動へ進ませる行動投稿がある。1投稿1メッセージで役割を分けると、詳しい人から選ばれる人へ認識が変わる。",
      todayAction: "次の7日分を、共感2本、判断基準2本、実例2本、行動1本に振り分ける。",
      useScene: "X投稿カレンダー、Substack連載、note記事、Podcast台本、ライブ構成、募集前の発信設計に使う。",
      beginnerExplanation: "毎回ノウハウだけ出すのではなく、気持ち、考え方、証拠、行動案内を分けて出すこと。",
      articleIdeas: "信頼を生む4種類の投稿 / 1投稿1メッセージで発信が伝わる理由",
      podcastIdeas: "詳しい人から選ばれる人へ変わる投稿設計 / 共感と判断基準の使い分け",
      aiUseSimple: "AIに1テーマを渡し、共感、判断基準、実例、行動の4投稿へ展開させる。",
      tagsSimple: "投稿設計, 共感, 判断基準, 実例, 行動",
      summary3Lines: "信頼は知識提供だけでは積み上がらない。共感、判断基準、実例、行動の4種類の投稿を意図的に使い分ける。1投稿1メッセージにすると、読者は理解しやすく次の行動へ進みやすい。",
      coreIdea: "投稿は情報ではなく、読者の認識を進める役割を持つ。",
      top10: "共感 / 判断基準 / 実例 / 行動 / 1投稿1メッセージ / 思想 / 実績 / 事例 / 認識変化 / 信頼",
      publishingUse: "媒体ごとに4種類の投稿を回し、反応だけでなく信頼と行動を設計する。",
      useSubstack: "週1記事を判断基準、短い補足を共感や実例として出す。",
      useNote: "事例記事と考え方記事を分け、読者が比較しやすくする。",
      usePodcast: "悩み代弁回、判断基準回、事例回、行動案内回を作る。",
      useLive: "配信内で共感、判断基準、実例、行動の順に話す。",
      useNotes: "共感と行動の短文投稿を軽く出す。",
      useX: "4種類の投稿を1週間で回し、固定投稿へ集約する。",
      useAi: "AIに投稿カレンダーを作らせ、共感だけに偏っていないか確認する。",
      contentIdeas: "4種類投稿カレンダー、1投稿1メッセージ練習帳、判断基準投稿テンプレートにできる。",
      practiceTomorrow: "同じテーマで、共感投稿と判断基準投稿を1本ずつ作る。",
      knowledgeTags: "投稿設計, 共感, 判断基準, 実例, 行動, 信頼構築",
    },
    {
      ...common,
      knowledgeName: "SNS資産はシリーズ化・まとめ記事化・実践書化・配布資料化で価値が跳ねる",
      oneLineConclusion: "良い投稿は出して終わりではなく、形を変えるほど強い資産になる。",
      knowledgeOverview: "反応のあった投稿は、関連投稿をつないでシリーズ化し、まとめ記事にして、実践書やPDF、配布資料へ再編集できる。集める、束ねる、名付けるだけで同じ情報の価値と権威性が上がり、無料入口や講座導線にもつながる。",
      todayAction: "反応が良かった投稿を3本選び、1つの連載タイトルにまとめる。",
      useScene: "Substack連載、noteマガジン、Podcastシリーズ、ライブ企画、無料PDF、Kindle、Brain、講座資料に使う。",
      beginnerExplanation: "よく読まれた投稿を集めて名前をつけると、記事やPDFや講座の材料になるということ。",
      articleIdeas: "SNS投稿をPDFに変える再編集術 / 反応の取れた投稿を講座にする方法",
      podcastIdeas: "再編集で発信の価値が跳ねる / 投稿を実践書に育てる",
      aiUseSimple: "AIに反応の良かった投稿を渡し、シリーズ名、目次、まとめ記事、PDF構成を作らせる。",
      tagsSimple: "再編集, コンテンツ化, PDF化, シリーズ化, 講座化",
      summary3Lines: "SNS投稿は再編集すると価値が上がる。シリーズ化、まとめ記事化、実践書化、配布資料化の順に資産度が増す。反応のある投稿を集め、束ね、名付けることで、無料入口や講座導線に転用できる。",
      coreIdea: "コンテンツの価値は、情報そのものだけでなく編集のされ方で上がる。",
      top10: "シリーズ化 / まとめ記事化 / 実践書化 / 配布資料化 / 再編集 / 名付け / 体系化 / PDF / 無料入口 / 講座化",
      publishingUse: "投稿を素材として扱い、媒体をまたいで再編集して資産化する。",
      useSubstack: "連載記事をPDF特典や有料記事の骨格にする。",
      useNote: "マガジン化して、反応のあるテーマをBrainやKindleへ展開する。",
      usePodcast: "シリーズ配信を文字起こしし、記事や講座台本へ変える。",
      useLive: "ライブ内容をチェックリストやワークシートに変換する。",
      useNotes: "短文メモを連載の種として保存する。",
      useX: "スレッドや固定投稿からまとめ記事へ誘導する。",
      useAi: "AIに投稿群を読み込ませ、目次、PDF、講座、メルマガの構成へ変換する。",
      contentIdeas: "SNS資産化7日ロードマップ、投稿再編集テンプレート、無料PDF、Kindle、Brain、講座にできる。",
      practiceTomorrow: "『シリーズ化できる投稿』を3本選び、まとめ記事の見出しを5つ作る。",
      knowledgeTags: "再編集, コンテンツ化, PDF化, シリーズ化, 講座化, AI活用",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addSnsTrustAssetKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(SNS_TRUST_ASSET_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("SNS投稿は流れて消える情報ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "SNS資産";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "SNS資産を本の代わりにする信頼導線実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...snsTrustAssetKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "SNS資産";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "SNS資産を本の代わりにする信頼導線実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function sellingCopywritingKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: SELLING_COPYWRITING_SAMPLE_TITLE,
    author: "",
    genre: "コピーライティング / 商品ページ設計 / 海外販売 / SEO / 信頼構築",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "4",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["コピーライティング", "マーケティング", "信頼構築", "商品設計", "AI活用"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "売れるコピーはうまい文章ではなく、買う理由を順番に並べたもの",
      oneLineConclusion: "文章力より、検索されて読まれ、安心して買える順番が大事。",
      knowledgeOverview: "海外販売の商品ページで売れるコピーは、きれいな文章ではない。検索されるキーワード、読まれる導入、不安を消す説明、購入に進む安心感を順番に配置することが重要。自己満足の説明やスペック羅列ではなく、買い手が判断する順番に合わせてページを作る。",
      todayAction: "今ある販売ページやサービス案内を、検索語、導入、不安解消、安心材料の4つに分けて不足を1つ直す。",
      useScene: "商品ページ、サービス紹介、Substack有料案内、note販売記事、Brain販売ページ、講座募集ページに使う。",
      beginnerExplanation: "うまく書くより、読者が『探す、読む、不安が消える、買う』の順番で迷わないように書くこと。",
      articleIdeas: "売れるコピーは文章力ではなく順番で決まる / 買う理由を並べる商品ページ設計",
      podcastIdeas: "うまい文章では売れない理由 / コピーライティング初心者が最初に直すべき順番",
      aiUseSimple: "AIに販売ページを渡し、検索語、導入、不安解消、安心材料が足りているか診断させる。",
      tagsSimple: "コピーライティング, 商品ページ, 販売導線, SEO, 信頼構築",
      summary3Lines: "売れるコピーは美文ではない。買い手が検索し、読み、不安を消し、安心して購入できる順番がある。スペック羅列ではなく、買う理由を順番に配置することが本質。",
      coreIdea: "コピーは説得ではなく、購入判断の順番を整える設計である。",
      top10: "検索キーワード / 読まれる導入 / 不安を消す説明 / 安心感 / 商品ページ / スペック羅列 / 買う理由 / 順番 / 購入判断 / 信頼",
      publishingUse: "販売ページや有料記事の冒頭から末尾まで、読者の不安が消える順に並べ直す。",
      useSubstack: "有料購読や講座案内ページに、誰向けか、得られる価値、不安解消、申込後の流れを入れる。",
      useNote: "販売記事を『読まれる導入→価値→不安解消→購入後の安心』で再構成する。",
      usePodcast: "販売や告知回で、先に価値と不安解消を話してから案内する。",
      useLive: "ライブ告知で、参加前の不安と参加後の安心材料を言語化する。",
      useNotes: "短文で『買う理由』や『不安解消』を1つずつ出す。",
      useX: "販売投稿をスペックではなく、検索語、価値、安心材料の順で作る。",
      useAi: "AIに商品説明を買い手目線の順番へ並べ替えさせる。",
      contentIdeas: "売れるページ診断チェックリスト、商品ページ改善テンプレート、販売文の順番講座にできる。",
      practiceTomorrow: "1つの商品・サービス案内の冒頭3行を『何の商品か・状態・価値』が伝わる形に直す。",
      knowledgeTags: "コピーライティング, 商品ページ, 販売導線, SEO, 信頼構築, マーケティング",
    },
    {
      ...common,
      knowledgeName: "商品説明だけでは売れない。状態・配送・本物感・安心感まで判断材料にする",
      oneLineConclusion: "買い手は商品そのものだけでなく、届くまでの不安も見ている。",
      knowledgeOverview: "海外購入者は、商品スペックだけでなく、状態、傷や汚れ、動作確認、配送、追跡、梱包、本物感、信頼感を総合的に見て購入を判断する。商品説明で不安を放置すると離脱される。写真と文章で不安を先回りして消すことが必要。",
      todayAction: "自分の販売文や案内文に、読者が不安に思う点を5つ書き出し、それぞれに回答を追加する。",
      useScene: "中古品販売、海外販売、デジタル商品販売、講座案内、相談サービス、コミュニティ募集に使う。",
      beginnerExplanation: "欲しいと思っても『大丈夫かな』が残ると人は買わない。先に不安に答えること。",
      articleIdeas: "商品説明だけでは売れない理由 / 不安を消すコピーの作り方",
      podcastIdeas: "買う前の不安を先回りする / 安心感が売上を作る",
      aiUseSimple: "AIに商品やサービス内容を渡し、購入前の不安リストと回答文を作らせる。",
      tagsSimple: "不安解消, 信頼構築, 商品説明, 配送, 安心感",
      summary3Lines: "買い手は商品だけを見ていない。状態、配送、梱包、追跡、本物感、信頼感を見ている。売る側が不安を先回りして説明すると、安心して購入に進みやすい。",
      coreIdea: "売れる説明は、商品の魅力だけでなく不安の解除まで含む。",
      top10: "状態 / 傷 / 汚れ / 動作確認 / 配送 / 追跡番号 / 梱包 / 本物感 / 信頼感 / 不安解消",
      publishingUse: "商品やサービス紹介に、読者が躊躇する理由への回答を入れる。",
      useSubstack: "有料購読や講座案内に、対象外の人、解約、更新頻度、得られるものを明記する。",
      useNote: "購入前FAQや注意点を販売記事の中盤に入れる。",
      usePodcast: "よくある不安に答える回を作り、申込前の心理的ハードルを下げる。",
      useLive: "ライブ中に質問されやすい不安を先に回答する。",
      useNotes: "『申し込む前に不安なこと』に短文で答える投稿を作る。",
      useX: "安心材料を1投稿1テーマで出す。",
      useAi: "AIにFAQ、返品・対応方針、参加前の不安解消文を作らせる。",
      contentIdeas: "不安解消FAQテンプレート、販売ページ安心材料リスト、購入前チェックシートにできる。",
      practiceTomorrow: "販売文に『よくある不安と回答』を3つ追加する。",
      knowledgeTags: "不安解消, 信頼構築, 商品説明, FAQ, 販売導線, マーケティング",
    },
    {
      ...common,
      knowledgeName: "媒体ごとにコピーの優先順位を変える。eBayは検索、Shopeeは短さ、Etsyは物語",
      oneLineConclusion: "同じ商品でも、売り場が変われば響くコピーも変わる。",
      knowledgeOverview: "eBayは検索性とSEOが最優先で、ブランド、型番、状態、From Japanなど買い手が検索する語を入れる。Shopeeはスマホで一瞬で伝わる短文、価格、状態、配送安心感が重要。Etsyはストーリーや文化、一点物感、世界観で魅せる。媒体特性に合わせてコピーを出し分ける必要がある。",
      todayAction: "同じ商品やサービスを、検索型、短文型、ストーリー型の3パターンで書き分ける。",
      useScene: "eBay、Shopee、Etsy、X、note、Substack、Brain、Kindle説明文など媒体別コピーに使う。",
      beginnerExplanation: "同じ文章を全部の場所に貼るのではなく、その場所で読まれやすい形に変えること。",
      articleIdeas: "媒体別にコピーを変えるだけで伝わり方は変わる / eBay・Shopee・Etsyに学ぶ発信文の使い分け",
      podcastIdeas: "売り場によって言葉を変える / 検索型・短文型・物語型コピー",
      aiUseSimple: "AIに同じ情報を渡し、eBay向け、Shopee向け、Etsy向け、X向け、Substack向けに書き分けさせる。",
      tagsSimple: "媒体別コピー, SEO, 短文, ストーリー, 海外販売",
      summary3Lines: "コピーは媒体ごとに変える必要がある。eBayは検索性、Shopeeは短く視覚的に伝えること、Etsyはストーリーと文化性が重要。同じ商品情報でも、売り場に合わせて表現を変えると伝わりやすくなる。",
      coreIdea: "コピーは商品だけでなく、売り場の読み方に合わせて設計する。",
      top10: "eBay / Shopee / Etsy / SEO / 検索性 / 短文 / スマホ / ストーリー / 日本文化 / 一点物感",
      publishingUse: "同じ告知を媒体ごとにリライトし、読まれる文体と長さへ調整する。",
      useSubstack: "背景やストーリーを深く書き、信頼や価値観を伝える。",
      useNote: "検索されるタイトルと、読まれる導入を意識する。",
      usePodcast: "番組タイトルは検索語、概要欄は安心材料、本文はストーリーに分ける。",
      useLive: "短く伝える告知文と、背景を語るライブ台本を分ける。",
      useNotes: "一瞬で伝わる短文コピーを作る。",
      useX: "検索語とベネフィットを先頭に置き、短く出す。",
      useAi: "AIに媒体別の文字数、文体、優先要素を指定して複数案を生成させる。",
      contentIdeas: "媒体別リライトテンプレート、1商品3コピー練習、Substack告知文変換表にできる。",
      practiceTomorrow: "1つの告知をX用、note用、Substack用の3種類に書き分ける。",
      knowledgeTags: "媒体別コピー, SEO, 短文, ストーリー, 海外販売, AI活用",
    },
    {
      ...common,
      knowledgeName: "中古品コピーは欠点を隠さず、正直に魅せることで信頼になる",
      oneLineConclusion: "欠点は隠すほど不安になり、正直に説明すると価値の一部になる。",
      knowledgeOverview: "中古品や一点物では、傷や劣化を曖昧に隠すと不信につながる。傷の場所や大きさを具体的に書き、写真を複数枚載せ、経年変化やヴィンテージ感として価値を伝える。正直な説明は、信頼、高評価、リピートにつながる。",
      todayAction: "自分の商品・サービス・実績紹介で、弱みや注意点を1つ正直に書き、価値に変える説明を添える。",
      useScene: "中古販売、ヴィンテージ品、相談サービスの向き不向き、講座の注意点、実績紹介、レビュー活用に使う。",
      beginnerExplanation: "悪いところを隠すより、正直に伝えたほうが信頼されるということ。",
      articleIdeas: "欠点を隠さないコピーが信頼を作る / 正直に魅せる販売文の作り方",
      podcastIdeas: "弱みを価値に変える言葉 / 中古品コピーに学ぶ信頼構築",
      aiUseSimple: "AIに商品の欠点やサービスの注意点を渡し、正直で不安を増やさない表現へ変換させる。",
      tagsSimple: "中古品コピー, 信頼構築, 正直な説明, 欠点の見せ方, レビュー",
      summary3Lines: "中古品コピーでは、傷や劣化を隠さない。場所や大きさを具体的に説明し、写真でも見せる。正直な説明は信頼になり、長く売れ続けるページの土台になる。",
      coreIdea: "信頼されるコピーは、都合の悪い情報も買い手の判断材料として出す。",
      top10: "中古品 / 傷 / 劣化 / 正直 / 写真 / Vintage patina / Honest condition / As-is / 信頼 / 高評価",
      publishingUse: "販売や募集で、向いていない人や注意点も出し、信頼できる案内にする。",
      useSubstack: "有料企画の弱点や向かない人を明記して、信頼を高める。",
      useNote: "販売記事に注意点、できないこと、向いていない人を入れる。",
      usePodcast: "弱みや失敗談を話し、正直な発信として信頼につなげる。",
      useLive: "質問対応で無理に売らず、合わない場合も説明する。",
      useNotes: "短文で『これは向いていない人』を出す。",
      useX: "弱みを隠さず、判断基準として投稿する。",
      useAi: "AIに弱みを信頼に変える説明文、FAQ、注意書きを作らせる。",
      contentIdeas: "弱みを価値に変えるコピー集、正直な販売ページチェックリスト、信頼される注意書きテンプレートにできる。",
      practiceTomorrow: "販売ページに『向いていない人』または『注意点』を1つ追加する。",
      knowledgeTags: "中古品コピー, 信頼構築, 正直な説明, 欠点の見せ方, レビュー, ブランディング",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addSellingCopywritingKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(SELLING_COPYWRITING_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("売れるコピーはうまい文章ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "コピーライティング";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "売れるコピーライティング実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...sellingCopywritingKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "コピーライティング";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "売れるコピーライティング実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function forbiddenWordsKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: FORBIDDEN_WORDS_SAMPLE_TITLE,
    author: "",
    genre: "行動設計 / チーム運営 / 思考整理 / 合意形成 / 習慣",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "4",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["行動設計", "習慣", "心理", "チーム運営", "AI活用"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "挑戦を止める言葉は、感情ではなく思考停止スイッチとして扱う",
      oneLineConclusion: "ネガティブな言葉を責めるのではなく、思考が止まった合図として使う。",
      knowledgeOverview: "できない、やれない、わからない、でも、だって、とりあえず、しょうがないは悪い言葉そのものではない。ただ、その後に思考停止、責任回避、現状維持が続きやすい。言葉を感情論で裁くのではなく、思考を再起動するための検知サインとして扱うことが重要。",
      todayAction: "今日の発信やメモで、7つの禁止コトバが出たら丸をつけ、すぐ問いに変換する。",
      useScene: "企画会議、発信の継続、講座運営、相談対応、AIとの壁打ち、コミュニティの合意形成に使う。",
      beginnerExplanation: "『できない』と言った自分を責めるのではなく、『今、考えるのを止めかけている』と気づくこと。",
      articleIdeas: "挑戦を止める7つの言葉 / ネガティブ言葉を思考停止サインに変える方法",
      podcastIdeas: "言葉が行動を止める瞬間 / できないを責めずに再起動する",
      aiUseSimple: "AIに自分のメモや相談文を渡し、思考停止ワードと問いへの変換案を抽出させる。",
      tagsSimple: "思考停止, 行動設計, 習慣, 心理, 合意形成",
      summary3Lines: "挑戦を止める言葉は、気持ちの弱さではなく思考停止のサインとして見る。7つの言葉は、判断を自動終了させる危険がある。禁止の目的は縛ることではなく、止まりかけた思考を再起動すること。",
      coreIdea: "言葉は思考を止めるスイッチにも、再起動するスイッチにもなる。",
      top10: "できない / やれない / わからない / でも / だって / とりあえず / しょうがない / 思考停止 / 再起動 / 合意形成",
      publishingUse: "発信で初心者が止まりやすい言葉を拾い、責めずに問いへ変換する記事や投稿を作る。",
      useSubstack: "読者の行動が止まる言葉をテーマに連載し、毎回1つの問いを提示する。",
      useNote: "自分の挑戦ログとして、止まった言葉と再起動した問いを記録する。",
      usePodcast: "挑戦が止まる口ぐせを1回1テーマで話す。",
      useLive: "視聴者の『できない』コメントを問いに変えて、その場で行動案にする。",
      useNotes: "7つの言葉を短文投稿シリーズにする。",
      useX: "禁止コトバと変換質問をセットで投稿する。",
      useAi: "AIに『この文章の思考停止ポイントを問いに変えて』と依頼する。",
      contentIdeas: "禁止コトバ診断、思考再起動カード、7日間言い換えチャレンジ、チーム会議ルールにできる。",
      practiceTomorrow: "『できない』を使ったら、『何が足りていないのか？』に言い換える。",
      knowledgeTags: "思考停止, 行動設計, 習慣, 心理, 合意形成, 発信",
    },
    {
      ...common,
      knowledgeName: "できない・やれないは、可能性ゼロではなく条件整理に変換する",
      oneLineConclusion: "できないで終わらせず、何が足りないか、どこまでならできるかを見る。",
      knowledgeOverview: "できないは可能性探索の終了、やれないは現状維持バイアスとして働く。そこで、何が足りていないのか、どこまでならできるか、いつならやれるか、何を削ればできるかに変換する。0か100かではなく、条件と範囲を整理すると小さな実行が見える。",
      todayAction: "先延ばししていることを1つ選び、『どこまでならできるか』を15分単位で書く。",
      useScene: "新企画、Substack開始、Podcast収録、ライブ配信、講座作成、家事や生活改善の着手に使う。",
      beginnerExplanation: "全部できないと思ったら、全部ではなく一部ならできるかを探すこと。",
      articleIdeas: "できないを条件整理に変える / やれない時に使う3つの質問",
      podcastIdeas: "0か100か思考から抜ける / やれないを小さな実行に変える",
      aiUseSimple: "AIに目標と制約を渡し、足りない条件、削るもの、最小実行案を出させる。",
      tagsSimple: "条件整理, 小さな実行, 先延ばし, 行動設計, 習慣",
      summary3Lines: "できない、やれないは行動を止めやすい。問いに変えると、不足条件、可能範囲、時間軸、トレードオフが見える。全部やる前に、どこまでならできるかを決めることが前進になる。",
      coreIdea: "不可能の宣言ではなく、実行条件の分解に変える。",
      top10: "できない / やれない / 不足要素 / どこまでなら / いつなら / 何を削る / 条件整理 / トレードオフ / 小さな実行 / 0か100か",
      publishingUse: "初心者向けに、大きな目標を15分行動へ分解するテンプレートとして使う。",
      useSubstack: "記事作成を構成、見出し、冒頭だけなど小さな工程に分ける。",
      useNote: "書けない時に、タイトル案だけ出す、メモだけ残す運用にする。",
      usePodcast: "収録できない時に、3分メモ音声だけ録る。",
      useLive: "長時間配信ではなく、15分テーマ配信にする。",
      useNotes: "1行だけ今日できることを投稿する。",
      useX: "大きな挑戦を小さな実行に分解する投稿にする。",
      useAi: "AIに『この目標を15分でできる最小行動に分けて』と頼む。",
      contentIdeas: "15分実行テンプレート、できない変換ワーク、先延ばし解消ミニ講座にできる。",
      practiceTomorrow: "やれない理由を1つ書き、何を削ればできるかを1つ決める。",
      knowledgeTags: "条件整理, 小さな実行, 先延ばし, 行動設計, 習慣, AI活用",
    },
    {
      ...common,
      knowledgeName: "わからない・でも・だっては、分解・条件検討・主語を戻す問いに変える",
      oneLineConclusion: "否定や言い訳を、理解の分解と自分の選択に戻す。",
      knowledgeOverview: "わからないは学習停止、でもは反射的な否定、だっては他責や過去依存につながりやすい。何が分かっていないのか、どの条件なら成り立つか、今の自分はどうしたいかに変えると、未知を分解し、可能性を残し、主語を自分に戻せる。",
      todayAction: "『わからない』と思ったテーマを、分かっていること、分からないこと、調べれば分かることに分ける。",
      useScene: "AI学習、Substack設定、発信テーマ決め、読者相談、企画レビュー、コミュニティ内の対話に使う。",
      beginnerExplanation: "わからないで止まらず、『何がわからないか』まで小さくすること。",
      articleIdeas: "わからないを分解するだけで前に進む / でもを建設的な条件検討に変える",
      podcastIdeas: "反射的な否定をやめる方法 / 主語を自分に戻す問い",
      aiUseSimple: "AIに『分かっていること・不明点・調べる手順』の表を作らせる。",
      tagsSimple: "学習, 分解思考, 主体性, フィードバック, 心理",
      summary3Lines: "わからない、でも、だっては思考を閉じやすい。分からない部分を特定し、成立条件を探し、自分が今選べることに戻す。否定や言い訳を、次の問いへ変えることで前進できる。",
      coreIdea: "思考を閉じる言葉は、問いにすると学習と対話の入口になる。",
      top10: "わからない / でも / だって / 分解 / 既知と未知 / 成立条件 / 前提変更 / 主語を戻す / 過去依存 / 主体性",
      publishingUse: "初心者がつまずく場面を『何が分からないか』から整理する解説にする。",
      useSubstack: "読者の質問を、既知、未知、次の一歩に分けて回答する。",
      useNote: "学習ログで、分からなかったことと調べた手順を書く。",
      usePodcast: "つまずきの分解回、言い訳を選択に変える回を作る。",
      useLive: "質問を受けたら、すぐ答えずに不明点を分解する。",
      useNotes: "『でも』を『どの条件なら？』に変える短文を出す。",
      useX: "わからない時の3分解テンプレートを投稿する。",
      useAi: "AIに否定文を建設的な問いへ変換させる。",
      contentIdeas: "わからない分解シート、フィードバック言い換え表、初心者向け学習ロードマップにできる。",
      practiceTomorrow: "『でも』が出たら、『どの条件なら成り立つか？』を1回だけ書く。",
      knowledgeTags: "学習, 分解思考, 主体性, フィードバック, 心理, コミュニティ",
    },
    {
      ...common,
      knowledgeName: "とりあえず・しょうがないは、目的・期限・検証条件と学びに戻す",
      oneLineConclusion: "惰性で動かず、目的と期限を決めて、結果を学びに変える。",
      knowledgeOverview: "とりあえずは判断の先送りや検証不能な行動につながり、しょうがないは主体性の放棄や学習機会の消失につながる。目的は何か、期限はいつか、検証できるか、自分で変えられる部分はどこか、次に活かせる学びは何かに変換すると、行動の質が上がる。",
      todayAction: "今日やる作業を1つ選び、目的、期限、成功条件、撤退ラインを1行ずつ書く。",
      useScene: "発信計画、実験ログ、AI活用、会議運営、プロジェクト管理、講座改善、ライブ企画に使う。",
      beginnerExplanation: "なんとなく始める前に、何のために、いつまでに、何を見て成功とするかを決めること。",
      articleIdeas: "とりあえずを検証可能な行動に変える / しょうがないを学びに変える振り返り術",
      podcastIdeas: "惰性の行動をやめる / 失敗を次の資産にする問い",
      aiUseSimple: "AIに行動案を渡し、目的、期限、検証条件、振り返り質問を作らせる。",
      tagsSimple: "検証, 実験, 振り返り, プロジェクト管理, 習慣",
      summary3Lines: "とりあえずは行動しているようで判断を先送りしやすい。しょうがないは関与と学習を手放しやすい。目的、期限、検証条件、変えられる範囲、次の学びに戻すと行動が資産になる。",
      coreIdea: "行動は目的と検証条件があると、失敗しても学びになる。",
      top10: "とりあえず / しょうがない / 目的 / 期限 / 検証条件 / 成功条件 / 撤退ライン / 変えられる範囲 / 学び / 振り返り",
      publishingUse: "発信や仕事を実験として扱い、結果を記録して次の改善に変える。",
      useSubstack: "記事ごとに目的と反応指標を決め、翌週に振り返る。",
      useNote: "実験記事として、仮説、実行、結果、学びを書く。",
      usePodcast: "配信前にテーマの目的とリスナーの行動を決める。",
      useLive: "ライブごとに目的、終了時刻、次の導線を決める。",
      useNotes: "小さな実験結果を短文で残す。",
      useX: "検証中の発信テーマを投稿し、反応を学びにする。",
      useAi: "AIに週次振り返りを渡し、次の改善案を3つ出させる。",
      contentIdeas: "発信実験ログ、週次ふり返りテンプレート、目的・期限・検証条件シートにできる。",
      practiceTomorrow: "1つの投稿に目的と検証条件を決めてから出す。",
      knowledgeTags: "検証, 実験, 振り返り, プロジェクト管理, 習慣, AI活用",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addForbiddenWordsKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(FORBIDDEN_WORDS_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("挑戦を止める言葉は")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "思考停止";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "挑戦を止める7つの禁止コトバ実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...forbiddenWordsKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "思考停止";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "挑戦を止める7つの禁止コトバ実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function twelveQuestionsKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: TWELVE_QUESTIONS_SAMPLE_TITLE,
    author: "",
    genre: "行動設計 / ピンチ対応 / 思考整理 / 習慣 / セルフコーチング",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["行動設計", "習慣", "心理", "セルフコーチング", "AI活用"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "ピンチの時は正解探しではなく、状態に合う質問を選ぶ",
      oneLineConclusion: "止まる、揺れる、立て直すのどこにいるかを見て、質問を変える。",
      knowledgeOverview: "ピンチの時にいきなり正解を探すと、感情や迷いで動けなくなる。まず今の状態を、止まった、揺れた、立て直すの3つに分ける。状態に合う質問を30秒で答え、最後に一文と明日の一手へ落とすことで、迷いを行動に変えやすくなる。",
      todayAction: "今の自分が『止まる・揺れる・立て直す』のどれにいるかを1つ選び、該当する質問を1つだけ答える。",
      useScene: "発信が止まった時、仕事で詰まった時、ライブ前に不安な時、Podcast企画が揺れた時、AI壁打ちで整理したい時に使う。",
      beginnerExplanation: "困った時に全部解決しようとせず、まず今の状態に合う質問を1つ選ぶこと。",
      articleIdeas: "ピンチの時に正解を探さない / 止まる・揺れる・立て直すで質問を変える",
      podcastIdeas: "迷った時の質問の選び方 / ピンチを行動に変える30秒セルフコーチング",
      aiUseSimple: "AIに『今の私は止まる・揺れる・立て直すのどれ？質問を1つ出して』と頼む。",
      tagsSimple: "ピンチ対応, セルフコーチング, 行動設計, 思考整理, 習慣",
      summary3Lines: "ピンチの時は正解探しをしない。今の状態を、止まる、揺れる、立て直すに分ける。状態に合う質問へ短く答え、最後に一文と明日の一手へ変換する。",
      coreIdea: "行動できない時ほど、答えではなく問いを選ぶ。",
      top10: "止まる / 揺れる / 立て直す / 12の質問 / 30秒 / 正解探しをしない / 一文 / 明日の一手 / 状態選択 / セルフコーチング",
      publishingUse: "読者の状態別に、今使える質問を出すコンテンツにする。",
      useSubstack: "週1で『今週の詰まりを1問で動かす』連載にする。",
      useNote: "自分のピンチ対応ログとして、状態、質問、答え、一手を記録する。",
      usePodcast: "悩みを3フェーズに分けて、毎回1つの質問を扱う。",
      useLive: "視聴者のコメントを状態別に分け、その場で質問を投げる。",
      useNotes: "今日の1問として短文投稿する。",
      useX: "止まった時、揺れた時、立て直す時の質問をスレッド化する。",
      useAi: "AIに状態判定と質問選定をさせ、答えを行動文へ整える。",
      contentIdeas: "12の質問カード、30秒セルフコーチングテンプレート、ピンチ対応ワークシートにできる。",
      practiceTomorrow: "朝に『今の状態はどれか』を選び、1問だけメモする。",
      knowledgeTags: "ピンチ対応, セルフコーチング, 行動設計, 思考整理, 習慣, AI活用",
    },
    {
      ...common,
      knowledgeName: "止まった時は、詰まり・緊急度・最小の一歩・やらない理由を確認する",
      oneLineConclusion: "止まった時は大きく考えず、今日始める一歩と時刻まで決める。",
      knowledgeOverview: "止まった時の4問は、今一番の詰まりは何か、それは今日すぐ要ることか、今日の最小の一歩は何か、それをしない理由は何か。最後に『今日の一歩は［具体的な行動］。［時刻］に始める。』と書くことで、迷いを予定へ変換できる。",
      todayAction: "止まっているタスクを1つ選び、『今日の一歩は〇〇。〇時に始める。』まで書く。",
      useScene: "記事が書けない、配信準備が進まない、PDF整理が止まった、講座作成に着手できない場面で使う。",
      beginnerExplanation: "やる気を待つのではなく、いま一番小さくできる行動と開始時刻を決めること。",
      articleIdeas: "止まった時に使う4つの質問 / 今日の一歩を予定に入れる方法",
      podcastIdeas: "行動が止まった時の再起動法 / 最小の一歩と時刻を決める",
      aiUseSimple: "AIに止まっているタスクを渡し、詰まり、緊急度、最小行動、開始時刻の案を出させる。",
      tagsSimple: "行動再開, 最小行動, 先延ばし, タスク管理, 習慣",
      summary3Lines: "止まった時は、詰まりの正体と今日必要かを確認する。次に今日の最小の一歩と、それをしない理由を見る。最後に具体的な行動と時刻を書いて、予定へ入れる。",
      coreIdea: "止まった行動は、最小化して時刻を決めると動き出す。",
      top10: "詰まり / 今日必要か / 最小の一歩 / しない理由 / 具体的な行動 / 時刻 / 予定化 / 先延ばし / 再起動 / 30秒",
      publishingUse: "初心者に、行動が止まった時の1行テンプレートとして渡す。",
      useSubstack: "記事末に『今日の一歩』欄を作る。",
      useNote: "作業ログに、詰まりと開始時刻を書いて公開する。",
      usePodcast: "収録前に最小の台本メモだけ作る話題にする。",
      useLive: "ライブ前の不安を、最小準備と開始時刻へ変える。",
      useNotes: "今日の一歩を宣言する短文にする。",
      useX: "『今日の一歩は〇〇。〇時に始める』の型で投稿する。",
      useAi: "AIにタスクを15分行動へ分解させ、カレンダー文にする。",
      contentIdeas: "今日の一歩テンプレート、先延ばし再起動シート、30秒行動宣言チャレンジにできる。",
      practiceTomorrow: "朝一番に1つだけ『今日の一歩』を時刻つきで書く。",
      knowledgeTags: "行動再開, 最小行動, 先延ばし, タスク管理, 習慣, 発信",
    },
    {
      ...common,
      knowledgeName: "揺れた時は、事実と解釈を分けて今やる一手だけに戻る",
      oneLineConclusion: "不安を消してから動くのではなく、事実を見て一手だけ決める。",
      knowledgeOverview: "揺れた時の4問は、それは事実か解釈か、最悪の場合何が起きるか、それは本当に致命的か、それでも残るものは何か。感情と事実を切り離し、『事実は［事実］。今やるのは［一手］。』と書くと、不安に巻き込まれず行動へ戻れる。",
      todayAction: "不安なことを1つ選び、事実と解釈に分けてから『今やる一手』を1つだけ書く。",
      useScene: "反応が少ない投稿、失敗した企画、批判への不安、売上が伸びない時、ライブや講座前の緊張に使う。",
      beginnerExplanation: "不安な気持ちと、実際に起きている事実を分けて見ること。",
      articleIdeas: "不安な時は事実と解釈を分ける / 揺れた心を行動に戻す4つの質問",
      podcastIdeas: "反応が少ない時に自分を責めない / 事実と解釈の切り分け方",
      aiUseSimple: "AIに不安を書き出し、事実、解釈、最悪ケース、今やる一手に整理させる。",
      tagsSimple: "不安整理, 事実と解釈, 感情整理, 行動設計, 心理",
      summary3Lines: "揺れた時は、事実と解釈を分ける。最悪の場合と致命度を確認し、それでも残るものを見る。最後に今やる一手だけを決めると、感情に飲まれず動ける。",
      coreIdea: "不安は消す対象ではなく、事実と行動に分ける対象である。",
      top10: "事実 / 解釈 / 最悪の場合 / 致命的か / 残るもの / 感情整理 / 一手 / 不安 / ピンチ / 行動",
      publishingUse: "発信の反応や失敗を、落ち込みではなく検証ログに変える。",
      useSubstack: "低反応の記事を、事実、解釈、次の一手で振り返る。",
      useNote: "不安の整理記事として、事実と解釈の表を載せる。",
      usePodcast: "失敗や不安を事実と解釈に分けて話す回を作る。",
      useLive: "視聴者の悩みを事実と解釈に分けて整理する。",
      useNotes: "不安な時の1問『それは事実？解釈？』を投稿する。",
      useX: "不安を一手に変えるテンプレートを投稿する。",
      useAi: "AIに感情的な文章を整理させ、事実と次の一手だけに圧縮する。",
      contentIdeas: "事実と解釈の分解シート、不安整理テンプレート、反応が少ない時の振り返り表にできる。",
      practiceTomorrow: "不安を1つ、事実と解釈に分けてメモする。",
      knowledgeTags: "不安整理, 事実と解釈, 感情整理, 行動設計, 心理, AI活用",
    },
    {
      ...common,
      knowledgeName: "立て直す時は、経験を学びと言葉にして明日の一手へつなげる",
      oneLineConclusion: "失敗やピンチは、学びを一言にして次の行動へ渡すと資産になる。",
      knowledgeOverview: "立て直す時の4問は、この経験で身についたことは何か、次に同じ状況なら最初に何をするか、今日の学びを一言で言うと何か、明日の一手は何か。最後に『学びは［一言］。明日は［行動］をやる。』と書くと、経験を次の行動に接続できる。",
      todayAction: "最近の失敗や停滞を1つ選び、『学びは〇〇。明日は〇〇をやる。』に変える。",
      useScene: "企画後の振り返り、発信改善、ライブ後レビュー、Podcast配信後、講座改善、AI活用ログに使う。",
      beginnerExplanation: "うまくいかなかったことを責めず、次に使える学びと明日の行動に変えること。",
      articleIdeas: "失敗を学びに変える4つの質問 / ピンチを資産化する振り返り",
      podcastIdeas: "立て直す力の作り方 / 経験を次の行動に変える",
      aiUseSimple: "AIに失敗ログを渡し、身についたこと、次回の初動、学びの一言、明日の一手を出させる。",
      tagsSimple: "振り返り, 学び, 失敗活用, 行動改善, 習慣",
      summary3Lines: "立て直す時は、経験から身についたことを言語化する。次に同じ状況なら何から始めるかを決める。学びを一言にし、明日の一手へつなげるとピンチが資産になる。",
      coreIdea: "経験は、学びと言葉と次の一手に変えて初めて資産になる。",
      top10: "立て直す / 身についたこと / 次回の初動 / 学びの一言 / 明日の一手 / 振り返り / 失敗活用 / 経験 / 改善 / 資産化",
      publishingUse: "失敗談を、読者に役立つ学びと次の行動へ変換して発信する。",
      useSubstack: "週次ふり返り記事で、学びと明日の一手を固定項目にする。",
      useNote: "失敗や停滞のログを、学び記事へ変える。",
      usePodcast: "今週の学びと次の一手を話す定番コーナーにする。",
      useLive: "ライブ後に、学びと次回改善を視聴者に共有する。",
      useNotes: "今日の学びを一言で投稿する。",
      useX: "『学びは〇〇。明日は〇〇』の型で連投する。",
      useAi: "AIに振り返りを資産化し、記事、投稿、講座改善案へ展開させる。",
      contentIdeas: "週次ふり返りテンプレート、ピンチ資産化シート、失敗談コンテンツ化講座にできる。",
      practiceTomorrow: "夜に『学びは〇〇。明日は〇〇』を1行で書く。",
      knowledgeTags: "振り返り, 学び, 失敗活用, 行動改善, 習慣, コンテンツ化",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addTwelveQuestionsKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(TWELVE_QUESTIONS_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("ピンチの時は正解探しではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "ピンチ対応";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "ピンチを行動に変える12の質問実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...twelveQuestionsKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "ピンチ対応";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "ピンチを行動に変える12の質問実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function socialContributionKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: SOCIAL_CONTRIBUTION_SAMPLE_TITLE,
    author: "",
    genre: "社会貢献 / 事業設計 / コミュニティ運営 / 信頼設計 / 継続運用",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "4",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["社会貢献", "事業設計", "コミュニティ", "信頼構築", "マーケティング"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "社会貢献は善意ではなく、続く構造として設計すると仕事になる",
      oneLineConclusion: "情熱に頼らず、思想・行動・信頼・収益・成長のOSで回す。",
      knowledgeOverview: "社会貢献が続かない原因は、能力や熱意の不足ではなく設計不在にある。善意、情熱、使命感は枯渇する前提で、思想OS、行動OS、信頼OS、収益OS、成長OSに分けて設計する。感情ではなく構造で回る状態を作ることが仕事化の本質。",
      todayAction: "今やっている活動を、思想、行動、信頼、収益、成長の5項目に分けて、空欄を1つ見つける。",
      useScene: "コミュニティ運営、講座運営、相談活動、無料企画の有料化、社会的テーマの発信、支援活動の継続設計に使う。",
      beginnerExplanation: "良いことを頑張るだけでは続きにくいので、続けるための仕組みまで作ること。",
      articleIdeas: "社会貢献は善意だけでは続かない / 活動を仕事に変える5つのOS",
      podcastIdeas: "感情に頼らない社会貢献の作り方 / いいことを続けるには設計が必要",
      aiUseSimple: "AIに活動内容を渡し、思想、行動、信頼、収益、成長のOSに分解させる。",
      tagsSimple: "社会貢献, 事業設計, 継続運用, 信頼設計, 収益化",
      summary3Lines: "社会貢献が止まる原因は熱意不足ではなく設計不在。善意や使命感は枯渇する前提で、活動をOSとして分解する。思想、行動、信頼、収益、成長を個別に更新できる構造にすると仕事として続く。",
      coreIdea: "社会貢献は感情ではなく、更新可能な構造で続ける。",
      top10: "善意 / 設計 / 社会貢献OS / 思想OS / 行動OS / 信頼OS / 収益OS / 成長OS / 継続 / 仕事化",
      publishingUse: "読者に『好き・使命感』だけでなく、活動を続ける仕組みの作り方を伝える。",
      useSubstack: "社会的テーマの発信を、思想記事、活動ログ、収益設計、改善ログに分けて連載する。",
      useNote: "自分の活動をOS分解して、読者に設計プロセスを見せる。",
      usePodcast: "社会貢献を仕事にするための構造づくりをシリーズ化する。",
      useLive: "視聴者の活動を5つのOSに分解する相談ライブにする。",
      useNotes: "善意だけでは続かない理由を短文で発信する。",
      useX: "社会貢献OSの5分類を図解投稿にする。",
      useAi: "AIに自分の活動の弱いOSを診断させ、改善案を出させる。",
      contentIdeas: "社会貢献OS診断、活動設計ワーク、継続できる支援活動テンプレート、講座にできる。",
      practiceTomorrow: "活動の目的、行動ログ、信頼材料、収益源、改善サイクルを1行ずつ書く。",
      knowledgeTags: "社会貢献, 事業設計, 継続運用, 信頼設計, 収益化, コミュニティ",
    },
    {
      ...common,
      knowledgeName: "責任範囲とやめる条件を決めることが、活動と自分を守る",
      oneLineConclusion: "優しさで範囲を広げず、やること・やらないこと・撤退基準を先に決める。",
      knowledgeOverview: "社会貢献では、責任範囲を曖昧にすると自己犠牲で穴埋めしやすい。誰に、何を、どうなれば成功かを定義し、対象外ケース、対応時間、品質基準、撤退基準を明文化する。続ける条件よりやめる条件を先に決めることが、長期的には活動と関係者を守る。",
      todayAction: "自分の活動について『やること3つ』『やらないこと3つ』『やめる条件1つ』を書く。",
      useScene: "相談受付、コミュニティルール、無料サポート、講座運営、プロジェクト設計、支援活動の境界線作りに使う。",
      beginnerExplanation: "全部助けようとすると続かないので、どこまでやるか、どこからやらないかを決めること。",
      articleIdeas: "優しさで責任範囲を広げない / 社会貢献に撤退基準が必要な理由",
      podcastIdeas: "やめる条件が活動を守る / 自己犠牲で続けない支援の作り方",
      aiUseSimple: "AIに活動内容を渡し、IN SCOPE、OUT OF SCOPE、撤退基準、対応時間を表にさせる。",
      tagsSimple: "責任範囲, 境界線, 撤退基準, 自己犠牲防止, 運営設計",
      summary3Lines: "責任を曖昧にすることは優しさではない。やること、やらないこと、品質基準、撤退基準を決めることで活動は守られる。自己犠牲で設計不備を埋めないことが継続の条件。",
      coreIdea: "線引きは冷たさではなく、継続のための責任設計である。",
      top10: "責任範囲 / IN SCOPE / OUT OF SCOPE / 対応時間 / 品質基準 / 対象外 / 撤退基準 / 財務閾値 / 安全閾値 / 自己犠牲",
      publishingUse: "発信や企画の対象者、対象外、提供範囲を明確にして信頼を作る。",
      useSubstack: "有料購読や相談企画に、対象者、対象外、返信範囲を明記する。",
      useNote: "活動のルールや境界線を記事化する。",
      usePodcast: "支援と自己犠牲の違いをテーマに話す。",
      useLive: "ライブ相談の対応範囲と答えられないことを冒頭で伝える。",
      useNotes: "『やらないことリスト』を短文で共有する。",
      useX: "活動を守るための線引き投稿にする。",
      useAi: "AIに利用規約、FAQ、撤退基準の下書きを作らせる。",
      contentIdeas: "責任範囲テンプレート、撤退基準シート、活動ルール設計講座にできる。",
      practiceTomorrow: "今の活動で断るべきことを1つ決め、文章にする。",
      knowledgeTags: "責任範囲, 境界線, 撤退基準, 自己犠牲防止, 運営設計, 信頼構築",
    },
    {
      ...common,
      knowledgeName: "信頼は良い人だからではなく、透明性・SLA・記録で設計する",
      oneLineConclusion: "人柄に頼らず、誰がやっても同じ品質になる手順とログを残す。",
      knowledgeOverview: "信頼は人格だけで得られるものではなく、再現可能な構造で担保される。プロセス、ルール、意思決定履歴を可視化し、いつまでに何をするかのSLAを定義し、行動を記録する。日報やログは評価のためではなく、仕組みを改善するためのデータになる。",
      todayAction: "活動の対応品質を1つ決める。例: 返信は48時間以内、週1で活動ログを公開する。",
      useScene: "コミュニティ運営、相談対応、メルマガ運営、講座サポート、プロジェクト報告、発信の信頼構築に使う。",
      beginnerExplanation: "信頼されるには、良い人アピールより、約束したことを見える形で守ること。",
      articleIdeas: "信頼は人柄ではなく仕組みで作る / 活動ログが信頼資産になる理由",
      podcastIdeas: "透明性とSLAで信頼を作る / 日報は反省ではなく設計改善のデータ",
      aiUseSimple: "AIに活動ログを渡し、KPI、行動、翌日の改善に整理させる。",
      tagsSimple: "信頼設計, 透明性, SLA, 記録, 日報",
      summary3Lines: "信頼は良い人だからではなく、再現可能な構造で担保する。透明性、SLA、ログ、手順書があると期待値が揃う。記録は人を裁くためではなく、仕組みを改善するために使う。",
      coreIdea: "信頼は人格ではなく、約束・記録・改善で積み上がる。",
      top10: "信頼設計 / 透明性 / SLA / 手順書 / 監査ログ / 日報 / KPI / 行動ログ / 改善 / 再現性",
      publishingUse: "発信活動の裏側や改善ログを見せ、読者に継続性と信頼を伝える。",
      useSubstack: "月次レポートで活動実績、学び、次の改善を共有する。",
      useNote: "活動ログや運営の透明性を記事化する。",
      usePodcast: "今週の活動ログと改善点を話す定番回にする。",
      useLive: "活動報告ライブで、数字と次の改善を共有する。",
      useNotes: "今日の活動ログを3行で残す。",
      useX: "透明性のある進捗報告を投稿する。",
      useAi: "AIに日報を読ませ、活動のボトルネックと次の改善案を出させる。",
      contentIdeas: "活動日報テンプレート、信頼設計チェックリスト、運営ログ公開フォーマットにできる。",
      practiceTomorrow: "数値、行動、翌日の一手の3項目で3分日報を書く。",
      knowledgeTags: "信頼設計, 透明性, SLA, 記録, 日報, コミュニティ",
    },
    {
      ...common,
      knowledgeName: "収益はご褒美ではなく、責任を果たし続けるための燃料である",
      oneLineConclusion: "無償を美徳にせず、価格・役割・参加条件で活動の循環を作る。",
      knowledgeOverview: "社会貢献における収益は報酬ではなく、継続責任を果たすための資源である。無償で続けて資金不足になることは、支援対象者への裏切りにもなりうる。直接価値と間接価値を設計し、価格仮説、参加条件、役割、更新条件、離脱しやすさまで含めて循環を作る。",
      todayAction: "自分の活動の直接価値と間接価値を1つずつ書き、それに対する価格仮説を1つ置く。",
      useScene: "有料コミュニティ、講座、相談サービス、寄付以外の収益化、社会的プロジェクト、BrainやKindle化に使う。",
      beginnerExplanation: "お金を受け取ることは悪ではなく、活動を明日も続けるための責任の一部。",
      articleIdeas: "社会貢献でお金を受け取るのは悪いことか / 収益は責任の対価である",
      podcastIdeas: "無償の美徳から抜ける / 社会貢献を続ける価格設計",
      aiUseSimple: "AIに活動内容を渡し、直接価値、間接価値、価格仮説、参加条件を整理させる。",
      tagsSimple: "収益化, 価格設計, 直接価値, 間接価値, コミュニティ",
      summary3Lines: "収益はご褒美ではなく、継続責任を果たすための燃料。無償を美徳にしすぎると活動停止のリスクが高まる。直接価値と間接価値、価格、役割、参加条件を設計すると循環が生まれる。",
      coreIdea: "お金を受け取ることは、活動を続ける責任を引き受けることでもある。",
      top10: "収益 / 責任の対価 / キャッシュフロー / 価格仮説 / 直接価値 / 間接価値 / 役割設計 / 参加条件 / 更新条件 / 離脱設計",
      publishingUse: "社会的価値と収益化を対立させず、継続するための設計として伝える。",
      useSubstack: "有料購読の価値を直接価値と間接価値に分けて説明する。",
      useNote: "無償活動を有料企画へ変える過程を記事化する。",
      usePodcast: "価格をつける怖さと責任について話す。",
      useLive: "活動の価値と参加条件を丁寧に説明するライブにする。",
      useNotes: "お金を受け取る意味を短文で発信する。",
      useX: "収益は責任の燃料という考え方を投稿する。",
      useAi: "AIに価格案、参加条件、価値説明文、FAQを作らせる。",
      contentIdeas: "社会貢献型ビジネス設計シート、価格仮説ワーク、価値二層化テンプレート、講座にできる。",
      practiceTomorrow: "無料でやっていることを1つ選び、責任範囲と価格仮説を書いてみる。",
      knowledgeTags: "収益化, 価格設計, 直接価値, 間接価値, コミュニティ, 事業設計",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addSocialContributionKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(SOCIAL_CONTRIBUTION_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("社会貢献は善意ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "社会貢献";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "社会貢献を仕事にする実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...socialContributionKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "社会貢献";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "社会貢献を仕事にする実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function communityVillageKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: COMMUNITY_VILLAGE_SAMPLE_TITLE,
    author: "",
    genre: "コミュニティ運営 / 体験設計 / Substack / ライブ配信 / 関係性づくり",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "ライブ配信", "X", "Notes", "Brain"],
    connectsTo: ["コミュニティ", "信頼構築", "発信", "体験設計", "Substack"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "コミュニティは人を集める場所ではなく、戻ってきたくなる感情の記憶を作る場所",
      oneLineConclusion: "情報ではなく、安心・共感・余韻が人を戻らせる。",
      knowledgeOverview: "一度だけ人を集めるなら告知や話題性で足りるが、もう一度来てもらうには感情の記憶が必要。初めて入った時に安心した、名前を呼ばれた、誰かが声をかけてくれた、帰り際にまた来てと言われた。その小さな記憶が再訪理由になる。",
      todayAction: "次の企画で、参加者に持ち帰ってほしい感情を『安心・笑えた・覚えてもらえた』から1つ選ぶ。",
      useScene: "Substack読者コミュニティ、ライブ配信、Podcastリスナー交流、オンラインイベント、Notes企画、Xスペースに使う。",
      beginnerExplanation: "人は便利だからだけでは戻らない。自分もここにいていいと思えた場所に戻る。",
      articleIdeas: "コミュニティは集める場所ではなく戻る場所 / また来たくなる感情の記憶の作り方",
      podcastIdeas: "人が戻ってくるコミュニティの条件 / 情報より記憶が大事",
      aiUseSimple: "AIにイベント内容を渡し、参加者が持ち帰る感情の設計案を出させる。",
      tagsSimple: "コミュニティ, 体験設計, 感情の記憶, 居場所, 再訪",
      summary3Lines: "コミュニティは人を集める場所ではなく戻ってくる場所。戻る理由は情報だけでなく、安心、共感、余韻、また会いたい人がいること。最初に設計すべきは、参加者にどんな感情を持ち帰ってもらうかである。",
      coreIdea: "人は役立つ情報より、自分もここにいていいと思えた記憶に戻る。",
      top10: "安心 / 共感 / 余韻 / 感情の記憶 / また会いたい人 / 戻る場所 / 名前を呼ぶ / 肯定感 / 居場所 / 再訪",
      publishingUse: "読者や参加者に、情報だけでなく『また関わりたい』と思う体験を届ける。",
      useSubstack: "記事末やコメント欄で読者の名前や反応を拾い、戻りたくなる関係性を作る。",
      useNote: "読者が安心してコメントできる問いを置く。",
      usePodcast: "リスナーの声を紹介し、聞くだけの人も居場所を感じられる回にする。",
      useLive: "初参加者に最初の一言をかけ、名前を呼ぶ時間を作る。",
      useNotes: "今日の村の一言として、余韻が残る短文を投稿する。",
      useX: "また来たくなるコミュニティの条件をシリーズ投稿にする。",
      useAi: "AIに参加者体験を入口、交流、余韻に分解させる。",
      contentIdeas: "また来たくなる場づくり講座、コミュニティ感情設計シート、読者交流テンプレートにできる。",
      practiceTomorrow: "次の投稿や配信で、初参加者向けの歓迎の一言を用意する。",
      knowledgeTags: "コミュニティ, 体験設計, 感情の記憶, 居場所, 再訪, Substack",
    },
    {
      ...common,
      knowledgeName: "初参加者を不安にさせない入口設計が、参加者を村人に変える",
      oneLineConclusion: "入口で迷わせず、誰に聞けばよいか、何をすれば参加かを先に示す。",
      knowledgeOverview: "初参加者は、入れるか、操作できるか、知らない人ばかりではないか、声を出さないといけないか、途中で抜けてよいかを不安に思う。入口では、どこから入るか、入ったらどこへ行くか、誰に声をかけるか、何をすれば参加か、困った時どうするかを用意する。",
      todayAction: "次のイベントやライブの案内文に『初めての人はここから』『困ったらここへ』を追記する。",
      useScene: "Substack初回案内、ライブ配信の冒頭、コミュニティ参加ページ、オンラインイベント、Roblox村、講座初回に使う。",
      beginnerExplanation: "初めて来た人が迷わないように、最初の道順と助けてくれる人を見えるようにすること。",
      articleIdeas: "初参加者が安心する入口設計 / コミュニティで放置感を生まない方法",
      podcastIdeas: "初めての人にやさしい場づくり / 案内役は説明係ではなく安心を渡す人",
      aiUseSimple: "AIに参加案内文を渡し、初参加者の不安と不足している案内を洗い出させる。",
      tagsSimple: "入口設計, 初参加者, 案内役, 安心設計, オンボーディング",
      summary3Lines: "初参加者は場の価値より先に不安を感じる。入口設計では、入る場所、行く場所、声をかける人、参加の条件、困った時の導線を示す。案内役は説明係ではなく、安心を渡す人である。",
      coreIdea: "入口で安心できると、参加者は場の一員になりやすい。",
      top10: "初参加者 / 入口 / 案内役 / うさこ案内所 / 放置しない / 困った時 / 参加条件 / 聞くだけ歓迎 / 途中退出 / オンボーディング",
      publishingUse: "新規読者や初参加者が迷わないよう、最初の導線を明文化する。",
      useSubstack: "Welcome記事に、読む順番、コメント方法、困った時の連絡先を書く。",
      useNote: "初めて読む人向けの案内記事を固定する。",
      usePodcast: "初めて聞く人向けのおすすめ回を概要欄に置く。",
      useLive: "冒頭で聞くだけ参加歓迎、コメント例、退出自由を伝える。",
      useNotes: "初参加者への短い案内を定期投稿する。",
      useX: "初めての人向け導線を固定投稿に入れる。",
      useAi: "AIに初参加者向けFAQと案内文を作らせる。",
      contentIdeas: "初参加者オンボーディングテンプレート、コミュニティ入口チェックリスト、ライブ冒頭台本にできる。",
      practiceTomorrow: "『初めての方へ』の3行案内を作る。",
      knowledgeTags: "入口設計, 初参加者, 案内役, 安心設計, オンボーディング, コミュニティ",
    },
    {
      ...common,
      knowledgeName: "会話は正解のない軽い問いと役割で入りやすくする",
      oneLineConclusion: "会話を盛り上げようとせず、最初の一歩を軽くする。",
      knowledgeOverview: "会話設計で大切なのは、話す内容を決めすぎることではなく最初の一歩を軽くすること。正解のない問いは参加者を解放する。さらに、迎える人、案内する人、見送る人など名前と役割があると、参加者は人を覚え、関係性が生まれやすくなる。",
      todayAction: "次の交流で使う正解のない問いを3つ作る。例: 今日いちばん気になった場所は？",
      useScene: "コメント欄、ライブ配信、Xスペース、Podcastコミュニティ、Substack読者会、オンライン交流会に使う。",
      beginnerExplanation: "難しい質問ではなく、誰でも答えられる軽い質問を最初に出すこと。",
      articleIdeas: "会話に入りやすいコミュニティの作り方 / 正解のない問いが参加を生む",
      podcastIdeas: "初参加者が話しやすい問い / 役割が関係性を作る",
      aiUseSimple: "AIにテーマと参加者像を渡し、正解のない問いと役割分担を作らせる。",
      tagsSimple: "会話設計, 問い, 役割設計, 交流, 参加",
      summary3Lines: "会話を生むには、内容を固めすぎず最初の一歩を軽くする。正解のない問いは参加者を解放する。迎える、案内する、見送るなど役割があると、人の記憶が残り再訪理由になる。",
      coreIdea: "会話のハードルを下げると、参加者は自分も場に関われたと感じる。",
      top10: "正解のない問い / 会話設計 / 役割 / 名前 / 迎える / 案内する / 見送る / 短い共有 / 未来を語る / 参加感",
      publishingUse: "記事や配信の最後に、読者が答えやすい問いを置く。",
      useSubstack: "コメント欄に『正解のない問い』を置き、読者の言葉を拾う。",
      useNote: "記事末に軽い問いを入れる。",
      usePodcast: "エピソード末にリスナーが答えやすい問いを出す。",
      useLive: "最初のコメント例を出して会話の入口を作る。",
      useNotes: "今日の軽い問いを投稿する。",
      useX: "アンケートや引用しやすい問いにする。",
      useAi: "AIに『初心者も答えやすい問い』を10個作らせる。",
      contentIdeas: "コミュニティ問い集、ライブ会話カード、Substackコメント促進テンプレートにできる。",
      practiceTomorrow: "記事か投稿の最後に、正解のない問いを1つ置く。",
      knowledgeTags: "会話設計, 問い, 役割設計, 交流, 参加, 発信",
    },
    {
      ...common,
      knowledgeName: "帰り際の余韻と次回導線が、また来たくなる理由を作る",
      oneLineConclusion: "最後の一言、写真、次回予告、共有導線までが体験である。",
      knowledgeOverview: "どれだけ良い時間でも、最後が曖昧だと記憶に残りにくい。集合写真、今日の一言、次回の予定と変化、SubstackやXでの共有導線、また会いましょうの見送りが余韻を作る。完成された巨大ワールドではなく、また来たくなる理由を30日で作ることが大事。",
      todayAction: "次の配信やイベントの最後に言う『また会いましょう』の一言と次回予告を決める。",
      useScene: "ライブ配信の締め、Substack記事末、Podcast概要欄、イベント後投稿、コミュニティ定例会、X共有導線に使う。",
      beginnerExplanation: "終わった後に思い出せる一言や写真、次の楽しみを残すこと。",
      articleIdeas: "帰り際の余韻がコミュニティを育てる / また来たくなる次回導線の作り方",
      podcastIdeas: "最後の一言が記憶を作る / イベント後の余韻設計",
      aiUseSimple: "AIにイベント内容を渡し、締めの一言、次回予告、共有投稿文を作らせる。",
      tagsSimple: "余韻設計, 次回導線, イベント運営, 再訪, Substack",
      summary3Lines: "コミュニティ体験は帰り際まで続く。最後の一言、集合写真、次回予告、共有導線が余韻を作る。余韻があると、参加者はただ来た人からまた戻る人へ変わる。",
      coreIdea: "体験は終わり方で記憶になる。",
      top10: "余韻 / 見送り / 集合写真 / 今日の一言 / 次回予告 / 共有導線 / Substack / X / 30日ロードマップ / 再訪",
      publishingUse: "発信やイベントの終わりに、次に戻ってくる理由を設計する。",
      useSubstack: "記事末に次回予告と感想返信の導線を置く。",
      useNote: "イベント後レポートに写真、今日の一言、次回予告を入れる。",
      usePodcast: "エピソードの最後に次回の楽しみを一言入れる。",
      useLive: "締めに集合感、感謝、次回予告、共有導線を入れる。",
      useNotes: "イベント後の余韻を短文で投稿する。",
      useX: "参加後の写真や一言を共有しやすい形にする。",
      useAi: "AIにイベント後投稿、次回告知、参加者へのお礼文を作らせる。",
      contentIdeas: "イベント締め台本、余韻投稿テンプレート、30日コミュニティ設計ロードマップにできる。",
      practiceTomorrow: "次回予告を1つ作り、最後に添える一言を決める。",
      knowledgeTags: "余韻設計, 次回導線, イベント運営, 再訪, Substack, コミュニティ",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addCommunityVillageKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(COMMUNITY_VILLAGE_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("コミュニティは人を集める場所ではなく")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  if (existing) {
    learningAssetSearchQuery = "コミュニティ";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
    if (status) status.textContent = "また来たくなる村コミュニティづくり実践書の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...communityVillageKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  learningAssetSearchQuery = "コミュニティ";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "また来たくなる村コミュニティづくり実践書を知識カードとして4件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function marketingEquationKnowledgeSampleCards() {
  const now = new Date().toISOString();
  const common = {
    date: activeDate,
    sourceType: "PDF",
    title: MARKETING_EQUATION_SAMPLE_TITLE,
    author: "",
    genre: "マーケティング / セールス / 導線設計 / Substack初心者支援",
    rating: "",
    importanceRating: "5",
    practicalRating: "5",
    beginnerRating: "5",
    rereadRating: "5",
    status: "Codex抽出済み",
    contentCounts: { article: 0, podcast: 0, notes: 0, x: 0, kindle: 0, brain: 0 },
    publishedTo: ["Substack", "note", "Podcast", "X", "Notes"],
    connectsTo: ["マーケティング", "セールス", "発信", "信頼構築", "コンテンツ化"],
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...common,
      knowledgeName: "売上はリード、コンバージョン、LTVの掛け算で診断する",
      oneLineConclusion: "売上が伸びない時は新しい手法を足す前に、3つの数字の一番弱いところを直す。",
      knowledgeOverview: "マーケティングの施策をバラバラに追うのではなく、売上を『リード × コンバージョン × LTV』に分解して見る。リードは新しく出会った人の数、コンバージョンはそのうち買ってくれる割合、LTVは一人が生涯で払ってくれる金額。掛け算なので、強い部分をさらに伸ばすより、最も弱い数字を1点改善する方が全体への効果が大きい。",
      todayAction: "Substack初心者支援について、今の詰まりをリード・コンバージョン・LTVのどれか1つに分類する。",
      useScene: "Substack初心者支援の商品設計、無料相談導線、記事からDMへの流れ、PDF教材、Podcast導線、価格をつける前の診断に使う。",
      beginnerExplanation: "売上は気合いや投稿数だけで決まらない。新しく出会う人数、買ってくれる割合、長く関わってくれる金額の3つを分けて見ると、次に直す場所が分かる。",
      articleIdeas: "売上が伸びない時に見る3つの数字 / Substack初心者が最初に整えるべき導線 / 新しい手法より先に弱点を見つける",
      podcastIdeas: "マーケティングを3つの数字で見る / 弱いところを1点直すだけで全体が変わる理由",
      aiUseSimple: "AIに自分の導線を説明し、リード・コンバージョン・LTVのどこが弱いかを診断してもらう。改善案は一番弱い数字に絞って出してもらう。",
      tagsSimple: "マーケティング, 売上の方程式, リード, コンバージョン, LTV, 導線設計, Substack初心者支援",
      summary3Lines: "売上はリード、コンバージョン、LTVの掛け算で見られる。施策を増やす前に、今どの数字が一番弱いかを見つける。掛け算なので、弱いところを少し直す方が全体の伸びにつながりやすい。",
      coreIdea: "強いところを伸ばすより、売上の足を引っ張っている一番弱い数字を直す。",
      top10: "リード / コンバージョン / LTV / 売上の方程式 / 弱点診断 / 導線 / リスト資産 / セールス / 商品設計 / コンテンツ化",
      publishingUse: "記事やPodcastで『どの数字を改善する話か』を明確にして、読者が自分の課題を診断できる内容にする。",
      useSubstack: "読者獲得はリード、無料相談やDM返信はコンバージョン、継続支援や教材化はLTVとして分けて考える。",
      useNote: "初心者向けに3つの数字を図解する記事を書く。",
      usePodcast: "自分の活動を3つの数字に分解して、今どこを実験しているか話す。",
      useLive: "参加者の活動を3つの数字で一緒に診断するミニ相談会にする。",
      useNotes: "今日見直す数字を1つだけ投稿する。",
      useX: "『投稿を増やす前に、どの数字が弱いかを見る』という短文にする。",
      useAi: "AIに『リード・CV・LTVの3分類で、今週の実験案を3つ』と依頼する。",
      contentIdeas: "初心者向け診断シート、3つの数字チェックリスト、無料相談前アンケート、導線改善テンプレートにできる。",
      practiceTomorrow: "Substack初心者支援の現在地を、リード・コンバージョン・LTVそれぞれ10点満点で採点する。",
      practiced: "",
      result: "",
      learning: "",
      nextTrial: "一番点数が低い数字を1つ選び、明日の『今日の一歩』で小さく改善する。",
      knowledgeTags: "売上の方程式, リード, コンバージョン, LTV, 導線診断, Substack初心者支援",
    },
  ].map((card) => normalizeLearningAsset({ ...blankLearningAsset(), ...card, id: crypto.randomUUID() }));
}

function addMarketingEquationKnowledgeSampleCards() {
  const existing = learningAssets.some((item) =>
    String(item.title || "").includes(MARKETING_EQUATION_SAMPLE_TITLE) ||
    String(item.knowledgeName || "").includes("売上はリード")
  );
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  learningAssetSearchQuery = "売上の方程式";
  learningAssetStatusFilter = "all";
  if (existing) {
    renderLearningAssets();
    if (status) status.textContent = "3つの数字で理解するマーケティングの方程式の知識カードはすでにあります。検索結果に表示しました。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...marketingEquationKnowledgeSampleCards(), ...learningAssets];
  saveLearningAssets();
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = "3つの数字で理解するマーケティングの方程式を知識カードとして1件追加しました。";
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function learningAssetSampleKey(item) {
  return normalizeLaterText(`${item.title || ""}::${item.knowledgeName || ""}`);
}

function allKnowledgeSampleCards() {
  return [
    ...firstKnowledgeSampleCards(),
    ...smallBizKnowledgeSampleCards(),
    ...psychologyKnowledgeSampleCards(),
    ...treasureKnowledgeSampleCards(),
    ...ideaKnowledgeSampleCards(),
    ...storyProfileKnowledgeSampleCards(),
    ...conceptDesignKnowledgeSampleCards(),
    ...valueOsKnowledgeSampleCards(),
    ...actionProfileKnowledgeSampleCards(),
    ...copyTargetKnowledgeSampleCards(),
    ...trustCharismaKnowledgeSampleCards(),
    ...threeWeekFunnelKnowledgeSampleCards(),
    ...snsTrustAssetKnowledgeSampleCards(),
    ...sellingCopywritingKnowledgeSampleCards(),
    ...forbiddenWordsKnowledgeSampleCards(),
    ...twelveQuestionsKnowledgeSampleCards(),
    ...socialContributionKnowledgeSampleCards(),
    ...communityVillageKnowledgeSampleCards(),
    ...marketingEquationKnowledgeSampleCards(),
  ];
}

function knowledgeSampleTitles() {
  return new Set([
    FIRST_KNOWLEDGE_SAMPLE_TITLE,
    SMALL_BIZ_SAMPLE_TITLE,
    PSYCHOLOGY_SAMPLE_TITLE,
    TREASURE_SAMPLE_TITLE,
    IDEA_SAMPLE_TITLE,
    STORY_PROFILE_SAMPLE_TITLE,
    CONCEPT_DESIGN_SAMPLE_TITLE,
    VALUE_OS_SAMPLE_TITLE,
    ACTION_PROFILE_SAMPLE_TITLE,
    COPY_TARGET_SAMPLE_TITLE,
    TRUST_CHARISMA_SAMPLE_TITLE,
    THREE_WEEK_FUNNEL_SAMPLE_TITLE,
    SNS_TRUST_ASSET_SAMPLE_TITLE,
    SELLING_COPYWRITING_SAMPLE_TITLE,
    FORBIDDEN_WORDS_SAMPLE_TITLE,
    TWELVE_QUESTIONS_SAMPLE_TITLE,
    SOCIAL_CONTRIBUTION_SAMPLE_TITLE,
    COMMUNITY_VILLAGE_SAMPLE_TITLE,
  ]);
}

function addAllKnowledgeSampleCards() {
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  const existingKeys = new Set(learningAssets.map((item) => learningAssetSampleKey(item)));
  const cardsToAdd = allKnowledgeSampleCards().filter((card) => !existingKeys.has(learningAssetSampleKey(card)));
  learningAssetSearchQuery = "";
  learningAssetStatusFilter = "all";
  if (!cardsToAdd.length) {
    renderLearningAssets();
    if (status) status.textContent = "登録済みの知識カードはすべて揃っています。";
    $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  learningAssets = [...cardsToAdd, ...learningAssets];
  saveLearningAssets();
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = `Knowledge Laboの未登録カードを${cardsToAdd.length}件追加しました。`;
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetKnowledgeSampleCards() {
  const status = $("#learningAssetStatusMessage") || $("#readingLaboTemplateStatus");
  const sampleTitles = knowledgeSampleTitles();
  const userCards = learningAssets.filter((item) => !sampleTitles.has(item.title));
  const sampleCards = allKnowledgeSampleCards();
  learningAssets = [...sampleCards, ...userCards];
  saveLearningAssets();
  learningAssetSearchQuery = "";
  learningAssetStatusFilter = "all";
  closeLearningAssetForm();
  renderLearningAssets();
  if (status) status.textContent = `Knowledge Laboのサンプルカードを${sampleCards.length}件に復旧しました。`;
  $("#learningAssetList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleKnowledgeLaboSeedFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const seed = params.get("seed");
  if (!["concept-book", "smallbiz", "psychology", "treasure", "idea", "story-profile", "concept-design", "value-os", "action-profile", "copy-target", "trust-charisma", "three-week-funnel", "sns-trust-asset", "selling-copywriting", "forbidden-words", "twelve-questions", "social-contribution", "community-village", "marketing-equation", "all-knowledge", "reset-knowledge"].includes(seed)) return;
  showPageEntry("Knowledge Labo");
  if (seed === "concept-book") addFirstKnowledgeSampleCards();
  if (seed === "smallbiz") addSmallBizKnowledgeSampleCards();
  if (seed === "psychology") addPsychologyKnowledgeSampleCards();
  if (seed === "treasure") addTreasureKnowledgeSampleCards();
  if (seed === "idea") addIdeaKnowledgeSampleCards();
  if (seed === "story-profile") addStoryProfileKnowledgeSampleCards();
  if (seed === "concept-design") addConceptDesignKnowledgeSampleCards();
  if (seed === "value-os") addValueOsKnowledgeSampleCards();
  if (seed === "action-profile") addActionProfileKnowledgeSampleCards();
  if (seed === "copy-target") addCopyTargetKnowledgeSampleCards();
  if (seed === "trust-charisma") addTrustCharismaKnowledgeSampleCards();
  if (seed === "three-week-funnel") addThreeWeekFunnelKnowledgeSampleCards();
  if (seed === "sns-trust-asset") addSnsTrustAssetKnowledgeSampleCards();
  if (seed === "selling-copywriting") addSellingCopywritingKnowledgeSampleCards();
  if (seed === "forbidden-words") addForbiddenWordsKnowledgeSampleCards();
  if (seed === "twelve-questions") addTwelveQuestionsKnowledgeSampleCards();
  if (seed === "social-contribution") addSocialContributionKnowledgeSampleCards();
  if (seed === "community-village") addCommunityVillageKnowledgeSampleCards();
  if (seed === "marketing-equation") addMarketingEquationKnowledgeSampleCards();
  if (seed === "all-knowledge") addAllKnowledgeSampleCards();
  if (seed === "reset-knowledge") resetKnowledgeSampleCards();
  params.delete("seed");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState(null, "", nextUrl);
  requestAnimationFrame(() => {
    showPageEntry("Knowledge Labo");
    renderLearningAssets();
  });
}

function learningMatchesSearch(learning, query) {
  if (!query) return true;
  return [
    learning.date,
    learning.source,
    learning.url,
    learning.title,
    learning.summaryLine,
    learning.hook,
    learning.intent,
    learning.learned,
    learning.useForSelf,
    learning.useForPublishing,
    learning.experiment,
    learning.sakuraMemory,
    learning.intro,
    learning.tags,
    learning.memo,
  ]
    .map((value) => normalizeLaterText(value || ""))
    .join(" ")
    .includes(query);
}

function renderLearningGlobalSearch() {
  const resultsPanel = $("#learningGlobalSearchResults");
  const target = $("#learningGlobalSearchList");
  if (!resultsPanel || !target) return;
  const searchField = $("#learningGlobalSearch");
  if (searchField && searchField.value !== learningGlobalSearchQuery) {
    searchField.value = learningGlobalSearchQuery;
  }
  const searchQuery = normalizeLaterText(learningGlobalSearchQuery);
  const results = searchQuery
    ? Object.entries(store).flatMap(([dateKey, day]) =>
        asArray(day?.learnings)
          .filter((learning) =>
            normalizeLaterText(dateKey).includes(searchQuery) ||
            learningMatchesSearch(learning, searchQuery)
          )
          .map((learning) => ({ dateKey, learning }))
      )
    : [];
  const searchCount = $("#learningGlobalSearchCount");
  if (searchCount) {
    searchCount.hidden = !searchQuery;
    searchCount.querySelector("strong").textContent = results.length;
  }
  target.replaceChildren();
  resultsPanel.hidden = !searchQuery;
  if (!searchQuery) return;
  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "全日付の自分の学びに一致する結果はありません。";
    target.append(empty);
    return;
  }
  results.forEach(({ dateKey, learning }) => {
    const button = document.createElement("button");
    button.className = "learning-global-search-result";
    button.type = "button";
    const date = document.createElement("span");
    date.className = "learning-global-search-date";
    date.textContent = formatDateLabel(dateKey);
    const readOnly = document.createElement("span");
    readOnly.className = "learning-global-search-readonly";
    readOnly.textContent = "読み取り専用";
    const meta = document.createElement("span");
    meta.className = "learning-global-search-meta";
    meta.append(date, readOnly);
    const title = document.createElement("strong");
    title.textContent = learning.title || learning.summaryLine || "タイトル未入力の学び";
    const source = document.createElement("span");
    source.textContent = `情報源: ${learning.source || learning.url || "未入力"}`;
    const summary = document.createElement("span");
    summary.textContent = `要約: ${learning.summaryLine || learning.learned || "未入力"}`;
    const tags = document.createElement("span");
    tags.textContent = `タグ: ${learning.tags || "なし"}`;
    const action = document.createElement("span");
    action.className = "learning-global-search-action";
    action.textContent = "この日を開く";
    button.append(meta, title, source, summary, tags, action);
    button.addEventListener("click", () => {
      activeDate = dateKey;
      learningSearchQuery = "";
      $("#activeDate").value = activeDate;
      renderAll();
      $("#learningList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    target.append(button);
  });
}

function renderLearnings() {
  const day = getDay();
  const target = $("#learningList");
  if (!target) return;
  const template = $("#learningTemplate");
  target.replaceChildren();
  const searchField = $("#learningSearch");
  if (searchField && searchField.value !== learningSearchQuery) {
    searchField.value = learningSearchQuery;
  }
  const searchQuery = normalizeLaterText(learningSearchQuery);
  const visibleLearnings = day.learnings.filter((learning) =>
    learningMatchesSearch(learning, searchQuery)
  );
  const searchCount = $("#learningSearchCount");
  if (searchCount) {
    searchCount.hidden = !searchQuery;
    searchCount.querySelector("strong").textContent = visibleLearnings.length;
  }
  if (!visibleLearnings.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = searchQuery
      ? "検索に一致する学びはありません。"
      : "自分の学びはまだありません。";
    target.append(empty);
    return;
  }
  visibleLearnings.forEach((learning) => {
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
    const memoryStatus = row.querySelector(".learning-memory-status");
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
    row.querySelector(".add-learning-memory").addEventListener("click", () => {
      const result = upsertLearningMemory(learning, activeDate);
      if (result.status === "empty") {
        memoryStatus.textContent = "「さくらに残したいこと」を入力してください。";
        return;
      }
      if (result.status === "missing-id") {
        memoryStatus.textContent = "この学びには識別情報がないため追加できません。";
        return;
      }
      memoryStatus.textContent = result.status === "updated" ? "更新しました。" : "追加しました。";
      renderMemoryLayer();
      renderMemoryLibrary();
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

const substackFields = {
  articleTitle: "#substackArticleTitle",
  articlePublished: "#substackArticlePublished",
  quoteRestacks: "#substackQuoteRestacks",
  newSubscribers: "#substackNewSubscribers",
  totalFollowers: "#substackTotalFollowers",
  didArticle: "#substackDidArticle",
  didNotes: "#substackDidNotes",
  didComments: "#substackDidComments",
  didMorningStack: "#substackDidMorningStack",
  didLive: "#substackDidLive",
  insight: "#substackInsight",
  todayArticleTheme: "#substackTodayArticleTheme",
  todayTasks: "#substackTodayTasks",
  todayExperiment: "#substackTodayExperiment",
  stockArticleIdeas: "#substackStockArticleIdeas",
  stockNotesIdeas: "#substackStockNotesIdeas",
  stockSeed: "#substackStockSeed",
};

const notePageConfigs = {
  "note（いつものnote）": {
    pageId: "#noteAiPage",
    storeKey: "noteAiRecovery",
    updatedAtKey: "noteAiRecoveryUpdatedAt",
    title: "note①",
    emptyStatus: "今日のnote①はまだ保存されていません。",
    extraStockKey: "seoQueue",
    fields: {
      articleTitle: "#noteAiArticleTitle",
      articlePublished: "#noteAiArticlePublished",
      views: "#noteAiViews",
      likes: "#noteAiLikes",
      insight: "#noteAiInsight",
      todayArticleTheme: "#noteAiTodayArticleTheme",
      todayTasks: "#noteAiTodayTasks",
      stockArticleIdeas: "#noteAiStockArticleIdeas",
      seoQueue: "#noteAiSeoQueue",
    },
    saveButton: "#saveNoteAi",
    status: "#noteAiStatus",
  },
  "note（Substack初心者向け）": {
    pageId: "#noteBeginnerPage",
    storeKey: "noteSubstackBeginner",
    updatedAtKey: "noteSubstackBeginnerUpdatedAt",
    title: "note②",
    emptyStatus: "今日のnote②はまだ保存されていません。",
    extraStockKey: "commonQuestions",
    fields: {
      articleTitle: "#noteBeginnerArticleTitle",
      articlePublished: "#noteBeginnerArticlePublished",
      views: "#noteBeginnerViews",
      likes: "#noteBeginnerLikes",
      insight: "#noteBeginnerInsight",
      todayArticleTheme: "#noteBeginnerTodayArticleTheme",
      todayTasks: "#noteBeginnerTodayTasks",
      stockArticleIdeas: "#noteBeginnerStockArticleIdeas",
      commonQuestions: "#noteBeginnerCommonQuestions",
    },
    saveButton: "#saveNoteBeginner",
    status: "#noteBeginnerStatus",
  },
};

const xPageV1Fields = {
  yesterdayPost1: "#xPageYesterdayPost1",
  yesterdayPost2: "#xPageYesterdayPost2",
  yesterdayPost3: "#xPageYesterdayPost3",
  post1Impressions: "#xPagePost1Impressions",
  post1Likes: "#xPagePost1Likes",
  post1Engagements: "#xPagePost1Engagements",
  post1DetailClicks: "#xPagePost1DetailClicks",
  post1ProfileAccesses: "#xPagePost1ProfileAccesses",
  post2Impressions: "#xPagePost2Impressions",
  post2Likes: "#xPagePost2Likes",
  post2Engagements: "#xPagePost2Engagements",
  post2DetailClicks: "#xPagePost2DetailClicks",
  post2ProfileAccesses: "#xPagePost2ProfileAccesses",
  post3Impressions: "#xPagePost3Impressions",
  post3Likes: "#xPagePost3Likes",
  post3Engagements: "#xPagePost3Engagements",
  post3DetailClicks: "#xPagePost3DetailClicks",
  post3ProfileAccesses: "#xPagePost3ProfileAccesses",
  followers: "#xPageFollowers",
  insight: "#xPageInsight",
  todayPost1: "#xPageTodayPost1",
  todayPost2: "#xPageTodayPost2",
  todayPost3: "#xPageTodayPost3",
  todayTasks: "#xPageTodayTasks",
  stockPostIdea1: "#xPageStockPostIdea1",
  stockPostIdea2: "#xPageStockPostIdea2",
};

const wordpressPageV1Fields = {
  articleTitle: "#wordpressArticleTitle",
  articlePublished: "#wordpressArticlePublished",
  insight: "#wordpressInsight",
  todayNewArticle: "#wordpressTodayNewArticle",
  todayWritingArticle: "#wordpressTodayWritingArticle",
  todayFixedPage: "#wordpressTodayFixedPage",
  todayPageProgress: "#wordpressTodayPageProgress",
  todayTasks: "#wordpressTodayTasks",
  stockNewArticle: "#wordpressStockNewArticle",
  stockArticleIdeas: "#wordpressStockArticleIdeas",
  stockFixedPage: "#wordpressStockFixedPage",
  stockImprovementIdeas: "#wordpressStockImprovementIdeas",
};

const PUBLISHING_OPS_RECENT_DAYS = 7;
const publishingOpsCountFields = [
  ["notesCount", "ノート投稿数"],
  ["chatCount", "チャット投稿数"],
  ["articleCount", "記事投稿数"],
  ["audioArticleCount", "音声記事投稿数"],
];

const xAnalysisFields = {
  date: "#xAnalysisDate",
  xPost1: "#xAnalysisPost1",
  xPost1Impressions: "#xAnalysisPost1Impressions",
  xPost1Engagements: "#xAnalysisPost1Engagements",
  xPost1DetailClicks: "#xAnalysisPost1DetailClicks",
  xPost1ProfileAccesses: "#xAnalysisPost1ProfileAccesses",
  xPost1FollowDelta: "#xAnalysisPost1FollowDelta",
  xPost1Takeaway: "#xAnalysisPost1Takeaway",
  xPost2: "#xAnalysisPost2",
  xPost2Impressions: "#xAnalysisPost2Impressions",
  xPost2Engagements: "#xAnalysisPost2Engagements",
  xPost2DetailClicks: "#xAnalysisPost2DetailClicks",
  xPost2ProfileAccesses: "#xAnalysisPost2ProfileAccesses",
  xPost2FollowDelta: "#xAnalysisPost2FollowDelta",
  xPost2Takeaway: "#xAnalysisPost2Takeaway",
  xPost3: "#xAnalysisPost3",
  xPost3Impressions: "#xAnalysisPost3Impressions",
  xPost3Engagements: "#xAnalysisPost3Engagements",
  xPost3DetailClicks: "#xAnalysisPost3DetailClicks",
  xPost3ProfileAccesses: "#xAnalysisPost3ProfileAccesses",
  xPost3FollowDelta: "#xAnalysisPost3FollowDelta",
  xPost3Takeaway: "#xAnalysisPost3Takeaway",
  hypothesis: "#xAnalysisHypothesis",
  result: "#xAnalysisResult",
  nextTry: "#xAnalysisNextTry",
};

const codexDailyLogFields = {
  tried: "#codexLogTried",
  learned: "#codexLogLearned",
  people: "#codexLogPeople",
  ai: "#codexLogAi",
  ideas: "#codexLogIdeas",
  experiments: "#codexLogExperiments",
  failures: "#codexLogFailures",
  successes: "#codexLogSuccesses",
  conversations: "#codexLogConversations",
  tomorrow: "#codexLogTomorrow",
  prompt: "#codexDailyLogPrompt",
};

const codexDailyLogLabels = {
  tried: "試したこと",
  learned: "学んだこと",
  people: "人物",
  ai: "AI",
  ideas: "アイデア",
  experiments: "実験",
  failures: "失敗",
  successes: "成功",
  conversations: "会話",
  tomorrow: "明日見たいこと",
};

const publishingOpsTextSections = [
  ["今日の一番の学び", ["yoshidaLearning"]],
  ["明日に活かすこと", ["yoshidaTomorrow"]],
  ["Notes投稿アイデア", ["notesIdeas"]],
  ["Chat投稿アイデア", ["chatIdeas"]],
  ["記事アイデア", ["articleIdeas"]],
  ["運用上の気づき", ["operationFindings"]],
];

function readPublishingOpsForm() {
  return Object.fromEntries(Object.entries(publishingOpsFields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value : ""];
  }));
}

function readSubstackForm() {
  return Object.fromEntries(Object.entries(substackFields).map(([key, selector]) => {
    const field = $(selector);
    if (!field) return [key, defaultSubstack()[key]];
    return [key, field.type === "checkbox" ? field.checked : field.value];
  }));
}

function hasSubstackRecord(rawSubstack, substack) {
  if (!rawSubstack || typeof rawSubstack !== "object") return false;
  return Object.values(substack).some((value) =>
    typeof value === "boolean" ? value : Boolean(String(value || "").trim()));
}

function renderSubstackSaveState(day, confirmation = "") {
  const substack = { ...defaultSubstack(), ...(day?.substack || {}) };
  const saved = Boolean(day?.substackUpdatedAt) || hasSubstackRecord(day?.substack, substack);
  const button = $("#saveSubstack");
  const status = $("#substackStatus");
  const savedAt = formatSavedAt(day?.substackUpdatedAt);
  if (button) button.textContent = saved ? "Substackを更新する" : "Substackを保存・更新する";
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = "今日のSubstackはまだ保存されていません。保存後は同じボタンで更新できます。";
  }
}

function renderSubstack() {
  const day = getDay();
  const substack = { ...defaultSubstack(), ...(day.substack || {}) };
  Object.entries(substackFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field) return;
    if (field.type === "checkbox") {
      field.checked = Boolean(substack[key]);
    } else if (field.value !== String(substack[key] || "")) {
      field.value = substack[key] || "";
    }
  });
  renderSubstackSaveState(day);
}

function saveSubstackFromForm() {
  const day = getDay();
  const wasSaved = Boolean(day.substackUpdatedAt) || hasSubstackRecord(day.substack, { ...defaultSubstack(), ...(day.substack || {}) });
  day.substack = { ...defaultSubstack(), ...readSubstackForm() };
  day.substackUpdatedAt = new Date().toISOString();
  saveStore();
  renderSubstackSaveState(
    day,
    `Substackを${wasSaved ? "更新" : "保存"}しました。最終更新 ${formatSavedAt(day.substackUpdatedAt)}`,
  );
  renderBrainPrototype();
}

function readNotePageForm(config) {
  const defaults = defaultNotePage(config.extraStockKey);
  return Object.fromEntries(Object.entries(config.fields).map(([key, selector]) => {
    const field = $(selector);
    if (!field) return [key, defaults[key]];
    return [key, field.type === "checkbox" ? field.checked : field.value];
  }));
}

function hasNotePageRecord(rawNote, note) {
  if (!rawNote || typeof rawNote !== "object") return false;
  return Object.values(note).some((value) =>
    typeof value === "boolean" ? value : Boolean(String(value || "").trim()));
}

function renderNotePageSaveState(config, day, confirmation = "") {
  const note = { ...defaultNotePage(config.extraStockKey), ...(day?.[config.storeKey] || {}) };
  const saved = Boolean(day?.[config.updatedAtKey]) || hasNotePageRecord(day?.[config.storeKey], note);
  const button = $(config.saveButton);
  const status = $(config.status);
  const savedAt = formatSavedAt(day?.[config.updatedAtKey]);
  if (button) button.textContent = saved ? `${config.title}を更新する` : `${config.title}を保存・更新する`;
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = `${config.emptyStatus} 保存後は同じボタンで更新できます。`;
  }
}

function renderNotePage(config) {
  const day = getDay();
  const note = { ...defaultNotePage(config.extraStockKey), ...(day[config.storeKey] || {}) };
  Object.entries(config.fields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field) return;
    if (field.type === "checkbox") {
      field.checked = Boolean(note[key]);
    } else if (field.value !== String(note[key] || "")) {
      field.value = note[key] || "";
    }
  });
  renderNotePageSaveState(config, day);
}

function renderNotePages() {
  Object.values(notePageConfigs).forEach(renderNotePage);
}

function saveNotePageFromForm(config) {
  const day = getDay();
  const existing = { ...defaultNotePage(config.extraStockKey), ...(day[config.storeKey] || {}) };
  const wasSaved = Boolean(day[config.updatedAtKey]) || hasNotePageRecord(day[config.storeKey], existing);
  day[config.storeKey] = { ...defaultNotePage(config.extraStockKey), ...readNotePageForm(config) };
  day[config.updatedAtKey] = new Date().toISOString();
  saveStore();
  renderNotePageSaveState(
    config,
    day,
    `${config.title}を${wasSaved ? "更新" : "保存"}しました。最終更新 ${formatSavedAt(day[config.updatedAtKey])}`,
  );
  renderBrainPrototype();
}

function readXPageV1Form() {
  return Object.fromEntries(Object.entries(xPageV1Fields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value : defaultXPageV1()[key]];
  }));
}

function hasXPageV1Record(rawXPage, xPage) {
  if (!rawXPage || typeof rawXPage !== "object") return false;
  return Object.values(xPage).some((value) => Boolean(String(value || "").trim()));
}

function renderXPageV1SaveState(day, confirmation = "") {
  const xPage = { ...defaultXPageV1(), ...(day?.xPageV1 || {}) };
  const saved = Boolean(day?.xPageV1UpdatedAt) || hasXPageV1Record(day?.xPageV1, xPage);
  const button = $("#saveXPageV1");
  const status = $("#xPageV1Status");
  const savedAt = formatSavedAt(day?.xPageV1UpdatedAt);
  if (button) button.textContent = saved ? "X Ver.1を更新する" : "X Ver.1を保存・更新する";
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = "今日のX Ver.1はまだ保存されていません。保存後は同じボタンで更新できます。";
  }
}

function renderXPageV1() {
  const day = getDay();
  const xPage = { ...defaultXPageV1(), ...(day.xPageV1 || {}) };
  Object.entries(xPageV1Fields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field && field.value !== String(xPage[key] || "")) {
      field.value = xPage[key] || "";
    }
  });
  renderXPageV1SaveState(day);
}

function saveXPageV1FromForm() {
  const day = getDay();
  const existing = { ...defaultXPageV1(), ...(day.xPageV1 || {}) };
  const wasSaved = Boolean(day.xPageV1UpdatedAt) || hasXPageV1Record(day.xPageV1, existing);
  day.xPageV1 = { ...defaultXPageV1(), ...readXPageV1Form() };
  day.xPageV1UpdatedAt = new Date().toISOString();
  saveStore();
  renderXPageV1SaveState(
    day,
    `X Ver.1を${wasSaved ? "更新" : "保存"}しました。最終更新 ${formatSavedAt(day.xPageV1UpdatedAt)}`,
  );
  renderBrainPrototype();
}

function readWordPressPageV1Form() {
  return Object.fromEntries(Object.entries(wordpressPageV1Fields).map(([key, selector]) => {
    const field = $(selector);
    if (!field) return [key, defaultWordPressPageV1()[key]];
    return [key, field.type === "checkbox" ? field.checked : field.value];
  }));
}

function hasWordPressPageV1Record(rawWordPressPage, wordpressPage) {
  if (!rawWordPressPage || typeof rawWordPressPage !== "object") return false;
  return Object.values(wordpressPage).some((value) =>
    typeof value === "boolean" ? value : Boolean(String(value || "").trim()));
}

function renderWordPressPageV1SaveState(day, confirmation = "") {
  const wordpressPage = { ...defaultWordPressPageV1(), ...(day?.wordpressPageV1 || {}) };
  const saved = Boolean(day?.wordpressPageV1UpdatedAt) || hasWordPressPageV1Record(day?.wordpressPageV1, wordpressPage);
  const button = $("#saveWordPressPageV1");
  const status = $("#wordpressPageV1Status");
  const savedAt = formatSavedAt(day?.wordpressPageV1UpdatedAt);
  if (button) button.textContent = saved ? "WordPress Ver.1を更新する" : "WordPress Ver.1を保存・更新する";
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = "今日のWordPress Ver.1はまだ保存されていません。保存後は同じボタンで更新できます。";
  }
}

function renderWordPressPageV1() {
  const day = getDay();
  const wordpressPage = { ...defaultWordPressPageV1(), ...(day.wordpressPageV1 || {}) };
  Object.entries(wordpressPageV1Fields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field) return;
    if (field.type === "checkbox") {
      field.checked = Boolean(wordpressPage[key]);
    } else if (field.value !== String(wordpressPage[key] || "")) {
      field.value = wordpressPage[key] || "";
    }
  });
  renderWordPressPageV1SaveState(day);
}

function saveWordPressPageV1FromForm() {
  const day = getDay();
  const existing = { ...defaultWordPressPageV1(), ...(day.wordpressPageV1 || {}) };
  const wasSaved = Boolean(day.wordpressPageV1UpdatedAt) || hasWordPressPageV1Record(day.wordpressPageV1, existing);
  day.wordpressPageV1 = { ...defaultWordPressPageV1(), ...readWordPressPageV1Form() };
  day.wordpressPageV1UpdatedAt = new Date().toISOString();
  saveStore();
  renderWordPressPageV1SaveState(
    day,
    `WordPress Ver.1を${wasSaved ? "更新" : "保存"}しました。最終更新 ${formatSavedAt(day.wordpressPageV1UpdatedAt)}`,
  );
  renderBrainPrototype();
}

function shiftDateKey(dateKey, offsetDays) {
  const date = dateKeyToLocalDate(dateKey) || new Date();
  date.setDate(date.getDate() + offsetDays);
  return toDateInputValue(date);
}

function buildRecentPublishingOpsDateKeys(baseDateKey = activeDate) {
  return Array.from({ length: PUBLISHING_OPS_RECENT_DAYS }, (_, index) =>
    shiftDateKey(baseDateKey, -index));
}

function toPublishingOpsNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return 0;
  return Math.floor(number);
}

function cleanPublishingOpsText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function excerptPublishingOpsText(value, maxLength = 56) {
  const text = cleanPublishingOpsText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

function getPublishingOpsTextEntries(ops) {
  return publishingOpsTextSections.flatMap(([label, keys]) => {
    const values = keys
      .map((key) => excerptPublishingOpsText(ops[key]))
      .filter(Boolean);
    return values.length ? [{ label, text: values.join(" / ") }] : [];
  });
}

function getPublishingOpsYoshidaLogStatus(ops) {
  const statuses = [
    ops.yoshidaNoteStatus,
    ops.yoshidaSubstackStatus,
    ops.yoshidaLiveStatus,
  ].map(cleanPublishingOpsText);
  if (statuses.includes("あり")) return "あり";
  if (statuses.includes("なし")) return "なし";
  return "未確認";
}

function hasPublishingOpsRecord(rawOps, ops) {
  if (!rawOps || typeof rawOps !== "object") return false;
  const hasCounts = publishingOpsCountFields.some(([key]) => toPublishingOpsNumber(rawOps[key]) > 0);
  const hasMorningStack = ["できた", "少しできた"].includes(cleanPublishingOpsText(rawOps.morningStackStatus));
  const hasYoshidaLog = [
    rawOps.yoshidaNoteStatus,
    rawOps.yoshidaSubstackStatus,
    rawOps.yoshidaLiveStatus,
  ].map(cleanPublishingOpsText).some((status) => status === "あり" || status === "なし");
  const hasText = getPublishingOpsTextEntries(ops).length > 0;
  return hasCounts || hasMorningStack || hasYoshidaLog || hasText;
}

function buildPublishingOpsRecentFlow(baseDateKey = activeDate) {
  const dateKeys = buildRecentPublishingOpsDateKeys(baseDateKey);
  const summary = {
    notesCount: 0,
    chatCount: 0,
    articleCount: 0,
    audioArticleCount: 0,
    morningStackDoneDays: 0,
  };
  const days = dateKeys.map((dateKey) => {
    const rawOps = store[dateKey]?.publishingOps;
    const ops = { ...defaultPublishingOps(dateKey), ...(rawOps && typeof rawOps === "object" ? rawOps : {}) };
    const counts = Object.fromEntries(publishingOpsCountFields.map(([key]) => [key, toPublishingOpsNumber(ops[key])]));
    publishingOpsCountFields.forEach(([key]) => {
      summary[key] += counts[key];
    });
    if (["できた", "少しできた"].includes(cleanPublishingOpsText(ops.morningStackStatus))) {
      summary.morningStackDoneDays += 1;
    }
    return {
      dateKey,
      counts,
      morningStackStatus: cleanPublishingOpsText(ops.morningStackStatus) || "できなかった",
      yoshidaLogStatus: getPublishingOpsYoshidaLogStatus(ops),
      textEntries: getPublishingOpsTextEntries(ops),
      hasRecord: hasPublishingOpsRecord(rawOps, ops),
    };
  });
  return { dateKeys, summary, days };
}

function createPublishingOpsRecentMetric(label, value) {
  const item = document.createElement("div");
  item.className = "publishing-ops-recent-metric";
  const number = document.createElement("strong");
  number.textContent = String(value);
  const caption = document.createElement("span");
  caption.textContent = label;
  item.append(number, caption);
  return item;
}

function renderPublishingOpsRecentFlow() {
  const range = $("#publishingOpsRecentRange");
  const summaryTarget = $("#publishingOpsRecentSummary");
  const listTarget = $("#publishingOpsRecentList");
  if (!range || !summaryTarget || !listTarget) return;

  const { dateKeys, summary, days } = buildPublishingOpsRecentFlow(activeDate);
  const oldestDateKey = dateKeys[dateKeys.length - 1];
  const newestDateKey = dateKeys[0];
  range.textContent = `${oldestDateKey} 〜 ${newestDateKey}`;

  summaryTarget.replaceChildren(
    createPublishingOpsRecentMetric("ノート投稿数", summary.notesCount),
    createPublishingOpsRecentMetric("チャット投稿数", summary.chatCount),
    createPublishingOpsRecentMetric("記事投稿数", summary.articleCount),
    createPublishingOpsRecentMetric("音声記事投稿数", summary.audioArticleCount),
    createPublishingOpsRecentMetric("おはスタック「できた／少しできた」の日数", summary.morningStackDoneDays),
  );

  const cards = days.map((day) => {
    const card = document.createElement("article");
    card.className = `publishing-ops-recent-card${day.hasRecord ? "" : " is-empty"}`;

    const header = document.createElement("div");
    header.className = "publishing-ops-recent-card-header";
    const title = document.createElement("strong");
    title.textContent = formatDateLabel(day.dateKey);
    const badge = document.createElement("span");
    badge.textContent = day.hasRecord ? "記録あり" : "記録なし";
    header.append(title, badge);

    const counts = document.createElement("dl");
    counts.className = "publishing-ops-recent-counts";
    publishingOpsCountFields.forEach(([key, label]) => {
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = String(day.counts[key]);
      wrapper.append(term, description);
      counts.append(wrapper);
    });

    const statusList = document.createElement("dl");
    statusList.className = "publishing-ops-recent-statuses";
    [
      ["おはスタック状況", day.morningStackStatus],
      ["吉田塾ログ", day.yoshidaLogStatus],
    ].forEach(([label, value]) => {
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      wrapper.append(term, description);
      statusList.append(wrapper);
    });

    card.append(header, counts, statusList);
    if (day.textEntries.length) {
      const texts = document.createElement("div");
      texts.className = "publishing-ops-recent-texts";
      day.textEntries.forEach((entry) => {
        const item = document.createElement("p");
        const label = document.createElement("span");
        label.textContent = entry.label;
        item.append(label, document.createTextNode(entry.text));
        texts.append(item);
      });
      card.append(texts);
    } else if (!day.hasRecord) {
      const empty = document.createElement("p");
      empty.className = "publishing-ops-recent-empty";
      empty.textContent = "記録なし";
      card.append(empty);
    }
    return card;
  });
  listTarget.replaceChildren(...cards);
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
  renderPublishingOpsSaveState(day);
  renderPublishingOpsRecentFlow();
}

function hasSavedPublishingOps(day) {
  const ops = { ...defaultPublishingOps(), ...(day?.publishingOps || {}) };
  return Boolean(day?.publishingOpsUpdatedAt) || hasPublishingOpsRecord(day?.publishingOps, ops);
}

function renderPublishingOpsSaveState(day, confirmation = "") {
  const saved = hasSavedPublishingOps(day);
  const button = $("#savePublishingOps");
  const status = $("#publishingOpsStatus");
  const savedAt = formatSavedAt(day?.publishingOpsUpdatedAt);
  if (button) {
    button.textContent = saved ? "本日の記録を更新する" : "本日の記録を保存する";
  }
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = "本日の発信運営はまだ保存されていません。";
  }
}

function savePublishingOpsFromForm() {
  const day = getDay();
  const wasSaved = hasSavedPublishingOps(day);
  day.publishingOps = { ...defaultPublishingOps(), ...readPublishingOpsForm() };
  day.publishingOpsUpdatedAt = new Date().toISOString();
  saveStore();
  const action = wasSaved ? "更新" : "保存";
  renderPublishingOpsSaveState(
    day,
    `本日の記録を${action}しました。最終更新 ${formatSavedAt(day.publishingOpsUpdatedAt)}`,
  );
  renderPublishingOpsRecentFlow();
  renderOperationExperiment();
}

function hasXAnalysisRecord(rawAnalysis, analysis) {
  if (!rawAnalysis || typeof rawAnalysis !== "object") return false;
  return Object.keys(defaultXAnalysis()).some((key) => key !== "date" && cleanPublishingOpsText(analysis[key]));
}

function hasSavedXAnalysis(day) {
  const analysis = { ...defaultXAnalysis(), ...(day?.xAnalysis || {}) };
  return Boolean(day?.xAnalysisUpdatedAt) || hasXAnalysisRecord(day?.xAnalysis, analysis);
}

function renderXAnalysisSaveState(day, confirmation = "") {
  const saved = hasSavedXAnalysis(day);
  const button = $("#saveXAnalysis");
  const status = $("#xAnalysisStatus");
  const savedAt = formatSavedAt(day?.xAnalysisUpdatedAt);
  if (button) {
    button.textContent = saved ? "本日のX分析を更新する" : "本日のX分析を保存する";
  }
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻を表示します。";
  } else {
    status.textContent = "本日のX分析はまだ保存されていません。";
  }
}

function renderXAnalysis() {
  const day = getDay();
  const analysis = { ...defaultXAnalysis(), ...(day.xAnalysis || {}) };
  Object.entries(xAnalysisFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field && field.value !== (analysis[key] || "")) {
      field.value = analysis[key] || "";
    }
  });
  renderXAnalysisSaveState(day);
}

function saveXAnalysisFromForm() {
  const day = getDay();
  const wasSaved = hasSavedXAnalysis(day);
  day.xAnalysis = { ...defaultXAnalysis(), ...readXAnalysisForm() };
  day.xAnalysisUpdatedAt = new Date().toISOString();
  saveStore();
  const action = wasSaved ? "更新" : "保存";
  renderXAnalysisSaveState(day, `本日のX分析を${action}しました。最終更新 ${formatSavedAt(day.xAnalysisUpdatedAt)}`);
}

function readCodexDailyLogForm() {
  return Object.fromEntries(Object.entries(codexDailyLogFields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value : ""];
  }));
}

function normalizeCodexDailyLog(log) {
  return { ...defaultCodexDailyLog(), ...(log && typeof log === "object" ? log : {}) };
}

function buildCodexDailyLogPrompt(day = getDay(), log = normalizeCodexDailyLog(day.codexDailyLog)) {
  const reflection = day.reflection || {};
  const sectionText = Object.entries(codexDailyLogLabels)
    .map(([key, label]) => `## ${label}\n${String(log[key] || "").trim() || "-"}`
    )
    .join("\n\n");
  const reflectionText = [
    ["今日できたこと", reflection.didToday],
    ["困ったこと", reflection.blockedToday],
    ["明日やること", reflection.tomorrowPlan],
  ]
    .map(([label, value]) => `## ${label}\n${String(value || "").trim() || "-"}`)
    .join("\n\n");

  return `以下は ${activeDate} の終わりの記録です。
Obsidianの「06 デイリーログ」に日次ログとして追加し、必要なものは発信戦略KBにもつないでください。

分類してほしい項目：
- 試したこと
- 学んだこと
- 人物
- AI
- アイデア
- 実験
- 失敗
- 成功
- 会話

ルール：
- 事実と解釈を分けてください。
- あとから検索しやすいように tags と aliases を付けてください。
- 関連する既存ノートがあれば [[リンク]] でつないでください。
- 新しいノートが必要なら作ってください。
- 日次ログには、今日の要約と各分類へのリンクを残してください。
- 記事化はせず、Obsidian用の記録にしてください。

# ダッシュボード内の振り返り

${reflectionText}

# Codexへ渡す分類済み素材

${sectionText}`;
}

function renderCodexDailyLogStatus(day, confirmation = "") {
  const status = $("#codexDailyLogStatus");
  if (!status) return;
  const savedAt = formatSavedAt(day?.codexDailyLogUpdatedAt);
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}`;
  } else if (String(day?.codexDailyLog?.prompt || "").trim()) {
    status.textContent = "まとめ作成済みです。コピーしてCodexへ渡せます。";
  } else {
    status.textContent = "まだまとめを作っていません。";
  }
}

function renderCodexDailyLog(day = getDay(), confirmation = "") {
  const log = normalizeCodexDailyLog(day.codexDailyLog);
  Object.entries(codexDailyLogFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field || document.activeElement === field) return;
    if (field.value !== (log[key] || "")) {
      field.value = log[key] || "";
    }
  });
  renderCodexDailyLogStatus(day, confirmation);
}

function saveCodexDailyLogFromForm({ buildPrompt = false } = {}) {
  const day = getDay();
  const formLog = normalizeCodexDailyLog(readCodexDailyLogForm());
  if (buildPrompt) {
    formLog.prompt = buildCodexDailyLogPrompt(day, formLog);
  }
  day.codexDailyLog = formLog;
  day.codexDailyLogUpdatedAt = new Date().toISOString();
  saveStore();
  renderCodexDailyLog(day, buildPrompt
    ? `Codex用まとめを作りました。最終更新 ${formatSavedAt(day.codexDailyLogUpdatedAt)}`
    : "");
  return day.codexDailyLog;
}

async function copyCodexDailyLogPrompt() {
  const log = saveCodexDailyLogFromForm({ buildPrompt: true });
  const text = String(log.prompt || "").trim();
  if (!text) return;
  try {
    await copySnapshotText(text);
    renderCodexDailyLogStatus(getDay(), `Codex用まとめをコピーしました（約${Math.round(text.length / 1000)}千文字）。`);
  } catch (error) {
    renderCodexDailyLogStatus(getDay(), "コピーできませんでした。欄の文章を手動でコピーしてください。");
  }
}

const operationExperimentDefinitionFields = {
  name: "#operationExperimentName",
  status: "#operationExperimentStatus",
  startDate: "#operationExperimentStartDate",
  endDate: "#operationExperimentEndDate",
  purpose: "#operationExperimentPurpose",
};

const operationExperimentLogFields = {
  execution: "#operationExperimentExecution",
  reaction: "#operationExperimentReaction",
  observation: "#operationExperimentObservation",
  subscribers: "#operationExperimentSubscribers",
  replies: "#operationExperimentReplies",
  restacks: "#operationExperimentRestacks",
  otherReactions: "#operationExperimentOtherReactions",
};

const operationExperimentExecutionLabels = {
  done: "できた",
  partial: "一部できた",
  "not-done": "しなかった",
};

const operationExperimentReactionLabels = {
  low: "少ない",
  usual: "いつも通り",
  high: "多い",
};

function getCurrentOperationExperiment() {
  return operationExperimentStore.experiments.find((experiment) => experiment.status === "active") ||
    operationExperimentStore.experiments[0] || null;
}

function getOperationExperimentLog(dateKey, experimentId) {
  return {
    ...blankOperationExperimentLog(),
    ...(operationExperimentStore.dailyLogs?.[dateKey]?.[experimentId] || {}),
  };
}

function getCurrentNotesCountForExperiment() {
  const field = $(publishingOpsFields.notesCount);
  return field ? field.value : (getDay().publishingOps?.notesCount ?? "");
}

function renderOperationExperimentRecent(experiment) {
  const target = $("#operationExperimentRecentList");
  if (!target || !experiment) return;
  const rows = buildRecentPublishingOpsDateKeys(activeDate).map((dateKey) => {
    const log = getOperationExperimentLog(dateKey, experiment.id);
    const rawLog = operationExperimentStore.dailyLogs?.[dateKey]?.[experiment.id];
    const notesCount = rawLog?.notesCount ?? store[dateKey]?.publishingOps?.notesCount ?? "";
    const row = document.createElement("div");
    row.className = `operation-experiment-recent-row${rawLog ? "" : " is-empty"}`;
    const date = document.createElement("strong");
    date.textContent = formatDateLabel(dateKey);
    const notes = document.createElement("span");
    notes.textContent = `Notes ${notesCount === "" ? "-" : notesCount}件`;
    const execution = document.createElement("span");
    execution.textContent = operationExperimentExecutionLabels[log.execution] || "実施 未記録";
    const reaction = document.createElement("span");
    reaction.textContent = operationExperimentReactionLabels[log.reaction] || "反応 不明";
    const observation = document.createElement("strong");
    observation.textContent = log.observation || "記録なし";
    row.append(date, notes, execution, reaction, observation);
    return row;
  });
  target.replaceChildren(...rows);
}

function renderOperationExperiment() {
  const experiment = getCurrentOperationExperiment();
  if (!experiment) return;
  Object.entries(operationExperimentDefinitionFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field) field.value = experiment[key] || "";
  });
  const log = getOperationExperimentLog(activeDate, experiment.id);
  Object.entries(operationExperimentLogFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field) field.value = log[key] ?? "";
  });
  const notesCount = getCurrentNotesCountForExperiment();
  $("#operationExperimentDate").textContent = formatDateLabel(activeDate);
  $("#operationExperimentNotesCount").textContent = `発信運営のノート投稿数: ${notesCount === "" ? "未記録" : `${notesCount}件`}`;
  $("#operationExperimentStatusMessage").textContent = "今日の実験を記録できます。";
  renderOperationExperimentRecent(experiment);
}

function saveOperationExperimentFromForm() {
  const experiment = getCurrentOperationExperiment();
  if (!experiment) return;
  Object.entries(operationExperimentDefinitionFields).forEach(([key, selector]) => {
    experiment[key] = $(selector)?.value || "";
  });
  const log = Object.fromEntries(Object.entries(operationExperimentLogFields).map(([key, selector]) =>
    [key, $(selector)?.value || ""]));
  log.notesCount = getCurrentNotesCountForExperiment();
  log.updatedAt = new Date().toISOString();
  operationExperimentStore.dailyLogs[activeDate] ||= {};
  operationExperimentStore.dailyLogs[activeDate][experiment.id] = log;
  saveOperationExperimentStore();
  $("#operationExperimentStatusMessage").textContent = "保存済みです。";
  renderOperationExperimentRecent(experiment);
}

function readXAnalysisForm() {
  return Object.fromEntries(Object.entries(xAnalysisFields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value : ""];
  }));
}

function readPublishingSeedCandidateForm() {
  return {
    originalTopic: $("#publishingSeedCandidateTopic")?.value.trim() || "",
    summary: $("#publishingSeedCandidateSummary")?.value.trim() || "",
    reason: $("#publishingSeedCandidateReason")?.value.trim() || "",
    sourceName: $("#publishingSeedCandidateSourceName")?.value.trim() || "",
    sourceUrl: $("#publishingSeedCandidateSourceUrl")?.value.trim() || "",
    fetchedDate: $("#publishingSeedCandidateFetchedDate")?.value || activeDate,
  };
}

function clearPublishingSeedCandidateForm() {
  [
    "#publishingSeedCandidateTopic",
    "#publishingSeedCandidateSummary",
    "#publishingSeedCandidateReason",
    "#publishingSeedCandidateSourceName",
    "#publishingSeedCandidateSourceUrl",
  ].forEach((selector) => {
    const field = $(selector);
    if (field) field.value = "";
  });
  const fetchedDate = $("#publishingSeedCandidateFetchedDate");
  if (fetchedDate) fetchedDate.value = activeDate;
}

function publishingSeedCandidateSummaryText(candidate) {
  return [candidate.originalTopic, candidate.summary, candidate.reason, candidate.sourceName]
    .filter(Boolean)
    .join(" ");
}

function linkPublishingSeedRecords() {
  if (!Array.isArray(publishingSeeds) || !Array.isArray(publishingSeedCandidates)) return;
  const candidatesById = new Map(publishingSeedCandidates.map((candidate) => [candidate.id, candidate]));
  publishingSeeds.forEach((seed) => {
    seed.candidateIds = [...new Set([...(seed.candidateIds || []), seed.seedCandidateId].filter(Boolean))];
    seed.candidateIds.forEach((candidateId) => {
      const candidate = candidatesById.get(candidateId);
      if (!candidate) return;
      candidate.seedIds = [...new Set([...(candidate.seedIds || []), seed.id])];
      if (candidate.status !== "見送り") candidate.status = "Seed化";
    });
  });
}

function filteredPublishingSeedCandidates() {
  return [...publishingSeedCandidates]
    .filter((candidate) => publishingSeedCandidateStatusFilter === "all" || candidate.status === publishingSeedCandidateStatusFilter)
    .sort((left, right) => String(right.fetchedDate || right.createdAt).localeCompare(String(left.fetchedDate || left.createdAt)));
}

function updatePublishingSeedCandidateSummary() {
  const total = $("#publishingSeedCandidateTotalCount");
  const unchecked = $("#publishingSeedCandidateUncheckedCount");
  const seeded = $("#publishingSeedCandidateSeededCount");
  const skipped = $("#publishingSeedCandidateSkippedCount");
  if (total) total.textContent = publishingSeedCandidates.length;
  if (unchecked) unchecked.textContent = publishingSeedCandidates.filter((candidate) => candidate.status === "未確認").length;
  if (seeded) seeded.textContent = publishingSeedCandidates.filter((candidate) => candidate.status === "Seed化").length;
  if (skipped) skipped.textContent = publishingSeedCandidates.filter((candidate) => candidate.status === "見送り").length;
}

function publishingSeedCandidateIsDecided(candidate) {
  return candidate.status === "Seed化" || candidate.status === "見送り";
}

function publishingSeedCandidateSeededLabel(candidate) {
  return candidate.seedIds?.length ? "Seed化済み" : "Seed未作成";
}

function publishingSeedCandidateDecisionLabel(candidate) {
  if (candidate.status === "Seed化") return "採用";
  if (candidate.status === "見送り") return "不採用";
  return "未確認";
}

function findPublishingSeed(id) {
  return publishingSeeds.find((seed) => seed.id === id) || null;
}

function findPublishingSeedCandidate(id) {
  return publishingSeedCandidates.find((candidate) => candidate.id === id) || null;
}

function publishingSeedDisplayTitle(seed) {
  return seed?.title || publishingSeedExcerpt(seed?.personalTake || seed?.originalTheme || seed?.summary, 48) || "無題のSeed";
}

function publishingSeedCandidateDisplayTitle(candidate) {
  return candidate?.originalTopic || publishingSeedExcerpt(candidate?.summary, 54) || "無題の候補";
}

function ensurePublishingSeedCandidateLink(seed, candidate, decisionNote = "") {
  if (!seed || !candidate) return;
  seed.candidateIds = [...new Set([...(seed.candidateIds || []), candidate.id])];
  if (!seed.seedCandidateId) seed.seedCandidateId = candidate.id;
  candidate.seedIds = [...new Set([...(candidate.seedIds || []), seed.id])];
  if (decisionNote) candidate.decisionNote = decisionNote;
  candidate.status = "Seed化";
  candidate.collapsed = true;
  const now = new Date().toISOString();
  seed.updatedAt = now;
  candidate.updatedAt = now;
}

function setPublishingSeedCandidateStatus(candidate, status) {
  if (!PUBLISHING_SEED_CANDIDATE_STATUSES.includes(status)) return;
  candidate.status = status;
  if (publishingSeedCandidateIsDecided(candidate)) {
    candidate.collapsed = true;
  }
  candidate.updatedAt = new Date().toISOString();
  if (activePublishingSeedCandidateId === candidate.id && status !== "未確認") {
    activePublishingSeedCandidateId = "";
  }
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
}

function togglePublishingSeedCandidateCollapsed(candidate) {
  if (!publishingSeedCandidateIsDecided(candidate)) return;
  candidate.collapsed = !candidate.collapsed;
  candidate.updatedAt = new Date().toISOString();
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
}

function setPublishingSeedActiveView(view) {
  publishingSeedActiveView = view === "seed" ? "seed" : "news";
  const newsPanel = $("#publishing-seed-candidates");
  const seedPanel = $("#publishing-seeds");
  const newsTab = $("#publishingSeedNewsTab");
  const seedTab = $("#publishingSeedSeedsTab");
  if (newsPanel) newsPanel.hidden = publishingSeedActiveView !== "news";
  if (seedPanel) seedPanel.hidden = publishingSeedActiveView !== "seed";
  newsTab?.classList.toggle("is-active", publishingSeedActiveView === "news");
  seedTab?.classList.toggle("is-active", publishingSeedActiveView === "seed");
  newsTab?.setAttribute("aria-pressed", String(publishingSeedActiveView === "news"));
  seedTab?.setAttribute("aria-pressed", String(publishingSeedActiveView === "seed"));
}

function createSeedFromCandidate(candidate, personalTake) {
  const take = String(personalTake || "").trim();
  const status = $("#publishingSeedCandidateStatus");
  if (!take) {
    if (status) status.textContent = "自分の一言を入れるとSeedsへ保存できます。";
    return;
  }
  const now = new Date().toISOString();
  const seed = normalizePublishingSeed({
    ...blankPublishingSeed(),
    title: candidate.originalTopic || publishingSeedExcerpt(candidate.summary, 42) || "Seed候補から保存",
    summary: candidate.summary,
    themeName: candidate.sourceName,
    originalTheme: [
      candidate.originalTopic,
      candidate.summary ? `要点: ${candidate.summary}` : "",
      candidate.reason ? `選定理由: ${candidate.reason}` : "",
    ].filter(Boolean).join("\n"),
    personalTake: take,
    tags: [candidate.sourceName, "Seed候補"].filter(Boolean).join(", "),
    savedDate: activeDate,
    status: "種",
    source: candidate.sourceName,
    sourceUrl: candidate.sourceUrl,
    seedCandidateId: candidate.id,
    candidateIds: [candidate.id],
    createdAt: now,
    updatedAt: now,
  });
  publishingSeeds.unshift(seed);
  ensurePublishingSeedCandidateLink(seed, candidate, take);
  activePublishingSeedCandidateId = "";
  savePublishingSeeds();
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
  renderPublishingSeeds();
  if (status) status.textContent = "候補をSeedsへ保存しました。";
}

function addCandidateToExistingSeed(candidate, seedId, decisionNote) {
  const status = $("#publishingSeedCandidateStatus");
  const seed = findPublishingSeed(seedId);
  const note = String(decisionNote || "").trim();
  if (!seed) {
    if (status) status.textContent = "追加先のSeedを選んでください。";
    return;
  }
  ensurePublishingSeedCandidateLink(seed, candidate, note);
  if (note) {
    seed.personalTake = [seed.personalTake, `追加メモ: ${note}`].filter(Boolean).join("\n");
  }
  activePublishingSeedCandidateId = "";
  savePublishingSeeds();
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
  renderPublishingSeeds();
  if (status) status.textContent = "既存のSeedへニュースを追加しました。";
}

function updatePublishingSeedCandidateFromEdit(candidate, form) {
  candidate.originalTopic = form.querySelector("[data-candidate-edit='originalTopic']")?.value.trim() || "";
  candidate.summary = form.querySelector("[data-candidate-edit='summary']")?.value.trim() || "";
  candidate.reason = form.querySelector("[data-candidate-edit='reason']")?.value.trim() || "";
  candidate.sourceName = form.querySelector("[data-candidate-edit='sourceName']")?.value.trim() || "";
  candidate.sourceUrl = form.querySelector("[data-candidate-edit='sourceUrl']")?.value.trim() || "";
  candidate.fetchedDate = form.querySelector("[data-candidate-edit='fetchedDate']")?.value || activeDate;
  candidate.decisionNote = form.querySelector("[data-candidate-edit='decisionNote']")?.value.trim() || "";
  candidate.updatedAt = new Date().toISOString();
  editingPublishingSeedCandidateId = "";
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
  renderPublishingSeeds();
}

function deletePublishingSeedCandidate(candidate) {
  if (!candidate) return;
  if (!confirm("このSeed候補を削除します。よろしいですか？")) return;
  publishingSeeds.forEach((seed) => {
    seed.candidateIds = (seed.candidateIds || []).filter((id) => id !== candidate.id);
    if (seed.seedCandidateId === candidate.id) seed.seedCandidateId = "";
    seed.updatedAt = new Date().toISOString();
  });
  publishingSeedCandidates = publishingSeedCandidates.filter((item) => item.id !== candidate.id);
  if (activePublishingSeedCandidateId === candidate.id) activePublishingSeedCandidateId = "";
  if (editingPublishingSeedCandidateId === candidate.id) editingPublishingSeedCandidateId = "";
  savePublishingSeeds();
  savePublishingSeedCandidates();
  renderPublishingSeedCandidates();
  renderPublishingSeeds();
}

function createPublishingSeedCandidateCard(candidate) {
  const card = document.createElement("article");
  card.className = `publishing-seed-candidate-card status-${candidate.status}`;

  if (editingPublishingSeedCandidateId === candidate.id) {
    candidate.collapsed = false;
    const form = document.createElement("form");
    form.className = "publishing-seed-candidate-edit-form";
    const fields = [
      ["originalTopic", "ニュースタイトル", "input", candidate.originalTopic],
      ["summary", "要点", "textarea", candidate.summary],
      ["reason", "選定理由", "textarea", candidate.reason],
      ["sourceName", "出典名", "input", candidate.sourceName],
      ["sourceUrl", "出典URL", "input", candidate.sourceUrl],
      ["fetchedDate", "取得日", "date", candidate.fetchedDate || activeDate],
      ["decisionNote", "判断メモ", "textarea", candidate.decisionNote],
    ];
    fields.forEach(([key, labelText, type, value]) => {
      const label = document.createElement("label");
      label.textContent = labelText;
      const field = document.createElement(type === "textarea" ? "textarea" : "input");
      field.dataset.candidateEdit = key;
      if (type !== "textarea") field.type = type;
      field.value = value || "";
      if (type === "textarea") field.rows = key === "decisionNote" ? 3 : 4;
      label.append(field);
      form.append(label);
    });
    const actions = document.createElement("div");
    actions.className = "publishing-seed-candidate-actions";
    const cancelButton = document.createElement("button");
    cancelButton.className = "ghost-button";
    cancelButton.type = "button";
    cancelButton.textContent = "キャンセル";
    cancelButton.addEventListener("click", () => {
      editingPublishingSeedCandidateId = "";
      renderPublishingSeedCandidates();
    });
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "保存";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "削除する";
    deleteButton.addEventListener("click", () => deletePublishingSeedCandidate(candidate));
    actions.append(cancelButton, deleteButton, saveButton);
    form.append(actions);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      updatePublishingSeedCandidateFromEdit(candidate, form);
    });
    card.append(form);
    return card;
  }

  const header = document.createElement("div");
  header.className = "publishing-seed-candidate-card-header";
  const titleBlock = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = candidate.originalTopic || publishingSeedExcerpt(candidate.summary, 54) || "無題の候補";
  const meta = document.createElement("span");
  meta.textContent = `${publishingSeedCandidateDecisionLabel(candidate)} / ${publishingSeedCandidateSeededLabel(candidate)}`;
  titleBlock.append(title, meta);
  header.append(titleBlock);

  if (publishingSeedCandidateIsDecided(candidate) && candidate.collapsed) {
    card.classList.add("is-collapsed");
    const compact = document.createElement("button");
    compact.className = "publishing-seed-candidate-compact";
    compact.type = "button";
    compact.setAttribute("aria-label", "Seed候補の詳細を開く");
    compact.addEventListener("click", () => togglePublishingSeedCandidateCollapsed(candidate));
    const compactTitle = document.createElement("strong");
    compactTitle.textContent = publishingSeedCandidateDisplayTitle(candidate);
    const compactMeta = document.createElement("span");
    compactMeta.textContent = `${publishingSeedCandidateDecisionLabel(candidate)} / ${publishingSeedCandidateSeededLabel(candidate)}`;
    compact.append(compactTitle, compactMeta);
    const compactActions = document.createElement("div");
    compactActions.className = "publishing-seed-candidate-actions";
    const editCompactButton = document.createElement("button");
    editCompactButton.className = "ghost-button";
    editCompactButton.type = "button";
    editCompactButton.textContent = "編集";
    editCompactButton.addEventListener("click", () => {
      editingPublishingSeedCandidateId = candidate.id;
      renderPublishingSeedCandidates();
    });
    const deleteCompactButton = document.createElement("button");
    deleteCompactButton.className = "delete-button";
    deleteCompactButton.type = "button";
    deleteCompactButton.textContent = "削除する";
    deleteCompactButton.addEventListener("click", () => deletePublishingSeedCandidate(candidate));
    compactActions.append(editCompactButton, deleteCompactButton);
    card.replaceChildren(compact, compactActions);
    return card;
  }

  const summary = document.createElement("section");
  summary.className = "publishing-seed-candidate-summary";
  const summaryLabel = document.createElement("span");
  summaryLabel.className = "publishing-seed-candidate-field-label";
  summaryLabel.textContent = "要点";
  const summaryBody = document.createElement("p");
  summaryBody.textContent = candidate.summary || "要点はまだありません。";
  summary.append(summaryLabel, summaryBody);

  const reason = document.createElement("section");
  reason.className = "publishing-seed-candidate-reason";
  const reasonLabel = document.createElement("span");
  reasonLabel.className = "publishing-seed-candidate-field-label";
  reasonLabel.textContent = "選定理由";
  const reasonBody = document.createElement("p");
  reasonBody.textContent = candidate.reason || "選定理由はまだありません。";
  reason.append(reasonLabel, reasonBody);

  const source = document.createElement("div");
  source.className = "publishing-seed-candidate-source";
  const sourceName = document.createElement("span");
  sourceName.textContent = candidate.sourceName || "出典未設定";
  source.append(sourceName);
  if (candidate.sourceUrl) {
    const link = document.createElement("a");
    link.href = candidate.sourceUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "出典を開く";
    source.append(link);
  }

  const date = document.createElement("p");
  date.className = "publishing-seed-candidate-date";
  date.textContent = `日付: ${candidate.fetchedDate || "-"}`;

  const decision = document.createElement("div");
  decision.className = "publishing-seed-candidate-decision";
  const decisionStatus = document.createElement("span");
  decisionStatus.textContent = `判断: ${publishingSeedCandidateDecisionLabel(candidate)}`;
  const decisionSeeds = document.createElement("span");
  const linkedSeedTitles = (candidate.seedIds || [])
    .map((id) => findPublishingSeed(id))
    .filter(Boolean)
    .map(publishingSeedDisplayTitle);
  decisionSeeds.textContent = linkedSeedTitles.length ? `関連Seed: ${linkedSeedTitles.join(" / ")}` : "関連Seed: なし";
  decision.append(decisionStatus, decisionSeeds);
  if (candidate.decisionNote) {
    const note = document.createElement("p");
    note.textContent = `判断メモ: ${candidate.decisionNote}`;
    decision.append(note);
  }

  const actions = document.createElement("div");
  actions.className = "publishing-seed-candidate-actions";
  const editButton = document.createElement("button");
  editButton.className = "ghost-button";
  editButton.type = "button";
  editButton.textContent = "編集";
  editButton.addEventListener("click", () => {
    editingPublishingSeedCandidateId = candidate.id;
    activePublishingSeedCandidateId = "";
    renderPublishingSeedCandidates();
  });
  const seedButton = document.createElement("button");
  seedButton.className = "ghost-button";
  seedButton.type = "button";
  seedButton.textContent = candidate.status === "Seed化" ? "Seed化済み" : "Seedにする";
  seedButton.disabled = candidate.status === "Seed化";
  seedButton.addEventListener("click", () => {
    activePublishingSeedCandidateId = activePublishingSeedCandidateId === candidate.id ? "" : candidate.id;
    renderPublishingSeedCandidates();
  });
  const skipButton = document.createElement("button");
  skipButton.className = "ghost-button";
  skipButton.type = "button";
  skipButton.textContent = candidate.status === "見送り" ? "未確認に戻す" : "見送る";
  skipButton.addEventListener("click", () => setPublishingSeedCandidateStatus(candidate, candidate.status === "見送り" ? "未確認" : "見送り"));
  const collapseButton = document.createElement("button");
  collapseButton.className = "ghost-button";
  collapseButton.type = "button";
  collapseButton.textContent = publishingSeedCandidateIsDecided(candidate) ? "折りたたむ" : "あとで折りたたむ";
  collapseButton.disabled = !publishingSeedCandidateIsDecided(candidate);
  collapseButton.addEventListener("click", () => togglePublishingSeedCandidateCollapsed(candidate));
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "削除する";
  deleteButton.addEventListener("click", () => deletePublishingSeedCandidate(candidate));
  actions.append(editButton, seedButton, skipButton, collapseButton, deleteButton);

  card.append(header, summary, reason, source, date);
  if (publishingSeedCandidateIsDecided(candidate)) card.append(decision);
  card.append(actions);

  if (activePublishingSeedCandidateId === candidate.id && candidate.status !== "Seed化") {
    const convert = document.createElement("div");
    convert.className = "publishing-seed-candidate-convert";
    const label = document.createElement("label");
    label.textContent = "自分の一言";
    const textarea = document.createElement("textarea");
    textarea.rows = 4;
    textarea.placeholder = "これは自分ならこう考える、という反応";
    label.append(textarea);
    const saveRow = document.createElement("div");
    saveRow.className = "publishing-seed-candidate-convert-actions";
    const cancelButton = document.createElement("button");
    cancelButton.className = "ghost-button";
    cancelButton.type = "button";
    cancelButton.textContent = "閉じる";
    cancelButton.addEventListener("click", () => {
      activePublishingSeedCandidateId = "";
      renderPublishingSeedCandidates();
    });
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "新しいSeedを作る";
    saveButton.addEventListener("click", () => createSeedFromCandidate(candidate, textarea.value));
    saveRow.append(cancelButton, saveButton);

    const existingLabel = document.createElement("label");
    existingLabel.textContent = "既存のSeedに追加";
    const seedSelect = document.createElement("select");
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "追加先を選ぶ";
    seedSelect.append(emptyOption);
    filteredPublishingSeeds().forEach((seed) => {
      const option = document.createElement("option");
      option.value = seed.id;
      option.textContent = publishingSeedDisplayTitle(seed);
      seedSelect.append(option);
    });
    existingLabel.append(seedSelect);
    const addExistingButton = document.createElement("button");
    addExistingButton.type = "button";
    addExistingButton.textContent = "既存Seedに追加";
    addExistingButton.addEventListener("click", () => addCandidateToExistingSeed(candidate, seedSelect.value, textarea.value));
    saveRow.append(addExistingButton);
    convert.append(label, existingLabel, saveRow);
    card.append(convert);
    setTimeout(() => textarea.focus(), 0);
  }

  return card;
}

function renderPublishingSeedCandidates() {
  const target = $("#publishingSeedCandidateList");
  if (!target) return;
  updatePublishingSeedCandidateSummary();
  const fetchedDate = $("#publishingSeedCandidateFetchedDate");
  if (fetchedDate && !fetchedDate.value) fetchedDate.value = activeDate;
  const candidates = filteredPublishingSeedCandidates();
  const count = $("#publishingSeedCandidateSearchCount");
  if (count) count.textContent = `${candidates.length}件表示`;
  if (!candidates.length) {
    const empty = document.createElement("div");
    empty.className = "publishing-seed-candidate-empty";
    const title = document.createElement("strong");
    title.textContent = publishingSeedCandidates.length ? "この状態の候補はありません。" : "まだSeed候補はありません。";
    const message = document.createElement("p");
    message.textContent = publishingSeedCandidates.length
      ? "状態フィルターを変えると、別の候補を確認できます。"
      : "手動入力かJSON取り込みで、まず候補を並べられます。気になったものだけSeedsへ送ります。";
    empty.append(title, message);
    target.replaceChildren(empty);
    return;
  }
  target.replaceChildren(...candidates.map(createPublishingSeedCandidateCard));
}

function savePublishingSeedCandidateFromForm(event) {
  event?.preventDefault();
  const values = readPublishingSeedCandidateForm();
  const status = $("#publishingSeedCandidateStatus");
  if (!values.originalTopic && !values.summary && !values.reason) {
    if (status) status.textContent = "元の話題、要点、選定理由のどれかを入れると候補にできます。";
    return;
  }
  const now = new Date().toISOString();
  const candidate = normalizePublishingSeedCandidate({
    ...blankPublishingSeedCandidate(),
    ...values,
    createdAt: now,
    updatedAt: now,
  });
  publishingSeedCandidates.unshift(candidate);
  savePublishingSeedCandidates();
  clearPublishingSeedCandidateForm();
  renderPublishingSeedCandidates();
  if (status) status.textContent = "Seed候補を追加しました。";
}

function candidateItemsFromJson(value) {
  const parsed = JSON.parse(value);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.candidates)) return parsed.candidates;
  if (Array.isArray(parsed?.items)) return parsed.items;
  if (Array.isArray(parsed?.results)) return parsed.results;
  if (parsed && typeof parsed === "object") return [parsed];
  return [];
}

function importPublishingSeedCandidatesFromJson() {
  const field = $("#publishingSeedCandidateJson");
  const status = $("#publishingSeedCandidateImportStatus");
  const raw = field?.value.trim() || "";
  if (!raw) {
    if (status) status.textContent = "JSONを貼り付けると取り込めます。";
    return;
  }
  try {
    const now = new Date().toISOString();
    const imported = candidateItemsFromJson(raw)
      .map((item) => normalizePublishingSeedCandidate({ ...item, createdAt: item?.createdAt || now, updatedAt: now }))
      .filter((candidate) => publishingSeedCandidateSummaryText(candidate));
    if (!imported.length) {
      if (status) status.textContent = "取り込める候補が見つかりませんでした。";
      return;
    }
    publishingSeedCandidates = [...imported, ...publishingSeedCandidates];
    savePublishingSeedCandidates();
    renderPublishingSeedCandidates();
    if (field) field.value = "";
    if (status) status.textContent = `${imported.length}件のSeed候補を取り込みました。`;
  } catch (error) {
    if (status) status.textContent = "JSONとして読み取れませんでした。形式を確認してください。";
  }
}

function publishingSeedExcerpt(value, maxLength = 82) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) return "";
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

function publishingSeedTags(value) {
  return String(value || "")
    .split(/[,\s、，]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function readPublishingSeedForm() {
  return {
    title: $("#publishingSeedTitle")?.value.trim() || "",
    summary: $("#publishingSeedSummary")?.value.trim() || "",
    themeName: $("#publishingSeedThemeName")?.value.trim() || "",
    originalTheme: $("#publishingSeedOriginalTheme")?.value.trim() || "",
    personalTake: $("#publishingSeedPersonalTake")?.value.trim() || "",
    tags: $("#publishingSeedTags")?.value.trim() || "",
    status: $("#publishingSeedStatus")?.value || "種",
  };
}

function clearPublishingSeedForm() {
  ["#publishingSeedTitle", "#publishingSeedSummary", "#publishingSeedThemeName", "#publishingSeedOriginalTheme", "#publishingSeedPersonalTake", "#publishingSeedTags"].forEach((selector) => {
    const field = $(selector);
    if (field) field.value = "";
  });
  const status = $("#publishingSeedStatus");
  if (status) status.value = "種";
}

function filteredPublishingSeeds() {
  return [...publishingSeeds]
    .filter((seed) => publishingSeedStatusFilter === "all" || seed.status === publishingSeedStatusFilter)
    .sort((left, right) => String(right.savedDate || right.createdAt).localeCompare(String(left.savedDate || left.createdAt)));
}

function updatePublishingSeedSummary() {
  const total = $("#publishingSeedTotalCount");
  const open = $("#publishingSeedOpenCount");
  const article = $("#publishingSeedArticleCount");
  const hold = $("#publishingSeedHoldCount");
  if (total) total.textContent = publishingSeeds.length;
  if (open) open.textContent = publishingSeeds.filter((seed) => seed.status === "種").length;
  if (article) article.textContent = publishingSeeds.filter((seed) => seed.status === "記事化").length;
  if (hold) hold.textContent = publishingSeeds.filter((seed) => seed.status === "保留").length;
}

function setPublishingSeedStatus(seed, status) {
  if (!PUBLISHING_SEED_STATUSES.includes(status)) return;
  seed.status = status;
  seed.updatedAt = new Date().toISOString();
  savePublishingSeeds();
  renderPublishingSeeds();
}

function setPublishingSeedUsed(seed, used) {
  if (!seed) return;
  const now = new Date().toISOString();
  seed.used = Boolean(used);
  seed.usedAt = seed.used ? now : "";
  seed.updatedAt = now;
  savePublishingSeeds();
  renderPublishingSeeds();
}

function convertPublishingSeedToExperiment(seed) {
  const now = new Date().toISOString();
  const title = seed.title || publishingSeedExcerpt(seed.personalTake || seed.originalTheme, 42) || "Seedsからの記事化";
  const log = normalizeXExperimentLog({
    ...blankXExperimentLog(),
    title,
    postDate: activeDate,
    status: X_EXPERIMENT_STATUSES[1],
    experimentType: X_EXPERIMENT_TYPES[0],
    hypothesis: seed.personalTake || title,
    startReason: ["Seedsから記事化", seed.originalTheme].filter(Boolean).join("\n"),
    experiment: "この種を記事にして、反応と次の仮説を発信実験室で検証する。",
    postContent: seed.personalTake,
    createdAt: now,
    updatedAt: now,
  });
  xExperimentLogs.unshift(log);
  activeXExperimentDetailId = log.id;
  seed.status = "記事化";
  seed.articleExperimentId = log.id;
  seed.updatedAt = now;
  savePublishingSeeds();
  saveXExperimentLogs();
  renderPublishingSeeds();
  renderXExperimentLogs();
  $("#publishing-experiment-lab")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
}

function publishingSeedRelatedCandidates(seed) {
  const ids = new Set([...(seed.candidateIds || []), seed.seedCandidateId].filter(Boolean));
  return publishingSeedCandidates.filter((candidate) => ids.has(candidate.id));
}

function updatePublishingSeedFromEdit(seed, form) {
  seed.title = form.querySelector("[data-seed-edit='title']")?.value.trim() || "";
  seed.summary = form.querySelector("[data-seed-edit='summary']")?.value.trim() || "";
  seed.themeName = form.querySelector("[data-seed-edit='themeName']")?.value.trim() || "";
  seed.originalTheme = form.querySelector("[data-seed-edit='originalTheme']")?.value.trim() || "";
  seed.personalTake = form.querySelector("[data-seed-edit='personalTake']")?.value.trim() || "";
  seed.tags = form.querySelector("[data-seed-edit='tags']")?.value.trim() || "";
  seed.updatedAt = new Date().toISOString();
  editingPublishingSeedId = "";
  savePublishingSeeds();
  renderPublishingSeeds();
}

function mergePublishingSeeds(targetSeed, sourceSeedId) {
  const sourceSeed = findPublishingSeed(sourceSeedId);
  if (!targetSeed || !sourceSeed || targetSeed.id === sourceSeed.id) return;
  targetSeed.title = targetSeed.title || sourceSeed.title;
  targetSeed.summary = [targetSeed.summary, sourceSeed.summary].filter(Boolean).join("\n");
  targetSeed.themeName = targetSeed.themeName || sourceSeed.themeName;
  targetSeed.originalTheme = [targetSeed.originalTheme, sourceSeed.originalTheme].filter(Boolean).join("\n");
  targetSeed.personalTake = [targetSeed.personalTake, sourceSeed.personalTake].filter(Boolean).join("\n");
  targetSeed.tags = [...new Set([...publishingSeedTags(targetSeed.tags), ...publishingSeedTags(sourceSeed.tags)])].join(", ");
  targetSeed.candidateIds = [...new Set([...(targetSeed.candidateIds || []), ...(sourceSeed.candidateIds || []), sourceSeed.seedCandidateId].filter(Boolean))];
  if (sourceSeed.used && !targetSeed.used) {
    targetSeed.used = true;
    targetSeed.usedAt = sourceSeed.usedAt || new Date().toISOString();
  }
  publishingSeedCandidates.forEach((candidate) => {
    if (!candidate.seedIds?.includes(sourceSeed.id)) return;
    candidate.seedIds = [...new Set(candidate.seedIds.map((id) => id === sourceSeed.id ? targetSeed.id : id))];
  });
  publishingSeeds = publishingSeeds.filter((seed) => seed.id !== sourceSeed.id);
  targetSeed.updatedAt = new Date().toISOString();
  mergingPublishingSeedId = "";
  savePublishingSeeds();
  savePublishingSeedCandidates();
  renderPublishingSeeds();
  renderPublishingSeedCandidates();
}

function deletePublishingSeed(seed) {
  if (!seed) return;
  if (!confirm("このSeedを削除します。よろしいですか？")) return;
  publishingSeeds = publishingSeeds.filter((item) => item.id !== seed.id);
  publishingSeedCandidates.forEach((candidate) => {
    candidate.seedIds = (candidate.seedIds || []).filter((id) => id !== seed.id);
    if (candidate.status === "Seed化" && !candidate.seedIds.length) {
      candidate.status = "未確認";
      candidate.collapsed = false;
    }
  });
  editingPublishingSeedId = editingPublishingSeedId === seed.id ? "" : editingPublishingSeedId;
  mergingPublishingSeedId = mergingPublishingSeedId === seed.id ? "" : mergingPublishingSeedId;
  savePublishingSeeds();
  savePublishingSeedCandidates();
  renderPublishingSeeds();
  renderPublishingSeedCandidates();
}

function createPublishingSeedCard(seed) {
  const card = document.createElement("article");
  card.className = `publishing-seed-card status-${seed.status}`;

  if (editingPublishingSeedId === seed.id) {
    const form = document.createElement("form");
    form.className = "publishing-seed-edit-form";
    const fields = [
      ["title", "Seedタイトル", "input", seed.title],
      ["themeName", "テーマ名", "input", seed.themeName],
      ["summary", "要約", "textarea", seed.summary],
      ["originalTheme", "元テーマ", "textarea", seed.originalTheme],
      ["personalTake", "自分の考え・メモ", "textarea", seed.personalTake],
      ["tags", "タグ", "input", seed.tags],
    ];
    fields.forEach(([key, labelText, tagName, value]) => {
      const label = document.createElement("label");
      label.textContent = labelText;
      const field = document.createElement(tagName);
      field.dataset.seedEdit = key;
      field.value = value || "";
      if (tagName === "textarea") field.rows = key === "personalTake" ? 5 : 3;
      label.append(field);
      form.append(label);
    });
    const actions = document.createElement("div");
    actions.className = "publishing-seed-actions";
    const cancelButton = document.createElement("button");
    cancelButton.className = "ghost-button";
    cancelButton.type = "button";
    cancelButton.textContent = "キャンセル";
    cancelButton.addEventListener("click", () => {
      editingPublishingSeedId = "";
      renderPublishingSeeds();
    });
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "保存";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "削除する";
    deleteButton.addEventListener("click", () => deletePublishingSeed(seed));
    actions.append(cancelButton, deleteButton, saveButton);
    form.append(actions);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      updatePublishingSeedFromEdit(seed, form);
    });
    card.append(form);
    return card;
  }

  const header = document.createElement("div");
  header.className = "publishing-seed-card-header";
  const titleBlock = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = publishingSeedDisplayTitle(seed);
  const meta = document.createElement("span");
  meta.textContent = `${seed.savedDate || "-"} / ${seed.status}${seed.themeName ? ` / ${seed.themeName}` : ""}`;
  titleBlock.append(title, meta);
  const status = document.createElement("select");
  status.setAttribute("aria-label", "Seedsの状態");
  PUBLISHING_SEED_STATUSES.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    status.append(item);
  });
  status.value = seed.status;
  status.addEventListener("change", (event) => setPublishingSeedStatus(seed, event.target.value));
  const usedLabel = document.createElement("label");
  usedLabel.className = "publishing-seed-used-check";
  const usedCheck = document.createElement("input");
  usedCheck.type = "checkbox";
  usedCheck.checked = Boolean(seed.used);
  usedCheck.addEventListener("change", (event) => setPublishingSeedUsed(seed, event.target.checked));
  const usedText = document.createElement("span");
  usedText.textContent = seed.used ? `使用済み${seed.usedAt ? ` ${formatSavedAt(seed.usedAt)}` : ""}` : "使用した";
  usedLabel.append(usedCheck, usedText);
  header.append(titleBlock, usedLabel, status);

  const summary = document.createElement("p");
  summary.className = "publishing-seed-summary";
  summary.textContent = seed.summary ? `要約: ${seed.summary}` : "要約はまだありません。";

  const original = document.createElement("p");
  original.className = "publishing-seed-original";
  original.textContent = seed.originalTheme ? `元テーマ: ${seed.originalTheme}` : "元テーマはまだありません。";

  const take = document.createElement("p");
  take.className = "publishing-seed-take";
  take.textContent = seed.personalTake || "自分の一言はまだありません。";

  const tags = document.createElement("div");
  tags.className = "publishing-seed-tags";
  publishingSeedTags(seed.tags).forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    tags.append(item);
  });

  const related = document.createElement("div");
  related.className = "publishing-seed-related";
  const relatedTitle = document.createElement("strong");
  relatedTitle.textContent = "関連ニュース";
  related.append(relatedTitle);
  const relatedList = document.createElement("ul");
  const relatedCandidates = publishingSeedRelatedCandidates(seed);
  if (relatedCandidates.length) {
    relatedCandidates.forEach((candidate) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "text-button";
      button.textContent = publishingSeedCandidateDisplayTitle(candidate);
      button.addEventListener("click", () => {
        candidate.collapsed = false;
        activePublishingSeedCandidateId = "";
        publishingSeedCandidateStatusFilter = "all";
        savePublishingSeedCandidates();
        setPublishingSeedActiveView("news");
        renderPublishingSeedCandidates();
      });
      item.append(button);
      relatedList.append(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "関連づけられたニュースはまだありません。";
    relatedList.append(item);
  }
  related.append(relatedList);

  const actions = document.createElement("div");
  actions.className = "publishing-seed-actions";
  const editButton = document.createElement("button");
  editButton.className = "ghost-button";
  editButton.type = "button";
  editButton.textContent = "編集";
  editButton.addEventListener("click", () => {
    editingPublishingSeedId = seed.id;
    mergingPublishingSeedId = "";
    renderPublishingSeeds();
  });
  const mergeButton = document.createElement("button");
  mergeButton.className = "ghost-button";
  mergeButton.type = "button";
  mergeButton.textContent = "統合";
  mergeButton.disabled = publishingSeeds.length < 2;
  mergeButton.addEventListener("click", () => {
    mergingPublishingSeedId = mergingPublishingSeedId === seed.id ? "" : seed.id;
    renderPublishingSeeds();
  });
  const articleButton = document.createElement("button");
  articleButton.className = "ghost-button";
  articleButton.type = "button";
  articleButton.textContent = seed.articleExperimentId ? "実験を見る" : "記事化する";
  articleButton.addEventListener("click", () => {
    if (seed.articleExperimentId && xExperimentLogs.some((log) => log.id === seed.articleExperimentId)) {
      activeXExperimentDetailId = seed.articleExperimentId;
      renderXExperimentLogs();
      $("#publishing-experiment-lab")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      return;
    }
    convertPublishingSeedToExperiment(seed);
  });
  const holdButton = document.createElement("button");
  holdButton.className = "ghost-button";
  holdButton.type = "button";
  holdButton.textContent = seed.status === "保留" ? "種に戻す" : "保留";
  holdButton.addEventListener("click", () => setPublishingSeedStatus(seed, seed.status === "保留" ? "種" : "保留"));
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "削除する";
  deleteButton.addEventListener("click", () => deletePublishingSeed(seed));
  actions.append(editButton, mergeButton, articleButton, holdButton, deleteButton);

  card.append(header, summary, original, take);
  if (tags.childElementCount) card.append(tags);
  card.append(related);
  if (mergingPublishingSeedId === seed.id) {
    const mergeBox = document.createElement("div");
    mergeBox.className = "publishing-seed-merge";
    const label = document.createElement("label");
    label.textContent = "このSeedへ統合するSeed";
    const select = document.createElement("select");
    publishingSeeds.filter((item) => item.id !== seed.id).forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = publishingSeedDisplayTitle(item);
      select.append(option);
    });
    label.append(select);
    const mergeConfirm = document.createElement("button");
    mergeConfirm.type = "button";
    mergeConfirm.textContent = "統合する";
    mergeConfirm.addEventListener("click", () => mergePublishingSeeds(seed, select.value));
    mergeBox.append(label, mergeConfirm);
    card.append(mergeBox);
  }
  card.append(actions);
  return card;
}

function renderPublishingSeeds() {
  const target = $("#publishingSeedList");
  if (!target) return;
  updatePublishingSeedSummary();
  const seeds = filteredPublishingSeeds();
  const count = $("#publishingSeedSearchCount");
  if (count) count.textContent = `${seeds.length}件表示`;
  if (!seeds.length) {
    const empty = document.createElement("div");
    empty.className = "publishing-seed-empty";
    const title = document.createElement("strong");
    title.textContent = publishingSeeds.length ? "この状態のSeedはありません。" : "まだSeedはありません。";
    const message = document.createElement("p");
    message.textContent = publishingSeeds.length
      ? "状態フィルターを変えると、別のSeedを確認できます。"
      : "気になったテーマに対して「自分ならこう考える」を一言だけ残すと、未来の記事の入口になります。";
    empty.append(title, message);
    target.replaceChildren(empty);
    return;
  }
  target.replaceChildren(...seeds.map(createPublishingSeedCard));
}

function savePublishingSeedFromForm(event) {
  event?.preventDefault();
  const values = readPublishingSeedForm();
  const status = $("#publishingSeedSaveStatus");
  if (!values.personalTake && !values.title && !values.originalTheme && !values.summary && !values.themeName) {
    if (status) status.textContent = "タイトル、要約、テーマ名、元テーマ、自分の一言のどれかを入れると保存できます。";
    return;
  }
  const now = new Date().toISOString();
  const seed = normalizePublishingSeed({
    ...blankPublishingSeed(),
    ...values,
    savedDate: activeDate,
    createdAt: now,
    updatedAt: now,
  });
  publishingSeeds.unshift(seed);
  savePublishingSeeds();
  clearPublishingSeedForm();
  renderPublishingSeeds();
  if (status) status.textContent = `Seedを保存しました。保存日 ${seed.savedDate}`;
}

function xExperimentNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function xExperimentRate(numerator, impressions) {
  const base = xExperimentNumber(impressions);
  const value = xExperimentNumber(numerator);
  if (!base || value === null) return null;
  return (value / base) * 100;
}

function formatXExperimentRate(value) {
  return value === null || value === undefined || !Number.isFinite(value) ? "—" : `${value.toFixed(2)}%`;
}

function formatXExperimentNumber(value) {
  const number = xExperimentNumber(value);
  return number === null ? "—" : number.toLocaleString("ja-JP");
}

function xExperimentExcerpt(value, maxLength = 72) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) return "投稿内容は未入力";
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}…`;
}

function xExperimentDateTimeValue(log) {
  return `${log.postDate || ""}T${log.postTime || "00:00"}:${log.updatedAt || log.createdAt || ""}`;
}

function readXExperimentForm() {
  return Object.fromEntries(Object.entries(xExperimentFormFields).map(([key, selector]) => {
    const field = $(selector);
    return [key, field ? field.value.trim() : ""];
  }));
}

function setXExperimentForm(log = blankXExperimentLog()) {
  Object.entries(xExperimentFormFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (field) field.value = log[key] ?? "";
  });
  const marker = $("#xExperimentEditMarker");
  if (marker) {
    marker.hidden = !editingXExperimentId;
    marker.textContent = editingXExperimentId ? "編集中です。保存するとこの記録を上書きします。" : "";
  }
  const title = $("#xExperimentFormTitle");
  if (title) title.textContent = editingXExperimentId ? "X実験ログを編集" : "X実験ログを記録";
  updateXExperimentPreviewRates();
}

function resetXExperimentForm() {
  editingXExperimentId = "";
  setXExperimentForm(blankXExperimentLog());
  const status = $("#xExperimentStatus");
  if (status) status.textContent = "投稿内容と仮説だけでも保存できます。";
}

function markXExperimentDirty() {
  const status = $("#xExperimentStatus");
  if (status) status.textContent = "未保存の変更があります。";
  updateXExperimentPreviewRates();
}

function updateXExperimentPreviewRates() {
  const values = readXExperimentForm();
  const engagement = $("#xExperimentEngagementRatePreview");
  const profile = $("#xExperimentProfileRatePreview");
  const link = $("#xExperimentLinkRatePreview");
  if (engagement) engagement.textContent = formatXExperimentRate(xExperimentRate(values.engagements, values.impressions));
  if (profile) profile.textContent = formatXExperimentRate(xExperimentRate(values.profileAccesses, values.impressions));
  if (link) link.textContent = formatXExperimentRate(xExperimentRate(values.linkClicks, values.impressions));
}

function buildXExperimentSummary(logs = xExperimentLogs) {
  const summary = logs.reduce(
    (result, log) => {
      result.count += 1;
      result.impressions += xExperimentNumber(log.impressions) ?? 0;
      result.profileAccesses += xExperimentNumber(log.profileAccesses) ?? 0;
      result.linkClicks += xExperimentNumber(log.linkClicks) ?? 0;
      const engagementRate = xExperimentRate(log.engagements, log.impressions);
      if (engagementRate !== null) result.engagementRates.push(engagementRate);
      return result;
    },
    { count: 0, impressions: 0, profileAccesses: 0, linkClicks: 0, engagementRates: [] },
  );
  summary.averageEngagementRate = summary.engagementRates.length
    ? summary.engagementRates.reduce((total, rate) => total + rate, 0) / summary.engagementRates.length
    : null;
  return summary;
}

function buildXExperimentTypeSummary(logs = xExperimentLogs) {
  return X_EXPERIMENT_POST_TYPES.map((type) => {
    const typeLogs = logs.filter((log) => log.postType === type);
    const impressions = typeLogs
      .map((log) => xExperimentNumber(log.impressions))
      .filter((value) => value !== null);
    const engagementRates = typeLogs
      .map((log) => xExperimentRate(log.engagements, log.impressions))
      .filter((value) => value !== null);
    return {
      type,
      count: typeLogs.length,
      averageImpressions: impressions.length
        ? impressions.reduce((total, value) => total + value, 0) / impressions.length
        : null,
      averageEngagementRate: engagementRates.length
        ? engagementRates.reduce((total, value) => total + value, 0) / engagementRates.length
        : null,
    };
  }).filter((row) => row.count > 0);
}

function filteredXExperimentLogs() {
  return [...xExperimentLogs]
    .filter((log) => xExperimentFilters.brand === "all" || log.brand === xExperimentFilters.brand)
    .filter((log) => xExperimentFilters.status === "all" || log.status === xExperimentFilters.status)
    .filter((log) => xExperimentFilters.experimentType === "all" || log.experimentType === xExperimentFilters.experimentType)
    .sort((left, right) => xExperimentDateTimeValue(right).localeCompare(xExperimentDateTimeValue(left)));
}

function createXExperimentMetric(label, value) {
  const item = document.createElement("div");
  item.className = "x-experiment-metric";
  const number = document.createElement("strong");
  number.textContent = value;
  const caption = document.createElement("span");
  caption.textContent = label;
  item.append(number, caption);
  return item;
}

function createXExperimentSelect(label, value, options, onChange) {
  const wrapper = document.createElement("label");
  wrapper.className = "x-experiment-manage-field";
  const text = document.createElement("span");
  text.textContent = label;
  const select = document.createElement("select");
  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    select.append(item);
  });
  select.value = options.includes(value) ? value : options[0];
  select.addEventListener("change", (event) => onChange(event.target.value));
  wrapper.append(text, select);
  return wrapper;
}

function createXExperimentTextarea(label, value, onInput, rows = 4) {
  const wrapper = document.createElement("label");
  wrapper.className = "x-experiment-note-field";
  const text = document.createElement("span");
  text.textContent = label;
  const textarea = document.createElement("textarea");
  textarea.rows = rows;
  textarea.value = value || "";
  if (onInput) textarea.addEventListener("input", (event) => onInput(event.target.value));
  wrapper.append(text, textarea);
  return wrapper;
}

function renderXExperimentSummary() {
  const target = $("#xExperimentSummary");
  const typeTarget = $("#xExperimentTypeSummary");
  if (!target || !typeTarget) return;
  const summary = buildXExperimentSummary();
  target.replaceChildren(
    createXExperimentMetric("記録した投稿数", `${summary.count}件`),
    createXExperimentMetric("合計インプレッション数", summary.impressions.toLocaleString("ja-JP")),
    createXExperimentMetric("平均エンゲージメント率", formatXExperimentRate(summary.averageEngagementRate)),
    createXExperimentMetric("合計プロフィールアクセス数", summary.profileAccesses.toLocaleString("ja-JP")),
    createXExperimentMetric("合計リンククリック数", summary.linkClicks.toLocaleString("ja-JP")),
  );

  const typeRows = buildXExperimentTypeSummary();
  if (!typeRows.length) {
    const empty = document.createElement("p");
    empty.className = "section-note";
    empty.textContent = "投稿の種類ごとの集計は、記録が増えると表示されます。";
    typeTarget.replaceChildren(empty);
    return;
  }
  typeTarget.replaceChildren(...typeRows.map((row) => {
    const item = document.createElement("div");
    item.className = "x-experiment-type-row";
    const type = document.createElement("strong");
    type.textContent = row.type;
    const count = document.createElement("span");
    count.textContent = `${row.count}件`;
    const impressions = document.createElement("span");
    impressions.textContent = `平均IMP ${row.averageImpressions === null ? "—" : Math.round(row.averageImpressions).toLocaleString("ja-JP")}`;
    const rate = document.createElement("span");
    rate.textContent = `平均ER ${formatXExperimentRate(row.averageEngagementRate)}`;
    item.append(type, count, impressions, rate);
    return item;
  }));
}

function appendXExperimentDetail(container, label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value || "—";
  wrapper.append(term, description);
  container.append(wrapper);
}

function getSelectedXExperimentLog(logs) {
  if (!logs.length) {
    activeXExperimentDetailId = "";
    return null;
  }
  const selected = logs.find((log) => log.id === activeXExperimentDetailId);
  if (selected) return selected;
  activeXExperimentDetailId = logs[0].id;
  return logs[0];
}

function toggleXExperimentCreateForm(forceOpen = null) {
  const form = $("#xExperimentCreateForm");
  if (!form) return;
  const shouldOpen = forceOpen === null ? form.hidden : forceOpen;
  form.hidden = !shouldOpen;
  if (shouldOpen) $("#xExperimentCreateTitle")?.focus();
}

function resetXExperimentCreateForm() {
  $("#xExperimentCreateTitle") && ($("#xExperimentCreateTitle").value = "");
  $("#xExperimentCreateBrand") && ($("#xExperimentCreateBrand").value = "ブランドA");
  $("#xExperimentCreateType") && ($("#xExperimentCreateType").value = "投稿仮説");
  $("#xExperimentCreateStatusSelect") && ($("#xExperimentCreateStatusSelect").value = "💡 アイデア");
  $("#xExperimentCreateHypothesis") && ($("#xExperimentCreateHypothesis").value = "");
  $("#xExperimentCreateReason") && ($("#xExperimentCreateReason").value = "");
  const status = $("#xExperimentCreateStatus");
  if (status) status.textContent = "タイトルと仮説だけでも作成できます。";
}

function createNewXExperiment(event) {
  event?.preventDefault();
  const now = new Date().toISOString();
  const title = $("#xExperimentCreateTitle")?.value.trim() || "新しい発信実験";
  const brand = $("#xExperimentCreateBrand")?.value || "ブランドA";
  const experimentType = $("#xExperimentCreateType")?.value || "投稿仮説";
  const status = $("#xExperimentCreateStatusSelect")?.value || "💡 アイデア";
  const hypothesis = $("#xExperimentCreateHypothesis")?.value.trim() || title;
  const startReason = $("#xExperimentCreateReason")?.value.trim() || "";
  const log = normalizeXExperimentLog({
    ...blankXExperimentLog(),
    title,
    brand,
    status,
    experimentType,
    hypothesis,
    startReason,
    experiment: "これから検証する内容を育てます。",
    createdAt: now,
    updatedAt: now,
  });
  xExperimentLogs.unshift(log);
  activeXExperimentDetailId = log.id;
  saveXExperimentLogs();
  resetXExperimentCreateForm();
  toggleXExperimentCreateForm(false);
  renderXExperimentLogs();
}

function renderXExperimentList(options = {}) {
  const shouldRenderDetail = options.renderDetail !== false;
  const target = $("#xExperimentList");
  const count = $("#xExperimentSearchCount");
  if (!target) return;
  const logs = filteredXExperimentLogs();
  if (count) count.textContent = `${logs.length}件表示`;
  if (!logs.length) {
    const empty = document.createElement("div");
    empty.className = "x-experiment-empty";
    const title = document.createElement("strong");
    title.textContent = xExperimentLogs.length ? "条件に合う発信実験はありません。" : "まだ実験はありません。";
    const message = document.createElement("p");
    message.textContent = xExperimentLogs.length
      ? "ブランド・ステータス・実験タイプの絞り込みを変えると、別の実験を確認できます。"
      : "最初の小さな実験を始めてみましょう。";
    const help = document.createElement("p");
    help.textContent = xExperimentLogs.length ? "" : "「＋新しい実験」から最初の実験を作成できます。";
    empty.append(title, message);
    if (help.textContent) empty.append(help);
    target.replaceChildren(empty);
    if (shouldRenderDetail) renderXExperimentDetail(null);
    return;
  }

  const selected = getSelectedXExperimentLog(logs);
  target.replaceChildren(...logs.map((log) => {
    const card = document.createElement("button");
    card.className = `x-experiment-list-item${selected?.id === log.id ? " is-active" : ""}`;
    card.type = "button";
    card.setAttribute("aria-pressed", selected?.id === log.id ? "true" : "false");
    card.addEventListener("click", () => {
      activeXExperimentDetailId = log.id;
      renderXExperimentList();
    });

    const header = document.createElement("div");
    header.className = "x-experiment-list-item-header";
    const main = document.createElement("div");
    const meta = document.createElement("span");
    meta.textContent = `${log.brand || "ブランド未設定"} / ${log.experimentType || "実験タイプ未設定"}`;
    const title = document.createElement("strong");
    title.textContent = xExperimentExcerpt(log.title || log.hypothesis || log.experiment || log.postContent, 58);
    const type = document.createElement("span");
    type.className = "x-experiment-type";
    type.textContent = log.postDate ? `${log.postDate}開始` : "開始日未設定";
    main.append(meta, title, type);

    const result = document.createElement("span");
    result.className = "x-experiment-list-result";
    result.textContent = log.status || "📊 検証中";
    header.append(main, result);

    const metrics = document.createElement("div");
    metrics.className = "x-experiment-list-metrics";
    [
      ["仮説", log.hypothesis ? "あり" : "未記入"],
      ["学び", log.learning || log.insight ? "あり" : "待ち"],
      ["次の一手", log.nextHypothesis ? "あり" : "未定"],
    ].forEach(([label, value]) => {
      metrics.append(createXExperimentMetric(label, value));
    });

    card.append(header, metrics);
    return card;
  }));
  if (shouldRenderDetail) renderXExperimentDetail(selected);
}

function renderXExperimentDetail(log) {
  const target = $("#xExperimentDetail");
  const meta = $("#xExperimentDetailMeta");
  if (!target) return;
  if (!log) {
    if (meta) meta.textContent = "一覧から選択";
    const empty = document.createElement("p");
    empty.className = "section-note";
    empty.textContent = "表示できる発信実験がありません。";
    target.replaceChildren(empty);
    return;
  }

  if (meta) meta.textContent = `${log.brand || "ブランド未設定"} / ${log.status || "状態未設定"} / ${log.experimentType || "実験タイプ未設定"}`;
  const management = document.createElement("div");
  management.className = "x-experiment-management";
  const updateManagedField = (key, value) => {
    log[key] = value;
    if (key === "brand") {
      const mediaOptions = X_EXPERIMENT_MEDIA[value] || [];
      log.media = log.media.filter((item) => mediaOptions.includes(item));
    }
    log.updatedAt = new Date().toISOString();
    saveXExperimentLogs();
    renderXExperimentLogs();
  };
  management.append(
    createXExperimentSelect("ブランド", log.brand, X_EXPERIMENT_BRANDS, (value) => updateManagedField("brand", value)),
    createXExperimentSelect("ステータス", log.status, X_EXPERIMENT_STATUSES, (value) => updateManagedField("status", value)),
    createXExperimentSelect("実験タイプ", log.experimentType, X_EXPERIMENT_TYPES, (value) => updateManagedField("experimentType", value)),
  );

  const title = document.createElement("div");
  title.className = "x-experiment-detail-title";
  const titleLabel = document.createElement("span");
  titleLabel.textContent = "実験タイトル";
  const titleText = document.createElement("strong");
  titleText.textContent = log.title || log.hypothesis || log.experiment || "新しい発信実験";
  title.append(titleLabel, titleText);

  const mediaPanel = document.createElement("div");
  mediaPanel.className = "x-experiment-media-panel";
  const mediaLabel = document.createElement("span");
  mediaLabel.textContent = "ブランド別投稿媒体";
  const mediaList = document.createElement("div");
  mediaList.className = "x-experiment-media-list";
  const mediaOptions = X_EXPERIMENT_MEDIA[log.brand] || [];
  if (!mediaOptions.length) {
    const empty = document.createElement("p");
    empty.className = "section-note";
    empty.textContent = "このブランドの投稿媒体はまだ設定されていません。";
    mediaList.append(empty);
  } else {
    mediaOptions.forEach((media) => {
      const label = document.createElement("label");
      label.className = "check-row";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = log.media.includes(media);
      checkbox.addEventListener("change", () => {
        log.media = checkbox.checked
          ? [...new Set([...log.media, media])]
          : log.media.filter((item) => item !== media);
        log.updatedAt = new Date().toISOString();
        saveXExperimentLogs();
        renderXExperimentLogs();
      });
      label.append(checkbox, document.createTextNode(` ${media}`));
      mediaList.append(label);
    });
  }
  mediaPanel.append(mediaLabel, mediaList);

  const notes = document.createElement("div");
  notes.className = "x-experiment-note-grid";
  const learningField = createXExperimentTextarea("学び", log.learning || log.insight, null, 5);
  const nextHypothesisField = createXExperimentTextarea("次の仮説", log.nextHypothesis, null, 5);
  const noteStatus = document.createElement("p");
  noteStatus.className = "x-experiment-status";
  noteStatus.textContent = "学びと次の仮説を編集できます。";
  const noteActions = document.createElement("div");
  noteActions.className = "x-experiment-note-actions";
  const saveNotesButton = document.createElement("button");
  saveNotesButton.className = "ghost-button";
  saveNotesButton.type = "button";
  saveNotesButton.textContent = "保存";
  saveNotesButton.addEventListener("click", () => {
    log.learning = learningField.querySelector("textarea")?.value.trim() || "";
    log.nextHypothesis = nextHypothesisField.querySelector("textarea")?.value.trim() || "";
    log.updatedAt = new Date().toISOString();
    saveXExperimentLogs();
    noteStatus.textContent = `保存しました。最終更新 ${formatSavedAt(log.updatedAt)}`;
    renderXExperimentList({ renderDetail: false });
  });
  noteActions.append(noteStatus, saveNotesButton);
  notes.append(learningField, nextHypothesisField, noteActions);

  const numbers = document.createElement("div");
  numbers.className = "x-experiment-detail-numbers";
  [
    ["ブランド", log.brand || "—"],
    ["ステータス", log.status || "—"],
    ["実験タイプ", log.experimentType || "—"],
    ["開始日", log.postDate || "—"],
    ["最終更新", formatSavedAt(log.updatedAt) || log.updatedAt || "—"],
  ].forEach(([label, value]) => numbers.append(createXExperimentMetric(label, value)));

  const detailList = document.createElement("dl");
  detailList.className = "x-experiment-details";
  appendXExperimentDetail(detailList, "実験タイトル", log.title);
  appendXExperimentDetail(detailList, "仮説", log.hypothesis);
  appendXExperimentDetail(detailList, "実験を始めた理由（きっかけ）", log.startReason);
  appendXExperimentDetail(detailList, "実験内容", log.experiment);
  appendXExperimentDetail(detailList, "発信内容・投稿メモ", log.postContent);
  appendXExperimentDetail(detailList, "投稿URL", log.postUrl);
  appendXExperimentDetail(detailList, "結果についてのメモ", log.resultMemo);
  appendXExperimentDetail(detailList, "学び", log.learning || log.insight);
  appendXExperimentDetail(detailList, "次の仮説", log.nextHypothesis);
  appendXExperimentDetail(detailList, "手動記録の数値", `インプレッション ${formatXExperimentNumber(log.impressions)} / エンゲージメント ${formatXExperimentNumber(log.engagements)} / プロフィール ${formatXExperimentNumber(log.profileAccesses)} / リンク ${formatXExperimentNumber(log.linkClicks)}`);

  target.replaceChildren(management, title, mediaPanel, notes, numbers, detailList);
}

function renderXExperimentLogs() {
  renderXExperimentList();
  updateXExperimentPreviewRates();
}

function saveXExperimentFromForm(event) {
  event?.preventDefault();
  if (savingXExperiment) return;
  savingXExperiment = true;
  const button = $("#saveXExperiment");
  if (button) button.disabled = true;
  const status = $("#xExperimentStatus");
  try {
    const values = readXExperimentForm();
    const now = new Date().toISOString();
    const existingIndex = editingXExperimentId
      ? xExperimentLogs.findIndex((log) => log.id === editingXExperimentId)
      : -1;
    const existing = existingIndex >= 0 ? xExperimentLogs[existingIndex] : blankXExperimentLog();
    const nextLog = normalizeXExperimentLog({
      ...existing,
      ...values,
      id: existing.id,
      createdAt: existing.createdAt || now,
      updatedAt: now,
    });
    if (existingIndex >= 0) {
      xExperimentLogs[existingIndex] = nextLog;
    } else {
      xExperimentLogs.unshift(nextLog);
    }
    saveXExperimentLogs();
    editingXExperimentId = "";
    setXExperimentForm(blankXExperimentLog());
    renderXExperimentLogs();
    if (status) status.textContent = `保存しました。最終更新 ${formatSavedAt(now)}`;
  } catch (error) {
    console.error("Failed to save X experiment log", error);
    if (status) status.textContent = "保存できませんでした。入力内容は残っています。もう一度試してください。";
  } finally {
    savingXExperiment = false;
    if (button) button.disabled = false;
  }
}

function editXExperimentLog(id) {
  const log = xExperimentLogs.find((item) => item.id === id);
  if (!log) return;
  editingXExperimentId = id;
  setXExperimentForm(log);
  $("#xExperimentForm")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  const status = $("#xExperimentStatus");
  if (status) status.textContent = "編集中です。保存すると既存データを上書きします。";
}

function deleteXExperimentLog(id) {
  const log = xExperimentLogs.find((item) => item.id === id);
  if (!log) return;
  const accepted = confirm("このX実験ログを削除します。元に戻せません。よろしいですか？");
  if (!accepted) return;
  xExperimentLogs = xExperimentLogs.filter((item) => item.id !== id);
  if (editingXExperimentId === id) resetXExperimentForm();
  saveXExperimentLogs();
  renderXExperimentLogs();
  const status = $("#xExperimentStatus");
  if (status) status.textContent = "削除しました。";
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

function laterCreatedTime(item) {
  const time = new Date(item?.createdAt || item?.created || item?.createdDate || "").getTime();
  return Number.isNaN(time) ? null : time;
}

function sortLaterItemsForDisplay(items, sortOrder = "oldest") {
  const newestFirst = sortOrder === "newest";
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftTime = laterCreatedTime(left.item);
      const rightTime = laterCreatedTime(right.item);
      if (leftTime !== null && rightTime !== null && leftTime !== rightTime) {
        return newestFirst ? rightTime - leftTime : leftTime - rightTime;
      }
      if (leftTime === null && rightTime !== null) return newestFirst ? 1 : -1;
      if (leftTime !== null && rightTime === null) return newestFirst ? -1 : 1;
      return left.index - right.index;
    })
    .map(({ item }) => item);
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
  const sortToggle = $("#laterSortToggle");
  if (sortToggle) {
    const isNewest = laterSortOrder === "newest";
    sortToggle.textContent = `並び順：${isNewest ? "新しい順" : "古い順"}`;
    sortToggle.setAttribute("aria-label", `現在は${isNewest ? "新しい順" : "古い順"}です。押すと${isNewest ? "古い順" : "新しい順"}に切り替えます`);
  }
  renderLaterCounts();
  const template = $("#laterTemplate");
  target.replaceChildren();
  const searchField = $("#laterSearch");
  if (searchField && searchField.value !== laterSearchQuery) searchField.value = laterSearchQuery;
  const searchQuery = normalizeLaterText(laterSearchQuery);
  const statusItems = showDoneLater ? laterItems : laterItems.filter((item) => !item.done);
  const visibleItems = sortLaterItemsForDisplay(
    statusItems.filter((item) => laterMatchesSearch(item, searchQuery)),
    laterSortOrder,
  );
  const displayItems = searchQuery ? visibleItems : visibleItems.slice(0, laterVisibleLimit);
  const hiddenCount = Math.max(0, visibleItems.length - displayItems.length);
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
  displayItems.forEach((item) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.brainSource = "operation-dashboard.laterItems";
    row.dataset.brainId = item.id || `operation-dashboard.laterItems:${item.title || ""}`;
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
  if (hiddenCount > 0) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "ghost-button later-show-more";
    more.textContent = `さらに10件表示（残り${hiddenCount}件）`;
    more.addEventListener("click", () => {
      laterVisibleLimit += LATER_INITIAL_DISPLAY_LIMIT;
      renderLaterItems();
    });
    target.append(more);
  }
}

function renderFields() {
  const day = getDay();
  const dailyInput = $("#dailyInputText");
  if (dailyInput && document.activeElement !== dailyInput && dailyInput.value !== (day.dailyInput || "")) {
    dailyInput.value = day.dailyInput || "";
  }
  renderDailyInputSaveState(day);
  renderCapacityCheck(day);
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

function renderTodayOnlyDateLabels() {
  const label = formatDateLabel(activeDate);
  ["#todayTaskDateLabel", "#todayEventDateLabel", "#activityLogDateLabel"].forEach((selector) => {
    const target = $(selector);
    if (target) target.textContent = label;
  });
}

function hasSavedDailyInput(day) {
  return Boolean(day?.dailyInputUpdatedAt) || Boolean(String(day?.dailyInput || "").trim());
}

function renderDailyInputSaveState(day, confirmation = "") {
  const saved = hasSavedDailyInput(day);
  const button = $("#saveDailyInput");
  const status = $("#dailyInputStatus");
  const savedAt = formatSavedAt(day?.dailyInputUpdatedAt);
  if (button) {
    button.textContent = saved ? "本日の入力を更新する" : "本日の入力を保存する";
  }
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
  } else if (savedAt) {
    status.textContent = `保存済みです。最終更新 ${savedAt}。さくらの判断材料として参照されます。`;
  } else if (saved) {
    status.textContent = "保存済みです。次回の更新から最終更新時刻も表示します。";
  } else {
    status.textContent = "本日の入力はまだ保存されていません。";
  }
}

function hasSavedCapacityCheck(day) {
  return Boolean(day?.capacityCheckUpdatedAt) ||
    CAPACITY_CHECK_ITEMS.some((item) => Boolean(day?.capacityCheck?.[item.key]));
}

function renderCapacityCheck(day = getDay(), confirmation = "") {
  const grid = $("#capacityCheckGrid");
  if (grid && !grid.children.length) {
    CAPACITY_CHECK_ITEMS.forEach((item) => {
      const row = document.createElement("div");
      row.className = "capacity-check-row";
      row.dataset.capacityItem = item.key;
      const label = document.createElement("span");
      label.className = "capacity-check-label";
      label.textContent = item.label;
      const options = document.createElement("div");
      options.className = "capacity-check-options";
      options.setAttribute("role", "group");
      options.setAttribute("aria-label", item.label);
      CAPACITY_CHECK_OPTIONS.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.capacityKey = item.key;
        button.dataset.capacityValue = option.value;
        button.title = `${item.label}: ${option.title}`;
        button.setAttribute("aria-label", `${item.label} ${option.label} ${option.title}`);
        button.textContent = option.label;
        options.append(button);
      });
      row.append(label, options);
      grid.append(row);
    });
  }
  CAPACITY_CHECK_ITEMS.forEach((item) => {
    const selectedValue = day?.capacityCheck?.[item.key] || "";
    document.querySelectorAll(`[data-capacity-key="${item.key}"]`).forEach((button) => {
      const isSelected = button.dataset.capacityValue === selectedValue;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  });
  const status = $("#capacityCheckStatus");
  if (!status) return;
  if (confirmation) {
    status.textContent = confirmation;
    return;
  }
  if (hasSavedCapacityCheck(day)) {
    const savedAt = formatSavedAt(day.capacityCheckUpdatedAt);
    status.textContent = savedAt
      ? `保存済みです。最終更新 ${savedAt}。`
      : "保存済みです。";
  } else {
    status.textContent = "今日できることはまだ記録されていません。";
  }
}

const todayWeatherOptions = {
  sunny: { label: "☀ はれ", greeting: "おかえりなさい。今日は軽やかに進めそうです。まずは小さく始めましょう。" },
  cloudy: { label: "☁ くもり", greeting: "おかえりなさい。少し曇っていても大丈夫です。今日は輪郭を整えるところから始めましょう。" },
  rainy: { label: "🌧 あめ", greeting: "おかえりなさい。今日は無理に晴らさなくて大丈夫です。静かに戻れる入口をここに置いておきます。" },
};

function normalizeTodayWeather(value) {
  return Object.prototype.hasOwnProperty.call(todayWeatherOptions, value) ? value : "";
}

function todayWeatherLabel(value) {
  const weather = normalizeTodayWeather(value);
  return weather ? todayWeatherOptions[weather].label : "未選択";
}

function buildWelcomeGreeting(day) {
  const weather = normalizeTodayWeather(day?.todayWeather);
  if (weather) return todayWeatherOptions[weather].greeting;
  return "おかえりなさい。今日の心の天気を選ぶと、ここから始められます。";
}

function buildReunionCards(limit = 3) {
  return Object.entries(store)
    .filter(([dateKey]) => dateKey < activeDate)
    .sort(([left], [right]) => right.localeCompare(left))
    .flatMap(([dateKey, day]) => {
      const cards = [];
      const didToday = String(day?.reflection?.didToday || "").trim();
      if (didToday) {
        cards.push({
          date: dateKey,
          label: "できたこと",
          text: didToday,
        });
      }
      asArray(day?.learnings).forEach((learning) => {
        const text = [
          learning?.title,
          learning?.summaryLine,
          learning?.learned,
        ].map((value) => String(value || "").trim()).find(Boolean);
        if (text) {
          cards.push({
            date: dateKey,
            label: "気づき",
            text,
          });
        }
      });
      return cards;
    })
    .slice(0, limit);
}

function renderWelcomeHomePanel() {
  const day = getDay();
  const weather = normalizeTodayWeather(day.todayWeather);
  const greeting = $("#welcomeHomeGreeting");
  const status = $("#welcomeWeatherStatus");
  if (greeting) greeting.textContent = buildWelcomeGreeting(day);
  if (status) {
    status.textContent = weather
      ? `${todayWeatherLabel(weather)}で保存済みです。`
      : "まだ選ばれていません。";
  }
  document.querySelectorAll("[data-weather-choice]").forEach((button) => {
    const selected = button.dataset.weatherChoice === weather;
    button.setAttribute("aria-pressed", String(selected));
  });

  const reunionList = $("#welcomeReunionCards");
  if (!reunionList) return;
  reunionList.replaceChildren();
  const cards = buildReunionCards();
  if (!cards.length) {
    const empty = document.createElement("p");
    empty.className = "section-note";
    empty.textContent = "過去の振り返りや学びが増えると、ここに再会カードが表示されます。";
    reunionList.append(empty);
    return;
  }
  cards.forEach((card) => {
    const item = document.createElement("article");
    item.className = "welcome-reunion-item";
    const title = document.createElement("strong");
    title.textContent = card.text;
    const meta = document.createElement("span");
    meta.textContent = `${formatDateLabel(card.date)}・${card.label}`;
    item.append(title, meta);
    reunionList.append(item);
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
    schedule_and_recover: "予定と休息を両立する提案",
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

function displayStateLabel(value = "") {
  const labels = {
    low: "低い",
    medium: "中くらい",
    high: "高い",
    normal: "通常",
    pending: "未確認",
    ready: "準備できている",
    running: "進行中",
    waiting: "待機中",
    completed: "完了",
    failed: "うまくいかなかった",
    skipped: "見送った",
    partial: "一部完了",
    proposed: "提案中",
    review: "確認",
    reviewed: "確認済み",
    ready_for_review: "確認待ち",
    observing: "観察中",
    manual_confirm: "手動確認",
    easy: "やさしい",
    hard: "難しい",
    unknown: "わからない",
    careful_integration: "慎重に統合",
    steady_integration: "安定して統合",
  };
  return labels[value] || value || "-";
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
      const { done, total } = todayCompletionStats(day);
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

function openAncestorDetails(element) {
  let current = element?.parentElement;
  while (current) {
    if (current.tagName === "DETAILS") current.open = true;
    current = current.parentElement;
  }
}

function flashReferencedSource(element) {
  if (!element) return;
  element.classList.remove("source-highlight");
  void element.offsetWidth;
  element.classList.add("source-highlight");
  setTimeout(() => element.classList.remove("source-highlight"), 2200);
}

function brainCssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(String(value || ""));
  return String(value || "").replace(/["\\]/g, "\\$&");
}

function openBrainReference(reference) {
  if (!reference || typeof reference !== "object") return;
  const candidateSelectors = [
    reference.source && reference.id
      ? `[data-brain-source="${brainCssEscape(reference.source)}"][data-brain-id="${brainCssEscape(reference.id)}"]`
      : "",
    reference.sectionSelector || "",
  ].filter(Boolean);
  const target = candidateSelectors.map((selector) => document.querySelector(selector)).find(Boolean);
  if (!target) {
    if (reference.url || reference.appUrl) window.open(reference.url || reference.appUrl, "_blank", "noreferrer");
    return;
  }
  openAncestorDetails(target);
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  flashReferencedSource(target);
}

function appendBrainReferenceItem(listItem, reference) {
  listItem.className = "brain-reference-item";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "brain-reference-button";
  button.addEventListener("click", () => openBrainReference(reference));

  const title = document.createElement("strong");
  title.textContent = reference.title || "参照した項目";

  const meta = document.createElement("span");
  meta.textContent = [
    reference.storageLabel ? `保存先: ${reference.storageLabel}` : "",
    reference.createdLabel ? `作成日: ${reference.createdLabel}` : "",
  ].filter(Boolean).join(" / ");

  const action = document.createElement("small");
  action.textContent = "元データを開く";

  button.append(title, meta, action);
  listItem.append(button);
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
  visibleItems.forEach((entry) => {
    const item = document.createElement("li");
    if (entry && typeof entry === "object" && entry.type === "brain-reference") {
      appendBrainReferenceItem(item, entry);
    } else {
      item.textContent = entry;
    }
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

function learningMemoryTags(learning) {
  const tags = String(learning?.tags || "")
    .split(/[\s,、]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  return [...new Set([...tags, "learning", "self-learning"])];
}

function upsertLearningMemory(learning, date = activeDate) {
  const summary = String(learning?.sakuraMemory || learning?.intro || "").trim();
  if (!summary) return { status: "empty", memory: null };
  if (!learning?.id) return { status: "missing-id", memory: null };
  const source = `learning:${learning.id}`;
  const title = [learning.title, learning.summaryLine, learning.hook]
    .map((value) => String(value || "").trim())
    .find(Boolean) || "自分の学び";
  const tags = learningMemoryTags(learning);
  const existing = memoryStore.shortMemory.find((memory) => memory.source === source);
  if (existing) {
    const now = new Date().toISOString();
    existing.date = date;
    existing.type = "learning";
    existing.title = title;
    existing.summary = summary;
    existing.importance = 3;
    existing.tags = tags;
    existing.updatedAt = now;
    saveMemoryStore();
    return { status: "updated", memory: existing };
  }
  const memory = upsertShortMemory({
    date,
    type: "learning",
    title,
    summary,
    source,
    importance: 3,
    tags,
  });
  return { status: "added", memory };
}

const MEMORY_LIBRARY_TYPES = {
  manual: "自分で追加",
  learning: "自分の学び",
  event_context: "今日の予定",
  recommendation: "今日の提案",
  learning_feedback: "提案フィードバック",
};

function memoryLibraryTypeLabel(type) {
  return MEMORY_LIBRARY_TYPES[type] || "その他";
}

function memoryLibrarySourceLabel(memory) {
  if (String(memory?.source || "").startsWith("learning:")) return "自分の学びから追加";
  const labels = {
    manual: "記憶入力から追加",
    todayEvents: "今日の予定から作成",
    recommendation: "今日の提案から作成",
    learningLog: "提案フィードバックから作成",
  };
  return labels[memory?.source] || "さくらの内部処理から作成";
}

function memoryLibraryMatches(memory, query) {
  if (!query) return true;
  return [
    memory?.date,
    memory?.title,
    memory?.summary,
    ...asArray(memory?.tags),
    memoryLibraryTypeLabel(memory?.type),
    memoryLibrarySourceLabel(memory),
  ]
    .map((value) => normalizeLaterText(value || ""))
    .join(" ")
    .includes(query);
}

function forgetShortMemory(memoryId) {
  if (!memoryId) return false;
  const beforeCount = memoryStore.shortMemory.length;
  memoryStore.shortMemory = memoryStore.shortMemory.filter((memory) => memory.id !== memoryId);
  if (memoryStore.shortMemory.length === beforeCount) return false;
  saveMemoryStore();
  return true;
}

function renderMemoryLibrary() {
  const target = $("#memoryLibraryList");
  if (!target) return;
  const searchField = $("#memoryLibrarySearch");
  const typeField = $("#memoryLibraryType");
  if (searchField && searchField.value !== memoryLibrarySearchQuery) {
    searchField.value = memoryLibrarySearchQuery;
  }
  if (typeField && typeField.value !== memoryLibraryTypeFilter) {
    typeField.value = memoryLibraryTypeFilter;
  }
  const query = normalizeLaterText(memoryLibrarySearchQuery);
  const knownTypes = new Set(Object.keys(MEMORY_LIBRARY_TYPES));
  const filtered = [...asArray(memoryStore.shortMemory)]
    .sort((a, b) => memoryUpdatedTime(b) - memoryUpdatedTime(a))
    .filter((memory) => {
      const typeMatches = memoryLibraryTypeFilter === "all" ||
        (memoryLibraryTypeFilter === "other"
          ? !knownTypes.has(memory.type)
          : memory.type === memoryLibraryTypeFilter);
      return typeMatches && memoryLibraryMatches(memory, query);
    });
  const visible = filtered.slice(0, memoryLibraryVisibleLimit);
  const count = $("#memoryLibraryCount");
  if (count) count.textContent = String(filtered.length);
  target.replaceChildren();
  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = query || memoryLibraryTypeFilter !== "all"
      ? "条件に一致する記憶はありません。"
      : "さくらの記憶はまだありません。";
    target.append(empty);
  }
  visible.forEach((memory) => {
    const item = document.createElement("article");
    item.className = "memory-library-item";
    const meta = document.createElement("div");
    meta.className = "memory-library-meta";
    const date = document.createElement("span");
    date.textContent = memory.date ? formatDateLabel(memory.date) : "日付なし";
    const type = document.createElement("span");
    type.className = "memory-library-type";
    type.textContent = memoryLibraryTypeLabel(memory.type);
    meta.append(date, type);
    const title = document.createElement("h3");
    title.textContent = memory.title || "タイトルのない記憶";
    const summary = document.createElement("p");
    summary.textContent = memory.summary || "";
    const tags = document.createElement("p");
    tags.className = "memory-library-tags";
    tags.textContent = asArray(memory.tags).length
      ? `タグ: ${asArray(memory.tags).join(" / ")}`
      : "タグ: なし";
    const footer = document.createElement("div");
    footer.className = "memory-library-footer";
    const source = document.createElement("span");
    source.textContent = `${memoryLibrarySourceLabel(memory)} / 更新 ${brainFormatDateTime(memory.updatedAt || memory.createdAt)}`;
    const forget = document.createElement("button");
    forget.className = "delete-button";
    forget.type = "button";
    forget.textContent = "忘れる";
    forget.disabled = !memory.id;
    forget.addEventListener("click", () => {
      const confirmed = confirm(
        `「${memory.title || "タイトルのない記憶"}」をさくらの記憶から削除しますか？\n削除後は、今後の提案や会話で参照されなくなります。`,
      );
      if (!confirmed || !forgetShortMemory(memory.id)) return;
      renderMemoryLibrary();
      renderMemoryLayer();
    });
    footer.append(source, forget);
    item.append(meta, title, summary, tags, footer);
    target.append(item);
  });
  const more = $("#memoryLibraryMore");
  if (more) more.hidden = visible.length >= filtered.length;
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
  dailyInputContext = null,
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
    dailyInputContext,
    todayTasks: asArray(todayTasks).map((task) => ({
      title: task.title || "",
      done: isItemCompleted(task),
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
  const scheduledEvents = asArray(conversationContext.todayEvents).filter((event) => event.title);
  const firstTask = asArray(conversationContext.todayTasks).find((task) => task.title && !isItemCompleted(task));
  const memoryTitle = memoryDisplayTitle(conversationContext.memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(conversationContext.memoryContext?.recent?.[0]);
  const confidence = conversationContext.learningConfidence?.score ?? 0;
  const healthAware = conversationContext.healthAwareConversation || null;

  return {
    opening: scheduledEvents.length
      ? `今日の予定: ${scheduledEvents.map((event) => [event.time, event.title].filter(Boolean).join(" ")).join(" / ")}`
      : conversationContext.recommendation?.type === "rest_first"
        ? "今日は体調と休息を中心にする"
        : conversationContext.project
          ? `プロジェクト: ${conversationContext.project}`
          : firstTask
            ? `今日のタスク: ${firstTask.title}`
            : "今日の状況を軽く確認する",
    mainPoint: [
      conversationContext.recommendation?.message,
      conversationContext.recommendation?.actionText,
    ].filter(Boolean).join(" ") ||
      conversationContext.recommendation?.title ||
      "提案を確認する",
    support: [
      conversationContext.dailyInputContext?.summary ? `今日の入力: ${conversationContext.dailyInputContext.summary}` : "",
      memoryTitle ? `記憶: ${memoryTitle}` : "",
      conversationContext.learningHint?.message ? `学習: ${conversationContext.learningHint.message}` : "",
      healthAware?.supportHint ? `体調: ${healthAware.supportHint}` : "",
    ].filter(Boolean).join(" / ") || "補足情報はまだ少ない",
    uncertainty: confidence >= 60
      ? `提案傾向の確かさは${confidence}%です。参考情報として使える状態です。`
      : `提案傾向の確かさは${confidence}%です。まだ参考段階として控えめに扱います。`,
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
    const dailyInputMatch = part.match(/^今日の入力[:：]\s*(.+)$/);
    if (dailyInputMatch) return `今日の入力では「${dailyInputMatch[1]}」も確認しています。`;
    const memoryMatch = part.match(/^(?:Memory|記憶)[:：]\s*(.+)$/);
    if (memoryMatch) return `以前の記録では「${memoryMatch[1]}」が参考になりそうです。`;
    const learningMatch = part.match(/^(?:Learning|学習)[:：]\s*(.+)$/);
    if (learningMatch) return `提案フィードバックでは「${learningMatch[1]}」という傾向も見ています。`;
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
    context?.recommendation ? "今日の提案と無関係な話題転換" : "",
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
    goal?.userGoal ? `ユーザーの目標: ${goal.userGoal}` : "",
    identity?.currentTone ? `トーン: ${identity.currentTone}` : "",
    context?.project ? `文脈: ${context.project}` : "",
    `確信度: ${confidence}%`,
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
  setText("#priorityUrgency", displayStateLabel(priority?.urgency));
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
    identity?.currentTone ? `関係性のトーン: ${identity.currentTone}` : "",
    goal?.assistantGoal ? `さくらの目標: ${goal.assistantGoal}` : "",
  ].filter(Boolean).join(" / ") || "目標の状態と優先度の状態に沿って判断します。";
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
    context?.project && !String(priority?.reasoning || "").includes(`文脈: ${context.project}`)
      ? `文脈: ${context.project}`
      : "",
  ].filter(Boolean).join(" / ") || "目標、優先度、判断、戦略の現在値に基づきます。";
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
    goal?.userGoal ? `目標: ${goal.userGoal}` : "",
    priority?.urgency ? `優先度の強さ: ${displayStateLabel(priority.urgency)}` : "",
    decision?.confidence !== undefined ? `判断の確信度: ${decision.confidence}%` : "",
    attention?.responseCue ? `返答の手がかり: ${attention.responseCue}` : "",
  ].filter(Boolean).join(" / ") || "目標、優先度、判断、戦略、注目を統合しています。";
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
    identity?.currentTone ? `関係性のトーン: ${identity.currentTone}` : "",
    context?.project ? `文脈: ${context.project}` : "",
  ].filter(Boolean).join(" / ") || "認知状態、関係性プロフィール、会話の文脈に基づきます。";
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
    cognitive?.cognitiveMode ? `認知モード: ${cognitive.cognitiveMode}` : "",
    intent?.reasoning ? "意図の理由" : "",
  ].filter(Boolean);
  const estimatedComplexity = intent?.executionType?.includes("careful") || cognitive?.cognitiveMode?.includes("careful")
    ? "medium"
    : "low";
  const completionCriteria = intent?.expectedResult ||
    cognitive?.reasoningSummary ||
    "返答が意図と認知状態に沿っている";
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
  setText("#workflowStatus", displayStateLabel(workflow?.workflowStatus));
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
      ? `作業状況は「${displayStateLabel(workflowStatus || "unknown")}」です。「${selectedTitle}」を確認候補にしています。`
      : `作業状況は「${displayStateLabel(workflowStatus || "unknown")}」です。次の実行候補を確認する必要があります。`,
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
  setText("#executionDecisionPriority", displayStateLabel(decision?.priority));
  setText("#executionDecisionStatus", displayStateLabel(decision?.decisionStatus));
  setText("#executionDecisionTitle", decision?.selectedTitle);
  setText("#executionDecisionActionType", displayStateLabel(decision?.selectedActionType));
  setText("#executionDecisionConfidence", displayStateLabel(decision?.confidence));
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
  setText("#executionStatus", displayStateLabel(execution?.status));
  setText("#executionTitle", execution?.title);
  setText("#executionActionType", displayStateLabel(execution?.actionType));
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
    decision?.priority ? `優先度: ${displayStateLabel(decision.priority)}` : "",
    decision?.decisionStatus ? `状態: ${displayStateLabel(decision.decisionStatus)}` : "",
    decision?.decisionReason || "",
  ].filter(Boolean);
  const feedbackParts = [
    feedback?.outcome ? displayStateLabel(feedback.outcome) : "",
    feedback?.difficulty ? `難しさ: ${displayStateLabel(feedback.difficulty)}` : "",
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
    feedback?.difficulty === "hard" ? "実行が難しいと記録されています。" : "",
    feedback?.outcome === "failed" ? "実行がうまくいかなかったと記録されています。" : "",
    workflowStatus === "failed" ? "作業の流れがうまく進んでいません。" : "",
    healthContext.currentRisk || healthSummary.risk,
    !execution ? "実行候補がまだありません。" : "",
  ].filter(Boolean).join(" ") || "今すぐ注意する大きなリスクはありません。";

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
  setText("#executiveSummaryMode", displayStateLabel(executiveSummary.executiveMode));
  setText("#executiveSummaryIntent", executiveSummary.currentIntent);
  setText("#executiveSummaryObjective", executiveSummary.currentObjective);
  setText("#executiveSummaryWorkflow", displayStateLabel(executiveSummary.workflowStatus));
  setText("#executiveSummaryDecision", executiveSummary.decisionSummary);
  setText("#executiveSummaryExecution", displayStateLabel(executiveSummary.executionStatus));
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
    sourceSummary: "会話・関係性・認知・実行判断・体調の文脈から作成。",
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
    .replace(/Built from Conversation, Identity, Cognitive, Executive, and Health context\./g, "会話・関係性・認知・実行判断・体調の文脈から作成。")
    .replace(/executive:([a-z_]+)/g, (_, label) => `実行判断: ${adaptiveIntelligenceUiValue(label)}`)
    .replace(/cognitive:([a-z_]+)/g, (_, label) => `認知: ${adaptiveIntelligenceUiValue(label)}`)
    .replace(/capacity:([a-z_]+)/g, (_, label) => `行動しやすさ: ${healthUiValue(label)}`)
    .replace(/recovery:([a-z_]+)/g, (_, label) => `回復状態: ${healthUiValue(label)}`)
    .replace(/momentum:([a-z_]+)/g, (_, label) => `回復の流れ: ${healthTrendUiValue(label)}`)
    .replace(/feedback:([a-z_]+)/g, (_, label) => `フィードバック: ${adaptiveIntelligenceUiValue(label)}`);
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
  normal: "普通",
  slightly_sleepy: "少し眠い",
  very_sleepy: "かなり眠い",
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
  sleep_score_low: "睡眠スコアが低い",
  wake_very_sleepy: "起床時にかなり眠い",
};

const HEALTH_TREND_UI_LABELS = {
  improving: "改善傾向",
  declining: "低下傾向",
  stable: "安定",
  mixed: "ばらつきあり",
  insufficient_data: "記録がまだ少ない",
};

function formatSleepDuration(minutes) {
  const totalMinutes = Number.parseInt(minutes, 10);
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "";
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  if (hours && remainingMinutes) return `${hours}時間${remainingMinutes}分`;
  if (hours) return `${hours}時間`;
  return `${remainingMinutes}分`;
}

function splitSleepDuration(minutes) {
  const totalMinutes = Number.parseInt(minutes, 10);
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) {
    return { hours: "", minutes: "" };
  }
  return {
    hours: String(Math.floor(totalMinutes / 60)),
    minutes: String(totalMinutes % 60),
  };
}

function sleepDurationFromInputs() {
  const hours = Number.parseInt($("#healthLongestSleepHours")?.value || "0", 10);
  const minutes = Number.parseInt($("#healthLongestSleepMinutes")?.value || "0", 10);
  const totalMinutes = (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0);
  return totalMinutes > 0 ? String(totalMinutes) : "";
}

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
    health.sleepCount ? `睡眠回数 ${health.sleepCount}回` : "",
    health.longestSleepMinutes ? `最長睡眠 ${formatSleepDuration(health.longestSleepMinutes)}` : "",
    health.wakeFeeling && health.wakeFeeling !== "unknown" ? `起床時 ${healthUiValue(health.wakeFeeling)}` : "",
    health.sleepScore ? `睡眠スコア ${health.sleepScore}` : "",
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
    .replace(/sleep_count ([0-9]+)x/g, "睡眠回数 $1回")
    .replace(/longest_sleep ([0-9]+)m/g, (_, minutes) => `最長睡眠 ${formatSleepDuration(minutes)}`)
    .replace(/wake ([a-z_]+)/g, (_, valueLabel) => `起床時 ${healthUiValue(valueLabel)}`)
    .replace(/sleep_score ([0-9]+)/g, "睡眠スコア $1")
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
      healthContext: "ヘルスチェックはまだ記録されていません。",
      recoveryFeeling: "unknown",
      energyLevel: "medium",
      stressLevel: "unknown",
      risk: "",
    };
  }
  const healthContext = [
    health.sleepHours ? `sleep ${health.sleepHours}h` : "",
    health.sleepCount ? `sleep_count ${health.sleepCount}x` : "",
    health.longestSleepMinutes ? `longest_sleep ${health.longestSleepMinutes}m` : "",
    health.wakeFeeling && health.wakeFeeling !== "unknown" ? `wake ${health.wakeFeeling}` : "",
    health.sleepScore ? `sleep_score ${health.sleepScore}` : "",
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
      sleepCount: "",
      longestSleepMinutes: "",
      wakeFeeling: "unknown",
      sleepScore: "",
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
  setValue("#healthSleepCount", health?.sleepCount);
  const longestSleep = splitSleepDuration(health?.longestSleepMinutes);
  setValue("#healthLongestSleepHours", longestSleep.hours);
  setValue("#healthLongestSleepMinutes", longestSleep.minutes);
  setValue("#healthWakeFeeling", health?.wakeFeeling || "unknown");
  setValue("#healthSleepScore", health?.sleepScore);
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

function renderHomeSleepSummary() {
  const health = healthState.find((item) => item.date === activeDate) || null;
  const setHomeSleepText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value;
  };
  setHomeSleepText("#homeSleepHours", health?.sleepHours ? `${health.sleepHours}時間` : "未記録");
  setHomeSleepText("#homeSleepCount", health?.sleepCount ? `${health.sleepCount}回` : "未記録");
  setHomeSleepText("#homeLongestSleep", health?.longestSleepMinutes ? formatSleepDuration(health.longestSleepMinutes) : "未記録");
  setHomeSleepText("#homeSleepNote", String(health?.bodyNote || "").trim() || "未記録");
}

function renderAfterTenMode(day = getDay()) {
  const selectedModes = new Set(asArray(day.afterTenMode).map(String));
  const optionsTarget = $("#afterTenModeOptions");
  if (optionsTarget) {
    optionsTarget.replaceChildren();
    afterTenModeOptions().forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const text = document.createElement("span");
      const deleteButton = document.createElement("button");
      input.type = "checkbox";
      input.value = option;
      input.checked = selectedModes.has(option);
      text.textContent = option;
      deleteButton.type = "button";
      deleteButton.className = "after-ten-mode-delete";
      deleteButton.dataset.afterTenDelete = option;
      deleteButton.textContent = "削除";
      deleteButton.setAttribute("aria-label", `${option}を削除`);
      label.append(input, text, deleteButton);
      optionsTarget.append(label);
    });
  }
  const status = $("#afterTenModeStatus");
  if (!status) return;
  const selectedLabels = [...selectedModes].filter(Boolean);
  if (selectedLabels.length) {
    const savedAt = formatSavedAt(day.afterTenModeUpdatedAt);
    status.textContent = savedAt
      ? `${selectedLabels.join("、")}で保存済みです。最終更新 ${savedAt}。`
      : `${selectedLabels.join("、")}で保存済みです。`;
  } else {
    status.textContent = "まだ選ばれていません。";
  }
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
  const sleepItems = items.filter((item) =>
    item.sleepHours ||
    item.sleepCount ||
    item.longestSleepMinutes ||
    item.sleepScore ||
    (item.wakeFeeling && item.wakeFeeling !== "unknown") ||
    (item.sleepQuality && item.sleepQuality !== "unknown")
  );
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
  wakeFeeling: {
    very_sleepy: 1,
    slightly_sleepy: 2,
    unknown: 3,
    normal: 4,
    refreshed: 5,
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
    const wakeScore = HEALTH_TREND_SCORE_MAPS.wakeFeeling[item?.wakeFeeling];
    if (Number.isFinite(wakeScore)) values.push(wakeScore);
    const watchSleepScore = Number.parseFloat(item?.sleepScore);
    if (Number.isFinite(watchSleepScore)) {
      values.push(Math.max(1, Math.min(5, watchSleepScore / 20)));
    }
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
  const sleepScore = Number(health?.sleepScore);
  const lowSleepScore = Number.isFinite(sleepScore) && sleepScore > 0 && sleepScore < 50;
  const verySleepyWake = health?.wakeFeeling === "very_sleepy";
  const capacity = ["very_low", "low"].includes(energy) || ["depleted", "low"].includes(recovery) || lowSleepScore || verySleepyWake
    ? "low"
    : energy === "unstable"
      ? "unstable"
      : energy === "high" && ["recovered", "refreshed"].includes(recovery)
        ? "high"
        : "medium";
  const recoveryStatus = ["depleted", "low"].includes(recovery) || lowSleepScore || verySleepyWake
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
    lowSleepScore ? "sleep_score_low" : "",
    verySleepyWake ? "wake_very_sleepy" : "",
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
  return item && !isItemCompleted(item) && item.status !== "done" && item.status !== "完了";
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

function brainFormatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
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

function prioritySourceMeta(source) {
  const sources = {
    "operation-dashboard.todayTasks": {
      storageLabel: "今日やること",
      sectionSelector: "#todayTasks",
      staleThirtyReason: "30日以上残っている未完了の項目です。",
      staleSevenReason: "7日以上残っている未完了の項目です。",
    },
    "operation-dashboard.dailyTasks": {
      storageLabel: "毎日タスク",
      sectionSelector: "#dailyTasks",
      staleThirtyReason: "30日以上残っている未完了の項目です。",
      staleSevenReason: "7日以上残っている未完了の項目です。",
    },
    "operation-dashboard.projects": {
      storageLabel: "育てるプロジェクト",
      sectionSelector: "#projects",
      staleThirtyReason: "30日以上動きが止まっているプロジェクトです。",
      staleSevenReason: "7日以上動きが止まっているプロジェクトです。",
    },
    "operation-dashboard.laterItems": {
      storageLabel: "あとで見る・あとで読む",
      sectionSelector: "#laterList",
      staleThirtyReason: "30日以上前に保存したあとで見る・読む候補です。",
      staleSevenReason: "7日以上前に保存したあとで見る・読む候補です。",
    },
    "operation-dashboard.persistentMemos": {
      storageLabel: "研究ノート / 残るメモ",
      sectionSelector: "#persistentMemoList",
      staleThirtyReason: "30日以上前に書いた研究ノートです。",
      staleSevenReason: "7日以上前に書いた研究ノートです。",
    },
    "discovery-labo.discoveries": {
      storageLabel: "発見ラボ / 振り返り候補",
      appUrl: "https://mcwgw408-oss.github.io/discovery-Labo/",
      staleThirtyReason: "30日以上前からある振り返り候補のアイデアです。",
      staleSevenReason: "7日以上前からある振り返り候補のアイデアです。",
    },
    "hasshin-kansatsu-labo.entries": {
      storageLabel: "発信観察ラボ",
      appUrl: "https://mcwgw408-oss.github.io/observation-Labo/",
      staleTracking: false,
    },
    "substack-labo.writing": {
      storageLabel: "Substackラボ",
      appUrl: "https://mcwgw408-oss.github.io/substack-labo/",
      staleThirtyReason: "30日以上更新されていない執筆中の記事です。",
      staleSevenReason: "7日以上更新されていない執筆中の記事です。",
    },
    "koryu-log-labo.entries": {
      storageLabel: "交流ログ",
      appUrl: "https://mcwgw408-oss.github.io/action-Labo/",
      staleThirtyReason: "30日以上前の「また見たい人」記録です。",
      staleSevenReason: "7日以上前の「また見たい人」記録です。",
    },
    "operation-cockpit.intent": {
      storageLabel: "今日の意図",
      sectionSelector: "#dashboard-start",
    },
    "operation-dashboard.dailyInput": {
      storageLabel: "本日の入力",
      sectionSelector: "#dailyInput",
    },
  };
  return sources[source] || { storageLabel: source || "不明" };
}

function createPriorityCandidate({ item, source, sourceLabel, baseReason, basePoints }) {
  const title = brainTitleOf(item, "");
  const updatedAt = brainRecentDateOf(item);
  const createdAt = item?.createdAt || item?.date || "";
  const sourceMeta = prioritySourceMeta(source);
  return {
    id: item?.id || `${source}:${title}`,
    item,
    source,
    sourceLabel,
    title,
    done: isItemCompleted(item),
    status: item?.status || "open",
    priorityFlag: Boolean(item?.priority),
    createdAt,
    updatedAt,
    ageDays: brainDaysSince(createdAt),
    stalenessDays: brainDaysSince(updatedAt || item?.createdAt || item?.date),
    storageLabel: sourceMeta.storageLabel || sourceLabel || source,
    sectionSelector: sourceMeta.sectionSelector || "",
    appUrl: sourceMeta.appUrl || "",
    url: item?.url || item?.link || "",
    staleTracking: sourceMeta.staleTracking !== false,
    staleThirtyReason: sourceMeta.staleThirtyReason || "30日以上前から残っている項目です。",
    staleSevenReason: sourceMeta.staleSevenReason || "7日以上前から残っている項目です。",
    baseReason,
    basePoints,
  };
}

function buildCockpitIntentCandidate(cockpitIntent) {
  if (!cockpitIntent) return null;
  const directionFields = [
    ["topPriority", cockpitIntent.topPriority],
    ["todayFocus", cockpitIntent.todayFocus],
    ["articleNote", cockpitIntent.articleNote],
    ["growthTarget", cockpitIntent.growthTarget],
    ["noticed", cockpitIntent.noticed],
  ];
  const [intentField, direction] = directionFields.find(([, value]) => String(value || "").trim()) || [];
  if (!direction) return null;

  return {
    ...createPriorityCandidate({
      item: {
        id: `operation-cockpit.intent:${cockpitIntent.date || activeDate}`,
        title: direction,
        date: cockpitIntent.date || activeDate,
        updatedAt: cockpitIntent.updatedAt || "",
        priority: true,
      },
      source: "operation-cockpit.intent",
      sourceLabel: "今日の意図",
      baseReason: "朝に書いた今日の方向です。",
      basePoints: 100,
    }),
    intentDirection: true,
    intentField,
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
    baseReason: "あとで見る/読む候補として保存されています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.laterItem,
  })));
  context.persistentMemos.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.persistentMemos",
    sourceLabel: "研究ノート",
    baseReason: "最近更新された研究ノートです。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.persistentMemo,
  })));
  context.fermentingIdeas.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "discovery-labo.discoveries",
    sourceLabel: "振り返り候補",
    baseReason: "振り返り候補のアイデアです。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.fermentingIdea,
  })));
  context.hasshinNextActions
    .filter((item) => {
      const days = brainDaysSince(brainRecentDateOf(item));
      return days === null || days < 30;
    })
    .forEach((item) => candidates.push(createPriorityCandidate({
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
  if (candidate.staleTracking && candidate.stalenessDays >= 30) {
    score += PRIORITY_ENGINE_WEIGHTS.staleThirtyDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleThirtyDays, text: candidate.staleThirtyReason });
  } else if (candidate.staleTracking && candidate.stalenessDays >= 7) {
    score += PRIORITY_ENGINE_WEIGHTS.staleSevenDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleSevenDays, text: candidate.staleSevenReason });
  }
  if (isItemCompleted(candidate) || candidate.status === "done" || candidate.status === "完了") {
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

function buildDailyInputDecisionContext(value = "") {
  const text = String(value || "").trim();
  const firstLine = text.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || "";
  return {
    text,
    summary: firstLine.length > 72 ? `${firstLine.slice(0, 72)}…` : firstLine,
    recoverySignal: /休|疲|眠|寝不足|無理|しんど|回復|頭痛|体調/.test(text),
    lifeSignal: /買い出し|買い物|洗濯|掃除|支払い|通院|訪問看護|外出|役所/.test(text),
    publishingSignal: /記事|Substack|note|Notes|投稿|配信/.test(text),
  };
}

function buildDailyInputCandidate(dailyInputContext, day) {
  if (!dailyInputContext?.summary || (!dailyInputContext.lifeSignal && !dailyInputContext.publishingSignal)) {
    return null;
  }
  return createPriorityCandidate({
    item: {
      id: `daily-input:${activeDate}`,
      title: dailyInputContext.summary,
      date: activeDate,
      updatedAt: day.dailyInputUpdatedAt || day.updatedAt || "",
    },
    source: "operation-dashboard.dailyInput",
    sourceLabel: "今日の入力",
    baseReason: "今日の入力に、その日に扱いたい内容が書かれています。",
    basePoints: 28,
  });
}

function inferEnergyContext(day, completedToday, openTodayCount, health = null, dailyInputContext = null) {
  const totalOpen = openTodayCount + asArray(day.dailyTasks).filter(brainIsOpen).length;
  const reflection = day.reflection || {};
  const reflectionText = [reflection.didToday, reflection.blockedToday, reflection.tomorrowPlan].join(" ");
  const sleepHours = Number(health?.sleepHours);
  const sleepScore = Number(health?.sleepScore);
  const highSleepScore = Number.isFinite(sleepScore) && sleepScore >= 75;
  const lowSleepScore = Number.isFinite(sleepScore) && sleepScore > 0 && sleepScore < 50;
  const wakeFeeling = health?.wakeFeeling || "unknown";
  const sleepyWake = ["slightly_sleepy", "very_sleepy"].includes(wakeFeeling);
  const shortSleepRisk = Number.isFinite(sleepHours) &&
    sleepHours > 0 &&
    sleepHours < 3 &&
    !["refreshed", "normal"].includes(wakeFeeling) &&
    !highSleepScore;
  const healthNeedsRecovery = Boolean(health) && (
    ["very_low", "low", "unstable"].includes(health.energyLevel) ||
    ["depleted", "low"].includes(health.recoveryFeeling) ||
    ["high", "overwhelming"].includes(health.stressLevel) ||
    wakeFeeling === "very_sleepy" ||
    lowSleepScore ||
    (shortSleepRisk && sleepyWake)
  );
  if (healthNeedsRecovery) {
    return { state: "Recovery", modifier: -30, text: "選択日の体調・睡眠から、今日は回復と予定の余白を優先します。" };
  }
  if (dailyInputContext?.recoverySignal) {
    return { state: "Recovery", modifier: -30, text: "今日の入力に体調や休息の手がかりがあるため、無理をしない判断を優先します。" };
  }
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
  const adjustedScore = candidate.intentDirection
    ? 100
    : Math.max(
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
    .filter((candidate) => candidate.title && !isItemCompleted(candidate) && candidate.status !== "done" && candidate.status !== "完了")
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
      summary: "今日の実行候補が少ないため、今日は整える日として表示しています。",
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

function priorityCandidateReferenceItem(candidate) {
  if (!candidate) return null;
  const days = candidate.stalenessDays ?? candidate.ageDays;
  const dayLabel = candidate.staleTracking && Number.isFinite(days) ? `${days}日前` : "";
  const createdLabel = brainFormatDate(candidate.createdAt) || "不明";
  return {
    type: "brain-reference",
    id: candidate.id || "",
    source: candidate.source || "",
    title: dayLabel ? `${candidate.title || "無題"}（${dayLabel}）` : (candidate.title || "無題"),
    storageLabel: candidate.storageLabel || candidate.sourceLabel || candidate.source || "不明",
    createdLabel,
    sectionSelector: candidate.sectionSelector || "",
    url: candidate.url || "",
    appUrl: candidate.appUrl || "",
  };
}

function priorityCandidateMaterialLabels(candidate) {
  if (!candidate) {
    return ["今日の予定・タスク・記憶を確認しました。"];
  }
  const reference = priorityCandidateReferenceItem(candidate);
  const scoreParts = [
    reference,
    `参照元: ${candidate.sourceLabel || candidate.source || "不明"}`,
    `保存先: ${candidate.storageLabel || candidate.sourceLabel || candidate.source || "不明"}`,
    `作成日: ${brainFormatDate(candidate.createdAt) || "不明"}`,
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

function buildDailyConditionCandidate(eventContext, energyContext) {
  const hasEvents = eventContext.count > 0;
  const needsRecovery = energyContext.state === "Recovery";
  if (!hasEvents && !needsRecovery) return null;
  const title = hasEvents && needsRecovery
    ? "予定と休息の両立"
    : needsRecovery
      ? "休息を優先する"
      : "今日の予定を無理なく進める";
  const source = hasEvents ? "operation-dashboard.todayEvents" : "operation-dashboard.health";
  const sourceLabel = hasEvents ? "今日だけの予定" : "選択日の体調・睡眠";
  const reasonText = hasEvents && needsRecovery
    ? `${eventContext.text} 体調・睡眠もふまえ、予定以外を増やさない判断です。`
    : hasEvents
      ? `${eventContext.text} まず予定を一日の軸にします。`
      : energyContext.text;
  return {
    id: `daily-condition:${activeDate}`,
    item: { id: `daily-condition:${activeDate}`, title },
    source,
    sourceLabel,
    title,
    done: false,
    status: "open",
    priorityFlag: true,
    createdAt: activeDate,
    updatedAt: new Date().toISOString(),
    ageDays: 0,
    stalenessDays: 0,
    baseReason: reasonText,
    basePoints: 100,
    score: 100,
    rawScore: 100,
    adjustedScore: 100,
    reasons: [{ points: 100, text: reasonText }],
    modifiers: [],
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
  if (input.hasTodayEvents && input.energy.state === "Recovery") return "schedule_and_recover";
  if (input.energy.state === "Recovery") return "rest_first";
  if (input.hasTodayEvents && input.eventContext.level !== "Open") return "schedule_context";
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
    "operation-dashboard.todayEvents": "今日だけの予定を一日の軸にしています。",
    "operation-dashboard.health": "選択日の体調・睡眠から、休息を優先しています。",
    "operation-dashboard.dailyInput": "今日の入力に、その日に扱いたい内容があります。",
    "operation-dashboard.dailyTasks": "毎日タスクとして残っています。",
    "operation-dashboard.projects": "育てているプロジェクトに入っています。",
    "operation-dashboard.laterItems": "あとで見る項目として残っています。",
    "operation-dashboard.persistentMemos": "最近更新された研究ノートがあります。",
    "discovery-labo.discoveries": "振り返り候補のアイデアがあります。",
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
  if (input.hasFermentingIdeas && !reasons.includes("振り返り候補のアイデアがあります。")) {
    reasons.push("振り返り候補のアイデアがあります。");
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
      message: "今日の状態をふまえると、今日は回復を優先して良さそうです。",
      actionText: "新しい作業を増やさず、まず休める形を整えましょう。",
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
      message: `${input.eventContext.text} 今日はこの予定を一日の軸にして、ほかの作業は余力に合わせて良さそうです。`,
      actionText: "大きな作業より、予定の準備や少し休むことを優先しても良さそうです。",
    };
  }
  if (type === "schedule_and_recover") {
    return {
      title: "おはよう、さくら。",
      message: `${input.eventContext.text} 体調と睡眠もふまえ、今日は予定以外を増やさず、前後の休息を優先して良さそうです。`,
      actionText: "まず予定に必要な準備だけ確認し、休める時間を残しましょう。",
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
    adaptiveNote: "提案傾向のヒントは参考情報として見ています。今日の判断はさくらの状態整理を優先しています。",
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
      ? "提案フィードバックの傾向は参考情報として使える状態です。"
      : "提案フィードバックの傾向はまだ参考段階のため、控えめに扱います。",
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
      message: "提案フィードバックが少ないため、傾向はまだ参考段階です。",
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

function buildExplainLayerDetails(
  input,
  recommendation,
  memoryContext = {},
  healthAwareRecommendation = null,
  learningContext = null,
) {
  const seenInfo = [
    input.topCandidate ? `${input.topCandidate.sourceLabel}の候補を見ています。` : "今日の候補全体を軽く見ています。",
    input.openTodayCount ? `今日やることに未完了が${input.openTodayCount}件あります。` : "今日やることの未完了は少なめです。",
    input.hasTodayEvents ? `今日の予定が${input.eventContext.count}件あります。` : "",
    input.hasFermentingIdeas ? "振り返り候補のアイデアがあります。" : "",
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
  const learningSummary = learningContext?.summary || buildLearningSummary();
  const learningHint = learningContext?.hint || buildLearningHint(learningSummary);
  const learningConfidence = learningContext?.confidence || buildLearningConfidence(learningSummary, learningHint);
  if (memoryContext.used) {
    uncertainty.push("記憶は補助情報として参照しています。優先度判断や提案の種類は記憶で上書きしていません。");
  }
  if (learningSummary.commonRecommendationType !== "なし" && learningSummary.recentAcceptanceRate !== null) {
    uncertainty.push(`最近は「${displayRecommendationType(learningSummary.commonRecommendationType)}」の提案が記録されており、一致率は${learningSummary.recentAcceptanceRate}%です。`);
  }
  uncertainty.push(`${learningHint.message} このヒントは過去の提案フィードバックから生成され、参考情報として扱われます。`);
  uncertainty.push(`提案傾向の確かさは${learningConfidence.score}%です。さくらはこの値を見ながら、提案フィードバックの傾向を補助情報として扱います。`);
  if (recommendation.adaptiveNote) {
    uncertainty.push("提案フィードバックの傾向は補助情報として扱い、今日の候補・予定・エネルギーを見たさくらの判断を優先しています。");
  }
  if (!input.topCandidate) {
    uncertainty.push("候補が少ないため、優先順位は軽めに扱っています。");
  }
  if (input.hasTodayEvents) {
    uncertainty.push("予定は着手候補ではなく、今日の余白や負荷を見る材料として扱っています。");
  }
  if (input.energy.state === "Normal" && input.momentum.state === "Stable") {
    uncertainty.push("エネルギーと勢いに大きな偏りが見えていないため、説明は控えめにしています。");
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

function renderExplainLayerDetails(details, referenceItem = null) {
  appendBrainItems($("#explainSeenInfo"), details.seenInfo, "見ている情報はまだ少なめです。");
  appendBrainItems(
    $("#explainMainReasons"),
    [referenceItem, ...asArray(details.mainReasons)].filter(Boolean),
    "主な理由はまだありません。",
  );
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

function shouldRegenerateBrainForIntentChange(
  storageKey,
  firstAgentReply = currentFirstAgentReply,
) {
  return storageKey === OPERATION_COCKPIT_STORAGE_KEY && !firstAgentReply;
}

function handleOperationCockpitStorageChange(event) {
  if (!shouldRegenerateBrainForIntentChange(event?.key)) return;
  renderBrainPrototype();
}

function dailyFocusValue(value) {
  const text = String(value || "").trim();
  return text && text !== "-" ? text : "";
}

function pickDailyFocusTask(todayTasks = []) {
  const openTodayTasks = asArray(todayTasks).filter(brainIsOpen);
  return (
    openTodayTasks.find((task) => task.priority) ||
    openTodayTasks[0] ||
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
  selectedFocusTask,
} = {}) {
  const focusTask = selectedFocusTask === undefined
    ? pickDailyFocusTask(todayTasks)
    : selectedFocusTask;
  const dailyInputNote = dailyFocusValue(dailyInput);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));
  const taskCount = asArray(todayTasks).filter(brainIsOpen).length;
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

function renderContextSummary(summary = {}) {
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
  const support = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.recommendationSupport));
  const caution = dailyFocusValue(localizeHealthUiText(healthAwareRecommendation?.cautionNote));
  const dailyInputNote = dailyFocusValue(dailyInput);
  const memoryTitle = dailyFocusValue(
    memoryDisplayTitle(memoryContext?.retrieved?.[0]) ||
    memoryDisplayTitle(memoryContext?.recent?.[0]),
  );
  const lines = ["おはようございます、今日は無理なく一つずつ始めましょう。"];

  if (caution) {
    lines.push(caution);
  } else if (support) {
    lines.push(support);
  } else if (dailyInputNote) {
    lines.push("今日の入力メモも参考にしています。");
  } else if (memoryTitle) {
    lines.push(`記憶では「${memoryTitle}」も見ています。`);
  }

  return lines.slice(0, 2).join("\n");
}

const INTENT_SAFETY_MESSAGE = "その方向でいきましょう。今日は少し小さめの入口から始めると良さそうです。";

function buildIntentAwareRecommendation(recommendation, intentDecision) {
  if (!intentDecision) return recommendation;

  const directionReceipt = `今日の意図「${intentDecision.direction}」を受け取りました。`;
  const stepMessage = intentDecision.safetyAdjustment
    ? INTENT_SAFETY_MESSAGE
    : `その方向へ進むための今日の一歩として、${recommendation.actionText}`;
  const intentReason = intentDecision.safetyAdjustment
    ? "今日の意図を方向として受け取り、既存の体調記録をもとに歩幅を小さめにしました。"
    : "今日の意図を方向として受け取り、現在の状況から実行できる歩幅を決めました。";

  return {
    ...recommendation,
    message: `${directionReceipt}\n${stepMessage}`,
    actionText: intentDecision.safetyAdjustment
      ? "まず5分だけ、その方向の入口に触れてみましょう。"
      : recommendation.actionText,
    reasons: [...asArray(recommendation.reasons), intentReason],
  };
}

function applyIntentToExplainLayer(details, intentDecision) {
  if (!intentDecision) return details;

  return {
    ...details,
    seenInfo: [
      ...details.seenInfo,
      `今日の意図「${intentDecision.direction}」を原文のまま受け取っています。`,
    ],
    mainReasons: [
      ...details.mainReasons,
      intentDecision.safetyAdjustment
        ? "意図の方向は変えず、既存の体調記録をもとに今日の歩幅だけを小さくしています。"
        : "意図の方向は変えず、現在の状況から今日実行できる歩幅を提案しています。",
    ],
  };
}

function buildBrainExpression({
  brainContext,
  brainDecision,
  adaptiveGuidance = buildAdaptiveGuidanceScores(),
  explainLearningContext = null,
} = {}) {
  const {
    day,
    todayTasks,
    dailyTasks,
  } = brainContext;
  const {
    priorityCandidate,
    recommendationInput,
    recommendation,
    brainMemoryContext,
    healthAwareRecommendation,
    intentDecision,
  } = brainDecision;
  const recommendationExpression = buildIntentAwareRecommendation(
    recommendation,
    intentDecision,
  );
  const focusTask = pickDailyFocusTask(todayTasks);
  const expressionContext = {
    priorityCandidate,
    recommendation: recommendationExpression,
    healthAwareRecommendation,
    memoryContext: brainMemoryContext,
    todayTasks,
    dailyTasks,
    dailyInput: day.dailyInput,
    adaptiveGuidance,
  };
  const contextSummary = buildContextSummary({
    ...expressionContext,
    selectedFocusTask: focusTask,
  });
  const explainLayerDetails = buildExplainLayerDetails(
    recommendationInput,
    recommendationExpression,
    brainMemoryContext,
    healthAwareRecommendation,
    explainLearningContext,
  );

  return {
    recommendation: recommendationExpression,
    explainLayerDetails: applyIntentToExplainLayer(explainLayerDetails, intentDecision),
    contextSummary,
    morningGuidanceText: buildMorningGuidanceText({
      ...expressionContext,
      contextSummary,
    }),
    dailyFocus: {
      priority:
        dailyFocusValue(contextSummary?.theme) ||
        dailyFocusValue(priorityCandidate?.title) ||
        dailyFocusValue(recommendationExpression?.title) ||
        "今日はまず整えることを優先します。",
      nextAction:
        dailyFocusValue(recommendationExpression?.actionText) ||
        (focusTask ? `「${focusTask.title}」を5分だけ始める` : "最初の一手を1つだけ決める"),
      condition: buildDailyFocusCondition(
        healthAwareRecommendation,
        brainMemoryContext,
        day.dailyInput,
      ),
      taskLabel: focusTask?.title ? "今日やること" : "今日の候補",
      task: focusTask?.title || dailyFocusValue(priorityCandidate?.title) || "今日の候補はまだありません。",
      taskIsTodayTask: Boolean(focusTask?.title),
    },
    focusTask,
  };
}

function renderMorningGuidanceLayer(morningGuidanceText = "") {
  const target = $("#morningGuidanceText");
  if (!target) return;
  target.textContent = morningGuidanceText;
}

function renderDailyFocusLayer(dailyFocus = {}) {
  if (!$("#dailyFocusPriority")) return;
  $("#dailyFocusPriority").textContent = dailyFocus.priority;
  $("#dailyFocusNextAction").textContent = dailyFocus.nextAction;
  $("#dailyFocusCondition").textContent = dailyFocus.condition;
  const taskLabel = $("#dailyFocusTaskLabel");
  if (taskLabel) taskLabel.textContent = dailyFocus.taskLabel || "今日の候補";
  $("#dailyFocusTask").textContent = dailyFocus.task;
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
  const focusTask = pickDailyFocusTask(todayTasks);
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

function collectBrainContext() {
  const day = store[activeDate] || {};
  const dailyTasks = asArray(day.dailyTasks);
  const todayTasks = asArray(day.todayTasks);
  const todayEvents = asArray(day.todayEvents);
  const projects = asArray(day.projects);
  const todayCompletion = todayCompletionStats(day);
  const completedToday = todayCompletion.done;
  const completedDailyTasks = dailyTasks.filter(isItemCompleted).length;
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
  const recentMemos = persistentMemos.filter((memo) => brainDaysSince(memo.updatedAt || memo.createdAt) !== null && brainDaysSince(memo.updatedAt || memo.createdAt) <= 7);
  const cockpitIntent = buildOperationCockpitIntentContext(
    readOperationCockpitStore(),
    activeDate,
  );
  return {
    activeDate,
    day,
    dailyTasks,
    todayTasks,
    todayEvents,
    projects,
    reflection,
    todayCompletion,
    completedToday,
    completedDailyTasks,
    openToday,
    laterOpen,
    persistentMemos,
    recentMemos,
    discoveries,
    fermentingIdeas,
    writingItems,
    writingInProgress,
    hasshinEntries,
    hasshinNextActions,
    koryuEntries,
    revisitPeople,
    cockpitIntent,
    learningLog,
    memoryStore,
    healthState,
  };
}

function buildBrainDecision(brainContext) {
  const {
    activeDate: brainActiveDate,
    day,
    dailyTasks,
    todayTasks,
    todayEvents,
    projects,
    completedToday,
    openToday,
    laterOpen,
    fermentingIdeas,
    writingInProgress,
    hasshinNextActions,
    revisitPeople,
    recentMemos,
    cockpitIntent,
    learningLog: brainLearningLog,
    memoryStore: brainMemoryStore,
    healthState: brainHealthState,
  } = brainContext;
  const recentHealthStates = [...asArray(brainHealthState)]
    .sort((a, b) =>
      String(b.date || b.updatedAt || b.createdAt).localeCompare(String(a.date || a.updatedAt || a.createdAt)),
    );
  const applicableHealthStates = recentHealthStates.filter((item) => !item.date || item.date <= brainActiveDate);
  const activeHealthState = asArray(brainHealthState).find((item) => item.date === brainActiveDate) || null;
  const dailyInputContext = buildDailyInputDecisionContext(day.dailyInput);
  const energyContext = inferEnergyContext(
    day,
    completedToday,
    openToday.length,
    activeHealthState,
    dailyInputContext,
  );
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
  const dailyInputCandidate = buildDailyInputCandidate(dailyInputContext, day);
  if (dailyInputCandidate) candidates.unshift(dailyInputCandidate);
  const intentCandidate = buildCockpitIntentCandidate(cockpitIntent);
  if (intentCandidate) candidates.unshift(intentCandidate);
  const rankedCandidates = rankPriorityCandidates(candidates, energyContext, momentumContext);
  const conditionCandidate = buildDailyConditionCandidate(eventContext, energyContext);
  const priorityCandidate = conditionCandidate || rankedCandidates[0];
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
  const baseRecommendation = buildRecommendation(recommendationInput);
  const learningSummary = buildLearningSummary(brainLearningLog);
  const learningHint = buildLearningHint(learningSummary);
  const memoryRetrievalContext = buildMemoryRetrievalContext({
    priorityCandidate,
    recommendationType: baseRecommendation.type,
    eventContext,
  });
  const brainMemoryContext = buildBrainMemoryContext(memoryRetrievalContext, brainMemoryStore);
  const recommendation = applyBrainMemoryContext(adaptRecommendationWithLearning(
    baseRecommendation,
    learningHint,
    learningSummary,
  ), brainMemoryContext);
  const healthContext = buildHealthContext(
    activeHealthState,
    buildHealthInsight(applicableHealthStates.slice(0, 7)),
    buildHealthTrend(applicableHealthStates.slice(0, 14)),
  );
  const healthAwareRecommendation = buildHealthAwareRecommendation(
    recommendation,
    healthContext,
  );
  const intentSafetyAdjustment = Boolean(
    intentCandidate &&
    activeHealthState &&
    (
      ["very_low", "low", "unstable"].includes(activeHealthState.energyLevel) ||
      ["depleted", "low"].includes(activeHealthState.recoveryFeeling)
    ),
  );

  return {
    energyContext,
    momentumContext,
    eventContext,
    candidates,
    rankedCandidates,
    priorityCandidate,
    explanation,
    recommendationInput,
    baseRecommendation,
    learningSummary,
    learningHint,
    memoryRetrievalContext,
    brainMemoryContext,
    recommendation,
    healthAwareRecommendation,
    activeHealthState,
    healthContext,
    dailyInputContext,
    intentDecision: intentCandidate
      ? {
          direction: intentCandidate.title,
          sourceField: intentCandidate.intentField,
          safetyAdjustment: intentSafetyAdjustment,
        }
      : null,
  };
}

function renderBrainPrototype() {
  if (!$("#brainPriority")) return;

  const brainContext = collectBrainContext();
  const {
    day,
    dailyTasks,
    todayTasks,
    todayEvents,
    projects,
    completedToday,
    openToday,
    laterOpen,
    persistentMemos,
    reflection,
    fermentingIdeas,
    writingInProgress,
    hasshinNextActions,
    revisitPeople,
    recentMemos,
  } = brainContext;
  const {
    energyContext,
    momentumContext,
    eventContext,
    priorityCandidate,
    explanation,
    recommendationInput,
    learningHint,
    memoryRetrievalContext,
    brainMemoryContext,
    recommendation,
    healthAwareRecommendation,
    activeHealthState,
    healthContext,
    dailyInputContext,
    intentDecision,
  } = buildBrainDecision(brainContext);
  const newestMemo = persistentMemos
    .filter((memo) => memo.updatedAt || memo.createdAt)
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const explainLearningSummary = buildLearningSummary();
  const explainLearningHint = buildLearningHint(explainLearningSummary);
  const explainLearningConfidence = buildLearningConfidence(explainLearningSummary, explainLearningHint);
  const learningEntry = syncCurrentLearningLog(recommendationInput, recommendation, {
    taskCount: todayTasks.length,
  });
  const latestLearningSummary = buildLearningSummary();
  const latestLearningHint = buildLearningHint(latestLearningSummary);
  const latestLearningConfidence = buildLearningConfidence(latestLearningSummary, latestLearningHint);
  const adaptiveGuidance = buildAdaptiveGuidanceScores();
  const brainExpression = buildBrainExpression({
    brainContext,
    brainDecision: {
      priorityCandidate,
      recommendationInput,
      recommendation,
      brainMemoryContext,
      healthAwareRecommendation,
      intentDecision,
    },
    adaptiveGuidance,
    explainLearningContext: {
      summary: explainLearningSummary,
      hint: explainLearningHint,
      confidence: explainLearningConfidence,
    },
  });
  const {
    recommendation: recommendationExpression,
    explainLayerDetails,
    contextSummary,
    morningGuidanceText,
    dailyFocus,
  } = brainExpression;
  currentRecommendation = recommendationExpression;
  const healthAwareConversation = buildHealthAwareConversation(healthContext);
  const conversationContext = buildConversationContext({
    project: brainMemoryContext.project || priorityCandidate?.title || "",
    recommendation: recommendationExpression,
    explanation,
    learningHint: latestLearningHint,
    learningConfidence: latestLearningConfidence,
    memoryContext: brainMemoryContext,
    healthAwareConversation,
    dailyInputContext,
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
    activeHealthState,
    buildHealthInsight(getRecentHealthStates()),
    getLatestHealthTrend(),
    healthContext,
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
  appendBrainItems(
    $("#brainPriorityReasons"),
    [priorityCandidateReferenceItem(priorityCandidate), ...explanation.reasons].filter(Boolean),
    "理由はまだありません。",
  );

  $("#brainRecommendationTitle").textContent = recommendationExpression.title;
  $("#brainRecommendationMessage").textContent = recommendationExpression.message;
  $("#brainRecommendationAction").textContent = recommendationExpression.actionText;
  const adaptiveNote = $("#brainAdaptiveNote");
  if (adaptiveNote) {
    adaptiveNote.textContent = recommendationExpression.adaptiveNote || "";
    adaptiveNote.hidden = !recommendationExpression.adaptiveNote;
  }
  appendBrainItems($("#brainRecommendationReasons"), recommendationExpression.reasons, "今日は理由を少なくして、軽く整える提案です。");
  renderHealthAwareRecommendation(healthAwareRecommendation);
  renderExplainLayerDetails(explainLayerDetails, priorityCandidateReferenceItem(priorityCandidate));
  renderLearningFeedback(learningEntry);
  renderLearningSummary(latestLearningSummary);
  renderLearningHint(latestLearningHint);
  renderLearningConfidence(latestLearningConfidence);
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
    "振り返り候補のアイデアはまだありません。",
  );

  appendBrainItems(
    $("#brainWritingItems"),
    writingInProgress.map((item) => brainTitleOf(item, "無題の記事")),
    "執筆中の記事はまだありません。",
  );

  const recentHasshinNextActions = hasshinNextActions.filter((entry) => {
    const days = brainDaysSince(brainRecentDateOf(entry));
    return days === null || days < 30;
  });
  const newestHasshin = recentHasshinNextActions
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const newestRevisit = revisitPeople
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const recentChanges = [
    getLatestHealthState()?.updatedAt ? `体調入力: 体調チェック更新 ${brainFormatDateTime(getLatestHealthState().updatedAt)}` : "",
    day.dailyInput ? "今日の入力: 自由入力メモを参照" : "",
    newestHasshin?.nextAction ? `発信観察の次アクション: ${newestHasshin.nextAction}` : "",
    newestRevisit?.name ? `また見たい人: ${newestRevisit.name}` : "",
    newestMemo ? `研究ノート更新: ${brainFormatDateTime(newestMemo.updatedAt || newestMemo.createdAt)}` : "",
    day.updatedAt ? `今日の記録更新: ${brainFormatDateTime(day.updatedAt)}` : "",
  ];
  appendBrainItems($("#brainRecentChanges"), recentChanges, "最近の変化はまだありません。");
  renderContextSummary(contextSummary);
  renderDailyFocusLayer(dailyFocus);
  renderMorningGuidanceLayer(morningGuidanceText);
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
  renderTodayOnlyDateLabels();
  listIds.forEach(renderTaskList);
  renderEventList();
  renderRecurringSchedule();
  renderMailLastChecked();
  renderActivityLog();
  renderPersistentMemos();
  renderReadingQueue();
  renderReadingNotes();
  renderLearningAssets();
  renderReadingLaboTemplate();
  renderLearnings();
  renderLearningGlobalSearch();
  renderPublishingOps();
  renderSubstack();
  renderNotePages();
  renderXPageV1();
  renderWordPressPageV1();
  renderXAnalysis();
  renderCodexDailyLog();
  setPublishingSeedActiveView(publishingSeedActiveView);
  renderPublishingSeedCandidates();
  renderPublishingSeeds();
  renderXExperimentLogs();
  renderOperationExperiment();
  renderLaterItems();
  renderFields();
  renderHomeSleepSummary();
  renderAfterTenMode();
  renderHealthState();
  renderWelcomeHomePanel();
  renderSummary();
  renderHistory();
  renderBrainPrototype();
  renderMemoryLibrary();
  applySakuraInnerToggle();
  showPageEntry(activePageEntry);
}

function moveDashboardNode(selector, targetSelector) {
  const node = document.querySelector(selector);
  const target = document.querySelector(targetSelector);
  if (!node || !target || node.parentElement === target) return;
  target.append(node);
}

function arrangeDashboardUxSections() {
  moveDashboardNode(".generated-reply-panel", "#generatedReplyMount");
  moveDashboardNode(".health-check-panel", "#homeSleepHealthCheckMount");
  moveDashboardNode(".health-insight-panel", "#healthAnalysisMount");
  moveDashboardNode(".health-trend-panel", "#healthAnalysisMount");
  moveDashboardNode(".health-context-panel", "#healthAnalysisMount");
  moveDashboardNode("#memoryMemoForm", "#memoryMemoInputMount");
  moveDashboardNode(".conversation-feedback-panel", "#replyFeedbackMount");
}

function sakuraInnerToggleTargets() {
  const targets = [
    ...document.querySelectorAll(".developer-state-panel"),
    ...document.querySelectorAll(".brain-decision-details"),
    ...document.querySelectorAll(".health-aware-recommendation-panel"),
    ...document.querySelectorAll(".explain-layer-panel"),
  ];
  document.querySelectorAll(".brain-section-heading").forEach((heading) => {
    const text = heading.textContent || "";
    if (text.includes("さくらの内部状態") || text.includes("必要なとき見る情報")) {
      targets.push(heading);
    }
  });
  const memoryLabel = document.querySelector(".memory-layer-panel > .brain-label");
  if (memoryLabel) targets.push(memoryLabel);
  return targets;
}

function applySakuraInnerToggle() {
  const toggle = $("#sakuraInnerToggle");
  const isVisible = Boolean(toggle?.checked);
  sakuraInnerToggleTargets().forEach((target) => {
    target.hidden = !isVisible;
    if (!isVisible && target.tagName === "DETAILS") {
      target.open = false;
    }
  });
}

function updateBackToTopVisibility() {
  const button = $("#backToTop");
  if (!button) return;
  button.hidden = window.scrollY < 600;
}

function scrollBackToTop() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

function setArchivePageVisible(visible) {
  ARCHIVE_PAGE_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.hidden = !visible;
    });
  });
}

function setTodayInputPageVisible(visible) {
  TODAY_INPUT_PAGE_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.hidden = !visible;
    });
  });
}

function showPageEntry(entryName = "", options = {}) {
  activePageEntry = entryName;
  const substackPanel = $("#substackPage");
  const noteConfig = notePageConfigs[entryName];
  const xPagePanel = $("#xPageV1");
  const wordpressPagePanel = $("#wordpressPageV1");
  const seedPagePanel = $("#publishing-seeds");
  const seedWorkbenchTabs = document.querySelector(".publishing-seed-workbench-tabs");
  const readingPagePanel = $("#reading-notes");
  const learningAssetPagePanel = $("#learning-asset-flow");
  const memoPagePanel = $("#memo-page");
  const todayInputPagePanel = $("#todayInputPage");
  const archivePagePanel = $("#archivePage");
  const substaVillagePagePanel = $("#sakuraSubstaVillagePage");
  const activityExperimentPagePanel = $("#activityExperimentPage");
  const articleIdeasPagePanel = $("#articleIdeasPage");
  const placeholder = $("#pageSwitchPlaceholder");
  const title = $("#pageSwitchTitle");
  const isSubstack = entryName === "Substack";
  const isNote = Boolean(noteConfig);
  const isXPage = entryName === "X";
  const isWordPressPage = entryName === "WordPress";
  const isSeedPage = entryName === "Seed";
  const isReadingPage = entryName === "読書" || entryName === "読書Labo" || entryName === "Knowledge Labo" || entryName === "知識ラボ";
  const isMemoPage = entryName === "メモ";
  const isTodayInputPage = entryName === "今日の入力";
  const isArchivePage = entryName === "Archive";
  const isSubstaVillagePage = entryName === "サブスタ村活用";
  const isActivityExperimentPage = entryName === "活動実験";
  const isArticleIdeasPage = entryName === "記事アイデア";
  const visibleEntryPanel = isSubstack
    ? substackPanel
    : isNote
      ? $(noteConfig.pageId)
      : isXPage
        ? xPagePanel
        : isWordPressPage
          ? wordpressPagePanel
          : isSeedPage
            ? seedPagePanel
            : isReadingPage
              ? learningAssetPagePanel
              : isMemoPage
                ? memoPagePanel
                : isTodayInputPage
                  ? todayInputPagePanel
                  : isArchivePage
                    ? archivePagePanel
                    : isSubstaVillagePage
                      ? substaVillagePagePanel
                      : isActivityExperimentPage
                        ? activityExperimentPagePanel
                        : isArticleIdeasPage
                          ? articleIdeasPagePanel
                          : null;
  if (substackPanel) substackPanel.hidden = !isSubstack;
  Object.values(notePageConfigs).forEach((config) => {
    const panel = $(config.pageId);
    if (panel) panel.hidden = config !== noteConfig;
  });
  if (xPagePanel) xPagePanel.hidden = !isXPage;
  if (wordpressPagePanel) wordpressPagePanel.hidden = !isWordPressPage;
  if (seedPagePanel && !isSeedPage) seedPagePanel.hidden = true;
  if (readingPagePanel) readingPagePanel.hidden = true;
  if (learningAssetPagePanel) learningAssetPagePanel.hidden = !isReadingPage;
  if (memoPagePanel) memoPagePanel.hidden = !isMemoPage;
  if (todayInputPagePanel) todayInputPagePanel.hidden = !isTodayInputPage;
  if (archivePagePanel) archivePagePanel.hidden = !isArchivePage;
  if (substaVillagePagePanel) substaVillagePagePanel.hidden = !isSubstaVillagePage;
  if (activityExperimentPagePanel) activityExperimentPagePanel.hidden = !isActivityExperimentPage;
  if (articleIdeasPagePanel) articleIdeasPagePanel.hidden = !isArticleIdeasPage;
  setTodayInputPageVisible(isTodayInputPage);
  setArchivePageVisible(isArchivePage);
  if (seedWorkbenchTabs) seedWorkbenchTabs.hidden = !(isSeedPage || isArchivePage);
  if (placeholder) placeholder.hidden = isSubstack || isNote || isXPage || isWordPressPage || isSeedPage || isReadingPage || isMemoPage || isTodayInputPage || isArchivePage || isSubstaVillagePage || isActivityExperimentPage || isArticleIdeasPage || !entryName;
  if (title) title.textContent = entryName;
  if (isSubstack) renderSubstack();
  if (noteConfig) renderNotePage(noteConfig);
  if (isXPage) renderXPageV1();
  if (isWordPressPage) renderWordPressPageV1();
  if (isSeedPage) {
    setPublishingSeedActiveView("news");
    renderPublishingSeedCandidates();
    renderPublishingSeeds();
  }
  if (isReadingPage) {
    renderReadingQueue();
    renderLearningAssets();
    renderReadingLaboTemplate();
  }
  if (isMemoPage) renderPersistentMemos();
  if (isTodayInputPage) {
    renderXExperimentLogs();
    renderLearnings();
    renderLearningGlobalSearch();
    renderCodexDailyLog();
  }
  if (isArchivePage) {
    renderPublishingOps();
    renderXAnalysis();
    renderPublishingSeedCandidates();
    renderXExperimentLogs();
    renderOperationExperiment();
    renderLaterItems();
    renderLearnings();
    renderLearningGlobalSearch();
    renderMemoryLibrary();
    renderHistory();
  }
  if (isSubstaVillagePage) fillSubstaVillagePage();
  if (options.scroll && visibleEntryPanel && !visibleEntryPanel.hidden) {
    requestAnimationFrame(() => {
      visibleEntryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function bindEvents() {
  window.addEventListener("storage", handleOperationCockpitStorageChange);
  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  $("#backToTop")?.addEventListener("click", scrollBackToTop);
  updateBackToTopVisibility();
  $("#explainLayerToggle")?.addEventListener("click", () => {
    const body = $("#explainLayerBody");
    setExplainLayerExpanded(Boolean(body?.hidden));
  });
  $("#sakuraInnerToggle")?.addEventListener("change", applySakuraInnerToggle);
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
      renderMemoryLibrary();
    });
  });
  $("#copyReadingLaboTemplate")?.addEventListener("click", copyReadingLaboTemplate);
  $("#addConceptBookSample")?.addEventListener("click", addFirstKnowledgeSampleCards);
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
    const action = hasSavedDailyInput(getDay()) ? "本日の入力を更新する" : "本日の入力を保存する";
    if (status) status.textContent = `未保存の入力があります。「${action}」を押してください。`;
  });
  $("#saveDailyInput")?.addEventListener("click", () => {
    const day = getDay();
    const wasSaved = hasSavedDailyInput(day);
    day.dailyInput = $("#dailyInputText")?.value || "";
    day.dailyInputUpdatedAt = new Date().toISOString();
    saveStore();
    renderSummary();
    renderHistory();
    renderBrainPrototype();
    const action = wasSaved ? "更新" : "保存";
    renderDailyInputSaveState(
      day,
      `本日の入力を${action}しました。最終更新 ${formatSavedAt(day.dailyInputUpdatedAt)}。さくらの判断材料に反映しました。`,
    );
  });
  $("#capacityCheckGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-capacity-key]");
    if (!button) return;
    const day = getDay();
    const key = button.dataset.capacityKey;
    const value = button.dataset.capacityValue;
    if (!CAPACITY_CHECK_ITEMS.some((item) => item.key === key)) return;
    day.capacityCheck ||= {};
    day.capacityCheck[key] = day.capacityCheck[key] === value ? "" : value;
    day.capacityCheckUpdatedAt = new Date().toISOString();
    saveStore();
    renderCapacityCheck(day, `「${CAPACITY_CHECK_ITEMS.find((item) => item.key === key)?.label || key}」を保存しました。`);
  });
  $("#afterTenModeOptions")?.addEventListener("change", (event) => {
    if (!event.target.matches("input[type='checkbox']")) return;
    const day = getDay();
    day.afterTenMode = [...document.querySelectorAll("#afterTenModeOptions input[type='checkbox']:checked")]
      .map((input) => input.value);
    day.afterTenModeUpdatedAt = new Date().toISOString();
    saveStore();
    renderAfterTenMode(day);
  });
  $("#afterTenModeOptions")?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-after-ten-delete]");
    if (!deleteButton) return;
    event.preventDefault();
    event.stopPropagation();
    const option = deleteButton.dataset.afterTenDelete || "";
    if (!option) return;
    removeAfterTenModeOption(option);
    renderAfterTenMode(getDay());
    const status = $("#afterTenModeStatus");
    if (status) status.textContent = `「${option}」を削除しました。`;
  });
  $("#afterTenModeAddForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#afterTenModeNewOption");
    const value = normalizeAfterTenModeOption(input?.value);
    const status = $("#afterTenModeStatus");
    if (!value) {
      if (status) status.textContent = "追加する項目名を入力してください。";
      input?.focus();
      return;
    }
    if (afterTenModeOptions().includes(value)) {
      if (status) status.textContent = `「${value}」はすでにあります。`;
      input?.focus();
      return;
    }
    deletedAfterTenModeOptions = deletedAfterTenModeOptions.filter((option) => option !== value);
    if (!DEFAULT_AFTER_TEN_MODE_OPTIONS.includes(value)) customAfterTenModeOptions.push(value);
    saveCustomAfterTenModeOptions();
    saveDeletedAfterTenModeOptions();
    if (input) input.value = "";
    renderAfterTenMode(getDay());
    if (status) status.textContent = `「${value}」を追加しました。必要ならチェックしてください。`;
  });
  document.querySelectorAll("[data-page-entry]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll("[data-page-entry]").forEach((entry) => {
        entry.classList.toggle("is-active", entry === button);
      });
      showPageEntry(button.dataset.pageEntry || "", { scroll: true });
    });
  });
  $("#addReadingQueueBook")?.addEventListener("click", () => {
    readingQueue.unshift(newReadingQueueBook());
    saveReadingQueue();
    renderReadingQueue();
    requestAnimationFrame(() => {
      $("#readingQueueList input")?.focus();
    });
  });
  $("#saveReadingQueue")?.addEventListener("click", () => {
    saveReadingQueue();
    renderReadingQueue();
  });
  document.querySelectorAll("[data-weather-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const weather = normalizeTodayWeather(button.dataset.weatherChoice);
      if (!weather) return;
      const day = getDay();
      day.todayWeather = weather;
      day.todayWeatherUpdatedAt = new Date().toISOString();
      saveStore();
      renderWelcomeHomePanel();
    });
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
      renderHomeSleepSummary();
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
  bindHealthInput("#healthSleepCount", "sleepCount", "input");
  ["#healthLongestSleepHours", "#healthLongestSleepMinutes"].forEach((selector) => {
    $(selector)?.addEventListener("input", () => {
      upsertHealthState({ longestSleepMinutes: sleepDurationFromInputs() });
      renderHealthState();
      renderHomeSleepSummary();
      renderHealthInsight();
      renderHealthTrend();
      renderHealthContext();
      renderHealthAwareConversation();
      renderHealthAwareRecommendation();
      renderAdaptiveIntelligence();
      renderExecutiveSummary();
    });
  });
  bindHealthInput("#healthWakeFeeling", "wakeFeeling");
  bindHealthInput("#healthSleepScore", "sleepScore", "input");
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
    renderMemoryLibrary();
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
      if (form.dataset.addList === "dailyTasks") addCustomDailyTask(title);
      getDay()[form.dataset.addList].push(newItem(title));
      if (form.dataset.addList === "dailyTasks") saveDailyTaskOrderFromDay(getDay());
      input.value = "";
      saveStore();
      renderTaskList(form.dataset.addList);
      renderBrainPrototype();
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
    sortTodayEvents(getDay());
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
  $("#persistentMemoSearch")?.addEventListener("input", (event) => {
    persistentMemoSearchQuery = event.target.value;
    renderPersistentMemos();
  });
  $("#newReadingNote")?.addEventListener("click", () => openReadingNoteForm());
  $("#cancelReadingNoteEdit")?.addEventListener("click", closeReadingNoteForm);
  $("#readingNoteForm")?.addEventListener("submit", saveReadingNoteFromForm);
  $("#deleteReadingNote")?.addEventListener("click", deleteEditingReadingNote);
  $("#readingNoteSearch")?.addEventListener("input", (event) => {
    readingNoteSearchQuery = event.target.value;
    renderReadingNotes();
  });
  document.querySelectorAll(".reading-note-form textarea").forEach((textarea) => {
    textarea.addEventListener("input", () => autoResizeReadingTextarea(textarea));
  });
  $("#newLearningAsset")?.addEventListener("click", () => openLearningAssetForm());
  $("#cancelLearningAssetEdit")?.addEventListener("click", closeLearningAssetForm);
  $("#learningAssetForm")?.addEventListener("submit", saveLearningAssetFromForm);
  $("#deleteLearningAsset")?.addEventListener("click", deleteEditingLearningAsset);
  $("#learningAssetSearch")?.addEventListener("input", (event) => {
    learningAssetSearchQuery = event.target.value;
    renderLearningAssets();
  });
  $("#clearKnowledgeSearch")?.addEventListener("click", () => {
    learningAssetSearchQuery = "";
    learningAssetStatusFilter = "all";
    renderLearningAssets();
  });
  $("#learningAssetStatusFilter")?.addEventListener("change", (event) => {
    learningAssetStatusFilter = event.target.value;
    renderLearningAssets();
  });
  $("#substaVillageDailyForm")?.addEventListener("submit", saveSubstaVillageDaily);
  $("#substaVillageVideoForm")?.addEventListener("submit", saveSubstaVillageVideo);
  $("#substaVillagePdfForm")?.addEventListener("submit", saveSubstaVillagePdf);
  $("#substaVillageQuestionForm")?.addEventListener("submit", saveSubstaVillageQuestion);
  $("#saveSubstaVillageTheme")?.addEventListener("click", saveSubstaVillageTheme);
  $("#cancelSubstaVillageEdit")?.addEventListener("click", cancelSubstaVillageEdit);
  $("#clearSubstaVillageDaily")?.addEventListener("click", clearSubstaVillageDaily);
  $("#copySubstaVillageDailyStep")?.addEventListener("click", () => copySubstaVillageText(buildSubstaVillageDailyText(), "#substaVillageDailyStatus"));
  $("#copySubstaVillagePreview")?.addEventListener("click", () => copySubstaVillageText($("#substaVillageDiscordPreview")?.value || "", "#substaVillageDailyStatus"));
  $("#copySubstaVillageQuestion")?.addEventListener("click", () => copySubstaVillageText(buildSubstaVillageQuestionText(), "#substaVillageQuestionStatus"));
  ["#substaVillageGoal", "#substaVillageStep", "#substaVillageResult", "#substaVillageAction", "#substaVillageInsight", "#substaVillageNext"].forEach((selector) => {
    $(selector)?.addEventListener("input", renderSubstaVillagePreview);
  });
  $("#learningSearch")?.addEventListener("input", (event) => {
    learningSearchQuery = event.target.value;
    renderLearnings();
  });
  $("#learningGlobalSearch")?.addEventListener("input", (event) => {
    learningGlobalSearchQuery = event.target.value;
    renderLearningGlobalSearch();
  });
  $("#memoryLibrarySearch")?.addEventListener("input", (event) => {
    memoryLibrarySearchQuery = event.target.value;
    memoryLibraryVisibleLimit = MEMORY_LIBRARY_PAGE_SIZE;
    renderMemoryLibrary();
  });
  $("#memoryLibraryType")?.addEventListener("change", (event) => {
    memoryLibraryTypeFilter = event.target.value;
    memoryLibraryVisibleLimit = MEMORY_LIBRARY_PAGE_SIZE;
    renderMemoryLibrary();
  });
  $("#memoryLibraryMore")?.addEventListener("click", () => {
    memoryLibraryVisibleLimit += MEMORY_LIBRARY_PAGE_SIZE;
    renderMemoryLibrary();
  });
  $("#laterForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#laterTitle").value.trim();
    if (!title) return;
    laterVisibleLimit = LATER_INITIAL_DISPLAY_LIMIT;
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
    laterVisibleLimit = LATER_INITIAL_DISPLAY_LIMIT;
    saveLaterView();
    renderLaterItems();
  });
  $("#laterSearch")?.addEventListener("input", (event) => {
    laterSearchQuery = event.target.value;
    if (!laterSearchQuery.trim()) laterVisibleLimit = LATER_INITIAL_DISPLAY_LIMIT;
    renderLaterItems();
  });
  $("#laterSortToggle")?.addEventListener("click", () => {
    laterSortOrder = laterSortOrder === "oldest" ? "newest" : "oldest";
    laterVisibleLimit = LATER_INITIAL_DISPLAY_LIMIT;
    saveLaterView();
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
  Object.entries(activityLogFields).forEach(([key, selector]) => {
    const field = $(selector);
    if (!field) return;
    field.addEventListener("input", () => saveActivityLogFromField(key, field));
    field.addEventListener("change", () => saveActivityLogFromField(key, field));
  });
  Object.values(codexDailyLogFields).forEach((selector) => {
    const field = $(selector);
    if (!field || field.readOnly) return;
    field.addEventListener("input", () => saveCodexDailyLogFromForm());
  });
  $("#buildCodexDailyLog")?.addEventListener("click", () => saveCodexDailyLogFromForm({ buildPrompt: true }));
  $("#copyCodexDailyLog")?.addEventListener("click", copyCodexDailyLogPrompt);
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
  $("#saveSubstack")?.addEventListener("click", saveSubstackFromForm);
  Object.values(substackFields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    const markDirty = () => {
      const status = $("#substackStatus");
      if (status) status.textContent = "未保存の変更があります。";
    };
    field.addEventListener("input", markDirty);
    field.addEventListener("change", markDirty);
  });
  Object.values(notePageConfigs).forEach((config) => {
    $(config.saveButton)?.addEventListener("click", () => saveNotePageFromForm(config));
    Object.values(config.fields).forEach((selector) => {
      const field = $(selector);
      if (!field) return;
      const markDirty = () => {
        const status = $(config.status);
        if (status) status.textContent = "未保存の変更があります。";
      };
      field.addEventListener("input", markDirty);
      field.addEventListener("change", markDirty);
    });
  });
  $("#saveXPageV1")?.addEventListener("click", saveXPageV1FromForm);
  Object.values(xPageV1Fields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    const markDirty = () => {
      const status = $("#xPageV1Status");
      if (status) status.textContent = "未保存の変更があります。";
    };
    field.addEventListener("input", markDirty);
    field.addEventListener("change", markDirty);
  });
  $("#saveWordPressPageV1")?.addEventListener("click", saveWordPressPageV1FromForm);
  Object.values(wordpressPageV1Fields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    const markDirty = () => {
      const status = $("#wordpressPageV1Status");
      if (status) status.textContent = "未保存の変更があります。";
    };
    field.addEventListener("input", markDirty);
    field.addEventListener("change", markDirty);
  });
  $("#saveXAnalysis")?.addEventListener("click", saveXAnalysisFromForm);
  Object.values(xAnalysisFields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    const markDirty = () => {
      const status = $("#xAnalysisStatus");
      if (status) status.textContent = "未保存の変更があります。";
    };
    field.addEventListener("input", markDirty);
    field.addEventListener("change", markDirty);
  });
  $("#saveOperationExperiment")?.addEventListener("click", saveOperationExperimentFromForm);
  [...Object.values(operationExperimentDefinitionFields), ...Object.values(operationExperimentLogFields)].forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    const markDirty = () => {
      const status = $("#operationExperimentStatusMessage");
      if (status) status.textContent = "未保存の変更があります。";
    };
    field.addEventListener("input", markDirty);
    field.addEventListener("change", markDirty);
  });
  $("#publishingSeedForm")?.addEventListener("submit", savePublishingSeedFromForm);
  $("#clearPublishingSeedForm")?.addEventListener("click", () => {
    clearPublishingSeedForm();
    const status = $("#publishingSeedSaveStatus");
    if (status) status.textContent = "入力を空にしました。";
  });
  $("#publishingSeedFilterStatus")?.addEventListener("change", (event) => {
    publishingSeedStatusFilter = event.target.value;
    renderPublishingSeeds();
  });
  $("#publishingSeedNewsTab")?.addEventListener("click", () => setPublishingSeedActiveView("news"));
  $("#publishingSeedSeedsTab")?.addEventListener("click", () => {
    setPublishingSeedActiveView("seed");
    renderPublishingSeeds();
  });
  $("#publishingSeedCandidateForm")?.addEventListener("submit", savePublishingSeedCandidateFromForm);
  $("#clearPublishingSeedCandidateForm")?.addEventListener("click", () => {
    clearPublishingSeedCandidateForm();
    const status = $("#publishingSeedCandidateStatus");
    if (status) status.textContent = "入力を空にしました。";
  });
  $("#importPublishingSeedCandidates")?.addEventListener("click", importPublishingSeedCandidatesFromJson);
  $("#publishingSeedCandidateFilterStatus")?.addEventListener("change", (event) => {
    publishingSeedCandidateStatusFilter = event.target.value;
    renderPublishingSeedCandidates();
  });
  $("#xExperimentForm")?.addEventListener("submit", saveXExperimentFromForm);
  $("#newXExperiment")?.addEventListener("click", () => toggleXExperimentCreateForm());
  $("#xExperimentCreateForm")?.addEventListener("submit", createNewXExperiment);
  $("#cancelXExperimentCreate")?.addEventListener("click", () => {
    resetXExperimentCreateForm();
    toggleXExperimentCreateForm(false);
  });
  Object.values(xExperimentFormFields).forEach((selector) => {
    const field = $(selector);
    if (!field) return;
    field.addEventListener("input", markXExperimentDirty);
    field.addEventListener("change", markXExperimentDirty);
  });
  $("#xExperimentFilterBrand")?.addEventListener("change", (event) => {
    xExperimentFilters.brand = event.target.value;
    renderXExperimentList();
  });
  $("#xExperimentFilterStatus")?.addEventListener("change", (event) => {
    xExperimentFilters.status = event.target.value;
    renderXExperimentList();
  });
  $("#xExperimentFilterExperimentType")?.addEventListener("change", (event) => {
    xExperimentFilters.experimentType = event.target.value;
    renderXExperimentList();
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
      "activity_log_today_step",
      "activity_log_actions",
      "activity_log_reactions",
      "activity_log_insight",
      "activity_log_tomorrow_trial",
      "activity_log_life_log",
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
      ensureActivityLog(day);
      ensurePublishingOps(day);
      const { done, total } = todayCompletionStats(day);
      rows.push([
        date,
        done,
        total,
        day.dailyTasks.map((item) => `${isItemCompleted(item) ? "完了" : "未完了"}:${item.title}`).join(" / "),
        day.todayTasks.map((item) => `${isItemCompleted(item) ? "完了" : "未完了"}:${item.title}`).join(" / "),
        asArray(day.todayEvents).map(formatEventLabel).join(" / "),
        day.activityLog.todayStep,
        day.activityLog.actions,
        day.activityLog.reactions,
        day.activityLog.insight,
        day.activityLog.tomorrowTrial,
        day.activityLog.lifeLog,
        day.projects.map((item) => `${isItemCompleted(item) ? "完了" : "未完了"}:${item.title}`).join(" / "),
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
resetXExperimentForm();
renderAll();
handleKnowledgeLaboSeedFromUrl();
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
  OPERATION_EXPERIMENT_STORAGE_KEY,
  X_EXPERIMENT_LOG_STORAGE_KEY,
  PUBLISHING_SEEDS_STORAGE_KEY,
  PUBLISHING_SEED_CANDIDATES_STORAGE_KEY,
  CUSTOM_DAILY_TASKS_STORAGE_KEY,
  DAILY_TASK_ORDER_STORAGE_KEY,
  AFTER_TEN_MODE_OPTIONS_STORAGE_KEY,
  AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY,
  LATER_STORAGE_KEY,
  PERSISTENT_MEMO_STORAGE_KEY,
  READING_NOTES_STORAGE_KEY,
  LEARNING_ASSETS_STORAGE_KEY,
  LEARNING_LOG_STORAGE_KEY,
  MEMORY_STORE_STORAGE_KEY,
  LATER_VIEW_STORAGE_KEY,
  SNAPSHOT_SETTINGS_KEY,
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
  OPERATION_COCKPIT_STORAGE_KEY,
];

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function readOperationCockpitStore() {
  const value = readStoredJson(OPERATION_COCKPIT_STORAGE_KEY, {});
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function buildOperationCockpitRecentDays(source, fromKey, toKey) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return {};

  const recentDays = {};
  Object.entries(source)
    .filter(([dateKey]) => /^\d{4}-\d{2}-\d{2}$/.test(dateKey) && dateKey >= fromKey && dateKey <= toKey)
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([dateKey, value]) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return;

      const intentFields = ["topPriority", "articleNote", "todayFocus", "growthTarget", "noticed"];
      const hasIntentShape = intentFields.some((key) => typeof value[key] === "string");
      const hasCommunityShape = value.communityChecks &&
        typeof value.communityChecks === "object" &&
        !Array.isArray(value.communityChecks);
      if (!hasIntentShape && !hasCommunityShape) return;

      const day = Object.fromEntries(
        intentFields.map((key) => [key, typeof value[key] === "string" ? value[key] : ""]),
      );
      day.communityChecks = hasCommunityShape
        ? Object.fromEntries(
            Object.entries(value.communityChecks)
              .filter(([, checked]) => typeof checked === "boolean"),
          )
        : {};
      day.updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : "";
      recentDays[dateKey] = day;
    });

  return recentDays;
}

function buildOperationCockpitIntentContext(source, dateKey) {
  const day = buildOperationCockpitRecentDays(source, dateKey, dateKey)[dateKey];
  if (!day) return null;

  return {
    date: dateKey,
    topPriority: day.topPriority,
    articleNote: day.articleNote,
    todayFocus: day.todayFocus,
    growthTarget: day.growthTarget,
    noticed: day.noticed,
    updatedAt: day.updatedAt,
  };
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
  data[OPERATION_EXPERIMENT_STORAGE_KEY] = readStoredJson(OPERATION_EXPERIMENT_STORAGE_KEY, defaultOperationExperimentStore());
  data[X_EXPERIMENT_LOG_STORAGE_KEY] = readStoredJson(X_EXPERIMENT_LOG_STORAGE_KEY, []);
  data[PUBLISHING_SEEDS_STORAGE_KEY] = readStoredJson(PUBLISHING_SEEDS_STORAGE_KEY, []);
  data[PUBLISHING_SEED_CANDIDATES_STORAGE_KEY] = readStoredJson(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY, []);
  data[CUSTOM_DAILY_TASKS_STORAGE_KEY] = readStoredJson(CUSTOM_DAILY_TASKS_STORAGE_KEY, []);
  data[DAILY_TASK_ORDER_STORAGE_KEY] = readStoredJson(DAILY_TASK_ORDER_STORAGE_KEY, []);
  data[AFTER_TEN_MODE_OPTIONS_STORAGE_KEY] = readStoredJson(AFTER_TEN_MODE_OPTIONS_STORAGE_KEY, []);
  data[AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY] = readStoredJson(AFTER_TEN_MODE_DELETED_OPTIONS_STORAGE_KEY, []);
  data[LATER_STORAGE_KEY] = readStoredJson(LATER_STORAGE_KEY, []);
  data[PERSISTENT_MEMO_STORAGE_KEY] = readStoredJson(PERSISTENT_MEMO_STORAGE_KEY, []);
  data[READING_NOTES_STORAGE_KEY] = readStoredJson(READING_NOTES_STORAGE_KEY, []);
  data[LEARNING_ASSETS_STORAGE_KEY] = readStoredJson(LEARNING_ASSETS_STORAGE_KEY, []);
  data[LEARNING_LOG_STORAGE_KEY] = readStoredJson(LEARNING_LOG_STORAGE_KEY, []);
  data[MEMORY_STORE_STORAGE_KEY] = readStoredJson(MEMORY_STORE_STORAGE_KEY, loadMemoryStore());
  data[LATER_VIEW_STORAGE_KEY] = readStoredJson(LATER_VIEW_STORAGE_KEY, {});
  data[SNAPSHOT_SETTINGS_KEY] = readStoredJson(SNAPSHOT_SETTINGS_KEY, snapshotSettingDefaults);
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
  data[OPERATION_COCKPIT_STORAGE_KEY] = readStoredJson(OPERATION_COCKPIT_STORAGE_KEY, {});
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
  const operationCockpitRecentDays = buildOperationCockpitRecentDays(
    readOperationCockpitStore(),
    fromKey,
    toKey,
  );

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
      if ("todayWeather" in day) {
        day.todayWeather = normalizeTodayWeather(day.todayWeather);
      }
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
  const learningAssetItems = asArray(readStoredJson(LEARNING_ASSETS_STORAGE_KEY, [])).map(normalizeLearningAsset);
  const learningLogItems = asArray(readStoredJson(LEARNING_LOG_STORAGE_KEY, []));
  const xExperimentLogItems = asArray(readStoredJson(X_EXPERIMENT_LOG_STORAGE_KEY, []))
    .map(normalizeXExperimentLog)
    .filter((log) => log.postDate >= logFromKey || String(log.nextHypothesis || "").trim() !== "");
  const publishingSeedItems = asArray(readStoredJson(PUBLISHING_SEEDS_STORAGE_KEY, []))
    .map(normalizePublishingSeed)
    .filter((seed) => seed.savedDate >= logFromKey || seed.status === "種");
  const publishingSeedCandidateItems = asArray(readStoredJson(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY, []))
    .map(normalizePublishingSeedCandidate)
    .filter((candidate) => candidate.fetchedDate >= logFromKey || candidate.status === "未確認");
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
  const todayWeather = normalizeTodayWeather(todayRecord?.todayWeather);
  let todayProgress = "0/0";
  let todayEventCount = 0;
  if (todayRecord) {
    const { done, total } = todayCompletionStats(todayRecord);
    todayEventCount = asArray(todayRecord.todayEvents).length;
    todayProgress = `${done}/${total}`;
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
      todayWeather,
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
        data: { recentDays, olderDaysCount, laterItems, persistentMemos, learningAssets: learningAssetItems, learningLog: learningLogItems, publishingSeedCandidates: publishingSeedCandidateItems, publishingSeeds: publishingSeedItems, xExperimentLogs: xExperimentLogItems, learningSummary, learningHint, learningConfidence, memory },
      },
      "discovery-labo": {
        schemaVersion: 1,
        data: { discoveries, sources: discoverySources },
      },
      "koryu-log-labo": { schemaVersion: 1, data: { entries: koryuEntries } },
      "hasshin-kansatsu-labo": { schemaVersion: 1, data: { entries: hasshinEntries } },
      "substack-labo": substackData ? { schemaVersion: 1, data: substackData } : null,
      "stock-labo": stockItems ? { schemaVersion: 1, data: { items: stockItems } } : null,
      "operation-cockpit": {
        schemaVersion: 1,
        data: { recentDays: operationCockpitRecentDays },
      },
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
