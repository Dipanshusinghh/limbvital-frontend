import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              <h3 className="text-xl font-bold">LimbVital</h3>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered heart rate monitoring using your camera. 
              Get real-time health insights without any wearables.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-red-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/history" className="hover:text-red-400 transition-colors">History</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@limbvital.com"
                className="hover:text-red-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              contact@limbvital.com
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} LimbVital. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="hover:text-red-400 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-red-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
          <p className="text-xs text-yellow-400">
            ⚠️ <strong>Medical Disclaimer:</strong> LimbVital is for informational purposes only and is not a substitute 
            for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
