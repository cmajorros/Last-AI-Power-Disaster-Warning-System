# Laos Disaster Alert MVP Documentation

Version: MVP user testing pack  
Date: June 11, 2026  
System URL for local testing: `http://127.0.0.1:3000/`

Important safety note: this MVP is for demonstration and user testing only. It creates simulated SMS, WhatsApp, email, and in-app delivery logs. It does not send real public alerts until production notification gateways and official approval controls are configured.

## 1. User Manual and How to Use

### Purpose

The Laos Disaster Alert MVP helps meteorological officers, emergency response teams, CSO coordinators, village volunteers, and community contacts create, approve, publish, monitor, and acknowledge disaster alerts for Laos.

Supported hazards:

- Flood
- Heavy rainfall
- Storm
- Landslide risk
- Severe weather
- Other government-approved hazards

### Open the Application

1. Open `http://127.0.0.1:3000/` in the browser.
2. Use `127.0.0.1` instead of `localhost` during local testing because another local app may already be listening on `localhost:3000`.
3. Confirm the header shows the Laos national platform context and Vientiane time zone.

### Language Toggle

1. In the top header, find `Language / ພາສາ`.
2. Select `EN` for English.
3. Select `LO ລາວ` for Lao.
4. Menus, buttons, dashboard labels, forms, and status labels change according to the selected language.
5. Alert messages are stored in separate English and Lao message fields and can be edited before publishing.

### Sign In and Role Switching

The MVP uses demo users. Select a user from the top header, enter the MFA code if needed, and click `Switch role`.

Demo MFA code: `246810`

Demo roles:

| Role | Main Capabilities |
| --- | --- |
| Meteorological Officer | Monitor hazards, create alerts, generate AI draft, review, approve, publish, view reports, add response notes |
| Emergency Response | Receive official alerts, view affected areas, track delivery, add response notes, view reports |
| CSO Coordinator | Receive alerts, manage volunteers, track volunteer acknowledgment and coverage, view reports |
| Community Volunteer | View alerts and submit acknowledgment or dissemination status |
| Community Member | View dashboard information intended for community awareness |

If a restricted role tries an action outside its permission, the API returns a permission error. This is expected and is part of role-based access testing.

### Dashboard

Use the Dashboard to see the current operational picture.

Main items:

- Active alerts
- Hazard map
- Rainfall level
- River water level
- Risk classification
- Alert delivery status
- Volunteer acknowledgment status
- Affected population estimate
- AI assessment summary
- Response notes
- Recent notification logs

To add a response note:

1. Select an alert in the `Response activity` panel.
2. Type the coordination note.
3. Click `Save`.
4. The note appears in the response activity feed and reports.

### Alerts

Use the Alerts page to create and publish an official alert.

The AI intake panel can turn incoming reports into a human-reviewable alert draft. It accepts Gmail-style text, other email text, WhatsApp Business message content, uploaded images or screenshots, PDFs, and text documents. With `OPENAI_API_KEY` configured, the system asks OpenAI to read the evidence and synthesize a draft alert, target audience, routing groups, suggested channels, English/Lao messages, confidence, and quality flags. Without the key, the MVP uses deterministic demo extraction and marks that clearly for the reviewer.

Alert creation fields:

- Hazard type
- Severity
- Location
- Province
- District
- Affected population
- Predicted impact
- Recommended action
- Start time
- Expected duration
- Communication channels: SMS, WhatsApp, Email, In-app

Recommended workflow:

1. Sign in as `DMH Vientiane Duty Officer`.
2. Open `Alerts`.
3. Fill in the alert form using Laos locations such as Khammouane, Thakhek, Savannakhet, Kaysone, Champasak, or Pakxong.
4. Select communication channels.
5. Click `Create alert`.
6. Select the new alert from the alert list.
7. Click `Generate draft`.
8. Review and edit the English and Lao alert messages.
9. Click `Save`.
10. Click `Send for review`.
11. Click `Approve`.
12. Click `Publish`.

