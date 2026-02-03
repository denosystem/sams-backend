# ✅ SAMS — Smart Attendance Management System (Full System)

SAMS (Smart Attendance Management System) is a full-stack platform designed to manage school/class attendance using **sessions**, **location validation**, and planned **biometric support**.  
It supports different user roles such as **Admin**, **HOD**, **Teacher**, and **Student**.

This repository contains the **full system project**, including:

✅ Backend API (Node.js + Express)  
✅ Frontend Web App (React / HTML MVP)  
✅ File-based storage (JSON) for MVP stage  
✅ VPS deployment-ready structure  

---

## 📌 Core Goals

- Stop attendance fraud (fake sign-ins)
- Track attendance per session (class lesson/time slot)
- Allow admin & HOD oversight
- Support future upgrades:
  - Biometric verification
  - GPS geofencing
  - Database integration (MongoDB/PostgreSQL)
  - Mobile app support

---

# 🧠 System Modules

## 👨‍🎓 Student Module
- Add & manage students
- Assign student to class/course
- View personal attendance history

## 👩‍🏫 Teacher Module
- Manage teacher accounts
- Create sessions
- Mark attendance
- View attendance analytics per class

## 🧑‍💼 HOD Module (Head of Department)
- Approve or monitor teacher sessions
- View department attendance reports
- Audit attendance anomalies

## 🛡️ Admin Module
- Manage users (teachers/hod/students)
- Monitor system logs
- Configure attendance rules:
  - Allowed radius distance
  - session duration
  - late marking rules

## ⏱️ Session Module
- Start and end lesson sessions
- Generate unique session IDs
- Prevent attendance outside a valid session

## 📍 Location Module (GPS)
- Capture location during attendance
- Validate within allowed radius (future: geofence)

## 🧬 Biometric Module (Planned)
- Fingerprint/Face verification integration
- Device identity validation

---

# 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- CORS
- JSON storage (MVP)
- Nodemon (development)

### Frontend
- React (recommended) / HTML MVP
- Fetch / Axios for API calls

### Deployment
- VPS (Ubuntu)
- Nginx (reverse proxy)
- PM2 (process manager)
- GitHub (version control)

---

# 📁 Recommended Project Structure

A clean full system structure should look like this:
