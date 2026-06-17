# ເອກະສານໂຄງການ Last AI Power Disaster Warning System

ສະບັບ: ເອກະສານ MVP ທີ່ປັບໃຫ້ກົງກັນ
ວັນທີ: 17 ມິຖຸນາ 2026
ເວັບສາທິດ: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
GitHub: https://github.com/cmajorros/Last-AI-Power-Disaster-Warning-System
ແອັບ local: `http://127.0.0.1:3000/`

## ສະຫຼຸບ Deliverable

Deliverable ແມ່ນ MVP web application ແລະ hosted demo ສໍາລັບລະບົບ AI-powered disaster alert ແລະ last-mile communication ຂອງລາວ. ລະບົບມີ workflow ການກວດທານ/ອະນຸມັດ, UI ອັງກິດ/ລາວ, AI intake, mock data ຂອງລາວ, dashboard ກໍານົດປະກາດ, Human Map, contact intelligence mockup, notification logs, volunteer acknowledgment ແລະ demo artifacts.

Artifacts ປັດຈຸບັນ:

- Hosted OpenAI Sites demo.
- Next.js local MVP ພ້ອມ PostgreSQL/PostGIS-ready schema.
- PowerPoint deck.
- Demo screen recording GIF ທີ່ອັບເດດ.
- ຄູ່ມືຜູ້ໃຊ້ອັງກິດ ແລະ ລາວ.
- ເອກະສານໂຄງການອັງກິດ ແລະ ລາວ.
- Demo script ແລະ role-based scenarios.

## Problem Statement

ຂໍ້ມູນໄພພິບັດອາດມາຮອດກ່ອນການປະກາດທາງການ ແຕ່ມັກກະຈາຍຢູ່ໃນ email, WhatsApp, ເອກະສານ, screenshot, ບັນທຶກພາກສະໜາມ ແລະ ການສັງເກດຂອງຊຸມຊົນ. ຄວາມຊ້າລະຫວ່າງສັນຍານແຮກ ແລະ ການກະທໍາຂອງຄົວເຮືອນອາດອັນຕະລາຍ.

## Pain Points ທີ່ແກ້ໄຂ

- ຕ້ອງອ່ານ ແລະ rewrite ຂໍ້ມູນວິກິດຈາກຫຼາຍແຫຼ່ງດ້ວຍມື.
- ການແປຂໍ້ຄວາມເຕືອນອັງກິດ/ລາວຊ້າ.
- ບໍ່ຊັດເຈນວ່າຄວນສົ່ງໃຫ້ໃຜກ່ອນ.
- ບໍ່ເຫັນທຸລະກິດ, ໂຮງງານ ຫຼື ເຈົ້າຂອງອຸປະກອນໃນພື້ນທີ່ໄພ.
- ຍາກຕໍ່ການຢືມ pump, generator, boat, lighting ຫຼື transport ຈາກເຂດໃກ້ຄຽງ.
- ບໍ່ຮູ້ວ່າ SMS/WhatsApp ສົ່ງບໍ່ສໍາເລັດ ຫຼື volunteer ຢືນຢັນແລ້ວບໍ່.
- ແຜນທີ່ອາດບໍ່ render ເມື່ອ external imagery ຫຼື network ມີບັນຫາ.

## ວິທີໃຊ້ໂດຍ Practitioner

1. ເບິ່ງ Dashboard ສໍາລັບ water level, rainfall, flood probability, hail/storm outlook ແລະ expected start.
2. ກົດ square disaster-area marker ແລະ ຕັ້ງ watch/crisis/disaster announcement.
3. ເປີດ Alerts ແລະ ingest ຂໍ້ມູນຈາກ Gmail, WhatsApp Business, uploaded file, image, screenshot, PDF, OCR-ready document ຫຼື manual text.
4. ໃຫ້ OpenAI ສັງເຄາະ alert proposal ເມື່ອຕັ້ງ `OPENAI_API_KEY`.
5. ກວດ evidence, quality flags, target audience, channels ແລະ ຂໍ້ຄວາມສອງພາສາ.
6. Send for review, approve ແລະ publish.
7. ໃຊ້ Human Map ເພື່ອເບິ່ງ vulnerable groups, businesses ແລະ factories.
8. ໃຊ້ Contacts ເພື່ອ upload contact source ແລະ ຖາມເລື່ອງຢືມອຸປະກອນ.
9. ຕິດຕາມ logs, failed notifications ແລະ volunteer acknowledgment ໃນ Reports.

## Key Features ທີ່ປັບໃຫ້ກົງກັນ

