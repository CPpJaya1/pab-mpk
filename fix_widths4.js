const fs = require('fs');
const PizZip = require('pizzip');

['apps/web/public/Cetak Formulir Pendaftar PAB MPK 2026.docx'].forEach(path => {
  try {
    const content = fs.readFileSync(path);
    const zip = new PizZip(content);
    let xml = zip.file('word/document.xml').asText();
    
    // Find the index of 6/15/26,
    const idx = xml.indexOf('6/15/26,');
    if (idx !== -1) {
      const before = xml.substring(0, idx);
      let after = xml.substring(idx);
      
      // Replace only the first occurrences in the 'after' string
      after = after.replace('6/15/26,', '{waktu_cetak}');
      after = after.replace('10:54', '');
      after = after.replace('PM', '');
      
      xml = before + after;
    }
    
    zip.file('word/document.xml', xml);
    const newZip = new PizZip();
    Object.keys(zip.files).forEach(k => {
      newZip.file(k.split('\\').join('/'), zip.files[k].asUint8Array());
    });
    fs.writeFileSync(path, newZip.generate({ type: 'nodebuffer' }));
    console.log('Successfully fixed date in', path);
  } catch(e) {
    console.error('Error with', path, e.message);
  }
});
