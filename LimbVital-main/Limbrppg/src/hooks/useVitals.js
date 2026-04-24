import { useState, useEffect, useCallback, useRef } from 'react';
import websocketService from '../services/websocket';
import cameraService from '../services/camera';
/**
 * Custom Hook for Real-time Vitals Detection
 * Integrates camera, WebSocket, and vitals processing
 */
export const useVitals = () => {
  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  // Vitals data
  const [vitals, setVitals] = useState({
    bpm: 0,
    spo2: 0,
    stress: 0,
    signal: 0,
    status: 'Initializing...'
  });
  // Signal history for chart
  const [signalHistory, setSignalHistory] = useState([]);
  const maxHistoryLength = 100;
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  // Refs
  const videoRef = useRef(null);
  const frameIntervalRef = useRef(null);
  const unsubscribeRef = useRef(null);
  /**
   * Initialize WebSocket connection
   */
  const connect = useCallback(async (url = 'ws://localhost:8000/ws') => {
    try {
      await websocketService.connect(url);
      setIsConnected(true);
      // Subscribe to messages
      unsubscribeRef.current = websocketService.onMessage((data) => {
        setVitals({
          bpm: data.bpm || 0,
          spo2: data.spo2 || 0,
          stress: data.stress || 0,
          signal: data.signal || 0,
          status: data.status || 'Processing...'
        });

        // Update signal history
        setSignalHistory(prev => {
          const newHistory = [...prev, data.signal || 0];
          return newHistory.slice(-maxHistoryLength);
        });
      });

      // Status handler
      websocketService.onStatusChange((status) => {
        setConnectionStatus(status);
        if (status === 'disconnected') {
          setIsConnected(false);
        }
      });

    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnected(false);
      throw error;
    }
  }, []);

  /**
   * Disconnect WebSocket
   */
  const disconnect = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    websocketService.disconnect();
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  /**
   * Start camera and begin frame streaming
   */
  const startCamera = useCallback(async (videoElement) => {
    try {
      setCameraError(null);
      await cameraService.start(videoElement);
      videoRef.current = videoElement;
      setIsCameraActive(true);

      // Start frame streaming (30 FPS)
      frameIntervalRef.current = setInterval(() => {
        if (websocketService.isConnected() && videoRef.current) {
          const frame = cameraService.captureFrame(videoRef.current);
          if (frame) {
            websocketService.sendFrame(frame);
          }
        }
      }, 33); // ~30 FPS

    } catch (error) {
      setCameraError(error.message);
      setIsCameraActive(false);
      throw error;
    }
  }, []);

  /**
   * Stop camera and frame streaming
   */
  const stopCamera = useCallback(() => {
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }

    cameraService.stop();
    videoRef.current = null;
    setIsCameraActive(false);
  }, []);
  /**
   * Reset vitals data
   */
  const resetVitals = useCallback(() => {
    setVitals({
      bpm: 0,
      spo2: 0,
      stress: 0,
      signal: 0,
      status: 'Initializing...'
    });
    setSignalHistory([]);
  }, []);
  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
      disconnect();
    };
  }, [stopCamera, disconnect]);
  return {
    // Connection
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    // Camera
    isCameraActive,
    cameraError,
    startCamera,
    stopCamera,
    // Vitals
    vitals,
    signalHistory,
    resetVitals,
    // Utilities
    isReady: isConnected && isCameraActive
  };
};
