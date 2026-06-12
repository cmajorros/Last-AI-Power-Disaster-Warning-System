# ເອກະສານລະບົບ Laos Disaster Alert MVP

ສະບັບ: ຊຸດເອກະສານສຳລັບທົດສອບ MVP  
ວັນທີ: 11 ມິຖຸນາ 2026  
URL ສຳລັບທົດສອບໃນເຄື່ອງ: `http://127.0.0.1:3000/`

ຂໍ້ຄວນລະວັງ: ລະບົບນີ້ແມ່ນສະບັບ MVP ສຳລັບສາທິດ ແລະ ທົດສອບຜູ້ໃຊ້ເທົ່ານັ້ນ. ລະບົບຈະສ້າງບັນທຶກການສົ່ງ SMS, WhatsApp, Email ແລະ In-app ແບບຈຳລອງ. ຍັງບໍ່ສົ່ງແຈ້ງເຕືອນຈິງໃຫ້ປະຊາຊົນ ຈົນກວ່າຈະຕິດຕັ້ງ gateway ຈິງ ແລະ ຂັ້ນຕອນອະນຸມັດທາງການແລ້ວ.

## 1. ຄູ່ມືຜູ້ໃຊ້ ແລະ ວິທີໃຊ້ງານ

### ຈຸດປະສົງ

Laos Disaster Alert MVP ຊ່ວຍໃຫ້ເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມ, ໜ່ວຍກູ້ໄພສຸກເສີນ, ຜູ້ປະສານງານ CSO, ອາສາສະໝັກບ້ານ ແລະ ຜູ້ຕິດຕໍ່ໃນຊຸມຊົນ ສາມາດສ້າງ, ກວດທານ, ອະນຸມັດ, ເຜີຍແຜ່, ຕິດຕາມ ແລະ ຢືນຢັນການແຈ້ງເຕືອນໄພພິບັດໃນປະເທດລາວ.

ປະເພດໄພທີ່ຮອງຮັບ:

- ນ້ຳຖ້ວມ
- ຝົນຕົກໜັກ
- ພາຍຸ
- ຄວາມສ່ຽງດິນເຈື່ອນ
- ອາກາດຮ້າຍແຮງ
- ໄພອື່ນທີ່ລັດຖະບານອະນຸມັດ

### ເປີດແອັບພິເຄຊັນ

1. ເປີດ `http://127.0.0.1:3000/` ໃນ browser.
2. ໃນການທົດສອບໃນເຄື່ອງ ໃຫ້ໃຊ້ `127.0.0.1` ແທນ `localhost` ເພາະອາດມີແອັບອື່ນໃຊ້ `localhost:3000`.
3. ກວດວ່າ header ສະແດງບໍລິບົດລະບົບແຫ່ງຊາດລາວ ແລະ ເວລາວຽງຈັນ.

### ປ່ຽນພາສາ

1. ທີ່ header ດ້ານເທິງ ຊອກຫາ `Language / ພາສາ`.
2. ເລືອກ `EN` ເພື່ອໃຊ້ພາສາອັງກິດ.
3. ເລືອກ `LO ລາວ` ເພື່ອໃຊ້ພາສາລາວ.
4. ເມນູ, ປຸ່ມ, label ໃນ dashboard, form ແລະ ສະຖານະຈະປ່ຽນຕາມພາສາທີ່ເລືອກ.
5. ຂໍ້ຄວາມແຈ້ງເຕືອນຖືກເກັບແຍກເປັນຊ່ອງພາສາອັງກິດ ແລະ ພາສາລາວ ແລະ ແກ້ໄຂໄດ້ກ່ອນເຜີຍແຜ່.

### ເຂົ້າລະບົບ ແລະ ປ່ຽນບົດບາດ

MVP ໃຊ້ຜູ້ໃຊ້ຕົວຢ່າງ. ເລືອກຜູ້ໃຊ້ຈາກ header, ໃສ່ລະຫັດ MFA ຖ້າຈຳເປັນ, ແລ້ວກົດ `Switch role`.

ລະຫັດ MFA ສາທິດ: `246810`

ບົດບາດຕົວຢ່າງ:

| ບົດບາດ | ສິ່ງທີ່ເຮັດໄດ້ຫຼັກ |
| --- | --- |
| ເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມ | ຕິດຕາມຂໍ້ມູນໄພ, ສ້າງແຈ້ງເຕືອນ, ໃຊ້ AI ຊ່ວຍຮ່າງ, ກວດທານ, ອະນຸມັດ, ເຜີຍແຜ່, ເບິ່ງລາຍງານ, ເພີ່ມບັນທຶກການຕອບໂຕ້ |
| ໜ່ວຍກູ້ໄພສຸກເສີນ | ຮັບແຈ້ງເຕືອນທາງການ, ເບິ່ງພື້ນທີ່ກະທົບ, ຕິດຕາມການສົ່ງ, ເພີ່ມບັນທຶກການຕອບໂຕ້, ເບິ່ງລາຍງານ |
| ຜູ້ປະສານງານ CSO | ຮັບແຈ້ງເຕືອນ, ຈັດການອາສາສະໝັກ, ຕິດຕາມການຢືນຢັນ ແລະ ພື້ນທີ່ຄອບຄຸມ, ເບິ່ງລາຍງານ |
| ອາສາສະໝັກຊຸມຊົນ | ເບິ່ງແຈ້ງເຕືອນ ແລະ ຢືນຢັນການຮັບ ຫຼື ລາຍງານການແຈ້ງຕໍ່ |
| ສະມາຊິກຊຸມຊົນ | ເບິ່ງຂໍ້ມູນ dashboard ສຳລັບການຮັບຮູ້ໃນຊຸມຊົນ |

