import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PendaftarList from '../components/PendaftarList';
import DataPendaftarList from '../components/DataPendaftarList';
import LaporanPendaftaranList from '../components/LaporanPendaftaranList';
import LaporanSetiapKelas from '../components/LaporanSetiapKelas';
import EditorPengumuman from '../components/EditorPengumuman';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Verifikasi Pendaftar');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isExitToWebsiteModalOpen, setIsExitToWebsiteModalOpen] = useState(false);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const [isRegistrationNotYetOpen, setIsRegistrationNotYetOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth !== 'true') {
      navigate('/login');
    }
    const closedStatus = localStorage.getItem('isRegistrationClosed') === 'true';
    setIsRegistrationClosed(closedStatus);
    
    const notYetOpenStatus = localStorage.getItem('isRegistrationNotYetOpen') === 'true';
    setIsRegistrationNotYetOpen(notYetOpenStatus);
  }, [navigate]);

  const toggleRegistrationRight = () => {
    const newState = !isRegistrationClosed;
    setIsRegistrationClosed(newState);
    localStorage.setItem('isRegistrationClosed', String(newState));
    if (newState) {
      setIsRegistrationNotYetOpen(false);
      localStorage.setItem('isRegistrationNotYetOpen', 'false');
    }
  };

  const toggleRegistrationLeft = () => {
    const newState = !isRegistrationNotYetOpen;
    setIsRegistrationNotYetOpen(newState);
    localStorage.setItem('isRegistrationNotYetOpen', String(newState));
    if (newState) {
      setIsRegistrationClosed(false);
      localStorage.setItem('isRegistrationClosed', 'false');
    }
  };

  const confirmLogout = async () => {
    try {
      await import('../lib/supabaseClient').then(module => module.supabase.auth.signOut());
    } catch (error) {
      console.error('Error signing out:', error);
    }
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const menuItems = [
    { name: 'Verifikasi Pendaftar', icon: 'verified_user' },
    { name: 'Pendaftar', icon: 'groups' },
    { name: 'Laporan Pendaftaran', icon: 'summarize' },
    { name: 'Laporan Setiap Kelas', icon: 'bar_chart' },
    { name: 'Editor', icon: 'edit_document' },
  ];

  return (
    <div className="flex h-screen bg-surface-container-lowest overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-surface-variant flex flex-col">
        <div className="p-6 border-b border-surface-variant flex items-center justify-center flex-col">
          <div className="w-16 h-16 bg-surface-container-lowest rounded-full overflow-hidden flex items-center justify-center mb-3 border border-surface-variant shadow-sm">
            <img src="/logo.png" alt="Logo MPK" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-headline-sm font-bold text-on-surface">Admin MPK</h2>
          <p className="font-body-sm text-on-surface-variant">Panel Pengurus</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-label-md transition-colors ${
                activeTab === item.name 
                  ? 'bg-primary text-on-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === item.name ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-variant">
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-label-md text-error hover:bg-error/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Keluar
          </button>
          <button 
            onClick={() => setIsExitToWebsiteModalOpen(true)} 
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-left font-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            Lihat Website
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Placeholder */}
        <header className="h-20 bg-surface border-b border-surface-variant flex items-center px-8 justify-between">
          <h1 className="font-headline-md font-bold text-on-surface">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleRegistrationLeft}
              className={`font-label-md px-6 py-2.5 rounded-lg hover:shadow-md transition-all flex items-center gap-2 ${
                isRegistrationNotYetOpen 
                  ? 'bg-secondary text-on-secondary hover:bg-secondary/90' 
                  : 'bg-primary text-on-primary hover:bg-primary/90'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isRegistrationNotYetOpen ? 'toggle_on' : 'toggle_off'}
              </span>
              {isRegistrationNotYetOpen ? 'Nyalakan Pendaftaran' : 'Matikan Pendaftaran'}
            </button>
            <button 
              onClick={toggleRegistrationRight}
              className={`font-label-md px-6 py-2.5 rounded-lg hover:shadow-md transition-all flex items-center gap-2 ${
                isRegistrationClosed 
                  ? 'bg-error text-white hover:bg-error/90' 
                  : 'bg-primary text-on-primary hover:bg-primary/90'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isRegistrationClosed ? 'toggle_on' : 'toggle_off'}
              </span>
              {isRegistrationClosed ? 'Nyalakan Pendaftaran' : 'Matikan Pendaftaran'}
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-surface-container-lowest">
          {activeTab === 'Verifikasi Pendaftar' ? (
            <PendaftarList />
          ) : activeTab === 'Pendaftar' ? (
            <DataPendaftarList />
          ) : activeTab === 'Laporan Pendaftaran' ? (
            <LaporanPendaftaranList />
          ) : activeTab === 'Laporan Setiap Kelas' ? (
            <LaporanSetiapKelas />
          ) : activeTab === 'Editor' ? (
            <EditorPengumuman />
          ) : (
            <div className="bg-surface border border-surface-variant rounded-2xl p-8 min-h-[400px] flex items-center justify-center text-center shadow-sm">
              <div>
                <span className="material-symbols-outlined text-6xl text-surface-variant mb-4">construction</span>
                <h2 className="font-headline-md text-on-surface mb-2">Area {activeTab}</h2>
                <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
                  Konten untuk bagian ini sedang dalam tahap pengembangan sesuai instruksi selanjutnya.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-6 max-w-sm w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">logout</span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mb-2">Apakah Anda Yakin?</h3>
            <p className="font-body-md text-on-surface-variant mb-6">
              Anda akan keluar dari sesi admin dan harus login kembali untuk masuk.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 bg-surface border border-outline text-on-surface-variant font-label-md text-label-md py-2.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 bg-error text-white font-label-md text-label-md py-2.5 rounded-lg hover:bg-error/90 hover:shadow-md transition-all"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit to Website Confirmation Modal */}
      {isExitToWebsiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsExitToWebsiteModalOpen(false)}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-6 max-w-sm w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">public</span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mb-2">Beralih Halaman?</h3>
            <p className="font-body-md text-on-surface-variant mb-6">
              Anda akan keluar dari laman dashboard admin dan kembali ke tampilan awal (website pengunjung).
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsExitToWebsiteModalOpen(false)}
                className="flex-1 bg-surface border border-outline text-on-surface-variant font-label-md text-label-md py-2.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded-lg hover:bg-primary/90 hover:shadow-md transition-all"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
