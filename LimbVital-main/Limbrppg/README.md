# 🫀 LimbVital Frontend

Modern React-based frontend for the LimbVital AI health monitoring system.

## 🚀 Features

- ✅ **Real-time camera-based heart rate detection** (rPPG)
- ✅ **Live vitals dashboard** (BPM, SpO2, Stress)
- ✅ **Real-time Signal Chart** visualization
- ✅ **Health history tracking** (Saved to LocalStorage)
- ✅ **Responsive design** (Tailwind CSS)
- ✅ **WebSocket integration** for real-time data processing

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- LimbVital Backend running locally (or deployed)

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file in the root directory to set your backend WebSocket URL (Default is `ws://localhost:8000/ws`):
```env
VITE_WS_URL=ws://localhost:8000/ws
```

### 3. Start Development Server
```bash
npm run dev
```
The frontend will start at: **http://localhost:5173**

### 4. Build for Production
```bash
npm run build
```
The output will be in the `dist/` folder.

## 📁 Architecture Overview

- **`useVitals` Hook:** A custom React hook that cleanly manages the Camera feed and WebSocket connection.
- **WebSocket Service:** Handles auto-reconnection, message dispatching, and sending video frames to the backend.
- **Dashboard:** The main UI that renders the camera feed, vitals, and the live PPG signal chart.

## 📱 Pages

1. **Landing Page (`/`)**: Hero section with features and how it works.
2. **Dashboard (`/dashboard`)**: Live camera feed, real-time vitals cards, PPG signal chart, and start/stop controls.
3. **History (`/history`)**: Past vitals records and statistics.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

