import type {
  Acknowledgment,
  Alert,
  HazardData,
  NotificationLog,
  ResponseNote,
  User,
  Volunteer
} from "./types";

export interface DemoStore {
  users: User[];
  alerts: Alert[];
  hazards: HazardData[];
  volunteers: Volunteer[];
  notificationLogs: NotificationLog[];
  acknowledgments: Acknowledgment[];
  responseNotes: ResponseNote[];
}

const now = new Date();
const iso = (offsetMinutes = 0) => new Date(now.getTime() + offsetMinutes * 60_000).toISOString();

export function createDemoStore(): DemoStore {
  const users: User[] = [
    {
      id: "usr-met-1",
      name: "DMH Vientiane Duty Officer",
      email: "duty.dmh@monre.gov.la",
      phoneLast4: "0121",
      role: "meteorological_officer",
      province: "Vientiane Capital",
      district: "Sikhottabong",
      languagePreference: "en",
      twoFactorEnabled: true
    },
    {
      id: "usr-eru-1",
      name: "Khammouane PDRRMC Response Desk",
      email: "khammouane.ndrmc@gov.la",
      phoneLast4: "0214",
      role: "emergency_response",
      province: "Khammouane",
      district: "Thakhek",
      languagePreference: "en",
      twoFactorEnabled: true
    },
    {
      id: "usr-cso-1",
      name: "Lao Red Cross Savannakhet Coordinator",
      email: "savannakhet@redcrosslao.org",
      phoneLast4: "0316",
      role: "cso_coordinator",
      province: "Savannakhet",
      district: "Kaysone",
      languagePreference: "lo",
      twoFactorEnabled: false
    },
    {
      id: "usr-vol-1",
      name: "Ban Nongbok Village Volunteer",
      email: "nongbok.volunteer@example.la",
      phoneLast4: "0451",
      role: "volunteer",
      province: "Khammouane",
      district: "Thakhek",
      languagePreference: "lo",
      twoFactorEnabled: false
    },
    {
      id: "usr-community-1",
      name: "Ban Nongbok Household Contact",
      email: "nongbok.household@example.la",
      phoneLast4: "0887",
      role: "community_member",
      province: "Khammouane",
      district: "Thakhek",
      languagePreference: "lo",
      twoFactorEnabled: false
    }
  ];

  const alerts: Alert[] = [
    {
      id: "ALT-1001",
      hazardType: "Flood",
      severity: "Warning",
      status: "Published",
      location: "Ban Nongbok and Mekong riverbank villages",
      province: "Khammouane",
      district: "Thakhek",
      lat: 17.4103,
      lng: 104.8307,
      affectedPopulation: 18400,
      predictedImpact:
        "Rising Mekong and Xe Bang Fai tributary levels may flood riverbank houses, Wat Phabat access road, and Thakhek market routes.",
      recommendedAction:
        "Move families, rice stores, and livestock to higher ground; avoid ferry crossings; follow village loudspeaker instructions.",
      startTime: iso(-180),
      expectedDuration: "18 hours",
      language: "en",
      communicationChannels: ["SMS", "WhatsApp", "Email", "In-app"],
      messageEn:
        "Flood warning for Ban Nongbok and Mekong riverbank villages in Thakhek. Move families, rice stores, and livestock to higher ground and avoid ferry crossings.",
      messageLo:
        "ແຈ້ງເຕືອນນ້ຳຖ້ວມສຳລັບບ້ານໜອງບົກ ແລະບ້ານແຄມແມ່ນ້ຳຂອງເມືອງທ່າແຂກ. ຍ້າຍຄອບຄົວ ເຂົ້າສານ ແລະສັດລ້ຽງໄປບ່ອນສູງ ແລະຫຼີກລ້ຽງການຂ້າມເຮືອ.",
      aiAssessment: {
        riskScore: 78,
        riskLevel: "Warning",
        impactSummary: "18,400 people in low riverbank villages near Thakhek may face house flooding and road disruption.",
        routingGroups: ["Khammouane PDRRMC", "Thakhek district rescue unit", "Ban Nongbok volunteer network"],
        suggestedChannels: ["SMS", "WhatsApp", "Email", "In-app"],
        qualityFlags: [],
        translationConfidence: 0.86,
        generatedAt: iso(-160)
      },
      createdBy: "usr-met-1",
      approvedBy: "usr-met-1",
      publishedAt: iso(-120),
      updatedAt: iso(-110)
    },
    {
      id: "ALT-1002",
      hazardType: "Heavy rainfall",
      severity: "Watch",
      status: "Under Review",
      location: "Kaysone Phomvihane urban drainage zones",
      province: "Savannakhet",
      district: "Kaysone",
      lat: 16.55,
      lng: 104.75,
      affectedPopulation: 9200,
      predictedImpact:
        "Heavy rain over Houay Long drainage areas may flood market lanes, school access roads, and low sections near Road 9.",
      recommendedAction:
        "Clear drainage, prepare pumps, move school pickup points to higher ground, and keep children away from fast runoff.",
      startTime: iso(60),
      expectedDuration: "12 hours",
      language: "en",
      communicationChannels: ["SMS", "WhatsApp", "In-app"],
      messageEn:
        "Heavy rainfall watch for Kaysone Phomvihane urban drainage zones. Clear drains, prepare pumps, and avoid fast runoff near Road 9.",
      messageLo:
        "ເຝົ້າລະວັງຝົນຕົກໜັກສຳລັບເຂດລະບາຍນ້ຳໃນເມືອງໄກສອນພົມວິຫານ. ກວດທໍ່ລະບາຍນ້ຳ ກຽມເຄື່ອງສູບນ້ຳ ແລະຫຼີກລ້ຽງນ້ຳໄຫຼແຮງໃກ້ທາງເລກ 9.",
      aiAssessment: {
        riskScore: 51,
        riskLevel: "Watch",
        impactSummary: "Urban runoff may affect markets, school access routes, and low roads in Kaysone Phomvihane.",
        routingGroups: ["Savannakhet PDRRMC", "Lao Red Cross Savannakhet", "Kaysone village volunteers"],
        suggestedChannels: ["SMS", "WhatsApp", "In-app"],
        qualityFlags: ["Houay Long drainage sensor update is older than 2 hours"],
        translationConfidence: 0.82,
        generatedAt: iso(-40)
      },
      createdBy: "usr-met-1",
      approvedBy: null,
      publishedAt: null,
      updatedAt: iso(-35)
    }
  ];

  const hazards: HazardData[] = [
    {
      id: "HAZ-001",
      source: "DMH Lao PDR hydro-met feed",
      hazardType: "Flood",
      rainfallLevel: 118.4,
      riverLevel: 7.8,
      location: "DMH Thakhek Mekong gauge",
      province: "Khammouane",
      district: "Thakhek",
      lat: 17.4103,
      lng: 104.8307,
      riskClassification: "Warning",
      timestamp: iso(-20)
    },
    {
      id: "HAZ-002",
      source: "DMH Lao PDR rainfall feed",
      hazardType: "Heavy rainfall",
      rainfallLevel: 84.7,
      riverLevel: 5.1,
      location: "Savannakhet Kaysone rainfall station",
      province: "Savannakhet",
      district: "Kaysone",
      lat: 16.55,
      lng: 104.75,
      riskClassification: "Watch",
      timestamp: iso(-35)
    },
    {
      id: "HAZ-003",
      source: "Lao PDR flood forecasting demo",
      hazardType: "Landslide risk",
      rainfallLevel: 132.1,
      riverLevel: 6.4,
      location: "Bolaven Plateau Pakxong station",
      province: "Champasak",
      district: "Pakxong",
      lat: 15.18,
      lng: 106.23,
      riskClassification: "Emergency",
      timestamp: iso(-12)
    }
  ];

  const volunteers: Volunteer[] = [
    {
      id: "vol-001",
      name: "Khamla Phengsavanh",
      phoneLast4: "0451",
      whatsappEnabled: true,
      village: "Ban Nongbok",
      district: "Thakhek",
      province: "Khammouane",
      languagePreference: "lo",
      active: true
    },
    {
      id: "vol-002",
      name: "Maly Chanthavong",
      phoneLast4: "0627",
      whatsappEnabled: true,
      village: "Ban Phonsavang",
      district: "Kaysone",
      province: "Savannakhet",
      languagePreference: "lo",
      active: true
    },
    {
      id: "vol-003",
      name: "Sengmany Keodala",
      phoneLast4: "0773",
      whatsappEnabled: false,
      village: "Ban Lak 35",
      district: "Pakxong",
      province: "Champasak",
      languagePreference: "lo",
      active: true
    },
    {
      id: "vol-user-test",
      name: "External SMS/WhatsApp Test Device",
      phoneLast4: "2825",
      whatsappEnabled: true,
      village: "Cross-border test handset",
      district: "Thakhek",
      province: "Khammouane",
      languagePreference: "en",
      active: true
    }
  ];

  const notificationLogs: NotificationLog[] = [
    {
      id: "log-001",
      alertId: "ALT-1001",
      recipientId: "vol-001",
      recipientType: "volunteer",
      channel: "SMS",
      status: "Delivered",
      sentAt: iso(-105),
      deliveredAt: iso(-103),
      failedReason: null
    },
    {
      id: "log-002",
      alertId: "ALT-1001",
      recipientId: "vol-001",
      recipientType: "volunteer",
      channel: "WhatsApp",
      status: "Delivered",
      sentAt: iso(-105),
      deliveredAt: iso(-102),
      failedReason: null
    },
    {
      id: "log-003",
      alertId: "ALT-1001",
      recipientId: "usr-eru-1",
      recipientType: "official",
      channel: "Email",
      status: "Delivered",
      sentAt: iso(-104),
      deliveredAt: iso(-104),
      failedReason: null
    },
    {
      id: "log-004",
      alertId: "ALT-1001",
      recipientId: "vol-003",
      recipientType: "volunteer",
      channel: "SMS",
      status: "Failed",
      sentAt: iso(-104),
      deliveredAt: null,
      failedReason: "Mountain signal outage near Bolaven Plateau"
    }
  ];

  const acknowledgments: Acknowledgment[] = [
    {
      id: "ack-001",
      alertId: "ALT-1001",
      userId: "vol-001",
      status: "Acknowledged",
      disseminationMethod: "Village loudspeaker",
      notes: "Used Ban Nongbok loudspeaker and confirmed households closest to the Mekong bank.",
      timestamp: iso(-92)
    }
  ];

  const responseNotes: ResponseNote[] = [
    {
      id: "note-001",
      alertId: "ALT-1001",
      userId: "usr-eru-1",
      note: "Khammouane PDRRMC staged two rescue boats at Thakhek district office and alerted Ban Nongbok headman.",
      createdAt: iso(-80)
    }
  ];

  return { users, alerts, hazards, volunteers, notificationLogs, acknowledgments, responseNotes };
}
