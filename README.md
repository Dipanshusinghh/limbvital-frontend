<div align="center">
  <img src="https://img.icons8.com/?size=512&id=12244&format=png" alt="LimbVital Logo" width="80" height="80">
  <h1>LimbVital 🫀</h1>
  <p><strong>AI-Powered Real-Time Health Monitoring System</strong></p>
</div>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a>
</p>

---

## 🚀 About The Project
**LimbVital** is a premium, full-stack medical technology prototype designed to monitor human vitals (Heart Rate, SpO2, and Stress Levels) in real-time. It leverages a modern React frontend with a high-performance Node.js WebSocket backend to simulate and visualize advanced Photoplethysmography (PPG) signals without the need for physical wearable devices.

This project is ideal for showcasing full-stack real-time data streaming, state management, and modern UI/UX design.

## ✨ Features
- **Real-Time Vitals Tracking**: Instantaneous monitoring of BPM, Blood Oxygen (SpO2), and Stress index.
- **Live PPG Waveform**: A dynamic, real-time chart plotting the physiological signal stream via WebSockets.
- **Premium UI/UX**: Features a highly polished, realistic "laser scanning" interface with glassmorphism effects and dynamic connection indicators.
- **Persistent History**: Saves all user scanning sessions locally, allowing historical review, filtering, and data export.
- **Robust Full-Stack Architecture**: A stable Node.js backend handling multiple WebSocket connections and streaming 10Hz physiological data.

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js & Vite**: Fast, component-driven UI.
- **Tailwind CSS v4**: Utility-first styling with custom animations.
- **Recharts**: For rendering smooth, real-time data graphs.
- **Lucide React**: Modern iconography.

### Backend (Server)
- **Node.js**: Asynchronous JavaScript runtime.
- **Express.js**: Backend web framework.
- **ws (WebSockets)**: Core technology for low-latency, bi-directional real-time communication.

## 📂 Architecture
```text
LimbVital-main/
│
├── Limbrppg/           # Frontend React Application
│   ├── src/            
│   │   ├── components/ # Reusable UI components (Navbar, Footer)
│   │   ├── hooks/      # Custom React hooks (useVitals)
│   │   ├── pages/      # Application views (Dashboard, History)
│   │   └── services/   # WebSocket connection logic
│   └── package.json    # Frontend dependencies
│
└── backend/            # Node.js WebSocket Server
    ├── server.js       # Core backend logic and physiological engine
    └── package.json    # Backend dependencies
```

## 💻 Installation

To get a local copy up and running, follow these simple steps.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/LimbVital.git
cd LimbVital/LimbVital-main
```

### 2. Setup the Backend
Open a terminal window and start the backend server:
```bash
cd backend
npm install
npm start
```
*The server will start on `ws://localhost:8000/ws`.*

### 3. Setup the Frontend
Open a **new** terminal window and start the frontend client:
```bash
cd Limbrppg
npm install
npm run dev
```
*The web app will be available at `http://localhost:5173/`.*

## 📈 Usage
1. Navigate to the **Dashboard** via the web interface.
2. Ensure the connection indicator shows a green **"Connected"** status.
3. Click **Start Analysis** to initialize the camera and begin the scanning sequence.
4. Watch the real-time PPG signal generate on the chart.
5. Click **Stop Scan** to automatically save your reading to the **History** tab for future reference.

---
<div align="center">
  <p>Built with ❤️ for modern healthcare technology.</p>
</div>
