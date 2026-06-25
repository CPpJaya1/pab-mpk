import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-inverse-surface border-t border-surface-variant dark:border-outline-variant py-section-padding px-margin-mobile md:px-8 mt-16">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-4">PORTAL MPK</div>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant mb-4">Portal resmi pendaftaran dan informasi seleksi anggota baru Majelis Perwakilan Kelas.</p>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface mb-4">Kontak Panitia</h4>
          <div className="space-y-2 font-body-md text-body-md text-on-surface-variant">
            <p>Kak Lola: +62 821-3530-5838</p>
            <p>Kak Anin: +62 855-4908-8958</p>
            <p>Email: testpab@gmail.com</p>
          </div>
        </div>
        <div className="md:col-span-2 mt-8 pt-8 border-t border-surface-variant dark:border-outline-variant text-center">
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant">© 2026 Majelis Perwakilan Kelas. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
