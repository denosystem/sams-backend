📚 SAMS - Smart Attendance Management System

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/node.js-18.x-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/mongodb-Atlas-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/react-18.x-61DAFB.svg" alt="React">
  <img src="https://img.shields.io/badge/license-Commercial-red.svg" alt="License">
</p>

<p align="center">
  <b>Enterprise-Grade Attendance Management System for Educational Institutions</b>
</p>

<p align="center">
  <i>Multi-school • Biometric-ready • GPS-validated • Offline-capable • M-Pesa integrated</i>
</p>

---

📋 Table of Contents

· Overview
· Key Features
· System Architecture
· Tech Stack
· User Roles
· Installation
· Environment Variables
· API Documentation
· Deployment
· Project Structure
· License
· Contact

---

🎯 Overview

SAMS (Smart Attendance Management System) is a comprehensive, multi-school attendance platform designed to eliminate attendance fraud and digitize institutional operations. Built for scalability, it serves multiple institutions with complete data isolation while providing a unified management interface for system administrators.

🌟 Why SAMS?

· ✅ Fraud-proof – QR + GPS + Biometric validation
· ✅ Multi-tenant – One installation, multiple schools
· ✅ Offline-first – Works in low-connectivity areas
· ✅ Enterprise-ready – Role-based access, audit logs
· ✅ Kenya-optimized – M-Pesa integration, local hosting support

---

✨ Key Features

👑 Super Admin (Developer Level)

· Invisible control panel at super.sams.ke
· Generate & manage school licenses
· Monitor all schools (students, attendance, payments)
· M-Pesa payment tracking
· System-wide analytics and audit logs

🏫 School Level

Role Capabilities
Admin Full school control, create HODs, manage timetable, generate reports
HOD Department management, create teachers, departmental reports
Teacher Start/end sessions, QR generation, manual marking, biometric scan
Student QR scan, view attendance, profile management

📱 Three Attendance Methods

Method Description Best For
QR Code Teacher displays QR, student scans Large classes, fast check-in
Manual Teacher taps student names Small classes, special cases
Biometric Face/fingerprint scan via teacher phone High-security, exam sessions

🔒 Security Features

· ✅ JWT authentication with refresh tokens
· ✅ Role-based access control (RBAC)
· ✅ School-level data isolation
· ✅ GPS geofencing
· ✅ Rate limiting & brute force protection
· ✅ Comprehensive audit logging
· ✅ Device fingerprinting

🌍 Offline Capability

· 📴 Students mark attendance offline
· 📱 Teachers start sessions offline
· 🔄 Automatic sync when online
· 💾 Local storage with queue system

💰 Payment Integration

· 📲 M-Pesa STK Push (Safaricom)
· 💳 Multiple license tiers
· 📄 Automatic invoice generation
· ⏰ Renewal reminders

---

🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Web App   │  │ Mobile App  │  │   Biometric │            │
│  │   (React)   │  │ (React Nat.)│  │   Scanner   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                             │
│                      (api.sams.ke / NGINX)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Node.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Auth      │  │ Attendance  │  │   Reports   │            │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤            │
│  │   Schools   │  │   Users     │  │   Payments  │            │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤            │
│  │   Biometric │  │    QR       │  │  Offline    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐    ┌─────────────────────┐           │
│  │   MongoDB Atlas     │    │      Redis          │           │
│  │   (Primary DB)      │    │   (Caching/Session) │           │
│  └─────────────────────┘    └─────────────────────┘           │
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

Frontend

Technology Purpose
React 18.x UI library
React Router Navigation
Context API State management
Tailwind CSS Styling
Axios API client
React Query Data fetching
Recharts Analytics charts
React PDF Report generation

DevOps

Technology Purpose
Ubuntu 22.04 Server OS
NGINX Reverse proxy
PM2 Process management
Certbot SSL certificates
GitHub Actions CI/CD
Docker Containerization

---

👥 User Roles

1. Super Admin (Invisible)

· Access: super.sams.ke
· Generate school licenses
· Monitor all institutions
· Track payments
· System-wide analytics

2. School Admin

· Create/manage departments
· Create HOD accounts
· Full timetable control
· School-wide reports
· Configure attendance rules

3. Head of Department (HOD)

· Create teachers (department only)
· Add students to department
· Department reports
· View timetable

4. Teacher

· Start/end attendance sessions
· Generate QR codes
· Manual student marking
· Biometric scanning
· Class reports

