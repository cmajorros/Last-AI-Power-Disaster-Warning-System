INSERT INTO users (id, name, email, phone_ciphertext, phone_last4, role, province, district, language_preference, two_factor_enabled)
VALUES
  ('usr-met-1', 'DMH Vientiane Duty Officer', 'duty.dmh@monre.gov.la', 'demo:encrypted:+856205550121', '0121', 'meteorological_officer', 'Vientiane Capital', 'Sikhottabong', 'en', true),
  ('usr-eru-1', 'Khammouane PDRRMC Response Desk', 'khammouane.ndrmc@gov.la', 'demo:encrypted:+856205550214', '0214', 'emergency_response', 'Khammouane', 'Thakhek', 'en', true),
  ('usr-cso-1', 'Lao Red Cross Savannakhet Coordinator', 'savannakhet@redcrosslao.org', 'demo:encrypted:+856205550316', '0316', 'cso_coordinator', 'Savannakhet', 'Kaysone', 'lo', false),
  ('usr-vol-1', 'Ban Nongbok Village Volunteer', 'nongbok.volunteer@example.la', 'demo:encrypted:+856205550451', '0451', 'volunteer', 'Khammouane', 'Thakhek', 'lo', false),
  ('usr-community-1', 'Ban Nongbok Household Contact', 'nongbok.household@example.la', 'demo:encrypted:+856205550887', '0887', 'community_member', 'Khammouane', 'Thakhek', 'lo', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO alerts (
  id, hazard_type, severity, status, location, province, district, geom,
  affected_population, predicted_impact, recommended_action, start_time,
  expected_duration, language, communication_channels, message_en, message_lo,
  ai_assessment, created_by, approved_by, published_at
)
VALUES
  (
    'ALT-1001', 'Flood', 'Warning', 'Published', 'Ban Nongbok and Mekong riverbank villages', 'Khammouane', 'Thakhek',
    ST_SetSRID(ST_Point(104.8307, 17.4103), 4326), 18400,
    'Rising Mekong and Xe Bang Fai tributary levels may flood riverbank houses, Wat Phabat access road, and Thakhek market routes.',
    'Move families, rice stores, and livestock to higher ground; avoid ferry crossings; follow village loudspeaker instructions.',
    now() - interval '3 hours', '18 hours', 'en', ARRAY['SMS', 'WhatsApp', 'Email', 'In-app'],
    'Flood warning for Ban Nongbok and Mekong riverbank villages in Thakhek. Move families, rice stores, and livestock to higher ground and avoid ferry crossings.',
    'ແຈ້ງເຕືອນນ້ຳຖ້ວມສຳລັບບ້ານໜອງບົກ ແລະບ້ານແຄມແມ່ນ້ຳຂອງເມືອງທ່າແຂກ. ຍ້າຍຄອບຄົວ ເຂົ້າສານ ແລະສັດລ້ຽງໄປບ່ອນສູງ ແລະຫຼີກລ້ຽງການຂ້າມເຮືອ.',
    '{"riskScore": 78, "riskLevel": "Warning", "impactSummary": "18,400 people in low riverbank villages near Thakhek may face house flooding and road disruption.", "routingGroups": ["Khammouane PDRRMC", "Thakhek district rescue unit", "Ban Nongbok volunteer network"], "qualityFlags": []}'::jsonb,
    'usr-met-1', 'usr-met-1', now() - interval '2 hours'
  ),
  (
    'ALT-1002', 'Heavy rainfall', 'Watch', 'Under Review', 'Kaysone Phomvihane urban drainage zones', 'Savannakhet', 'Kaysone',
    ST_SetSRID(ST_Point(104.7500, 16.5500), 4326), 9200,
    'Heavy rain over Houay Long drainage areas may flood market lanes, school access roads, and low sections near Road 9.',
    'Clear drainage, prepare pumps, move school pickup points to higher ground, and keep children away from fast runoff.',
    now() + interval '1 hour', '12 hours', 'en', ARRAY['SMS', 'WhatsApp', 'In-app'],
    'Heavy rainfall watch for Kaysone Phomvihane urban drainage zones. Clear drains, prepare pumps, and avoid fast runoff near Road 9.',
    'ເຝົ້າລະວັງຝົນຕົກໜັກສຳລັບເຂດລະບາຍນ້ຳໃນເມືອງໄກສອນພົມວິຫານ. ກວດທໍ່ລະບາຍນ້ຳ ກຽມເຄື່ອງສູບນ້ຳ ແລະຫຼີກລ້ຽງນ້ຳໄຫຼແຮງໃກ້ທາງເລກ 9.',
    '{"riskScore": 51, "riskLevel": "Watch", "impactSummary": "Urban runoff may affect markets, school access routes, and low roads in Kaysone Phomvihane.", "routingGroups": ["Savannakhet PDRRMC", "Lao Red Cross Savannakhet", "Kaysone village volunteers"], "qualityFlags": ["Houay Long drainage sensor update is older than 2 hours"]}'::jsonb,
    'usr-met-1', null, null
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO hazard_data (
  id, source, hazard_type, rainfall_level, river_level, location, province, district, geom, risk_classification, timestamp
)
VALUES
  ('HAZ-001', 'DMH Lao PDR hydro-met feed', 'Flood', 118.4, 7.8, 'DMH Thakhek Mekong gauge', 'Khammouane', 'Thakhek', ST_SetSRID(ST_Point(104.8307, 17.4103), 4326), 'Warning', now() - interval '20 minutes'),
  ('HAZ-002', 'DMH Lao PDR rainfall feed', 'Heavy rainfall', 84.7, 5.1, 'Savannakhet Kaysone rainfall station', 'Savannakhet', 'Kaysone', ST_SetSRID(ST_Point(104.7500, 16.5500), 4326), 'Watch', now() - interval '35 minutes'),
  ('HAZ-003', 'Lao PDR flood forecasting demo', 'Landslide risk', 132.1, 6.4, 'Bolaven Plateau Pakxong station', 'Champasak', 'Pakxong', ST_SetSRID(ST_Point(106.2300, 15.1800), 4326), 'Emergency', now() - interval '12 minutes')
ON CONFLICT (id) DO NOTHING;

INSERT INTO volunteers (id, name, phone_ciphertext, phone_last4, whatsapp_enabled, village, district, province, assigned_area, language_preference)
VALUES
  ('vol-001', 'Khamla Phengsavanh', 'demo:encrypted:+856205550451', '0451', true, 'Ban Nongbok', 'Thakhek', 'Khammouane', ST_GeomFromText('POLYGON((104.78 17.37,104.88 17.37,104.88 17.46,104.78 17.46,104.78 17.37))', 4326), 'lo'),
  ('vol-002', 'Maly Chanthavong', 'demo:encrypted:+856205550627', '0627', true, 'Ban Phonsavang', 'Kaysone', 'Savannakhet', ST_GeomFromText('POLYGON((104.69 16.50,104.81 16.50,104.81 16.61,104.69 16.61,104.69 16.50))', 4326), 'lo'),
  ('vol-003', 'Sengmany Keodala', 'demo:encrypted:+856205550773', '0773', false, 'Ban Lak 35', 'Pakxong', 'Champasak', ST_GeomFromText('POLYGON((106.16 15.12,106.29 15.12,106.29 15.24,106.16 15.24,106.16 15.12))', 4326), 'lo'),
  ('vol-user-test', 'External SMS/WhatsApp Test Device', 'demo:encrypted:+66879182825', '2825', true, 'Cross-border test handset', 'Thakhek', 'Khammouane', ST_GeomFromText('POLYGON((104.78 17.37,104.88 17.37,104.88 17.46,104.78 17.46,104.78 17.37))', 4326), 'en')
ON CONFLICT (id) DO NOTHING;

INSERT INTO notification_logs (id, alert_id, recipient_id, recipient_type, channel, status, sent_at, delivered_at, failed_reason)
VALUES
  ('log-001', 'ALT-1001', 'vol-001', 'volunteer', 'SMS', 'Delivered', now() - interval '105 minutes', now() - interval '103 minutes', null),
  ('log-002', 'ALT-1001', 'vol-001', 'volunteer', 'WhatsApp', 'Delivered', now() - interval '105 minutes', now() - interval '102 minutes', null),
  ('log-003', 'ALT-1001', 'usr-eru-1', 'official', 'Email', 'Delivered', now() - interval '104 minutes', now() - interval '104 minutes', null),
  ('log-004', 'ALT-1001', 'vol-003', 'volunteer', 'SMS', 'Failed', now() - interval '104 minutes', null, 'Mountain signal outage near Bolaven Plateau')
ON CONFLICT (id) DO NOTHING;

INSERT INTO acknowledgments (id, alert_id, user_id, status, dissemination_method, notes, timestamp)
VALUES
  ('ack-001', 'ALT-1001', 'vol-001', 'Acknowledged', 'Village loudspeaker', 'Used Ban Nongbok loudspeaker and confirmed households closest to the Mekong bank.', now() - interval '92 minutes')
ON CONFLICT (alert_id, user_id) DO NOTHING;
