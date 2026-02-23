🚀 SAMS — Smart Attendance Management System

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/node.js-18.x-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/mongodb-Atlas-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/react-18.x-61DAFB.svg" alt="React">
  <img src="https://img.shields.io/badge/license-Proprietary-red.svg" alt="License">
  <img src="https://img.shields.io/badge/made_in-Kenya-green?style=flat" alt="Made in Kenya">
</p>

<p align="center">
  <b>🔥 🇰🇪 TËÇH💻WØRLD🌍🔥 🇰🇪 🚀KE</b>
</p>

<p align="center">
  <i>Enterprise-Grade Attendance Solution | Multi-School | Biometric-Ready | GPS-Validated | Offline-First</i>
</p>

---

📋 Table of Contents

· Overview
· System Architecture
· Multi-School Licensing
· User Roles & Capabilities
· Core Modules
· Attendance Methods
· Registration System
· Offline Architecture
· Tech Stack
· Security Features
· Deployment
· Project Structure
· Environment Setup
· API Overview
· Commercial Model
· Roadmap
· Developer
· License

---

🎯 Overview

SAMS (Smart Attendance Management System) is a comprehensive, multi-school enterprise-grade attendance platform built to eliminate attendance fraud and digitize institutional operations. It provides secure, session-based attendance management with biometric verification, GPS validation, QR scanning, and full mobile integration support.

🎯 Core Objectives

· ✅ Eliminate fake attendance through multi-layer validation
· ✅ Real-time tracking per session
· ✅ Support multiple schools with complete data isolation
· ✅ Provide secure role-based control
· ✅ Enable cloud deployment (VPS ready)
· ✅ Scale to biometric & mobile integrations

---

🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAMS ECOSYSTEM                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SUPER ADMIN (Invisible Layer)              │   │
│  │              super.sams.ke (Private Access)             │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MAIN PLATFORM                         │   │
│  │                    sams.ke                               │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                     │
│        ┌───────────────────┼───────────────────┐               │
│        ▼                   ▼                   ▼               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   SCHOOL 1  │    │   SCHOOL 2  │    │   SCHOOL N  │         │
│  │  (Isolated) │    │  (Isolated) │    │  (Isolated) │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                USER ROLES HIERARCHY                      │   │
│  │                                                          │   │
│  │        ┌─────────────────────────────┐                 │   │
│  │        │        SUPER ADMIN          │                 │   │
│  │        │      (System Owner)         │                 │   │
│  │        └──────────────┬──────────────┘                 │   │
│  │                       │ Creates License                │   │
│  │                       ▼                                │   │
│  │        ┌─────────────────────────────┐                 │   │
│  │        │       SCHOOL ADMIN          │                 │   │
│  │        │   (License Activation)      │                 │   │
│  │        └──────────────┬──────────────┘                 │   │
│  │                       │ Creates                        │   │
│  │        ┌──────────────┴──────────────┐                 │   │
│  │        ▼                              ▼                 │   │
│  │  ┌─────────────┐              ┌─────────────┐           │   │
│  │  │     HOD     │              │  Timetable  │           │   │
│  │  │ (Dept Head) │              │ Management  │           │   │
│  │  └──────┬──────┘              └─────────────┘           │   │
│  │         │ Creates                                       │   │
│  │         ▼                                               │   │
│  │  ┌─────────────┐                                       │   │
│  │  │   TEACHER   │                                       │   │
│  │  └──────┬──────┘                                       │   │
│  │         │ Creates via Links                            │   │
│  │         ▼                                               │   │
│  │  ┌─────────────┐                                       │   │
│  │  │   STUDENT   │                                       │   │
│  │  │ (Self-Reg)  │                                       │   │
│  │  └─────────────┘                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

🔑 Multi-School Licensing

SAMS operates on a secure license-based multi-tenancy model.

License Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    LICENSE JOURNEY                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  STEP 1: SUPER ADMIN                                              │
│  ┌─────────────────────────────────────────────┐                │
│  │ Generate License Key: MTTI-2026-X9K2-4B7A   │                │
│  │ Send to School Admin (Email/WhatsApp)       │                │
│  └─────────────────────────────────────────────┘                │
│                           │                                       │
│                           ▼                                       │
│  STEP 2: SCHOOL SETUP (ONE TIME)                                 │
│  ┌─────────────────────────────────────────────┐                │
│  │ Admin visits: sams.ke/activate              │                │
│  │                                              │                │
│  │ 1. Enter License Key                         │                │
│  │ 2. Choose SCHOOL CODE: "mukiria"            │                │
│  │ 3. Create Admin Account                       │                │
│  │ 4. Complete School Profile                    │                │
│  └─────────────────────────────────────────────┘                │
│                           │                                       │
│                           ▼                                       │
│  STEP 3: LICENSE LOCKED                                          │
│  ┌─────────────────────────────────────────────┐                │
│  │ Status: USED - Cannot be used again         │                │
│  │ Linked to: School                           │                │
│  │ Activated: Timestamp                         │                │
│  └─────────────────────────────────────────────┘                │
│                           │                                       │
│                           ▼                                       │
│  STEP 4: DAILY LOGIN (ALL USERS)                                 │
│  ┌─────────────────────────────────────────────┐                │
│  │ ALL users go to: sams.ke/login              │                │
│  │                                              │                │
│  │ School Code: [school-code]                   │                │
│  │ Username: [email OR admission]               │                │
│  │ Password: [user password]                    │                │
│  └─────────────────────────────────────────────┘                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

License Features Matrix

Feature Trial Basic Professional Enterprise
Duration 14 days Monthly/Yearly Monthly/Yearly Yearly
Price Free KES 5K/month KES 15K/month KES 300K/year
Max Students 50 500 2,000 Unlimited
Max Teachers 10 50 200 Unlimited
QR Attendance ✅ ✅ ✅ ✅
Manual Marking ✅ ✅ ✅ ✅
GPS Validation ✅ ✅ ✅ ✅
Biometric ❌ ❌ ✅ ✅
Advanced Reports ❌ ✅ ✅ ✅
API Access ❌ ✅ ✅ ✅
Custom Branding ❌ ❌ ❌ ✅

---

👥 User Roles & Capabilities

👑 Developer (Super Admin - Invisible Role)

· Generates school license keys
· Controls system-level permissions
· Issues licenses privately
· Does not appear in school dashboards
· Access: super.sams.ke (private, invisible to others)
· Full system monitoring and audit
· Payment tracking and revenue reports

🛡️ Admin (School Level)

Full system control within a school:

User Management:

· Create Departments
· Add/Manage HODs
· Add/Manage Teachers
· Add/Manage Students (individual or bulk)

Academic Control:

· Assign HOD to departments
· Modify Timetables (full control)
· Configure attendance rules:
  · Late thresholds
  · GPS radius
  · Session timing limits

Reports & Communication:

· Generate attendance reports (PDF/Excel)
· Send school-wide notifications
· View system audit logs

🧑‍💼 HOD (Head of Department)

Department-level authority:

User Management:

· Create teachers in their department
· Add students to department
· Generate registration links for teachers

Monitoring:

· View departmental reports
· Audit attendance anomalies
· Monitor teacher performance

Communication:

· Send notifications to department
· Notify specific classes

👩‍🏫 Teacher

Session Management:

· Start and end attendance sessions
· Generate QR codes (auto-refreshing)
· Monitor live attendance

Attendance Methods:

· QR scanning (students self-register)
· Manual marking (tap student names)
· Biometric scanning (face/fingerprint via teacher phone)

Student Management:

· Generate registration links for students
· Add students manually (special cases)
· View class reports

Communication:

· Send notifications to assigned class

👨‍🎓 Student

· Login to portal (school code + admission number)
· Scan QR code for attendance
· View personal attendance records
· Register biometrics (face/fingerprint)
· Receive school notifications
· View personal timetable

---

📡 Core Modules

⏱ Session Management

· Start/End sessions with one tap
· Unique session ID generation
· Time validation and late detection
· GPS location capture at session start
· Automatic session expiry

📲 QR Attendance System

· Teacher generates dynamic QR (refreshes every 30 sec)
· Student scans using phone camera
· Validates active session
· GPS validation against teacher location
· Prevents cross-session fraud
· QR contains encrypted session data

📍 GPS Validation

