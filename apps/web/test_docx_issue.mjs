import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "docxtemplater-image-module-free";
import fs from "fs";

async function test() {
    try {
        const content = fs.readFileSync("public/Cetak Formulir Pendaftar.docx");
        const zip = new PizZip(content);
        const imageModule = new ImageModule({
            getImage: async () => Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64'),
            getSize: () => [100, 100]
        });

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            //modules: [imageModule]
        });

        

        const templateData = {
            nama_lengkap: "Test",
            barcode: "12345"
        };

         await doc.resolveData(templateData); doc.render();
        

        console.log("SUCCESS!");
    } catch (e) {
        console.error("ERROR:");
        console.error(e.message);
        if (e.properties && e.properties.errors) {
            e.properties.errors.forEach(err => console.error(err));
        }
    }
}

test();
