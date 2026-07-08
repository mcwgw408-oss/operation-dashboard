export function normalizeSnapshotGoldenResult(snapshot) {
  return {
    format: snapshot.format,
    snapshotVersion: snapshot.snapshotVersion,
    dictionaryVersion: snapshot.dictionaryVersion,
    mode: snapshot.mode,
    period: snapshot.period,
    appKeys: Object.keys(snapshot.apps).sort(),
    operationCockpit: snapshot.apps["operation-cockpit"],
  };
}
