const nasaUrl = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&SRS=EPSG:4326&BBOX=100,13,108,23&WIDTH=1280&HEIGHT=900&FORMAT=image/jpeg";

const dict = {
  en: {
    app: "Laos Disaster Alert",
    context: "AI-powered disaster alert and last-mile communication platform",
    dashboard: "Dashboard",
    alerts: "Alerts",
    map: "Human Map",
    volunteers: "Volunteers",
    reports: "Reports",
    settings: "Settings",
    active: "Active alerts",
    affected: "Affected people",
    delivered: "Delivered logs",
    ack: "Volunteer acknowledgments",
    title: "Operational dashboard",
    subtitle: "Laos national demo, Vientiane time UTC+7",
    create: "Create flood alert",
    generate: "Generate AI draft",
    review: "Send for review",
    approve: "Approve",
    publish: "Publish",
    simulate: "Simulate WhatsApp/SMS logs",
    status: "Status",
    note: "MVP demo: SMS and WhatsApp are logged, not sent, until real providers are configured."
  },
  lo: {
    app: "ລະບົບແຈ້ງເຕືອນໄພພິບັດລາວ",
    context: "ແພລດຟອມ AI ສຳລັບແຈ້ງເຕືອນ ແລະ ສື່ສານຫາຊຸມຊົນ",
    dashboard: "ແດຊບອດ",
    alerts: "ແຈ້ງເຕືອນ",
    map: "ແຜນທີ່ມະນຸດ",
    volunteers: "ອາສາສະໝັກ",
    reports: "ລາຍງານ",
    settings: "ຕັ້ງຄ່າ",
    active: "ແຈ້ງເຕືອນທີ່ເປີດ",
    affected: "ປະຊາກອນກະທົບ",
    delivered: "ບັນທຶກສົ່ງສຳເລັດ",
    ack: "ການຢືນຢັນອາສາ",
    title: "ແດຊບອດປະຕິບັດງານ",
    subtitle: "ສາທິດລະດັບຊາດລາວ, ເວລາວຽງຈັນ UTC+7",
    create: "ສ້າງແຈ້ງເຕືອນນ້ຳຖ້ວມ",
    generate: "ສ້າງຮ່າງດ້ວຍ AI",
    review: "ສົ່ງກວດທານ",
    approve: "ອະນຸມັດ",
    publish: "ເຜີຍແຜ່",
    simulate: "ຈຳລອງບັນທຶກ WhatsApp/SMS",
    status: "ສະຖານະ",
    note: "MVP demo: SMS ແລະ WhatsApp ເປັນບັນທຶກຈຳລອງ ຍັງບໍ່ສົ່ງຈິງ."
  }
};

const state = {
  lang: "en",
  tab: "dashboard",
  status: "Published",
  logs: [
    ["SMS", "External test device ****2825", "Delivered"],
    ["WhatsApp", "Ban Nongbok volunteer ****0451", "Delivered"],
    ["Email", "Khammouane PDRRMC", "Delivered"],
    ["SMS", "Bolaven volunteer ****0773", "Failed"]
  ],
  acknowledgments: [
    ["Khamla Phengsavanh", "Village loudspeaker", "Acknowledged"],
    ["Maly Chanthavong", "Door-to-door", "Pending"]
  ]
};

const pages = ["dashboard", "alerts", "map", "volunteers", "reports", "settings"];

function t(key) { return dict[state.lang][key] || dict.en[key]; }

function render() {
  document.documentElement.lang = state.lang === "lo" ? "lo" : "en";
  document.getElementById("app").innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="mark">LA</div>
          <div><h1>${t("app")}</h1><p>${t("context")}</p></div>
        </div>
        <nav class="nav">${pages.map(p => `<button class="${state.tab === p ? "active" : ""}" data-tab="${p}">${t(p)}</button>`).join("")}</nav>
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
  if (state.tab === "reports") return reportsPage();
  if (state.tab === "settings") return settingsPage();
  return dashboardPage();
}

