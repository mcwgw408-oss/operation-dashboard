import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const APP_JS_PATH = resolve(ROOT_DIR, "app.js");
const FIXED_NOW = "2026-07-04T09:00:00.000Z";

function createFakeLocalStorage(initialValues = {}) {
  const data = new Map();
  for (const [key, value] of Object.entries(initialValues)) {
    data.set(key, typeof value === "string" ? value : JSON.stringify(value));
  }
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
    clear() {
      data.clear();
    },
    seed(values = {}) {
      data.clear();
      for (const [key, value] of Object.entries(values)) {
        data.set(key, typeof value === "string" ? value : JSON.stringify(value));
      }
    },
    dump() {
      return Object.fromEntries(data.entries());
    },
  };
}

function createFixedDate(fixedIso) {
  const RealDate = Date;
  const fixedTime = new RealDate(fixedIso).getTime();

  function FixedDate(...args) {
    if (this instanceof FixedDate) {
      return args.length ? new RealDate(...args) : new RealDate(fixedTime);
    }
    return new RealDate(fixedTime).toString();
  }

  Object.setPrototypeOf(FixedDate, RealDate);
  FixedDate.prototype = RealDate.prototype;
  FixedDate.now = () => fixedTime;
  FixedDate.parse = RealDate.parse;
  FixedDate.UTC = RealDate.UTC;
  return FixedDate;
}

function createDocumentStub() {
  const emptyNode = {
    addEventListener() {},
    append() {},
    appendChild() {},
    classList: { add() {}, remove() {}, toggle() {} },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    replaceChildren() {},
    setAttribute() {},
    style: {},
  };
  return {
    body: emptyNode,
    createElement() {
      return { ...emptyNode, dataset: {}, remove() {}, select() {} };
    },
    execCommand() {
      return false;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };
}

function stripBrowserStartup(source) {
  return source
    .replace(/\r?\narrangeDashboardUxSections\(\);\r?\n/, "\n")
    .replace(/\r?\nbindEvents\(\);\r?\n/, "\n")
    .replace(/\r?\nrenderAll\(\);\r?\n/, "\n")
    .replace(/\r?\nrenderClock\(\);\r?\n/, "\n")
    .replace(/\r?\nsetInterval\(renderClock, 1000\);\r?\n/, "\n");
}

const exposedApi = `
globalThis.__brainGolden = {
  runFixture(fixture) {
    activeDate = fixture.activeDate;
    store = fixture.store || {};
    laterItems = fixture.laterItems || [];
    persistentMemos = fixture.persistentMemos || [];
    learningLog = fixture.learningLog || [];
    memoryStore = fixture.memoryStore || { projectMemory: [], shortMemory: [] };
    healthState = fixture.healthState || [];
    localStorage.seed(fixture.localStorage || {});

    const day = store[activeDate] || {};
    const dailyTasks = asArray(day.dailyTasks);
    const todayTasks = asArray(day.todayTasks);
    const todayEvents = asArray(day.todayEvents);
    const projects = asArray(day.projects);
    const completedToday = [...todayTasks, ...dailyTasks].filter((item) => item.done).length;
    const openToday = todayTasks.filter(brainIsOpen);
    const laterOpen = laterItems.filter((item) => !item.done);
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
    const recentMemos = persistentMemos.filter((memo) =>
      brainDaysSince(memo.updatedAt || memo.createdAt) !== null &&
      brainDaysSince(memo.updatedAt || memo.createdAt) <= 7
    );
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
    const baseRecommendation = buildRecommendation(recommendationInput);
    const learningSummary = buildLearningSummary();
    const learningHint = buildLearningHint(learningSummary);
    const memoryRetrievalContext = buildMemoryRetrievalContext({
      priorityCandidate,
      recommendationType: baseRecommendation.type,
      eventContext,
    });
    const brainMemoryContext = buildBrainMemoryContext(memoryRetrievalContext);
    const recommendation = applyBrainMemoryContext(
      adaptRecommendationWithLearning(baseRecommendation, learningHint, learningSummary),
      brainMemoryContext,
    );
    const healthAwareRecommendation = buildHealthAwareRecommendation(recommendation, getLatestHealthContext());

    return {
      energyContext,
      momentumContext,
      eventContext,
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
    };
  },
};
`;

export function createBrainGoldenHarness({ now = FIXED_NOW } = {}) {
  let uuidCounter = 0;
  const context = {
    Blob: class Blob {},
    URL: { createObjectURL: () => "blob:brain-golden", revokeObjectURL() {} },
    alert() {},
    console,
    crypto: {
      randomUUID() {
        uuidCounter += 1;
        return `brain-golden-uuid-${String(uuidCounter).padStart(3, "0")}`;
      },
    },
    document: createDocumentStub(),
    Intl,
    localStorage: createFakeLocalStorage(),
    navigator: {},
    setInterval() {
      return 0;
    },
    window: {},
  };
  context.Date = createFixedDate(now);
  context.globalThis = context;
  context.window = context;

  const source = `${stripBrowserStartup(readFileSync(APP_JS_PATH, "utf8"))}\n${exposedApi}`;
  vm.runInNewContext(source, context, { filename: APP_JS_PATH });

  return {
    runFixture(fixture) {
      uuidCounter = 0;
      return context.__brainGolden.runFixture(fixture);
    },
  };
}
