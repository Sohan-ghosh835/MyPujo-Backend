const ORS_DIRECTIONS_URL = "https://api.openrouteservice.org/v2/directions/foot-walking";
export const DEFAULT_ORS_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImYyMmY3N2ZjZWNiNjQyYjdiZDEzN2U0OGI2OTZlOGEyIiwiaCI6Im11cm11cjY0In0=";

export function hasOpenRouteServiceKey() {
  return Boolean(process.env.OPENROUTESERVICE_API_KEY || DEFAULT_ORS_KEY);
}

/** Lightweight server-only probe used to validate a configured free ORS key. No visitor location is involved. */
export async function validateOpenRouteServiceKey() {
  const key = process.env.OPENROUTESERVICE_API_KEY || DEFAULT_ORS_KEY;
  if (!key) return { valid: false, status: "missing" as const };
  const response = await fetch(`${ORS_DIRECTIONS_URL}?start=88.3639,22.5726&end=88.3645,22.5730`, {
    headers: { Authorization: key },
    signal: AbortSignal.timeout(12_000),
  });
  return { valid: response.ok, status: response.status };
}
