import { Router } from "express";
import {
  getCatImages,
  uploadCatImage,
  updateCatImage,
  getCatImage,
  deleteCatImage,
} from "../controllers/catkit.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/", getCatImages);
router.post("/", fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), uploadCatImage);
router.put("/:id", fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}), updateCatImage);
router.get("/:id", getCatImage);
router.delete("/:id", deleteCatImage);

export default router;
