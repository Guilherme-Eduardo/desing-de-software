import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

// Correção do __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
destination:(req,file,cb) =>{
  cb(null, path.resolve(__dirname,"..","tmp","uploads"));
},
  filename: (req, file, cb) => {
    const random = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${random}${ext}`);
  }
});

// exporta já o multer configurado
const upload = multer({ storage });

export default upload;
