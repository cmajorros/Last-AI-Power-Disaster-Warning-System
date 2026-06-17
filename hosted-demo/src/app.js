const dict = {
  en: {
    app: "Last AI Power Disaster Warning System",
    context: "AI-powered disaster alert and last-mile communication platform for Laos",
    dashboard: "Dashboard",
    alerts: "Alerts",
    map: "Human Map",
    volunteers: "Volunteers",
    contacts: "Contacts",
    reports: "Reports",
    settings: "Settings",
    title: "Operational dashboard",
    subtitle: "Laos national demo, Vientiane time UTC+7",
    active: "Active alerts",
    affected: "Affected people",
    delivered: "Delivered logs",
    ack: "Volunteer acknowledgments",
    aiIntake: "AI intake",
    intakeSubtitle: "Gmail, WhatsApp Business webhooks, documents, screenshots, and OCR-ready uploads",
    analyzeIntake: "Analyze incoming report",
    createDraft: "Create AI alert draft",
    create: "Create flood alert",
    generate: "Generate AI draft",
    review: "Send for review",
    approve: "Approve",
    publish: "Publish",
    simulate: "Simulate WhatsApp/SMS logs",
    status: "Status",
    evidence: "Evidence summary",
    targetAudience: "Target audience routing",
    forecast: "Forecast",
    waterForecast: "Water-level forecast",
    floodProbability: "Flood probability",
    floodStart: "Expected flood start",
    hazardOutlook: "Hazard outlook",
    meteorologyOfficer: "Meteorology officer announcement",
    selectedDisasterArea: "Selected disaster area",
    announcementLevel: "Announcement level",
    announcementMessage: "Announcement message",
    setAnnouncement: "Set announcement now",
    currentAnnouncement: "Current official announcement",
    noAnnouncement: "No crisis announcement has been set yet.",
    crisisNow: "Crisis now",
    disasterNow: "Disaster now",
    watchNow: "Watch now",
    publishedNow: "Published now",
    peopleFirst: "People to mobilize first",
    businessesInArea: "Businesses and factories in this area",
    province: "Province",
    affectedPeople: "Affected people",
    expectedStart: "Expected start",
    water: "Water",
    rainfall: "Rainfall",
    forecastFeed: "last 24h / forecast feed",
    note: "Hosted demo: communication providers are simulated here. The local MVP contains the full AI intake API scaffolding and provider configuration."
  },
  lo: {
    app: "ລະບົບແຈ້ງເຕືອນໄພພິບັດລາວ",
    context: "ແພລດຟອມ AI ສໍາລັບແຈ້ງເຕືອນ ແລະ ສື່ສານຫາຊຸມຊົນ",
    dashboard: "ແດຊບອດ",
    alerts: "ແຈ້ງເຕືອນ",
    map: "ແຜນທີ່",
    volunteers: "ອາສາສະໝັກ",
    contacts: "ຜູ້ຕິດຕໍ່",
    reports: "ລາຍງານ",
    settings: "ຕັ້ງຄ່າ",
    title: "ແດຊບອດປະຕິບັດງານ",
    subtitle: "ສາທິດລະດັບຊາດລາວ, ເວລາວຽງຈັນ UTC+7",
    active: "ແຈ້ງເຕືອນທີ່ເປີດ",
    affected: "ປະຊາກອນກະທົບ",
    delivered: "ບັນທຶກການສົ່ງ",
    ack: "ການຢືນຢັນຂອງອາສາ",
    aiIntake: "ຮັບຂໍ້ມູນດ້ວຍ AI",
    intakeSubtitle: "Gmail, WhatsApp Business, ເອກະສານ, ຮູບພາບ ແລະ OCR",
    analyzeIntake: "ວິເຄາະຂໍ້ມູນ",
    createDraft: "ສ້າງຮ່າງແຈ້ງເຕືອນ",
    create: "ສ້າງແຈ້ງເຕືອນນໍ້າຖ້ວມ",
    generate: "ສ້າງຮ່າງດ້ວຍ AI",
    review: "ສົ່ງກວດທານ",
    approve: "ອະນຸມັດ",
    publish: "ເຜີຍແຜ່",
    simulate: "ຈໍາລອງບັນທຶກ WhatsApp/SMS",
    status: "ສະຖານະ",
    evidence: "ສະຫຼຸບຫຼັກຖານ",
    targetAudience: "ກຸ່ມເປົ້າໝາຍ",
    note: "ເວັບສາທິດນີ້ຈໍາລອງການສົ່ງຂໍ້ຄວາມ. MVP ທ້ອງຖິ່ນມີ API ສໍາລັບ AI intake ແລະ provider configuration."
  }
};

dict.lo = {
  app: "ລະບົບແຈ້ງເຕືອນໄພພິບັດລາວ",
  context: "ແພລດຟອມ AI ສໍາລັບແຈ້ງເຕືອນ ແລະ ສື່ສານຫາຊຸມຊົນ",
  dashboard: "ແດຊບອດ",
  alerts: "ແຈ້ງເຕືອນ",
  map: "ແຜນທີ່ມະນຸດ",
  volunteers: "ອາສາສະໝັກ",
  contacts: "ຜູ້ຕິດຕໍ່",
  reports: "ລາຍງານ",
  settings: "ຕັ້ງຄ່າ",
  title: "ແດຊບອດປະຕິບັດງານ",
  subtitle: "ສາທິດລະດັບຊາດລາວ, ເວລາວຽງຈັນ UTC+7",
  active: "ແຈ້ງເຕືອນທີ່ເປີດ",
  affected: "ປະຊາກອນທີ່ກະທົບ",
  delivered: "ບັນທຶກການສົ່ງ",
  ack: "ການຢືນຢັນຂອງອາສາ",
  aiIntake: "ຮັບຂໍ້ມູນດ້ວຍ AI",
  intakeSubtitle: "Gmail, WhatsApp Business, ເອກະສານ, ຮູບພາບ ແລະ OCR",
  analyzeIntake: "ວິເຄາະຂໍ້ມູນ",
  createDraft: "ສ້າງຮ່າງແຈ້ງເຕືອນ",
  create: "ສ້າງແຈ້ງເຕືອນນໍ້າຖ້ວມ",
  generate: "ສ້າງຮ່າງດ້ວຍ AI",
  review: "ສົ່ງກວດທານ",
  approve: "ອະນຸມັດ",
  publish: "ເຜີຍແຜ່",
  simulate: "ຈໍາລອງບັນທຶກ WhatsApp/SMS",
  status: "ສະຖານະ",
  evidence: "ສະຫຼຸບຫຼັກຖານ",
  targetAudience: "ກຸ່ມເປົ້າໝາຍ",
  forecast: "ພະຍາກອນ",
  waterForecast: "ພະຍາກອນລະດັບນໍ້າ",
  floodProbability: "ໂອກາດນໍ້າຖ້ວມ",
  floodStart: "ເວລາຄາດວ່າຈະເລີ່ມຖ້ວມ",
  hazardOutlook: "ພາບລວມຄວາມສ່ຽງ",
  meteorologyOfficer: "ປະກາດໂດຍເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມ",
  selectedDisasterArea: "ເຂດໄພພິບັດທີ່ເລືອກ",
  announcementLevel: "ລະດັບການປະກາດ",
  announcementMessage: "ຂໍ້ຄວາມປະກາດ",
  setAnnouncement: "ຕັ້ງປະກາດດ່ວນດຽວນີ້",
  currentAnnouncement: "ປະກາດທາງການປັດຈຸບັນ",
  noAnnouncement: "ຍັງບໍ່ມີປະກາດສະຖານະວິກິດ.",
  crisisNow: "ສະຖານະວິກິດດ່ວນ",
  disasterNow: "ໄພພິບັດເກີດຂຶ້ນແລ້ວ",
  watchNow: "ເຝົ້າລະວັງດ່ວນ",
  publishedNow: "ປະກາດແລ້ວ",
  peopleFirst: "ກຸ່ມທີ່ຕ້ອງຊ່ວຍກ່ອນ",
  businessesInArea: "ທຸລະກິດ ແລະ ໂຮງງານໃນເຂດນີ້",
  province: "ແຂວງ",
  affectedPeople: "ປະຊາກອນທີ່ກະທົບ",
  expectedStart: "ເວລາຄາດວ່າເລີ່ມ",
  water: "ລະດັບນໍ້າ",
  rainfall: "ຝົນຕົກ",
  forecastFeed: "24 ຊົ່ວໂມງຜ່ານມາ / ຂໍ້ມູນພະຍາກອນ",
  note: "ເວັບສາທິດນີ້ຈໍາລອງການສົ່ງຂໍ້ຄວາມ. MVP ທ້ອງຖິ່ນມີ API ສໍາລັບ AI intake ແລະ provider configuration."
};

