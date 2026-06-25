import React from 'react';

export default function AlurPendaftaran() {
  return (
    <section className="py-section-padding px-margin-mobile md:px-8 max-w-container-max mx-auto" id="petunjuk">
      <div className="flex items-center gap-3 mb-10">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>format_list_numbered</span>
        <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile text-on-surface">Alur Pendaftaran</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Line connecting steps (desktop) */}
        <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-surface-variant z-0"></div>
        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-4 text-primary font-headline-md">1</div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Isi Formulir</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Lengkapi data diri pada formulir pendaftaran online dengan benar.</p>
        </div>
        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-4 text-primary font-headline-md">2</div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Cetak Formulir</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Unduh dan cetak formulir pendaftaran Anda melalui halaman pengumuman sebagai bukti pendaftaran.</p>
        </div>
        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-4 text-primary font-headline-md">3</div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Pelaksanaan Seleksi</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Ikuti tahapan seleksi yang telah dijadwalkan oleh panitia penerimaan anggota baru.</p>
        </div>
      </div>
    </section>
  );
}
