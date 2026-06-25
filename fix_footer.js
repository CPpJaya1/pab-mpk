const fs = require('fs');
const PizZip = require('pizzip');

const path = 'apps/web/public/Cetak Formulir Pendaftar MPK PAB 2026.docx';

try {
  const content = fs.readFileSync(path);
  const zip = new PizZip(content);
  
  // Update all footer files
  Object.keys(zip.files).forEach(filename => {
    if (filename.startsWith('word/footer')) {
      let xml = zip.file(filename).asText();
      xml = xml.replace('https://mpk.sman1pekalongan.sch.id/pab/laporan/cetakformulir.php?kdpendaftar=65', '{link_download}');
      zip.file(filename, xml);
    }
  });

  const newZip = new PizZip();
  Object.keys(zip.files).forEach(k => {
    newZip.file(k.split('\\').join('/'), zip.files[k].asUint8Array());
  });
  
  fs.writeFileSync(path, newZip.generate({ type: 'nodebuffer' }));
  console.log('Successfully updated footers in', path);
} catch(e) {
  console.error('Error with', path, e.message);
}