ຖ້າບົດບາດທີ່ຖືກຈຳກັດພະຍາຍາມເຮັດ action ທີ່ບໍ່ມີສິດ, API ຈະສົ່ງ permission error. ນີ້ແມ່ນພຶດຕິກຳທີ່ຄາດໄວ້ສຳລັບການທົດສອບ RBAC.

### Dashboard

Dashboard ໃຊ້ເພື່ອເບິ່ງພາບລວມການປະຕິບັດງານ.

ສິ່ງທີ່ສະແດງ:

- ແຈ້ງເຕືອນທີ່ກຳລັງເປີດ
- ແຜນທີ່ໄພ
- ລະດັບຝົນ
- ລະດັບນ້ຳ
- ການຈັດປະເພດຄວາມສ່ຽງ
- ສະຖານະການສົ່ງແຈ້ງເຕືອນ
- ສະຖານະການຢືນຢັນຂອງອາສາສະໝັກ
- ປະຊາກອນທີ່ຄາດວ່າຈະກະທົບ
- ສະຫຼຸບຈາກ AI
- ບັນທຶກການຕອບໂຕ້
- ບັນທຶກການສົ່ງຫຼ້າສຸດ

ການເພີ່ມບັນທຶກການຕອບໂຕ້:

1. ເລືອກແຈ້ງເຕືອນໃນສ່ວນ `Response activity`.
2. ພິມບັນທຶກການປະສານງານ.
3. ກົດ `Save`.
4. ບັນທຶກຈະປາກົດໃນ feed ແລະ ໃນ reports.

### Alerts

ໜ້າ Alerts ໃຊ້ເພື່ອສ້າງ ແລະ ເຜີຍແຜ່ແຈ້ງເຕືອນທາງການ.

ຂໍ້ມູນໃນ form:

- ປະເພດໄພ
- ຄວາມຮ້າຍແຮງ
- ສະຖານທີ່
- ແຂວງ
- ເມືອງ
- ປະຊາກອນທີ່ກະທົບ
- ຜົນກະທົບຄາດຄະເນ
- ການປະຕິບັດແນະນຳ
- ເວລາເລີ່ມ
- ໄລຍະເວລາຄາດຄະເນ
- ຊ່ອງທາງສື່ສານ: SMS, WhatsApp, Email, In-app

ຂັ້ນຕອນແນະນຳ:

1. ເຂົ້າລະບົບເປັນ `DMH Vientiane Duty Officer`.
2. ເປີດ `Alerts`.
3. ຕື່ມ form ໂດຍໃຊ້ສະຖານທີ່ໃນລາວ ເຊັ່ນ Khammouane, Thakhek, Savannakhet, Kaysone, Champasak ຫຼື Pakxong.
4. ເລືອກຊ່ອງທາງສື່ສານ.
5. ກົດ `Create alert`.
6. ເລືອກແຈ້ງເຕືອນໃໝ່ໃນລາຍການ.
7. ກົດ `Generate draft`.
8. ກວດທານ ແລະ ແກ້ໄຂຂໍ້ຄວາມພາສາອັງກິດ ແລະ ພາສາລາວ.
9. ກົດ `Save`.
10. ກົດ `Send for review`.
11. ກົດ `Approve`.
12. ກົດ `Publish`.

ລຳດັບສະຖານະ:

`Draft` -> `AI Generated` -> `Under Review` -> `Approved` -> `Published` -> `Closed`

ເມື່ອກົດ `Publish`, ລະບົບຈະສ້າງບັນທຶກການສົ່ງແບບຈຳລອງໃຫ້ອາສາສະໝັກ ແລະ ເຈົ້າໜ້າທີ່ທີ່ເຂົ້າເງື່ອນໄຂ. SMS ແລະ WhatsApp ຈະຖືກສ້າງໃຫ້ອາສາສະໝັກໃນເມືອງ ຫຼື ແຂວງດຽວກັນ. Email ຫຼື In-app ຈະຖືກສ້າງໃຫ້ເຈົ້າໜ້າທີ່.

### Map

ໜ້າ Map ສະແດງແຈ້ງເຕືອນ ແລະ ສະຖານີຂໍ້ມູນໄພຢູ່ເທິງຮູບ satellite ຂອງລາວ.