AI intake workflow:

1. Open `Alerts`.
2. Choose the source: `Gmail`, `Other email`, `WhatsApp Business`, or `Upload/manual`.
3. Paste the incoming email, WhatsApp message, or field report text.
4. Upload screenshots, images, PDFs, or text documents if available.
5. Add reviewer routing notes, for example `Prioritize elders, children, schools, clinics, rescue boats, and neighboring district equipment`.
6. Click `Analyze intake`.
7. Review the AI proposal, quality flags, source summary, evidence summary, target audience, and suggested channels.
8. Click `Apply to form` to edit fields manually, or click `Create AI draft` to create an `AI Generated` alert.
9. Continue through `Send for review`, `Approve`, and `Publish`.

The reviewer can change severity, location, target channels, audience routing notes, and messages before approval. AI intake does not publish or send messages automatically.

Status flow:

`Draft` -> `AI Generated` -> `Under Review` -> `Approved` -> `Published` -> `Closed`

Publishing creates simulated delivery logs for matching volunteers and officials. SMS and WhatsApp logs are generated for volunteers in the same district or province. Email or in-app logs are generated for officials.

### Map

The Map page shows alerts and hazard stations over a satellite image for Laos.

Current map implementation:

- NASA GIBS WMS satellite image layer
- VIIRS/SNPP corrected reflectance true-color imagery
- Laos-focused bounding box
- Overlay markers for alerts and hazard readings

The map needs internet access from the browser to load NASA imagery. If the satellite image does not appear, check network access to `gibs.earthdata.nasa.gov`.

### Volunteers

Use the Volunteers page to add volunteers and track last-mile communication.

To add a volunteer:

1. Open `Volunteers`.
2. Enter the volunteer name.
3. Enter a phone number.
4. Select whether WhatsApp is available.
5. Enter village, district, and province.
6. Click `Add volunteer`.

To acknowledge or report dissemination:

1. Select an alert from the alert dropdown.
2. Select a method:
   - Village loudspeaker
   - Door-to-door
   - Community radio
   - Local announcement
3. Add a short note.
4. For the volunteer, click `Acknowledgment` or `Dissemination`.
5. The status appears in the dashboard and reports.

### Contacts

Use Contacts to view the official directory and village volunteer network.

The MVP masks phone numbers and shows only the last four digits. This demonstrates contact privacy and encrypted phone-number storage requirements.

### Reports

Use Reports to validate system performance.

Available reports:

- Alert delivery report
- Volunteer acknowledgment report
- Area coverage report
- Failed SMS/WhatsApp report
- Response activity report

Use this page after publishing an alert to confirm delivery and acknowledgment metrics update.

### Settings

Settings shows:

- Current user
- Current role
- Database mode
- Role permission matrix

Database mode values:

- `memory-demo`: running with seeded in-memory demo data
- `postgres-postgis`: running against PostgreSQL/PostGIS through `DATABASE_URL`

## 2. Project Statement and Further Improvement

### Project Statement

This project is an MVP web application for an AI-powered disaster alert and last-mile communication platform for Laos. It supports government and community workflows for creating, reviewing, approving, translating, routing, publishing, monitoring, and acknowledging disaster alerts.

The system is designed for a Laos national disaster communication context, with Lao and English language support, role-based access, geospatial disaster data readiness, notification delivery tracking, and volunteer last-mile acknowledgment.

### Product Objectives

- Help meteorological officers convert hazard observations into official warning drafts.
- Require human review and approval before public alert publication.
- Support bilingual English/Lao alert messages.
- Track alert delivery across SMS, WhatsApp, email, and in-app channels.
- Support CSO and volunteer last-mile communication when digital access is limited.
- Provide reports for delivery, failed notification, area coverage, response activity, and acknowledgment.
- Prepare the data model for PostGIS-based hazard mapping and geographic volunteer coverage.