const state = {
  lang: "en",
  tab: "dashboard",
  status: "Published",
  selectedArea: "thakhek",
  intakeAnalyzed: false,
  intakeCreated: true,
  contactUploadAnalyzed: false,
  contactUploadFileName: "",
  contactSearch: "Thakhek does not have enough pumps. Who can we contact to borrow equipment?",
  contactAnswer: "",
  crisisLevel: "crisis",
  crisisMessage: "",
  crisisDeclared: false,
  crisisAnnouncements: [],
  logs: [
    {
      channel: "SMS",
      en: "Ban Nongbok, Thakhek riverbank households",
      lo: "ຄົວເຮືອນແຄມຂອງ ບ້ານໜອງບົກ ເມືອງທ່າແຂກ",
      status: "Delivered"
    },
    {
      channel: "WhatsApp",
      en: "Village volunteer group: Ban Phonxay / Ban Sibounheuang",
      lo: "ກຸ່ມອາສາບ້ານ: ບ້ານໂພນໄຊ / ບ້ານສີບຸນເຮືອງ",
      status: "Delivered"
    },
    {
      channel: "WhatsApp",
      en: "DMH/PDRRMC external test recipient ****2825",
      lo: "ຜູ້ຮັບທົດສອບ DMH/PDRRMC ****2825",
      status: "Delivered"
    },
    {
      channel: "SMS",
      en: "Bolaven coffee factory safety focal point ****0773",
      lo: "ຜູ້ປະສານຄວາມປອດໄພໂຮງງານກາເຟບໍລະເວນ ****0773",
      status: "Failed"
    }
  ],
  acknowledgments: [
    ["Khamla Phengsavanh - Ban Nongbok Nai", "Village loudspeaker + temple speaker", "Acknowledged"],
    ["Maly Chanthavong - Ban Sibounheuang", "Door-to-door elder check", "Pending"],
    ["Thakhek Rescue Boat Team - Mekong landing", "WhatsApp group + boat dispatch", "Acknowledged"],
    ["Noy Sihavong - Ban Phonxay School", "Teacher phone tree", "Disseminated"]
  ],
  contactRecords: [
    {
      name: "Thakhek Rescue Unit",
      kind: "Rescue team",
      area: "Ban Nongbok / Thakhek",
      province: "Khammouane",
      capability: "Flat-bottom boats, ropes, first aid, night evacuation from Mekong riverbank villages",
      phone: "+85620 **** 0451",
      priority: "High"
    },
    {
      name: "Mahaxay District Clinic",
      kind: "Hospital / clinic",
      area: "Mahaxay / Route 12 referral",
      province: "Khammouane",
      capability: "Triage, elder patients, children, pregnancy cases, patient transfer coordination",
      phone: "+85620 **** 1182",
      priority: "High"
    },
    {
      name: "Savannakhet Provincial Shelter Desk",
      kind: "Shelter",
      area: "Kaysone Phomvihane",
      province: "Savannakhet",
      capability: "Temporary shelter in school gyms, food distribution, family registration",
      phone: "+85620 **** 5520",
      priority: "Medium"
    },
    {
      name: "Lao Red Cross Regional Coordinator",
      kind: "Relief partner",
      area: "Vientiane",
      province: "Vientiane Capital",
      capability: "Relief supplies, blankets, family kits",
      phone: "+85620 **** 7004",
      priority: "Medium"
    },
    {
      name: "Bolikhamxay Equipment Pool",
      kind: "Equipment owner",
      area: "Paksan",
      province: "Bolikhamxay",
      capability: "Borrow pumps, generators, portable lighting, fuel cans for neighboring provinces",
      phone: "+85620 **** 8840",
      priority: "High"
    }
  ]
};

