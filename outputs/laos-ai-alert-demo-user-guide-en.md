# Laos AI Disaster Alert Demo User Guide

Version: AI intake demo pack  
Date: June 12, 2026  
Local app: `http://127.0.0.1:3000/`  
Demo source file: `C:\Users\siror\Documents\test.txt`

This guide explains how to demonstrate the Laos disaster alert platform using the provided `test.txt` file as incoming crisis information. The demo shows how a Lao-language document can be read by AI, converted into an alert draft, reviewed by an official, approved, and published through the last-mile communication workflow.

## Demo Goal

Show a 10-minute end-to-end workflow:

1. A crisis report arrives as a document.
2. The officer uploads `test.txt` in the Alerts page.
3. OpenAI analyzes the content and drafts a hazard alert.
4. The reviewer adjusts location, priority groups, channels, and message text.
5. The reviewer sends the alert for review, approves it, and publishes it.
6. The platform logs SMS, WhatsApp, email, and in-app delivery.
7. Volunteers acknowledge receipt and record the dissemination method.

## What The Test File Represents

`test.txt` is a Lao-language crisis test document. It describes a simulated situation where continuous heavy rainfall causes flooding risk across multiple Lao provinces, including Vientiane, Luang Prabang, Khammouane, and Savannakhet. It includes expected impacts such as temporary road closures, power disruption, flooding in residential areas, temporary relocation, and the need for emergency coordination.

Use it as an example of an incoming field document, email attachment, or WhatsApp attachment.

## Before The Demo

Confirm the local server is running:

```text
http://127.0.0.1:3000/
```

Confirm local AI settings are active:

```env
OPENAI_API_KEY=<configured locally>
OPENAI_INTAKE_MODEL=gpt-4.1-mini
```

For this demo, Gmail and WhatsApp live provider credentials are optional. Without live provider credentials, the app still demonstrates alert creation, approval, delivery logging, and volunteer acknowledgment.

## Step 1: Sign In As The Officer

1. Open `http://127.0.0.1:3000/`.
2. Select `DMH Vientiane Duty Officer`.
3. Enter MFA code `246810` if requested.
4. Click `Switch role`.
5. Confirm the top navigation shows Dashboard, Alerts, Map, Volunteers, Contacts, Reports, and Settings.

## Step 2: Open AI Intake

1. Click `Alerts`.
2. In the left panel, find `AI intake`.
3. Set `Source` to `Upload/manual`.
4. Set `Source reference` to `test.txt - Lao crisis situation document`.
5. In `Reviewer routing notes`, enter:

```text
Prioritize older people, children, schools, clinics, low-lying households, rescue boats, and equipment support from neighboring districts.
```

6. In the attachment picker, select:

```text
C:\Users\siror\Documents\test.txt
```

7. Click `Analyze intake`.

## Step 3: Review AI Output

After analysis, confirm the proposal shows:

- Hazard type such as `Flood` or `Heavy rainfall`
- Severity such as `Watch` or `Warning`
- Lao provinces or affected areas from the document
- Suggested channels including `SMS`, `WhatsApp`, and `In-app`
- Priority groups such as older people, children, schools, clinics, and rescue teams
- Quality flags if the source does not include exact population, district, or timing

Explain during the demo:

> The AI does not publish anything. It only converts unstructured crisis information into a reviewer-controlled draft.

## Step 4: Create The Alert Draft

1. Click `Apply to form`.
2. Review the alert fields.
3. Adjust the location if needed, for example:

```text
Khammouane and Mekong riverbank communities
```

4. Keep channels selected:

```text
SMS, WhatsApp, In-app
```

5. Click `Create AI draft`.
6. Select the newly created alert from the alert list.

Expected status:

```text
AI Generated
```

## Step 5: Review Messages

In the alert detail panel:

1. Check the English message.
2. Check the Lao message.
3. Edit either message if needed.
4. Click `Save`.

Suggested English message for the demo:

```text
Flood and heavy rainfall warning for affected Lao provinces. Low-lying homes, schools, market roads, and power services may be disrupted. Move older people, children, essential documents, medicines, and equipment to safe higher ground. Follow village volunteer and official instructions.
```

Suggested Lao message for the demo:

```text
ແຈ້ງເຕືອນນ້ໍາຖ້ວມ ແລະ ຝົນຕົກໜັກສໍາລັບເຂດທີ່ໄດ້ຮັບຜົນກະທົບໃນລາວ. ເຮືອນຢູ່ຕໍ່ໍາ, ໂຮງຮຽນ, ຖະໜົນຕະຫຼາດ ແລະ ໄຟຟ້າອາດຂັດຂ້ອງ. ໃຫ້ຍ້າຍຜູ້ສູງອາຍຸ, ເດັກນ້ອຍ, ເອກະສານສໍາຄັນ, ຢາ ແລະ ອຸປະກອນໄປບ່ອນສູງທີ່ປອດໄພ. ປະຕິບັດຕາມອາສາສະໝັກບ້ານ ແລະ ເຈົ້າໜ້າທີ່.
```

## Step 6: Approval Workflow

Use the buttons in this order:

1. `Send for review`
2. `Approve`
3. `Publish`

Expected status flow:

```text
AI Generated -> Under Review -> Approved -> Published
```

Explain during the demo:

> Human approval remains mandatory. AI speeds up drafting, but the official controls the final warning.

## Step 7: Check Delivery Logs

1. Open `Dashboard` or `Reports`.
2. Confirm notification logs were created.
3. Look for SMS, WhatsApp, email, and in-app channels.
4. Confirm failed notifications, if any, appear in the failed notification report.

If live WhatsApp credentials are configured, publishing attempts one real WhatsApp message to the configured test recipient. If credentials are missing, the app records simulated logs only.

## Step 8: Volunteer Acknowledgment

1. Open `Volunteers`.
2. Select the published alert.
3. Select a dissemination method:
   - Village loudspeaker
   - Door-to-door
   - Community radio
   - Local announcement
4. Enter a note, for example:

```text
Village volunteer confirmed loudspeaker announcement and checked elderly households near the river.
```

5. Click `Acknowledgment` or `Dissemination`.
6. Return to `Dashboard` or `Reports` to show acknowledgment status.

## Demo Talk Track

Use this short story while clicking:

> A disaster report arrives before a formal government announcement. It may be an email, a WhatsApp message, or a file attachment. In the old workflow, someone reads it manually, rewrites it, translates it, decides who should receive it, and then tries to coordinate volunteers. The delay is dangerous. In this platform, the officer uploads the report, AI extracts the hazard, location, impact, recommended action, and target audience. But the official still controls approval. Once approved, the platform routes messages through SMS, WhatsApp, email, in-app notifications, and the village volunteer network.

## Pass Criteria

The demo passes if:

- `test.txt` can be uploaded in AI intake.
- AI creates an alert proposal.
- Reviewer can edit the alert before approval.
- Alert status reaches `Published`.
- Delivery logs are created.
- Volunteer acknowledgment can be recorded.
- English and Lao messages are visible and editable.

## Known Limitations

- Gmail polling requires Gmail OAuth credentials.
- Real WhatsApp sending requires Meta WhatsApp Business credentials and a configured phone number ID.
- The test document is a simulation and must not be treated as a real emergency.
- Lao translations should be validated by qualified Lao disaster-risk communication reviewers before real use.