### Current MVP Scope

Implemented:

- Next.js web app with Tailwind CSS
- Node.js API route handlers
- Role-based permission model
- Demo login and role switching
- English/Lao language toggle
- Alert creation form
- AI-assisted alert drafting mock
- OpenAI-ready AI intake for Gmail-style reports, WhatsApp Business webhook content, uploaded images/screenshots, PDFs, and text documents
- English and Lao message editing
- Approval workflow
- Simulated SMS, WhatsApp, email, and in-app delivery logs
- Volunteer creation
- Volunteer acknowledgment and dissemination tracking
- Dashboard, map, contacts, reports, and settings pages
- PostgreSQL/PostGIS schema and seed data
- In-memory demo fallback when no database is configured
- NASA GIBS satellite image layer for the map

### Core Architecture

- Frontend: Next.js, React, Tailwind CSS
- Backend: Next.js Node.js API route handlers
- Database: PostgreSQL with PostGIS-ready schema
- Demo mode: in-memory seeded data
- Geospatial model: alert points, hazard station points, volunteer assigned-area polygons
- Notifications: simulated delivery log generation
- AI: OpenAI Responses API intake when `OPENAI_API_KEY` is configured, with deterministic local fallback for demos
- Security model: role-based permission checks, demo MFA code, masked phone display, audit log table for database mode

### Important MVP Limitations

- SMS and WhatsApp are logged only. They are not sent through real providers yet.
- AI intake uses OpenAI only when `OPENAI_API_KEY` is configured; otherwise it falls back to deterministic demo extraction.
- Gmail is represented by a test endpoint and UI source type; production Gmail still requires Google OAuth, Gmail API scopes, and polling or Pub/Sub push setup.
- WhatsApp incoming text is represented by a webhook-shaped endpoint; production attachment OCR still requires Meta Graph API media download.
- NASA satellite map is a static WMS image layer, not a full interactive GIS engine yet.
- MFA is a demo code, not a production identity provider.
- Demo phone encryption is placeholder text and must be replaced with production encryption.
- No queue worker or retry system is implemented yet.
- No provider callback webhooks are implemented yet.
- Lao translation quality still requires review by qualified Lao-language and disaster-risk communication specialists.

### Further Improvements

Product and workflow:

- Add explicit reject, revise, cancel, and update alert screens.
- Add official publication certificates or approval signatures.
- Add user inbox for received alerts.
- Add printable village bulletin format.
- Add offline-first volunteer mobile experience.
- Add community radio workflow and broadcast confirmation.

Mapping and data:

- Replace the current WMS image with a full Leaflet, OpenLayers, or Mapbox map.
- Add PostGIS district and village boundary layers.
- Add live DMH Lao PDR hydromet feeds.
- Add flood forecasting API integration.
- Add river-gauge threshold configuration by province and district.
- Add historical hazard layers and incident archive.

AI:

- Connect to an approved LLM provider for drafting and translation.
- Add prompt templates for each hazard type.
- Add confidence scoring and source-data traceability.
- Add Lao-language terminology glossary.
- Add approval guardrails to prevent publishing unsafe or incomplete warnings.
- Add automatic quality checks for missing location, time, severity, and action instructions.

Notifications:

- Connect a real SMS gateway.
- Connect Meta WhatsApp Business API.
- Add email delivery through a transactional email provider.
- Add delivery callbacks and retry queues.
- Add opt-in, opt-out, and consent handling.
- Add rate limiting and duplicate-message protection.

Security and operations:

- Replace demo login with SSO or identity provider authentication.
- Enforce production MFA for officials.
- Encrypt phone numbers with managed keys.
- Add full audit log screens.
- Add monitoring, alerting, backups, and disaster recovery.
- Add CI/CD pipeline and environment promotion.
- Add penetration testing and data-protection review.

Localization and accessibility:

