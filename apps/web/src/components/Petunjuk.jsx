import React from 'react';

export default function Petunjuk() {
  return (
    <section className="bg-surface py-section-padding" id="petunjuk">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
          <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile text-on-surface uppercase">Petunjuk Pendaftaran</h2>
        </div>
        
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 md:p-10 shadow-sm">
          <div className="space-y-8 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
            <section>
              <h4 className="font-title-lg text-title-lg text-on-surface mb-3 font-semibold">A. Tahapan Pendaftaran</h4>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>Akses menu PENDAFTARAN pada website, lengkapi seluruh form yang tersedia, lalu klik SIMPAN.</li>
                <li>Unduh dan cetak formulir pendaftaran Anda melalui halaman PENGUMUMAN.</li>
                <li>Pada formulir yang telah dicetak, tuliskan MOTO Anda di kolom yang tersedia dan tempelkan pas foto 3x4.</li>
                <li>Hadiri proses seleksi sesuai dengan jadwal yang ditentukan dan ikuti instruksi lebih lanjut dari Panitia Penerimaan Anggota Baru MPK 2026.</li>
                <li>Pastikan Anda membawa Formulir Pendaftaran saat mengikuti tahapan seleksi.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-title-lg text-title-lg text-on-surface mb-3 font-semibold">B. Panduan Cetak/Unduh Formulir (PC/Laptop)</h4>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>Buka halaman PENGUMUMAN.</li>
                <li>Klik tombol CETAK FORMULIR PENDAFTARAN.</li>
                <li>Saat muncul PENGATURAN PRINT, arahkan pada bagian PRINTER, lalu pilih opsi "Microsoft Print to PDF" atau "Save as PDF".</li>
                <li>Klik Print/Simpan, kemudian pilih folder penyimpanan di komputer Anda.</li>
                <li>Formulir berhasil diunduh dan siap untuk dicetak.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-title-lg text-title-lg text-on-surface mb-3 font-semibold">C. Panduan Unduh Formulir (Smartphone/Android)</h4>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>Buka halaman PENGUMUMAN.</li>
                <li>Ketuk tombol CETAK FORMULIR PENDAFTARAN.</li>
                <li>Pada pengaturan cetak, ketuk pilihan Printer (biasanya di bagian atas), lalu pilih "Simpan sebagai PDF".</li>
                <li>Ketuk ikon Unduh/Download dan tentukan lokasi penyimpanan di perangkat Anda.</li>
                <li>File formulir telah tersimpan dan siap untuk dicetak.</li>
              </ol>
            </section>

            <section className="bg-primary-container/30 border border-primary/20 p-6 rounded-xl mt-8">
              <p className="mb-3 font-medium text-on-surface">Jika Anda mengalami kendala, silakan hubungi kami melalui WhatsApp atau Telegram:</p>
              <ul className="list-none space-y-2 font-medium text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
                  Kak Lola: <a href="https://wa.me/6282135305838" className="text-primary hover:underline font-bold" target="_blank" rel="noopener noreferrer">+62 821-3530-5838</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
                  Kak Anin: <a href="https://wa.me/6285549088958" className="text-primary hover:underline font-bold" target="_blank" rel="noopener noreferrer">+62 855-4908-8958</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
