function pickContext(context = {}) {
  return {
    state: context.state,
    level: context.level,
    modifier: context.modifier,
    count: context.count,
    labels: context.labels,
  };
}

function normalizeReasons(reasons = []) {
  return reasons.map((reason) => {
    if (typeof reason === "string") return reason;
    return {
      points: reason.points,
      text: reason.text,
    };
  });
}

function normalizeCandidate(candidate) {
  if (!candidate) return null;
  return {
    id: candidate.id,
    source: candidate.source,
    sourceLabel: candidate.sourceLabel,
    title: candidate.title,
    priorityFlag: candidate.priorityFlag,
    score: candidate.score,
    adjustedScore: candidate.adjustedScore,
    status: candidate.status,
    reasons: normalizeReasons(candidate.reasons),
    modifiers: (candidate.modifiers || []).map((modifier) => ({
      state: modifier.state,
      modifier: modifier.modifier,
    })),
  };
}

function normalizeRecommendationInput(input = {}) {
  return {
    topCandidate: normalizeCandidate(input.topCandidate),
    priorityReasons: normalizeReasons(input.priorityReasons),
    energy: pickContext(input.energy),
    momentum: pickContext(input.momentum),
    eventContext: pickContext(input.eventContext),
    hasTodayEvents: input.hasTodayEvents,
    hasFermentingIdeas: input.hasFermentingIdeas,
    hasWritingInProgress: input.hasWritingInProgress,
    hasNextActions: input.hasNextActions,
    openTodayCount: input.openTodayCount,
    completedToday: input.completedToday,
  };
}

function normalizeMemory(memory) {
  return {
    project: memory.project || "",
    title: memory.title || "",
    summary: memory.summary || "",
    source: memory.source || "",
    importance: memory.importance,
    tags: memory.tags || [],
  };
}

function normalizeMemoryContext(context = {}) {
  return {
    project: context.project || "",
    tags: context.tags || [],
    recommendationType: context.recommendationType || "",
    eventType: context.eventType || "",
    used: Boolean(context.used),
    retrieved: (context.retrieved || []).map(normalizeMemory),
    recent: (context.recent || []).map(normalizeMemory),
  };
}

function normalizeRecommendation(recommendation = {}) {
  return {
    type: recommendation.type,
    title: recommendation.title,
    message: recommendation.message,
    actionText: recommendation.actionText,
    adaptiveNote: recommendation.adaptiveNote || "",
    memoryNote: recommendation.memoryNote || "",
    reasons: normalizeReasons(recommendation.reasons),
  };
}

function normalizeHealthAwareRecommendation(recommendation = {}) {
  return {
    actionSizeHint: recommendation.actionSizeHint,
    recommendationSupport: recommendation.recommendationSupport,
    priorityReason: recommendation.priorityReason,
    cautionNote: recommendation.cautionNote,
    explanationHint: recommendation.explanationHint,
    sourceSummary: recommendation.sourceSummary,
  };
}

export function normalizeBrainGoldenResult(result) {
  return {
    energyContext: pickContext(result.energyContext),
    momentumContext: pickContext(result.momentumContext),
    eventContext: pickContext(result.eventContext),
    rankedCandidates: result.rankedCandidates.slice(0, 3).map(normalizeCandidate),
    priorityCandidate: normalizeCandidate(result.priorityCandidate),
    explanation: {
      summary: result.explanation.summary,
      reasons: normalizeReasons(result.explanation.reasons),
    },
    recommendationInput: normalizeRecommendationInput(result.recommendationInput),
    baseRecommendation: normalizeRecommendation(result.baseRecommendation),
    learningSummary: result.learningSummary,
    learningHint: result.learningHint,
    brainMemoryContext: normalizeMemoryContext(result.brainMemoryContext),
    recommendation: normalizeRecommendation(result.recommendation),
    healthAwareRecommendation: normalizeHealthAwareRecommendation(result.healthAwareRecommendation),
  };
}
