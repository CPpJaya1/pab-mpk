import React, { useState, useEffect } from 'react';

const defaultAnnouncements = [
  { id: 1, status: 'Penting', title: 'Jadwal Seleksi Wawancara', content: 'Seleksi wawancara untuk calon anggota baru akan dilaksanakan pada hari Sabtu, 24 Agustus 2026.' },
  { id: 2, status: 'Informasi', title: 'Persyaratan Berkas', content: 'Mohon pastikan seluruh berkas persyaratan telah diunggah dengan format PDF sebelum batas waktu pendaftaran berakhir.' },
  { id: 3, status: 'Pengumuman', title: 'Hasil Seleksi Administrasi', content: 'Pengumuman hasil seleksi administrasi akan diumumkan melalui portal ini pada tanggal 20 Agustus 2026.' }
];

export default function Pengumuman() {
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  useEffect(() => {
    const saved = localStorage.getItem('mpk_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    }
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Penting') return 'bg-primary-container text-on-primary-container';
    if (status === 'Informasi') return 'bg-secondary-container text-on-secondary-container';
    return 'bg-tertiary-container text-on-tertiary-container';
  };

  return (
    <section className="bg-surface py-section-padding" id="pengumuman">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
          <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile text-on-surface">Pengumuman Terbaru</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <span className={`inline-block font-label-sm text-label-sm px-3 py-1 rounded-full mb-4 ${getStatusClass(announcement.status)}`}>
                {announcement.status}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 font-bold">{announcement.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant m-0">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
