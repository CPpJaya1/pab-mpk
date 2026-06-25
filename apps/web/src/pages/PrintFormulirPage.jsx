import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CetakFormulirTemplate from '../components/CetakFormulirTemplate';
import { generateAndDownloadPDF } from '../utils/documentGenerator';

const PrintFormulirPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registrant, setRegistrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrant = async () => {
      try {
        const { data, error } = await supabase
          .from('pendaftar_mpk')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setRegistrant(data);
        
        // Wait a bit for data to settle, then trigger PDF download
        setTimeout(() => {
            generateAndDownloadPDF(data);
        }, 800);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data pendaftar.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRegistrant();
    }
  }, [id]);



  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Menyiapkan dokumen cetak...</div>;
  }

  if (error || !registrant) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 text-red-600">{error || "Data tidak ditemukan."}</div>;
  }

  return (
    <div className="print-page-wrapper">
      <div className="print-controls no-print fixed top-4 right-4 flex gap-4">
        <button 
          onClick={() => generateAndDownloadPDF(registrant)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Unduh Ulang PDF
        </button>
        <button 
          onClick={() => navigate('/hasil-seleksi')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Kembali
        </button>
      </div>
      <CetakFormulirTemplate registrant={registrant} />
    </div>
  );
};

export default PrintFormulirPage;
