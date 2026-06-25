import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-section-padding px-margin-mobile md:px-8 max-w-container-max mx-auto text-center">
      <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Penerimaan Anggota Baru MPK</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
        Wujudkan kepemimpinan yang berintegritas dan amanah. Mari bergabung bersama kami untuk membangun lingkungan sekolah yang lebih baik dan aspiratif.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link className="bg-primary text-on-primary font-label-md text-label-md uppercase px-8 py-3 rounded-lg hover:shadow-md hover:opacity-90 transition-all duration-200" to="/pendaftaran">Daftar Sekarang</Link>
        <Link className="border border-primary text-primary font-label-md text-label-md uppercase px-8 py-3 rounded-lg hover:bg-primary-fixed transition-all duration-200" to="/pengumuman">Lihat Pengumuman</Link>
      </div>
    </section>
  );
}
