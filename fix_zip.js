const PizZip = require('pizzip');
const fs = require('fs');

const content = fs.readFileSync('Cetak Formulir Pendaftar.docx');
const zip = new PizZip(content);
const newZip = new PizZip();

Object.keys(zip.files).forEach(k => {
  const newKey = k.replace(/\\/g, '/');
  newZip.file(newKey, zip.files[k].asUint8Array());
});

fs.writeFileSync('Cetak Formulir Pendaftar.docx', newZip.generate({type:'nodebuffer'}));
fs.writeFileSync('apps/web/public/Cetak Formulir Pendaftar.docx', newZip.generate({type:'nodebuffer'}));

console.log('Fixed ZIP keys:');
console.log(Object.keys(newZip.files).slice(0, 5));
