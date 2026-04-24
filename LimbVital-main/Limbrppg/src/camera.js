/**
 * LimbVital CameraService
 * Camera start, stop aur capture ke liye.
 */
const CameraService = {
  stream: null,
  canvas: null,
  ctx: null,

  async start(videoEl) {
    // Pehle se chal raha hai toh band karo
    if (this.stream) {
      this.stop();
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user',
          frameRate: 15,
        },
        audio: false,
      });

      videoEl.srcObject = this.stream;
      await videoEl.play();

      // Frame nikalne ke liye hidden canvas setup
      this.canvas = document.createElement('canvas');
      this.canvas.width = 640;
      this.canvas.height = 480;
      this.ctx = this.canvas.getContext('2d');
  
      console.log('✅ Camera chalu ho gaya');
    } catch (err) {
      console.error('❌ Camera error:', err);
      // Simple error handling
      if (err.name === 'NotAllowedError') {
        throw new Error('Camera permission dedo bhai!');
      } else {
        throw new Error('Camera nahi chal raha');
      }
    }
  },
  captureFrame(videoEl) {
    if (!this.stream || !this.ctx || videoEl.readyState < 2) return null;
    try {
      // Current frame ko image banao
      this.ctx.drawImage(videoEl, 0, 0, this.canvas.width, this.canvas.height);
      return this.canvas.toDataURL('image/jpeg', 0.8);
    } catch (err) {
      return null;
    }
  },
  stop() {
    if (this.stream) {
      // Saare tracks band karo taaki green light off ho jaye
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    // Video elements ko khaali karo
    document.querySelectorAll('video').forEach((v) => {
      v.srcObject = null;
    });
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    console.log('🛑 Camera band');
  },
  isActive() {
    return !!(this.stream && this.stream.active);
  },
};
export default CameraService;