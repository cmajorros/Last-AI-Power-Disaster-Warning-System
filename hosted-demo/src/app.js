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
  logs: [
    ["SMS", "Subscriber group: Thakhek riverbank villages", "Delivered"],
    ["WhatsApp", "Village volunteer network ****0451", "Delivered"],
    ["WhatsApp", "External test recipient ****2825", "Delivered"],
    ["SMS", "Bolaven volunteer ****0773", "Failed"]
  ],
  acknowledgments: [
    ["Khamla Phengsavanh", "Village loudspeaker", "Acknowledged"],
    ["Maly Chanthavong", "Door-to-door", "Pending"],
    ["Thakhek Rescue Boat Team", "WhatsApp group", "Acknowledged"]
  ],
  contactRecords: [
    {
      name: "Thakhek Rescue Unit",
      kind: "Rescue team",
      area: "Thakhek",
      province: "Khammouane",
      capability: "Boats, ropes, first aid, night evacuation",
      phone: "+85620 **** 0451",
      priority: "High"
    },
    {
      name: "Mahaxay District Clinic",
      kind: "Hospital / clinic",
      area: "Mahaxay",
      province: "Khammouane",
      capability: "Triage, elders, children, patient transfer",
      phone: "+85620 **** 1182",
      priority: "High"
    },
    {
      name: "Savannakhet Provincial Shelter Desk",
      kind: "Shelter",
      area: "Kaysone",
      province: "Savannakhet",
      capability: "Temporary shelter, school gyms, food distribution",
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
      capability: "Borrow pumps, generators, portable lighting",
      phone: "+85620 **** 8840",
      priority: "High"
    }
  ]
};

const disasterAreas = [
  {
    id: "thakhek",
    name: "Thakhek riverbank zone",
    province: "Khammouane",
    hazard: "Flood",
    probability: 78,
    population: "18,400",
    floodStart: "Day 2, Friday night",
    vulnerable: ["Elders", "Children", "Schools", "Clinics", "Riverbank households"],
    businesses: [
      ["Mekong Logistics Cold Storage", "Food warehouse", "Backup power and road access risk"],
      ["Thakhek Rice Mill", "Factory", "Workers and grain stock need early notice"],
      ["Ban Nongbok Morning Market", "Market", "High foot traffic and drainage risk"],
      ["Khammouane Garment Workshop", "Factory", "Shift workers may need transport"]
    ]
  },
  {
    id: "namkhan",
    name: "Nam Khan upstream villages",
    province: "Luang Prabang",
    hazard: "Flash flood / landslide",
    probability: 54,
    population: "7,200",
    floodStart: "Day 3, Saturday morning",
    vulnerable: ["Mountain schools", "Bridge users", "Tourism operators", "Clinics"],
    businesses: [
      ["Nam Khan Eco Lodge", "Tourism business", "Guest evacuation and river activity closure"],
      ["Luang Prabang Road Contractor Yard", "Equipment depot", "Excavators and trucks may support debris clearance"],
      ["Ban Pak Ou Boat Cooperative", "Transport", "River crossing suspension decision point"]
    ]
  },
  {
    id: "bolaven",
    name: "Bolaven highland storm cell",
    province: "Champasak / Sekong",
    hazard: "Hail / severe storm",
    probability: 18,
    population: "4,900",
    floodStart: "Day 1, this evening",
    vulnerable: ["Temporary shelters", "Outdoor workers", "Roof-fragile homes", "Market stalls"],
    businesses: [
      ["Bolaven Coffee Processing Plant", "Factory", "Roof, drying yard, and worker safety risk"],
      ["Pakse Fresh Produce Depot", "Food logistics", "Cold-chain backup and transport delay"],
      ["Sekong Quarry Cooperative", "Industrial site", "Heavy equipment can support road clearance"]
    ]
  }
];

const forecasts = [
  {
    station: "Thakhek Mekong gauge",
    province: "Khammouane",
    waterLevel: "7.8 m",
    trend: "+0.6 m / 24h",
    rainfall: "112 mm",
    probability: 78,
    hazard: "Flood",
    severity: "High",
    start: "Day 2, Friday night",
    action: "Prepare evacuation for elders, children, schools, clinics, and riverbank homes."
  },
  {
    station: "Nam Khan upstream",
    province: "Luang Prabang",
    waterLevel: "5.9 m",
    trend: "+0.3 m / 24h",
    rainfall: "86 mm",
    probability: 54,
    hazard: "Flash flood / landslide",
    severity: "Watch",
    start: "Day 3, Saturday morning",
    action: "Monitor mountain roads, bridges, and school transport routes."
  },
  {
    station: "Bolaven highland cell",
    province: "Champasak / Sekong",
    waterLevel: "N/A",
    trend: "Storm cell forming",
    rainfall: "64 mm",
    probability: 18,
    hazard: "Hail / severe storm",
    severity: "Low",
    start: "Day 1, this evening",
    action: "Secure roofs, markets, and temporary shelters; watch for lightning and hail."
  }
];

const pages = ["dashboard", "alerts", "map", "volunteers", "contacts", "reports", "settings"];

