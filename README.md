# Laos Disaster Alert MVP

AI-assisted disaster alert and last-mile communication MVP for Laos. The app uses Next.js, Tailwind CSS, Node.js route handlers, role-based access control, bilingual English/Lao UI, Postgres/PostGIS schema, mock SMS/WhatsApp logging, and volunteer acknowledgment tracking.

## Quick Start

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

The app runs with seeded in-memory demo data if `DATABASE_URL` is not set. To use PostgreSQL/PostGIS:

```powershell
docker compose up -d
Copy-Item .env.example .env
npm.cmd run dev
```

Official demo MFA code: `246810`.

## MVP Coverage

- Login and role switching for meteorological officer, emergency response, CSO coordinator, volunteer, and community member.
- Alert creation, AI-generated drafting, Lao/English translation fields, review, approval, publish, and close workflow.
- AI intake for Gmail-style messages, WhatsApp Business webhook payloads, direct text, images/screenshots, PDFs, and text documents.
- Dashboard with active alerts, map-centered hazard view, rainfall/river indicators, risk classification, delivery status, acknowledgments, and affected population estimates.
- SMS, WhatsApp, email, and in-app notification logs with simulated delivery failures.
- Volunteer management, geographic assignment, acknowledgment capture, and dissemination method tracking.
- Reports for delivery, failed notifications, volunteer acknowledgment, area coverage, and response activity.
- PostGIS-ready schema with geospatial alert points, hazard station points, and volunteer coverage polygons.

## AI Intake Workflow

Open `/alerts` and use the AI intake panel:

1. Select `Gmail`, `Other email`, `WhatsApp Business`, or `Upload/manual`.
2. Paste the incoming report text or email body.
3. Add screenshots/images, PDFs, or text-like documents (`.txt`, `.md`, `.csv`, `.json`).
4. Add reviewer routing notes, such as priority for elders, children, schools, clinics, rescue boats, or neighboring district support.
5. Click `Analyze intake`.
6. Review the target audience, quality flags, channels, and generated alert fields.
7. Click `Apply to form` to edit the draft manually, or `Create AI draft` to create an `AI Generated` alert.
8. Continue with `Send for review`, `Approve`, and `Publish`.

Publishing still requires the existing human approval workflow. AI intake never sends WhatsApp/SMS messages directly.

## OpenAI Configuration

Set these values in `.env` for live AI synthesis:

```powershell
OPENAI_API_KEY=sk-...
OPENAI_INTAKE_MODEL=gpt-4.1-mini
```

If `OPENAI_API_KEY` is missing or the OpenAI request fails, the app falls back to deterministic demo extraction and shows a quality flag to the reviewer.

The server uses the OpenAI Responses API directly through `fetch`. Images/screenshots are sent as vision inputs, PDFs are sent as file inputs, and text documents are extracted locally before analysis.

## Gmail and WhatsApp Integration

Current MVP endpoints:

- `POST /api/intake/analyze`: multipart form-data from the Alerts UI.
- `POST /api/intake/gmail`: JSON test endpoint for Gmail-like messages with `from`, `subject`, `snippet`, `body`, and `targetAudienceNotes`.
- `POST /api/intake/gmail/poll`: live Gmail polling test. Reads the latest Gmail message matching `GMAIL_QUERY`, analyzes it, and creates an `AI Generated` alert for review.
- `GET /api/intake/whatsapp`: WhatsApp Business webhook verification using `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.
- `POST /api/intake/whatsapp`: extracts WhatsApp text, image captions, document captions, and media IDs for alert synthesis.

Production Gmail requires Google OAuth, Gmail API scopes, and either polling or Pub/Sub push notifications. Production WhatsApp media OCR requires Meta Graph API media download using `WHATSAPP_BUSINESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`.

### Live Email-to-WhatsApp Test

This path is intentionally opt-in because it can send a real WhatsApp message.

Required local or Vercel secrets:

```powershell
OPENAI_API_KEY=sk-...
OPENAI_INTAKE_MODEL=gpt-4.1-mini
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
GMAIL_QUERY=newer_than:7d
WHATSAPP_BUSINESS_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_TEST_RECIPIENT=66xxxxxxxxx
WHATSAPP_GRAPH_API_VERSION=v23.0
```

Optional template mode:

```powershell
WHATSAPP_ALERT_TEMPLATE_NAME=your_approved_template
WHATSAPP_TEMPLATE_LANGUAGE=en_US
```

Test flow:

1. Send a disaster report email to the connected Gmail inbox.
2. Call `POST /api/intake/gmail/poll`.
3. Confirm the response creates an `AI Generated` alert.
4. Review the alert in `/alerts`.
5. Click `Send for review`, `Approve`, then `Publish`.
6. On publish, the app still creates simulated delivery logs, and also attempts one real WhatsApp send to `WHATSAPP_TEST_RECIPIENT`.
7. Check Reports or Dashboard for a `WhatsApp` log with recipient `whatsapp-test-recipient`.

Meta WhatsApp may reject free-form text if the recipient has not messaged the business within the allowed customer-care window. For production alerts, use an approved WhatsApp message template with parameters.