· Radius-based validation (configurable per school)
· Geofencing architecture
· Distance calculation from teacher location
· Student location captured at scan time
· Prevents remote attendance marking

🧬 Biometric System

Supported Methods:

· Fingerprint (phone sensor/USB scanner)
· Facial recognition (camera-based)
· Liveness detection (anti-spoofing)

Implementation:

· Teacher phone acts as scanner
· Students pre-register biometrics
· Instant matching and verification
· Offline biometric templates

🔔 Notification System

Channels:

· In-app notifications
· SMS (Africa's Talking)
· Email (Nodemailer)
· Future: WhatsApp integration

Targeting:

· Admin → Entire School
· HOD → Department
· Teacher → Class
· System → Users

Features:

· Rate-limited API
· Scheduled notifications
· Read receipts
· Delivery tracking

📊 Reports & Analytics

Report Types:

· Daily attendance (per class)
· Weekly summaries (per class/department)
· Monthly department analytics
· Term reports (school-wide)
· Student individual reports

Formats:

· PDF (printable)
· Excel (analyzable)
· CSV (raw data)

Analytics:

· Attendance trends
· Comparative analysis
· At-risk student identification
· Teacher performance metrics

---

📱 Attendance Methods

Method 1: QR Code (Student Self-Service)

```
TEACHER PHONE                          STUDENT PHONE
┌─────────────────────┐               ┌─────────────────────┐
│ [LARGE QR DISPLAY]  │               │   [CAMERA VIEW]     │
│ ░░░░░░░░░░░░░░░░░░░ │◄───Scan────   │   ┌─────────────┐   │
│ ░░████████████████░ │               │   │   [QR]      │   │
│ ░░██░░░░░░░░██░░░█ │               │   │   SCAN      │   │
│ ░░░████████████░░░░ │               │   └─────────────┘   │
│                     │               │   ✓ Marked Present  │
│ Refreshes: 30 sec   │               └─────────────────────┘
│ Present: 24/42      │
└─────────────────────┘
```

Method 2: Manual Marking (Teacher)

```
┌─────────────────────────────────────┐
│  CS 4A - DATABASE SYSTEMS           │
│  Live Attendance                     │
│                                      │
│  ☐ 1. Kamau, John    (QR: 8:31)    │
│  ☐ 2. Wanjiku, Mary  (QR: 8:32)    │
│  ☑ 3. Otieno, Peter  (MANUAL)      │◄── Teacher taps
│  ☐ 4. Mwangi, James  (Not yet)     │
│                                      │
│  [✓ MARK SELECTED]  [⚠️ LATE]       │
└─────────────────────────────────────┘
```

Method 3: Biometric Scan (Teacher Scans Student)

```
┌─────────────────────────────────────┐
│  🔵 BIOMETRIC ATTENDANCE            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    👆 PLACE FINGER          │   │
│  │       OR                    │   │
│  │    👤 LOOK AT CAMERA        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ✓ MATCH FOUND!                    │
│  John Kamau - 98.7% match          │
│  Marked PRESENT                     │
└─────────────────────────────────────┘
```

---

📝 Registration System

SAMS features a streamlined registration system where users are created hierarchically with minimal data entry.

Registration Links Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOWS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ADMIN ──┬── Create HOD (Individual)                            │
│          │                                                       │
│          └── Generate HOD Link                                   │
│                  │                                               │
│                  ▼                                               │
│              HOD self-registers                                  │
│              (Name + Email + Employee ID)                        │
│                                                                   │
│  HOD ────┬── Create Teacher (Individual)                        │
│          │                                                       │
│          └── Generate Teacher Link                               │
│                  │                                               │
│                  ▼                                               │
│              Teacher self-registers                              │
│              (Name + Email + TSC No)                             │
│                                                                   │
│  TEACHER ──┬── Generate Student Links (Bulk)                    │
│            │                                                     │
│            └── Manual Add (Individual)                          │
│                    │                                             │
│                    ▼                                             │
│                Student registers with:                          │
│                • Name + Admission No ONLY                       │
│                • School/Dept/Class auto-filled from link        │
│                • Optional: Biometric registration               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

Registration Link Example

```
Student opens: sams.ke/register/CS4A-2026-03-21-XYZ123

┌─────────────────────────────────────┐
│    📝 STUDENT REGISTRATION          │
│                                     │
│    School: Mukiria Technical        │ ← Auto-filled
│    Department: Computer Science     │ ← Auto-filled
│    Class: CS 4A                     │ ← Auto-filled
│                                     │
│    Full Name: _________________     │
│    Admission No: _______________    │
│    Phone (opt): ______________      │
│                                     │
│    [✓] Register Biometric (opt)     │
│                                     │
│        [REGISTER]                   │
└─────────────────────────────────────┘
```

---

📴 Offline Architecture

SAMS is built for Kenyan institutions where internet connectivity may be unreliable.

Offline Capabilities

```
┌─────────────────────────────────────────────────────────────────┐
│                    OFFLINE OPERATION                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📱 STUDENT OFFLINE                                             │
│  ┌─────────────────────────────────────────────┐               │
│  │ • Opens app (cached data)                   │               │
│  │ • Scans QR (works without internet)         │               │
│  │ • App shows: "✓ Marked (Offline Mode)"      │               │
│  │ • Attendance saved to local storage         │               │
│  │ • Added to sync queue                        │               │
│  └─────────────────────────────────────────────┘               │
│                                                                   │
│  👩‍🏫 TEACHER OFFLINE                                            │
│  ┌─────────────────────────────────────────────┐               │
│  │ • Starts session (cached timetable)         │               │
│  │ • QR still generates                         │               │
│  │ • Manual marks saved locally                 │               │
│  │ • Biometric matches from local templates    │               │
│  │ • All data queued for sync                   │               │
│  └─────────────────────────────────────────────┘               │
│                                                                   │
│  🔄 WHEN ONLINE RETURNS                                         │
│  ┌─────────────────────────────────────────────┐               │
│  │ • Auto-sync triggered                       │               │
│  │ • Queue processed in order                   │               │
│  │ • Conflicts resolved (server wins)          │               │
│  │ • Teacher dashboard updates                  │               │
│  │ • Reports generated                          │               │
│  └─────────────────────────────────────────────┘               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

🛠 Tech Stack

Backend

Technology Purpose
Node.js 18.x Runtime environment
Express.js Web framework
MongoDB Atlas Database
Mongoose ODM
JWT Authentication
Socket.io Real-time updates
Nodemailer Email service
Africa's Talking SMS gateway
Safaricom M-Pesa Payment processing
Multer File uploads
Sharp Image processing
QRCode QR generation
node-cron Scheduled tasks
Winston Logging
Helmet Security headers
Express-rate-limit Rate limiting

Frontend

Technology Purpose
React 18.x UI library
React Router Navigation
Context API State management
Tailwind CSS Styling
Axios API client
React Query Data fetching
React Hook Form Form handling
Recharts Analytics charts
React PDF Report generation
React Camera Camera access
React Fingerprint Biometric integration

DevOps

Technology Purpose
Ubuntu 22.04 Server OS
NGINX Reverse proxy
PM2 Process management
Certbot SSL certificates
GitHub Actions CI/CD
Docker Containerization
MongoDB Atlas Cloud database
Cloudflare DNS & CDN

---

🧠 Security Features

· ✅ Role-Based Access Control – Granular permissions per role
· ✅ JWT Authentication – Secure token-based auth with refresh rotation
· ✅ School-Level Data Isolation – Schools cannot access each other's data
· ✅ GPS Validation – Prevents location cheating
· ✅ Rate Limiting – Prevents brute force and DDoS attacks
· ✅ Input Validation – Sanitization of all user inputs
· ✅ MongoDB Injection Prevention – Mongoose protection
· ✅ Helmet.js – Security headers
· ✅ CORS Configuration – Restricted API access
· ✅ HTTPS Only – Encrypted communication
· ✅ Audit Logs – Complete traceability of all actions
· ✅ Device Fingerprinting – Prevents token theft
· ✅ 2FA Support – For super admin and optional for school admins

---

🚀 Deployment

Production Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    VPS (Ubuntu 22.04)                      │ │
│  │                    DigitalOcean / Linode                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                              │                                   │
│        ┌─────────────────────┼─────────────────────┐           │
│        ▼                     ▼                     ▼           │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐   │
│  │   NGINX     │──────▶│   BACKEND   │──────▶│  MONGODB    │   │
│  │  (Reverse   │       │  (Node.js)  │       │   Atlas     │   │
│  │   Proxy)    │       │   Port 3000 │       │  (Cloud)    │   │
│  └─────────────┘       └─────────────┘       └─────────────┘   │
│        │                      │                                  │
│        ▼                      ▼                                  │
│  ┌─────────────┐       ┌─────────────┐                          │
│  │  FRONTEND   │       │    REDIS    │                          │
│  │   (React)   │       │  (Optional  │                          │
│  │   Build     │       │   Caching)  │                          │
│  └─────────────┘       └─────────────┘                          │
│                                                                   │
│  DOMAINS:                                                        │
│  ├── sams.ke                 → Main application                 │
│  ├── api.sams.ke             → Backend API                      │
│  └── super.sams.ke           → Super Admin (Private)            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

Deployment Commands

```bash
# Server Setup
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs nginx certbot python3-certbot-nginx
npm install -g pm2

# Application Setup
git clone https://github.com/yourusername/sams.git /var/www/sams
cd /var/www/sams/backend && npm install
cd /var/www/sams/frontend && npm install && npm run build

# SSL Setup
certbot --nginx -d sams.ke -d api.sams.ke -d super.sams.ke

# Process Management
cd /var/www/sams/backend
pm2 start server.js --name sams-api
pm2 save && pm2 startup
```

---

📁 Project Structure

```
sams/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── auth.js
│   │   │   ├── mpesa.js
│   │   │   └── email.js
│   │   │
│   │   ├── models/
│   │   │   ├── School.js
│   │   │   ├── User.js
│   │   │   ├── License.js
│   │   │   ├── Department.js
│   │   │   ├── Class.js
│   │   │   ├── Timetable.js
│   │   │   ├── AttendanceSession.js
│   │   │   ├── Attendance.js
│   │   │   ├── RegistrationLink.js
│   │   │   ├── Payment.js
│   │   │   ├── Notification.js
│   │   │   └── AuditLog.js
│   │   │
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── super-admin/
│   │   │   ├── admin/
│   │   │   ├── hod/
│   │   │   ├── teacher/
│   │   │   ├── student/
│   │   │   └── auth/
│   │   │
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   │
│   └── package.json
│
├── docs/
│   ├── API.md
│   └── DEPLOYMENT.md
│
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

🔧 Environment Setup

Backend (.env)

```env
# ====================
# SERVER
# ====================
NODE_ENV=production
PORT=3000

# ====================
# DOMAINS
# ====================
BASE_URL=https://sams.ke
API_URL=https://api.sams.ke
SUPER_ADMIN_URL=https://super.sams.ke

# ====================
# DATABASE
# ====================
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sams

# ====================
# JWT
# ====================
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d

# ====================
# EMAIL
# ====================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=notifications@sams.ke
EMAIL_PASS=your_app_password

# ====================
# SMS (Africa's Talking)
# ====================
AFRICASTALKING_USERNAME=sandbox
AFRICASTALKING_API_KEY=your_api_key

# ====================
# M-PESA
# ====================
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379
MPESA_ENV=sandbox

# ====================
# SECURITY
# ====================
CORS_ORIGIN=https://sams.ke,https://super.sams.ke
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# ====================
# SUPER ADMIN
# ====================
SUPER_ADMIN_EMAIL=admin@sams.ke
SUPER_ADMIN_PASSWORD=your_secure_password
```

---

📡 API Overview

Authentication

Method Endpoint Description
POST /api/auth/login User login (school code + email/admission)
POST /api/auth/refresh Refresh access token
POST /api/auth/logout User logout
POST /api/auth/forgot-password Password reset request

School Management

Method Endpoint Description
POST /api/schools/activate Activate school with license key
GET /api/schools/profile Get school profile
PUT /api/schools/profile Update school profile
GET /api/schools/stats Get school statistics

User Management

Method Endpoint Description
POST /api/users/hod Create HOD (Admin only)
POST /api/users/teacher Create teacher (HOD/Admin)
POST /api/users/student Create student (Teacher/HOD/Admin)
GET /api/users List users (role-based)
PUT /api/users/:id Update user
DELETE /api/users/:id Delete user

Registration Links

Method Endpoint Description
POST /api/registration/links Generate registration link
GET /api/registration/links List generated links
POST /api/registration/register/:code Register via link
DELETE /api/registration/links/:id Expire link

Attendance

Method Endpoint Description
POST /api/attendance/session/start Start attendance session
POST /api/attendance/session/end End session
GET /api/attendance/session/:id Get session details
POST /api/attendance/scan Mark via QR scan
POST /api/attendance/manual Manual marking
POST /api/attendance/biometric Biometric marking
GET /api/attendance/live/:sessionId Live attendance feed

Reports

Method Endpoint Description
GET /api/reports/class/:classId Class attendance report
GET /api/reports/student/:studentId Student individual report
GET /api/reports/department/:deptId Department report
GET /api/reports/school School-wide report
POST /api/reports/export Export as PDF/Excel

Payments

Method Endpoint Description
POST /api/payments/mpesa/stk Initiate M-Pesa payment
POST /api/payments/mpesa/callback M-Pesa callback URL
GET /api/payments/history Payment history
GET /api/payments/invoice/:id Download invoice

Super Admin

Method Endpoint Description
GET /api/admin/schools List all schools
POST /api/admin/licenses Generate license
GET /api/admin/stats System statistics
GET /api/admin/audit View audit logs
POST /api/admin/school/:id/suspend Suspend school

---

🏫 Commercial Model

SAMS is designed for:

Target Institutions

· 🏛️ Universities
· 🏫 Colleges
· 🏤 High Schools
· 🏪 Training Institutions
· 🏬 Multi-campus institutions

Licensing Models

· Per-school licensing – Each institution pays separately
· Subscription models – Monthly or yearly billing
· Enterprise contracts – Custom pricing for large institutions

Payment Methods

· 📲 M-Pesa – Primary payment method for Kenyan schools
· 💳 Bank Transfer – For corporate clients
· 🌍 International Payments – Stripe/PayPal for global clients

Revenue Streams

· License fees (recurring)
· Setup/installation fees (one-time)
· Training and support packages
· Custom development
· White-label partnerships

---

🔮 Roadmap

Phase 1: Foundation (Current)

· ✅ Multi-school architecture
· ✅ Role-based access control
· ✅ QR attendance system
· ✅ GPS validation
· ✅ Basic reporting

Phase 2: Enhanced Features (Q2 2026)

· ✅ Biometric integration (face/fingerprint)
· ✅ Offline mode
· ✅ Registration links system
· ✅ Advanced analytics

Phase 3: Mobile & Integration (Q3 2026)

· 🔄 Mobile app (React Native)
· 🔄 Parent portal access
· 🔄 SMS notifications
· 🔄 API marketplace

Phase 4: Enterprise (Q4 2026)

· 🔄 Advanced biometrics (iris, voice)
· 🔄 AI-powered analytics
· 🔄 Predictive attendance
· 🔄 Blockchain audit trails

Phase 5: Global Expansion (2027)

· 🔄 Multi-language support
· 🔄 International payment gateways
· 🔄 Regional data centers
· 🔄 Government integration

---

👨‍💻 Developer

<p align="center">
  <img src="https://img.shields.io/badge/Developer-Denis_Macharia-blue?style=for-the-badge" alt="Developer">
</p>

Denis Macharia

Mukiria Technical Training Institute

📧 Email: denomacha000000@gmail.com
📱 Phone: +254703285246
🌍 Location: Kenya

🔥 🇰🇪 TËÇH💻WØRLD🌍🔥 🇰🇪 🚀KE

Expertise

· AI System Development
· Full-Stack Engineering
· System Architecture
· Cloud Deployment
· Educational Technology

---

📜 License

SAMS is proprietary commercial software.

Copyright © 2026 Denis Macharia. All rights reserved.

Terms

· ❌ Unauthorized distribution prohibited
· ❌ Reverse engineering forbidden
· ❌ Resale without license not allowed
· ✅ Licensed per institution
· ✅ Annual renewal required

For licensing inquiries: 📧 denomacha000000@gmail.com

---

📞 Support

Channel Contact
Email support@sams.ke
Phone +254703285246
WhatsApp +254703285246
Website https://sams.ke

---

<p
