# Last AI Power Disaster Warning System User Manual

Version: user testing pack
Date: June 17, 2026
Live demo: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
Local app: `http://127.0.0.1:3000/`
GitHub repository: https://github.com/cmajorros/Last-AI-Power-Disaster-Warning-System

This manual explains how to use the current MVP for an AI-powered disaster alert and last-mile communication platform for Laos. The hosted demo is designed for user testing; notification delivery is simulated unless real provider credentials are configured in the local or production environment.

## 1. Open The System

1. Open the live hosted demo or the local app.
2. Use the left navigation to move between Dashboard, Alerts, Human Map, Volunteers, Contacts, Reports, and Settings.
3. Use the language toggle in the top bar: `EN` for English and `LO ລາວ` for Lao.
4. In the full local app, use MFA code `246810` for official demo users.

## 2. Dashboard

The Dashboard is the command view for meteorology officers and response leads.

What you can see:

- Active alerts and notification logs.
- Water-level forecast for Thakhek Mekong gauge.
- Flood probability, rainfall, hail/storm outlook, and expected flood start window.
- Clickable square markers for Thakhek, Nam Khan, and Bolaven disaster areas.
- Lao-localized names, hazards, delivery logs, and forecast descriptions when the Lao language is selected.

How to set an official crisis announcement:

1. Open Dashboard.
2. Click a square disaster-area marker on the map.
3. Review the selected area, province, risk level, and expected start time.
4. Choose an announcement level: `Watch now`, `Crisis now`, or `Disaster now`.
5. Edit the announcement message if needed.
6. Click `Set announcement now`.
7. Confirm the announcement appears in Active alerts and a simulated WhatsApp/SMS log is created.

## 3. Alerts And AI Intake

Use Alerts to convert incoming reports into reviewed official warnings.

Supported intake sources:

- Gmail-style email reports.
- Other email text.
- WhatsApp Business webhook messages.
- Uploaded images, screenshots, PDFs, Word/Excel/text files, and OCR-ready attachments.
- Manual text pasted by a reviewer.

Workflow:

1. Open `Alerts`.
2. Use the AI intake panel.
3. Select or describe the source, such as `Gmail`, `WhatsApp Business`, or `Upload/manual`.
4. Paste the incoming report or upload the test file `C:\Users\siror\Documents\test.txt`.
5. Add reviewer routing notes, for example: `Prioritize elders, children, schools, clinics, rescue boats, pumps, and factory night-shift workers.`
6. Click `Analyze intake`.
7. Review the AI evidence summary, target audience, suggested channels, confidence, and quality flags.
8. Click `Apply to form` or `Create AI draft`.
9. Edit the English and Lao messages.
10. Use the human workflow: `Send for review`, `Approve`, and `Publish`.

AI does not publish alerts by itself. The reviewer can change location, severity, audience routing, channels, and message text before approval.

## 4. Human Map

Use Human Map to understand who and what is inside the selected disaster area.

Current mock areas:

- Thakhek riverbank zone, Khammouane: flood risk, elders, children, hospital patients, garment workers, rice mill, market, cold storage, and ferry landing risk.
- Nam Khan upstream villages, Luang Prabang: flash flood and landslide risk near schools, bridges, guesthouses, and boat operators.
- Bolaven highland storm cell, Champasak/Sekong: hail and severe storm risk for coffee workers, temporary shelters, markets, and factories.

Steps:

1. Open `Human Map`.
2. Select a disaster area from the map or area buttons.
3. Review affected people, expected start time, and people to mobilize first.
4. Review businesses and factories in the area so response teams can protect workers, stock, equipment, and transport routes.

## 5. Contacts

Use Contacts to prepare last-mile communication and resource coordination.

Current features:

- Upload a contact source such as a handwritten photo, phone screenshot, Excel roster, Word/PDF clinic list, or text file.
- The mock AI contact intake classifies contacts as volunteer, rescue team, hospital/clinic, school, shelter, relief partner, equipment owner, or business/factory focal point.
- The contact search assistant answers operational questions such as who to contact for pumps, generators, boats, lighting, clinic transfer, or school evacuation.

Example search:

`Thakhek does not have enough pumps. Who can we contact to borrow equipment?`

Expected answer: Bolikhamxay Equipment Pool for pumps/generators, plus Thakhek Rescue Unit for boats and field delivery.

## 6. Volunteers

Use Volunteers to track whether people actually received and carried the warning.

1. Open `Volunteers`.
2. Select a published alert.
3. Choose a dissemination method such as village loudspeaker, door-to-door, community radio, or local announcement.
4. Enter a note, for example: `Loudspeaker used. Elder households closest to the Mekong bank checked first.`
5. Submit acknowledgment or dissemination.
6. Confirm the status appears in Dashboard and Reports.

## 7. Reports

Use Reports to validate operational evidence:

- Alert delivery report.
- Failed SMS/WhatsApp report.
- Volunteer acknowledgment report.
- Area coverage report.
- Response activity report.

A good demo should show both successful delivery logs and at least one failed or pending item so reviewers can see follow-up risk.

## 8. Safety And Limitations

- The hosted demo simulates SMS and WhatsApp delivery logs.
- The local app can attempt live WhatsApp only when Meta credentials, phone number ID, and recipient settings are configured.
- Gmail polling requires Google OAuth credentials.
- Uploaded images/OCR are represented in the hosted demo; the local API includes OpenAI-ready scaffolding.
- The map in the hosted demo is self-contained for reliability. NASA or other satellite layers should be treated as production GIS integrations.
- Lao warning text must be reviewed by qualified Lao disaster-risk communication reviewers before real use.
