# Demo Script: AI Intake From `test.txt`

Audience: project reviewers, disaster management stakeholders, pilot users  
Duration: 10 minutes  
Scenario: Lao-language crisis document to approved disaster alert

## Roles In The Demo

| Role | Demo user | What they show |
| --- | --- | --- |
| Meteorological Officer | DMH Vientiane Duty Officer | Uploads `test.txt`, uses AI intake, reviews and approves alert |
| Emergency Response Unit | Khammouane PDRRMC Response Desk | Receives published alert and adds coordination notes |
| CSO Coordinator | Lao Red Cross Savannakhet Coordinator | Monitors volunteers and area coverage |
| Community Volunteer | Ban Nongbok Village Volunteer | Acknowledges receipt and records dissemination |

## Demo Data Source

Use this file:

```text
C:\Users\siror\Documents\test.txt
```

Interpreted demo situation:

- Hazard: heavy rainfall and flood risk
- Areas: Vientiane, Luang Prabang, Khammouane, Savannakhet
- Impact: road closures, power interruption, residential flooding, temporary relocation
- Recommended action: follow official updates, avoid affected travel, prepare emergency supplies, coordinate response
- Priority groups: older people, children, schools, clinics, low-lying households, rescue teams

## 10-Minute Run Of Show

### 0:00-1:00 - Set The Stakes

Say:

> In a flood, the most dangerous time is not only when water arrives. It is the gap between the first warning signal and the moment the right person receives clear instructions. This demo shows how Laos can reduce that gap.

Show:

- Dashboard
- Active alerts
- Map context over Laos
- Delivery and acknowledgment metrics

### 1:00-2:30 - Incoming Report Arrives

Show:

- Open `Alerts`
- Find `AI intake`
- Source: `Upload/manual`
- Source reference: `test.txt - Lao crisis situation document`
- Attach `C:\Users\siror\Documents\test.txt`
- Routing notes:

```text
Prioritize older people, children, schools, clinics, low-lying households, rescue boats, and equipment support from neighboring districts.
```

Click:

```text
Analyze intake
```

Say:

> This could have arrived as a Gmail attachment, WhatsApp screenshot, field document, or OCR image. The key is that the platform can turn unstructured information into a structured alert proposal.

### 2:30-4:00 - AI Creates A Draft

Show:

- Source summary
- Evidence summary
- Target audience
- Suggested channels
- Quality flags
- Confidence

Say:

> The AI is not the authority. It is the drafting assistant. It classifies the hazard, proposes the audience, flags missing data, and drafts both messages. The human reviewer remains in control.

Click:

```text
Apply to form
Create AI draft
```

### 4:00-5:30 - Reviewer Controls The Message

Show:

- English message
- Lao message
- Severity
- Channels
- Routing groups

Edit if needed:

```text
Flood and heavy rainfall warning for affected Lao provinces. Low-lying homes, schools, market roads, and power services may be disrupted. Move older people, children, essential documents, medicines, and equipment to safe higher ground. Follow village volunteer and official instructions.
```

Click:

```text
Save
```

Say:

> The reviewer can change the message, audience, channels, and severity. This prevents automation from becoming uncontrolled publication.

### 5:30-6:45 - Approval Workflow

Click in order:

```text
Send for review
Approve
Publish
```

Show status movement:

```text
AI Generated -> Under Review -> Approved -> Published
```

Say:

> The workflow protects public trust: no warning goes out until it is approved.

### 6:45-8:00 - Last-Mile Communication

Show:

- Dashboard delivery status
- Reports
- Failed notifications
- Contacts or Volunteers

Say:

> A national alert is only useful if it reaches the last mile. The platform logs SMS, WhatsApp, email, and in-app delivery, then connects the official warning to village volunteers.

If live WhatsApp is configured, explain:

> With Meta credentials active, publishing attempts one real WhatsApp send to the configured test recipient. Without those credentials, this demo safely uses simulated logs.

### 8:00-9:00 - Volunteer Acknowledgment

Show:

- Volunteers page
- Select published alert
- Dissemination method: `Village loudspeaker`
- Note:

```text
Volunteer confirmed loudspeaker announcement and checked elderly households near the river.
```

Click:

```text
Acknowledgment
```

Say:

> The platform does not assume delivery equals safety. It asks volunteers to confirm what happened in the village.

### 9:00-10:00 - Close With Impact

Show:

- Reports
- Acknowledgment rate
- Area coverage
- Failed SMS/WhatsApp report

Say:

> The business and public-service impact is faster warning creation, clearer accountability, fewer missed households, and better coordination of rescue teams, equipment, and volunteer networks across provinces.

## Presenter Checklist

Before starting:

- Local app opens at `http://127.0.0.1:3000/`
- `.env.local` has `OPENAI_API_KEY`
- Sign in works with MFA `246810`
- `C:\Users\siror\Documents\test.txt` exists
- Browser is on the Dashboard

During the demo:

- Do not claim the test document is real.
- Do not claim SMS/WhatsApp are live unless provider credentials are configured.
- Emphasize human approval before publication.
- Emphasize Lao/English editable messages.
- Emphasize priority routing for older people, children, schools, clinics, rescue teams, and equipment support.

Pass condition:

- AI intake reads `test.txt`
- Alert draft is created
- Status reaches `Published`
- Delivery logs appear
- Volunteer acknowledgment appears
