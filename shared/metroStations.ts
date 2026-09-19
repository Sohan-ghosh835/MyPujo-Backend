/**
 * Kolkata Metro station coordinates for all currently operational lines.
 * Sourced from OpenStreetMap/Wikidata public data, cross-verified against
 * official KMRC route maps and Wikipedia (List of Kolkata Metro stations).
 *
 * Last verified: September 2026
 *
 * This dataset is consumed by PujoDiscoveryMap and NearestPujoPanel only.
 * Do NOT wire it into the main /map map (PandalMap.tsx).
 */

export type MetroStation = {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
  line: "Blue" | "Green" | "Purple" | "Orange" | "Yellow";
};

export const METRO_STATIONS: MetroStation[] = [
  // ── Blue Line (Line 1): Dakshineswar ↔ Kavi Subhash ──
  { id: "blue-01", name: "Dakshineswar", nameBn: "দক্ষিণেশ্বর", lat: 22.6538, lng: 88.3637, line: "Blue" },
  { id: "blue-02", name: "Baranagar", nameBn: "বরানগর", lat: 22.6532, lng: 88.3805, line: "Blue" },
  { id: "blue-03", name: "Noapara", nameBn: "নোয়াপাড়া", lat: 22.6399, lng: 88.3941, line: "Blue" },
  { id: "blue-04", name: "Dum Dum", nameBn: "দমদম", lat: 22.6215, lng: 88.3928, line: "Blue" },
  { id: "blue-05", name: "Belgachia", nameBn: "বেলগাছিয়া", lat: 22.6060, lng: 88.3864, line: "Blue" },
  { id: "blue-06", name: "Shyambazar", nameBn: "শ্যামবাজার", lat: 22.6006, lng: 88.3703, line: "Blue" },
  { id: "blue-07", name: "Sovabazar Sutanuti", nameBn: "শোভাবাজার সুতানুটি", lat: 22.5960, lng: 88.3653, line: "Blue" },
  { id: "blue-08", name: "Girish Park", nameBn: "গিরিশ পার্ক", lat: 22.5871, lng: 88.3631, line: "Blue" },
  { id: "blue-09", name: "Mahatma Gandhi Road", nameBn: "মহাত্মা গান্ধী রোড", lat: 22.5807, lng: 88.3614, line: "Blue" },
  { id: "blue-10", name: "Central", nameBn: "সেন্ট্রাল", lat: 22.5725, lng: 88.3582, line: "Blue" },
  { id: "blue-11", name: "Chandni Chowk", nameBn: "চাঁদনি চক", lat: 22.5668, lng: 88.3538, line: "Blue" },
  { id: "blue-12", name: "Esplanade", nameBn: "এসপ্ল্যানেড", lat: 22.5649, lng: 88.3517, line: "Blue" },
  { id: "blue-13", name: "Park Street", nameBn: "পার্ক স্ট্রিট", lat: 22.5545, lng: 88.3499, line: "Blue" },
  { id: "blue-14", name: "Maidan", nameBn: "ময়দান", lat: 22.5493, lng: 88.3485, line: "Blue" },
  { id: "blue-15", name: "Rabindra Sadan", nameBn: "রবীন্দ্র সদন", lat: 22.5412, lng: 88.3473, line: "Blue" },
  { id: "blue-16", name: "Netaji Bhavan", nameBn: "নেতাজি ভবন", lat: 22.5330, lng: 88.3457, line: "Blue" },
  { id: "blue-17", name: "Jatin Das Park", nameBn: "যতীন দাস পার্ক", lat: 22.5243, lng: 88.3465, line: "Blue" },
  { id: "blue-18", name: "Kalighat", nameBn: "কালীঘাট", lat: 22.5167, lng: 88.3460, line: "Blue" },
  { id: "blue-19", name: "Rabindra Sarobar", nameBn: "রবীন্দ্র সরোবর", lat: 22.5079, lng: 88.3456, line: "Blue" },
  { id: "blue-20", name: "Mahanayak Uttam Kumar", nameBn: "মহানায়ক উত্তম কুমার", lat: 22.4945, lng: 88.3452, line: "Blue" },
  { id: "blue-21", name: "Netaji", nameBn: "নেতাজি", lat: 22.4809, lng: 88.3460, line: "Blue" },
  { id: "blue-22", name: "Masterda Surya Sen", nameBn: "মাস্টারদা সূর্য সেন", lat: 22.4735, lng: 88.3608, line: "Blue" },
  { id: "blue-23", name: "Gitanjali", nameBn: "গীতাঞ্জলি", lat: 22.4694, lng: 88.3699, line: "Blue" },
  { id: "blue-24", name: "Kavi Nazrul", nameBn: "কবি নজরুল", lat: 22.4642, lng: 88.3807, line: "Blue" },
  { id: "blue-25", name: "Shahid Khudiram", nameBn: "শহীদ ক্ষুদিরাম", lat: 22.4660, lng: 88.3917, line: "Blue" },
  { id: "blue-26", name: "Kavi Subhash", nameBn: "কবি সুভাষ", lat: 22.4722, lng: 88.3979, line: "Blue" },

  // ── Green Line (Line 2): Howrah Maidan ↔ Salt Lake Sector V ──
  { id: "green-01", name: "Howrah Maidan", nameBn: "হাওড়া ময়দান", lat: 22.5822, lng: 88.3332, line: "Green" },
  { id: "green-02", name: "Howrah", nameBn: "হাওড়া", lat: 22.5830, lng: 88.3410, line: "Green" },
  { id: "green-03", name: "Mahakaran", nameBn: "মহাকরণ", lat: 22.5724, lng: 88.3507, line: "Green" },
  { id: "green-04", name: "Esplanade (Green)", nameBn: "এসপ্ল্যানেড (গ্রিন)", lat: 22.5647, lng: 88.3496, line: "Green" },
  { id: "green-05", name: "Sealdah", nameBn: "শিয়ালদহ", lat: 22.5666, lng: 88.3707, line: "Green" },
  { id: "green-06", name: "Phoolbagan", nameBn: "ফুলবাগান", lat: 22.5721, lng: 88.3894, line: "Green" },
  { id: "green-07", name: "Salt Lake Stadium", nameBn: "সল্টলেক স্টেডিয়াম", lat: 22.5730, lng: 88.4030, line: "Green" },
  { id: "green-08", name: "Bengal Chemical", nameBn: "বেঙ্গল কেমিক্যাল", lat: 22.5800, lng: 88.4013, line: "Green" },
  { id: "green-09", name: "City Centre", nameBn: "সিটি সেন্টার", lat: 22.5870, lng: 88.4079, line: "Green" },
  { id: "green-10", name: "Central Park", nameBn: "সেন্ট্রাল পার্ক", lat: 22.5904, lng: 88.4155, line: "Green" },
  { id: "green-11", name: "Karunamoyee", nameBn: "করুণাময়ী", lat: 22.5863, lng: 88.4214, line: "Green" },
  { id: "green-12", name: "Salt Lake Sector V", nameBn: "সল্টলেক সেক্টর ভি", lat: 22.5809, lng: 88.4291, line: "Green" },

  // ── Purple Line (Line 3): Joka ↔ Majerhat ──
  { id: "purple-01", name: "Joka", nameBn: "জোকা", lat: 22.4519, lng: 88.3016, line: "Purple" },
  { id: "purple-02", name: "Thakurpukur", nameBn: "ঠাকুরপুকুর", lat: 22.4643, lng: 88.3075, line: "Purple" },
  { id: "purple-03", name: "Sakher Bazar", nameBn: "সাখের বাজার", lat: 22.4748, lng: 88.3099, line: "Purple" },
  { id: "purple-04", name: "Behala Chowrasta", nameBn: "বেহালা চৌরাস্তা", lat: 22.4871, lng: 88.3132, line: "Purple" },
  { id: "purple-05", name: "Behala Bazar", nameBn: "বেহালা বাজার", lat: 22.5004, lng: 88.3173, line: "Purple" },
  { id: "purple-06", name: "Taratala", nameBn: "তারাতলা", lat: 22.5077, lng: 88.3203, line: "Purple" },
  { id: "purple-07", name: "Majerhat", nameBn: "মাজেরহাট", lat: 22.5192, lng: 88.3237, line: "Purple" },

  // ── Orange Line (Line 4): Kavi Subhash ↔ Beleghata ──
  // Note: Further extension toward Airport is under construction
  { id: "orange-01", name: "Kavi Subhash (Orange)", nameBn: "কবি সুভাষ (অরেঞ্জ)", lat: 22.4722, lng: 88.3979, line: "Orange" },
  { id: "orange-02", name: "Satyajit Ray", nameBn: "সত্যজিৎ রায়", lat: 22.4846, lng: 88.3926, line: "Orange" },
  { id: "orange-03", name: "Jyotirindra Nandi", nameBn: "জ্যোতিরিন্দ্র নন্দী", lat: 22.4960, lng: 88.3986, line: "Orange" },
  { id: "orange-04", name: "Kavi Sukanta", nameBn: "কবি সুকান্ত", lat: 22.5056, lng: 88.4011, line: "Orange" },
  { id: "orange-05", name: "Hemanta Mukhopadhyay", nameBn: "হেমন্ত মুখোপাধ্যায়", lat: 22.5147, lng: 88.4016, line: "Orange" },
  { id: "orange-06", name: "VIP Bazar", nameBn: "ভিআইপি বাজার", lat: 22.5249, lng: 88.3962, line: "Orange" },
  { id: "orange-07", name: "Ritwik Ghatak", nameBn: "ঋত্বিক ঘটক", lat: 22.5329, lng: 88.3964, line: "Orange" },
  { id: "orange-08", name: "Barun Sengupta", nameBn: "বরুণ সেনগুপ্ত", lat: 22.5439, lng: 88.3993, line: "Orange" },
  { id: "orange-09", name: "Beleghata", nameBn: "বেলেঘাটা", lat: 22.5507, lng: 88.4040, line: "Orange" },

  // ── Yellow Line (Line 5): Noapara ↔ Jai Hind (Airport) ──
  // Note: Partial operation; further extensions under construction
  { id: "yellow-01", name: "Noapara (Yellow)", nameBn: "নোয়াপাড়া (ইয়েলো)", lat: 22.6399, lng: 88.3941, line: "Yellow" },
  { id: "yellow-02", name: "Dum Dum Cantonment", nameBn: "দমদম ক্যান্টনমেন্ট", lat: 22.6371, lng: 88.4121, line: "Yellow" },
  { id: "yellow-03", name: "Jessore Road", nameBn: "যশোর রোড", lat: 22.6392, lng: 88.4298, line: "Yellow" },
  { id: "yellow-04", name: "Jai Hind", nameBn: "জয় হিন্দ", lat: 22.6473, lng: 88.4374, line: "Yellow" },
];

/** Line color for map markers. */
export function getMetroLineColor(line: MetroStation["line"]): string {
  switch (line) {
    case "Blue": return "#2563eb";
    case "Green": return "#16a34a";
    case "Purple": return "#7c3aed";
    case "Orange": return "#ea580c";
    case "Yellow": return "#ca8a04";
  }
}
