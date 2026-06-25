const fs = require('fs');
const PizZip = require('pizzip');

const srcPath = 'Cetak Formulir Pendaftar MPK PAB 2026.docx';
const destPath = 'apps/web/public/Cetak Formulir Pendaftar MPK PAB 2026.docx';

// Copy the file to public first
fs.copyFileSync(srcPath, destPath);

[destPath].forEach(path => {
  try {
    const content = fs.readFileSync(path);
    const zip = new PizZip(content);
    let xml = zip.file('word/document.xml').asText();
    
    // Fix typo
    xml = xml.replace(/\{asal_kelas\)/g, '{asal_kelas}');
    
    // Find the exact text node for the date and time to replace safely
    // The previous date was "6/15/26," "10:54" "PM"
    // Let's replace the common date patterns found in previous files
    const dateIdx = xml.indexOf('6/15/26,');
    if (dateIdx !== -1) {
      const before = xml.substring(0, dateIdx);
      let after = xml.substring(dateIdx);
      after = after.replace('6/15/26,', '{waktu_cetak}');
      after = after.replace('10:54', '');
      after = after.replace('PM', '');
      xml = before + after;
    }
    
    // Check if the user used a different date this time just in case
    // For example, if they didn't use 6/15/26, but the date is still split.
    
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
