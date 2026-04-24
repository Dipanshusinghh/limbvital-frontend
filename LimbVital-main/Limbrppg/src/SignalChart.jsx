import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

/**
 * SignalChart Component
 * Real-time signal visualization using Canvas
 */
const SignalChart = ({ signalHistory = [], width = 600, height = 200 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size accounting for device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx, width, height);

    // Draw signal
    if (signalHistory.length > 1) {
      drawSignal(ctx, signalHistory, width, height);
    } else {
      drawPlaceholder(ctx, width, height);
    }

  }, [signalHistory, width, height]);

  // Draw grid lines
  const drawGrid = (ctx, w, h) => {
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    // Horizontal lines
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Vertical lines
    for (let i = 0; i <= 10; i++) {
      const x = (w / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  };

  // Draw signal waveform
  const drawSignal = (ctx, data, w, h) => {
    const padding = 20;
    const usableHeight = h - padding * 2;
    const usableWidth = w - padding * 2;
    const step = usableWidth / (data.length - 1);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#EF4444');
    gradient.addColorStop(1, '#EC4899');

    // Draw shadow/fill
    ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
    ctx.beginPath();
    ctx.moveTo(padding, h - padding);
    
    data.forEach((value, i) => {
      const x = padding + i * step;
      const y = padding + (1 - value) * usableHeight;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(padding + (data.length - 1) * step, h - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    data.forEach((value, i) => {
      const x = padding + i * step;
      const y = padding + (1 - value) * usableHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw current point
    if (data.length > 0) {
      const lastX = padding + (data.length - 1) * step;
      const lastY = padding + (1 - data[data.length - 1]) * usableHeight;
      
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw placeholder text
  const drawPlaceholder = (ctx, w, h) => {
    ctx.fillStyle = '#94A3B8';
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Waiting for signal...', w / 2, h / 2);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">PPG Signal</h3>
            <p className="text-xs text-gray-500">Real-time photoplethysmography</p>
          </div>
        </div>

        {/* Live Indicator */}
        {signalHistory.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">LIVE</span>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        <canvas 
          ref={canvasRef}
          className="w-full"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Samples</p>
          <p className="text-lg font-bold text-gray-900">{signalHistory.length}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Quality</p>
          <p className="text-lg font-bold text-gray-900">
            {signalHistory.length > 0 ? 'Good' : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Status</p>
          <p className="text-lg font-bold text-green-600">
            {signalHistory.length > 0 ? 'Active' : 'Idle'}
          </p>
        </div>
      </div>

    </div>
  );
};

export default SignalChart;
