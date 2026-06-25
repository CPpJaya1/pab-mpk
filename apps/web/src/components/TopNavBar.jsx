import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isProfilModalOpen, setIsProfilModalOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-surface-variant flex justify-between items-center w-full px-margin-mobile md:px-8 max-w-container-max mx-auto h-20 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="/logo.png" alt="Logo MPK SMA 1 Pekalongan" className="h-12 w-auto" />
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md hover:bg-surface-container-low px-3 py-2 rounded-DEFAULT" to="/pengumuman">Pengumuman</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md hover:bg-surface-container-low px-3 py-2 rounded-DEFAULT" to="/pendaftaran">Pendaftaran</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md hover:bg-surface-container-low px-3 py-2 rounded-DEFAULT" to="/petunjuk">Petunjuk</Link>
        <button onClick={() => setIsProfilModalOpen(true)} className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md hover:bg-surface-container-low px-3 py-2 rounded-DEFAULT">Profil MPK</button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {!isHome && (
          <Link to="/" className="border border-outline text-on-surface-variant p-2.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all duration-200 flex items-center justify-center" aria-label="Kembali" title="Kembali">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
        )}
        <Link to="/login" className="bg-primary text-on-primary font-label-md text-label-md uppercase px-6 py-2.5 rounded-lg hover:shadow-sm hover:opacity-90 transition-all duration-200">
          LOGIN PENGURUS
        </Link>
      </div>
      <button className="md:hidden text-on-surface">
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Profil MPK Modal */}
      {isProfilModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsProfilModalOpen(false)}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-8 max-w-md w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">construction</span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mb-4">Dalam Tahap Pengembangan</h3>
            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
              Website resmi profil MPK masih dalam tahap pengembangan. Nantikan pembaruan selanjutnya!
            </p>
            <button 
              onClick={() => setIsProfilModalOpen(false)}
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary/90 hover:shadow-md transition-all"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
