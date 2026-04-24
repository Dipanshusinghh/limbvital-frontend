import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Brain, Shield, Zap, Activity } from 'lucide-react';
const Landing = () => { 
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-20 px-4 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">AI-Powered Health Monitor</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Monitor Your
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"> Heart </span>
                Anytime, Anywhere
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                No wearables needed. Just your camera and AI. Get real-time heart rate, 
                SpO2, and stress levels in seconds.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  <Heart className="w-6 h-6" fill="white" />
                  <span>Start Monitoring</span>
                </button>

                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <p className="text-3xl font-bold text-red-600">98%</p>
                  <p className="text-sm text-gray-600">Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">&lt;5s</p>
                  <p className="text-sm text-gray-600">Detection Time</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">0$</p>
                  <p className="text-sm text-gray-600">Hardware Cost</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image/Animation */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
                
                {/* Mock Dashboard */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                  
                  {/* Mock Video Feed */}
                  <div className="bg-gray-800 rounded-xl mb-4 aspect-video flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-600" />
                  </div>

                  {/* Mock Vitals */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 rounded-lg p-4">
                      <Heart className="w-6 h-6 text-red-500 mb-2" />
                      <p className="text-2xl font-bold text-red-600">72</p>
                      <p className="text-xs text-gray-600">BPM</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <Activity className="w-6 h-6 text-blue-500 mb-2" />
                      <p className="text-2xl font-bold text-blue-600">98</p>
                      <p className="text-xs text-gray-600">SpO2 %</p>
                    </div>
                  </div>

                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                  <span className="font-bold">LIVE</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for contactless health monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <FeatureCard
              icon={<Camera className="w-8 h-8" />}
              title="Camera-Based Detection"
              description="Uses your device camera to detect subtle color changes in your face caused by blood flow."
              color="from-blue-500 to-cyan-600"
            />

            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Real-Time Heart Rate"
              description="Get accurate BPM readings in just 5 seconds without any physical sensors."
              color="from-red-500 to-pink-600"
            />

            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Blood Oxygen (SpO2)"
              description="Monitor your blood oxygen saturation levels using advanced AI algorithms."
              color="from-purple-500 to-indigo-600"
            />

            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Stress Analysis"
              description="Track stress levels through heart rate variability (HRV) analysis."
              color="from-green-500 to-emerald-600"
            />

            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Privacy First"
              description="All processing happens locally. Your video never leaves your device."
              color="from-yellow-500 to-orange-600"
            />

            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Results"
              description="Get results in under 5 seconds with our optimized AI engine."
              color="from-pink-500 to-rose-600"
            />

          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Advanced rPPG technology in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <StepCard
              number="1"
              title="Camera Access"
              description="Allow camera access and position your face in the frame with good lighting."
            />

            <StepCard
              number="2"
              title="AI Analysis"
              description="Our AI detects subtle color changes in your face caused by blood flow using rPPG."
            />

            <StepCard
              number="3"
              title="Get Results"
              description="View your heart rate, SpO2, and stress levels in real-time on the dashboard."
            />

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Monitor Your Health?
          </h2>
          
          <p className="text-xl text-white/90 mb-8">
            Start tracking your vitals in seconds. No signup required.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          >
            <Heart className="w-6 h-6" />
            <span>Try LimbVital Now</span>
          </button>

        </div>
      </section>

    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${color} text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
// Step Card Component
const StepCard = ({ number, title, description }) => {
  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {number}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Landing;
