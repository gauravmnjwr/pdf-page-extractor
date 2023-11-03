import express from "express";
import {
  uploadPdf,
  getPdfs,
  getSinglePdf,
  deletePdf,
} from "../controller/pdfController.js";
import { loginUser, registerUser } from "../controller/userController.js";

const router = express.Router();

router.post("/upload-pdf", uploadPdf);
router.post("/fetchPdf", getPdfs);
router.post("/getPdfData", getSinglePdf);
router.post("/delete", deletePdf);
router.post("/login", loginUser);
router.post("/signup", registerUser);

export default router;