const disasterAreas = [
  {
    id: "thakhek",
    name: "Thakhek riverbank zone",
    nameLo: "ເຂດແຄມຂອງ ເມືອງທ່າແຂກ",
    province: "Khammouane",
    provinceLo: "ຄໍາມ່ວນ",
    laoName: "ເຂດແຄມຂອງ ເມືອງທ່າແຂກ",
    hazard: "Flood",
    hazardLo: "ນໍ້າຖ້ວມ",
    probability: 78,
    population: "18,400",
    populationLo: "18,400 ຄົນ",
    floodStart: "Day 2, Friday night",
    floodStartLo: "ມື້ທີ 2, ຄືນວັນສຸກ",
    vulnerable: ["Elders in Ban Nongbok", "Children at Ban Phonxay School", "Thakhek District Hospital patients", "Riverbank households", "Pregnant women and people with disabilities"],
    vulnerableLo: ["ຜູ້ສູງອາຍຸບ້ານໜອງບົກ", "ເດັກນ້ອຍໂຮງຮຽນບ້ານໂພນໄຊ", "ຄົນເຈັບໂຮງໝໍເມືອງທ່າແຂກ", "ຄົວເຮືອນແຄມຂອງ", "ແມ່ຍິງຖືພາ ແລະ ຄົນພິການ"],
    businesses: [
      ["Mekong Logistics Cold Storage - Ban Thakhek Tai", "Food warehouse", "Backup power, refrigerated medicine/food stock, and road access risk"],
      ["Thakhek Rice Mill Cooperative", "Factory", "Workers, rice stock, and grain dryers need early notice"],
      ["Ban Nongbok Morning Market", "Market", "High foot traffic, elders, vendors, and drainage risk"],
      ["Khammouane Garment Workshop", "Factory", "Shift workers may need transport before night flooding"]
    ],
    businessesLo: [
      ["ຄັງເຢັນໂລຈິສຕິກແມ່ນໍ້າຂອງ - ບ້ານທ່າແຂກໃຕ້", "ຄັງອາຫານ", "ສ່ຽງໄຟສໍາຮອງ, ຢາ/ອາຫານແຊ່ເຢັນ ແລະ ເສັ້ນທາງເຂົ້າເຖິງ"],
      ["ສະຫະກອນໂຮງສີເຂົ້າທ່າແຂກ", "ໂຮງງານ", "ຄົນງານ, ສາງເຂົ້າ ແລະ ເຄື່ອງອົບເມັດເຂົ້າຕ້ອງໄດ້ຮັບແຈ້ງໄວ"],
      ["ຕະຫຼາດເຊົ້າບ້ານໜອງບົກ", "ຕະຫຼາດ", "ຄົນຫຼາຍ, ຜູ້ສູງອາຍຸ, ແມ່ຄ້າ ແລະ ຄວາມສ່ຽງລະບາຍນໍ້າ"],
      ["ໂຮງງານຕັດຫຍິບຄໍາມ່ວນ", "ໂຮງງານ", "ຄົນງານກະກາງຄືນອາດຕ້ອງການລົດຮັບສົ່ງກ່ອນນໍ້າຖ້ວມ"]
    ]
  },
  {
    id: "namkhan",
    name: "Nam Khan upstream villages",
    nameLo: "ບ້ານແຄມນໍ້າຄານຕອນເທິງ",
    province: "Luang Prabang",
    provinceLo: "ຫຼວງພະບາງ",
    laoName: "ບ້ານແຄມນ້ຳຄານ ແຂວງຫຼວງພະບາງ",
    hazard: "Flash flood / landslide",
    hazardLo: "ນໍ້າປ່າ / ດິນເຈື່ອນ",
    probability: 54,
    population: "7,200",
    populationLo: "7,200 ຄົນ",
    floodStart: "Day 3, Saturday morning",
    floodStartLo: "ມື້ທີ 3, ເຊົ້າວັນເສົາ",
    vulnerable: ["Mountain schools", "Bridge users near Pak Ou", "Guesthouses and boat operators", "Village health posts"],
    vulnerableLo: ["ໂຮງຮຽນເຂດພູດອຍ", "ຜູ້ໃຊ້ຂົວໃກ້ປາກອູ", "ເຮືອນພັກ ແລະ ຜູ້ຂັບເຮືອ", "ສຸກສາລາບ້ານ"],
    businesses: [
      ["Nam Khan Eco Lodge", "Tourism business", "Guest evacuation and river activity closure"],
      ["Luang Prabang Road Contractor Yard", "Equipment depot", "Excavators and trucks may support debris clearance"],
      ["Ban Pak Ou Boat Cooperative", "Transport", "River crossing suspension decision point"]
    ],
    businessesLo: [
      ["ນໍ້າຄານ ອີໂກລອດ", "ທຸລະກິດທ່ອງທ່ຽວ", "ອົບພະຍົບແຂກ ແລະ ປິດກິດຈະກໍາແຄມນໍ້າ"],
      ["ລານຜູ້ຮັບເໝົາທາງຫຼວງພະບາງ", "ຄັງອຸປະກອນ", "ລົດຂຸດ ແລະ ລົດບັນທຸກຊ່ວຍເກັບເສດດິນຫີນ"],
      ["ສະຫະກອນເຮືອບ້ານປາກອູ", "ຂົນສົ່ງ", "ຈຸດຕັດສິນໃຈຢຸດຂ້າມນໍ້າ"]
    ]
  },
  {
    id: "bolaven",
    name: "Bolaven highland storm cell",
    nameLo: "ເຂດພາຍຸພູພຽງບໍລະເວນ",
    province: "Champasak / Sekong",
    provinceLo: "ຈໍາປາສັກ / ເຊກອງ",
    laoName: "ເຂດພູພຽງບໍລະເວນ",
    hazard: "Hail / severe storm",
    hazardLo: "ໝາກເຫັບ / ພາຍຸແຮງ",
    probability: 18,
    population: "4,900",
    populationLo: "4,900 ຄົນ",
    floodStart: "Day 1, this evening",
    floodStartLo: "ມື້ທີ 1, ແລງນີ້",
    vulnerable: ["Coffee farm workers", "Temporary shelters", "Outdoor market stalls", "Roof-fragile homes"],
    vulnerableLo: ["ຄົນງານສວນກາເຟ", "ສູນພັກພິງຊົ່ວຄາວ", "ຮ້ານຕະຫຼາດກາງແຈ້ງ", "ເຮືອນຫຼັງຄາບໍ່ແຂງແຮງ"],
    businesses: [
      ["Bolaven Coffee Processing Plant", "Factory", "Roof, drying yard, and worker safety risk"],
      ["Pakse Fresh Produce Depot", "Food logistics", "Cold-chain backup and transport delay"],
      ["Sekong Quarry Cooperative", "Industrial site", "Heavy equipment can support road clearance"]
    ],
    businessesLo: [
      ["ໂຮງງານແປຮູບກາເຟບໍລະເວນ", "ໂຮງງານ", "ຄວາມສ່ຽງຫຼັງຄາ, ລານຕາກ ແລະ ຄວາມປອດໄພຄົນງານ"],
      ["ສາງຜັກສົດປາກເຊ", "ໂລຈິສຕິກອາຫານ", "ສໍາຮອງຫ່ວງໂຊ່ເຢັນ ແລະ ຄວາມລ່າຊ້າຂົນສົ່ງ"],
      ["ສະຫະກອນບໍ່ຫີນເຊກອງ", "ເຂດອຸດສາຫະກໍາ", "ເຄື່ອງຈັກໜັກຊ່ວຍເປີດເສັ້ນທາງໄດ້"]
    ]
  }
];

