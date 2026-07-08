# Sakura Snapshot Validator Design

Status: Draft for Phase1 Task4

This document describes the planned Sakura Snapshot Validator. It is a design document only. It does not change the current snapshot format or implementation.

## Purpose

The Sakura Snapshot Validator checks whether a generated snapshot JSON follows the current Sakura Snapshot JSON Specification.

The validator is intended to protect future AI agent development by making the snapshot contract explicit and testable. It should catch structural mistakes before a snapshot is copied, downloaded, handed to an AI project, or used by future automation.

The validator is not an import tool, migration tool, data repair tool, or backup checker.

## Validation Scope

The first implementation should validate the snapshot envelope and the Phase1 app payload boundaries.

It should answer:

- Is this a Sakura Snapshot?
- Is the snapshot version supported?
- Are all required top-level keys present?
- Are required nested objects present?
- Are core values the expected types?
- Are nullable sections null only when allowed?
- Is `emailList` absent from the entire snapshot?
- Are known privacy switches reflected in the places they control?

It should not deeply validate every source-record field inside each Labo. Source records can come from older localStorage shapes and should remain flexible.

## Required Fields

### Top-Level Required Fields

The following top-level fields are required:

- `format`
- `snapshotVersion`
- `dictionaryVersion`
- `createdAt`
- `mode`
- `period`
- `privacy`
- `summary`
- `apps`

### `period` Required Fields

- `period.detailDays`
- `period.from`
- `period.to`

### `privacy` Required Fields

- `privacy.reflection`
- `privacy.feelings`
- `privacy.mailDmCounts`
- `privacy.stock`

### `summary` Required Fields

- `summary.todayProgress`
- `summary.seedsFermenting`
- `summary.longestFermentingDays`
- `summary.revisitPeople`
- `summary.writingInProgress`
- `summary.openNextActions`

### `apps` Required Fields

The following app keys are required under `apps`:

- `apps["operation-dashboard"]`
- `apps["discovery-labo"]`
- `apps["koryu-log-labo"]`
- `apps["hasshin-kansatsu-labo"]`
- `apps["substack-labo"]`
- `apps["stock-labo"]`

For dictionaryVersion `v1.3` and later, `apps["operation-cockpit"]` is also required. Its absence must remain valid for older snapshotVersion 1 dictionary versions.

### Required Data Fields Per App

When the app section is non-null, it must contain:

- `schemaVersion`
- `data`

Additional required `data` fields:

| App | Required `data` fields |
|---|---|
| `operation-dashboard` | `recentDays`, `olderDaysCount`, `laterItems`, `persistentMemos` |
| `discovery-labo` | `discoveries`, `sources` |
| `koryu-log-labo` | `entries` |
| `hasshin-kansatsu-labo` | `entries` |
| `substack-labo` | Either current workspace shape or legacy fallback shape |
| `stock-labo` | `items` |
| `operation-cockpit` | `recentDays` |

## Error Conditions

Errors mean the snapshot should not be treated as valid.

