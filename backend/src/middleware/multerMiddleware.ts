import { Request } from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    console.log("file type is ", file.mimetype);
    const allowedImageFile = ["image/jpg", "image/jpeg", "image/png"];
    const allowedVideoFile = [
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "video/mov",
      "video/quicktime",
    ];
    if (
      !allowedImageFile.includes(file.mimetype) &&
      !allowedVideoFile.includes(file.mimetype)
    ) {
      cb(new Error("only image and video file format is supported"));
      return;
    }
    if (allowedImageFile.includes(file.mimetype)) {
      cb(null, "./src/storage/image");
      return;
    }
    if (allowedVideoFile.includes(file.mimetype)) {
      cb(null, "./src/storage/video");
      return;
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export { storage, multer };
