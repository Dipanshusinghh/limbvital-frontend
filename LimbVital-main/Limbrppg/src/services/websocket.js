let socket = null;
let reconnectCount = 0;
const maxRetries = 5;
let messageCallbacks = [];
let statusCallbacks = [];

function updateStatus(status) {
  statusCallbacks.forEach(cb => cb(status));
}

const WebSocketService = {
  connect(url = 'ws://localhost:8000/ws') {
    return new Promise((resolve, reject) => {
      try {
        socket = new WebSocket(url);
        
        socket.onopen = () => {
          console.log('Connected to Backend Server!');
          reconnectCount = 0;
          updateStatus('connected');
          resolve();
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          messageCallbacks.forEach(callback => callback(data));
        };

        socket.onerror = (err) => {
          console.log('WS Error:', err);
          updateStatus('error');
          if (socket.readyState !== WebSocket.OPEN) {
            reject(err);
          }
        };

        socket.onclose = () => {
          console.log('Connection closed');
          updateStatus('disconnected');
          if (reconnectCount < maxRetries) {
            reconnectCount++;
            console.log('Trying to reconnect... attempt ' + reconnectCount);
            setTimeout(() => this.connect(url), 2000);
          }
        };
      } catch (e) {
        console.error("Connection failed", e);
        reject(e);
      }
    });
  },

  sendFrame(imageData) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ image: imageData }));
      return true;
    }
    return false;
  },

  onMessage(callback) {
    messageCallbacks.push(callback);
    return () => {
      messageCallbacks = messageCallbacks.filter(cb => cb !== callback);
    };
  },

  onStatusChange(callback) {
    statusCallbacks.push(callback);
    return () => {
      statusCallbacks = statusCallbacks.filter(cb => cb !== callback);
    };
  },

  isConnected() {
    return socket !== null && socket.readyState === WebSocket.OPEN;
  },

  disconnect() {
    if (socket) {
      reconnectCount = maxRetries;
      socket.close();
      socket = null;
    }
    updateStatus('disconnected');
  }
};

export default WebSocketService;