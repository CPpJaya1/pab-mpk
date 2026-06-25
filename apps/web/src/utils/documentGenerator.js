import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "docxtemplater-image-module-free";
import JsBarcode from "jsbarcode";
import { saveAs } from "file-saver";
import moment from "moment";
import "moment/locale/id";

// Helper function to generate barcode image as ArrayBuffer
const generateBarcodeBuffer = (text) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {
      format: "CODE128", // or "CODE39"
      displayValue: false,
      fontSize: 18,
      margin: 10,
      width: 2,
      height: 60
    });
    
    // Get Base64 from canvas
    const dataUrl = canvas.toDataURL("image/png");
    const base64Data = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    resolve(bytes.buffer);
  });
};

export const generateAndDownloadPDF = async (registrant) => {
  try {
    // 1. Fetch template from public directory
    const response = await fetch("/Cetak Formulir Pendaftar MPK PAB 2026.docx");
    if (!response.ok) {
        throw new Error("File template Word tidak ditemukan. Pastikan sudah dipindahkan ke folder public/");
    }
    const content = await response.arrayBuffer();

    // 2. Initialize PizZip
    const zip = new PizZip(content);

    // 3. Setup Image Module for {%barcode}
    const imageOptions = {
      getImage: async function (tagValue, tagName) {
        if (tagName === "barcode") {
          return await generateBarcodeBuffer(tagValue);
        }
        return new Promise((resolve, reject) => {
          reject(new Error("Image not found"));
        });
      },
      getSize: function (img, tagValue, tagName) {
        if (tagName === "barcode") {
          // Lebar dan tinggi default gambar barcode di Word
          return [200, 75]; 
        }
        return [150, 150];
      },
    };

    const imageModule = new ImageModule(imageOptions);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule]
    });

    // 4. Data Formatting
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const formatText = (text) => text ? String(text).toUpperCase() : "-";
    
    // Format created_at ke WIB (Waktu Indonesia Barat)
    const waktuCetak = registrant.created_at 
      ? moment(registrant.created_at).utcOffset('+07:00').format('DD/MM/YYYY, HH:mm [WIB]')
      : moment().utcOffset('+07:00').format('DD/MM/YYYY, HH:mm [WIB]');

    // 5. Render Data to Word
    // Catatan: Gunakan tag {%barcode} di dalam Word agar modul gambar ter-trigger
    const templateData = {
      waktu_cetak: waktuCetak,
      link_download: `${window.location.origin}${import.meta.env.BASE_URL}cetak-formulir/${registrant.id}`,
      nama_lengkap: formatText(registrant.nama_lengkap),
      nama_orang_tua: formatText(registrant.nama_orang_tua),
      nomor_telepon: formatText(registrant.nomor_telepon),
      tanggal_pengisian_formulir: formattedDate,
      barcode: String(registrant.kode_pendaftar || registrant.id || "00000"),
      jenis_kelamin: formatText(registrant.jenis_kelamin),
      tempat_lahir: formatText(registrant.tempat_lahir),
      tanggal_lahir: formatText(registrant.tanggal_lahir),
      alamat: formatText(registrant.alamat),
      asal_kelas: formatText(registrant.asal_kelas_formatted || registrant.asal_kelas)
    };

    // Wajib panggil compile sebelum resolveData di docxtemplater v3
    doc.compile();

    await doc.resolveData(templateData);
    doc.render();

    // 6. Generate Filled DOCX Blob
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // ==========================================
    // KONVERSI KE PDF MENGGUNAKAN ConvertAPI
    // ==========================================
    
    // Mengambil API Secret dari file .env
    const CONVERT_API_SECRET = import.meta.env.VITE_CONVERT_API_SECRET; 
    
    // Fallback: Jika API Secret belum diatur, unduh file Word (.docx) secara langsung
    if (!CONVERT_API_SECRET || CONVERT_API_SECRET === "YOUR_CONVERT_API_SECRET_HERE") {
        console.warn("ConvertAPI Secret is not set. Downloading DOCX directly instead.");
        saveAs(out, `Formulir_Pendaftar_${registrant.nama_lengkap.replace(/\s+/g, '_')}.docx`);
        return { success: true, isDocx: true, message: "File Word diunduh karena API Secret belum dikonfigurasi." };
    }

    const formData = new FormData();
    formData.append("File", out, "template.docx");

    const pdfResponse = await fetch(`https://v2.convertapi.com/convert/docx/to/pdf?Secret=${CONVERT_API_SECRET}`, {
      method: 'POST',
      body: formData
    });

    if (!pdfResponse.ok) {
      throw new Error(`Konversi PDF gagal: ${pdfResponse.statusText}`);
    }

    const result = await pdfResponse.json();
    const pdfBase64 = result.Files[0].FileData;
    
    // Decode Base64 ke File Blob PDF
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const pdfBlob = new Blob([byteArray], {type: "application/pdf"});

    // Unduh File PDF
    saveAs(pdfBlob, `Formulir_Pendaftaran_${registrant.nama_lengkap.replace(/\s+/g, '_')}.pdf`);
    
    return { success: true, isDocx: false };
  } catch (error) {
    console.error("Error dalam proses generate/konversi dokumen:", error);
    
    // Format Multi error for display
    if (error.properties && error.properties.errors instanceof Array) {
      const errorMessages = error.properties.errors.map(function (e) {
        return e.properties && e.properties.explanation 
          ? e.properties.explanation 
          : (e.message || e.name);
      }).join(", ");
      throw new Error("Multi error: " + errorMessages);
    }
    
    throw error;
  }
};
