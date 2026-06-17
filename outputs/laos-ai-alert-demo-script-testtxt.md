# Demo Script: AI Intake, Dashboard Crisis Announcement, And Last-Mile Response

Audience: project reviewers, disaster management stakeholders, pilot users
Duration: 10 minutes
Scenario: Lao crisis information becomes a reviewed alert and local action
Live demo: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
Demo recording: `outputs/laos-ai-alert-demo-screen-recording.gif`

## Roles In The Demo

| Role | Demo user | What they show |
| --- | --- | --- |
| Meteorology Officer | DMH Vientiane Duty Officer | Clicks disaster-area marker, sets crisis announcement, uses AI intake, approves alert |
| Emergency Response Unit | Khammouane PDRRMC Response Desk | Reviews affected area, businesses, equipment needs, and response logs |
| CSO Coordinator | Lao Red Cross Coordinator | Reviews volunteer coverage and acknowledgment |
| Village Volunteer | Ban Nongbok volunteer | Confirms loudspeaker/door-to-door dissemination |
| Community Contact | Registered household or business focal point | Receives SMS/WhatsApp-style alert log |

## Demo Data Source

Use `C:\Users\siror\Documents\test.txt` for the local AI intake scene. It represents a Lao-language crisis document with heavy rainfall, flood risk, road closure, power interruption, relocation, and coordination needs across Lao provinces.

## 10-Minute Run Of Show

### 0:00-1:00 - Human Stakes

Say:

> The water does not wait for a perfect announcement. The first warning may arrive as an email, a WhatsApp photo, or a handwritten note. The question is whether the family, the school, and the rescue team get a clear message in time.

Show Dashboard, water-level forecast, flood probability, expected flood start, and Lao language toggle.

### 1:00-2:15 - Meteorology Officer Declares A Crisis

1. Click the square Thakhek disaster-area marker.
2. Review the selected area, risk, province, and expected start.
3. Set announcement level to `Crisis now` or `Disaster now`.
4. Edit the message if needed.
5. Click `Set announcement now`.

Say:

> This is the moment the dashboard becomes operational. The officer is not only looking at the map; she is declaring what the map means for people.

Pass signal: announcement appears in Active alerts and a WhatsApp/SMS log is created.

### 2:15-3:30 - AI Intake From Incoming Information

Show Alerts and explain Gmail, WhatsApp Business, uploaded documents, images, screenshots, PDFs, OCR-ready files, and manual text. For local demo, upload `test.txt`.

Routing note:

`Prioritize elders, children, schools, clinics, rescue boats, pumps, rice mill workers, garment workshop transport, and village loudspeakers.`

Say:

> AI reads unstructured crisis information and turns it into a structured alert proposal. It is a drafting assistant, not the authority.

### 3:30-5:00 - Reviewer Controls The Alert

Show evidence summary, target audience, quality flags, suggested channels, English and Lao messages.

Click:

1. `Apply to form` or `Create AI draft`.
2. Edit location, severity, channels, and bilingual messages.
3. `Send for review`.
4. `Approve`.
5. `Publish`.

Say:

> The system speeds up drafting, but public trust stays with the reviewer. Nothing goes out until a human approves it.

### 5:00-6:30 - Human Map: Who Moves First

Show Human Map, selected disaster area, people to mobilize first, and businesses/factories.

Say:

> A disaster area is not just a polygon. It contains elders, children, patients, workers, schools, markets, rice stock, boats, pumps, and roads that may disappear before night.

### 6:30-7:45 - Contacts And Equipment Search

Show Contacts, upload a mock contact source, run AI detect, and ask: `Thakhek does not have enough pumps. Who can we contact to borrow equipment?`

Say:

> The contact database becomes operational memory: who can help, where they are, what equipment they have, and who should be called first.

### 7:45-8:45 - Volunteer Acknowledgment

Show Volunteers and submit loudspeaker or door-to-door acknowledgment.

Say:

> Delivery is not safety. Safety begins when someone confirms the message reached the household.

### 8:45-10:00 - Reports And Close

Show delivery logs, failed SMS/WhatsApp report, and acknowledgment status.

Say:

> The impact is not just faster messages. It is earlier movement for elders and children, clearer coordination for factories and schools, and faster requests for boats, pumps, shelters, and rescue teams.

## Presenter Checklist

- Live site or local app opens.
- Language toggle works.
- Dashboard marker click works.
- Crisis announcement creates active alert/log.
- AI intake explains Gmail, WhatsApp, documents, images, screenshots, OCR, and upload.
- Human approval is emphasized.
- Human Map shows people and businesses/factories.
- Contacts shows AI upload/search mockup.
- Volunteers and Reports show acknowledgment and delivery evidence.
- State clearly: hosted demo simulates provider sending.
