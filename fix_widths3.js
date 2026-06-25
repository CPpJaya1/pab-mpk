const fs = require('fs');
const PizZip = require('pizzip');

// Copy the file to public first
fs.copyFileSync('Cetak Formulir Pendaftar PAB MPK 2026.docx', 'apps/web/public/Cetak Formulir Pendaftar PAB MPK 2026.docx');

['apps/web/public/Cetak Formulir Pendaftar PAB MPK 2026.docx'].forEach(path => {
  try {
    const content = fs.readFileSync(path);
    const zip = new PizZip(content);
    let xml = zip.file('word/document.xml').asText();
    
    // Fix typo
    xml = xml.replace(/\{asal_kelas\)/g, '{asal_kelas}');
    
    // Remove all table indents so they start flush with the left margin
    xml = xml.replace(/<w:tblInd[^>]*\/>/g, '');
    
    // Force all tables to exactly 100% width
    xml = xml.replace(/<w:tblW[^>]*\/>/g, '<w:tblW w:w="5000" w:type="pct"/>');
    
    zip.file('word/document.xml', xml);
    const newZip = new PizZip();
    Object.keys(zip.files).forEach(k => {
      newZip.file(k.split('\\').join('/'), zip.files[k].asUint8Array());
    });
    fs.writeFileSync(path, newZip.generate({ type: 'nodebuffer' }));
    console.log('Successfully applied all fixes to', path);
  } catch(e) {
    console.error('Error with', path, e.message);
  }
});
