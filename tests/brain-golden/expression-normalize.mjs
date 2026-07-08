function normalizeReasons(reasons = []) {
  return reasons.map((reason) => {
    if (typeof reason === "string") return reason;
    return {
      points: reason.points,
      text: reason.text,
    };
  });
}

function normalizeFocusTask(task) {
  if (!task) return null;
  return {
    id: task.id,
    title: task.title,
    done: Boolean(task.done),
    priority: Boolean(task.priority),
  };
}

export function normalizeBrainExpressionGoldenResult(result) {
  return {
    recommendation: {
      title: result.recommendation.title,
      message: result.recommendation.message,
      actionText: result.recommendation.actionText,
      reasons: normalizeReasons(result.recommendation.reasons),
    },
    explainLayerDetails: {
      seenInfo: result.explainLayerDetails.seenInfo,
      mainReasons: result.explainLayerDetails.mainReasons,
      energyImpact: result.explainLayerDetails.energyImpact,
      momentumImpact: result.explainLayerDetails.momentumImpact,
      uncertainty: result.explainLayerDetails.uncertainty,
    },
    morningGuidanceText: result.morningGuidanceText,
    dailyFocus: result.dailyFocus,
    contextSummary: {
      theme: result.contextSummary.theme,
      focusTask: normalizeFocusTask(result.contextSummary.focusTask),
      memoryTitle: result.contextSummary.memoryTitle,
      support: result.contextSummary.support,
      caution: result.contextSummary.caution,
      dailyInputNote: result.contextSummary.dailyInputNote,
      taskCount: result.contextSummary.taskCount,
      adaptiveTopCategory: result.contextSummary.adaptiveTopCategory,
      text: result.contextSummary.text,
      signals: result.contextSummary.signals,
    },
    focusTask: normalizeFocusTask(result.focusTask),
  };
}
