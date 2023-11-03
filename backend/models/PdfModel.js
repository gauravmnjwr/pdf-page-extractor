import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    base64Data: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
