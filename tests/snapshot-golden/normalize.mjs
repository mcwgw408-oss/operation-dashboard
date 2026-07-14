export function normalizeSnapshotGoldenResult(snapshot) {
  return {
    format: snapshot.format,
    snapshotVersion: snapshot.snapshotVersion,
    dictionaryVersion: snapshot.dictionaryVersion,
    mode: snapshot.mode,
    period: snapshot.period,
    todayWeather: snapshot.summary?.todayWeather,
    appKeys: Object.keys(snapshot.apps).sort(),
    operationDashboardTodayWeather: snapshot.apps["operation-dashboard"]?.data?.recentDays?.[snapshot.period.to]?.todayWeather,
    operationCockpit: snapshot.apps["operation-cockpit"],
  };
}
