export const MAHALAYA_2026 = new Date("2026-10-10T00:00:00+05:30").getTime();

export function getMahalayaCountdown(now = Date.now()) {
  const delta = Math.max(0, MAHALAYA_2026 - now);
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta % 86_400_000) / 3_600_000),
    minutes: Math.floor((delta % 3_600_000) / 60_000),
  };
}
