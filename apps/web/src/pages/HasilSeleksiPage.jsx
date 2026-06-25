import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { generateAndDownloadPDF } from '../utils/documentGenerator';

export default function HasilSeleksiPage() {
  const [registrants, setRegistrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [generatingDocumentId, setGeneratingDocumentId] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    fetchRegistrants();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const { data, error } = await supabase
        .from('pendaftar_mpk')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      setRegistrants(data || []);
    } catch (error) {
      console.error('Error fetching registrants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRegistrants = registrants.filter(r => 
    r.nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.asal_kelas_formatted?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLihatDetail = (registrant) => {
    if (registrant.status === 'Belum Terverifikasi' || registrant.status === 'Tertangguhkan') {
      setModalData({
        isOpen: true,
        message: "Maaf, Anda belum memenuhi persyaratan atau data Anda sedang dalam proses pengecekan oleh Admin."
      });
    }
  };

  const handleCetakFormulir = async (registrant) => {
    setGeneratingDocumentId(registrant.id);
    try {
      const result = await generateAndDownloadPDF(registrant);
      if (result.isDocx) {
        setModalData({
          isOpen: true,
          message: "Perhatian: Anda mengunduh format DOCX karena ConvertAPI Secret belum diisi di file .env. Konversi ke PDF wajib menggunakan API karena batasan browser."
        });
      }
    } catch (error) {
      console.error(error);
      setModalData({
        isOpen: true,
        message: "Terjadi kesalahan saat memproses dokumen: " + error.message
      });
    } finally {
      setGeneratingDocumentId(null);
    }
  };

  return (
    <>
      <TopNavBar />
      <main className="min-h-screen bg-surface-container-lowest py-section-padding px-margin-mobile md:px-8 mt-10">
        <div className="max-w-container-max mx-auto">
          <h2 className="text-center font-display-lg text-headline-lg md:text-3xl font-bold text-on-surface mb-8 uppercase tracking-wide">
            Pengumuman Hasil Seleksi Pendaftaran
          </h2>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <input 
              type="text" 
              placeholder="Cari nama pendaftar atau kelas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-surface-variant rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
            />
            <button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-2 rounded-md font-label-md text-label-md transition-colors">
              Cari
            </button>
          </div>

          {/* Table */}
          <div className="border border-surface-variant rounded-lg overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-surface-variant">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-16">No.</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Nama Pendaftar</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-48">Asal Kelas</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-48">Status</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-64 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-surface-container-lowest divide-y divide-surface-variant">
                {filteredRegistrants.length > 0 ? (
                  filteredRegistrants.map((registrant, index) => (
                    <tr key={registrant.id || index} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-4 px-6 font-body-md text-on-surface">{index + 1}</td>
                      <td className="py-4 px-6 font-body-md text-on-surface font-medium">{registrant.nama_lengkap}</td>
                      <td className="py-4 px-6 font-body-md text-on-surface">{registrant.asal_kelas_formatted || registrant.asal_kelas}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          registrant.status === 'Terverifikasi' ? 'bg-green-100 text-green-800' : 
                          registrant.status === 'Tertangguhkan' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {registrant.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col gap-2 items-center">
                          <button 
                            onClick={() => handleCetakFormulir(registrant)}
                            disabled={generatingDocumentId !== null}
                            className="bg-[#4CAF50] hover:bg-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-label-md text-sm transition-colors shadow-sm w-full"
                          >
                            {generatingDocumentId === registrant.id ? 'Memproses...' : 'Cetak Formulir'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center font-body-md text-on-surface-variant">
                      Belum ada pendaftar yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Notifikasi */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setModalData({ ...modalData, isOpen: false })}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-6 max-w-sm w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">info</span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mb-2">Informasi</h3>
            <p className="font-body-md text-on-surface-variant mb-6">
              {modalData.message}
            </p>
            <button 
              onClick={() => setModalData({ ...modalData, isOpen: false })}
              className="w-full bg-primary text-white font-label-md text-label-md py-2.5 rounded-lg hover:bg-primary-dark transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
