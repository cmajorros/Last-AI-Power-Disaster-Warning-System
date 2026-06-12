# ຄູ່ມືສາທິດລະບົບ Laos AI Disaster Alert

ສະບັບ: ຊຸດສາທິດ AI intake  
ວັນທີ: 12 ມິຖຸນາ 2026  
ແອັບໃນເຄື່ອງ: `http://127.0.0.1:3000/`  
ໄຟລ໌ສາທິດ: `C:\Users\siror\Documents\test.txt`

ຄູ່ມືນີ້ອະທິບາຍວິທີສາທິດລະບົບແຈ້ງເຕືອນໄພພິບັດຂອງລາວໂດຍໃຊ້ໄຟລ໌ `test.txt` ເປັນຂໍ້ມູນວິກິດທີ່ເຂົ້າມາ. ການສາທິດຈະສະແດງວ່າເອກະສານພາສາລາວຖືກ AI ອ່ານ, ປ່ຽນເປັນຮ່າງແຈ້ງເຕືອນ, ໃຫ້ເຈົ້າໜ້າທີ່ກວດທານ, ອະນຸມັດ ແລະ ເຜີຍແຜ່ຜ່ານຊ່ອງທາງສື່ສານຂັ້ນສຸດທ້າຍໄດ້ແນວໃດ.

## ເປົ້າໝາຍການສາທິດ

ສະແດງ workflow ປະມານ 10 ນາທີ:

1. ລາຍງານວິກິດເຂົ້າມາເປັນເອກະສານ.
2. ເຈົ້າໜ້າທີ່ upload `test.txt` ໃນໜ້າ Alerts.
3. OpenAI ວິເຄາະເນື້ອຫາ ແລະ ສ້າງຮ່າງແຈ້ງເຕືອນ.
4. Reviewer ປັບພື້ນທີ່, ກຸ່ມຄວາມສໍາຄັນ, ຊ່ອງທາງ ແລະ ຂໍ້ຄວາມ.
5. Reviewer ສົ່ງເຂົ້າກວດທານ, ອະນຸມັດ ແລະ ເຜີຍແຜ່.
6. ລະບົບບັນທຶກການສົ່ງ SMS, WhatsApp, email ແລະ in-app.
7. ອາສາສະໝັກຢືນຢັນການຮັບ ແລະ ບັນທຶກວິທີແຈ້ງຕໍ່.

## ໄຟລ໌ test.txt ແມ່ນຫຍັງ

`test.txt` ແມ່ນເອກະສານທົດສອບພາສາລາວ. ເນື້ອຫາອະທິບາຍສະຖານະການຈໍາລອງທີ່ຝົນຕົກໜັກຕໍ່ເນື່ອງ ແລະ ມີຄວາມສ່ຽງນ້ໍາຖ້ວມໃນຫຼາຍແຂວງ ເຊັ່ນ ວຽງຈັນ, ຫຼວງພະບາງ, ຄໍາມ່ວນ ແລະ ສະຫວັນນະເຂດ. ເນື້ອຫາລວມຜົນກະທົບເຊັ່ນ ຖະໜົນປິດຊົ່ວຄາວ, ໄຟຟ້າຂັດຂ້ອງ, ນ້ໍາຖ້ວມເຂດຢູ່ອາໄສ, ການຍ້າຍໄປສູນພັກພິງ ແລະ ການປະສານງານສຸກເສີນ.

ໃຊ້ໄຟລ໌ນີ້ເປັນຕົວຢ່າງຂອງເອກະສານຈາກພື້ນທີ່, email attachment ຫຼື WhatsApp attachment.

## ກ່ອນສາທິດ

ກວດວ່າ server ໃນເຄື່ອງເປີດຢູ່:

```text
http://127.0.0.1:3000/
```

ກວດວ່າ AI ໃຊ້ໄດ້:

```env
OPENAI_API_KEY=<configured locally>
OPENAI_INTAKE_MODEL=gpt-4.1-mini
```

ສໍາລັບການສາທິດນີ້ Gmail ແລະ WhatsApp provider credentials ບໍ່ຈໍາເປັນ. ຖ້າບໍ່ມີ credentials, ແອັບຍັງສາມາດສາທິດການສ້າງ alert, approval, delivery logs ແລະ volunteer acknowledgment ໄດ້.

## ຂັ້ນຕອນ 1: ເຂົ້າລະບົບເປັນ Officer