| Code | Condition | Message |
|---|---|---|
| `invalid_json` | Input cannot be parsed as JSON. | Input is not valid JSON. |
| `root_not_object` | Parsed value is not a non-array object. | Snapshot root must be an object. |
| `missing_required_key` | A required key is absent. | Required key is missing. |
| `invalid_format` | `format` is not `sakura-snapshot`. | Snapshot format must be `sakura-snapshot`. |
| `unsupported_snapshot_version` | `snapshotVersion` is not supported. | Unsupported snapshotVersion. |
| `invalid_dictionary_version` | `dictionaryVersion` is missing or not a string. | dictionaryVersion must be a string. |
| `invalid_created_at` | `createdAt` is missing, not a string, or not parseable as a date. | createdAt must be an ISO timestamp string. |
| `invalid_mode` | `mode` is not `morning` or `night`. | mode must be `morning` or `night`. |
| `invalid_period` | `period` is missing or malformed. | period must contain detailDays, from, and to. |
| `invalid_privacy` | `privacy` is missing or contains non-boolean required switches. | privacy switches must be boolean. |
| `invalid_summary` | `summary` is missing or has invalid required field types. | summary fields are malformed. |
| `missing_apps` | `apps` is missing or not an object. | apps must be an object. |
| `missing_app_key` | A required app key is absent. | Required app section is missing. |
| `invalid_app_envelope` | A non-null app section does not contain `schemaVersion` and `data`. | App section must contain schemaVersion and data. |
| `invalid_app_schema_version` | A non-null app section has an unsupported or non-number `schemaVersion`. | App schemaVersion is invalid. |
| `invalid_app_data` | A non-null app section has missing or malformed required `data` fields. | App data is malformed. |
| `invalid_null_app` | An app section is `null` where null is not allowed. | This app section cannot be null. |
| `stock_privacy_mismatch` | `privacy.stock` is `false` but `apps["stock-labo"]` is not `null`. | stock-labo must be null when stock privacy is off. |
| `email_list_present` | The key string `emailList` appears anywhere in the snapshot. | emailList must not be included in a Sakura Snapshot. |

## Warning Conditions

Warnings mean the snapshot can still be used, but the user or future agent should be careful.

| Code | Condition | Message |
|---|---|---|
| `unknown_top_level_key` | A top-level key is not documented for snapshotVersion 1. | Unknown top-level key will be ignored. |
| `unknown_privacy_key` | `privacy` contains additional switches. | Unknown privacy switch will be ignored by older readers. |
| `unknown_app_key` | `apps` contains an undocumented app key. | Unknown app section will be ignored by older readers. |
| `future_dictionary_version` | `dictionaryVersion` differs from the current documented value. | Dictionary version differs from the validator baseline. |
| `future_app_schema_version` | An app `schemaVersion` is greater than the supported version. | App schemaVersion is newer than the validator baseline. |
| `summary_longest_null` | `summary.longestFermentingDays` is `null`. | No computable fermenting age is available. |
| `substack_null` | `apps["substack-labo"]` is `null`. | Substack data was not available in this snapshot. |
| `stock_null` | `apps["stock-labo"]` is `null`. | Stock data was intentionally not included or unavailable. |
| `empty_recent_days` | `operation-dashboard.data.recentDays` is empty. | No recent dashboard day records are included. |
| `period_date_order` | `period.from` is after `period.to`. | Period date order looks unusual. |
| `created_at_future` | `createdAt` is in the future relative to validation time. | createdAt is later than the validator clock. |

## Validation Details

### Type Checks

The first implementation should check only stable structural types:

- `format`: string
- `snapshotVersion`: number
- `dictionaryVersion`: string
- `createdAt`: string
- `mode`: string
- `period`: object
- `privacy`: object
- `summary`: object
- `apps`: object
- app `schemaVersion`: number
- app `data`: object

Arrays should be checked for app payload lists:

- `operation-dashboard.data.laterItems`
- `operation-dashboard.data.persistentMemos`
- `discovery-labo.data.discoveries`
- `discovery-labo.data.sources`
- `koryu-log-labo.data.entries`
- `hasshin-kansatsu-labo.data.entries`
- `stock-labo.data.items`
- `operation-cockpit.data.recentDays` must be an object keyed by `YYYY-MM-DD`

### Null Rules

The validator should allow `null` only for documented nullable fields or sections.

Allowed app-level nulls:

- `apps["substack-labo"]`
- `apps["stock-labo"]`

Required non-null app sections:

- `apps["operation-dashboard"]`
- `apps["discovery-labo"]`
- `apps["koryu-log-labo"]`
- `apps["hasshin-kansatsu-labo"]`

`apps["operation-cockpit"]` is required and non-null only when dictionaryVersion is `v1.3` or later. Older snapshotVersion 1 documents may omit it.

Allowed summary nulls:

- `summary.longestFermentingDays`

### Privacy Consistency Checks

The first implementation should include these privacy checks:

