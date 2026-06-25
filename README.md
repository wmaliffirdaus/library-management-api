# 📚 Cyber-Archive Developer Portal

A modern developer portal and management dashboard built for the **RESTful Book Management API**. The platform provides an interactive environment for developers to explore, test, monitor, and integrate with the Book Management API through a visually immersive cyberpunk-inspired interface.

## 🚀 Overview

Cyber-Archive Developer Portal serves as a centralized hub for developers to:

* Explore and manage book records
* Test API endpoints in a live sandbox environment
* Monitor API health and system status
* Generate and manage API keys
* Access API documentation and onboarding resources
* View telemetry and operational metrics
* Submit support requests and configure user preferences

The application is designed with a high-fidelity cyberpunk aesthetic featuring holographic effects, glowing UI components, CRT scanlines, and responsive layouts.

---

## ✨ Features

### 📖 Book Management Dashboard

Manage book resources through an intuitive interface:

* View all books
* Search books by title, author, or ID
* Filter by category and metadata
* Create new book entries
* Update existing records
* Delete books
* Paginated browsing experience

### 🧪 Interactive API Sandbox

Test API endpoints directly from the portal.

Supported capabilities:

* Execute `GET /books` requests
* Apply query parameters dynamically
* Simulate API requests
* View formatted JSON responses
* Monitor request loading states
* Experiment without external tools

### 🔑 API Key Management

Developer-focused authentication management:

* Generate Test Keys
* Generate Live Keys
* Copy API keys to clipboard
* Revoke existing keys
* Manage multiple environments
* View authentication statistics

### 📊 Developer Dashboard

Real-time operational insights:

* API request metrics
* Latency monitoring
* Error tracking
* Usage analytics
* System performance indicators

### 📚 API Documentation

Built-in developer documentation including:

* Endpoint references
* Request examples
* Response structures
* Authentication guides
* Integration examples

### 🚀 Getting Started Guide

Step-by-step onboarding workflow:

1. Register developer profile
2. Generate API credentials
3. Test API requests
4. Integrate into applications

Includes ready-to-use cURL examples and authentication samples.

### 🌐 Live Telemetry Monitoring

Monitor platform health through:

* Global node status
* Service availability
* Uptime metrics
* Health indicators
* Performance statistics

### 🛠 Support Center

Built-in support capabilities:

* Diagnostic ticket submission
* Dynamic tracking IDs
* FAQ knowledge base
* User support workflows

### ⚙️ Settings & Personalization

Customize the portal experience:

* User profile management
* UI preferences
* CRT scanline effects
* Dashboard configurations

---

## 🏗️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### UI/UX

* Responsive Layout
* Cyberpunk-inspired Design
* HUD-style Components
* Animated Effects
* Dark Theme Interface

### Development Tools

* ESLint
* TypeScript Compiler
* Vite Build System

---

## 📁 Project Structure

```text
library-dashboard-frontend/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── types.ts
    ├── data/
    └── components/
        ├── Header.tsx
        ├── Sidebar.tsx
        ├── ProfileModal.tsx
        ├── BookCatalogView.tsx
        ├── ApiStatusView.tsx
        ├── DeveloperDashboardView.tsx
        ├── DocumentationView.tsx
        ├── GettingStartedView.tsx
        ├── SettingsView.tsx
        └── SupportView.tsx
```

---

## ⚡ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file based on:

```bash
cp .env.example .env
```

Update the required environment variables.

### 4. Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## 🔨 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

---

## 📡 Example API Request

Retrieve all books:

```bash
curl -X GET "https://api.example.com/books" \
-H "Authorization: Bearer YOUR_API_KEY"
```

Filter books:

```bash
curl -X GET "https://api.example.com/books?genre=fiction&limit=10" \
-H "Authorization: Bearer YOUR_API_KEY"
```

Example Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "BK-001",
      "title": "The Great Archive",
      "author": "John Doe",
      "genre": "Fiction"
    }
  ]
}
```

---

## 🎨 Design Philosophy

Cyber-Archive Developer Portal embraces a futuristic digital archive aesthetic:

* Neon Cyan & Violet Accents
* Dark Grid-Based Background
* Holographic HUD Elements
* Animated CRT Scanlines
* Responsive Dashboard Layout
* Developer-Centric User Experience

The goal is to transform traditional API documentation and administration tools into an engaging and immersive developer environment.

---

## 🔮 Future Enhancements

Planned improvements include:

* Real backend integration
* OAuth authentication
* User role management
* Request history tracking
* API analytics dashboard
* WebSocket-based live updates
* Exportable reports
* Dark/Light theme switching

---

## 👨‍💻 Author

Developed as part of a RESTful Book Management API ecosystem project to demonstrate modern frontend engineering, API integration workflows, and developer experience design.

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
