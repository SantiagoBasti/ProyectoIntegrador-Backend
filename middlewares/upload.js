const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        if (file.fieldname === "user") folder = "public/image/users";
        if (file.fieldname === "productImage") folder = "public/image/products";
        if (file.fieldname === "carousel") folder = "public/image/carousel";
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (error, buffer) => {
            if (error) return cb(error);
            const filename = buffer.toString("hex") + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage: storage }).fields([
    { name: "productImage", maxCount: 1 },
    { name: "user", maxCount: 1 },
    { name: "carousel", maxCount: 1 },
]);

module.exports = upload;
