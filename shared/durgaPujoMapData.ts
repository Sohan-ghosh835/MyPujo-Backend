import { ALL_PANDALS, type PandalRecord } from "./pujaData";

export type MapPandalCategory = "north" | "south" | "salt_lake" | "aristocratic" | "iconic";

export interface MapPandalItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cat: MapPandalCategory;
  section: string;
  subArea: string;
  address: string;
  websitePandalId?: string | null;
}

export const DURGA_PUJO_MAP_PANDALS: MapPandalItem[] = [
  {
    "id": "map-1",
    "name": "Ahiritola",
    "lat": 22.595062,
    "lng": 88.357521,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ahiritola",
    "address": "100, Ahiritola Street, Kolkata",
    "websitePandalId": "pack-ahiritola-sarbojanin-durgotsav"
  },
  {
    "id": "map-2",
    "name": "College Square",
    "lat": 22.574865,
    "lng": 88.364578,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "College Square",
    "address": "College Street, College Square, Kolkata",
    "websitePandalId": "pack-college-square-durga-puja"
  },
  {
    "id": "map-3",
    "name": "Anupama Housing Complex",
    "lat": 22.629421,
    "lng": 88.431786,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "VIP Road",
    "address": "VIP Road, Haldiram, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-4",
    "name": "Dum Dum Park Tarun Sangha",
    "lat": 22.610723,
    "lng": 88.413628,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum Park",
    "address": "Dum Dum Park, Kolkata",
    "websitePandalId": "address-dum-dum-park-tarun-sangha-700055"
  },
  {
    "id": "map-5",
    "name": "Dum Dum Park Bharat Chakra",
    "lat": 22.610662,
    "lng": 88.41433,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum Park",
    "address": "Dum Dum Park, Kolkata",
    "websitePandalId": "pack-dum-dum-park-bharat-chakra-durga-puja"
  },
  {
    "id": "map-6",
    "name": "Dum Dum Tarun Dal",
    "lat": 22.611732,
    "lng": 88.418739,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum Park",
    "address": "Dum Dum Park, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-7",
    "name": "Dum Dum Park Yubak Brinda",
    "lat": 22.605478,
    "lng": 88.417732,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum Park",
    "address": "Dum Dum Park, Kolkata",
    "websitePandalId": "address-dum-dum-park-sarbojanin-700055"
  },
  {
    "id": "map-8",
    "name": "Baghbazar Sarbojonin Durgotsab & Exhibition",
    "lat": 22.604582,
    "lng": 88.366234,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Baghbazar",
    "address": "7, Bagbazar Street, Baghbazar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-9",
    "name": "Joramandir",
    "lat": 22.613289,
    "lng": 88.429512,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "VIP Road",
    "address": "Joramandir, VIP Road, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-10",
    "name": "Telengabagan",
    "lat": 22.594915,
    "lng": 88.385399,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Ultadanga Main Road, Kolkata",
    "websitePandalId": "address-telengabagan-sarbojanin-700054"
  },
  {
    "id": "map-11",
    "name": "Karbagan Sarbojanin",
    "lat": 22.595152,
    "lng": 88.383873,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Karbagan, Ultadanga, Kolkata",
    "websitePandalId": "address-ultadanga-karbagan-sarbojanin-700067"
  },
  {
    "id": "map-12",
    "name": "Gouriberia",
    "lat": 22.594547,
    "lng": 88.379227,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Gouriberia",
    "address": "Gouriberia, Maniktala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-13",
    "name": "Kumartuli Park",
    "lat": 22.598995,
    "lng": 88.361366,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Kumartuli",
    "address": "8B, Abhay Mitra Street, Kumartuli, Kolkata",
    "websitePandalId": "kumartuli-park"
  },
  {
    "id": "map-14",
    "name": "Laketown Adhibasi Brinda",
    "lat": 22.605404,
    "lng": 88.403793,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Lake Town",
    "address": "Block B, Lake Town, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-15",
    "name": "Laketown Netaji Sporting Club",
    "lat": 22.608088,
    "lng": 88.39962,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Lake Town",
    "address": "Lake Town, Kolkata",
    "websitePandalId": "sharodiya-netaji-sporting-club-durga-puja"
  },
  {
    "id": "map-16",
    "name": "Md. Ali Park",
    "lat": 22.577229,
    "lng": 88.360878,
    "cat": "north",
    "section": "Central Kolkata",
    "subArea": "Central Kolkata",
    "address": "41A, Tara Chand Dutta Street, Kolkata",
    "websitePandalId": "address-md-ali-park-700073"
  },
  {
    "id": "map-17",
    "name": "Mitali - Kankurgachi",
    "lat": 22.580042,
    "lng": 88.393974,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Kankurgachi",
    "address": "Kankurgachi, Kolkata",
    "websitePandalId": "address-mitali-kankurgachi-durga-puja-700054"
  },
  {
    "id": "map-18",
    "name": "Salt Lake CJ Block",
    "lat": 22.58927,
    "lng": 88.423599,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "CJ Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-cj-block-700064"
  },
  {
    "id": "map-19",
    "name": "Salt Lake BJ Block",
    "lat": 22.590794,
    "lng": 88.42672,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BJ Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bj-block-700064"
  },
  {
    "id": "map-20",
    "name": "Salt Lake FD Block",
    "lat": 22.583464,
    "lng": 88.412216,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector III",
    "address": "FD Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-fd-block-700064"
  },
  {
    "id": "map-21",
    "name": "Salt Lake GD Block",
    "lat": 22.576777,
    "lng": 88.414162,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector III",
    "address": "GD Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-gd-block-700064"
  },
  {
    "id": "map-22",
    "name": "Salt Lake HA Block",
    "lat": 22.57641,
    "lng": 88.412971,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector III",
    "address": "HA Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ha-block-700064"
  },
  {
    "id": "map-23",
    "name": "Salt Lake IA Block",
    "lat": 22.574305,
    "lng": 88.409523,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector III",
    "address": "IA Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ia-block-700064"
  },
  {
    "id": "map-24",
    "name": "Salt Lake Laboni Estate",
    "lat": 22.582869,
    "lng": 88.406723,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "Laboni Estate, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-laboni-700064"
  },
  {
    "id": "map-25",
    "name": "Santosh Mitra Square",
    "lat": 22.566067,
    "lng": 88.365593,
    "cat": "north",
    "section": "Central Kolkata",
    "subArea": "Bowbazar",
    "address": "Natabar Dutta Row Road, Lebutala, Bowbazar, Kolkata",
    "websitePandalId": "address-santosh-mitra-square-700014"
  },
  {
    "id": "map-26",
    "name": "Sovabazar Beniatola",
    "lat": 22.595915,
    "lng": 88.360909,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Sovabazar",
    "address": "Beniatola Street, Sovabazar, Kolkata",
    "websitePandalId": "address-sovabazar-beniatola-sarbojanin-700005"
  },
  {
    "id": "map-27",
    "name": "Sreebhumi Sporting Club",
    "lat": 22.598993,
    "lng": 88.402931,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "VIP Road / Lake Town",
    "address": "VIP Road, Lake Town, Kolkata",
    "websitePandalId": "address-sreebhumi-sporting-club-700048"
  },
  {
    "id": "map-28",
    "name": "Tala Barowari",
    "lat": 22.607212,
    "lng": 88.376022,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Tala Park",
    "address": "Tala Park, Shyambazar, Kolkata",
    "websitePandalId": "pack-tala-barowari-durgotsav"
  },
  {
    "id": "map-29",
    "name": "Pathuriaghata Pancher Pally",
    "lat": 22.588566,
    "lng": 88.358368,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Pathuriaghata",
    "address": "Pathuriaghata Street, Kolkata",
    "websitePandalId": "sharodiya-pathuriaghata-pancher-pally-sarbojonin-durgotsab-committee"
  },
  {
    "id": "map-30",
    "name": "Tala Palli",
    "lat": 22.608385,
    "lng": 88.374886,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Tala",
    "address": "Tala Park Area, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-31",
    "name": "Ghas Bagan",
    "lat": 22.591923,
    "lng": 88.343468,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Shyambazar",
    "address": "Shyambazar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-32",
    "name": "Hatibagan Nabin Pally",
    "lat": 22.595707,
    "lng": 88.373421,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Hatibagan",
    "address": "Hatibagan, Kolkata",
    "websitePandalId": "address-hatibagan-sarbojanin-700006"
  },
  {
    "id": "map-33",
    "name": "Nalin Sarkar Street Sarbojanin Durgotsab",
    "lat": 22.594627,
    "lng": 88.374634,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Hatibagan",
    "address": "48B, Nalin Sarkar Street, Hatibagan, Kolkata",
    "websitePandalId": "address-nalin-sarkar-street-sarbojanin-700004"
  },
  {
    "id": "map-34",
    "name": "Hatibagan Sarbojonin",
    "lat": 22.594128,
    "lng": 88.371872,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Hatibagan",
    "address": "134, Aurobindo Sarani, Hatibagan, Kolkata",
    "websitePandalId": "address-hatibagan-sarbojanin-700006"
  },
  {
    "id": "map-35",
    "name": "Olabibitala Sarbojanin",
    "lat": 22.575529,
    "lng": 88.315788,
    "cat": "north",
    "section": "West Kolkata",
    "subArea": "Howrah",
    "address": "Olabibitala, Howrah",
    "websitePandalId": null
  },
  {
    "id": "map-36",
    "name": "Yuva Brinda",
    "lat": 22.595825,
    "lng": 88.381683,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "Maniktala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-37",
    "name": "Kashi Bose Lane",
    "lat": 22.59222,
    "lng": 88.369476,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Manicktala",
    "address": "5/1, Kashi Bose Lane, Manicktala, Kolkata",
    "websitePandalId": "address-kashi-bose-lane-700006"
  },
  {
    "id": "map-38",
    "name": "Purbachal Sarbojanin",
    "lat": 22.573011,
    "lng": 88.407463,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Salt Lake",
    "address": "Purbachal, Salt Lake, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-39",
    "name": "37 Pally",
    "lat": 22.574528,
    "lng": 88.368446,
    "cat": "north",
    "section": "Central Kolkata",
    "subArea": "College Street",
    "address": "College Street Area, Kolkata",
    "websitePandalId": "address-37-pally-sarbojanin-durgotsab-central-kolkata"
  },
  {
    "id": "map-40",
    "name": "Salt Lake AJ Block",
    "lat": 22.592161,
    "lng": 88.428291,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AJ Block, Salt Lake, Kolkata",
    "websitePandalId": "address-aj-block-durga-puja-700091"
  },
  {
    "id": "map-41",
    "name": "Laketown Nutan Palli Pradeep Sangha",
    "lat": 22.60372,
    "lng": 88.397507,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Lake Town",
    "address": "Nutan Palli, Lake Town, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-42",
    "name": "Rammohan Sammilani",
    "lat": 22.581205,
    "lng": 88.375031,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "Rammohan Sarani, Kolkata",
    "websitePandalId": "address-rammohan-sammilani-durga-puja-700009"
  },
  {
    "id": "map-43",
    "name": "Durga Puja of 4 Ghosh Lane",
    "lat": 22.585108,
    "lng": 88.370789,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "4, Ghosh Lane, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-44",
    "name": "Dakshineswar Dolpere Adi Sabojonin Durgapuja",
    "lat": 22.659449,
    "lng": 88.364433,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dakshineswar",
    "address": "Dolpere, Dakshineswar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-45",
    "name": "Milangarh Sarbojanin",
    "lat": 22.651651,
    "lng": 88.374054,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Belgharia",
    "address": "Milangarh, Belgharia, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-46",
    "name": "Motijheel Sarbojanin",
    "lat": 22.62336,
    "lng": 88.410759,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum",
    "address": "Motijheel, Dum Dum, Kolkata",
    "websitePandalId": "sharodiya-dumdum-motijheel-durga-puja"
  },
  {
    "id": "map-47",
    "name": "Beliaghata Nabamilan",
    "lat": 22.565413,
    "lng": 88.396255,
    "cat": "north",
    "section": "East Kolkata",
    "subArea": "Beliaghata",
    "address": "Beliaghata Main Road, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-48",
    "name": "Sandhani",
    "lat": 22.564798,
    "lng": 88.396149,
    "cat": "north",
    "section": "East Kolkata",
    "subArea": "Beliaghata",
    "address": "Beliaghata, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-49",
    "name": "United Club",
    "lat": 22.591042,
    "lng": 88.391182,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Ultadanga, Kolkata",
    "websitePandalId": "address-bengal-united-club-south-kolkata"
  },
  {
    "id": "map-50",
    "name": "Kumartuli Preparation",
    "lat": 22.599609,
    "lng": 88.362396,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Kumartuli",
    "address": "Kumartuli Artisan Hub, Kolkata",
    "websitePandalId": "address-kumartuli-sarbojanin-durgotsab-700005"
  },
  {
    "id": "map-51",
    "name": "Swapnar Bagan",
    "lat": 22.579193,
    "lng": 88.395462,
    "cat": "north",
    "section": "East Kolkata",
    "subArea": "Kankurgachi",
    "address": "Swapnar Bagan, Kankurgachi, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-52",
    "name": "Lalabagan Yubak Brinda - Nabankur Sangha",
    "lat": 22.588247,
    "lng": 88.377106,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "Lalabagan, Maniktala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-53",
    "name": "Sammilita Lalabagan Sarbojanin",
    "lat": 22.587385,
    "lng": 88.376923,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "Lalabagan, Maniktala, Kolkata",
    "websitePandalId": "address-sammilita-lalabagan-sarbojanin-durga-puja-700006"
  },
  {
    "id": "map-54",
    "name": "Salt Lake AE Block - Part 1",
    "lat": 22.59856,
    "lng": 88.409409,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AE Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ae-block-700064"
  },
  {
    "id": "map-55",
    "name": "CIT Sarbojanin",
    "lat": 22.625994,
    "lng": 88.377861,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Belgachia",
    "address": "CIT Buildings, Belgachia, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-56",
    "name": "Baghbazar Jagodharti",
    "lat": 22.603493,
    "lng": 88.371101,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Baghbazar",
    "address": "Baghbazar Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-57",
    "name": "Beliaghata 33 No Palli",
    "lat": 22.566563,
    "lng": 88.393852,
    "cat": "north",
    "section": "East Kolkata",
    "subArea": "Beliaghata",
    "address": "33 Pally, Beliaghata, Kolkata",
    "websitePandalId": "sharodiya-beliaghata-33-no-palli-basi-brinda"
  },
  {
    "id": "map-58",
    "name": "Belgachia Sadharan Durgatsab",
    "lat": 22.609217,
    "lng": 88.383423,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Belgachia",
    "address": "Belgachia Road, Kolkata",
    "websitePandalId": "address-belgachia-sarbojanin-700037"
  },
  {
    "id": "map-59",
    "name": "Kumartuli Sarbojanin",
    "lat": 22.600859,
    "lng": 88.363274,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Kumartuli",
    "address": "2, Durga Charan Banerjee Street, Kumartuli, Kolkata",
    "websitePandalId": "kumartuli-park"
  },
  {
    "id": "map-60",
    "name": "Satadal",
    "lat": 22.595173,
    "lng": 88.367691,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Shyambazar",
    "address": "Shyambazar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-61",
    "name": "Salt Lake AE Block - Part 2",
    "lat": 22.600937,
    "lng": 88.413353,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AE Block Part 2, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ae-block-700064"
  },
  {
    "id": "map-62",
    "name": "Salt Lake BE Block - Part 2",
    "lat": 22.596836,
    "lng": 88.412193,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BE Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-be-block-700064"
  },
  {
    "id": "map-63",
    "name": "Salt Lake CK-CL Block",
    "lat": 22.584633,
    "lng": 88.427864,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "CK-CL Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ck-cl-block-700064"
  },
  {
    "id": "map-64",
    "name": "Salt Lake DL block",
    "lat": 22.582136,
    "lng": 88.425819,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "DL Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-dl-block-700064"
  },
  {
    "id": "map-65",
    "name": "Karunamayee G Block",
    "lat": 22.583117,
    "lng": 88.423172,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Karunamayee",
    "address": "G Block, Karunamayee, Salt Lake, Kolkata",
    "websitePandalId": "address-karunamayee-g-block-700091"
  },
  {
    "id": "map-66",
    "name": "Kamardanga Sitalatala - Howrah",
    "lat": 22.596292,
    "lng": 88.302353,
    "cat": "north",
    "section": "West Kolkata",
    "subArea": "Howrah",
    "address": "Kamardanga, Howrah",
    "websitePandalId": null
  },
  {
    "id": "map-67",
    "name": "Arupara Milan Sangha - Howrah",
    "lat": 22.597847,
    "lng": 88.300949,
    "cat": "north",
    "section": "West Kolkata",
    "subArea": "Howrah",
    "address": "Arupara, Howrah",
    "websitePandalId": "address-arupara-sarbojanin-durgotsab-committee-howrah"
  },
  {
    "id": "map-68",
    "name": "Naba Baghbazar",
    "lat": 22.605097,
    "lng": 88.370171,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Baghbazar",
    "address": "Baghbazar, Kolkata",
    "websitePandalId": "sharodiya-naba-baghbazar-sarbajanin-durga-puja"
  },
  {
    "id": "map-69",
    "name": "Bangur Avenue Protirodh Bahini",
    "lat": 22.606899,
    "lng": 88.409248,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Bangur Avenue",
    "address": "Bangur Avenue, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-70",
    "name": "Goabagan Sarbojanin",
    "lat": 22.59124,
    "lng": 88.372864,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Goabagan",
    "address": "Goabagan Street, Kolkata",
    "websitePandalId": "address-goabagan-sarodatsav-sammilani-700006"
  },
  {
    "id": "map-71",
    "name": "Hari Ghosh Street Sarbojonin",
    "lat": 22.590546,
    "lng": 88.368286,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Hedua",
    "address": "Hari Ghosh Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-72",
    "name": "Jagat Mukherjee Park",
    "lat": 22.599777,
    "lng": 88.36615,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Sovabazar",
    "address": "1, Jatindra Mohan Avenue, Sovabazar, Kolkata",
    "websitePandalId": "address-jagat-mukherjee-park-700005"
  },
  {
    "id": "map-73",
    "name": "Baghbazar Pally",
    "lat": 22.60281,
    "lng": 88.367363,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Baghbazar",
    "address": "Baghbazar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-74",
    "name": "Beadon Street Sarbojanin",
    "lat": 22.589317,
    "lng": 88.368347,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Beadon Street",
    "address": "Beadon Street, Kolkata",
    "websitePandalId": "address-beadon-street-sarbojanin-durgotsav-700006"
  },
  {
    "id": "map-75",
    "name": "Sammilita Malapara",
    "lat": 22.587664,
    "lng": 88.354752,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Jorasanko",
    "address": "Malapara, Jorasanko, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-76",
    "name": "Darpanarayan Tagore Street Pally Samity",
    "lat": 22.587505,
    "lng": 88.354111,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Jorasanko",
    "address": "Darpanarayan Tagore Street, Kolkata",
    "websitePandalId": "sharodiya-darpanarayan-sarbojanin-durga-puja"
  },
  {
    "id": "map-77",
    "name": "Haritaki Bagan",
    "lat": 22.584158,
    "lng": 88.373466,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Maniktala",
    "address": "Haritaki Bagan Lane, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-78",
    "name": "Sovabazar Sarbojanin",
    "lat": 22.597075,
    "lng": 88.361763,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Sovabazar",
    "address": "Sovabazar Street, Kolkata",
    "websitePandalId": "address-sovabazar-rajbari-700005"
  },
  {
    "id": "map-79",
    "name": "Hatkhola Gosain Para",
    "lat": 22.597885,
    "lng": 88.360771,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Hatkhola",
    "address": "Gosain Para Lane, Hatkhola, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-80",
    "name": "Laketown Vivekananda Park",
    "lat": 22.610039,
    "lng": 88.402565,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Lake Town",
    "address": "Vivekananda Park, Lake Town, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-81",
    "name": "Jawpur Bayam Samiti",
    "lat": 22.610584,
    "lng": 88.401138,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum",
    "address": "Jawpur, Dum Dum, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-82",
    "name": "Pragati Pally Adhibasi Brindra",
    "lat": 22.609594,
    "lng": 88.400665,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Dum Dum",
    "address": "Pragati Pally, Dum Dum, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-83",
    "name": "Kabiraj Bagan",
    "lat": 22.593855,
    "lng": 88.382729,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Kabiraj Bagan, Ultadanga, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-84",
    "name": "Murari Pukur Bidhan Sangha",
    "lat": 22.592875,
    "lng": 88.383232,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Murari Pukur Road, Kolkata",
    "websitePandalId": "sharodiya-bidhan-sangha-durga-puja-club"
  },
  {
    "id": "map-85",
    "name": "Salt Lake AD Block",
    "lat": 22.596855,
    "lng": 88.406448,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AD Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ad-block-700064"
  },
  {
    "id": "map-86",
    "name": "Salt Lake AG Block",
    "lat": 22.598421,
    "lng": 88.423286,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AG Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ag-block-700091"
  },
  {
    "id": "map-87",
    "name": "Sangrami",
    "lat": 22.590536,
    "lng": 88.395699,
    "cat": "salt_lake",
    "section": "East Kolkata",
    "subArea": "Kankurgachi",
    "address": "Kankurgachi, Kolkata",
    "websitePandalId": "address-ultadanga-sangrami-durga-puja-700067"
  },
  {
    "id": "map-88",
    "name": "Tarun Sporting Club",
    "lat": 22.586376,
    "lng": 88.365311,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Simla",
    "address": "Simla, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-89",
    "name": "Shimla Vivekananda Sporting Club",
    "lat": 22.585722,
    "lng": 88.371811,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Simla",
    "address": "Simla Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-90",
    "name": "Shurir Bagan",
    "lat": 22.594559,
    "lng": 88.387566,
    "cat": "north",
    "section": "North Kolkata",
    "subArea": "Ultadanga",
    "address": "Shurir Bagan, Ultadanga, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-91",
    "name": "Salt Lake CA Block",
    "lat": 22.587496,
    "lng": 88.399689,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "CA Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ca-block-700064"
  },
  {
    "id": "map-92",
    "name": "Salt Lake BG Block",
    "lat": 22.595449,
    "lng": 88.423119,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BG Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bg-block-700064"
  },
  {
    "id": "map-93",
    "name": "Salt Lake AH Block",
    "lat": 22.594231,
    "lng": 88.427269,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AH Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ah-block-700091"
  },
  {
    "id": "map-94",
    "name": "Park Circus",
    "lat": 22.543079,
    "lng": 88.36776,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Park Circus",
    "address": "Park Circus Maidan, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-95",
    "name": "Deshapriya Park",
    "lat": 22.518661,
    "lng": 88.353249,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat / Rashbehari",
    "address": "Rashbehari Avenue, Deshapriya Park, Kolkata",
    "websitePandalId": "address-deshapriya-park-700029"
  },
  {
    "id": "map-96",
    "name": "41 Pally",
    "lat": 22.48303,
    "lng": 88.338509,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "41 Pally, Haridevpur, Kolkata",
    "websitePandalId": "address-41-pally-club-700082"
  },
  {
    "id": "map-97",
    "name": "Ajeya Sanghati",
    "lat": 22.480553,
    "lng": 88.337418,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "Ajeya Sanghati Road, Haridevpur, Kolkata",
    "websitePandalId": "address-ajeya-sanghati-club-700082"
  },
  {
    "id": "map-98",
    "name": "Vivekananda Sporting Club",
    "lat": 22.476332,
    "lng": 88.338493,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "Haridevpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-99",
    "name": "Vivekananda Park Athletic Club",
    "lat": 22.481016,
    "lng": 88.336967,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "Vivekananda Park, Haridevpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-100",
    "name": "Pally Unnayan Samity Paschim Putiary",
    "lat": 22.478121,
    "lng": 88.342247,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Paschim Putiary",
    "address": "Paschim Putiary, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-101",
    "name": "Naskarpara Pally Unnayan Samity - Haridevpur",
    "lat": 22.480223,
    "lng": 88.339539,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "Naskarpara, Haridevpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-102",
    "name": "Barisha Club, Srishti Sahajatri",
    "lat": 22.48151,
    "lng": 88.312866,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala / Barisha",
    "address": "Barisha Club Ground, Behala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-103",
    "name": "Barisha Janakalyan Sangha",
    "lat": 22.485041,
    "lng": 88.312744,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala / Barisha",
    "address": "Janakalyan Sangha, Barisha, Kolkata",
    "websitePandalId": "sharodiya-barisha-janakalyan-sangha-durga-puja-area"
  },
  {
    "id": "map-104",
    "name": "Sabeda Bagan",
    "lat": 22.488293,
    "lng": 88.316666,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Sabeda Bagan, Behala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-105",
    "name": "Debdaru Fatak",
    "lat": 22.502714,
    "lng": 88.317474,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Debdaru Fatak, Behala, Kolkata",
    "websitePandalId": "address-behala-debdaru-fatak-durga-puja-700034"
  },
  {
    "id": "map-106",
    "name": "Behala Sree Sangha",
    "lat": 22.497669,
    "lng": 88.320183,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Sree Sangha Ground, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-107",
    "name": "Behala Youngmen's Association",
    "lat": 22.507067,
    "lng": 88.325104,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Youngmen's Association Ground, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-108",
    "name": "Behala Adarsha Pally",
    "lat": 22.499989,
    "lng": 88.327629,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Adarsha Pally, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-109",
    "name": "Badamtala Ashar Sangha",
    "lat": 22.517864,
    "lng": 88.343994,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat",
    "address": "Nepal Bhattacharjee Street, Kalighat, Kolkata",
    "websitePandalId": "address-badamtala-ashar-sangha-700026"
  },
  {
    "id": "map-110",
    "name": "Behala Nutan Dal",
    "lat": 22.501228,
    "lng": 88.319565,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Nutan Dal Ground, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-111",
    "name": "Bosepukur Talbagan",
    "lat": 22.517492,
    "lng": 88.38533,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kasba / Bosepukur",
    "address": "Bosepukur Road, Kasba, Kolkata",
    "websitePandalId": "address-bosepukur-talbagan-700042"
  },
  {
    "id": "map-112",
    "name": "Rajdanga Tribarna Sangha",
    "lat": 22.515083,
    "lng": 88.389534,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Rajdanga",
    "address": "Rajdanga, Kasba, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-113",
    "name": "Bosepukur Sitala Mandir",
    "lat": 22.516581,
    "lng": 88.388023,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kasba / Bosepukur",
    "address": "Bosepukur Sitala Mandir, Kasba, Kolkata",
    "websitePandalId": "address-bosepukur-sitala-mandir-700042"
  },
  {
    "id": "map-114",
    "name": "Ekdalia Evergreen Club",
    "lat": 22.521111,
    "lng": 88.366447,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge / Gariahat",
    "address": "15, Ekdalia Road, Gariahat, Kolkata",
    "websitePandalId": "ekdalia-evergreen"
  },
  {
    "id": "map-115",
    "name": "Jodhpur Park",
    "lat": 22.504702,
    "lng": 88.365028,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Jodhpur Park",
    "address": "Jodhpur Park Ground, Kolkata",
    "websitePandalId": "address-jodhpur-park-sarbojanin-700068"
  },
  {
    "id": "map-116",
    "name": "Selimpur Pally",
    "lat": 22.505087,
    "lng": 88.368149,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Dhakuria / Selimpur",
    "address": "Selimpur Road, Dhakuria, Kolkata",
    "websitePandalId": "address-selimpur-pally-700031"
  },
  {
    "id": "map-117",
    "name": "Santoshpur Lake Pally",
    "lat": 22.491508,
    "lng": 88.382774,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Santoshpur",
    "address": "Santoshpur Lake Pally, Kolkata",
    "websitePandalId": "address-santoshpur-lake-pally-700075"
  },
  {
    "id": "map-118",
    "name": "Mudiali Club",
    "lat": 22.510118,
    "lng": 88.346725,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Southern Avenue",
    "address": "3, Rajani Sen Road, Mudiali, Kolkata",
    "websitePandalId": "pack-mudiali-club-durgotsav"
  },
  {
    "id": "map-119",
    "name": "Shibmandir Sarbojanin Durgotsab",
    "lat": 22.510822,
    "lng": 88.349388,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Lake Temple",
    "address": "Lake Temple Road, Mudiali, Kolkata",
    "websitePandalId": "sharodiya-shibmandir-sarbojanin-durgotsab-samiti"
  },
  {
    "id": "map-120",
    "name": "Naktala Udayan Sangha",
    "lat": 22.474174,
    "lng": 88.36705,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Naktala / Garia",
    "address": "Naktala High School Ground, Kolkata",
    "websitePandalId": "pack-naktala-udayan-sangha-durgotsav"
  },
  {
    "id": "map-121",
    "name": "Rajdanga Naba Uday Sangha",
    "lat": 22.515675,
    "lng": 88.390442,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Rajdanga",
    "address": "Rajdanga Main Road, Kasba, Kolkata",
    "websitePandalId": "address-rajdanga-naba-uday-sangha-700107"
  },
  {
    "id": "map-122",
    "name": "Suruchi Sangha",
    "lat": 22.509346,
    "lng": 88.333664,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "New Alipore",
    "address": "500, Block M, New Alipore, Kolkata",
    "websitePandalId": "suruchi-sangha"
  },
  {
    "id": "map-123",
    "name": "Tridhara Sammilani",
    "lat": 22.519238,
    "lng": 88.355377,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Manoherpukur",
    "address": "Manoherpukur Road, Deshapriya Park, Kolkata",
    "websitePandalId": "tridhara-sammilani"
  },
  {
    "id": "map-124",
    "name": "Pratapaditya Road Tricone Park",
    "lat": 22.513498,
    "lng": 88.344658,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Tollygunge",
    "address": "Pratapaditya Road, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-125",
    "name": "Sanghasree",
    "lat": 22.521303,
    "lng": 88.345795,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat",
    "address": "Kalighat Road, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-126",
    "name": "25 Pally",
    "lat": 22.539078,
    "lng": 88.326538,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kidderpore",
    "address": "25 Pally, Kidderpore, Kolkata",
    "websitePandalId": "address-25-pally-club-khidirpur-700023"
  },
  {
    "id": "map-127",
    "name": "Mukul Sangha",
    "lat": 22.503359,
    "lng": 88.313705,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Mukul Sangha Ground, Behala, Kolkata",
    "websitePandalId": "address-behala-mukul-sangha-durgotsab-700034"
  },
  {
    "id": "map-128",
    "name": "66 Palli",
    "lat": 22.518148,
    "lng": 88.342644,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat",
    "address": "Nepal Bhattacharjee Street, Kalighat, Kolkata",
    "websitePandalId": "sharodiya-66-palli-sarbojanin-durgotsab-committee"
  },
  {
    "id": "map-129",
    "name": "Hindustan Park",
    "lat": 22.517731,
    "lng": 88.362648,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Gariahat",
    "address": "Hindustan Park, Gariahat, Kolkata",
    "websitePandalId": "address-hindustan-park-sarbojanin-700029"
  },
  {
    "id": "map-130",
    "name": "Adi Lake Palli",
    "lat": 22.514532,
    "lng": 88.34938,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Lake Gardens",
    "address": "Lake Gardens Area, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-131",
    "name": "Azadgarh",
    "lat": 22.484604,
    "lng": 88.356171,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Tollygunge",
    "address": "Azadgarh, Tollygunge, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-132",
    "name": "Bharat Mata",
    "lat": 22.488014,
    "lng": 88.36248,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Tollygunge",
    "address": "Bharat Mata Club, Tollygunge, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-133",
    "name": "Golfgreen Phase 2",
    "lat": 22.492256,
    "lng": 88.360809,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Golf Green",
    "address": "Phase 2, Golf Green, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-134",
    "name": "Santoshpur Trikon Park",
    "lat": 22.492996,
    "lng": 88.378448,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Santoshpur",
    "address": "Trikon Park, Santoshpur, Kolkata",
    "websitePandalId": "address-santoshpur-trikon-park-700075"
  },
  {
    "id": "map-135",
    "name": "Yuba Sangha Club",
    "lat": 22.485378,
    "lng": 88.36499,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Netaji Nagar",
    "address": "Yuba Sangha, Netaji Nagar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-136",
    "name": "Netaji Nagar Sarbojanin",
    "lat": 22.480721,
    "lng": 88.357719,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Netaji Nagar",
    "address": "Netaji Nagar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-137",
    "name": "Netaji Jatiya Sebadal",
    "lat": 22.484991,
    "lng": 88.358231,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Netaji Nagar",
    "address": "Netaji Nagar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-138",
    "name": "New Alipore Children's Park",
    "lat": 22.507145,
    "lng": 88.337021,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "New Alipore",
    "address": "Children's Park, New Alipore, Kolkata",
    "websitePandalId": "address-alipore-sarbojanin-700027"
  },
  {
    "id": "map-139",
    "name": "Pally Mangal Samity",
    "lat": 22.503017,
    "lng": 88.36396,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Jodhpur Park",
    "address": "Pally Mangal Samity, Jodhpur Park, Kolkata",
    "websitePandalId": "address-pally-mangal-samity-700031"
  },
  {
    "id": "map-140",
    "name": "Poddar Nagar Park",
    "lat": 22.500887,
    "lng": 88.364433,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Poddar Nagar",
    "address": "Poddar Nagar Park, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-141",
    "name": "Chakraberia Sarbojanin",
    "lat": 22.533646,
    "lng": 88.351891,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Bhowanipore",
    "address": "Chakraberia Road, Bhowanipore, Kolkata",
    "websitePandalId": "sharodiya-chakraberia-sarbojanin-durgotsab"
  },
  {
    "id": "map-142",
    "name": "Babubagan Club",
    "lat": 22.507988,
    "lng": 88.368515,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Dhakuria",
    "address": "Babubagan Lane, Dhakuria, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-143",
    "name": "Barisha Tarun Tirtha",
    "lat": 22.476515,
    "lng": 88.31823,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Tarun Tirtha, Barisha, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-144",
    "name": "74 Pally",
    "lat": 22.539438,
    "lng": 88.325729,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kidderpore",
    "address": "74 Pally, Kidderpore, Kolkata",
    "websitePandalId": "sharodiya-74-pally-club"
  },
  {
    "id": "map-145",
    "name": "Kabitirtha",
    "lat": 22.541048,
    "lng": 88.323288,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kidderpore",
    "address": "Kabitirtha Park, Kidderpore, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-146",
    "name": "Pally Saradiya Club",
    "lat": 22.543179,
    "lng": 88.321709,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kidderpore",
    "address": "Kidderpore, Kolkata",
    "websitePandalId": "address-kidderpore-pally-saradiya-durga-puja-700023"
  },
  {
    "id": "map-147",
    "name": "Behala 29 Palli",
    "lat": 22.507343,
    "lng": 88.322426,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "29 Pally, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-148",
    "name": "Baishnabghata Patuli Upanagari",
    "lat": 22.471201,
    "lng": 88.380142,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Patuli",
    "address": "Patuli Upanagari, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-149",
    "name": "Kendua Shanti Sangha - Patuli",
    "lat": 22.47193,
    "lng": 88.380997,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Patuli",
    "address": "Kendua Main Road, Patuli, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-150",
    "name": "Falguni Sangha",
    "lat": 22.521793,
    "lng": 88.365829,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge",
    "address": "Falguni Sangha, Ballygunge, Kolkata",
    "websitePandalId": "address-falguni-sangha-700019"
  },
  {
    "id": "map-151",
    "name": "Chetla Agrani Club",
    "lat": 22.516447,
    "lng": 88.337151,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Chetla",
    "address": "Chetla Central Park, Chetla, Kolkata",
    "websitePandalId": "chetla-agrani"
  },
  {
    "id": "map-152",
    "name": "Chelta Sarbasadharaner Club",
    "lat": 22.517433,
    "lng": 88.339928,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Chetla",
    "address": "Chetla Road, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-153",
    "name": "Selimpur Naskarpara",
    "lat": 22.504808,
    "lng": 88.37606,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Selimpur",
    "address": "Naskarpara, Selimpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-154",
    "name": "Bengal United Club",
    "lat": 22.512428,
    "lng": 88.348518,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat",
    "address": "Bengal United Club Ground, Kolkata",
    "websitePandalId": "address-bengal-united-club-south-kolkata"
  },
  {
    "id": "map-155",
    "name": "Chandranath Chatterjee Street",
    "lat": 22.52669,
    "lng": 88.345848,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Bhowanipore",
    "address": "Chandranath Chatterjee Street, Bhowanipore, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-156",
    "name": "Greenwood Nook",
    "lat": 22.50556,
    "lng": 88.399902,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "EM Bypass",
    "address": "Greenwood Nook, EM Bypass, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-157",
    "name": "Sebak Sangha",
    "lat": 22.511377,
    "lng": 88.347542,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Mudiali",
    "address": "Sebak Sangha, Mudiali, Kolkata",
    "websitePandalId": "sharodiya-lake-avenue-sebak-sangha-durga-puja"
  },
  {
    "id": "map-158",
    "name": "Dilip Smriti Sangha",
    "lat": 22.517796,
    "lng": 88.34494,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kalighat",
    "address": "Dilip Smriti Sangha, Kalighat, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-159",
    "name": "Lake Youth Corner",
    "lat": 22.510754,
    "lng": 88.347328,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Southern Avenue",
    "address": "Lake Youth Corner, Southern Avenue, Kolkata",
    "websitePandalId": "sharodiya-lake-youth-corner-durga-puja"
  },
  {
    "id": "map-160",
    "name": "Ekush Pally Sarbojanin Durgotsab",
    "lat": 22.529325,
    "lng": 88.369217,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge",
    "address": "Ekush Pally, Ballygunge, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-161",
    "name": "Acharya Prafulla Sangha - Behala",
    "lat": 22.49065,
    "lng": 88.313461,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Acharya Prafulla Sangha, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-162",
    "name": "Adi Ballygunge",
    "lat": 22.529564,
    "lng": 88.37265,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge",
    "address": "Adi Ballygunge, Kolkata",
    "websitePandalId": "address-adi-ballygunge-sarbojanin-700019"
  },
  {
    "id": "map-163",
    "name": "Ballygunge Cultural Association",
    "lat": 22.516363,
    "lng": 88.355705,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge Place",
    "address": "57, Ballygunge Place, Kolkata",
    "websitePandalId": "address-ballygunge-cultural-association-700029"
  },
  {
    "id": "map-164",
    "name": "Barisha Player's Corner",
    "lat": 22.486588,
    "lng": 88.312614,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Player's Corner, Barisha, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-165",
    "name": "Barisha Sabuj Sathi Club",
    "lat": 22.47821,
    "lng": 88.310753,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Sabuj Sathi Club, Barisha, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-166",
    "name": "Barisha Tapoban",
    "lat": 22.475655,
    "lng": 88.310432,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Tapoban, Barisha, Kolkata",
    "websitePandalId": "sharodiya-barisha-tapoban-durgapuja-area"
  },
  {
    "id": "map-167",
    "name": "Behala Arcadia Sarbojanin",
    "lat": 22.4942,
    "lng": 88.315163,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Arcadia, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-168",
    "name": "Durgabari",
    "lat": 22.499889,
    "lng": 88.315765,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Durgabari, Behala, Kolkata",
    "websitePandalId": "sharodiya-ballygunge-pratisthan-durgabari"
  },
  {
    "id": "map-169",
    "name": "Ganbani Sangha",
    "lat": 22.488768,
    "lng": 88.327805,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Ganbani Sangha, Behala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-170",
    "name": "Samaj Sebi Sangha",
    "lat": 22.515591,
    "lng": 88.357719,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Lake View Road",
    "address": "14A, Lake View Road, Kolkata",
    "websitePandalId": "address-samaj-sebi-sangha-700029"
  },
  {
    "id": "map-171",
    "name": "Sodepur Pragati Sangha (Haridevpur)",
    "lat": 22.481165,
    "lng": 88.331619,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Haridevpur",
    "address": "Sodepur, Haridevpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-172",
    "name": "Santoshpur Sonar Tori Durgatsav",
    "lat": 22.49184,
    "lng": 88.378548,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Santoshpur",
    "address": "Sonar Tori, Santoshpur, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-173",
    "name": "Abasar Sarbojonin",
    "lat": 22.527561,
    "lng": 88.3489,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Bhowanipore",
    "address": "Abasar Ground, Bhowanipore, Kolkata",
    "websitePandalId": "address-abasar-sarbojanin-south-kolkata"
  },
  {
    "id": "map-174",
    "name": "Goal Math",
    "lat": 22.526709,
    "lng": 88.349045,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Bhowanipore",
    "address": "Goal Math, Bhowanipore, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-175",
    "name": "Barisha Netaji Sangha",
    "lat": 22.48385,
    "lng": 88.314629,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Netaji Sangha, Barisha, Kolkata",
    "websitePandalId": "address-barisha-netaji-sangha-durga-puja-700008"
  },
  {
    "id": "map-176",
    "name": "Behala Buroshibtala Janakalyan Sangha",
    "lat": 22.502289,
    "lng": 88.329735,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Buroshibtala, Behala, Kolkata",
    "websitePandalId": "address-behala-club-700060"
  },
  {
    "id": "map-177",
    "name": "Jogajatri Club",
    "lat": 22.501614,
    "lng": 88.331284,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Jogajatri Club, Behala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-178",
    "name": "Surya Nagar Sarbojanin",
    "lat": 22.47489,
    "lng": 88.359344,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Netaji Nagar",
    "address": "Surya Nagar, Netaji Nagar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-179",
    "name": "Udayan Sangha",
    "lat": 22.501814,
    "lng": 88.387711,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Kasba",
    "address": "Udayan Sangha, Kasba, Kolkata",
    "websitePandalId": "pack-naktala-udayan-sangha-durgotsav"
  },
  {
    "id": "map-180",
    "name": "Uttar Panchanan Gram Milan",
    "lat": 22.532141,
    "lng": 88.396339,
    "cat": "south",
    "section": "East Kolkata",
    "subArea": "EM Bypass",
    "address": "Uttar Panchanan Gram, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-181",
    "name": "Golden Arrow Club",
    "lat": 22.516293,
    "lng": 88.34758,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Mudiali",
    "address": "Golden Arrow Club, Mudiali, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-182",
    "name": "Purbachal Shakti Sangha",
    "lat": 22.505142,
    "lng": 88.389214,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Purbachal",
    "address": "Shakti Sangha, Purbachal, Kasba, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-183",
    "name": "Naskarpur Sarbojanin",
    "lat": 22.506571,
    "lng": 88.312065,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "Naskarpur, Behala, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-184",
    "name": "Kolkata Central Sarbojanin",
    "lat": 22.56472,
    "lng": 88.350845,
    "cat": "north",
    "section": "Central Kolkata",
    "subArea": "Esplanade",
    "address": "Central Kolkata Maidan, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-185",
    "name": "Srimani Barir Durga Pujo",
    "lat": 22.5818002,
    "lng": 88.3738888,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Hedua",
    "address": "27, Srimani Street, Hedua, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-186",
    "name": "Hathkhola Dutta Barir Durga Pujo",
    "lat": 22.5928457,
    "lng": 88.3549315,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Hathkhola",
    "address": "78, Nimtala Ghat Street, Hathkhola, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-187",
    "name": "Sovabazar Rajbarir Durga Pujo",
    "lat": 22.5962505,
    "lng": 88.3674185,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Sovabazar",
    "address": "36, Raja Nabakrishna Street, Sovabazar, Kolkata",
    "websitePandalId": "address-sovabazar-rajbari-700005"
  },
  {
    "id": "map-188",
    "name": "Roychoudhury Barir Durga Pujo",
    "lat": 22.4800988,
    "lng": 88.3065756,
    "cat": "aristocratic",
    "section": "South Kolkata",
    "subArea": "Barisha",
    "address": "Sabarna Roy Choudhury Baria, Barisha, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-189",
    "name": "Khelat Ghose er Durga Pujo",
    "lat": 22.5887689,
    "lng": 88.3565391,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Pathuriaghata",
    "address": "47, Pathuriaghata Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-190",
    "name": "Rani Rashmoni er Durga Pujo",
    "lat": 22.5624669,
    "lng": 88.3553522,
    "cat": "aristocratic",
    "section": "Central Kolkata",
    "subArea": "Janbazar",
    "address": "13, Rani Rashmoni Road, Janbazar, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-191",
    "name": "RAMDULAL NIBAS er Durga Pujo",
    "lat": 22.5903317,
    "lng": 88.364845,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Beadon Street",
    "address": "67/1/A, Beadon Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-192",
    "name": "Baghbazar Haldar Bari er Pujo",
    "lat": 22.6034575,
    "lng": 88.3670376,
    "cat": "aristocratic",
    "section": "North Kolkata",
    "subArea": "Baghbazar",
    "address": "14, Baghbazar Street, Kolkata",
    "websitePandalId": null
  },
  {
    "id": "map-193",
    "name": "Maddox Square Durga Puja",
    "lat": 22.5265634,
    "lng": 88.3546477,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Ballygunge",
    "address": "Pankaj Mullick Sarani, Maddox Square, Kolkata",
    "websitePandalId": "address-maddox-square-700025"
  },
  {
    "id": "map-194",
    "name": "11 Pally Club",
    "lat": 22.4985408,
    "lng": 88.3214501,
    "cat": "south",
    "section": "South Kolkata",
    "subArea": "Behala",
    "address": "11 Pally, Behala, Kolkata",
    "websitePandalId": "address-behala-11-pally-south-west-kolkata"
  },
  {
    "id": "map-195",
    "name": "AK Block",
    "lat": 22.5891537,
    "lng": 88.4313014,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AK Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ak-block-700091"
  },
  {
    "id": "map-196",
    "name": "AE Block",
    "lat": 22.6008801,
    "lng": 88.4119096,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AE Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ae-block-700064"
  },
  {
    "id": "map-197",
    "name": "AJ Block",
    "lat": 22.5921092,
    "lng": 88.4288779,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AJ Block, Salt Lake, Kolkata",
    "websitePandalId": "address-aj-block-durga-puja-700091"
  },
  {
    "id": "map-198",
    "name": "AA Block",
    "lat": 22.5917995,
    "lng": 88.39736,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AA Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-aa-block-700064"
  },
  {
    "id": "map-199",
    "name": "AB Block",
    "lat": 22.593313,
    "lng": 88.3997852,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AB Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ab-block-700064"
  },
  {
    "id": "map-200",
    "name": "AC Block",
    "lat": 22.5948385,
    "lng": 88.4034229,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "AC Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ac-block-700064"
  },
  {
    "id": "map-201",
    "name": "AG Block",
    "lat": 22.5995094,
    "lng": 88.4240305,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AG Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ag-block-700091"
  },
  {
    "id": "map-202",
    "name": "AH Block",
    "lat": 22.5965541,
    "lng": 88.4264543,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AH Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ah-block-700091"
  },
  {
    "id": "map-203",
    "name": "AL Block",
    "lat": 22.5861982,
    "lng": 88.4337248,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "AL Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-al-block-700091"
  },
  {
    "id": "map-204",
    "name": "BA Block",
    "lat": 22.5888325,
    "lng": 88.3985726,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BA Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-ba-block-700064"
  },
  {
    "id": "map-205",
    "name": "BB Block",
    "lat": 22.5918475,
    "lng": 88.4022104,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BB Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bb-block-700064"
  },
  {
    "id": "map-206",
    "name": "BC Block",
    "lat": 22.5929856,
    "lng": 88.4043323,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BC Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bc-block-700064"
  },
  {
    "id": "map-207",
    "name": "BD Block",
    "lat": 22.5948864,
    "lng": 88.4082726,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BD Block, Salt Lake, Kolkata",
    "websitePandalId": "address-bd-block-sarbojanin-durgotsab-700064"
  },
  {
    "id": "map-208",
    "name": "BE Block",
    "lat": 22.5979131,
    "lng": 88.4131218,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector I",
    "address": "BE Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-be-block-700064"
  },
  {
    "id": "map-209",
    "name": "BG Block",
    "lat": 22.5953985,
    "lng": 88.4225156,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BG Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bg-block-700064"
  },
  {
    "id": "map-210",
    "name": "BH Block",
    "lat": 22.5939268,
    "lng": 88.4243335,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BH Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bh-block-700064"
  },
  {
    "id": "map-211",
    "name": "BK Block",
    "lat": 22.5876407,
    "lng": 88.4288779,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BK Block, Salt Lake, Kolkata",
    "websitePandalId": "address-salt-lake-bk-block-700064"
  },
  {
    "id": "map-212",
    "name": "BL Block",
    "lat": 22.5846852,
    "lng": 88.4313014,
    "cat": "salt_lake",
    "section": "Salt Lake",
    "subArea": "Sector II",
    "address": "BL Block, Salt Lake, Kolkata",
    "websitePandalId": "address-bl-block-durga-puja-700091"
  }
];