5. Student

· Scan QR for attendance
· View personal attendance
· Update profile
· Register biometrics

---

📦 Installation

Prerequisites

· Node.js 18.x or higher
· MongoDB Atlas account
· VPS (Ubuntu 22.04 recommended)
· Domain names configured

Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/sams.git
cd sams

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Run development servers
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm start
```

---

🔐 Environment Variables

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
```

---

📡 API Documentation

Authentication Endpoints

Method Endpoint Description
POST /api/auth/login User login
POST /api/auth/refresh Refresh token
POST /api/auth/forgot-password Password reset
POST /api/auth/reset-password Reset password

School Management

Method Endpoint Description
GET /api/schools List schools (Super Admin)
POST /api/schools Create school
GET /api/schools/:id Get school details
PUT /api/schools/:id Update school
POST /api/schools/activate Activate with license key

Attendance

Method Endpoint Description
POST /api/attendance/session/start Start session
POST /api/attendance/session/end End session
POST /api/attendance/scan Mark via QR
POST /api/attendance/manual Manual mark
POST /api/attendance/biometric Biometric mark
GET /api/attendance/session/:id Get session data

Reports

Method Endpoint Description
GET /api/reports/class/:classId Class report
GET /api/reports/student/:studentId Student report
GET /api/reports/department/:deptId Department report
GET /api/reports/school School report
POST /api/reports/export Export as PDF/Excel

---

🚀 Deployment

VPS Setup (Ubuntu 22.04)

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install NGINX
apt install -y nginx

# Install PM2
npm install -g pm2

# Install Certbot
apt install -y certbot python3-certbot-nginx

# Clone repository
git clone https://github.com/yourusername/sams.git /var/www/sams

# Install dependencies
cd /var/www/sams/backend && npm install
cd /var/www/sams/frontend && npm install

# Build frontend
cd /var/www/sams/frontend && npm run build

# Configure NGINX (see nginx.conf example)

# Setup SSL
certbot --nginx -d sams.ke -d api.sams.ke -d super.sams.ke

# Start with PM2
cd /var/www/sams/backend
pm2 start server.js --name sams-api
pm2 save
pm2 startup
```

Docker Deployment

```bash
# Build and run with docker-compose
docker-compose up -d
```

---

📁 Project Structure

```
sams/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
│
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
│
├── scripts/
│   ├── backup.js
│   └── seed.js
│
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

📊 Database Schema

Core Collections

```javascript
// School
{
  _id: ObjectId,
  name: String,
  code: String,           // Unique school code
  licenseKey: String,
  status: String,
  settings: Object
}

// User (unified for all roles)
{
  _id: ObjectId,
  schoolId: ObjectId,
  email: String,
  role: String,
  roleData: Object,
  biometrics: Object
}

// Attendance
{
  _id: ObjectId,
  schoolId: ObjectId,
  sessionId: ObjectId,
  studentId: ObjectId,
  status: String,
  method: String,
  location: Object,
  timestamp: Date
}
```

---

🔒 Security Best Practices

· ✅ All passwords hashed with bcrypt
· ✅ JWT tokens with short expiration
· ✅ Refresh token rotation
· ✅ Rate limiting on all endpoints
· ✅ Input validation and sanitization
· ✅ CORS properly configured
· ✅ Helmet.js for security headers
· ✅ MongoDB injection prevention
· ✅ Audit logs for all critical actions

---

🤝 Contributing

We welcome contributions! Please see our Contributing Guidelines.

Development Workflow

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push branch (git push origin feature/amazing)
5. Open Pull Request

---

📄 License

SAMS is commercial software. Unauthorized distribution or reproduction is prohibited.

Copyright © 2026 Denis Macharia. All rights reserved.

---

📞 Contact

Developer: Denis Macharia
Institution: Mukiria Technical Training Institute
Email: denomacha000000@gmail.com
Phone: +254703285246

🌍 Website: https://sams.ke
🐦 Twitter: @sams_ke
📱 LinkedIn: SAMS Kenya

---

🌟 Support

For technical support or licensing inquiries:

· 📧 Email: support@sams.ke
· 📞 Phone: +254703285246
· 💬 WhatsApp: +254703285246

---

<p align="center">
  <b>Built with ❤️ in Kenya for the World</b><br>
  <i>© 2026 SAMS - Smart Attendance Management System</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/made_in-Kenya-green?style=for-the-badge" alt="Made in Kenya">
</p>
```