- Complete Lao translations for every dynamic error and validation message.
- Validate Lao content with local reviewers.
- Add screen-reader labels and keyboard testing.
- Add low-bandwidth mode for rural connectivity.
- Add SMS-length warnings for Lao and English messages.

## 3. Instructions to Test This System

### Basic Local Test

From the project folder:

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```text
http://127.0.0.1:3000/
```

Expected result:

- The dashboard loads.
- The header shows Laos context.
- Database mode shows `memory-demo` unless `DATABASE_URL` is configured.

### Production-Style Local Test

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3000
```

Expected result:

- The app opens at `http://127.0.0.1:3000/`.
- `/api/dashboard` returns data.

### Test 1: Language Toggle

1. Open the app.
2. Click `LO ລາວ`.
3. Confirm menus, dashboard labels, forms, and buttons change to Lao.
4. Click `EN`.
5. Confirm the interface returns to English.

Pass condition: navigation and major labels switch between English and Lao without crashing.

### Test 2: Role-Based Access

1. Select `DMH Vientiane Duty Officer`.
2. Enter MFA code `246810`.
3. Click `Switch role`.
4. Confirm alert workflow actions are available.
5. Select a volunteer or community member.
6. Try an official-only action such as publish.

Pass condition: official user can perform official actions; restricted users receive a permission error.

### Test 3: Create, Draft, Approve, and Publish an Alert

1. Sign in as `DMH Vientiane Duty Officer`.
2. Open `Alerts`.
3. Create a flood alert for:
   - Province: `Khammouane`
   - District: `Thakhek`
   - Location: `Ban Nongbok and Mekong riverbank villages`
   - Channels: `SMS`, `WhatsApp`, `In-app`
4. Click `Create alert`.
5. Select the new alert.
6. Click `Generate draft`.
7. Edit the English and Lao messages.
8. Click `Save`.
9. Click `Send for review`.
10. Click `Approve`.
11. Click `Publish`.

Pass condition:

- Status changes through `Draft`, `AI Generated`, `Under Review`, `Approved`, and `Published`.
- Notification logs are created after publish.
- Dashboard and reports update.

### Test 3A: Create an Alert From AI Intake

1. Sign in as `DMH Vientiane Duty Officer`.
2. Open `Alerts`.
3. In the AI intake panel, select `Gmail`.
4. Paste this message:

```text
Subject: Urgent flood observation in Thakhek
Village volunteers report fast rising Mekong water near schools and the morning market. Several elderly residents and children may need transport to higher ground before nightfall.
```

5. Add routing notes: `Prioritize elders, children, schools, clinics, rescue boats, and neighboring district equipment`.
6. Click `Analyze intake`.
7. Confirm the proposal includes Khammouane/Thakhek, priority groups, SMS/WhatsApp channels, and quality flags if the OpenAI key is missing.
8. Click `Apply to form`.
9. Edit any fields the reviewer wants to change.
10. Click `Create AI draft`.
11. Continue with `Send for review`, `Approve`, and `Publish`.

Pass condition:

- An `AI Generated` alert is created from the incoming report.
- The reviewer can adjust channels and routing before approval.
- Publishing still requires approval and creates only simulated notification logs in the MVP.

### Test 4: SMS and WhatsApp Logging With Test Number

The current MVP includes a test volunteer for a number ending in `2825`. Configure the full test handset number only in local or Vercel secrets.

1. Confirm `External SMS/WhatsApp Test Device` appears in Contacts or Volunteers.
2. Create an alert in `Khammouane` / `Thakhek`.
3. Select `SMS` and `WhatsApp` channels.
4. Generate draft, review, approve, and publish the alert.
5. Open Dashboard or Reports.
6. Look for delivery logs with volunteer phone ending `2825`.

Pass condition:

- SMS and WhatsApp delivery log rows are created for the test device.
- No real SMS or WhatsApp should arrive in the MVP because provider sending is not connected yet.

