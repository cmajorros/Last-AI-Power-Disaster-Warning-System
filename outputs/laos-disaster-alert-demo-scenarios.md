# Laos Disaster Alert MVP Demo Scenarios

Purpose: 10-minute presentation plus live demo for the AI-powered disaster alert and last-mile communication platform for Laos.

Tone: urgent, human, dramatic, but still credible. The emotional center is simple: the alert is only successful when the most vulnerable family moves first.

## 1. Demo Story

It is late afternoon in Khammouane. Rainfall is rising upstream, the Mekong and Xe Bang Fai tributary levels are climbing, and villages near Thakhek may lose road access before night. A warning exists in the data before it exists in the household.

The demo follows the chain from forecast to action:

1. A meteorological officer sees the risk.
2. AI drafts and translates the warning.
3. A human officer reviews and approves.
4. SMS and WhatsApp delivery logs are created.
5. Volunteers acknowledge receipt and report loudspeaker or door-to-door dissemination.
6. Emergency response teams record rescue boats, pumps, shelters, and equipment needs.
7. Reports show who received the warning, who did not, and where the last mile still needs attention.

Important demo caveat: the MVP simulates SMS and WhatsApp delivery logs. Real sending requires production SMS and WhatsApp Business API configuration.

## 2. 10-Minute Run of Show

| Time | Scene | Screen | Presenter Line |
| --- | --- | --- | --- |
| 0:00-1:00 | Human stakes | Slide 1-2 | "The forecast can be early and still arrive late to the family that needs time to move." |
| 1:00-2:00 | Solution | Slide 3-4 | "This platform treats the map as human first: elders, children, volunteers, responders, and missing equipment." |
| 2:00-3:00 | Product overview | Slide 5-7 | "The MVP already has the core operating chain: AI draft, human approval, multilingual messages, notification logs, acknowledgment, and reports." |
| 3:00-7:30 | Live app demo | Web app | Walk through dashboard, alert creation, AI draft, approval, publish, reports, and volunteer acknowledgment. |
| 7:30-8:45 | User scenes | Slide 8 | "Each role sees only the part of the disaster chain they need to act on." |
| 8:45-9:30 | Future | Slide 9 | "The next step is live SMS/WhatsApp, predictive feeds, equipment registry, and offline volunteer workflows." |
| 9:30-10:00 | Close | Slide 10 | "Success is not a sent message. It is the most vulnerable family moving first." |

## 3. User Scene 1: Meteorological Officer

User: DMH Vientiane Duty Officer  
Goal: Turn hazard indicators into an official alert draft quickly.

Steps:

1. Open Dashboard.
2. Point to active alerts, rainfall level, river water level, risk classification, and NASA satellite map.
3. Open Alerts.
4. Create a flood alert:
   - Hazard: Flood
   - Province: Khammouane
   - District: Thakhek
   - Location: Ban Nongbok and Mekong riverbank villages
   - Channels: SMS, WhatsApp, In-app
5. Click Generate draft.
6. Explain that AI proposes risk level, impact summary, routing groups, channels, and bilingual messages.
7. Edit English/Lao messages if needed.
8. Send for review, approve, and publish.

Presenter line:
"AI writes the first draft, but it does not publish. The officer remains accountable."

Pass signal:
Alert status becomes Published and notification logs are generated.

## 4. User Scene 2: Emergency Response Unit

User: Khammouane PDRRMC Response Desk  
Goal: Coordinate response resources based on the official alert.

Steps:

1. Switch role to Emergency Response.
2. Open Dashboard or Map.
3. Review affected district, population, and hazard markers.
4. Add a response note:
   - "Two rescue boats staged at Thakhek district office. Request pump availability from neighboring province."
5. Open Reports to show response activity.

Presenter line:
"The contact database is not just people. It becomes response memory: teams, boats, pumps, shelters, and what can be borrowed from another region."

Pass signal:
Response note appears in Dashboard and Reports.

## 5. User Scene 3: CSO Coordinator

User: Lao Red Cross Savannakhet Coordinator  
Goal: Make sure village volunteers receive and forward the message.

Steps:

1. Switch role to CSO Coordinator.
2. Open Volunteers.
3. Confirm volunteer coverage by province and district.
4. Add or review a volunteer contact.
5. Select the published alert.
6. Prepare acknowledgment/dissemination tracking.

Presenter line:
"The CSO coordinator sees where the official system ends and the human network begins."

Pass signal:
Volunteer list and acknowledgment panel are visible.

## 6. User Scene 4: Village Volunteer

User: Ban Nongbok Village Volunteer  
Goal: Confirm receipt and report how the warning reached households.

Steps:

1. Open Volunteers.
2. Select the published alert.
3. Choose dissemination method:
   - Village loudspeaker
   - Door-to-door
   - Community radio
   - Local announcement
4. Enter note:
   - "Loudspeaker used. Elder households closest to Mekong bank checked first."
5. Click Acknowledgment or Dissemination.

Presenter line:
"A volunteer acknowledgment is the difference between hoping a message arrived and knowing someone carried it into the village."

Pass signal:
Acknowledgment status appears on Dashboard and Reports.

## 7. User Scene 5: Community Family

User: Community member or household contact  
Goal: Receive the alert early enough to prepare without waiting for a central public announcement.

Steps:

1. Show the message content in Alerts.
2. Explain the SMS/WhatsApp path:
   - Direct message to registered numbers
   - Volunteer follow-up where digital access is limited
   - Loudspeaker or door-to-door confirmation
3. Use the test phone ending 2825 as the demo contact.

Presenter line:
"The family does not need to wait for a government announcement if the alert is already verified, approved, and routed to their phone and village volunteer."

Pass signal:
Notification logs include SMS/WhatsApp entries for the matching contact or volunteer group.

## 8. Optional Scene: Equipment Borrowing From Another Region

User: Emergency response coordinator  
Goal: Identify missing equipment and request support before access roads close.

Steps:

1. Add a response note on the alert:
   - "Request two pumps and one rescue boat from Savannakhet standby team."
2. Use Contacts to show official and volunteer directories.
3. Explain future equipment registry:
   - Rescue boats
   - Water pumps
   - Shelter capacity
   - Trucks
   - Fuel
   - Medical kits
   - Available team members

Presenter line:
"In a flood, the first question is not only who is at risk. It is what is missing, where it exists, and who can move it before the road disappears."

## 9. Closing Script

"This MVP is not trying to replace government authority. It is trying to make authority faster, clearer, and closer to the household. The forecast becomes a draft. The draft becomes a human-approved alert. The alert becomes SMS, WhatsApp, volunteer action, and response coordination. The final measure is not the number of messages sent. The final measure is whether elders, children, and riverbank families move before the water arrives."

## 10. Demo Checklist

- Dashboard loads at `http://127.0.0.1:3000/`
- Language toggle works for English and Lao
- Meteorological officer can create, draft, approve, and publish
- Published alert creates notification logs
- Reports show delivery and failure status
- Volunteers can acknowledge and report dissemination
- Contacts show official directory and volunteer network
- Settings show role permissions and database mode
- Presenter clearly states SMS/WhatsApp are simulated in MVP
