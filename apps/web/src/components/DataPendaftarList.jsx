import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function DataPendaftarList() {
  const [registrants, setRegistrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [registrantToDelete, setRegistrantToDelete] = useState(null);

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

  const openDeleteModal = (registrant) => {
    setRegistrantToDelete(registrant);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!registrantToDelete) return;
    
    try {
      const { error } = await supabase
        .from('pendaftar_mpk')
        .delete()
        .eq('id', registrantToDelete.id);
      
      if (error) throw error;
      
      setRegistrants(registrants.filter(r => r.id !== registrantToDelete.id));
      setIsDeleteModalOpen(false);
      setRegistrantToDelete(null);
    } catch (error) {
      alert("Gagal menghapus data: " + error.message);
    }
  };

  return (
    <div className="bg-surface border border-surface-variant rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-variant">
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-16">No.</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-32">Kode pendaftar</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Nama Pendaftar</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-48">Waktu Pendaftaran</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-32">Jenis Kelamin</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-48">Status</th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant w-[200px] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-surface-container-lowest divide-y divide-surface-variant">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-8 text-center font-body-md text-on-surface-variant">
                  Memuat data...
                </td>
              </tr>
            ) : registrants.length > 0 ? (
              registrants.map((registrant, index) => (
                <tr key={registrant.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-6 font-body-md text-on-surface">{index + 1}</td>
                  <td className="py-4 px-6 font-body-md text-on-surface">{registrant.kode_pendaftar || registrant.id}</td>
                  <td className="py-4 px-6 font-body-md text-on-surface font-medium">{registrant.nama_lengkap}</td>
                  <td className="py-4 px-6 font-body-md text-on-surface">
                    {registrant.created_at ? new Date(registrant.created_at).toLocaleString('en-GB', {
                      timeZone: 'Asia/Jakarta',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    }).replace(', ', ':') + ' WIB' : '-'}
                  </td>
                  <td className="py-4 px-6 font-body-md text-on-surface capitalize">{registrant.jenis_kelamin}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      registrant.status === 'Terverifikasi' ? 'bg-green-100 text-green-800' : 
                      registrant.status === 'Tertangguhkan' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registrant.status || 'Belum Terverifikasi'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(registrant)}
                        className="bg-[#EF5350] hover:bg-[#E53935] text-white font-label-md text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        Hapus
                      </button>
                      <button 
                        onClick={() => openDetail(registrant)}
                        className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1"
                        title="Detail"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center font-body-md text-on-surface-variant">
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && registrantToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative bg-surface border border-surface-variant rounded-xl p-6 max-w-sm w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mb-2">Hapus Data</h3>
            <p className="font-body-md text-on-surface-variant mb-6">
              Apakah Anda yakin untuk menghapus data dengan kode pendaftar {registrantToDelete.kode_pendaftar || registrantToDelete.id}?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-surface border border-outline text-on-surface-variant font-label-md text-label-md py-2.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-error text-white font-label-md text-label-md py-2.5 rounded-lg hover:bg-error/90 hover:shadow-md transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