### Test 5: Volunteer Acknowledgment

1. Open `Volunteers`.
2. Select a published alert.
3. Select a dissemination method, for example `Village loudspeaker`.
4. Enter a note such as `Village head confirmed loudspeaker announcement`.
5. Click `Acknowledgment` for a volunteer.
6. Click `Dissemination` for another volunteer.
7. Open Dashboard or Reports.

Pass condition:

- Acknowledgment status appears for the selected alert.
- Volunteer acknowledgment rate updates in Reports.

### Test 6: Map

1. Open `Map`.
2. Confirm NASA satellite imagery loads behind the Laos hazard and alert markers.
3. Confirm hazard cards show rainfall, river level, and risk classification.

Pass condition:

- Map page loads without error.
- Hazard markers and cards correspond to Laos demo data.
- If imagery does not load, verify network access to NASA GIBS.

### Test 7: Reports

1. Publish at least one alert.
2. Submit at least one volunteer acknowledgment.
3. Open `Reports`.

Pass condition:

- Delivery report shows totals by channel.
- Failed notifications appear if any simulated failures exist.
- Volunteer acknowledgment rate updates.
- Area coverage shows province counts.
- Response activity notes appear.

### Test 8: PostgreSQL/PostGIS Mode

1. Start Docker Desktop.
2. Run:

