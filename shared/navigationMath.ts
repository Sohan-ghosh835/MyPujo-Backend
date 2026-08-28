export type GeoPoint = { lat: number; lng: number };

const EARTH_RADIUS_M = 6_371_000;
const toRadians = (value: number) => value * Math.PI / 180;

export function haversineMeters(a: GeoPoint, b: GeoPoint) {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export function routeLengthMeters(route: GeoPoint[]) {
  return route.slice(1).reduce((total, point, index) => total + haversineMeters(route[index], point), 0);
}

/** Equirectangular segment projection is accurate enough for short, city-scale navigation legs. */
function nearestOnSegment(point: GeoPoint, start: GeoPoint, end: GeoPoint) {
  const scaleX = 111_320 * Math.cos(toRadians((start.lat + end.lat + point.lat) / 3));
  const scaleY = 110_540;
  const ax = start.lng * scaleX; const ay = start.lat * scaleY;
  const bx = end.lng * scaleX; const by = end.lat * scaleY;
  const px = point.lng * scaleX; const py = point.lat * scaleY;
  const dx = bx - ax; const dy = by - ay;
  const ratio = dx === 0 && dy === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  const nearest = { lat: (ay + dy * ratio) / scaleY, lng: (ax + dx * ratio) / scaleX };
  return { ratio, distanceMeters: haversineMeters(point, nearest) };
}

export function getRouteProgress(route: GeoPoint[], position: GeoPoint) {
  if (route.length < 2) return { totalMeters: 0, completedMeters: 0, remainingMeters: 0, progressPercent: 0, distanceFromRouteMeters: Infinity, nearestRouteIndex: 0 };
  const totalMeters = routeLengthMeters(route);
  let beforeMeters = 0; let bestDistance = Infinity; let bestCompleted = 0; let nearestRouteIndex = 0;
  for (let index = 1; index < route.length; index += 1) {
    const segment = haversineMeters(route[index - 1], route[index]);
    const nearest = nearestOnSegment(position, route[index - 1], route[index]);
    if (nearest.distanceMeters < bestDistance) { bestDistance = nearest.distanceMeters; bestCompleted = beforeMeters + segment * nearest.ratio; nearestRouteIndex = index - 1 + (nearest.ratio >= 0.5 ? 1 : 0); }
    beforeMeters += segment;
  }
  return { totalMeters, completedMeters: bestCompleted, remainingMeters: Math.max(0, totalMeters - bestCompleted), progressPercent: totalMeters ? Math.round((bestCompleted / totalMeters) * 100) : 0, distanceFromRouteMeters: bestDistance, nearestRouteIndex };
}

export function hasArrived(position: GeoPoint, destination: GeoPoint, accuracyMeters: number | null | undefined) {
  const threshold = Math.max(35, Math.min(100, accuracyMeters ?? 35));
  return haversineMeters(position, destination) <= threshold;
}

export function offRouteThresholdMeters(accuracyMeters: number | null | undefined) {
  return Math.max(55, Math.min(150, (accuracyMeters ?? 25) * 2));
}

export function deriveCoordinatesFromAddress(address = "", subArea = "", section = "") {
  const text = `${address} ${subArea} ${section}`.toLowerCase();
  if (text.includes("salt lake") || text.includes("bidhannagar")) return { lat: 22.5867, lng: 88.4171 };
  if (text.includes("new town")) return { lat: 22.5726, lng: 88.4639 };
  if (text.includes("bagbazar") || text.includes("baghbazar")) return { lat: 22.6022, lng: 88.3662 };
  if (text.includes("kumartuli") || text.includes("kumartuly")) return { lat: 22.5996, lng: 88.3693 };
  if (text.includes("ahiritola") || text.includes("beniatola")) return { lat: 22.5938, lng: 88.3582 };
  if (text.includes("sovabazar") || text.includes("shobhabazar")) return { lat: 22.5961, lng: 88.3644 };
  if (text.includes("college square") || text.includes("baithakkhana") || text.includes("college street")) return { lat: 22.5731, lng: 88.3639 };
  if (text.includes("tala park") || text.includes("belgachia") || text.includes("shyambazar")) return { lat: 22.6068, lng: 88.3762 };
  if (text.includes("ballygunge") || text.includes("maddox")) return { lat: 22.5280, lng: 88.3659 };
  if (text.includes("chetla") || text.includes("kalighat")) return { lat: 22.5186, lng: 88.3417 };
  if (text.includes("bhowanipore") || text.includes("bakul bagan") || text.includes("lanserdown")) return { lat: 22.5312, lng: 88.3478 };
  if (text.includes("ekdalia") || text.includes("gariahat")) return { lat: 22.5192, lng: 88.3678 };
  if (text.includes("suruchi") || text.includes("alipore") || text.includes("new alipore")) return { lat: 22.5332, lng: 88.3333 };
  if (text.includes("naktala") || text.includes("garia") || text.includes("patuli")) return { lat: 22.4743, lng: 88.3665 };
  if (text.includes("behala") || text.includes("barisha") || text.includes("parnasree")) return { lat: 22.4962, lng: 88.3187 };
  if (text.includes("dum dum") || text.includes("lake town") || text.includes("bangur")) return { lat: 22.6108, lng: 88.4145 };
  if (text.includes("beleghata") || text.includes("phoolbagan")) return { lat: 22.5694, lng: 88.3848 };
  if (text.includes("tangra") || text.includes("topsia") || text.includes("park circus")) return { lat: 22.5519, lng: 88.3891 };
  if (text.includes("howrah")) return { lat: 22.5958, lng: 88.2636 };
  if (text.includes("hooghly")) return { lat: 22.9038, lng: 88.3976 };
  if (section.toLowerCase().includes("north")) return { lat: 22.5996, lng: 88.3693 };
  if (section.toLowerCase().includes("south")) return { lat: 22.5280, lng: 88.3659 };
  if (section.toLowerCase().includes("central")) return { lat: 22.5731, lng: 88.3639 };
  if (section.toLowerCase().includes("east")) return { lat: 22.5694, lng: 88.3848 };
  if (section.toLowerCase().includes("west")) return { lat: 22.5500, lng: 88.3200 };
  return { lat: 22.5726, lng: 88.3639 };
}
