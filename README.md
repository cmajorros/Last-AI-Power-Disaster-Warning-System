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
- Dashboard with active alerts, map-centered hazard view, rainfall/river indicators, risk classification, delivery status, acknowledgments, and affected population estimates.
- SMS, WhatsApp, email, and in-app notification logs with simulated delivery failures.
- Volunteer management, geographic assignment, acknowledgment capture, and dissemination method tracking.
- Reports for delivery, failed notifications, volunteer acknowledgment, area coverage, and response activity.
- PostGIS-ready schema with geospatial alert points, hazard station points, and volunteer coverage polygons.
