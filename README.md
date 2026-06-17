# Last AI Power Disaster Warning System

AI-powered disaster alert and last-mile communication MVP for Laos. The system helps meteorology officers and response teams turn incoming disaster information into reviewed, bilingual alerts, route them to the right communities, and track last-mile acknowledgment.

- Live hosted demo: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
- GitHub repository: https://github.com/cmajorros/Last-AI-Power-Disaster-Warning-System
- Local app URL: `http://127.0.0.1:3000/`
- Demo recording: `outputs/laos-ai-alert-demo-screen-recording.gif`
- Demo MFA code: `246810`

## Current MVP Scope

- Next.js 14, Tailwind CSS, Node.js route handlers, and PostgreSQL/PostGIS-ready schema.
- Role-based access for meteorology officers, emergency response, CSO coordinators, volunteers, and community users.
- English/Lao language toggle with Lao-localized mock data for dashboard, map, alerts, contacts, volunteers, and logs.
- Dashboard with water-level forecast, rainfall, flood probability, hail/storm risk, and expected flooding start windows.
- Clickable square disaster-area markers for Thakhek, Nam Khan, and Bolaven. A meteorology officer can select a marker and set an official watch, crisis, or disaster announcement.
- Human Map showing vulnerable groups, people to mobilize first, businesses, factories, markets, schools, clinics, and local logistics points in the selected disaster area.
- Alert approval workflow: AI Generated -> Under Review -> Approved -> Published -> Closed.
- AI intake for Gmail-style reports, WhatsApp Business webhook payloads, direct text, uploaded documents, screenshots, images, PDFs, and OCR-ready attachments.
- OpenAI-assisted alert synthesis when `OPENAI_API_KEY` is configured, with deterministic demo fallback when it is not.
- SMS, WhatsApp, email, and in-app notification logging. The hosted demo simulates provider delivery; production requires real provider credentials.
- Contact upload mockup for handwritten lists, screenshots, Excel, Word/PDF, and text files. The AI contact intake classifies volunteers, rescue teams, hospitals, schools, equipment owners, shelters, and factories.
- Contact search assistant for questions such as where to borrow pumps, boats, generators, shelter space, or medical support.
- Volunteer acknowledgment tracking for loudspeaker, door-to-door, community radio, and local announcement workflows.

## Quick Start

```powershell
npm.cmd install
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Open `http://127.0.0.1:3000/`.

The app runs with seeded in-memory demo data if `DATABASE_URL` is not set. To use PostgreSQL/PostGIS:

```powershell
docker compose up -d
Copy-Item .env.example .env
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

## OpenAI, Gmail, WhatsApp, and SMS Configuration

Set secrets in `.env.local` for local testing or in the hosting provider secret manager for deployment. Do not commit real keys.

```env
OPENAI_API_KEY=sk-...
OPENAI_INTAKE_MODEL=gpt-4.1-mini
DATABASE_URL=postgres://...
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
GMAIL_QUERY=newer_than:7d
WHATSAPP_BUSINESS_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_WEBHOOK_VERIFY_TOKEN=...
WHATSAPP_TEST_RECIPIENT=66xxxxxxxxx
SMS_GATEWAY_API_KEY=...
```

The local MVP includes API scaffolding for Gmail polling and WhatsApp Business webhooks. Real WhatsApp sending requires Meta WhatsApp Business credentials, a phone number ID, and an approved template or valid customer-care window.

## Map Notes

The hosted demo uses a self-contained Laos operational map so it renders reliably in the OpenAI Sites environment. It shows clickable disaster-area markers, forecast data, selected-area details, and official announcement controls.

The local Next.js MVP still has a NASA GIBS satellite map component as a prototype option. Production should move to a full GIS stack such as Leaflet, OpenLayers, Mapbox, or ArcGIS with PostGIS boundaries, official hydromet feeds, and optional NASA satellite layers.

## Demo Flow

1. Open the hosted demo or local app.
2. Switch between `EN` and `LO ລາວ` to show localized data.
3. On Dashboard, click a square disaster-area marker such as Thakhek, choose `Crisis now` or `Disaster now`, edit the message, and set the announcement.
4. Open Alerts, run AI intake from `test.txt`, Gmail-style text, WhatsApp text, or uploaded attachments.
5. Review the AI proposal, edit English/Lao messages, send for review, approve, and publish.
6. Open Human Map to show people, businesses, and factories in the affected area.
7. Open Contacts to upload a mock contact source and use the contact search assistant for equipment borrowing.
8. Open Volunteers and Reports to show acknowledgment and delivery evidence.

## Documentation Artifacts

- `outputs/laos-ai-alert-demo-user-guide-en.md`: English user manual.
- `outputs/laos-ai-alert-demo-user-guide-lo.md`: Lao user manual.
- `outputs/laos-disaster-alert-mvp-documentation-en.md`: English project statement, setup, testing, limitations, and operations.
- `outputs/laos-disaster-alert-mvp-documentation-lo.md`: Lao project statement, setup, testing, limitations, and operations.
- `outputs/laos-ai-alert-demo-script-testtxt.md`: demo script using `test.txt` and the updated dashboard announcement workflow.
- `outputs/laos-disaster-alert-demo-scenarios.md`: role-based demo scenes.

## Safety Status

This is a prototype for demonstration and user testing. Do not use it for real public warning distribution until official data feeds, authentication, provider gateways, delivery callbacks, retry queues, audit review, privacy controls, and Lao-language warning validation are complete.