- If `privacy.stock` is `false`, then `apps["stock-labo"]` must be `null`.
- If `privacy.reflection` is `false`, every `recentDays[date].reflection` value should be `null` when the field exists.
- If `privacy.feelings` is `false`, every koryu entry field `tension`, `impression`, and `happyMoment` should be `null` when the field exists.
- If `privacy.mailDmCounts` is `false`, dashboard metric fields `dmPending`, `dmHandled`, `mailUnread`, and `mailProcessed` should be `null` when the fields exist.

Privacy consistency mismatches should start as errors when they expose omitted data that should have been nulled.

### `emailList` Check

The validator must scan the entire parsed object recursively for a key named exactly `emailList`.

If found, validation must return an `email_list_present` error.

The check should inspect object keys, not just stringified JSON text, to avoid false positives from ordinary text values.

## Result Shape Proposal

The validator should return a structured result:

```json
{
  "ok": true,
  "errors": [],
  "warnings": [],
  "meta": {
    "format": "sakura-snapshot",
    "snapshotVersion": 1,
    "mode": "morning",
    "createdAt": "2026-07-03T07:30:00.000Z"
  }
}
```

Error and warning entries should include:

```json
{
  "code": "missing_required_key",
  "path": "$.summary.todayProgress",
  "message": "Required key is missing."
}
```

The `path` should use a simple JSONPath-like format beginning with `$`.

## Implementation Proposal

### Phase A: Pure Validation Function

Add a pure JavaScript function:

```js
function validateSakuraSnapshot(value) {
  return { ok, errors, warnings, meta };
}
```

This function should:

- Accept a parsed JSON value.
- Perform no DOM access.
- Perform no localStorage access.
- Perform no file downloads.
- Avoid mutating the input object.

This keeps validation safe to call from UI, tests, future CLI checks, or future agents.

### Phase B: Validate Generated Snapshot Before Download or Copy

After Phase A is stable, the Sakura AI panel can validate the generated snapshot before copy or download.

Proposed behavior:

- If errors exist, show a clear alert and do not copy/download.
- If warnings exist, allow copy/download but optionally mention warning count.
- If valid, proceed exactly as today.

This should be a small wrapper around the existing snapshot generation path and should not change the snapshot shape.

### Phase C: Optional Developer Test Fixture

Later, add a small local validation fixture or test script for known-good and known-bad snapshots.

This should remain separate from production UI and must not affect GitHub Pages deployment.

## Future Validation Items

Possible future checks:

- Validate `period.detailDays === 7` for snapshotVersion 1.
- Validate `period.from` and `period.to` are valid `YYYY-MM-DD` strings.
- Validate `period.from` and `period.to` match `detailDays`.
- Validate `summary.todayProgress` format with `^\d+\/\d+$`.
- Validate summary counts are non-negative integers.
- Cross-check `summary.seedsFermenting` against discovery records.
- Cross-check `summary.openNextActions` against hasshin records.
- Cross-check `summary.writingInProgress` against Substack writing records.
- Warn when generated JSON exceeds a configured size threshold.
- Warn when source app sections are empty unexpectedly.
- Validate `createdAt` is close to the current time.
- Validate app payloads against separate per-Labo schema versions.
- Validate that no deprecated localStorage-only settings such as display preferences appear in the snapshot.

## Non-Goals

The validator should not:

- Repair malformed snapshots.
- Modify localStorage.
- Import snapshots.
- Send snapshots to an AI service.
- Validate full source app schemas deeply.
- Reject unknown additive fields that preserve backward compatibility.
- Replace the Sakura Snapshot JSON Specification.

## Compatibility Notes

The validator must follow the same backward compatibility rules as the JSON specification:

- Unknown future keys should usually produce warnings, not errors.
- Missing required snapshotVersion 1 keys should produce errors.
- Known nullable fields must keep their documented null semantics.
- `emailList` must remain a hard error.
- Future non-additive changes should use a new `snapshotVersion` or app `schemaVersion`.