const forecasts = [
  {
    station: "Thakhek Mekong gauge",
    stationLo: "ສະຖານີວັດນໍ້າຂອງ ທ່າແຂກ",
    province: "Khammouane",
    provinceLo: "ຄໍາມ່ວນ",
    waterLevel: "7.8 m",
    trend: "+0.6 m / 24h",
    trendLo: "+0.6 ແມັດ / 24 ຊົ່ວໂມງ",
    rainfall: "112 mm",
    probability: 78,
    hazard: "Flood",
    hazardLo: "ນໍ້າຖ້ວມ",
    severity: "High",
    severityLo: "ສູງ",
    start: "Day 2, Friday night",
    startLo: "ມື້ທີ 2, ຄືນວັນສຸກ",
    action: "Prepare evacuation for elders, children, schools, clinics, and riverbank homes.",
    actionLo: "ກຽມອົບພະຍົບຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ໂຮງຮຽນ, ສຸກສາລາ ແລະ ເຮືອນແຄມຂອງ."
  },
  {
    station: "Nam Khan upstream",
    stationLo: "ນໍ້າຄານຕອນເທິງ",
    province: "Luang Prabang",
    provinceLo: "ຫຼວງພະບາງ",
    waterLevel: "5.9 m",
    trend: "+0.3 m / 24h",
    trendLo: "+0.3 ແມັດ / 24 ຊົ່ວໂມງ",
    rainfall: "86 mm",
    probability: 54,
    hazard: "Flash flood / landslide",
    hazardLo: "ນໍ້າປ່າ / ດິນເຈື່ອນ",
    severity: "Watch",
    severityLo: "ເຝົ້າລະວັງ",
    start: "Day 3, Saturday morning",
    startLo: "ມື້ທີ 3, ເຊົ້າວັນເສົາ",
    action: "Monitor mountain roads, bridges, and school transport routes.",
    actionLo: "ຕິດຕາມເສັ້ນທາງພູດອຍ, ຂົວ ແລະ ເສັ້ນທາງຮັບສົ່ງນັກຮຽນ."
  },
  {
    station: "Bolaven highland cell",
    stationLo: "ກຸ່ມພາຍຸພູພຽງບໍລະເວນ",
    province: "Champasak / Sekong",
    provinceLo: "ຈໍາປາສັກ / ເຊກອງ",
    waterLevel: "N/A",
    trend: "Storm cell forming",
    trendLo: "ກໍາລັງເກີດກຸ່ມພາຍຸ",
    rainfall: "64 mm",
    probability: 18,
    hazard: "Hail / severe storm",
    hazardLo: "ໝາກເຫັບ / ພາຍຸແຮງ",
    severity: "Low",
    severityLo: "ຕໍ່າ",
    start: "Day 1, this evening",
    startLo: "ມື້ທີ 1, ແລງນີ້",
    action: "Secure roofs, markets, and temporary shelters; watch for lightning and hail.",
    actionLo: "ຍຶດຫຼັງຄາ, ຕະຫຼາດ ແລະ ສູນພັກພິງຊົ່ວຄາວ; ເຝົ້າລະວັງຟ້າຜ່າ ແລະ ໝາກເຫັບ."
  }
];

const pages = ["dashboard", "alerts", "map", "volunteers", "contacts", "reports", "settings"];