1. ເປີດ `http://127.0.0.1:3000/`.
2. ເລືອກ `DMH Vientiane Duty Officer`.
3. ໃສ່ MFA code `246810` ຖ້າລະບົບຖາມ.
4. ກົດ `Switch role`.
5. ກວດວ່າ navigation ມີ Dashboard, Alerts, Map, Volunteers, Contacts, Reports ແລະ Settings.

## ຂັ້ນຕອນ 2: ໃຊ້ AI Intake

1. ກົດ `Alerts`.
2. ໃນ panel ຊ້າຍ ຫາ `AI intake`.
3. ຕັ້ງ `Source` ເປັນ `Upload/manual`.
4. ຕັ້ງ `Source reference` ເປັນ `test.txt - Lao crisis situation document`.
5. ໃນ `Reviewer routing notes`, ໃສ່:

```text
Prioritize older people, children, schools, clinics, low-lying households, rescue boats, and equipment support from neighboring districts.
```

6. ໃນ attachment picker, ເລືອກ:

```text
C:\Users\siror\Documents\test.txt
```

7. ກົດ `Analyze intake`.

## ຂັ້ນຕອນ 3: ກວດຜົນຈາກ AI

ຫຼັງວິເຄາະ ໃຫ້ກວດວ່າ proposal ສະແດງ:

- Hazard type ເຊັ່ນ `Flood` ຫຼື `Heavy rainfall`
- Severity ເຊັ່ນ `Watch` ຫຼື `Warning`
- ແຂວງ ຫຼື ພື້ນທີ່ທີ່ໄດ້ຮັບຜົນກະທົບ
- Suggested channels ເຊັ່ນ `SMS`, `WhatsApp`, `In-app`
- Priority groups ເຊັ່ນ ຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ໂຮງຮຽນ, ຄລິນິກ ແລະ ທີມກູ້ໄພ
- Quality flags ຖ້າເອກະສານຂາດຈໍານວນປະຊາກອນ, ເມືອງ ຫຼື ເວລາທີ່ແນ່ນອນ

ຈຸດທີ່ຄວນເວົ້າໃນ demo:

> AI ບໍ່ເຜີຍແຜ່ alert ອັດຕະໂນມັດ. AI ພຽງແຕ່ປ່ຽນຂໍ້ມູນບໍ່ມີໂຄງສ້າງໃຫ້ເປັນຮ່າງທີ່ reviewer ຄວບຄຸມໄດ້.

## ຂັ້ນຕອນ 4: ສ້າງ Alert Draft

1. ກົດ `Apply to form`.
2. ກວດ fields ຂອງ alert.
3. ປັບ location ຖ້າຈໍາເປັນ ເຊັ່ນ:

```text
Khammouane and Mekong riverbank communities
```

4. ເລືອກ channels:

```text
SMS, WhatsApp, In-app
```

5. ກົດ `Create AI draft`.
6. ເລືອກ alert ໃໝ່ຈາກລາຍການ.

ສະຖານະທີ່ຄາດຫວັງ:

```text
AI Generated
```

## ຂັ້ນຕອນ 5: ກວດຂໍ້ຄວາມ

ໃນ alert detail panel:

1. ກວດ English message.
2. ກວດ Lao message.
3. ແກ້ໄຂຂໍ້ຄວາມຖ້າຈໍາເປັນ.
4. ກົດ `Save`.

ຂໍ້ຄວາມພາສາອັງກິດສໍາລັບ demo:

```text
Flood and heavy rainfall warning for affected Lao provinces. Low-lying homes, schools, market roads, and power services may be disrupted. Move older people, children, essential documents, medicines, and equipment to safe higher ground. Follow village volunteer and official instructions.
```

ຂໍ້ຄວາມພາສາລາວສໍາລັບ demo:

```text
ແຈ້ງເຕືອນນ້ໍາຖ້ວມ ແລະ ຝົນຕົກໜັກສໍາລັບເຂດທີ່ໄດ້ຮັບຜົນກະທົບໃນລາວ. ເຮືອນຢູ່ຕໍ່ໍາ, ໂຮງຮຽນ, ຖະໜົນຕະຫຼາດ ແລະ ໄຟຟ້າອາດຂັດຂ້ອງ. ໃຫ້ຍ້າຍຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ເອກະສານສໍາຄັນ, ຢາ ແລະ ອຸປະກອນໄປບ່ອນສູງທີ່ປອດໄພ. ປະຕິບັດຕາມອາສາສະໝັກບ້ານ ແລະ ເຈົ້າໜ້າທີ່.
```

