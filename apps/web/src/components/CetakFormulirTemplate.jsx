import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value, displayValue = false }) => {
  const barcodeRef = useRef(null);
  useEffect(() => {
    if (barcodeRef.current && value) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        displayValue: displayValue,
        fontSize: 12,
        margin: 2,
        width: 1.5,
        height: 30,
      });
    }
  }, [value, displayValue]);
  return <canvas ref={barcodeRef} className="mx-auto" />;
};

const CetakFormulirTemplate = ({ registrant }) => {
  if (!registrant) return null;

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const formatText = (text) => text ? String(text).toUpperCase() : "-";
  const uniqueCode = formatText(registrant.kode_pendaftar || registrant.id || "00000");

  return (
    <div className="bg-white text-black font-sans w-[210mm] mx-auto box-border" style={{ minHeight: '297mm', padding: '10mm 15mm', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      {/* Table 1: Identitas */}
      <table className="w-full border-collapse border border-black mb-4 text-[11px]">
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black text-center font-bold py-2">
              BUKTI PENDAFTARAN & SURAT PERNYATAAN CALON ANGGOTA BARU
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center align-top w-[25%] p-0">
              <div className="flex flex-col items-center h-full">
                <div className="h-[120px] flex items-center justify-center border-b border-black w-full">
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-[60px] h-[60px] object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/id/thumb/7/77/Logo_SMAN_1_Pekalongan.png/150px-Logo_SMAN_1_Pekalongan.png" }}
                  />
                </div>
                <div className="flex-grow flex items-center justify-center p-4 w-full">
                  <div className="border border-black w-[2.5cm] h-[3.5cm] flex items-center justify-center">
                    <span className="text-[10px] whitespace-pre-wrap text-center">FOTO{"\n"}3X4</span>
                  </div>
                </div>
              </div>
            </td>
            <td colSpan="2" className="border border-black align-top p-0 w-[75%]">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border-b border-r border-black p-1.5 w-[35%]">NAMA</td>
                    <td className="border-b border-black p-1.5 font-medium">{formatText(registrant.nama_lengkap)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">TEMPAT LAHIR</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.tempat_lahir)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">TANGGAL LAHIR</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.tanggal_lahir)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">JENIS KELAMIN</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.jenis_kelamin)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">ASAL KELAS</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.asal_kelas_formatted || registrant.asal_kelas)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">NAMA ORANG TUA/WALI</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.nama_orang_tua)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">ALAMAT SISWA</td>
                    <td className="border-b border-black p-1.5 leading-tight">{formatText(registrant.alamat)}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-1.5">NOMOR TELEPON</td>
                    <td className="border-b border-black p-1.5">{formatText(registrant.nomor_telepon)}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="p-1.5 h-[80px] align-top text-center">
                      <span className="inline-block mt-2">MOTTO:</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Table 2: Pernyataan */}
      <table className="w-full border-collapse border border-black mb-4 text-[10px]">
        <tbody>
          <tr>
            <td className="border-b border-black text-center font-bold py-1.5 text-[11px]">
              MENYATAKAN BAHWA SELAMA MENJADI ANGGOTA, SAYA:
            </td>
          </tr>
          <tr>
            <td className="p-2 pb-4 leading-normal">
              1. AKAN AKTIF, TEKUN DAN PENUH SEMANGAT;<br/>
              2. SANGGUP MENAATI DAN MEMATUHI TATA TERTIB ORGANISASI SERTA PERATURAN SMAN 1 PEKALONGAN;<br/>
              3. AKAN MENJAGA NAMA BAIK PRIBADI, KELUARGA, DAN SEKOLAH;<br/>
              4. AKAN MENGIKUTI PENDIDIKAN YANG DISEDIAKAN;<br/>
              5. AKAN MENGIKUTI KEGIATAN DENGAN SEMANGAT;<br/>
              6. APABILA SAYA TIDAK MENAATI PERATURAN YANG DITETAPKAN, SAYA SANGGUP MENERIMA SANKSI YANG BERLAKU
            </td>
          </tr>
        </tbody>
      </table>

      {/* Table 3: Tanda Tangan */}
      <table className="w-full border-collapse border border-black mb-4 text-[11px] text-center table-fixed">
        <tbody>
          <tr>
            <td colSpan="2" className="border-b border-black font-bold py-1.5">
              DEMIKIAN SURAT PERNYATAAN INI SAYA BUAT SEBENAR-BENARNYA DENGAN PENUH TANGGUNG JAWAB
            </td>
          </tr>
          <tr>
            <td className="border-r border-black w-1/2 p-2 pt-4 align-top h-[110px] relative">
              MENGETAHUI<br/>
              ORANG TUA/WALI
              <div className="absolute bottom-2 left-0 w-full flex justify-center">
                <div className="border-b border-black w-[80%] font-bold">{formatText(registrant.nama_orang_tua)}</div>
              </div>
            </td>
            <td className="w-1/2 p-2 pt-4 align-top h-[110px] relative">
              PEKALONGAN, {formattedDate}<br/>
              YANG MEMBUAT PERNYATAAN
              <div className="absolute bottom-2 left-0 w-full flex justify-center">
                <div className="border-b border-black w-[80%] font-bold">{formatText(registrant.nama_lengkap)}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Table 4: Verifikasi */}
      <table className="w-full border-collapse border border-black mb-8 text-[11px] text-center table-fixed">
        <tbody>
          <tr>
            <td colSpan="2" className="border-b border-black font-bold py-1.5">
              DEMIKIAN SURAT INI DIVERIFIKASI DENGAN PENUH TANGGUNG JAWAB
            </td>
          </tr>
          <tr>
            <td className="border-r border-black w-1/2 p-2 pt-4 align-top h-[100px] relative">
              MENGETAHUI<br/>
              VERIFIKATOR 1
              <div className="absolute bottom-2 left-0 w-full flex justify-center">
                <div className="border-b border-black w-[80%] font-bold">TIM PAB MPK</div>
              </div>
            </td>
            <td className="w-1/2 p-2 pt-4 align-top h-[100px] relative">
              PEKALONGAN, _________________<br/>
              VERIFIKATOR 2
              <div className="absolute bottom-2 left-0 w-full flex justify-center">
                <div className="border-b border-black w-[80%] font-bold">TIM PAB MPK</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Barcodes */}
      <div className="flex justify-center items-center gap-16 mt-4">
        <div className="flex flex-col items-center">
          <Barcode value={uniqueCode} displayValue={false} />
          <span className="font-bold text-[10px] mt-1 uppercase font-mono tracking-wider">{String(registrant.nama_lengkap).toLowerCase()}</span>
        </div>
        <div className="flex flex-col items-center">
          <Barcode value="TIMPABMPK" displayValue={false} />
          <span className="font-bold text-[10px] mt-1 uppercase font-mono tracking-widest">TIM PAB MPK</span>
        </div>
      </div>
    </div>
  );
};

export default CetakFormulirTemplate;