ແຜນທີ່ປັດຈຸບັນໃຊ້:

- NASA GIBS WMS satellite image layer
- VIIRS/SNPP corrected reflectance true-color imagery
- ຂອບເຂດແຜນທີ່ໂຟກັດປະເທດລາວ
- Marker ສຳລັບແຈ້ງເຕືອນ ແລະ ຂໍ້ມູນໄພ

ຮູບ satellite ຕ້ອງໃຊ້ internet ຈາກ browser. ຖ້າຮູບບໍ່ຂຶ້ນ ໃຫ້ກວດ network ໄປທີ່ `gibs.earthdata.nasa.gov`.

### Volunteers

ໜ້າ Volunteers ໃຊ້ເພື່ອເພີ່ມອາສາສະໝັກ ແລະ ຕິດຕາມການສື່ສານຂັ້ນສຸດທ້າຍເຖິງຊຸມຊົນ.

ການເພີ່ມອາສາສະໝັກ:

1. ເປີດ `Volunteers`.
2. ໃສ່ຊື່ອາສາສະໝັກ.
3. ໃສ່ເບີໂທລະສັບ.
4. ເລືອກວ່າມີ WhatsApp ຫຼືບໍ່.
5. ໃສ່ບ້ານ, ເມືອງ ແລະ ແຂວງ.
6. ກົດ `Add volunteer`.

ການຢືນຢັນ ຫຼື ລາຍງານການແຈ້ງຕໍ່:

1. ເລືອກແຈ້ງເຕືອນຈາກ dropdown.
2. ເລືອກວິທີແຈ້ງຕໍ່:
   - ລຳໂພງບ້ານ
   - ໄປແຈ້ງຕາມບ້ານ
   - ວິທະຍຸຊຸມຊົນ
   - ປະກາດທ້ອງຖິ່ນ
3. ໃສ່ note ສັ້ນໆ.
4. ກົດ `Acknowledgment` ຫຼື `Dissemination`.
5. ສະຖານະຈະສະແດງໃນ Dashboard ແລະ Reports.

### Contacts

ໜ້າ Contacts ສະແດງບັນຊີຕິດຕໍ່ທາງການ ແລະ ເຄືອຂ່າຍອາສາສະໝັກບ້ານ.

MVP ຈະປິດບັງເບີໂທລະສັບ ແລະ ສະແດງພຽງ 4 ຕົວທ້າຍ. ນີ້ແມ່ນການສາທິດການປົກປ້ອງຂໍ້ມູນຕິດຕໍ່ ແລະ ການເກັບເບີໂທແບບ encrypted.

### Reports

ໜ້າ Reports ໃຊ້ເພື່ອກວດຜົນການເຮັດວຽກຂອງລະບົບ.

ລາຍງານທີ່ມີ:

- ລາຍງານການສົ່ງແຈ້ງເຕືອນ
- ລາຍງານການຢືນຢັນຂອງອາສາສະໝັກ
- ລາຍງານພື້ນທີ່ຄອບຄຸມ
- ລາຍງານ SMS/WhatsApp ທີ່ສົ່ງບໍ່ສຳເລັດ
- ລາຍງານກິດຈະກຳຕອບໂຕ້

ໃຊ້ໜ້ານີ້ຫຼັງຈາກ publish alert ເພື່ອກວດວ່າຕົວເລກການສົ່ງ ແລະ ການຢືນຢັນປັບປຸງຫຼືບໍ່.

### Settings

Settings ສະແດງ:

- ຜູ້ໃຊ້ປັດຈຸບັນ
- ບົດບາດປັດຈຸບັນ
- Database mode
- ຕາຕະລາງ permission ຂອງແຕ່ລະບົດບາດ

ຄ່າ Database mode:

- `memory-demo`: ໃຊ້ຂໍ້ມູນຕົວຢ່າງໃນ memory
- `postgres-postgis`: ໃຊ້ PostgreSQL/PostGIS ຜ່ານ `DATABASE_URL`

## 2. ຄຳອະທິບາຍໂຄງການ ແລະ ການພັດທະນາຕໍ່

### ຄຳອະທິບາຍໂຄງການ

ໂຄງການນີ້ແມ່ນ MVP web application ສຳລັບແພລດຟອມແຈ້ງເຕືອນໄພພິບັດ ແລະ ການສື່ສານຂັ້ນສຸດທ້າຍເຖິງຊຸມຊົນໃນປະເທດລາວ. ລະບົບຊ່ວຍຂັ້ນຕອນຂອງລັດ ແລະ ຊຸມຊົນໃນການສ້າງ, ກວດທານ, ອະນຸມັດ, ແປພາສາ, ຈັດສົ່ງ, ເຜີຍແຜ່, ຕິດຕາມ ແລະ ຢືນຢັນແຈ້ງເຕືອນ.

