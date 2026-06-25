import React from 'react';

export default function PetunjukModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-surface border border-surface-variant rounded-xl p-8 max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu_book
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface uppercase">Petunjuk Pendaftaran</h3>
        </div>
        
        <div className="space-y-6 text-on-surface-variant font-body-md text-body-md leading-relaxed">
          <section>
            <h4 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">A. Tahapan Pendaftaran</h4>
            <ol className="list-decimal list-outside pl-5 space-y-1">
              <li>Akses menu PENDAFTARAN pada website, lengkapi seluruh form yang tersedia, lalu klik SIMPAN.</li>
              <li>Unduh dan cetak formulir pendaftaran Anda melalui halaman PENGUMUMAN.</li>
              <li>Pada formulir yang telah dicetak, tuliskan MOTO Anda di kolom yang tersedia dan tempelkan pas foto 3x4.</li>
              <li>Hadiri proses seleksi sesuai dengan jadwal yang ditentukan dan ikuti instruksi lebih lanjut dari Panitia Penerimaan Anggota Baru MPK 2025.</li>
              <li>Pastikan Anda membawa Formulir Pendaftaran saat mengikuti tahapan seleksi.</li>
            </ol>
          </section>

          <section>
            <h4 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">B. Panduan Cetak/Unduh Formulir (PC/Laptop)</h4>
            <ol className="list-decimal list-outside pl-5 space-y-1">
              <li>Buka halaman PENGUMUMAN.</li>
              <li>Klik tombol CETAK FORMULIR PENDAFTARAN.</li>
              <li>Saat muncul PENGATURAN PRINT, arahkan pada bagian PRINTER, lalu pilih opsi "Microsoft Print to PDF" atau "Save as PDF".</li>
              <li>Klik Print/Simpan, kemudian pilih folder penyimpanan di komputer Anda.</li>
              <li>Formulir berhasil diunduh dan siap untuk dicetak.</li>
            </ol>
          </section>

          <section>
            <h4 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">C. Panduan Unduh Formulir (Smartphone/Android)</h4>
            <ol className="list-decimal list-outside pl-5 space-y-1">
              <li>Buka halaman PENGUMUMAN.</li>
              <li>Ketuk tombol CETAK FORMULIR PENDAFTARAN.</li>
              <li>Pada pengaturan cetak, ketuk pilihan Printer (biasanya di bagian atas), lalu pilih "Simpan sebagai PDF".</li>
              <li>Ketuk ikon Unduh/Download dan tentukan lokasi penyimpanan di perangkat Anda.</li>
              <li>File formulir telah tersimpan dan siap untuk dicetak.</li>
            </ol>
          </section>

          <section className="bg-surface-variant p-4 rounded-lg mt-6">
            <p className="mb-2">Jika Anda mengalami kendala, silakan hubungi kami melalui WhatsApp atau Telegram:</p>
            <ul className="list-none space-y-1 font-medium text-on-surface">
              <li>Kak Lola: <a href="https://wa.me/6282135305838" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">+62 821-3530-5838</a></li>
              <li>Kak Anin: <a href="https://wa.me/6285549088958" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">+62 855-4908-8958</a></li>
            </ul>
          </section>
        </div>
        
        <div className="flex justify-end mt-8">
          <button 
            onClick={onClose}
            className="bg-primary text-on-primary font-label-md text-label-md uppercase px-6 py-2.5 rounded-lg hover:opacity-90 hover:shadow-sm transition-all duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
