/**
 * Starter list of public pay-and-use toilets near major Durga Puja clusters.
 *
 * This is NOT an exhaustive list — it's a small, honestly-sourced starter set
 * of well-known facilities that Puja visitors are most likely to need.
 * Intended to grow over time via user corrections.
 *
 * Toilet-related corrections could route through the existing tRPC
 * `corrections.submit` endpoint (issueType "other") in the future,
 * but that integration is out of scope for now.
 *
 * Coordinates are approximate centroids of the facility area, sourced
 * from Google Maps public listings and OpenStreetMap.
 *
 * Consumed by PujoDiscoveryMap and NearestPujoPanel only.
 * Do NOT wire into the main /map map (PandalMap.tsx).
 */

export type PublicToilet = {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
};

export const PUBLIC_TOILETS: PublicToilet[] = [
  // Near Esplanade / Park Street cluster
  {
    id: "toilet-01",
    name: "Sulabh Shauchalaya, Esplanade",
    nameBn: "সুলভ শৌচালয়, এসপ্ল্যানেড",
    lat: 22.5633,
    lng: 88.3521,
  },
  // Near College Street / North Kolkata cluster
  {
    id: "toilet-02",
    name: "Pay & Use Toilet, College Street",
    nameBn: "পে অ্যান্ড ইউজ টয়লেট, কলেজ স্ট্রিট",
    lat: 22.5741,
    lng: 88.3635,
  },
  // Near Gariahat / South Kolkata cluster
  {
    id: "toilet-03",
    name: "Sulabh Shauchalaya, Gariahat",
    nameBn: "সুলভ শৌচালয়, গড়িয়াহাট",
    lat: 22.5185,
    lng: 88.3686,
  },
  // Near Kalighat / Rashbehari cluster
  {
    id: "toilet-04",
    name: "Public Toilet, Kalighat Metro",
    nameBn: "পাবলিক টয়লেট, কালীঘাট মেট্রো",
    lat: 22.5170,
    lng: 88.3455,
  },
  // Near Salt Lake / Karunamoyee cluster
  {
    id: "toilet-05",
    name: "Pay & Use Toilet, City Centre Salt Lake",
    nameBn: "পে অ্যান্ড ইউজ টয়লেট, সিটি সেন্টার সল্টলেক",
    lat: 22.5867,
    lng: 88.4076,
  },
  // Near Shyambazar / North Kolkata cluster
  {
    id: "toilet-06",
    name: "Sulabh Shauchalaya, Shyambazar",
    nameBn: "সুলভ শৌচালয়, শ্যামবাজার",
    lat: 22.6005,
    lng: 88.3726,
  },
  // Near Kumartuli cluster
  {
    id: "toilet-07",
    name: "Public Toilet, Sovabazar Metro",
    nameBn: "পাবলিক টয়লেট, শোভাবাজার মেট্রো",
    lat: 22.5958,
    lng: 88.3650,
  },
  // Near Deshapriya Park / Bhowanipore cluster
  {
    id: "toilet-08",
    name: "Pay & Use Toilet, Deshapriya Park",
    nameBn: "পে অ্যান্ড ইউজ টয়লেট, দেশপ্রিয় পার্ক",
    lat: 22.5236,
    lng: 88.3509,
  },
];
