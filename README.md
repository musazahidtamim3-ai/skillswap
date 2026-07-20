# 🔄 SkillSwap - Community Skill Sharing Platform

> A platform where knowledge is currency. Teach what you know, learn what you want, and connect with people to swap skills without spending money!

---

## 📖 Project Description

**SkillSwap** is a modern, interactive web application that allows users to share their expertise and learn new skills from others. Instead of paying for courses, users can list their skills (e.g., Next.js Development, UI/UX Design) and send "Swap Requests" to other creators. If both parties agree, they connect and exchange their knowledge! 

---

## 🚀 Live Demo

[![Live Preview](https://img.shields.io/badge/Live_Preview-View_App-pink?style=for-the-badge&logo=vercel)](https://skillswap-nine-alpha.vercel.app/) 

---

## 🛠️ Tech Stack

### Frontend 
*   ⚛️ **Next.js (App Router)** - React Framework
*   📘 **TypeScript** - For type safety and better developer experience
*   🎨 **Tailwind CSS** - For beautiful, responsive, and modern UI
*   🔔 **React Toastify** - For interactive push notifications

### Backend & Database 
*   🟢 **Node.js & Express.js** - Robust backend REST API
*   🍃 **MongoDB** - NoSQL Database for storing users, skills, and swap requests
*   🔐 **Custom Auth (Auth-Client)** - Secure user authentication and session management

---

## ✨ Special Features

*   🔐 **Secure Authentication:** Users can securely sign up, log in, and manage their sessions.
*   ➕ **Create & Share Skills:** Logged-in users can easily post a new skill they want to offer, complete with categories, descriptions, and experience levels.
*   🔍 **Dynamic Skill Details:** Each skill has its own beautifully designed, dynamic details page (`/skills/[id]`).
*   🤝 **Connect for Swap:** Users can send connection requests to skill creators to initiate a knowledge exchange.
*   🖼️ **Smart Image Fallbacks:** If a user doesn't provide a skill thumbnail, the system automatically assigns a high-quality relevant image based on the selected category.
*   📱 **Fully Responsive UI:** A stunning dark-themed interface with glass-morphism effects, gradient text, and fluid animations that looks perfect on mobile, tablet, and desktop.

---

## ⚙️ Local Setup & Installation

Follow these steps to run the project locally on your machine:

**1. Clone the repository**
```bash
git clone [https://github.com/your-username/skillswap.git](https://github.com/your-username/skillswap.git)
cd skillswap
