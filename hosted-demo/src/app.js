const nasaUrl = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&SRS=EPSG:4326&BBOX=100,13,108,23&WIDTH=1280&HEIGHT=900&FORMAT=image/jpeg";

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
  intakeAnalyzed: false,
  intakeCreated: true,
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
  ]
};

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
      ${metric(t("affected"), "46,800", "Vientiane, Luang Prabang, Khammouane, Savannakhet")}
      ${metric(t("delivered"), String(state.logs.filter((log) => log[2] === "Delivered").length), "SMS / WhatsApp / in-app")}
      ${metric(t("ack"), "2/3", "Village and rescue network")}
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
  return `<section class="grid two">${mapBlock()}<div class="panel"><h3 class="section-title">Human priority map</h3><div class="timeline">${["Elders mobilize first", "Children and schools", "Clinics and caregivers", "Rescue boats and pumps", "Volunteer confirmation"].map((s, i) => `<div class="step"><b>0${i + 1}</b>${s}</div>`).join("")}</div></div></section>`;
}

function volunteersPage() {
  return `<section class="panel"><h3 class="section-title">${t("ack")}</h3><div class="ack-list">${state.acknowledgments.map(ackRow).join("")}</div><div class="actions"><button class="primary" data-ack>Acknowledge Ban Nongbok loudspeaker</button><button class="secondary" data-tab="reports">Open reports</button></div></section>`;
}

function contactsPage() {
  const contacts = [
    ["Thakhek Rescue Unit", "Boats, ropes, first aid", "Khammouane"],
    ["Mahaxay District Clinic", "Triage, elders, children", "Khammouane"],
    ["Savannakhet Provincial Shelter Desk", "Temporary shelter", "Savannakhet"],
    ["Lao Red Cross Regional Coordinator", "Relief supplies", "Vientiane"],
    ["Neighboring district equipment pool", "Borrow pumps and generators", "Bolikhamxay"]
  ];
  return `<section class="panel"><h3 class="section-title">Contacts and regional equipment</h3><p class="muted">Reviewer can route alerts to people, teams, or equipment owners based on the affected area.</p><div class="contact-grid">${contacts.map((item) => `<div class="contact-card"><b>${item[0]}</b><p>${item[1]}</p><span class="pill blue">${item[2]}</span></div>`).join("")}</div></section>`;
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

function mapBlock() {
  return `<div class="map"><img src="${nasaUrl}" alt="NASA satellite map over Laos" /><div class="pin" style="left:60%;top:52%"><span>Thakhek flood warning</span></div><div class="pin" style="left:56%;top:64%;background:var(--amber)"><span>Savannakhet rainfall watch</span></div><div class="pin" style="left:72%;top:78%;background:var(--green)"><span>Pakxong volunteer route</span></div></div>`;
}

function sourceCard(title, detail, status) {
  return `<div class="source-card"><b>${title}</b><p>${detail}</p><span>${status}</span></div>`;
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
  document.querySelectorAll("[data-status]").forEach((btn) => btn.addEventListener("click", () => { state.status = btn.dataset.status; render(); }));
  document.querySelectorAll("[data-analyze]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-create-intake]").forEach((btn) => btn.addEventListener("click", () => { state.intakeAnalyzed = true; state.intakeCreated = true; state.status = "AI Generated"; render(); }));
  document.querySelectorAll("[data-simulate]").forEach((btn) => btn.addEventListener("click", () => { state.logs.unshift(["WhatsApp", "External test recipient ****2825", "Delivered"]); state.tab = "dashboard"; render(); }));
  document.querySelectorAll("[data-ack]").forEach((btn) => btn.addEventListener("click", () => { state.acknowledgments[1][2] = "Acknowledged"; render(); }));
}

render();
