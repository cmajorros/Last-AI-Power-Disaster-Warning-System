# Last AI Power Disaster Warning System Project Documentation

Version: aligned MVP documentation
Date: June 17, 2026
Live demo: https://laos-alert-mvp-siror-20260612.apac-disaste-1051.chatgpt-team.site/
GitHub repository: https://github.com/cmajorros/Last-AI-Power-Disaster-Warning-System
Local app: `http://127.0.0.1:3000/`

## Deliverable Summary

The deliverable is an MVP web application and hosted demo for an AI-powered disaster alert and last-mile communication platform for Laos. It includes a reviewed alert workflow, bilingual English/Lao interface, AI-assisted intake, localized Lao mock data, disaster-area dashboard controls, human-map analysis, contact intelligence mockups, notification logging, volunteer acknowledgment, and project/demo artifacts.

Current artifacts:

- Hosted OpenAI Sites demo.
- Next.js local MVP with PostgreSQL/PostGIS-ready schema.
- PowerPoint project deck.
- Updated demo screen recording GIF.
- English and Lao user manuals.
- English and Lao project documentation.
- Demo script and role-based scenarios.

## Problem Statement

Disaster information can arrive before an official announcement, but it is often scattered across emails, WhatsApp messages, documents, screenshots, field notes, and local observations. The delay between first signal and household action can be dangerous, especially for elders, children, patients, people with disabilities, low-lying households, factories, markets, schools, and clinics.

The platform addresses this gap by helping officials synthesize incoming information, draft bilingual alerts, approve them through a human workflow, route them by audience and geography, and track whether the warning reached the last mile.

## Pain Points Addressed

- Manual reading and rewriting of scattered crisis information.
- Slow translation between English and Lao warning messages.
- Unclear routing to elders, children, schools, clinics, factories, and volunteers.
- Difficulty knowing which businesses, factories, or equipment owners are inside a disaster area.
- Missing coordination for borrowing pumps, generators, boats, lighting, or transport from nearby regions.
- Lack of visibility into failed SMS/WhatsApp delivery and volunteer acknowledgment.
- Map rendering fragility when external imagery or network access is unavailable.

## Solution Description

A practitioner uses the system as follows:

1. Monitor Dashboard forecasts for water level, rainfall, flood probability, hail/storm outlook, and expected flood start.
2. Click a square disaster-area marker and set a watch, crisis, or disaster announcement.
3. Open Alerts and ingest a report from Gmail, WhatsApp Business webhook text, uploaded file, image, screenshot, PDF, OCR-ready document, or manual text.
4. Let OpenAI synthesize the evidence into an alert proposal when `OPENAI_API_KEY` is configured.
5. Review evidence, quality flags, target audience, recommended routing, channels, and bilingual messages.
6. Send the draft for review, approve, and publish.
7. Use Human Map to inspect vulnerable groups plus businesses and factories in the selected disaster area.
8. Use Contacts to upload mock contact sources and ask operational questions about equipment borrowing or specialist response.
9. Track SMS/WhatsApp/email/in-app logs, failed notifications, and volunteer acknowledgment in Reports.

## Key Features Now Aligned

- Dashboard disaster-area marker selection and meteorology officer announcement workflow.
- Lao-localized mock data for forecasts, disaster areas, people-first priorities, businesses, factories, volunteers, contacts, and delivery logs.
- Forecasting cards for Thakhek, Nam Khan, and Bolaven with rainfall, water-level trends, flood probability, hail/storm outlook, and expected start time.
- Human Map with selected disaster area, vulnerable groups, businesses/factories, and priority workflow.
- Contact upload mockup for handwritten images, screenshots, Excel, Word/PDF, and text files.
- Contact search assistant for equipment, hospital, school, and rescue-routing questions.
- AI intake for email, WhatsApp, documents, images, screenshots, PDFs, and OCR-ready uploads.
- Simulated SMS/WhatsApp logs in hosted demo; local provider scaffolding for real integration.

