# 🚀 TalentVerse – AI-Powered Event Aggregation Platform

TalentVerse is a full-stack platform that aggregates **internships, hackathons, and coding challenges** from multiple platforms like **Unstop, LeetCode, and HackerRank** into a unified dashboard.  
It helps students and professionals **discover, bookmark, and get notified** about upcoming events — with smart alerts, personalized recommendations, and AI-powered LinkedIn post generation.

---

## ✨ Features

### 🧠 Event Aggregation
- Collects data from multiple event platforms (Unstop, HackerRank, LeetCode, etc.)
- Displays them in a clean, paginated dashboard
- Filters by difficulty, platform, and event type

### ⚡ AI-Powered LinkedIn Post Generator
- Uses **Gemini API** to generate LinkedIn posts in multiple styles (Simple, Professional, Storytelling)
- Supports emojis, hashtags, and customizable tone
- Built-in animated **Border Beam** effect for modern UI

### 🔔 Smart Alerts
- Users can subscribe to specific event types (Hackathons, Internships, Workshops, Coding Challenges)
- Auto-reminders via email (with planned Cron jobs)
- Preferences saved with Clerk authentication

### 💾 Bookmark & Dashboard
- Save and view bookmarked events  
- Personalized user dashboard showing saved, upcoming, and completed events

### 🎨 Modern UI
- Built using **Tailwind CSS**, **Framer Motion**, and **ShadCN/UI**
- Animated interactions and gradients for better UX
- Responsive and accessible on all devices

### 🧩 Authentication
- Integrated **Clerk Auth** for secure login, signup, and session handling
- Google sign-in and user profile management

### 📅 Upcoming Feature (Cron Jobs)
- Automated email reminders for upcoming events
- Smart notifications sent daily via Resend / SendGrid

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **Next.js 14 (App Router)**
- ⚛️ **React.js**
- 🎨 **Tailwind CSS**
- 💫 **Framer Motion**
- 🧩 **ShadCN/UI**
- 🪄 **Magic UI (Border Beam)**
- 🧭 **Lucide Icons**

### Backend
- 🖥️ **Node.js + Next.js API Routes**
- 🔗 **Prisma ORM**
- 🧮 **PostgreSQL**
- 🔐 **Clerk Authentication**
- 🤖 **Gemini AI API (Google Generative AI)**

### Other Tools
- 📧 **Resend (for emails)**
- ⏰ **Vercel Cron Jobs**
- 🧾 **Axios** for API requests
- 🧱 **Zod** for schema validation

---

## ⚙️ Getting Started

### 🧰 Prerequisites
Before starting, ensure you have:
- Node.js 18+
- PostgreSQL
- Gemini API Key
- Clerk Account (for Auth)
- Resend / SendGrid (for Emails)

---

## 🚀 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/TalentVerse.git
cd TalentVerse
