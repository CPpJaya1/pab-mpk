const fs = require('fs');
const PizZip = require('pizzip');

['Cetak Formulir Pendaftar MPK.docx', 'apps/web/public/Cetak Formulir Pendaftar MPK.docx'].forEach(path => {
  try {
    const content = fs.readFileSync(path);
    const zip = new PizZip(content);
    let xml = zip.file('word/document.xml').asText();
    
    // Replace auto table width with 100% width
    xml = xml.replace(/<w:tblW w:w="0" w:type="auto"\/>/g, '<w:tblW w:w="5000" w:type="pct"/>');
    
    zip.file('word/document.xml', xml);
    const newZip = new PizZip();
    Object.keys(zip.files).forEach(k => {
      newZip.file(k.split('\\').join('/'), zip.files[k].asUint8Array());
    });
    fs.writeFileSync(path, newZip.generate({ type: 'nodebuffer' }));
    console.log('Fixed', path);
  } catch(e) {
    console.error('Error with', path, e.message);
  }
});