## Data And AI Requirements

Required or planned data sources:

- Incoming Gmail reports and attachments.
- WhatsApp Business webhook messages and media metadata.
- Uploaded documents, screenshots, images, PDFs, text, Word, and Excel files.
- Official hydromet and river-gauge feeds.
- Rainfall, water-level, flood, landslide, hail, and severe-storm forecasts.
- PostGIS district, village, facility, factory, market, shelter, and transport layers.
- Contact records for volunteers, rescue teams, hospitals, schools, shelters, relief partners, equipment owners, and business focal points.

Critical fields:

- Hazard type, severity, province, district, village, coordinates, start time, expected duration, water level, rainfall, probability, affected people, recommended action, target audience, channels, approval status, source evidence, confidence, quality flags, and acknowledgment status.

AI requirements:

- `OPENAI_API_KEY` and `OPENAI_INTAKE_MODEL` for OpenAI-assisted extraction and drafting.
- Guardrails that keep AI in drafting mode only; human approval remains mandatory.
- Lao glossary and terminology review for real warning language.
- Source traceability and quality flags for missing location, time, severity, or recommended action.

## Setup And Real Configuration

Local development:

```powershell
npm.cmd install
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Production-style local build:

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3000
```

PostgreSQL/PostGIS mode:

```powershell
docker compose up -d
Copy-Item .env.example .env
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Real production installation requires Node.js, Git, PostgreSQL/PostGIS, a secret manager, SSO/MFA, SMS gateway, Meta WhatsApp Business API, Gmail OAuth, monitoring, backups, and official hydromet/GIS data feeds.

## Test Set And Pass/Fail Checklist

| Test | Pass condition |
| --- | --- |
| Hosted demo opens | Dashboard loads at live URL |
| Language toggle | English and Lao labels/data switch without crash |
| Dashboard marker click | Selected disaster area changes and announcement panel updates |
| Officer announcement | Watch/crisis/disaster announcement appears in active alerts and logs |
| Forecasting | Water level, rainfall, probability, and expected start are visible |
| AI intake | Incoming report creates an AI proposal or deterministic fallback |
| Approval workflow | Alert reaches Published only after review and approval |
| Human Map | Vulnerable groups, businesses, and factories display by selected area |
| Contact upload | Mock AI extraction creates/updates a contact record |
| Contact search | Assistant recommends equipment or response contacts |
| Notification logs | SMS/WhatsApp/email/in-app logs are recorded or simulated |
| Volunteer acknowledgment | Acknowledgment appears in dashboard/reports |
| PostgreSQL mode | Settings shows `postgres-postgis` when `DATABASE_URL` is configured |

## Known Limitations

- Hosted demo is a static demo shell with simulated provider actions.
- Real SMS and WhatsApp sending require provider credentials, approved templates, delivery callbacks, and retry queues.
- Gmail polling requires Google OAuth and Gmail API setup.
- OCR and attachment extraction need production file handling, security scanning, and persistent storage.
- The hosted map is self-contained for reliability; production GIS should use PostGIS layers plus optional NASA or other imagery.
- Forecast data is mock data until connected to official hydromet feeds.
- Authentication and MFA are demo-level in the MVP.
- Lao language content requires review by qualified local reviewers before real public use.

## Open Issues And Future Improvements

- Add durable contact upload storage and AI extraction results.
- Add live Gmail polling and WhatsApp Business media download in deployment.
- Add real SMS provider integration and delivery callbacks.
- Add subscriber app so citizens can opt in for WhatsApp/SMS alerts by location.
- Add AI recommendation of contact persons and equipment owners based on disaster area.
- Add AI flood/water-level prediction using hydromet feeds and historical events.
- Add factory, school, hospital, shelter, road, ferry, and equipment GIS layers.
- Add offline volunteer mobile workflow and village bulletin print mode.
- Add official approval signatures, audit review, and production identity provider.
