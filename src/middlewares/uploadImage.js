import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/")
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `image_${Date.now()}${ext}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
        req.fileValidationError = "File type is not allowed";
        return cb(null, false);
    }
    cb(null, true);
    
}

export const uploadImage = multer({ storage, fileFilter })