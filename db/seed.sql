INSERT INTO users (id, name, email, phone_ciphertext, phone_last4, role, province, district, language_preference, two_factor_enabled)
VALUES
  ('usr-met-1', 'Noy Phommachanh', 'noy.met@gov.la', 'demo:encrypted:+856205551001', '1001', 'meteorological_officer', 'Vientiane Capital', 'Chanthabouly', 'en', true),
  ('usr-eru-1', 'Kham Sengsavang', 'kham.response@gov.la', 'demo:encrypted:+856205551002', '1002', 'emergency_response', 'Khammouane', 'Thakhek', 'en', true),
  ('usr-cso-1', 'Maly Vongdala', 'maly.cso@example.org', 'demo:encrypted:+856205551003', '1003', 'cso_coordinator', 'Savannakhet', 'Kaysone', 'lo', false),
  ('usr-vol-1', 'Somphone Inthavong', 'somphone.vol@example.org', 'demo:encrypted:+856205551004', '1004', 'volunteer', 'Khammouane', 'Thakhek', 'lo', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO alerts (
  id, hazard_type, severity, status, location, province, district, geom,
  affected_population, predicted_impact, recommended_action, start_time,
  expected_duration, language, communication_channels, message_en, message_lo,
  ai_assessment, created_by, approved_by, published_at
)
VALUES
  (
    'ALT-1001', 'Flood', 'Warning', 'Published', 'Thakhek river communities', 'Khammouane', 'Thakhek',
    ST_SetSRID(ST_Point(104.8307, 17.4103), 4326), 18400,
    'Mekong tributaries may overtop low riverbank roads and isolate villages.',
    'Move valuables above floor level and follow village volunteer instructions.',
    now() - interval '3 hours', '18 hours', 'en', ARRAY['SMS', 'WhatsApp', 'Email', 'In-app'],
    'Flood warning for Thakhek river communities. Move valuables above floor level and avoid low crossings.',
    'ແຈ້ງເຕືອນນ້ຳຖ້ວມສຳລັບຊຸມຊົນແຄມນ້ຳເມືອງທ່າແຂກ. ຍ້າຍຂອງມີຄ່າໄວ້ທີ່ສູງ ແລະຫຼີກລ້ຽງທາງຂ້າມຕ່ຳ.',
    '{"riskScore": 78, "riskLevel": "Warning", "routingGroups": ["Khammouane ERU", "Thakhek CSO volunteers"], "qualityFlags": []}'::jsonb,
    'usr-met-1', 'usr-met-1', now() - interval '2 hours'
  ),
  (
    'ALT-1002', 'Heavy rainfall', 'Watch', 'Under Review', 'Kaysone Phomvihane district', 'Savannakhet', 'Kaysone',
    ST_SetSRID(ST_Point(104.7500, 16.5500), 4326), 9200,
    'Saturated soils may create local flooding in markets and low road sections.',
    'Prepare pumps, check drainage, and keep children away from fast runoff.',
    now() + interval '1 hour', '12 hours', 'en', ARRAY['SMS', 'WhatsApp', 'In-app'],
    'Heavy rainfall watch for Kaysone district. Monitor drains and prepare for local flooding.',
    'ເຝົ້າລະວັງຝົນຕົກໜັກສຳລັບເມືອງໄກສອນ. ກວດຕິດຕາມທໍ່ລະບາຍນ້ຳ ແລະກຽມພ້ອມຕໍ່ນ້ຳຖ້ວມທ້ອງຖິ່ນ.',
    '{"riskScore": 51, "riskLevel": "Watch", "routingGroups": ["Savannakhet CSO volunteers"], "qualityFlags": ["River gauge update is older than 2 hours"]}'::jsonb,
    'usr-met-1', null, null
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO hazard_data (
  id, source, hazard_type, rainfall_level, river_level, location, province, district, geom, risk_classification, timestamp
)
VALUES
  ('HAZ-001', 'Lao Met demo feed', 'Flood', 118.4, 7.8, 'Thakhek Station', 'Khammouane', 'Thakhek', ST_SetSRID(ST_Point(104.8307, 17.4103), 4326), 'Warning', now() - interval '20 minutes'),
  ('HAZ-002', 'Lao Met demo feed', 'Heavy rainfall', 84.7, 5.1, 'Kaysone Station', 'Savannakhet', 'Kaysone', ST_SetSRID(ST_Point(104.7500, 16.5500), 4326), 'Watch', now() - interval '35 minutes'),
  ('HAZ-003', 'Flood forecasting demo', 'Landslide risk', 132.1, 6.4, 'Pakxong Uplands', 'Champasak', 'Pakxong', ST_SetSRID(ST_Point(106.2300, 15.1800), 4326), 'Emergency', now() - interval '12 minutes')
ON CONFLICT (id) DO NOTHING;

INSERT INTO volunteers (id, name, phone_ciphertext, phone_last4, whatsapp_enabled, village, district, province, assigned_area, language_preference)
VALUES
  ('vol-001', 'Somphone Inthavong', 'demo:encrypted:+856205552001', '2001', true, 'Nong Bok', 'Thakhek', 'Khammouane', ST_GeomFromText('POLYGON((104.78 17.37,104.88 17.37,104.88 17.46,104.78 17.46,104.78 17.37))', 4326), 'lo'),
  ('vol-002', 'Viengkham Phanouvong', 'demo:encrypted:+856205552002', '2002', true, 'Phone Ngam', 'Kaysone', 'Savannakhet', ST_GeomFromText('POLYGON((104.69 16.50,104.81 16.50,104.81 16.61,104.69 16.61,104.69 16.50))', 4326), 'lo'),
  ('vol-003', 'Latsamy Keomany', 'demo:encrypted:+856205552003', '2003', false, 'Lak 35', 'Pakxong', 'Champasak', ST_GeomFromText('POLYGON((106.16 15.12,106.29 15.12,106.29 15.24,106.16 15.24,106.16 15.12))', 4326), 'lo')
ON CONFLICT (id) DO NOTHING;

INSERT INTO notification_logs (id, alert_id, recipient_id, recipient_type, channel, status, sent_at, delivered_at, failed_reason)
VALUES
  ('log-001', 'ALT-1001', 'vol-001', 'volunteer', 'SMS', 'Delivered', now() - interval '105 minutes', now() - interval '103 minutes', null),
  ('log-002', 'ALT-1001', 'vol-001', 'volunteer', 'WhatsApp', 'Delivered', now() - interval '105 minutes', now() - interval '102 minutes', null),
  ('log-003', 'ALT-1001', 'usr-eru-1', 'official', 'Email', 'Delivered', now() - interval '104 minutes', now() - interval '104 minutes', null),
  ('log-004', 'ALT-1001', 'vol-003', 'volunteer', 'SMS', 'Failed', now() - interval '104 minutes', null, 'Carrier timeout')
ON CONFLICT (id) DO NOTHING;

INSERT INTO acknowledgments (id, alert_id, user_id, status, dissemination_method, notes, timestamp)
VALUES
  ('ack-001', 'ALT-1001', 'vol-001', 'Acknowledged', 'Village loudspeaker', 'Reached riverbank households first.', now() - interval '92 minutes')
ON CONFLICT (alert_id, user_id) DO NOTHING;