```powershell
docker compose up -d
Copy-Item .env.example .env
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

3. Open `Settings`.

Pass condition:

- Database mode shows `postgres-postgis`.
- Seeded users, alerts, hazards, volunteers, notification logs, and acknowledgments are visible.

### Pass/Fail Checklist

| Scenario | Expected Result |
| --- | --- |
| Meteorological officer issues flood alert | Alert is created successfully |
| AI generates alert summary | Messages and AI assessment are generated |
| Officer approves alert | Status changes to `Approved` |
| Alert is published | Status changes to `Published` |
| SMS distribution logging | SMS log rows are generated |
| WhatsApp distribution logging | WhatsApp log rows are generated for WhatsApp-enabled volunteers |
| Volunteer notification | Volunteers in matching province or district appear in logs |
| Volunteer acknowledgment | Acknowledgment appears on dashboard and reports |
| Dashboard updates status | Delivery and acknowledgment metrics update |
| English to Lao message editing | Lao message can be reviewed and edited separately |
| Lao to English message editing | English message can be reviewed and edited separately |
| Failed delivery handling | Failed logs appear in reports |

## 4. Real Configuration Required for Production

### Required Software to Install

For local development:

- Node.js 20 LTS or newer
- npm
- Git
- Docker Desktop
- PostgreSQL 16 with PostGIS, or Docker image `postgis/postgis:16-3.4`
- Modern browser: Chrome, Edge, or Firefox

For production hosting:

- Linux server, managed container platform, or cloud app service
- Node.js runtime or container runtime
- Managed PostgreSQL with PostGIS enabled
- TLS certificate and public domain
- Reverse proxy or platform routing
- Secret manager
- Monitoring and log aggregation
- Backup and restore process

### Environment Variables

Current MVP variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL/PostGIS connection string |
| `NEXT_PUBLIC_APP_NAME` | Public app display name |
| `OFFICIAL_MFA_DEMO_CODE` | Demo MFA code for official users |
| `OPENAI_API_KEY` | OpenAI API key for AI intake and alert synthesis |
| `OPENAI_INTAKE_MODEL` | OpenAI model used for intake analysis |
| `SMS_GATEWAY_API_KEY` | Placeholder for SMS provider credential |
| `WHATSAPP_BUSINESS_TOKEN` | Placeholder for WhatsApp Business credential |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Token for WhatsApp webhook verification |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Business phone number ID |
| `GMAIL_CLIENT_ID` | Gmail OAuth client ID for future production integration |
| `GMAIL_CLIENT_SECRET` | Gmail OAuth client secret for future production integration |
| `GMAIL_REDIRECT_URI` | Gmail OAuth redirect URI |

Recommended production additions:

| Variable | Purpose |
| --- | --- |
| `AI_PROVIDER_API_KEY` | Approved AI provider key for drafting and translation |
| `AI_MODEL` | Production model name |
| `SMS_GATEWAY_URL` | SMS provider API endpoint |
| `SMS_SENDER_ID` | Approved sender ID or short code |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp Business phone number ID |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Webhook verification token |
| `EMAIL_PROVIDER_API_KEY` | Email provider credential |
| `AUTH_ISSUER_URL` | SSO or identity provider issuer |
| `AUTH_CLIENT_ID` | SSO client ID |
| `AUTH_CLIENT_SECRET` | SSO client secret |
| `ENCRYPTION_KEY_ID` | Key identifier for phone-number encryption |
| `REDIS_URL` | Queue and retry backend |
| `NASA_GIBS_BASE_URL` | Optional configurable satellite imagery endpoint |

### Database Setup

The MVP includes:

- `db/schema.sql`
- `db/seed.sql`
- `docker-compose.yml`

Local database startup:

```powershell
docker compose up -d
Copy-Item .env.example .env
```

Schema includes:

- Users
- Alerts
- Hazard data
- Volunteers
- Notification logs
- Acknowledgments
- Response notes
- Audit logs
- PostGIS geometry columns and indexes

### Real SMS Configuration

Production requires an SMS gateway such as a local telecom aggregator, Twilio, AWS SNS, Vonage, or a government-approved provider.

Required production work:

- Register sender ID or short code.
- Store provider API key in secret manager.
- Build provider-specific send function.
- Add delivery callback webhook.
- Add retry and failure classification.
- Add opt-out and consent policy.
- Add country and carrier formatting validation for Lao and cross-border numbers.

### Real WhatsApp Configuration

Production requires Meta WhatsApp Business API or an approved business solution provider.

Required production work:

- Verify Meta Business account.
- Register WhatsApp phone number.
- Create approved message templates.
- Configure phone number ID and access token.
- Add webhook for delivery, read, and failure events.
- Handle 24-hour customer care window rules.
- Add template language variants for Lao and English.

### Real AI Configuration

Production AI should be connected only after official review policies are agreed.

Required production work:

- Select approved AI provider.
- Store API key securely.
- Define prompt templates for each hazard type.
- Add source data references in AI output.
- Add refusal and quality checks for missing location, severity, time, and action.
- Add Lao translation glossary and human review.
- Keep human approval mandatory before publication.

### Real Hazard Data Configuration

Production requires official or trusted feeds.

Recommended integrations:

- Department of Meteorology and Hydrology Lao PDR hydromet feeds
- River-gauge feeds
- Rainfall station feeds
- Flood forecasting API
- Satellite rainfall or flood products
- Provincial and district boundary GIS layers

### Real Security Configuration

Production should include:

- SSO or identity provider login
- MFA for officials
- Strong role and permission enforcement
- Encrypted phone numbers using managed keys
- Full audit logs with review screen
- TLS everywhere
- CSRF and rate-limit controls
- Backups and disaster recovery
- Data retention and privacy policy
- Security testing before live use

### Deployment Checklist

1. Install production dependencies with `npm.cmd ci`.
2. Configure `DATABASE_URL` for managed PostGIS.
3. Run schema migrations.
4. Configure real auth provider and MFA.
5. Configure SMS provider.
6. Configure WhatsApp Business API.
7. Configure AI provider and review guardrails.
8. Configure hydromet and flood feeds.
9. Configure monitoring, logs, and backups.
10. Run full QA checklist.
11. Get official approval for alerting workflow.
12. Deploy behind HTTPS.

Recommended production command:

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 0.0.0.0 --port 3000
```

Do not use the MVP for real public warning distribution until live integrations, security controls, official approval workflow, and Lao-language validation are completed.
