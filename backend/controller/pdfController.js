import PDF from "../models/PdfModel.js";

export const uploadPdf = async (req, res) => {
  const { base64String, currFile, email } = req.body;
  try {
    const pdf = PDF.create({
      name: currFile,
      contentType: "application/pdf",
      base64Data: base64String,
      user: email,
    });
    return res.status(200).json({ message: "PDF Saved Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getPdfs = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await PDF.find({ user: email });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getSinglePdf = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await PDF.find({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const deletePdf = async (req, res) => {
  const { id } = req.body;

  try {
    const file = await PDF.findByIdAndRemove(id);
    if (!file) {
      console.error("Failed to delete PDF");
      res.status(500).send("Failed to delete PDF");
      return;
    }
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
