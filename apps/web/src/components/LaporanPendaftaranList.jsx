import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LaporanPendaftaranList() {
  const [registrants, setRegistrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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

  const openDetail = (registrant) => {
    setSelectedRegistrant(registrant);
    setIsDetailModalOpen(true);
  };

  const openPrintWindow = (type, id = null) => {
    let url = `/print?type=${type}`;
    if (id) {
      url += `&id=${id}`;
    }
    window.open(url, '_blank');
  };

  const handleCetakFormulir = (registrant) => {
    if (registrant.file_url) {
      window.open(registrant.file_url, '_blank');
    } else {
      alert('File formulir belum diunggah untuk pendaftar ini.');
    }
  };

  return (
    <div className="bg-surface border border-surface-variant rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      {/* Top action buttons */}
      <div className="p-6 border-b border-surface-variant bg-surface-container-lowest flex flex-wrap gap-3">
        <button 
          onClick={() => openPrintWindow('lengkap')}
          className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Laporan Lengkap
        </button>
        <button 
          onClick={() => openPrintWindow('terverifikasi')}
          className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Laporan Terverifikasi
        </button>
        <button 
          onClick={() => openPrintWindow('belum_terverifikasi')}
          className="bg-[#FFCA28] hover:bg-[#FFB300] text-[#5D4037] font-label-md text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Laporan Belum Terverifikasi
        </button>
        <button 
          onClick={() => openPrintWindow('tertangguhkan')}
          className="bg-[#EF5350] hover:bg-[#E53935] text-white font-label-md text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Laporan Tertangguhkan
        </button>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-variant">
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-16">No.</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Nama pendaftar</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-48">Jenis kelamin</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-[300px] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-surface-container-lowest divide-y divide-surface-variant">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="py-8 text-center font-body-md text-on-surface-variant">
                  Memuat data...
                </td>
              </tr>
            ) : registrants.length > 0 ? (
              registrants.map((registrant, index) => (
                <tr key={registrant.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-6 font-body-md text-on-surface">{index + 1}</td>
                  <td className="py-4 px-6 font-body-md text-on-surface font-medium">{registrant.nama_lengkap}</td>
                  <td className="py-4 px-6 font-body-md text-on-surface capitalize">{registrant.jenis_kelamin}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleCetakFormulir(registrant)}
                        className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1"
                        title="Cetak Formulir"
                      >
                        <span className="material-symbols-outlined text-[16px]">print</span>
                        Cetak Formulir
                      </button>
                      <button 
                        onClick={() => openDetail(registrant)}
                        className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1"
                        title="Detail"
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center font-body-md text-on-surface-variant">
                  Belum ada pendaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedRegistrant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsDetailModalOpen(false)}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-0 max-w-2xl w-full shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-surface-variant bg-surface-container-lowest">
              <h3 className="font-headline-sm font-bold text-on-surface">Detail Pendaftar</h3>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <table className="w-full text-left border-collapse border border-surface-variant">
                <tbody className="divide-y divide-surface-variant">
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant w-48 bg-surface-container-lowest border-r border-surface-variant">NAMA</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase font-medium">{selectedRegistrant.nama_lengkap}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">TEMPAT LAHIR</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.tempat_lahir}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">TANGGAL LAHIR</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.tanggal_lahir}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">JENIS KELAMIN</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.jenis_kelamin}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">ASAL KELAS</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.asal_kelas_formatted || selectedRegistrant.asal_kelas}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">NAMA ORANG TUA/WALI</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.nama_orang_tua}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">ALAMAT SISWA</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.alamat}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-label-md text-on-surface-variant bg-surface-container-lowest border-r border-surface-variant">NOMOR TELEPON</td>
                    <td className="py-3 px-4 font-body-md text-on-surface uppercase">{selectedRegistrant.nomor_telepon}</td>
                  </tr>
                </tbody>
              </table>
              
              {selectedRegistrant.file_url && (
                <div className="mt-4 p-4 bg-green-50 text-green-800 rounded border border-green-200 text-sm flex items-center justify-between">
                  <span>File formulir telah diunggah.</span>
                  <a href={selectedRegistrant.file_url} target="_blank" rel="noreferrer" className="underline font-medium hover:text-green-900">Lihat File</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
