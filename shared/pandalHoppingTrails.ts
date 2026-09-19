/**
 * Auto-generates pandal-hopping route URLs for each section of Kolkata.
 *
 * Takes the top N pandals by priority per section, builds a Google Maps
 * multi-stop directions URL, and returns a typed array of section trails.
 *
 * These are NOT GPS-verified routes — they're convenience links that
 * open Google Maps with waypoints pre-filled. Actual routing, traffic,
 * and reachability are handled by Google Maps on the user's device.
 */

import type { PandalRecord } from "./pujaData";

export type SectionTrail = {
  section: string;
  sectionBn: string;
  url: string;
  pandalCount: number;
  pandalNames: string[];
};

const SECTION_BN: Record<string, string> = {
  "North Kolkata": "উত্তর কলকাতা",
  "South Kolkata": "দক্ষিণ কলকাতা",
  "Central Kolkata": "মধ্য কলকাতা",
  "East Kolkata": "পূর্ব কলকাতা",
  "West Kolkata": "পশ্চিম কলকাতা",
  "Salt Lake": "সল্ট লেক",
  "New Town": "নিউ টাউন",
};

const PRIORITY_RANK: Record<string, number> = { S: 1, A: 2, B: 3, C: 4 };

/**
 * Builds a Google Maps multi-stop URL from a list of pandals.
 * Format: https://www.google.com/maps/dir/?api=1&origin=A&destination=Z&waypoints=B|C|D
 *
 * The first pandal becomes the origin, the last the destination,
 * and everything in between is a waypoint.
 */
function buildGoogleMapsUrl(pandals: PandalRecord[]): string {
  if (pandals.length === 0) return "";
  if (pandals.length === 1) {
    const p = pandals[0];
    return `https://www.google.com/maps/dir/?api=1&destination=${p.latitude},${p.longitude}`;
  }

  const origin = pandals[0];
  const destination = pandals[pandals.length - 1];
  const waypoints = pandals.slice(1, -1);

  let url = `https://www.google.com/maps/dir/?api=1`;
  url += `&origin=${origin.latitude},${origin.longitude}`;
  url += `&destination=${destination.latitude},${destination.longitude}`;
  if (waypoints.length > 0) {
    url += `&waypoints=${waypoints.map((p) => `${p.latitude},${p.longitude}`).join("|")}`;
  }
  url += `&travelmode=driving`;
  return url;
}

/**
 * Generates one pandal-hopping trail per section.
 * Top N pandals (default 5) by priority, with valid coordinates.
 * Sections with fewer than 2 qualifying pandals are skipped.
 */
export function generateSectionTrails(
  pandals: PandalRecord[],
  options: { maxPerSection?: number } = {},
): SectionTrail[] {
  const maxPerSection = options.maxPerSection ?? 5;

  // Group by section
  const bySection = new Map<string, PandalRecord[]>();
  for (const p of pandals) {
    if (!p.section || p.latitude === 0 || p.longitude === 0) continue;
    if (!Number.isFinite(p.latitude) || !Number.isFinite(p.longitude)) continue;
    const group = bySection.get(p.section) ?? [];
    group.push(p);
    bySection.set(p.section, group);
  }

  const trails: SectionTrail[] = [];

  for (const [section, group] of Array.from(bySection.entries())) {
    // Sort by priority (S first), then by userRank
    const sorted = group.sort((a: PandalRecord, b: PandalRecord) => {
      const pa = PRIORITY_RANK[a.priority ?? "C"] ?? 4;
      const pb = PRIORITY_RANK[b.priority ?? "C"] ?? 4;
      if (pa !== pb) return pa - pb;
      return (a.userRank ?? 999) - (b.userRank ?? 999);
    });

    const selected = sorted.slice(0, maxPerSection);
    if (selected.length < 2) continue;

    trails.push({
      section,
      sectionBn: SECTION_BN[section] ?? section,
      url: buildGoogleMapsUrl(selected),
      pandalCount: selected.length,
      pandalNames: selected.map((p: PandalRecord) => p.name),
    });
  }

  // Sort sections in a logical geographic order
  const sectionOrder = ["North Kolkata", "Central Kolkata", "South Kolkata", "East Kolkata", "West Kolkata", "Salt Lake", "New Town"];
  trails.sort((a, b) => {
    const ia = sectionOrder.indexOf(a.section);
    const ib = sectionOrder.indexOf(b.section);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return trails;
}
