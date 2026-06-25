import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HasilSeleksiPage from './pages/HasilSeleksiPage';
import PetunjukPage from './pages/PetunjukPage';
import PendaftaranPage from './pages/PendaftaranPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrintLaporan from './pages/PrintLaporan';
import PrintFormulirPage from './pages/PrintFormulirPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pengumuman" element={<HasilSeleksiPage />} />
        <Route path="/petunjuk" element={<PetunjukPage />} />
        <Route path="/pendaftaran" element={<PendaftaranPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/print" element={<PrintLaporan />} />
        <Route path="/cetak-formulir/:id" element={<PrintFormulirPage />} />
      </Routes>
    </Router>
  );
}

export default App;