function t(key) {
  return (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
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
  return `
    <section class="grid metrics">
      ${metric(t("active"), "18", "Flood, storm, and rainfall watch zones")}
      ${metric(t("waterForecast"), "7.8 m", "Thakhek gauge, rising +0.6 m / 24h")}
      ${metric(t("floodProbability"), "78%", "High flood risk in Khammouane")}
      ${metric(t("floodStart"), "Day 2", "Friday night if heavy rain continues")}
    </section>
    <section class="grid forecast-grid" style="margin-top:18px">
      ${forecasts.map(forecastCard).join("")}
    </section>
    <section class="grid two" style="margin-top:18px">
      ${mapBlock()}
      <div class="panel">
        <h3 class="section-title">${t("active")}</h3>
        <div class="alert-list">
          ${alertRow("Multi-province flood watch from test.txt", "Flood", "AI Generated", "amber")}
          ${alertRow("Ban Nongbok and Mekong riverbank villages", "Flood", "Published", "red")}
          ${alertRow("Kaysone urban drainage zones", "Heavy rainfall", "Watch", "amber")}
        </div>
        <h3 class="section-title" style="margin-top:20px">${t("delivered")}</h3>
        <div class="log-list">${state.logs.map(logRow).join("")}</div>
      </div>
    </section>`;
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
          <label class="wide">Location<input value="Multi-province flood watch from test.txt" /></label>
          <label class="wide">Recommended action<textarea>Move elders, children, school groups, clinic patients, and essential supplies to higher ground. Avoid flooded roads and ferry crossings.</textarea></label>
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
    <label class="wide">Incoming report<textarea>TEST-LAO-2026-001: Continuous heavy rainfall is affecting Vientiane, Luang Prabang, Khammouane, and Savannakhet. Roads, homes, power lines, schools, clinics, elders, and children may require priority support.</textarea></label>
    <label class="wide">Reviewer routing notes<textarea>Prioritize elders, children, schools, clinics, rescue teams, shelter managers, boat operators, and village loudspeaker volunteers. Route through SMS, WhatsApp, in-app alerts, and local radio.</textarea></label>
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
      ${insight(t("evidence"), "Flood test alert states heavy rainfall, road closures, power outages, and temporary evacuation needs in four Lao provinces.")}
      ${insight(t("targetAudience"), "Elders, children, pregnant women, people with disabilities, schools, clinics, riverbank villages, rescue teams, shelter teams.")}
      ${insight("Suggested channels", "SMS, WhatsApp, in-app alert, village loudspeaker, local radio.")}
      ${insight("Quality flags", state.intakeAnalyzed ? "Test document; reviewer should verify affected villages and timing before publishing." : "Run AI intake to populate evidence and routing.")}
    </div>
    <p><b>English message:</b> Flood watch issued for Vientiane, Luang Prabang, Khammouane, and Savannakhet. Prepare evacuation support for vulnerable people and avoid flooded roads.</p>
    <p><b>Lao message:</b> ແຈ້ງເຕືອນນໍ້າຖ້ວມສໍາລັບຫຼາຍແຂວງໃນລາວ. ໃຫ້ກຽມພ້ອມຍ້າຍຄົນທີ່ມີຄວາມສ່ຽງໄປບ່ອນປອດໄພ.</p>
    <p class="muted">Reviewer can change channels and audience routing before approval.</p>
    <div class="actions">
      <button class="secondary" data-status="Under Review">${t("review")}</button>
      <button class="secondary" data-status="Approved">${t("approve")}</button>
      <button class="primary" data-status="Published">${t("publish")}</button>
    </div>
  </div>`;
}

function mapPage() {
  const area = selectedDisasterArea();
  return `<section class="grid two">
    <div>
      ${mapBlock(true)}
      <div class="area-selector">${disasterAreas.map((item) => `<button class="${state.selectedArea === item.id ? "active" : ""}" data-area="${item.id}">${item.name}</button>`).join("")}</div>
    </div>
    <div class="panel">
      <p class="eyebrow">Selected disaster area</p>
      <h3 class="section-title">${area.name}</h3>
      <div class="badge-row"><span class="pill red">${area.hazard}</span><span class="pill ${area.probability >= 70 ? "red" : area.probability >= 40 ? "amber" : "cyan"}">${area.probability}% risk</span></div>
      <div class="area-summary">
        <div><span>Province</span><strong>${area.province}</strong></div>
        <div><span>Affected people</span><strong>${area.population}</strong></div>
        <div><span>Expected start</span><strong>${area.floodStart}</strong></div>
      </div>
      <h3 class="section-title">People to mobilize first</h3>
      <div class="priority-list">${area.vulnerable.map((item) => `<span>${item}</span>`).join("")}</div>
      <h3 class="section-title" style="margin-top:18px">Businesses and factories in this area</h3>
      <div class="business-list">${area.businesses.map((item) => businessRow(item)).join("")}</div>
    </div>
  </section>
  <section class="panel" style="margin-top:18px">
    <h3 class="section-title">Human priority workflow</h3>
    <div class="timeline">${["Elders mobilize first", "Children and schools", "Clinics and caregivers", "Factories and worker transport", "Volunteer confirmation"].map((s, i) => `<div class="step"><b>0${i + 1}</b>${s}</div>`).join("")}</div>
  </section>`;
}

function volunteersPage() {
  return `<section class="panel"><h3 class="section-title">${t("ack")}</h3><div class="ack-list">${state.acknowledgments.map(ackRow).join("")}</div><div class="actions"><button class="primary" data-ack>Acknowledge Ban Nongbok loudspeaker</button><button class="secondary" data-tab="reports">Open reports</button></div></section>`;
}

function contactsPage() {
  return `<section class="grid two">
    <div class="panel ai-panel">
      <p class="eyebrow">AI contact intake</p>
      <h3 class="section-title">Upload contact source</h3>
      <p class="muted">Upload pictures, handwritten notes, screenshots, Excel, Word, PDF, or text files. The production backend would use OpenAI vision/OCR plus structured extraction to classify and save contacts.</p>
      <label class="upload-box">
        <input type="file" data-contact-file accept="image/*,.pdf,.txt,.csv,.xlsx,.xls,.doc,.docx" />
        <span>${state.contactUploadFileName || "Choose file or handwritten picture"}</span>
      </label>
      <div class="actions">
        <button class="primary" data-contact-analyze>AI detect and record contacts</button>
      </div>
      ${state.contactUploadAnalyzed ? contactExtractionPanel() : `<div class="empty-panel">Waiting for file analysis.</div>`}
    </div>
    <div class="panel chat-panel">
      <p class="eyebrow">Contact search assistant</p>
      <h3 class="section-title">Ask who to contact</h3>
      <label class="wide">Question<input data-contact-search value="${escapeHtml(state.contactSearch)}" placeholder="Example: Which nearby province can lend pumps to Thakhek?" /></label>
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
    ? `<button class="pin ${state.selectedArea === id ? "selected" : ""}" data-area="${id}" style="${style}"><span>${label}</span></button>`
    : `<div class="pin ${tone}" style="${style}"><span>${label}</span></div>`;

  return `<div class="map">
    <div class="map-title">Laos operational forecast map</div>
    <svg class="laos-shape" viewBox="0 0 360 520" role="img" aria-label="Operational map of Laos with forecast risk points">
      <path d="M177 21 C215 55 236 87 223 118 C249 138 273 168 255 205 C284 234 292 281 263 316 C286 354 275 392 237 417 C228 460 195 504 158 496 C121 489 120 440 142 408 C95 377 96 332 128 301 C93 270 97 227 130 201 C99 164 109 122 146 102 C141 70 151 44 177 21 Z" />
      <path d="M155 112 C184 131 215 140 240 164" />
      <path d="M132 212 C172 225 217 245 252 278" />
      <path d="M142 316 C179 330 220 356 241 394" />
      <text x="175" y="95">Luang Prabang</text>
      <text x="136" y="206">Vientiane</text>
      <text x="170" y="300">Khammouane</text>
      <text x="162" y="360">Savannakhet</text>
      <text x="214" y="446">Bolaven</text>
    </svg>
    ${pin("thakhek", "Thakhek flood risk 78%", "left:59%;top:55%")}
    ${pin("namkhan", "Nam Khan flash flood 54%", "left:48%;top:33%;background:var(--amber)", "amber")}
    ${pin("bolaven", "Bolaven hail risk 18%", "left:69%;top:81%;background:var(--cyan)", "cyan")}
    <div class="map-legend"><span class="legend red"></span> Flood <span class="legend amber"></span> Flash flood <span class="legend cyan"></span> Hail / storm</div>
  </div>`;
}

function selectedDisasterArea() {
  return disasterAreas.find((item) => item.id === state.selectedArea) || disasterAreas[0];
}

function businessRow(item) {
  return `<div class="business-row"><div><b>${item[0]}</b><span>${item[1]}</span></div><p>${item[2]}</p></div>`;
}

function forecastCard(item) {
  const tone = item.probability >= 70 ? "red" : item.probability >= 40 ? "amber" : "cyan";
  return `<div class="forecast-card">
    <div class="forecast-head">
      <div><b>${item.station}</b><span>${item.province}</span></div>
      <span class="pill ${tone}">${item.severity}</span>
    </div>
    <div class="forecast-values">
      <div><span>Water</span><strong>${item.waterLevel}</strong><small>${item.trend}</small></div>
      <div><span>Rainfall</span><strong>${item.rainfall}</strong><small>last 24h / forecast feed</small></div>
      <div><span>${item.hazard}</span><strong>${item.probability}%</strong><small>${item.start}</small></div>
    </div>
    <div class="risk-bar"><i style="width:${item.probability}%"></i></div>
    <p>${item.action}</p>
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
  return `<div class="log-row"><div><b>${item[0]}</b><br><span class="muted">${item[1]}</span></div><span class="pill ${item[2] === "Failed" ? "red" : "green"}">${item[2]}</span></div>`;
}

function ackRow(item) {
  return `<div class="ack-row"><div><b>${item[0]}</b><br><span class="muted">${item[1]}</span></div><span class="pill ${item[2] === "Pending" ? "amber" : "green"}">${item[2]}</span></div>`;
}

function bind() {
  document.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => { state.tab = btn.dataset.tab; render(); }));
  document.querySelectorAll("[data-lang]").forEach((btn) => btn.addEventListener("click", () => { state.lang = btn.dataset.lang; render(); }));
  document.querySelectorAll("[data-area]").forEach((btn) => btn.addEventListener("click", () => { state.selectedArea = btn.dataset.area; render(); }));
  document.querySelectorAll("[data-status]").forEach((btn) => btn.addEventListener("click", () => { state.status = btn.dataset.status; render(); }));
  document.querySelectorAll("[data-analyze]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-create-intake]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.intakeCreated = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-simulate]").forEach((btn) => btn.addEventListener("click", () => { state.logs.unshift(["WhatsApp", "External test recipient ****2825", "Delivered"]); state.tab = "dashboard"; render(); }));
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