## ຂັ້ນຕອນ 6: Approval Workflow

ໃຊ້ປຸ່ມຕາມລໍາດັບ:

1. `Send for review`
2. `Approve`
3. `Publish`

ສະຖານະທີ່ຄາດຫວັງ:

```text
AI Generated -> Under Review -> Approved -> Published
```

ຈຸດທີ່ຄວນເວົ້າໃນ demo:

> Human approval ຍັງເປັນຂັ້ນຕອນບັງຄັບ. AI ຊ່ວຍໃຫ້ຮ່າງໄວຂຶ້ນ, ແຕ່ເຈົ້າໜ້າທີ່ຄວບຄຸມຄໍາເຕືອນສຸດທ້າຍ.

## ຂັ້ນຕອນ 7: ກວດ Delivery Logs

1. ເປີດ `Dashboard` ຫຼື `Reports`.
2. ກວດວ່າມີ notification logs.
3. ຊອກຫາ channels: SMS, WhatsApp, email ແລະ in-app.
4. ກວດ failed notifications ຖ້າມີ.

ຖ້າຕັ້ງ live WhatsApp credentials ແລ້ວ, ເມື່ອ publish ລະບົບຈະພະຍາຍາມສົ່ງ WhatsApp ຈິງໄປຫາ test recipient. ຖ້າບໍ່ມີ credentials, ລະບົບຈະສ້າງ simulated logs ເທົ່ານັ້ນ.

## ຂັ້ນຕອນ 8: Volunteer Acknowledgment

1. ເປີດ `Volunteers`.
2. ເລືອກ published alert.
3. ເລືອກ dissemination method:
   - Village loudspeaker
   - Door-to-door
   - Community radio
   - Local announcement
4. ໃສ່ note:

```text
Village volunteer confirmed loudspeaker announcement and checked elderly households near the river.
```

5. ກົດ `Acknowledgment` ຫຼື `Dissemination`.
6. ກັບໄປ `Dashboard` ຫຼື `Reports` ເພື່ອສະແດງ acknowledgment status.

## ເນື້ອເວົ້າສໍາລັບ Demo

> ລາຍງານວິກິດມາຮອດກ່ອນການປະກາດທາງການ. ມັນອາດເປັນ email, WhatsApp message ຫຼື file attachment. ໃນ workflow ເກົ່າ ຕ້ອງມີຄົນອ່ານ, ຂຽນໃໝ່, ແປພາສາ, ຕັດສິນໃຈວ່າຈະສົ່ງໃຫ້ໃຜ ແລະ ປະສານອາສາສະໝັກ. ຄວາມຊ້ານັ້ນອັນຕະລາຍ. ໃນ platform ນີ້ ເຈົ້າໜ້າທີ່ upload report, AI ດຶງ hazard, location, impact, action ແລະ target audience. ແຕ່ official ຍັງອະນຸມັດກ່ອນສົ່ງສະເໝີ.

## ເງື່ອນໄຂຜ່ານ

ການສາທິດຜ່ານຖ້າ:

- Upload `test.txt` ໃນ AI intake ໄດ້.
- AI ສ້າງ alert proposal.
- Reviewer ແກ້ໄຂ alert ກ່ອນ approval ໄດ້.
- Alert status ໄປຮອດ `Published`.
- Delivery logs ຖືກສ້າງ.
- Volunteer acknowledgment ຖືກບັນທຶກ.
- English ແລະ Lao messages ສະແດງ ແລະ ແກ້ໄຂໄດ້.

## ຂໍ້ຈໍາກັດ

- Gmail polling ຕ້ອງການ Gmail OAuth credentials.
- WhatsApp ຈິງຕ້ອງການ Meta WhatsApp Business credentials ແລະ phone number ID.
- ເອກະສານທົດສອບເປັນສະຖານະການຈໍາລອງ ບໍ່ແມ່ນເຫດການຈິງ.
- ຂໍ້ຄວາມພາສາລາວຄວນຖືກກວດໂດຍຜູ້ຊ່ຽວຊານພາສາລາວ ແລະ disaster-risk communication ກ່ອນໃຊ້ຈິງ.