/**
 * Derives "iconic" pandals from the canonical ALL_PANDALS catalogue.
 * A pandal qualifies as iconic if it has priority "S" or is marked as
 * sourceFeatured by KolkataKhoj 2026. Returns MapPandalItem[] so these
 * can be rendered on the discovery map alongside the static dataset.
 */
export function deriveIconicPandals(): MapPandalItem[] {
  return ALL_PANDALS
    .filter((p: PandalRecord) =>
      (p.priority === "S" || p.kolkataKhoj2026?.sourceFeatured === true) &&
      p.latitude !== 0 && p.longitude !== 0 &&
      Number.isFinite(p.latitude) && Number.isFinite(p.longitude)
    )
    .map((p: PandalRecord, index: number): MapPandalItem => ({
      id: `iconic-${index + 1}`,
      name: p.name,
      lat: p.latitude,
      lng: p.longitude,
      cat: "iconic",
      section: p.section,
      subArea: p.subArea,
      address: p.address,
      websitePandalId: p.id,
    }));
}

export function getCategoryLabel(cat: MapPandalCategory, bengali: boolean) {
  switch (cat) {
    case "north":
      return bengali ? "উত্তর কলকাতা" : "North Kolkata";
    case "south":
      return bengali ? "দক্ষিণ কলকাতা" : "South Kolkata";
    case "salt_lake":
      return bengali ? "সল্টলেক ও ইস্ট" : "Salt Lake & East";
    case "aristocratic":
      return bengali ? "বনেদি বাড়ির পুজো" : "Aristocratic Bonedi Bari";
    case "iconic":
      return bengali ? "আইকনিক পুজো" : "Iconic Puja";
    default:
      return cat;
  }
}

export function getCategoryColor(cat: MapPandalCategory) {
  switch (cat) {
    case "north":
      return "#e0342c";
    case "south":
      return "#3388ff";
    case "salt_lake":
      return "#2ecc40";
    case "aristocratic":
      return "#ff9f1c";
    case "iconic":
      return "#a855f7";
    default:
      return "#e0342c";
  }
}
