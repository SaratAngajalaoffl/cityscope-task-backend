const multer = require("multer");
const upload = multer({ dest: "uploads/images" });

export const singleUpload = upload.single("image");
export const multipleUpload = upload.array("images");
