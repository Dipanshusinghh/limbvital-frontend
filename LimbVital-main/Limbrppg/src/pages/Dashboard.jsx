import React, { useState, useEffect, useRef } from 'react';
import { Activity, Camera, CameraOff, HeartPulse, Brain, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { useVitals } from '../hooks/useVitals';
import SignalChart from '../components/vitals/SignalChart';

const Dashboard = () => {
  const {
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    isCameraActive,
    startCamera,
    stopCamera,
    vitals,
    signalHistory,
    resetVitals
  } = useVitals();

  const [saved, setSaved] = useState(false);
  const videoRef = useRef(null);

  // ── Connection Management ───────────────────────────────────────────────
  const handleToggle = async () => {
    if (isCameraActive || isConnected) {
      // User clicked stop
      if (vitals.bpm > 0) saveReading(vitals);
      stopCamera();
      disconnect();
    } else {
      // User clicked start
      setSaved(false);
      resetVitals();
      try {
        const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
        await connect(wsUrl);
        if (videoRef.current) {
          await startCamera(videoRef.current);
        }
      } catch (err) {
        alert("Failed to start: " + err.message);
      }
    }
  };

  // ── Save reading to localStorage ────────────────────────────────────────
  const saveReading = (data) => {
    if (!data || data.bpm === 0) return;
    const record = {
      timestamp: new Date().toISOString(),
      bpm: data.bpm,
      spo2: data.spo2,
      stress: data.stress ?? 0,
      status: data.status ?? 'Completed',
    };
    try {
      const existing = JSON.parse(localStorage.getItem('limbvital_records') || '[]');
      existing.unshift(record);
      localStorage.setItem('limbvital_records', JSON.stringify(existing));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      disconnect();
    };
  }, [stopCamera, disconnect]);

  // ── Status color ────────────────────────────────────────────────────────
  const getStatusColor = (status = '') => {
    if (status.includes('🟢') || status.includes('Stable') || status.includes('Good')) return 'text-green-600';
    if (status.includes('🟡') || status.includes('Processing')) return 'text-yellow-500';
    if (status.includes('🔴') || status.includes('Error')) return 'text-red-600';
    if (status.includes('⚠️')) return 'text-red-700';
    return 'text-slate-700';
  };

  const isScanning = isCameraActive || isConnected;

  return (
    <div className="p-8 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
          <Activity className="text-blue-600" /> LimbVital rPPG
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4 text-sm font-medium">
            {isConnected ? (
               <span className="text-emerald-500 flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                 <Wifi size={16} className="animate-pulse" /> Connected
               </span>
            ) : (
               <span className="text-slate-400 flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                 <WifiOff size={16}/> Offline
               </span>
            )}
          </div>
          {saved && (
            <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
              <CheckCircle size={16} /> Reading saved!
            </span>
          )}
          <button
            onClick={handleToggle}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
              isScanning ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isScanning
              ? <><CameraOff size={20} /> Stop Scan</>
              : <><Camera size={20} /> Start Analysis</>}
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Camera feed + Signal Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-video relative shadow-2xl border-[6px] border-slate-800 ring-4 ring-slate-900/50">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-700 ${!isScanning ? 'opacity-0 hidden' : 'opacity-100 block'}`}
            />
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,0.7)] animate-scan z-10" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* Target Brackets */}
                <div className="absolute top-[20%] left-[25%] w-12 h-12 border-t-4 border-l-4 border-cyan-500/70 rounded-tl-xl transition-all duration-1000 ease-in-out" />
                <div className="absolute top-[20%] right-[25%] w-12 h-12 border-t-4 border-r-4 border-cyan-500/70 rounded-tr-xl transition-all duration-1000 ease-in-out" />
                <div className="absolute bottom-[20%] left-[25%] w-12 h-12 border-b-4 border-l-4 border-cyan-500/70 rounded-bl-xl transition-all duration-1000 ease-in-out" />
                <div className="absolute bottom-[20%] right-[25%] w-12 h-12 border-b-4 border-r-4 border-cyan-500/70 rounded-br-xl transition-all duration-1000 ease-in-out" />
                
                {/* Live Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-red-500 text-xs font-bold tracking-widest uppercase shadow-black drop-shadow-md">Live</span>
                </div>
              </div>
            )}
            {!isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 italic bg-slate-900">
                <Camera size={56} className="mb-4 opacity-20" />
                Waiting to initialize camera...
              </div>
            )}
          </div>

          {/* Signal Chart Component */}
          <div className="shadow-lg rounded-2xl bg-white overflow-hidden border border-slate-100">
            <SignalChart signalHistory={signalHistory} width={800} height={200} />
          </div>
        </div>

        {/* Right Column: Vitals panel */}
        <div className="space-y-6">
          <MetricCard
            label="Heart Rate"
            value={vitals.bpm || '--'}
            unit="BPM"
            icon={<HeartPulse className="text-red-500" />}
            color="text-red-600"
          />
          <MetricCard
            label="Oxygen (SpO2)"
            value={vitals.spo2 || '--'}
            unit="%"
            icon={<Activity className="text-blue-500" />}
            color="text-blue-600"
          />
          <MetricCard
            label="Stress Level"
            value={vitals.stress || '--'}
            unit="/100"
            icon={<Brain className="text-purple-500" />}
            color="text-purple-600"
          />
          
          {/* Status with dynamic color */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">
              System Status
            </span>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-slate-300'}`} />
              <p className={`text-sm font-bold ${getStatusColor(vitals.status)}`}>
                {vitals.status || 'Awaiting connection...'}
              </p>
            </div>
          </div>

          {isScanning && vitals.bpm > 0 && (
            <p className="text-xs text-slate-400 text-center animate-pulse">
              Press <strong>Stop Scan</strong> to save this reading to History
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, unit, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-end gap-2">
      <span className={`text-5xl font-black ${color}`}>{value}</span>
      <span className="text-slate-400 font-bold mb-1">{unit}</span>
    </div>
  </div>
);

export default Dashboard;