ລະບົບຖືກອອກແບບໃຫ້ເໝາະກັບບໍລິບົດແຫ່ງຊາດລາວ, ມີພາສາລາວ ແລະ ອັງກິດ, ມີ role-based access, ພ້ອມຮອງຮັບຂໍ້ມູນແຜນທີ່, ບັນທຶກການສົ່ງແຈ້ງເຕືອນ ແລະ ການຢືນຢັນຂອງອາສາສະໝັກ.

### ເປົ້າໝາຍຜະລິດຕະພັນ

- ຊ່ວຍເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມແປງຂໍ້ມູນໄພໃຫ້ເປັນຮ່າງແຈ້ງເຕືອນທາງການ.
- ບັງຄັບໃຫ້ມີການກວດທານ ແລະ ອະນຸມັດໂດຍມະນຸດກ່ອນ publish.
- ຮອງຮັບຂໍ້ຄວາມແຈ້ງເຕືອນພາສາລາວ ແລະ ອັງກິດ.
- ຕິດຕາມການສົ່ງຜ່ານ SMS, WhatsApp, Email ແລະ In-app.
- ຮອງຮັບ CSO ແລະ ອາສາສະໝັກໃນການສື່ສານຫາຊຸມຊົນທີ່ເຂົ້າເຖິງ digital ຍາກ.
- ມີລາຍງານການສົ່ງ, ການສົ່ງບໍ່ສຳເລັດ, ພື້ນທີ່ຄອບຄຸມ, ການຕອບໂຕ້ ແລະ ການຢືນຢັນ.
- ກຽມ data model ສຳລັບ PostGIS, hazard map ແລະ volunteer coverage.

### ຂອບເຂດ MVP ທີ່ມີແລ້ວ

ສິ່ງທີ່ສ້າງແລ້ວ:

- Next.js web app ພ້ອມ Tailwind CSS
- Node.js API route handlers
- Role-based permission model
- Login ແລະ role switching ແບບ demo
- ປຸ່ມປ່ຽນພາສາລາວ/ອັງກິດ
- Form ສ້າງແຈ້ງເຕືອນ
- AI-assisted alert drafting ແບບ mock
- ແກ້ໄຂຂໍ້ຄວາມພາສາອັງກິດ ແລະ ລາວ
- Approval workflow
- ບັນທຶກ SMS, WhatsApp, Email ແລະ In-app ແບບຈຳລອງ
- ການເພີ່ມອາສາສະໝັກ
- ການຢືນຢັນ ແລະ ການລາຍງານການແຈ້ງຕໍ່
- Dashboard, Map, Contacts, Reports ແລະ Settings
- PostgreSQL/PostGIS schema ແລະ seed data
- In-memory demo fallback ເມື່ອບໍ່ມີ database
- NASA GIBS satellite image layer ສຳລັບແຜນທີ່

### ໂຄງສ້າງຫຼັກ

- Frontend: Next.js, React, Tailwind CSS
- Backend: Next.js Node.js API route handlers
- Database: PostgreSQL ພ້ອມ PostGIS-ready schema
- Demo mode: seeded data ໃນ memory
- Geospatial model: alert points, hazard station points, volunteer assigned-area polygons
- Notifications: ສ້າງ delivery log ແບບຈຳລອງ
- AI: deterministic local drafting ແລະ risk-assessment mock
- Security model: role-based permission checks, demo MFA code, masked phone display, audit log table ສຳລັບ database mode

### ຂໍ້ຈຳກັດຂອງ MVP

- SMS ແລະ WhatsApp ແມ່ນບັນທຶກເທົ່ານັ້ນ, ຍັງບໍ່ສົ່ງຜ່ານ provider ຈິງ.
- AI drafting ແມ່ນ local mock, ບໍ່ແມ່ນ LLM production.
- NASA satellite map ແມ່ນ WMS image layer, ຍັງບໍ່ແມ່ນ GIS engine ແບບ interactive ເຕັມ.
- MFA ແມ່ນລະຫັດ demo, ບໍ່ແມ່ນ identity provider production.
- Demo phone encryption ແມ່ນ placeholder ແລະ ຕ້ອງປ່ຽນເປັນ encryption ຈິງ.
- ຍັງບໍ່ມີ queue worker ແລະ retry system.
- ຍັງບໍ່ມີ provider callback webhooks.
- ຄຸນນະພາບການແປພາສາລາວຕ້ອງໄດ້ຮັບການກວດຈາກຜູ້ຊ່ຽວຊານພາສາລາວ ແລະ ການສື່ສານໄພພິບັດ.

### ການພັດທະນາຕໍ່

Product ແລະ workflow:

- ເພີ່ມໜ້າ reject, revise, cancel ແລະ update alert ແບບຊັດເຈນ.
- ເພີ່ມໃບຢືນຢັນການອະນຸມັດ ຫຼື signature ຂອງເຈົ້າໜ້າທີ່.
- ເພີ່ມ inbox ສຳລັບຜູ້ຮັບແຈ້ງເຕືອນ.
- ເພີ່ມ format ປະກາດບ້ານທີ່ພິມໄດ້.
- ເພີ່ມ offline-first volunteer mobile app.
- ເພີ່ມ community radio workflow ແລະ broadcast confirmation.

