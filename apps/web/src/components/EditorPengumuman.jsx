import React, { useState, useEffect } from 'react';

const defaultAnnouncements = [
  { id: 1, status: 'Penting', title: 'Jadwal Seleksi Wawancara', content: 'Seleksi wawancara untuk calon anggota baru akan dilaksanakan pada hari Sabtu, 24 Agustus 2026.' },
  { id: 2, status: 'Informasi', title: 'Persyaratan Berkas', content: 'Mohon pastikan seluruh berkas persyaratan telah diunggah dengan format PDF sebelum batas waktu pendaftaran berakhir.' },
  { id: 3, status: 'Pengumuman', title: 'Hasil Seleksi Administrasi', content: 'Pengumuman hasil seleksi administrasi akan diumumkan melalui portal ini pada tanggal 20 Agustus 2026.' }
];

export default function EditorPengumuman() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('mpk_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      setAnnouncements(defaultAnnouncements);
    }
  }, []);

  const handleChange = (id, field, value) => {
    const updated = announcements.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    );
    setAnnouncements(updated);
  };

  const handleSave = () => {
    localStorage.setItem('mpk_announcements', JSON.stringify(announcements));
    alert('Pengumuman berhasil diperbarui!');
  };

  return (
    <div className="bg-surface border border-surface-variant rounded-2xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-headline-md text-on-surface mb-2">Editor Pengumuman</h2>
          <p className="font-body-md text-on-surface-variant">
            Ubah status, judul, dan isi dari 3 pengumuman terbaru di halaman utama.
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-on-primary font-label-md px-6 py-2.5 rounded-lg hover:shadow-md hover:opacity-90 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {announcements.map((announcement, index) => (
          <div key={announcement.id} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6">
            <h3 className="font-label-lg font-bold text-on-surface mb-4 border-b border-surface-variant pb-2">
              Pengumuman #{index + 1}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1">Status</label>
                <select 
                  value={announcement.status}
                  onChange={(e) => handleChange(announcement.id, 'status', e.target.value)}
                  className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-sm bg-surface p-2"
                >
                  <option value="Penting">Penting</option>
                  <option value="Informasi">Informasi</option>
                  <option value="Pengumuman">Pengumuman</option>
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1">Judul</label>
                <input 
                  type="text" 
                  value={announcement.title}
                  onChange={(e) => handleChange(announcement.id, 'title', e.target.value)}
                  className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-sm bg-surface p-2"
                />
              </div>

              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1">Isi Pengumuman</label>
                <textarea 
                  value={announcement.content}
                  onChange={(e) => handleChange(announcement.id, 'content', e.target.value)}
                  rows="4"
                  className="w-full border-surface-variant rounded-lg focus:border-primary focus:ring-primary font-body-sm bg-surface p-2 resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
