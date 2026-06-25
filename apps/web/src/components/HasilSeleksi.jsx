import React from 'react';

export default function HasilSeleksi() {
  return (
    <section className="py-section-padding px-margin-mobile md:px-8 max-w-container-max mx-auto" id="seleksi">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
        <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile text-on-surface">Cek Hasil Seleksi</h2>
      </div>
      <div className="bg-surface border border-surface-variant rounded-xl overflow-hidden">
        <div className="p-6 border-b border-surface-variant bg-surface-container-lowest">
          <p className="font-body-md text-body-md text-on-surface-variant">Berikut adalah daftar peserta yang telah lolos seleksi tahap administrasi. Gunakan fitur pencarian untuk menemukan nama Anda dengan cepat.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest border-b border-surface-variant">
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface">No. Pendaftaran</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface">Nama Lengkap</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface">Kelas</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors">
                <td className="py-4 px-6">MPK24-001</td>
                <td className="py-4 px-6">Ahmad Fauzi</td>
                <td className="py-4 px-6">X IPA 1</td>
                <td className="py-4 px-6">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-1 rounded-DEFAULT">Lolos Administrasi</span>
                </td>
              </tr>
              <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors">
                <td className="py-4 px-6">MPK24-002</td>
                <td className="py-4 px-6">Budi Santoso</td>
                <td className="py-4 px-6">X IPS 2</td>
                <td className="py-4 px-6">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-1 rounded-DEFAULT">Lolos Administrasi</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-lowest transition-colors">
                <td className="py-4 px-6">MPK24-003</td>
                <td className="py-4 px-6">Citra Lestari</td>
                <td className="py-4 px-6">XI IPA 3</td>
                <td className="py-4 px-6">
                  <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded-DEFAULT">Tidak Lolos</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-surface-variant bg-surface-container-lowest text-center">
          <a className="text-primary font-label-md text-label-md hover:underline" href="#">Lihat Semua Data</a>
        </div>
      </div>
    </section>
  );
}
