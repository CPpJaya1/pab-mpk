import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function PrintLaporan() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'lengkap'; // lengkap, terverifikasi, belum_terverifikasi, tertangguhkan, individu
  const id = searchParams.get('id');
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [type, id]);

  const fetchData = async () => {
    try {
      let query = supabase.from('pendaftar_mpk').select('*').order('id', { ascending: true });

      if (type === 'individu' && id) {
        query = query.eq('id', id);
      } else if (type === 'terverifikasi') {
        query = query.eq('status', 'Terverifikasi');
      } else if (type === 'belum_terverifikasi') {
        query = query.eq('status', 'Belum Terverifikasi');
      } else if (type === 'tertangguhkan') {
        query = query.eq('status', 'Tertangguhkan');
      } else if (type === 'kelas' && searchParams.get('kelas')) {
        const dbKelas = searchParams.get('kelas').toLowerCase().replace(/ /g, '_');
        query = query.eq('asal_kelas', dbKelas);
      }

      const { data: result, error } = await query;
      if (error) throw error;
      
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data for print:', error);
      alert('Gagal mengambil data untuk dicetak.');
    } finally {
      setIsLoading(false);
      // Wait for React to render the table before opening print dialog
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  const getTitle = () => {
    if (type === 'individu') return 'FORMULIR PENDAFTARAN INDIVIDU';
    if (type === 'terverifikasi') return 'DATA LENGKAP PENDAFTAR TERVERIFIKASI';
    if (type === 'belum_terverifikasi') return 'DATA LENGKAP PENDAFTAR BELUM TERVERIFIKASI';
    if (type === 'tertangguhkan') return 'DATA LENGKAP PENDAFTAR TERTANGGUHKAN';
    return 'DATA LENGKAP PENDAFTAR';
  };

  if (isLoading) {
    return <div className="p-8 text-center font-body-md">Mempersiapkan dokumen...</div>;
  }

  // Individual Form Print Layout
  if (type === 'individu') {
    const registrant = data[0];
    if (!registrant) return <div className="p-8">Data tidak ditemukan.</div>;

    return (
      <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans">
        <h1 className="text-2xl font-bold text-center mb-8 uppercase border-b-2 border-black pb-4">{getTitle()}</h1>
        
        <table className="w-full mb-8 text-sm border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold w-48 uppercase">Nama Lengkap</td>
              <td className="py-3 uppercase">: {registrant.nama_lengkap}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Tempat, Tanggal Lahir</td>
              <td className="py-3 uppercase">: {registrant.tempat_lahir}, {registrant.tanggal_lahir}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Jenis Kelamin</td>
              <td className="py-3 uppercase">: {registrant.jenis_kelamin}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Asal Kelas</td>
              <td className="py-3 uppercase">: {registrant.asal_kelas_formatted || registrant.asal_kelas}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Nama Orang Tua/Wali</td>
              <td className="py-3 uppercase">: {registrant.nama_orang_tua}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase align-top">Alamat Siswa</td>
              <td className="py-3 uppercase">: {registrant.alamat}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Nomor Telepon</td>
              <td className="py-3 uppercase">: {registrant.nomor_telepon}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 font-semibold uppercase">Status Saat Ini</td>
              <td className="py-3 uppercase">: {registrant.status || 'Belum Terverifikasi'}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-16 flex justify-end">
          <div className="text-center">
            <p className="mb-16 uppercase text-sm">Pekalongan, ..........................</p>
            <p className="uppercase text-sm border-b border-black pb-1 mb-1">{registrant.nama_lengkap}</p>
            <p className="uppercase text-xs text-gray-600">Tanda Tangan Pendaftar</p>
          </div>
        </div>
      </div>
    );
  }

  // Full/Filtered List Print Layout
  return (
    <div className="bg-white text-black p-4 md:p-8 font-sans w-full max-w-[1400px] mx-auto print:max-w-none print:p-0">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-8 uppercase">
        {type === 'lengkap' ? 'DATA LENGKAP PENDAFTAR' : 
         type === 'kelas' ? <>DATA LENGKAP PENDAFTAR <span className="font-extrabold">{searchParams.get('kelas')}</span></> :
         type === 'terverifikasi' ? <>DATA LENGKAP PENDAFTAR <span className="font-extrabold">TERVERIFIKASI</span></> : 
         type === 'belum_terverifikasi' ? <>DATA LENGKAP PENDAFTAR <span className="font-extrabold">BELUM TERVERIFIKASI</span></> :
         <>DATA LENGKAP PENDAFTAR <span className="font-extrabold">TERTANGGUHKAN</span></>}
      </h1>
      
      <table className="w-full text-left border-collapse text-[11px] md:text-xs">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-2 pr-2 font-bold">No.</th>
            <th className="py-2 px-2 font-bold">Nama Pendaftar</th>
            <th className="py-2 px-2 font-bold">Tempat Lahir</th>
            <th className="py-2 px-2 font-bold">Tanggal Lahir</th>
            <th className="py-2 px-2 font-bold">Jenis Kelamin</th>
            <th className="py-2 px-2 font-bold">Asal Kelas</th>
            <th className="py-2 px-2 font-bold">Nama Orang Tua/Wali</th>
            <th className="py-2 px-2 font-bold">Alamat Siswa</th>
            <th className="py-2 pl-2 font-bold">Nomor Telepon</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((registrant, index) => (
            <tr key={registrant.id} className="border-b border-gray-200">
              <td className="py-3 pr-2 align-top">{index + 1}</td>
              <td className="py-3 px-2 align-top">{registrant.nama_lengkap}</td>
              <td className="py-3 px-2 align-top">{registrant.tempat_lahir}</td>
              <td className="py-3 px-2 align-top">{registrant.tanggal_lahir}</td>
              <td className="py-3 px-2 align-top capitalize">{registrant.jenis_kelamin}</td>
              <td className="py-3 px-2 align-top">{registrant.asal_kelas_formatted || registrant.asal_kelas}</td>
              <td className="py-3 px-2 align-top">{registrant.nama_orang_tua}</td>
              <td className="py-3 px-2 align-top pr-4">{registrant.alamat}</td>
              <td className="py-3 pl-2 align-top">{registrant.nomor_telepon}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="9" className="py-8 text-center text-gray-500 italic">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div className="mt-8 text-[10px] text-gray-500">
        Laporan per {new Date().toLocaleString('id-ID')}
      </div>
    </div>
  );
}