- Dashboard marker selection ແລະ meteorology officer announcement workflow.
- Mock data ພາສາລາວສໍາລັບ forecast, disaster areas, people-first priorities, businesses, factories, volunteers, contacts ແລະ logs.
- Forecast cards ສໍາລັບ ທ່າແຂກ, ນໍ້າຄານ ແລະ ບໍລະເວນ.
- Human Map ມີ vulnerable groups, businesses/factories ແລະ priority workflow.
- Contact upload mockup ສໍາລັບຮູບຂຽນມື, screenshot, Excel, Word/PDF ແລະ text.
- Contact search assistant ສໍາລັບຄໍາຖາມເລື່ອງ equipment, hospital, school ແລະ rescue routing.
- AI intake ສໍາລັບ email, WhatsApp, documents, images, screenshots, PDFs ແລະ OCR-ready uploads.
- Hosted demo ຈໍາລອງ SMS/WhatsApp logs; local app ມີ provider scaffolding ສໍາລັບ integration ຈິງ.

## Data ແລະ AI Requirements

- Gmail reports ແລະ attachments.
- WhatsApp Business webhook messages ແລະ media metadata.
- Documents, screenshots, images, PDFs, text, Word, Excel.
- Official hydromet, river-gauge, rainfall, flood, landslide, hail ແລະ severe-storm feeds.
- PostGIS layers ສໍາລັບ district, village, facility, factory, market, shelter ແລະ transport.
- Contact records ສໍາລັບ volunteers, rescue teams, hospitals, schools, shelters, relief partners, equipment owners ແລະ business focal points.
- `OPENAI_API_KEY` ແລະ `OPENAI_INTAKE_MODEL`.
- Guardrails ໃຫ້ AI ເປັນ drafting assistant ເທົ່ານັ້ນ; human approval ຍັງບັງຄັບ.

## Setup ແລະ Configuration ຈິງ

```powershell
npm.cmd install
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
npm.cmd run typecheck
npm.cmd run build
docker compose up -d
Copy-Item .env.example .env
```

Production ຕ້ອງມີ Node.js, Git, PostgreSQL/PostGIS, secret manager, SSO/MFA, SMS gateway, Meta WhatsApp Business API, Gmail OAuth, monitoring, backups ແລະ official hydromet/GIS feeds.

## Test Set ແລະ Pass/Fail Checklist

| Test | Pass condition |
| --- | --- |
| Hosted demo opens | Dashboard ໂຫຼດໄດ້ |
| Language toggle | English/Lao labels ແລະ data ປ່ຽນໄດ້ |
| Dashboard marker click | ເລືອກ disaster area ແລະ announcement panel ອັບເດດ |
| Officer announcement | Watch/crisis/disaster ປາກົດໃນ active alerts ແລະ logs |
| Forecasting | Water level, rainfall, probability ແລະ expected start ສະແດງ |
| AI intake | Incoming report ສ້າງ AI proposal ຫຼື fallback |
| Approval workflow | Alert Published ຫຼັງ review/approval ເທົ່ານັ້ນ |
| Human Map | Vulnerable groups, businesses, factories ສະແດງຕາມ area |
| Contact upload | Mock AI extraction ເພີ່ມ contact record |
| Contact search | Assistant ແນະນໍາ equipment/response contacts |
| Notification logs | SMS/WhatsApp/email/in-app logs ຖືກບັນທຶກ |
| Volunteer acknowledgment | Acknowledgment ປາກົດໃນ dashboard/reports |
| PostgreSQL mode | Settings ສະແດງ `postgres-postgis` ເມື່ອຕັ້ງ `DATABASE_URL` |

## ຂໍ້ຈໍາກັດ

- Hosted demo ເປັນ static demo shell ແລະ provider actions ເປັນ simulation.
- SMS/WhatsApp ຈິງຕ້ອງມີ credentials, approved templates, callbacks ແລະ retry queues.
- Gmail polling ຕ້ອງມີ Google OAuth.
- OCR/attachments ຕ້ອງມີ production file handling, security scanning ແລະ storage.
- Hosted map ເປັນ self-contained ເພື່ອ reliability; production GIS ຄວນໃຊ້ PostGIS layers ແລະ optional NASA imagery.
- Forecast data ເປັນ mock data ຈົນກວ່າຈະເຊື່ອມ official hydromet feeds.
- Authentication/MFA ເປັນ demo-level.
- ພາສາລາວຕ້ອງຖືກກວດໂດຍ local reviewers ກ່ອນໃຊ້ຈິງ.

## Open Issues ແລະ Future Improvements

- Durable contact upload storage ແລະ AI extraction results.
- Live Gmail polling ແລະ WhatsApp media download.
- Real SMS provider integration ແລະ delivery callbacks.
- Subscriber app ໃຫ້ປະຊາຊົນ opt in ຮັບ WhatsApp/SMS alerts ຕາມພື້ນທີ່.
- AI ແນະນໍາ contact persons ແລະ equipment owners ຕາມ disaster area.
- AI ຄາດຄະເນ flood/water level ຈາກ hydromet feeds ແລະ historical events.
- GIS layers ສໍາລັບ factory, school, hospital, shelter, road, ferry ແລະ equipment.
- Offline volunteer mobile workflow ແລະ village bulletin print mode.
- Official approval signatures, audit review ແລະ production identity provider.
