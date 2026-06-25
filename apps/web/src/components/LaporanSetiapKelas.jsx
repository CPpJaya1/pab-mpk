import React from 'react';

export default function LaporanSetiapKelas() {
  const classes = [
    'X Kartini 1', 'X Kartini 2', 'X Kartini 3',
    'X Kartini 4', 'X Kartini 5', 'X Kartini 6',
    'X Kartini 7', 'X Kartini 8', 'X Kartini 9'
  ];

  const openPrintWindow = (kelas) => {
    window.open(`/print?type=kelas&kelas=${encodeURIComponent(kelas)}`, '_blank');
  };

  return (
    <div className="bg-surface border border-surface-variant rounded-2xl p-8 min-h-[400px] shadow-sm">
      <h2 className="font-headline-md text-on-surface mb-6">Laporan Setiap Kelas</h2>
      <p className="font-body-md text-on-surface-variant mb-8">
        Pilih kelas di bawah ini untuk melihat dan mencetak data lengkap pendaftar berdasarkan kelas tersebut.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((kelas, index) => (
          <button 
            key={index}
            onClick={() => openPrintWindow(kelas)}
            className="bg-[#26A69A] hover:bg-[#00897B] text-white font-label-md text-base px-6 py-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-3 w-full"
          >
            <span className="material-symbols-outlined text-[24px]">download</span>
            Data {kelas}
          </button>
        ))}
      </div>
    </div>
  );
}
