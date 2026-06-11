CREATE EXTENSION IF NOT EXISTS postgis;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'meteorological_officer',
    'emergency_response',
    'cso_coordinator',
    'volunteer',
    'community_member'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE alert_status AS ENUM (
    'Draft',
    'AI Generated',
    'Under Review',
    'Approved',
    'Published',
    'Cancelled',
    'Updated',
    'Closed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE severity_level AS ENUM ('Normal', 'Watch', 'Warning', 'Emergency');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone_ciphertext text,
  phone_last4 text,
  role user_role NOT NULL,
  province text,
  district text,
  language_preference text NOT NULL DEFAULT 'en',
  two_factor_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alerts (
  id text PRIMARY KEY,
  hazard_type text NOT NULL,
  severity severity_level NOT NULL,
  status alert_status NOT NULL DEFAULT 'Draft',
  location text NOT NULL,
  province text NOT NULL,
  district text NOT NULL,
  geom geometry(Point, 4326) NOT NULL,
  affected_population integer NOT NULL DEFAULT 0,
  predicted_impact text NOT NULL,
  recommended_action text NOT NULL,
  start_time timestamptz NOT NULL,
  expected_duration text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  communication_channels text[] NOT NULL DEFAULT ARRAY[]::text[],
  message_en text NOT NULL DEFAULT '',
  message_lo text NOT NULL DEFAULT '',
  ai_assessment jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by text REFERENCES users(id),
  approved_by text REFERENCES users(id),
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS alerts_geom_gix ON alerts USING GIST (geom);
CREATE INDEX IF NOT EXISTS alerts_status_idx ON alerts(status);
CREATE INDEX IF NOT EXISTS alerts_hazard_idx ON alerts(hazard_type);

CREATE TABLE IF NOT EXISTS hazard_data (
  id text PRIMARY KEY,
  source text NOT NULL,
  hazard_type text NOT NULL,
  rainfall_level numeric NOT NULL DEFAULT 0,
  river_level numeric NOT NULL DEFAULT 0,
  location text NOT NULL,
  province text NOT NULL,
  district text NOT NULL,
  geom geometry(Point, 4326) NOT NULL,
  risk_classification severity_level NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hazard_data_geom_gix ON hazard_data USING GIST (geom);

CREATE TABLE IF NOT EXISTS volunteers (
  id text PRIMARY KEY,
  name text NOT NULL,
  phone_ciphertext text NOT NULL,
  phone_last4 text NOT NULL,
  whatsapp_enabled boolean NOT NULL DEFAULT false,
  village text NOT NULL,
  district text NOT NULL,
  province text NOT NULL,
  assigned_area geometry(Polygon, 4326),
  language_preference text NOT NULL DEFAULT 'lo',
  active boolean NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS volunteers_area_gix ON volunteers USING GIST (assigned_area);

CREATE TABLE IF NOT EXISTS notification_logs (
  id text PRIMARY KEY,
  alert_id text NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  recipient_id text NOT NULL,
  recipient_type text NOT NULL,
  channel text NOT NULL,
  status text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz,
  failed_reason text
);

CREATE INDEX IF NOT EXISTS notification_logs_alert_idx ON notification_logs(alert_id);
CREATE INDEX IF NOT EXISTS notification_logs_status_idx ON notification_logs(status);

CREATE TABLE IF NOT EXISTS acknowledgments (
  id text PRIMARY KEY,
  alert_id text NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  status text NOT NULL,
  dissemination_method text NOT NULL,
  notes text,
  timestamp timestamptz NOT NULL DEFAULT now(),
  UNIQUE(alert_id, user_id)
);

CREATE INDEX IF NOT EXISTS acknowledgments_alert_idx ON acknowledgments(alert_id);

CREATE TABLE IF NOT EXISTS response_notes (
  id text PRIMARY KEY,
  alert_id text NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  user_id text NOT NULL REFERENCES users(id),
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id text PRIMARY KEY,
  actor_id text REFERENCES users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