function t(key) {
  return (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
}

function l(en, lo) {
  return state.lang === "lo" && lo ? lo : en;
}

function localizedArea(item) {
  return {
    ...item,
    name: l(item.name, item.nameLo || item.laoName),
    province: l(item.province, item.provinceLo),
    hazard: l(item.hazard, item.hazardLo),
    population: l(item.population, item.populationLo),
    floodStart: l(item.floodStart, item.floodStartLo),
    vulnerable: l(item.vulnerable, item.vulnerableLo),
    businesses: l(item.businesses, item.businessesLo)
  };
}

function localizedForecast(item) {
  return {
    ...item,
    station: l(item.station, item.stationLo),
    province: l(item.province, item.provinceLo),
    trend: l(item.trend, item.trendLo),
    hazard: l(item.hazard, item.hazardLo),
    severity: l(item.severity, item.severityLo),
    start: l(item.start, item.startLo),
    action: l(item.action, item.actionLo)
  };
}

function render() {
  document.documentElement.lang = state.lang === "lo" ? "lo" : "en";
  document.getElementById("app").innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="mark">AI</div>
          <div><h1>${t("app")}</h1><p>${t("context")}</p></div>
        </div>
        <nav class="nav">${pages.map((p) => `<button class="${state.tab === p ? "active" : ""}" data-tab="${p}">${t(p)}</button>`).join("")}</nav>
      </aside>
      <main class="main">
        <div class="topbar">
          <div><p class="eyebrow">${t("subtitle")}</p><h2>${pageTitle()}</h2></div>
          <div class="controls">
            <div class="segmented"><button data-lang="en" class="${state.lang === "en" ? "active" : ""}">EN</button><button data-lang="lo" class="${state.lang === "lo" ? "active" : ""}">LO ລາວ</button></div>
            <div class="rolebox"><select><option>DMH Vientiane Duty Officer</option><option>Khammouane PDRRMC Response Desk</option><option>Lao Red Cross Coordinator</option><option>Village Volunteer</option></select></div>
          </div>
        </div>
        ${page()}
        <p class="footer-note">${t("note")}</p>
      </main>
    </div>`;
  bind();
}

function pageTitle() {
  if (state.tab === "dashboard") return t("title");
  return t(state.tab);
}

function page() {
  if (state.tab === "alerts") return alertsPage();
  if (state.tab === "map") return mapPage();
  if (state.tab === "volunteers") return volunteersPage();
  if (state.tab === "contacts") return contactsPage();
  if (state.tab === "reports") return reportsPage();
  if (state.tab === "settings") return settingsPage();
  return dashboardPage();
}

function dashboardPage() {
  const alerts = activeAlertRows();
  return `
    <section class="grid metrics">
      ${metric(t("active"), "18", l("Flood, storm, and rainfall watch zones", "ເຂດເຝົ້າລະວັງນໍ້າຖ້ວມ, ພາຍຸ ແລະ ຝົນໜັກ"))}
      ${metric(t("waterForecast"), "7.8 m", l("Thakhek gauge, rising +0.6 m / 24h", "ສະຖານີທ່າແຂກ ເພີ່ມ +0.6 ແມັດ / 24 ຊົ່ວໂມງ"))}
      ${metric(t("floodProbability"), "78%", l("High flood risk in Khammouane", "ຄວາມສ່ຽງນໍ້າຖ້ວມສູງໃນແຂວງຄໍາມ່ວນ"))}
      ${metric(t("floodStart"), l("Day 2", "ມື້ທີ 2"), l("Friday night if heavy rain continues", "ຄືນວັນສຸກ ຖ້າຝົນໜັກຍັງຕໍ່ເນື່ອງ"))}
    </section>
    <section class="grid forecast-grid" style="margin-top:18px">
      ${forecasts.map(forecastCard).join("")}
    </section>
    <section class="grid two" style="margin-top:18px">
      ${mapBlock(true)}
      <div class="panel">
        ${officerAnnouncementPanel()}
      </div>
    </section>
    <section class="grid two" style="margin-top:18px">
      <div class="panel">
        <h3 class="section-title">${t("active")}</h3>
        <div class="alert-list">${alerts.map((item) => alertRow(item.location, item.hazard, item.severity, item.tone)).join("")}</div>
      </div>
      <div class="panel">
        <h3 class="section-title" style="margin-top:20px">${t("delivered")}</h3>
        <div class="log-list">${state.logs.map(logRow).join("")}</div>
      </div>
    </section>`;
}

function officerAnnouncementPanel() {
  const area = localizedArea(selectedDisasterArea());
  const draft = state.crisisMessage || crisisDraft(selectedDisasterArea());
  const latest = state.crisisAnnouncements[0];
  return `
    <div class="officer-panel">
      <p class="eyebrow">${t("meteorologyOfficer")}</p>
      <h3 class="section-title">${area.name}</h3>
      <div class="badge-row">
        <span class="pill ${area.probability >= 70 ? "red" : area.probability >= 40 ? "amber" : "cyan"}">${area.probability}% ${l("risk", "ສ່ຽງ")}</span>
        <span class="pill blue">${area.hazard}</span>
      </div>
      <div class="area-summary compact">
        <div><span>${t("province")}</span><strong>${area.province}</strong></div>
        <div><span>${t("expectedStart")}</span><strong>${area.floodStart}</strong></div>
      </div>
      <label>${t("announcementLevel")}
        <select data-crisis-level>
          ${crisisOption("watch")}
          ${crisisOption("crisis")}
          ${crisisOption("disaster")}
        </select>
      </label>
      <label class="wide">${t("announcementMessage")}<textarea data-crisis-message>${escapeHtml(draft)}</textarea></label>
      <div class="actions"><button class="primary" data-crisis-announce>${t("setAnnouncement")}</button></div>
      <div class="announcement-preview ${state.crisisDeclared ? "live" : ""}">
        <b>${t("currentAnnouncement")}</b>
        ${state.crisisDeclared && latest ? `<p>${escapeHtml(latest.message)}</p><span>${crisisLevelLabel(latest.level)} - ${localizedArea(disasterAreas.find((item) => item.id === latest.area) || selectedDisasterArea()).name}</span>` : `<p>${t("noAnnouncement")}</p>`}
      </div>
    </div>`;
}

function activeAlertRows() {
  const declared = state.crisisAnnouncements.map((item) => {
    const area = localizedArea(disasterAreas.find((candidate) => candidate.id === item.area) || selectedDisasterArea());
    return {
      location: `${crisisLevelLabel(item.level)} - ${area.name}`,
      hazard: area.hazard,
      severity: t("publishedNow"),
      tone: crisisTone(item.level)
    };
  });
  const base = state.lang === "lo"
    ? [
        { location: "ການເຝົ້າລະວັງນໍ້າຖ້ວມຫຼາຍແຂວງຈາກ test.txt", hazard: "ນໍ້າຖ້ວມ", severity: "AI ສ້າງຮ່າງ", tone: "amber" },
        { location: "ບ້ານໜອງບົກ ແລະ ຊຸມຊົນແຄມຂອງ", hazard: "ນໍ້າຖ້ວມ", severity: "ປະກາດແລ້ວ", tone: "red" },
        { location: "ເຂດລະບາຍນໍ້າໃນເມືອງໄກສອນ", hazard: "ຝົນໜັກ", severity: "ເຝົ້າລະວັງ", tone: "amber" }
      ]
    : [
        { location: "Multi-province flood watch from test.txt", hazard: "Flood", severity: "AI Generated", tone: "amber" },
        { location: "Ban Nongbok and Mekong riverbank villages", hazard: "Flood", severity: "Published", tone: "red" },
        { location: "Kaysone urban drainage zones", hazard: "Heavy rainfall", severity: "Watch", tone: "amber" }
      ];
  return declared.concat(base);
}

function crisisOption(level) {
  return `<option value="${level}" ${state.crisisLevel === level ? "selected" : ""}>${crisisLevelLabel(level)}</option>`;
}

function crisisLevelLabel(level) {
  if (level === "disaster") return t("disasterNow");
  if (level === "watch") return t("watchNow");
  return t("crisisNow");
}

function crisisTone(level) {
  if (level === "watch") return "amber";
  return "red";
}

function crisisDraft(item) {
  const area = localizedArea(item);
  if (state.lang === "lo") {
    return `ປະກາດ${crisisLevelLabel(state.crisisLevel)} ສໍາລັບ${area.name}: ຄວາມສ່ຽງ${area.hazard} ${area.probability}%. ໃຫ້ແຈ້ງບ້ານ, ໂຮງຮຽນ, ໂຮງໝໍ, ອາສາສະໝັກ ແລະ ໂຮງງານໃນພື້ນທີ່ທັນທີ.`;
  }
  return `${crisisLevelLabel(state.crisisLevel)} for ${area.name}: ${area.hazard} risk is ${area.probability}%. Notify villages, schools, clinics, volunteers, and businesses in the area immediately.`;
}

function declareCrisis() {
  const area = selectedDisasterArea();
  const levelInput = document.querySelector("[data-crisis-level]");
  const messageInput = document.querySelector("[data-crisis-message]");
  const level = levelInput ? levelInput.value : state.crisisLevel;
  const message = messageInput && messageInput.value.trim() ? messageInput.value.trim() : crisisDraft(area);
  state.crisisLevel = level;
  state.crisisMessage = message;
  state.crisisDeclared = true;
  state.status = "Published";
  state.crisisAnnouncements.unshift({
    area: area.id,
    level,
    message
  });
  const display = localizedArea(area);
  state.logs.unshift({
    channel: "WhatsApp/SMS",
    en: `Meteorology officer announcement sent for ${area.name}`,
    lo: `ເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມສົ່ງປະກາດສໍາລັບ${display.name}`,
    status: "Delivered"
  });
  render();
}

function alertsPage() {
  return `
    <section class="grid two">
      ${aiIntakePanel()}
      ${alertReviewPanel()}
    </section>
    <section class="grid two" style="margin-top:18px">
      <div class="panel">
        <h3 class="section-title">${t("create")}</h3>
        <div class="grid form">
          <label>Hazard<select><option>Flood</option><option>Storm</option><option>Heavy rainfall</option></select></label>
          <label>Severity<select><option>Watch</option><option>Warning</option><option>Emergency</option></select></label>
          <label>Province<input value="Khammouane" /></label>
          <label>District<input value="Thakhek" /></label>
          <label>Village / cluster<input value="Ban Nongbok Nai, Ban Phonxay, Ban Sibounheuang" /></label>
          <label>Local focal point<input value="Khammouane PDRRMC + Thakhek Rescue Unit" /></label>
          <label class="wide">Location<input value="Mekong riverbank households near Thakhek morning market and ferry landing" /></label>
          <label class="wide">Recommended action<textarea>Move elders, children, school groups, clinic patients, rice stock, and factory shift workers to the temple and upper school compound. Avoid the ferry landing, Route 13 low section, and flooded market roads.</textarea></label>
        </div>
        <div class="actions">
          <button class="primary" data-status="AI Generated">${t("generate")}</button>
          <button class="secondary" data-status="Under Review">${t("review")}</button>
          <button class="secondary" data-status="Approved">${t("approve")}</button>
          <button class="primary" data-status="Published">${t("publish")}</button>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Notification logs</h3>
        <div class="log-list">${state.logs.map(logRow).join("")}</div>
        <button class="primary" data-simulate>${t("simulate")}</button>
      </div>
    </section>`;
}

function aiIntakePanel() {
  return `<div class="panel ai-panel">
    <p class="eyebrow">OpenAI assisted intake</p>
    <h3 class="section-title">${t("aiIntake")}</h3>
    <p class="muted">${t("intakeSubtitle")}</p>
    <div class="source-grid">
      ${sourceCard("Gmail", "flood-monitoring@village.la", "OAuth-ready polling")}
      ${sourceCard("WhatsApp Business", "Webhook + attachments", "Cloud API-ready")}
      ${sourceCard("Upload / OCR", "test.txt, images, PDF", "Vision/OCR-ready")}
    </div>
    <label class="wide">Incoming report<textarea>TEST-LAO-2026-001: Ban Nongbok Nai volunteers report Mekong water rising near Thakhek morning market, ferry landing, rice mill, and Ban Phonxay School. Elders, children, clinic patients, and garment workshop night-shift workers may need transport before Friday night.</textarea></label>
    <label class="wide">Reviewer routing notes<textarea>Prioritize Ban Nongbok Nai elders, Ban Phonxay School, Thakhek District Hospital referral desk, rice mill workers, garment workshop transport, rescue boats, temple shelter team, and village loudspeaker volunteers.</textarea></label>
    <div class="actions">
      <button class="primary" data-analyze>${t("analyzeIntake")}</button>
      <button class="secondary" data-create-intake>${t("createDraft")}</button>
    </div>
  </div>`;
}

function alertReviewPanel() {
  const confidence = state.intakeAnalyzed ? "OpenAI - 90%" : "Ready";
  const draftLabel = state.intakeCreated ? "AI draft created" : "Awaiting draft";
  return `<div class="panel">
    <h3 class="section-title">${t("status")}: <span class="pill ${state.status === "Published" ? "red" : "blue"}">${state.status}</span></h3>
    <div class="badge-row"><span class="pill blue">${confidence}</span><span class="pill green">${draftLabel}</span></div>
    <div class="insight-list">
      ${insight(t("evidence"), "Reports from Ban Nongbok Nai and Thakhek market indicate rising Mekong water, ferry landing risk, and possible access loss near rice mill and school routes.")}
      ${insight(t("targetAudience"), "Ban Nongbok elders, Ban Phonxay School, Thakhek District Hospital patients, garment workers, rice mill staff, boat teams, temple shelter volunteers.")}
      ${insight("Suggested channels", "SMS, WhatsApp, in-app alert, village loudspeaker, temple speaker, Lao radio message.")}
      ${insight("Quality flags", state.intakeAnalyzed ? "Test document; reviewer should verify affected villages and timing before publishing." : "Run AI intake to populate evidence and routing.")}
    </div>
    <p><b>English message:</b> Flood watch for Ban Nongbok Nai, Ban Phonxay, and nearby Thakhek riverbank villages. Move elders, children, patients, and night-shift workers to higher ground before Friday night.</p>
    <p><b>Lao message:</b> ແຈ້ງເຕືອນນໍ້າຖ້ວມ ບ້ານໜອງບົກໃນ, ບ້ານໂພນໄຊ ແລະ ຊຸມຊົນແຄມຂອງ ເມືອງທ່າແຂກ. ໃຫ້ຍ້າຍຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ຄົນເຈັບ ແລະ ຄົນງານກະກາງຄືນໄປບ່ອນສູງກ່ອນຄືນວັນສຸກ.</p>
    <p class="muted">Reviewer can change channels and audience routing before approval.</p>
    <div class="actions">
      <button class="secondary" data-status="Under Review">${t("review")}</button>
      <button class="secondary" data-status="Approved">${t("approve")}</button>
      <button class="primary" data-status="Published">${t("publish")}</button>
    </div>
  </div>`;
}

function mapPage() {
  const area = localizedArea(selectedDisasterArea());
  return `<section class="grid two">
    <div>
      ${mapBlock(true)}
      <div class="area-selector">${disasterAreas.map((item) => {
        const display = localizedArea(item);
        return `<button class="${state.selectedArea === item.id ? "active" : ""}" data-area="${item.id}">${display.name}</button>`;
      }).join("")}</div>
    </div>
    <div class="panel">
      <p class="eyebrow">${t("selectedDisasterArea")}</p>
      <h3 class="section-title">${area.name}</h3>
      <div class="badge-row"><span class="pill red">${area.hazard}</span><span class="pill ${area.probability >= 70 ? "red" : area.probability >= 40 ? "amber" : "cyan"}">${area.probability}% risk</span></div>
      <div class="area-summary">
        <div><span>${t("province")}</span><strong>${area.province}</strong></div>
        <div><span>${t("affectedPeople")}</span><strong>${area.population}</strong></div>
        <div><span>${t("expectedStart")}</span><strong>${area.floodStart}</strong></div>
      </div>
      <h3 class="section-title">${t("peopleFirst")}</h3>
      <div class="priority-list">${area.vulnerable.map((item) => `<span>${item}</span>`).join("")}</div>
      <h3 class="section-title" style="margin-top:18px">${t("businessesInArea")}</h3>
      <div class="business-list">${area.businesses.map((item) => businessRow(item)).join("")}</div>
    </div>
  </section>
  <section class="panel" style="margin-top:18px">
    <h3 class="section-title">${l("Human priority workflow", "ລໍາດັບການຊ່ວຍເຫຼືອມະນຸດ")}</h3>
    <div class="timeline">${l(["Elders mobilize first", "Children and schools", "Clinics and caregivers", "Factories and worker transport", "Volunteer confirmation"], ["ຜູ້ສູງອາຍຸກ່ອນ", "ເດັກນ້ອຍ ແລະ ໂຮງຮຽນ", "ສຸກສາລາ ແລະ ຜູ້ດູແລ", "ໂຮງງານ ແລະ ລົດຮັບສົ່ງຄົນງານ", "ຢືນຢັນຈາກອາສາ"]).map((s, i) => `<div class="step"><b>0${i + 1}</b>${s}</div>`).join("")}</div>
  </section>`;
}

function volunteersPage() {
  return `<section class="grid two">
    <div class="panel">
      <p class="eyebrow">Village network</p>
      <h3 class="section-title">${t("ack")}</h3>
      <div class="ack-list">${state.acknowledgments.map(ackRow).join("")}</div>
      <div class="actions"><button class="primary" data-ack>Acknowledge Ban Nongbok loudspeaker</button><button class="secondary" data-tab="reports">Open reports</button></div>
    </div>
    <div class="panel">
      <p class="eyebrow">Localized volunteer roles</p>
      <h3 class="section-title">Who carries the message</h3>
      <div class="volunteer-grid">
        ${volunteerCard("Ban Nongbok Nai loudspeaker lead", "Khamla Phengsavanh", "Lao", "Temple speaker, village loudspeaker, elder household check")}
        ${volunteerCard("Ban Phonxay School focal point", "Noy Sihavong", "Lao / basic English", "Teacher phone tree, child pickup list, classroom headcount")}
        ${volunteerCard("Mekong landing boat coordinator", "Thakhek Rescue Boat Team", "Lao", "Boat dispatch, life jackets, ferry landing closure")}
        ${volunteerCard("Garment workshop worker liaison", "Maly Chanthavong", "Lao / Vietnamese", "Night-shift transport, factory WhatsApp group")}
      </div>
    </div>
  </section>`;
}

function contactsPage() {
  return `<section class="grid two">
    <div class="panel ai-panel">
      <p class="eyebrow">AI contact intake</p>
      <h3 class="section-title">Upload Lao contact source</h3>
      <p class="muted">Upload a village handwritten list, phone screenshot, Excel school roster, Word/PDF clinic list, or text file. The production backend would use OpenAI vision/OCR plus structured extraction to classify Lao contacts and save them by province, district, village, role, language, and equipment.</p>
      <label class="upload-box">
        <input type="file" data-contact-file accept="image/*,.pdf,.txt,.csv,.xlsx,.xls,.doc,.docx" />
        <span>${state.contactUploadFileName || "Choose file: handwritten Ban Nongbok contact sheet, school roster, clinic list"}</span>
      </label>
      <div class="actions">
        <button class="primary" data-contact-analyze>AI detect and record contacts</button>
      </div>
      ${state.contactUploadAnalyzed ? contactExtractionPanel() : `<div class="empty-panel">Waiting for file analysis.</div>`}
    </div>
    <div class="panel chat-panel">
      <p class="eyebrow">Contact search assistant</p>
      <h3 class="section-title">Ask who to contact in Laos</h3>
      <label class="wide">Question<input data-contact-search value="${escapeHtml(state.contactSearch)}" placeholder="Example: Thakhek has no pumps. Which nearby district can lend equipment?" /></label>
      <div class="actions"><button class="primary" data-contact-ask>Search contacts</button></div>
      <div class="chat-answer">${state.contactAnswer || defaultContactAnswer()}</div>
    </div>
  </section>
  <section class="panel" style="margin-top:18px">
    <h3 class="section-title">Contact records</h3>
    <p class="muted">Contacts are grouped by type so reviewers can quickly route alerts, borrow equipment, or mobilize facilities.</p>
    <div class="contact-grid">${state.contactRecords.map(contactCard).join("")}</div>
  </section>`;
}

function reportsPage() {
  return `<section class="grid impact">${["Alert delivery report", "Failed SMS/WhatsApp report", "Response activity report"].map((h, i) => `<div class="card"><h3>${h}</h3><strong style="font-size:34px">${i === 1 ? 1 : i === 0 ? state.logs.length : state.acknowledgments.length}</strong><p class="muted">${i === 1 ? "Bolaven signal outage appears for follow-up." : "Audit-ready operational record."}</p></div>`).join("")}</section>`;
}

function settingsPage() {
  return `<section class="panel"><h3 class="section-title">Role permissions and configuration</h3><p><b>Allowed:</b> create alert, AI intake, draft with OpenAI, review, approve, publish, view delivery, manage volunteers, acknowledge alert, view reports.</p><p><b>Provider readiness:</b> OpenAI key, Gmail OAuth, WhatsApp Business token, phone number ID, SMS gateway key, and PostgreSQL/PostGIS are required for production.</p><p><b>Database mode:</b> public hosted demo shell. The local MVP supports memory-demo and postgres-postgis modes.</p></section>`;
}

function metric(label, value, detail) {
  return `<div class="card metric"><span>${label}</span><strong>${value}</strong><p class="muted">${detail}</p></div>`;
}

function mapBlock(interactive = false) {
  const pin = (id, label, style, tone = "") => interactive
    ? `<button class="pin ${state.selectedArea === id ? "selected" : ""}" data-area="${id}" style="${style}" aria-label="${escapeHtml(label)}"><span>${label}</span></button>`
    : `<div class="pin ${tone}" style="${style}"><span>${label}</span></div>`;
  const labels = {
    title: l("Laos operational forecast map", "ແຜນທີ່ພະຍາກອນປະຕິບັດການ ສປປ ລາວ"),
    luangPrabang: l("Luang Prabang", "ຫຼວງພະບາງ"),
    namKhan: l("Nam Khan", "ນໍ້າຄານ"),
    vientiane: l("Vientiane", "ວຽງຈັນ"),
    khammouane: l("Khammouane", "ຄໍາມ່ວນ"),
    thakhek: l("Thakhek", "ທ່າແຂກ"),
    savannakhet: l("Savannakhet", "ສະຫວັນນະເຂດ"),
    bolaven: l("Bolaven Plateau", "ພູພຽງບໍລະເວນ"),
    thakhekPin: l("Thakhek flood risk 78%", "ທ່າແຂກ ສ່ຽງນໍ້າຖ້ວມ 78%"),
    namKhanPin: l("Nam Khan flash flood 54%", "ນໍ້າຄານ ສ່ຽງນໍ້າປ່າ 54%"),
    bolavenPin: l("Bolaven hail risk 18%", "ບໍລະເວນ ສ່ຽງໝາກເຫັບ 18%"),
    flood: l("Flood", "ນໍ້າຖ້ວມ"),
    flash: l("Flash flood", "ນໍ້າປ່າ"),
    hail: l("Hail / storm", "ໝາກເຫັບ / ພາຍຸ")
  };

  return `<div class="map">
    <div class="map-title">${labels.title}</div>
    <div class="map-river"></div>
    <div class="laos-html-map" aria-label="Laos operational map with local disaster areas">
      <div class="province-node north">${labels.luangPrabang}<br><small>${labels.namKhan}</small></div>
      <div class="province-node capital">${labels.vientiane}</div>
      <div class="province-node center">${labels.khammouane}<br><small>${labels.thakhek}</small></div>
      <div class="province-node south">${labels.savannakhet}</div>
      <div class="province-node bolaven">${labels.bolaven}</div>
    </div>
    ${pin("thakhek", labels.thakhekPin, "left:59%;top:55%")}
    ${pin("namkhan", labels.namKhanPin, "left:48%;top:33%;background:var(--amber)", "amber")}
    ${pin("bolaven", labels.bolavenPin, "left:69%;top:81%;background:var(--cyan)", "cyan")}
    <div class="map-legend"><span class="legend red"></span> ${labels.flood} <span class="legend amber"></span> ${labels.flash} <span class="legend cyan"></span> ${labels.hail}</div>
  </div>`;
}

function selectedDisasterArea() {
  return disasterAreas.find((item) => item.id === state.selectedArea) || disasterAreas[0];
}

function volunteerCard(role, name, language, method) {
  return `<div class="volunteer-card">
    <b>${role}</b>
    <span>${name}</span>
    <p>${method}</p>
    <small>Language: ${language}</small>
  </div>`;
}

function businessRow(item) {
  return `<div class="business-row"><div><b>${item[0]}</b><span>${item[1]}</span></div><p>${item[2]}</p></div>`;
}

function forecastCard(item) {
  const display = localizedForecast(item);
  const tone = display.probability >= 70 ? "red" : display.probability >= 40 ? "amber" : "cyan";
  return `<div class="forecast-card">
    <div class="forecast-head">
      <div><b>${display.station}</b><span>${display.province}</span></div>
      <span class="pill ${tone}">${display.severity}</span>
    </div>
    <div class="forecast-values">
      <div><span>${t("water")}</span><strong>${display.waterLevel}</strong><small>${display.trend}</small></div>
      <div><span>${t("rainfall")}</span><strong>${display.rainfall}</strong><small>${t("forecastFeed")}</small></div>
      <div><span>${display.hazard}</span><strong>${display.probability}%</strong><small>${display.start}</small></div>
    </div>
    <div class="risk-bar"><i style="width:${display.probability}%"></i></div>
    <p>${display.action}</p>
  </div>`;
}

function sourceCard(title, detail, status) {
  return `<div class="source-card"><b>${title}</b><p>${detail}</p><span>${status}</span></div>`;
}

function contactExtractionPanel() {
  return `<div class="extraction-panel">
    <h3 class="section-title">Detected from ${state.contactUploadFileName || "uploaded file"}</h3>
    <div class="insight-list">
      ${insight("Detected contact type", "School evacuation focal point, rescue volunteer, equipment owner")}
      ${insight("Extracted fields", "Name, role, area, phone, category, capability, priority")}
      ${insight("Saved record", "Ban Sibounheuang School Evacuation Focal Point was added to contact records.")}
    </div>
  </div>`;
}

function contactCard(item) {
  return `<div class="contact-card">
    <div class="contact-head"><b>${item.name}</b><span class="pill ${item.priority === "High" ? "red" : "blue"}">${item.kind}</span></div>
    <p>${item.capability}</p>
    <div class="contact-meta"><span>${item.area}, ${item.province}</span><span>${item.phone}</span></div>
  </div>`;
}

function defaultContactAnswer() {
  return `<p><b>Suggested:</b> Contact Bolikhamxay Equipment Pool for pumps and generators, then alert Thakhek Rescue Unit for boat transport.</p><p class="muted">Reason: the selected area is Thakhek and the contact database shows a nearby equipment owner with pump/generator capacity.</p>`;
}

function buildContactAnswer(query) {
  const text = query.toLowerCase();
  if (text.includes("pump") || text.includes("equipment") || text.includes("borrow") || text.includes("generator")) {
    return `<p><b>Best match:</b> Bolikhamxay Equipment Pool, Paksan. Capability: borrow pumps, generators, portable lighting.</p><p><b>Second call:</b> Thakhek Rescue Unit for boats and field delivery.</p><p class="muted">Route request through Khammouane PDRRMC and mark priority High because Thakhek flood probability is 78%.</p>`;
  }
  if (text.includes("hospital") || text.includes("clinic") || text.includes("patient")) {
    return `<p><b>Best match:</b> Mahaxay District Clinic for triage and patient transfer.</p><p class="muted">Also notify Lao Red Cross Regional Coordinator for family kits and shelter support.</p>`;
  }
  if (text.includes("school") || text.includes("children")) {
    return `<p><b>Best match:</b> Ban Sibounheuang School Evacuation Focal Point and Savannakhet Provincial Shelter Desk.</p><p class="muted">Use school lists for child-safe transport and reunification records.</p>`;
  }
  return defaultContactAnswer();
}

function addDetectedContact() {
  if (state.contactRecords.some((item) => item.name === "Ban Sibounheuang School Evacuation Focal Point")) return;
  state.contactRecords.unshift({
    name: "Ban Sibounheuang School Evacuation Focal Point",
    kind: "School",
    area: "Thakhek",
    province: "Khammouane",
    capability: "Handwritten note detected: 120 students, 8 teachers, parent phone tree, evacuation pickup point",
    phone: "+85620 **** 6190",
    priority: "High"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function insight(title, body) {
  return `<div class="insight"><b>${title}</b><p>${body}</p></div>`;
}

function alertRow(location, hazard, severity, tone) {
  return `<div class="alert-row"><div><b>${location}</b><br><span class="muted">${hazard}</span></div><span class="pill ${tone}">${severity}</span></div>`;
}

function logRow(item) {
  const channel = item.channel || item[0];
  const detail = l(item.en || item[1], item.lo || item[1]);
  const status = item.status || item[2];
  return `<div class="log-row"><div><b>${channel}</b><br><span class="muted">${detail}</span></div><span class="pill ${status === "Failed" ? "red" : "green"}">${statusLabel(status)}</span></div>`;
}

function ackRow(item) {
  return `<div class="ack-row"><div><b>${item[0]}</b><br><span class="muted">${item[1]}</span></div><span class="pill ${item[2] === "Pending" ? "amber" : "green"}">${statusLabel(item[2])}</span></div>`;
}

function statusLabel(status) {
  const labels = {
    Delivered: l("Delivered", "ສົ່ງແລ້ວ"),
    Failed: l("Failed", "ສົ່ງບໍ່ສໍາເລັດ"),
    Acknowledged: l("Acknowledged", "ຢືນຢັນແລ້ວ"),
    Pending: l("Pending", "ລໍຖ້າ"),
    Disseminated: l("Disseminated", "ແຈ້ງຕໍ່ແລ້ວ")
  };
  return labels[status] || status;
}

function bind() {
  document.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => { state.tab = btn.dataset.tab; render(); }));
  document.querySelectorAll("[data-lang]").forEach((btn) => btn.addEventListener("click", () => { state.lang = btn.dataset.lang; state.crisisMessage = ""; render(); }));
  document.querySelectorAll("[data-area]").forEach((btn) => btn.addEventListener("click", () => { state.selectedArea = btn.dataset.area; state.crisisMessage = ""; render(); }));
  document.querySelectorAll("[data-status]").forEach((btn) => btn.addEventListener("click", () => { state.status = btn.dataset.status; render(); }));
  document.querySelectorAll("[data-analyze]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-create-intake]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.intakeCreated = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-crisis-announce]").forEach((btn) => btn.addEventListener("click", declareCrisis));
  document.querySelectorAll("[data-crisis-level]").forEach((select) => select.addEventListener("change", () => { state.crisisLevel = select.value; state.crisisMessage = ""; render(); }));
  document.querySelectorAll("[data-crisis-message]").forEach((input) => input.addEventListener("input", () => { state.crisisMessage = input.value; }));
  document.querySelectorAll("[data-simulate]").forEach((btn) => btn.addEventListener("click", () => {
    state.logs.unshift({
      channel: "WhatsApp",
      en: "External test recipient ****2825",
      lo: "ຜູ້ຮັບທົດສອບພາຍນອກ ****2825",
      status: "Delivered"
    });
    state.tab = "dashboard";
    render();
  }));
  document.querySelectorAll("[data-ack]").forEach((btn) => btn.addEventListener("click", () => { state.acknowledgments[1][2] = "Acknowledged"; render(); }));
  document.querySelectorAll("[data-contact-file]").forEach((input) => input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    state.contactUploadFileName = file ? file.name : "";
    render();
  }));
  document.querySelectorAll("[data-contact-analyze]").forEach((btn) => btn.addEventListener("click", () => {
    state.contactUploadAnalyzed = true;
    if (!state.contactUploadFileName) state.contactUploadFileName = "handwritten-school-contact.jpg";
    addDetectedContact();
    render();
  }));
  document.querySelectorAll("[data-contact-search]").forEach((input) => input.addEventListener("input", () => {
    state.contactSearch = input.value;
  }));
  document.querySelectorAll("[data-contact-ask]").forEach((btn) => btn.addEventListener("click", () => {
    state.contactAnswer = buildContactAnswer(state.contactSearch);
    render();
  }));
}

render();