Mapping ແລະ data:

- ປ່ຽນຈາກ WMS image ເປັນ Leaflet, OpenLayers ຫຼື Mapbox map.
- ເພີ່ມ PostGIS boundary layers ສຳລັບແຂວງ, ເມືອງ ແລະ ບ້ານ.
- ເພີ່ມ live DMH Lao PDR hydromet feeds.
- ເພີ່ມ flood forecasting API.
- ເພີ່ມ threshold ລະດັບນ້ຳຕາມແຂວງ ແລະ ເມືອງ.
- ເພີ່ມ historical hazard layers ແລະ incident archive.

AI:

- ເຊື່ອມຕໍ່ LLM provider ທີ່ໄດ້ຮັບອະນຸມັດ.
- ເພີ່ມ prompt templates ຕາມປະເພດໄພ.
- ເພີ່ມ confidence scoring ແລະ source-data traceability.
- ເພີ່ມຄຳສັບມາດຕະຖານພາສາລາວ.
- ເພີ່ມ guardrails ເພື່ອປ້ອງກັນການ publish ຂໍ້ຄວາມທີ່ບໍ່ປອດໄພ ຫຼື ບໍ່ຄົບ.
- ເພີ່ມ quality checks ສຳລັບສະຖານທີ່, ເວລາ, ຄວາມຮ້າຍແຮງ ແລະ ຄຳແນະນຳ.

Notifications:

- ເຊື່ອມຕໍ່ SMS gateway ຈິງ.
- ເຊື່ອມຕໍ່ Meta WhatsApp Business API.
- ເພີ່ມ email delivery provider.
- ເພີ່ມ delivery callbacks ແລະ retry queue.
- ເພີ່ມ opt-in, opt-out ແລະ consent handling.
- ເພີ່ມ rate limiting ແລະ duplicate-message protection.

Security ແລະ operations:

- ປ່ຽນ demo login ເປັນ SSO ຫຼື identity provider.
- ບັງຄັບ MFA production ສຳລັບເຈົ້າໜ້າທີ່.
- Encrypt ເບີໂທລະສັບດ້ວຍ managed keys.
- ເພີ່ມໜ້າ audit log.
- ເພີ່ມ monitoring, alerting, backup ແລະ disaster recovery.
- ເພີ່ມ CI/CD pipeline ແລະ environment promotion.
- ທົດສອບ security ແລະ data-protection review.

Localization ແລະ accessibility:

- ແປ error ແລະ validation message ໃຫ້ຄົບໃນພາສາລາວ.
- ກວດທານພາສາລາວໂດຍຜູ້ຮູ້ພາສາທ້ອງຖິ່ນ.
- ເພີ່ມ screen-reader labels ແລະ keyboard testing.
- ເພີ່ມ low-bandwidth mode ສຳລັບພື້ນທີ່ອິນເຕີເນັດຊ້າ.
- ເພີ່ມ SMS-length warnings ສຳລັບຂໍ້ຄວາມພາສາລາວ ແລະ ອັງກິດ.

## 3. ຄຳແນະນຳການທົດສອບລະບົບ

### ທົດສອບພື້ນຖານໃນເຄື່ອງ

ຈາກ project folder:

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

ເປີດ:

```text
http://127.0.0.1:3000/
```

ຜົນທີ່ຄາດໄວ້:

- Dashboard ເປີດໄດ້.
- Header ສະແດງບໍລິບົດປະເທດລາວ.
- Database mode ສະແດງ `memory-demo` ຖ້າຍັງບໍ່ຕັ້ງ `DATABASE_URL`.

### ທົດສອບແບບ production ໃນເຄື່ອງ

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3000
```

ຜົນທີ່ຄາດໄວ້:

- ແອັບເປີດທີ່ `http://127.0.0.1:3000/`.
- `/api/dashboard` ສົ່ງຂໍ້ມູນກັບມາ.

### Test 1: ປ່ຽນພາສາ

1. ເປີດແອັບ.
2. ກົດ `LO ລາວ`.
3. ກວດວ່າເມນູ, label, form ແລະ ປຸ່ມປ່ຽນເປັນພາສາລາວ.
4. ກົດ `EN`.
5. ກວດວ່າ UI ກັບໄປເປັນພາສາອັງກິດ.

Pass condition: ເມນູ ແລະ label ຫຼັກປ່ຽນພາສາໄດ້ໂດຍບໍ່ crash.

### Test 2: Role-Based Access

1. ເລືອກ `DMH Vientiane Duty Officer`.
2. ໃສ່ MFA code `246810`.
3. ກົດ `Switch role`.
4. ກວດວ່າ workflow ແຈ້ງເຕືອນໃຊ້ໄດ້.
5. ປ່ຽນເປັນ volunteer ຫຼື community member.
6. ລອງ action ສຳລັບ official ເຊັ່ນ publish.

