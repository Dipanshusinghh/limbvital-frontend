const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server, path: '/ws' });

let activeConnections = 0;

wss.on('connection', (ws) => {
  activeConnections++;
  console.log(`[+] New Client Connected. Active connections: ${activeConnections}`);

  // Initial simulation state for this client
  let mockBpm = 75;
  let mockSpo2 = 98;
  let mockStress = 30;
  let simulationInterval = null;
  let lastFrameTime = Date.now();

  // Send initial connected status
  ws.send(JSON.stringify({ status: 'Connected. Awaiting video frames...' }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // We expect the frontend to send { image: base64Data }
      if (data.image) {
        lastFrameTime = Date.now();

        // If simulation isn't running for this client, start it
        if (!simulationInterval) {
          console.log('[-] Receiving frames. Starting simulation for client.');
          simulationInterval = setInterval(() => {
            // Check if we haven't received a frame recently (client stopped camera)
            if (Date.now() - lastFrameTime > 2000) {
              clearInterval(simulationInterval);
              simulationInterval = null;
              console.log('[!] Client stopped sending frames. Pausing simulation.');
              ws.send(JSON.stringify({ status: 'Paused. No frames received.' }));
              return;
            }

            // Generate realistic variations
            mockBpm += (Math.random() - 0.5) * 2;
            mockSpo2 = Math.min(100, Math.max(95, mockSpo2 + (Math.random() - 0.3) * 0.5));
            mockStress += (Math.random() - 0.5) * 3;
            
            // Keep in bounds
            if (mockBpm < 60) mockBpm = 60;
            if (mockBpm > 100) mockBpm = 100;
            if (mockStress < 10) mockStress = 10;
            if (mockStress > 80) mockStress = 80;

            // Generate realistic PPG signal (simulating systolic/diastolic peaks)
            const time = Date.now() / 1000;
            const frequency = mockBpm / 60;
            // Primary wave
            const primary = Math.sin(time * frequency * Math.PI * 2);
            // Dicrotic notch simulation (smaller secondary wave)
            const secondary = 0.3 * Math.sin(time * frequency * Math.PI * 2 * 2 + Math.PI/4);
            // Noise
            const noise = (Math.random() * 0.1) - 0.05;
            
            const signal = primary + secondary + noise;

            const responsePayload = {
              bpm: Math.round(mockBpm),
              spo2: Math.round(mockSpo2),
              stress: Math.round(mockStress),
              signal: signal,
              status: 'Scanning (Backend Active)'
            };

            // Send data back to frontend
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(responsePayload));
            }
          }, 100); // Send updates every 100ms (10Hz) for smooth charts
        }
      }
    } catch (error) {
      console.error('[-] Error processing message:', error);
    }
  });

  ws.on('close', () => {
    activeConnections--;
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    console.log(`[-] Client Disconnected. Active connections: ${activeConnections}`);
  });

  ws.on('error', (error) => {
    console.error('[-] WebSocket Error:', error);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log('=============================================');
  console.log(`🚀 LimbVital Backend Server is running!`);
  console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}/ws`);
  console.log('=============================================');
});
