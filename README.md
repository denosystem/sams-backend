8# 🚀 SAMS — Smart Attendance Management System

SAMS (Smart Attendance Management System) is a multi-school, enterprise-grade attendance platform built to eliminate attendance fraud and digitize institutional operations.

It provides secure, session-based attendance management with future-ready biometric, GPS validation, QR scanning, and full mobile integration support.

---

## 🌍 System Overview

SAMS is designed to:

- Prevent fake attendance
- Track real-time attendance per session
- Support multiple schools under one system
- Provide secure role-based control
- Enable cloud deployment (VPS ready)
- Scale to biometric & mobile integrations

---

# 🏢 Multi-School Architecture

SAMS supports multi-school licensing.

Each school:
- Operates under a unique License Key
- Has isolated data scope
- Manages its own Admin, HOD, Teachers, and Students
- Cannot access another school’s records

🔐 License keys are generated and managed by the system developer.

---

# 👥 User Roles & Capabilities

## 👑 Developer (Invisible System Role)
- Generates school license keys
- Controls system-level permissions
- Issues licenses privately
- Does not appear in school dashboards

---

## 🛡️ Admin (School Level)

Full system control within a school:

- Create Departments
- Add / Manage:
  - HOD
  - Teachers
  - Students
- Assign HOD to departments
- Configure:
  - Attendance late rules
  - Allowed GPS radius
  - Session timing limits
- Modify Timetables
- Generate attendance reports
- Send school-wide notifications

---

## 🧑‍💼 HOD (Head of Department)

Department-level authority:

- Manage department teachers
- Add students under department
- View departmental reports
- Audit attendance anomalies
- Send notifications to department or teachers

---

## 👩‍🏫 Teacher

- Start and end attendance sessions
- Generate QR code per session
- Monitor live attendance
- View class reports
- Send notifications to assigned class

---

## 👨‍🎓 Student

- Login to portal
- Scan QR code for attendance
- View personal attendance records
- Receive school notifications

---

# 📡 Core Modules

## ⏱ Session Management
- Start/End sessions
- Unique session ID generation
- Time validation
- Late attendance detection

## 📲 QR Attendance System
- Teacher generates session QR
- Student scans using browser
- Validates active session
- Prevents cross-session fraud

## 📍 Location Validation (GPS Ready)
- Radius-based validation
- Geofencing architecture
- Distance calculation logic

## 🧬 Biometric-Ready Architecture
Prepared for:
- Fingerprint integration
- Facial recognition
- Device-based authentication

## 🔔 Notification System
- Admin → Entire School
- HOD → Department
- Teacher → Class
- Rate-limited API to prevent spam
- Email-ready integration

## 📊 Reports & Analytics
- Student attendance percentage
- Class attendance summaries
- Department-level insights
- System logs
- Future CSV/PDF export support

---

# 🧠 Security Features

- Role-based access control
- JWT Authentication
- School-level data isolation
- API rate limiters
- Secure environment variables
- HTTPS production-ready
- MongoDB secure connection

---

# 🏗️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Mongoose
- Nodemailer
- PM2 (production)
- NGINX reverse proxy

## Frontend
- React
- React Router
- Context API
- VPS-ready production build

---

# 🌐 Deployment Ready

SAMS supports:

- VPS hosting
- Cloudflare DNS
- HTTPS via Certbot
- PM2 process management
- MongoDB Atlas

---

# 📦 Project Structure

```
backend/
  controllers/
  routes/
  models/
  middleware/
  utils/
  server.js

frontend/
  src/
    pages/
    components/
    state/
  public/
```

---

# 🔧 Environment Setup (.env Example)

```
🤫🤫🤫hapo hufai kuonaa😄😁

---

# 🚀 Running Locally

## Backend

```
npm install
npm run dev
```

## Frontend

```
npm install
npm run build
```

---

# 🏫 Commercial Model

SAMS is designed for:

- Universities
- Colleges
- High Schools
- Training Institutions
- Multi-campus institutions

License-based deployment allows:

- Per-school licensing
- Subscription models
- Central hosting or private VPS installation

---

# 👨‍💻 Developed By

**Denis Macharia**  
Mukiria Technical Training Institute  

📧 denomacha000000@gmail.com  
📱 +254703285246  

AI System Developer | Full-Stack Engineer | System Architect

---

# 🔮 Future Roadmap

- Full biometric implementation
- Mobile app (React Native / Flutter)
- Advanced analytics dashboards
- Parent portal access
- Offline synchronization
- SaaS management panel

---

# 📜 License

This system is proprietary commercial software.  
Unauthorized distribution is prohibited.