Pass condition: official user ເຮັດ official actions ໄດ້; restricted users ໄດ້ permission error.

### Test 3: ສ້າງ, ຮ່າງ, ອະນຸມັດ ແລະ Publish Alert

1. ເຂົ້າລະບົບເປັນ `DMH Vientiane Duty Officer`.
2. ເປີດ `Alerts`.
3. ສ້າງ flood alert ສຳລັບ:
   - Province: `Khammouane`
   - District: `Thakhek`
   - Location: `Ban Nongbok and Mekong riverbank villages`
   - Channels: `SMS`, `WhatsApp`, `In-app`
4. ກົດ `Create alert`.
5. ເລືອກ alert ໃໝ່.
6. ກົດ `Generate draft`.
7. ແກ້ໄຂຂໍ້ຄວາມພາສາອັງກິດ ແລະ ພາສາລາວ.
8. ກົດ `Save`.
9. ກົດ `Send for review`.
10. ກົດ `Approve`.
11. ກົດ `Publish`.

Pass condition:

- ສະຖານະປ່ຽນຜ່ານ `Draft`, `AI Generated`, `Under Review`, `Approved` ແລະ `Published`.
- ມີ notification logs ຫຼັງ publish.
- Dashboard ແລະ Reports ປັບປຸງ.

### Test 4: ການບັນທຶກ SMS ແລະ WhatsApp ດ້ວຍເບີທົດສອບ

MVP ປັດຈຸບັນມີ volunteer ທົດສອບທີ່ເບີລົງທ້າຍ `2825`, ກົງກັບ test handset `+66 87 918 2825`.

1. ກວດວ່າ `External SMS/WhatsApp Test Device` ຢູ່ໃນ Contacts ຫຼື Volunteers.
2. ສ້າງ alert ໃນ `Khammouane` / `Thakhek`.
3. ເລືອກ channels `SMS` ແລະ `WhatsApp`.
4. Generate draft, review, approve ແລະ publish alert.
5. ເປີດ Dashboard ຫຼື Reports.
6. ຊອກຫາ delivery logs ທີ່ເບີ volunteer ລົງທ້າຍ `2825`.

Pass condition:

- ມີ SMS ແລະ WhatsApp log rows ສຳລັບ test device.
- ໃນ MVP ຈະບໍ່ມີ SMS ຫຼື WhatsApp ຈິງສົ່ງເຂົ້າໂທລະສັບ ເພາະ provider ຍັງບໍ່ໄດ້ເຊື່ອມຕໍ່.

### Test 5: ການຢືນຢັນຂອງອາສາສະໝັກ

1. ເປີດ `Volunteers`.
2. ເລືອກ published alert.
3. ເລືອກ dissemination method ເຊັ່ນ `Village loudspeaker`.
4. ໃສ່ note ເຊັ່ນ `Village head confirmed loudspeaker announcement`.
5. ກົດ `Acknowledgment` ສຳລັບ volunteer ໜຶ່ງຄົນ.
6. ກົດ `Dissemination` ສຳລັບ volunteer ອີກຄົນ.
7. ເປີດ Dashboard ຫຼື Reports.

Pass condition:

- ສະຖານະການຢືນຢັນປາກົດສຳລັບ alert ທີ່ເລືອກ.
- ອັດຕາ volunteer acknowledgment ປັບປຸງໃນ Reports.

### Test 6: Map

1. ເປີດ `Map`.
2. ກວດວ່າ NASA satellite imagery ຂຶ້ນຢູ່ດ້ານຫຼັງ marker ຂອງ Laos hazard ແລະ alert.
3. ກວດວ່າ hazard cards ສະແດງ rainfall, river level ແລະ risk classification.

Pass condition:

- ໜ້າ Map ເປີດໄດ້ໂດຍບໍ່ error.
- Marker ແລະ cards ກົງກັບຂໍ້ມູນ demo ໃນລາວ.
- ຖ້າ satellite imagery ບໍ່ຂຶ້ນ ໃຫ້ກວດ network ໄປ NASA GIBS.

### Test 7: Reports

1. Publish alert ຢ່າງໜ້ອຍ 1 ລາຍການ.
2. Submit volunteer acknowledgment ຢ່າງໜ້ອຍ 1 ລາຍການ.
3. ເປີດ `Reports`.

Pass condition:

- Delivery report ສະແດງ total ຕາມ channel.
- Failed notifications ສະແດງຖ້າມີ failure ແບບຈຳລອງ.
- Volunteer acknowledgment rate ປັບປຸງ.
- Area coverage ສະແດງຈຳນວນຕາມແຂວງ.
- Response activity notes ປາກົດ.

### Test 8: PostgreSQL/PostGIS Mode

1. ເປີດ Docker Desktop.
2. Run:

