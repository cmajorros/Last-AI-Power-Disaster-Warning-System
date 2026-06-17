# ຄູ່ມືຜູ້ໃຊ້ Last AI Power Disaster Warning System

ສະບັບ: ຊຸດທົດສອບຜູ້ໃຊ້
ວັນທີ: 17 ມິຖຸນາ 2026
ເວັບສາທິດ: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
ແອັບໃນເຄື່ອງ: `http://127.0.0.1:3000/`
GitHub: https://github.com/cmajorros/Last-AI-Power-Disaster-Warning-System

ຄູ່ມືນີ້ອະທິບາຍການໃຊ້ MVP ສໍາລັບລະບົບແຈ້ງເຕືອນໄພພິບັດ ແລະ ການສື່ສານໄປຮອດຊຸມຊົນໃນລາວ. ເວັບສາທິດໃຊ້ສໍາລັບທົດສອບຜູ້ໃຊ້. ການສົ່ງ SMS ແລະ WhatsApp ໃນເວັບສາທິດເປັນການຈໍາລອງ ຍົກເວັ້ນແຕ່ມີການຕັ້ງຄ່າ provider ຈິງໃນ local ຫຼື production.

## 1. ເປີດລະບົບ

1. ເປີດເວັບສາທິດ ຫຼື ແອັບ local.
2. ໃຊ້ເມນູດ້ານຊ້າຍເພື່ອໄປ Dashboard, Alerts, Human Map, Volunteers, Contacts, Reports ແລະ Settings.
3. ໃຊ້ປຸ່ມປ່ຽນພາສາ: `EN` ສໍາລັບອັງກິດ ແລະ `LO ລາວ` ສໍາລັບພາສາລາວ.
4. ໃນແອັບ local ໃຫ້ໃຊ້ MFA code `246810` ສໍາລັບຜູ້ໃຊ້ທາງການຕົວຢ່າງ.

## 2. Dashboard

Dashboard ແມ່ນໜ້າພາບລວມສໍາລັບເຈົ້າໜ້າທີ່ອຸຕຸນິຍົມ ແລະ ທີມຕອບໂຕ້.

ສິ່ງທີ່ເຫັນໄດ້:

- ແຈ້ງເຕືອນທີ່ກໍາລັງເປີດ ແລະ ບັນທຶກການສົ່ງ.
- ພະຍາກອນລະດັບນໍ້າຂອງ ທ່າແຂກ.
- ໂອກາດນໍ້າຖ້ວມ, ຝົນຕົກ, ຄວາມສ່ຽງໝາກເຫັບ/ພາຍຸ ແລະ ເວລາຄາດວ່າຈະເລີ່ມຖ້ວມ.
- ຈຸດສີ່ຫຼ່ຽມທີ່ກົດໄດ້ ສໍາລັບ ທ່າແຂກ, ນໍ້າຄານ ແລະ ບໍລະເວນ.
- ຊື່ພື້ນທີ່, ໄພ, ບັນທຶກການສົ່ງ ແລະ ຂໍ້ມູນພະຍາກອນເປັນພາສາລາວເມື່ອເລືອກ Lao.

ວິທີຕັ້ງປະກາດສະຖານະວິກິດ:

1. ເປີດ Dashboard.
2. ກົດຈຸດສີ່ຫຼ່ຽມໃນແຜນທີ່.
3. ກວດພື້ນທີ່, ແຂວງ, ຄວາມສ່ຽງ ແລະ ເວລາຄາດວ່າເລີ່ມ.
4. ເລືອກລະດັບ: `Watch now`, `Crisis now`, ຫຼື `Disaster now`.
5. ແກ້ໄຂຂໍ້ຄວາມປະກາດຖ້າຈໍາເປັນ.
6. ກົດ `Set announcement now`.
7. ກວດວ່າປະກາດປາກົດໃນ Active alerts ແລະ ມີ WhatsApp/SMS log ແບບຈໍາລອງ.

## 3. Alerts ແລະ AI Intake

ໜ້າ Alerts ໃຊ້ເພື່ອປ່ຽນລາຍງານທີ່ເຂົ້າມາໃຫ້ເປັນແຈ້ງເຕືອນທາງການທີ່ມະນຸດກວດທານ.

ຮອງຮັບແຫຼ່ງຂໍ້ມູນ:

- Gmail ຫຼື email.
- WhatsApp Business webhook.
- ຮູບ, screenshot, PDF, Word, Excel, text file ແລະ OCR-ready attachment.
- ຂໍ້ຄວາມທີ່ reviewer ວາງເຂົ້າເອງ.

ຂັ້ນຕອນ:

1. ເປີດ `Alerts`.
2. ໃຊ້ສ່ວນ AI intake.
3. ເລືອກ source ເຊັ່ນ `Gmail`, `WhatsApp Business`, ຫຼື `Upload/manual`.
4. ວາງລາຍງານ ຫຼື upload `C:\Users\siror\Documents\test.txt`.
5. ໃສ່ routing notes ເຊັ່ນ `Prioritize elders, children, schools, clinics, rescue boats, pumps, and factory night-shift workers.`
6. ກົດ `Analyze intake`.
7. ກວດ evidence summary, target audience, channels, confidence ແລະ quality flags.
8. ກົດ `Apply to form` ຫຼື `Create AI draft`.
9. ແກ້ໄຂຂໍ້ຄວາມອັງກິດ ແລະ ລາວ.
10. ດໍາເນີນຕາມ workflow: `Send for review`, `Approve`, `Publish`.

AI ບໍ່ເຜີຍແຜ່ແຈ້ງເຕືອນເອງ. Reviewer ສາມາດປ່ຽນພື້ນທີ່, ຄວາມຮ້າຍແຮງ, audience, channels ແລະ ຂໍ້ຄວາມກ່ອນອະນຸມັດ.

## 4. Human Map

Human Map ໃຊ້ເພື່ອເບິ່ງວ່າໃນພື້ນທີ່ໄພພິບັດມີໃຜ ແລະ ມີຫຍັງຢູ່.

- ເຂດແຄມຂອງ ທ່າແຂກ: ສ່ຽງນໍ້າຖ້ວມ, ຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ຄົນເຈັບ, ຄົນງານໂຮງງານ, ໂຮງສີ, ຕະຫຼາດ ແລະ ຈຸດຂ້າມເຮືອ.
- ບ້ານແຄມນໍ້າຄານ: ສ່ຽງນໍ້າປ່າ/ດິນເຈື່ອນ ໃກ້ໂຮງຮຽນ, ຂົວ, ເຮືອນພັກ ແລະ ຜູ້ຂັບເຮືອ.
- ພູພຽງບໍລະເວນ: ສ່ຽງໝາກເຫັບ/ພາຍຸ ສໍາລັບຄົນງານກາເຟ, ສູນພັກພິງ, ຕະຫຼາດ ແລະ ໂຮງງານ.

## 5. Contacts

Contacts ໃຊ້ເພື່ອກຽມການສື່ສານຂັ້ນສຸດທ້າຍ ແລະ ປະສານຊັບພະຍາກອນ.

- Upload ແຫຼ່ງຂໍ້ມູນ contact ເຊັ່ນ ຮູບລາຍຊື່ຂຽນມື, screenshot, Excel, Word/PDF ຫຼື text file.
- Mock AI contact intake ຈະແຍກປະເພດເປັນ volunteer, rescue team, hospital/clinic, school, shelter, relief partner, equipment owner, ຫຼື business/factory focal point.
- Contact search assistant ຊ່ວຍຕອບຄໍາຖາມເຊັ່ນ ຈະຢືມ pump, generator, boat, lighting ຫຼື ຊ່ວຍຍ້າຍຄົນເຈັບໄດ້ຈາກໃຜ.

## 6. Volunteers

1. ເປີດ `Volunteers`.
2. ເລືອກ alert ທີ່ Published.
3. ເລືອກວິທີແຈ້ງຕໍ່: loudspeaker, door-to-door, community radio, ຫຼື local announcement.
4. ໃສ່ note ເຊັ່ນ `Loudspeaker used. Elder households closest to the Mekong bank checked first.`
5. ສົ່ງ acknowledgment/dissemination.
6. ກວດ status ໃນ Dashboard ແລະ Reports.

## 7. Reports

Reports ຊ່ວຍກວດຫຼັກຖານການປະຕິບັດງານ:

- ລາຍງານການສົ່ງ alert.
- ລາຍງານ SMS/WhatsApp ທີ່ສົ່ງບໍ່ສໍາເລັດ.
- ລາຍງານ volunteer acknowledgment.
- ລາຍງານ area coverage.
- ລາຍງານ response activity.

## 8. ຂໍ້ຈໍາກັດ ແລະ ຄວາມປອດໄພ

- ເວັບສາທິດຈໍາລອງ SMS ແລະ WhatsApp logs.
- WhatsApp ຈິງຕ້ອງມີ Meta credentials, phone number ID ແລະ recipient/template settings.
- Gmail polling ຕ້ອງມີ Google OAuth credentials.
- ໃນເວັບສາທິດ OCR/AI upload ເປັນ mockup; local API ມີ scaffolding ສໍາລັບ OpenAI.
- ແຜນທີ່ໃນ hosted demo ເປັນ self-contained operational map ເພື່ອໃຫ້ render ໄດ້ສະເໝີ. NASA ຫຼື GIS layer ອື່ນໆແມ່ນງານ production integration.
- ຂໍ້ຄວາມເຕືອນພາສາລາວຕ້ອງຖືກກວດໂດຍຜູ້ຊ່ຽວຊານກ່ອນນໍາໃຊ້ຈິງ.
