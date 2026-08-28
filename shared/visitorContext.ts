export type VisitorContext = {
  rank: number;
  lens: "Heritage" | "Artistry" | "Lightscape" | "Community" | "Grand scale";
  headline: string;
  guideTip: string;
  historicAccess?: string;
  guideWindow?: string;
  sourceLabel: string;
  sourceUrl: string;
};

const CLUB_GUIDE = "https://www.clubmahindra.com/blog/places-to-visit/guide-to-kolkata-durga-pujo";
const OBEROI_GUIDE = "https://www.oberoihotels.com/travel/best-durga-puja-pandals-in-kolkata-near-chowringhee-lane/";
const TALA_PRATTOY_OFFICIAL = "https://www.talaprattoy.com/";

const byName = (entries: Array<[string, Omit<VisitorContext, "rank"> & { rank: number }]>) => Object.fromEntries(entries);

export const VISITOR_CONTEXT = byName([
  ["Bagbazar Sarbojanin", { rank: 1, lens: "Heritage", headline: "Riverside heritage and an older-style Puja atmosphere.", guideTip: "Build this into a North Kolkata heritage walk; guide advice favours morning or dusk.", historicAccess: "Guide access: Shyambazar Metro", guideWindow: "Guide suggestion: morning or evening", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Kumartuli Park Sarbojanin", { rank: 2, lens: "Artistry", headline: "A natural companion to Kumartuli’s idol-making neighbourhood.", guideTip: "Pair the pandal with time in the surrounding artisan quarter rather than treating it as a quick stop.", historicAccess: "Guide access: Girish Park Metro", guideWindow: "Guide suggestion: post-sunrise to noon", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Ahiritola Sarbojanin", { rank: 3, lens: "Heritage", headline: "Old Kolkata ritual atmosphere in a heritage circuit.", guideTip: "Best experienced slowly as part of a nearby North Kolkata cluster.", historicAccess: "Guide access: Sobhbazar–Sutanuti Metro", guideWindow: "Guide suggestion: late morning or evening", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Sovabazar Rajbari", { rank: 4, lens: "Heritage", headline: "A historic household Puja anchor for a North Kolkata circuit.", guideTip: "Use the supplied address and map preview to combine it with nearby heritage stops.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Tala Prattoy", { rank: 6, lens: "Artistry", headline: "The organizing society describes its Durga Puja as a public-art venue centred on installation art.", guideTip: "Its official 2026 page announces a ticketed, artist-led group walkthrough; check the organizer’s site for booking slots and current entry terms.", sourceLabel: "Tala Prattoy official website", sourceUrl: TALA_PRATTOY_OFFICIAL }],
  ["Santosh Mitra Square", { rank: 7, lens: "Grand scale", headline: "A Central Kolkata spectacle frequently included in city pandal circuits.", guideTip: "Treat it as a focused stop and use official traffic guidance during peak periods.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["College Square", { rank: 8, lens: "Lightscape", headline: "Lake-side reflections make the setting especially visual after dark.", guideTip: "Historic guides flag this as a busy attraction, so leave flexibility around the visit.", historicAccess: "Guide access: Central Metro", guideWindow: "Guide suggestion: twilight and night", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Sreebhumi Sporting Club", { rank: 9, lens: "Grand scale", headline: "A grand-scale, high-visual Lake Town stop.", guideTip: "Plan this as a dedicated leg rather than adding it to a tightly timed South Kolkata circuit.", historicAccess: "Guide access: Belgachia or Ultadanga", guideWindow: "Guide suggestion: late evening", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Dum Dum Park Tarun Sangha", { rank: 10, lens: "Artistry", headline: "Part of the multi-pandal Dum Dum Park discovery cluster.", guideTip: "Use a cluster mindset—nearby clubs are the reason this area works as one outing.", historicAccess: "Guide access: Dum Dum Metro", guideWindow: "Guide suggestion: night hours", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Ekdalia Evergreen Club", { rank: 12, lens: "Heritage", headline: "Temple-inspired grandeur and a ritual-forward setting.", guideTip: "Add this to a Ballygunge cluster; guide context favours an evening ritual visit.", historicAccess: "Guide access: Kalighat Metro", guideWindow: "Guide suggestion: evening rituals", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Ballygunge Cultural Association", { rank: 13, lens: "Artistry", headline: "A long-running blend of traditional and contemporary exhibit language.", guideTip: "Works well alongside nearby Ballygunge stops; check live conditions on the day.", historicAccess: "Guide access: Ballygunge rail or Kalighat Metro", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Singhi Park Sarbojanin", { rank: 14, lens: "Lightscape", headline: "Known in travel guidance for an artisan lineage and music-led atmosphere.", guideTip: "Use it as a South Kolkata evening stop, with live programming to be verified locally.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Tridhara Sammilani", { rank: 15, lens: "Artistry", headline: "An established South Kolkata circuit stop.", guideTip: "Pair with nearby South Kolkata addresses from the ranked list rather than crossing the city mid-route.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Deshapriya Park", { rank: 16, lens: "Grand scale", headline: "Documented for past large-scale installations and dramatic public interest.", guideTip: "Past spectacle is context, not a 2026 promise—confirm current arrangements before travelling.", historicAccess: "Guide access: Kalighat or Rabindra Sarobar", guideWindow: "Guide suggestion: evening or night", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Chetla Agrani Club", { rank: 18, lens: "Heritage", headline: "A club with a documented historical identity and traditional celebration context.", guideTip: "Pair it with the Chetla–Kalighat side of South Kolkata rather than a North Kolkata day.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
  ["Naktala Udayan Sangha", { rank: 31, lens: "Artistry", headline: "Public guidance highlights material-conscious themed presentation.", guideTip: "Daylight is useful for details in historic guide context; verify live timing independently.", historicAccess: "Guide access: Gitanjali Metro", guideWindow: "Guide suggestion: daytime for details", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Mudiali Club", { rank: 27, lens: "Lightscape", headline: "A public guide frames its historic presentation around water and light motifs.", guideTip: "Build this into a Kalighat-area visit and avoid treating guide language as this year’s theme.", historicAccess: "Guide access: Kalighat Metro", guideWindow: "Guide suggestion: evening aarti", sourceLabel: "Club Mahindra guide", sourceUrl: CLUB_GUIDE }],
  ["Suruchi Sangha", { rank: 29, lens: "Community", headline: "Historically recognised in travel coverage for social-service activity alongside spectacle.", guideTip: "Use it for a New Alipore visit; current programme and access still need on-day confirmation.", sourceLabel: "Oberoi travel guide", sourceUrl: OBEROI_GUIDE }],
]);

const normalizeContextName = (name: string) => name
  .toLowerCase()
  .replace(/\b(durga\s*puja|durgotsab|durgotsav|durgotsob|sarbojanin|sarbojonin|sarbajanik|shree\s*shree|club|association)\b/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const CONTEXT_BY_NORMALIZED_NAME = Object.fromEntries(Object.entries(VISITOR_CONTEXT).map(([name, context]) => [normalizeContextName(name), context]));

export const getVisitorContext = (name: string) => VISITOR_CONTEXT[name] ?? CONTEXT_BY_NORMALIZED_NAME[normalizeContextName(name)];
