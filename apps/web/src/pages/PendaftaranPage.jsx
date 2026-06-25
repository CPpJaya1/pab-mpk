import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

export default function PendaftaranPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isNotYetOpen, setIsNotYetOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isRegistrationNotYetOpen') === 'true') {
      setIsNotYetOpen(true);
    } else if (localStorage.getItem('isRegistrationClosed') === 'true') {
      setIsClosed(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const newRegistrant = Object.fromEntries(formData.entries());
    
    // Format Asal Kelas text nicely (e.g. x_kartini_1 -> X Kartini 1)
    const formatKelas = (val) => {
      if (!val) return '';
      return val.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };
    newRegistrant.asal_kelas_formatted = formatKelas(newRegistrant.asal_kelas);
    newRegistrant.status = 'Belum Terverifikasi';

    try {
      const { count, error: countError } = await supabase
        .from('pendaftar_mpk')
        .select('*', { count: 'exact', head: true });
        
      if (!countError) {
        newRegistrant.kode_pendaftar = String(count + 1);
      } else {
        newRegistrant.kode_pendaftar = String(Date.now());
      }

      const { error } = await supabase.from('pendaftar_mpk').insert([newRegistrant]);
      if (error) throw error;

      alert("Pendaftaran berhasil disimpan. Anda akan diarahkan ke halaman pengumuman.");
      navigate('/pengumuman');
    } catch (error) {
      alert("Terjadi kesalahan saat mendaftar: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopNavBar />
      <main className="min-h-screen bg-surface-container-lowest py-section-padding px-margin-mobile md:px-8 mt-10 relative">
        {/* Registration Status Modals */}
        {(isClosed || isNotYetOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative bg-surface border border-surface-variant rounded-xl p-8 max-w-md w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isNotYetOpen ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
                <span className="material-symbols-outlined text-4xl">
                  {isNotYetOpen ? 'pending_actions' : 'block'}
                </span>
              </div>
              <h3 className="font-headline-sm font-bold text-on-surface mb-4">
                {isNotYetOpen ? 'Pendaftaran Belum Dibuka' : 'Pendaftaran Ditutup'}
              </h3>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                {isNotYetOpen 
                  ? 'Pendaftaran penerimaan anggota baru belum dibuka dan akan dibuka pada 24 Juli 2026.' 
                  : 'Pendaftaran penerimaan anggota baru 2026 telah ditutup. Terima kasih atas antusiasme Anda!'}
              </p>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary/90 hover:shadow-md transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

        <div className={`max-w-container-max mx-auto ${(isClosed || isNotYetOpen) ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>app_registration</span>
            <h2 className="font-display-lg text-headline-lg md:text-3xl font-bold text-on-surface uppercase tracking-wide">
              Formulir Pendaftaran
            </h2>
          </div>
          
          <div className="bg-surface border border-surface-variant rounded-xl p-8 max-w-3xl mx-auto shadow-sm">
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
              Pastikan data yang Anda masukkan adalah benar dan dapat dipertanggungjawabkan. Semua field wajib diisi.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="nama_lengkap">Nama Lengkap</label>
                <input required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="nama_lengkap" name="nama_lengkap" placeholder="Masukkan nama lengkap sesuai identitas" type="text" />
              </div>
              
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Jenis Kelamin</label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input required type="radio" name="jenis_kelamin" value="laki-laki" className="text-primary focus:ring-primary border-surface-variant" />
                    <span className="font-body-md text-on-surface">Laki-laki</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input required type="radio" name="jenis_kelamin" value="perempuan" className="text-primary focus:ring-primary border-surface-variant" />
                    <span className="font-body-md text-on-surface">Perempuan</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="tempat_lahir">Tempat Lahir</label>
                  <input required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="tempat_lahir" name="tempat_lahir" placeholder="Kota kelahiran" type="text" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                  <input required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="tanggal_lahir" name="tanggal_lahir" type="date" />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="alamat">Alamat Lengkap</label>
                <textarea required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="alamat" name="alamat" placeholder="Masukkan alamat domisili saat ini" rows="3"></textarea>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="nama_orang_tua">Nama Orang Tua</label>
                <input required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="nama_orang_tua" name="nama_orang_tua" placeholder="Masukkan nama ayah/ibu/wali" type="text" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="asal_kelas">Asal Kelas</label>
                  <select required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="asal_kelas" name="asal_kelas" defaultValue="">
                    <option disabled value="">Pilih kelas Anda saat ini</option>
                    <option value="x_kartini_1">X Kartini 1</option>
                    <option value="x_kartini_2">X Kartini 2</option>
                    <option value="x_kartini_3">X Kartini 3</option>
                    <option value="x_kartini_4">X Kartini 4</option>
                    <option value="x_kartini_5">X Kartini 5</option>
                    <option value="x_kartini_6">X Kartini 6</option>
                    <option value="x_kartini_7">X Kartini 7</option>
                    <option value="x_kartini_8">X Kartini 8</option>
                    <option value="x_kartini_9">X Kartini 9</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="nomor_telepon">Nomor Telepon / WhatsApp</label>
                  <input required className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-md bg-surface-container-lowest" id="nomor_telepon" name="nomor_telepon" placeholder="Contoh: 081234567890" type="tel" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-label-md text-label-md uppercase py-3.5 rounded-lg hover:shadow-md hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
