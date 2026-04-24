import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import History from './pages/History';
// YE WALI LINE ADD KAREIN 
import Dashboard from './pages/Dashboard'; 
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;