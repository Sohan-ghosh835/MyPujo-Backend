export const KOLKATAKHOJ_2026_SOURCE = {
  name: "KolkataKhoj",
  url: "https://kolkatakhoj.com/durga-puja-2026/",
  year: 2026,
  type: "public_web_reference",
} as const;

export const KOLKATAKHOJ_2026_DAY_FACTS = [
  { key: "shashthi", date: "2026-10-17", day: "Saturday", bengaliDay: "শনিবার", name: "Shashthi", bengaliName: "ষষ্ঠী", rituals: ["Bodhon"] },
  { key: "saptami", date: "2026-10-18", day: "Sunday", bengaliDay: "রবিবার", name: "Saptami", bengaliName: "সপ্তমী", rituals: ["Nabapatrika Snan"] },
  { key: "ashtami", date: "2026-10-19", day: "Monday", bengaliDay: "সোমবার", name: "Ashtami", bengaliName: "অষ্টমী", rituals: ["Pushpanjali", "Sandhi Puja"] },
  { key: "navami", date: "2026-10-20", day: "Tuesday", bengaliDay: "মঙ্গলবার", name: "Navami", bengaliName: "নবমী", rituals: ["Dhunuchi Naach"] },
  { key: "dashami", date: "2026-10-21", day: "Wednesday", bengaliDay: "বুধবার", name: "Dashami", bengaliName: "দশমী", rituals: ["Sindoor Khela", "Visarjan"] },
] as const;

/** The discovery page reports 9 October; retained for provenance only because independent calendar evidence supports 10 October. */
export const KOLKATAKHOJ_MAHALAYA_SOURCE_CONFLICT = {
  sourceReportedDate: "2026-10-09",
  independentlySupportedDate: "2026-10-10",
  status: "source_conflict",
  source: KOLKATAKHOJ_2026_SOURCE,
} as const;

export const KOLKATAKHOJ_2026_EXACT_PASSPORT_MATCHES = {
  "address-arjunpur-amra-sabai-club-700059": { sourceId: "n-bel-4", zone: "North", featured: false },
  "address-golaghata-sammilani-700048": { sourceId: "n-bel-9", zone: "North", featured: false },
  "address-telengabagan-sarbojanin-700054": { sourceId: "n-bel-11", zone: "North", featured: true },
  "sharodiya-sikdar-bagan-durga-puja": { sourceId: "n-shyam-2", zone: "North", featured: false },
  "address-hatibagan-nabinpally-700004": { sourceId: "n-shyam-3", zone: "North", featured: false },
  "address-nalin-sarkar-street-sarbojanin-700004": { sourceId: "n-shyam-4", zone: "North", featured: true },
  "address-kashi-bose-lane-700006": { sourceId: "n-shyam-6", zone: "North", featured: true },
  "address-lalabagan-nabankur-700006": { sourceId: "n-shyam-7", zone: "North", featured: false },
  "address-sovabazar-rajbari-700005": { sourceId: "n-shob-1", zone: "North", featured: true },
  "address-jagat-mukherjee-park-700005": { sourceId: "n-shob-2", zone: "North", featured: false },
  "kumartuli-park": { sourceId: "n-shob-4", zone: "North", featured: true },
  "address-simla-byayam-samity-700006": { sourceId: "n-girish-3", zone: "North", featured: false },
  "pack-college-square-durga-puja": { sourceId: "n-mg-2", zone: "North", featured: true },
  "address-santosh-mitra-square-700014": { sourceId: "n-mg-3", zone: "North", featured: true },
  "address-68-pally-durga-puja-700025": { sourceId: "c-net-1", zone: "Central", featured: false },
  "address-agradut-udaya-sangha-south-kolkata": { sourceId: "c-net-7", zone: "Central", featured: false },
  "suruchi-sangha": { sourceId: "s-kal-1", zone: "South", featured: true },
  "address-66-pally-sarbojanin-700026": { sourceId: "s-kal-3", zone: "South", featured: true },
  "address-badamtala-ashar-sangha-700026": { sourceId: "s-kal-4", zone: "South", featured: true },
  "address-deshapriya-park-700029": { sourceId: "s-kal-5", zone: "South", featured: true },
  "tridhara-sammilani": { sourceId: "s-kal-6", zone: "South", featured: true },
  "address-singhi-park-sarbojanin-700029": { sourceId: "s-kal-10", zone: "South", featured: true },
  "address-bosepukur-sitala-mandir-700042": { sourceId: "s-kal-12", zone: "South", featured: true },
  "address-rajdanga-naba-uday-sangha-700107": { sourceId: "s-kal-13", zone: "South", featured: false },
  "address-behala-friends-south-west-kolkata": { sourceId: "s-beh-1", zone: "South", featured: false },
  "pack-naktala-udayan-sangha-durgotsav": { sourceId: "s-git-1", zone: "South", featured: true },
  "address-santoshpur-lake-pally-700075": { sourceId: "s-sub-1", zone: "South", featured: true },
  "address-santoshpur-trikon-park-700075": { sourceId: "s-sub-2", zone: "South", featured: false },
} as const;
