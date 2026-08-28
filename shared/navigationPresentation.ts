export type RouteInstruction = {
  text: string;
  distanceMeters: number | null;
  fromIndex: number | null;
  toIndex: number | null;
};

export function formatNavigationDistance(meters: number | null | undefined) {
  if (meters === null || meters === undefined || !Number.isFinite(meters)) return "—";
  return meters >= 1_000 ? `${(meters / 1_000).toFixed(1)} km` : `${Math.max(0, Math.round(meters))} m`;
}

export function formatEstimatedMinutes(minutes: number | null | undefined) {
  if (minutes === null || minutes === undefined || !Number.isFinite(minutes)) return "—";
  return `~${Math.max(1, Math.round(minutes))} min`;
}

/** Uses ORS geometry indexes when the provider supplied them; never synthesizes a turn. */
export function nextProviderInstruction(instructions: RouteInstruction[], routeIndex: number | null | undefined) {
  if (routeIndex === null || routeIndex === undefined) return null;
  return instructions.find(instruction => instruction.toIndex === null || instruction.toIndex >= routeIndex) ?? null;
}
