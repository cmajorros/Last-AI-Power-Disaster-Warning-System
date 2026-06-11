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
      name: "Noy Phommachanh",
      email: "noy.met@gov.la",
      phoneLast4: "1001",
      role: "meteorological_officer",
      province: "Vientiane Capital",
      district: "Chanthabouly",
      languagePreference: "en",
      twoFactorEnabled: true
    },
    {
      id: "usr-eru-1",
      name: "Kham Sengsavang",
      email: "kham.response@gov.la",
      phoneLast4: "1002",
      role: "emergency_response",
      province: "Khammouane",
      district: "Thakhek",
      languagePreference: "en",
      twoFactorEnabled: true
    },
    {
      id: "usr-cso-1",
      name: "Maly Vongdala",
      email: "maly.cso@example.org",
      phoneLast4: "1003",
      role: "cso_coordinator",
      province: "Savannakhet",
      district: "Kaysone",
      languagePreference: "lo",
      twoFactorEnabled: false
    },
    {
      id: "usr-vol-1",
      name: "Somphone Inthavong",
      email: "somphone.vol@example.org",
      phoneLast4: "1004",
      role: "volunteer",
      province: "Khammouane",
      district: "Thakhek",
      languagePreference: "lo",
      twoFactorEnabled: false
    },
    {
      id: "usr-community-1",
      name: "Phonekeo Resident",
      email: "phonekeo.community@example.org",
      phoneLast4: "1005",
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
      location: "Thakhek river communities",
      province: "Khammouane",
      district: "Thakhek",
      lat: 17.4103,
      lng: 104.8307,
      affectedPopulation: 18400,
      predictedImpact: "Mekong tributaries may overtop low riverbank roads and isolate villages.",
      recommendedAction: "Move valuables above floor level and follow village volunteer instructions.",
      startTime: iso(-180),
      expectedDuration: "18 hours",
      language: "en",
      communicationChannels: ["SMS", "WhatsApp", "Email", "In-app"],
      messageEn: "Flood warning for Thakhek river communities. Move valuables above floor level and avoid low crossings.",
      messageLo:
        "ແຈ້ງເຕືອນນ້ຳຖ້ວມສຳລັບຊຸມຊົນແຄມນ້ຳເມືອງທ່າແຂກ. ຍ້າຍຂອງມີຄ່າໄວ້ທີ່ສູງ ແລະຫຼີກລ້ຽງທາງຂ້າມຕ່ຳ.",
      aiAssessment: {
        riskScore: 78,
        riskLevel: "Warning",
        impactSummary: "18,400 people in low riverbank communities may face road disruption.",
        routingGroups: ["Khammouane ERU", "Thakhek CSO volunteers"],
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
      location: "Kaysone Phomvihane district",
      province: "Savannakhet",
      district: "Kaysone",
      lat: 16.55,
      lng: 104.75,
      affectedPopulation: 9200,
      predictedImpact: "Saturated soils may create local flooding in markets and low road sections.",
      recommendedAction: "Prepare pumps, check drainage, and keep children away from fast runoff.",
      startTime: iso(60),
      expectedDuration: "12 hours",
      language: "en",
      communicationChannels: ["SMS", "WhatsApp", "In-app"],
      messageEn: "Heavy rainfall watch for Kaysone district. Monitor drains and prepare for local flooding.",
      messageLo:
        "ເຝົ້າລະວັງຝົນຕົກໜັກສຳລັບເມືອງໄກສອນ. ກວດຕິດຕາມທໍ່ລະບາຍນ້ຳ ແລະກຽມພ້ອມຕໍ່ນ້ຳຖ້ວມທ້ອງຖິ່ນ.",
      aiAssessment: {
        riskScore: 51,
        riskLevel: "Watch",
        impactSummary: "Urban runoff may affect market roads and schools.",
        routingGroups: ["Savannakhet CSO volunteers"],
        suggestedChannels: ["SMS", "WhatsApp", "In-app"],
        qualityFlags: ["River gauge update is older than 2 hours"],
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
      source: "Lao Met demo feed",
      hazardType: "Flood",
      rainfallLevel: 118.4,
      riverLevel: 7.8,
      location: "Thakhek Station",
      province: "Khammouane",
      district: "Thakhek",
      lat: 17.4103,
      lng: 104.8307,
      riskClassification: "Warning",
      timestamp: iso(-20)
    },
    {
      id: "HAZ-002",
      source: "Lao Met demo feed",
      hazardType: "Heavy rainfall",
      rainfallLevel: 84.7,
      riverLevel: 5.1,
      location: "Kaysone Station",
      province: "Savannakhet",
      district: "Kaysone",
      lat: 16.55,
      lng: 104.75,
      riskClassification: "Watch",
      timestamp: iso(-35)
    },
    {
      id: "HAZ-003",
      source: "Flood forecasting demo",
      hazardType: "Landslide risk",
      rainfallLevel: 132.1,
      riverLevel: 6.4,
      location: "Pakxong Uplands",
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
      name: "Somphone Inthavong",
      phoneLast4: "2001",
      whatsappEnabled: true,
      village: "Nong Bok",
      district: "Thakhek",
      province: "Khammouane",
      languagePreference: "lo",
      active: true
    },
    {
      id: "vol-002",
      name: "Viengkham Phanouvong",
      phoneLast4: "2002",
      whatsappEnabled: true,
      village: "Phone Ngam",
      district: "Kaysone",
      province: "Savannakhet",
      languagePreference: "lo",
      active: true
    },
    {
      id: "vol-003",
      name: "Latsamy Keomany",
      phoneLast4: "2003",
      whatsappEnabled: false,
      village: "Lak 35",
      district: "Pakxong",
      province: "Champasak",
      languagePreference: "lo",
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
      failedReason: "Carrier timeout"
    }
  ];

  const acknowledgments: Acknowledgment[] = [
    {
      id: "ack-001",
      alertId: "ALT-1001",
      userId: "vol-001",
      status: "Acknowledged",
      disseminationMethod: "Village loudspeaker",
      notes: "Reached riverbank households first.",
      timestamp: iso(-92)
    }
  ];

  const responseNotes: ResponseNote[] = [
    {
      id: "note-001",
      alertId: "ALT-1001",
      userId: "usr-eru-1",
      note: "Two rescue boats staged at Thakhek district office.",
      createdAt: iso(-80)
    }
  ];

  return { users, alerts, hazards, volunteers, notificationLogs, acknowledgments, responseNotes };
}