function dashboardPage() {
  return `
    <section class="grid metrics">
      ${metric(t("active"), "2", "Warning + Watch")}
      ${metric(t("affected"), "27,600", "Khammouane + Savannakhet")}
      ${metric(t("delivered"), String(state.logs.filter(l => l[2] === "Delivered").length), "SMS / WhatsApp / Email")}
      ${metric(t("ack"), "1/2", "Village network")}
    </section>
    <section class="grid two" style="margin-top:18px">
      ${mapBlock()}
      <div class="panel">
        <h3 class="section-title">${t("active")}</h3>
        <div class="alert-list">
          ${alertRow("Ban Nongbok and Mekong riverbank villages", "Flood", "Warning", "red")}
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
      <div class="panel">
        <h3 class="section-title">${t("create")}</h3>
        <div class="grid form">
          <label>Hazard<select><option>Flood</option><option>Storm</option><option>Heavy rainfall</option></select></label>
          <label>Severity<select><option>Warning</option><option>Emergency</option><option>Watch</option></select></label>
          <label>Province<input value="Khammouane" /></label>
          <label>District<input value="Thakhek" /></label>
          <label class="wide">Location<input value="Ban Nongbok and Mekong riverbank villages" /></label>
          <label class="wide">Recommended action<textarea>Move elders, children, rice stores, and livestock to higher ground. Avoid ferry crossings.</textarea></label>
        </div>
        <div class="actions">
          <button class="primary" data-status="AI Generated">${t("generate")}</button>
          <button class="secondary" data-status="Under Review">${t("review")}</button>
          <button class="secondary" data-status="Approved">${t("approve")}</button>
          <button class="primary" data-status="Published">${t("publish")}</button>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">${t("status")}: <span class="pill red">${state.status}</span></h3>
        <p><b>AI impact summary:</b> 18,400 people in low riverbank villages may face house flooding and road disruption.</p>
        <p><b>Routing groups:</b> Khammouane PDRRMC, Thakhek rescue unit, Ban Nongbok volunteer network.</p>
        <p><b>Lao message:</b> ແຈ້ງເຕືອນນ້ຳຖ້ວມສຳລັບບ້ານໜອງບົກ ແລະ ບ້ານແຄມແມ່ນ້ຳຂອງ.</p>
        <button class="primary" data-simulate>${t("simulate")}</button>
      </div>
    </section>`;
}

function mapPage() {
  return `<section class="grid two">${mapBlock()}<div class="panel"><h3 class="section-title">Human priority map</h3><div class="timeline">${["Elders move first", "Children and schools", "Clinic and rescue", "Boats and pumps", "Volunteer confirmation"].map((s,i)=>`<div class="step"><b>0${i+1}</b>${s}</div>`).join("")}</div></div></section>`;
}

function volunteersPage() {
  return `<section class="panel"><h3 class="section-title">${t("ack")}</h3><div class="ack-list">${state.acknowledgments.map(ackRow).join("")}</div><div class="actions"><button class="primary" data-ack>Acknowledge Ban Nongbok loudspeaker</button><button class="secondary" data-tab="reports">Open reports</button></div></section>`;
}

function reportsPage() {
  return `<section class="grid impact">${["Alert delivery report", "Failed SMS/WhatsApp report", "Response activity report"].map((h,i)=>`<div class="card"><h3>${h}</h3><strong style="font-size:34px">${i===1 ? 1 : i===0 ? state.logs.length : 2}</strong><p class="muted">${i===1 ? "Bolaven signal outage appears for follow-up." : "Audit-ready operational record."}</p></div>`).join("")}</section>`;
}

function settingsPage() {
  return `<section class="panel"><h3 class="section-title">Role permissions</h3><p><b>Allowed:</b> create alert, draft with AI, review, approve, publish, view delivery, manage volunteers, acknowledge alert, view reports.</p><p><b>Database mode:</b> public hosted demo shell. Full local MVP supports memory-demo and postgres-postgis modes.</p></section>`;
}

function metric(label, value, detail) {
  return `<div class="card metric"><span>${label}</span><strong>${value}</strong><p class="muted">${detail}</p></div>`;
}

function mapBlock() {
  return `<div class="map"><img src="${nasaUrl}" alt="NASA satellite map over Laos" /><div class="pin" style="left:60%;top:52%"><span>Thakhek flood warning</span></div><div class="pin" style="left:56%;top:64%;background:var(--amber)"><span>Savannakhet rainfall watch</span></div><div class="pin" style="left:72%;top:78%;background:var(--green)"><span>Pakxong volunteer route</span></div></div>`;
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
  document.querySelectorAll("[data-tab]").forEach(btn => btn.addEventListener("click", () => { state.tab = btn.dataset.tab; render(); }));
  document.querySelectorAll("[data-lang]").forEach(btn => btn.addEventListener("click", () => { state.lang = btn.dataset.lang; render(); }));
  document.querySelectorAll("[data-status]").forEach(btn => btn.addEventListener("click", () => { state.status = btn.dataset.status; render(); }));
  document.querySelectorAll("[data-simulate]").forEach(btn => btn.addEventListener("click", () => { state.logs.unshift(["WhatsApp", "External test device ****2825", "Delivered"]); state.tab = "dashboard"; render(); }));
  document.querySelectorAll("[data-ack]").forEach(btn => btn.addEventListener("click", () => { state.acknowledgments[1][2] = "Acknowledged"; render(); }));
}

render();