```powershell
docker compose up -d
Copy-Item .env.example .env
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

3. ເປີດ `Settings`.

Pass condition:

- Database mode ສະແດງ `postgres-postgis`.
- ຂໍ້ມູນ seed users, alerts, hazards, volunteers, notification logs ແລະ acknowledgments ສະແດງໄດ້.

### Pass/Fail Checklist

| Scenario | Expected Result |
| --- | --- |
| Meteorological officer issues flood alert | Alert ຖືກສ້າງສຳເລັດ |
| AI generates alert summary | ຂໍ້ຄວາມ ແລະ AI assessment ຖືກສ້າງ |
| Officer approves alert | ສະຖານະປ່ຽນເປັນ `Approved` |
| Alert is published | ສະຖານະປ່ຽນເປັນ `Published` |
| SMS distribution logging | ມີ SMS log rows |
| WhatsApp distribution logging | ມີ WhatsApp log rows ສຳລັບ volunteers ທີ່ໃຊ້ WhatsApp |
| Volunteer notification | Volunteers ໃນແຂວງ ຫຼື ເມືອງທີ່ກົງກັນປາກົດໃນ logs |
| Volunteer acknowledgment | ສະຖານະການຢືນຢັນປາກົດໃນ dashboard ແລະ reports |
| Dashboard updates status | Delivery ແລະ acknowledgment metrics ປັບປຸງ |
| English to Lao message editing | ຂໍ້ຄວາມລາວກວດທານ ແລະ ແກ້ໄຂແຍກໄດ້ |
| Lao to English message editing | ຂໍ້ຄວາມອັງກິດກວດທານ ແລະ ແກ້ໄຂແຍກໄດ້ |
| Failed delivery handling | Failed logs ປາກົດໃນ reports |

## 4. ການຕັ້ງຄ່າຈິງທີ່ຕ້ອງຕິດຕັ້ງສຳລັບ Production

### Software ທີ່ຕ້ອງຕິດຕັ້ງ

ສຳລັບ local development:

- Node.js 20 LTS ຫຼື ໃໝ່ກວ່າ
- npm
- Git
- Docker Desktop
- PostgreSQL 16 ພ້ອມ PostGIS ຫຼື Docker image `postgis/postgis:16-3.4`
- Browser ທັນສະໄໝ: Chrome, Edge ຫຼື Firefox

ສຳລັບ production hosting:

- Linux server, managed container platform ຫຼື cloud app service
- Node.js runtime ຫຼື container runtime
- Managed PostgreSQL ທີ່ເປີດ PostGIS
- TLS certificate ແລະ public domain
- Reverse proxy ຫຼື platform routing
- Secret manager
- Monitoring ແລະ log aggregation
- Backup ແລະ restore process

### Environment Variables

Variables ຂອງ MVP ປັດຈຸບັນ:

| Variable | ຈຸດປະສົງ |
| --- | --- |
| `DATABASE_URL` | PostgreSQL/PostGIS connection string |
| `NEXT_PUBLIC_APP_NAME` | ຊື່ app ທີ່ສະແດງໃຫ້ຜູ້ໃຊ້ |
| `OFFICIAL_MFA_DEMO_CODE` | ລະຫັດ MFA ສາທິດສຳລັບ official users |
| `SMS_GATEWAY_API_KEY` | Placeholder ສຳລັບ SMS provider credential |
| `WHATSAPP_BUSINESS_TOKEN` | Placeholder ສຳລັບ WhatsApp Business credential |

Variables ທີ່ແນະນຳສຳລັບ production:

| Variable | ຈຸດປະສົງ |
| --- | --- |
| `AI_PROVIDER_API_KEY` | Key ຂອງ AI provider ທີ່ອະນຸມັດ |
| `AI_MODEL` | ຊື່ model production |
| `SMS_GATEWAY_URL` | API endpoint ຂອງ SMS provider |
| `SMS_SENDER_ID` | Sender ID ຫຼື short code ທີ່ອະນຸມັດ |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp Business phone number ID |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Token ສຳລັບ webhook verification |
| `EMAIL_PROVIDER_API_KEY` | Credential ຂອງ email provider |
| `AUTH_ISSUER_URL` | SSO ຫຼື identity provider issuer |
| `AUTH_CLIENT_ID` | SSO client ID |
| `AUTH_CLIENT_SECRET` | SSO client secret |
| `ENCRYPTION_KEY_ID` | Key identifier ສຳລັບ encrypt ເບີໂທລະສັບ |
| `REDIS_URL` | Queue ແລະ retry backend |
| `NASA_GIBS_BASE_URL` | Optional endpoint ສຳລັບ satellite imagery |

### Database Setup

MVP ມີ:

- `db/schema.sql`
- `db/seed.sql`
- `docker-compose.yml`

ເລີ່ມ local database:

```powershell
docker compose up -d
Copy-Item .env.example .env
```

Schema ມີ:

- Users
- Alerts
- Hazard data
- Volunteers
- Notification logs
- Acknowledgments
- Response notes
- Audit logs
- PostGIS geometry columns ແລະ indexes

### ການຕັ້ງຄ່າ SMS ຈິງ

Production ຕ້ອງມີ SMS gateway ເຊັ່ນ local telecom aggregator, Twilio, AWS SNS, Vonage ຫຼື provider ທີ່ລັດຖະບານອະນຸມັດ.

ວຽກທີ່ຕ້ອງເຮັດ:

- ລົງທະບຽນ sender ID ຫຼື short code.
- ເກັບ API key ໃນ secret manager.
- ສ້າງ provider-specific send function.
- ເພີ່ມ delivery callback webhook.
- ເພີ່ມ retry ແລະ failure classification.
- ເພີ່ມ opt-out ແລະ consent policy.
- ກວດ format ເບີໂທລາວ ແລະ ເບີ cross-border.

### ການຕັ້ງຄ່າ WhatsApp ຈິງ

Production ຕ້ອງໃຊ້ Meta WhatsApp Business API ຫຼື business solution provider ທີ່ອະນຸມັດ.

ວຽກທີ່ຕ້ອງເຮັດ:

- Verify Meta Business account.
- Register WhatsApp phone number.
- ສ້າງ message templates ທີ່ອະນຸມັດ.
- ຕັ້ງ phone number ID ແລະ access token.
- ເພີ່ມ webhook ສຳລັບ delivery, read ແລະ failure events.
- ຮອງຮັບກົດ 24-hour customer care window.
- ເພີ່ມ template ເປັນພາສາລາວ ແລະ ອັງກິດ.

### ການຕັ້ງຄ່າ AI ຈິງ

Production AI ຄວນເຊື່ອມຕໍ່ຫຼັງຈາກກຳນົດນະໂຍບາຍການກວດທານທາງການແລ້ວ.

ວຽກທີ່ຕ້ອງເຮັດ:

- ເລືອກ AI provider ທີ່ອະນຸມັດ.
- ເກັບ API key ຢ່າງປອດໄພ.
- ກຳນົດ prompt templates ຕາມປະເພດໄພ.
- ເພີ່ມ source data references ໃນ output ຂອງ AI.
- ເພີ່ມ refusal ແລະ quality checks ສຳລັບ location, severity, time ແລະ action.
- ເພີ່ມຄຳສັບພາສາລາວ ແລະ human review.
- ຮັກສາ human approval ໃຫ້ເປັນຂັ້ນຕອນບັງຄັບກ່ອນ publication.

### ການຕັ້ງຄ່າ Hazard Data ຈິງ

Production ຕ້ອງໃຊ້ feeds ທາງການ ຫຼື ແຫຼ່ງຂໍ້ມູນທີ່ເຊື່ອຖືໄດ້.

Integrations ທີ່ແນະນຳ:

- Department of Meteorology and Hydrology Lao PDR hydromet feeds
- River-gauge feeds
- Rainfall station feeds
- Flood forecasting API
- Satellite rainfall ຫຼື flood products
- GIS boundary layers ລະດັບແຂວງ ແລະ ເມືອງ

### ການຕັ້ງຄ່າ Security ຈິງ

Production ຄວນມີ:

- SSO ຫຼື identity provider login
- MFA ສຳລັບ officials
- Role ແລະ permission enforcement ທີ່ແຂງແຮງ
- Encrypt ເບີໂທລະສັບດ້ວຍ managed keys
- Full audit logs ພ້ອມໜ້າກວດທານ
- TLS ທຸກບ່ອນ
- CSRF ແລະ rate-limit controls
- Backup ແລະ disaster recovery
- Data retention ແລະ privacy policy
- Security testing ກ່ອນໃຊ້ງານຈິງ

### Deployment Checklist

1. ຕິດຕັ້ງ production dependencies ດ້ວຍ `npm.cmd ci`.
2. ຕັ້ງ `DATABASE_URL` ສຳລັບ managed PostGIS.
3. Run schema migrations.
4. ຕັ້ງ real auth provider ແລະ MFA.
5. ຕັ້ງ SMS provider.
6. ຕັ້ງ WhatsApp Business API.
7. ຕັ້ງ AI provider ແລະ review guardrails.
8. ຕັ້ງ hydromet ແລະ flood feeds.
9. ຕັ້ງ monitoring, logs ແລະ backups.
10. Run full QA checklist.
11. ໄດ້ຮັບ official approval ສຳລັບ alerting workflow.
12. Deploy ຜ່ານ HTTPS.

ຄຳສັ່ງ production ທີ່ແນະນຳ:

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 0.0.0.0 --port 3000
```

ຫ້າມໃຊ້ MVP ນີ້ເພື່ອສົ່ງແຈ້ງເຕືອນຈິງໃຫ້ປະຊາຊົນ ຈົນກວ່າຈະຕິດຕັ້ງ live integrations, security controls, official approval workflow ແລະ Lao-language validation ຢ່າງຄົບຖ້ວນ.
