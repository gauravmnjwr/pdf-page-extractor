import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { PDFDocument } from "pdf-lib";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import NavbarComponent from "./Navbar";

const PDFViewer = ({ token }) => {
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [base64PDF, setBase64PDF] = useState(null);
  const [error, setError] = useState("");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const { id } = useParams();

  const getPdfData = async () => {
    await axios
      .post("http://localhost:5000/api/getPdfData", { id })
      .then((res) => setBase64PDF(res.data[0].base64Data))
      .catch((err) => {
        console.log(err);
        setError("No pdf Found");
      });
  };

  useEffect(() => {
    getPdfData();
  }, []);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    if (base64PDF) {
      handlePdfClick(base64PDF);
    }
  }, [base64PDF]);

  const handlePdfClick = async (base64) => {
    try {
      const pdfData = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const loadedPdf = await PDFDocument.load(pdfData);
      setPdfFile(loadedPdf);
      setCurrentPdf("data:application/pdf;base64," + base64);
      setSelectedPages([]);
    } catch (error) {
      console.log("Error loading PDF:", error);
    }
  };

  const togglePageSelection = (pageIndex) => {
    setError("");
    if (selectedPages.includes(pageIndex)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageIndex));
    } else {
      setSelectedPages([...selectedPages, pageIndex]);
    }
  };

  const createNewPdf = async () => {
    // Check if a valid PDF is loaded
    if (!pdfFile) {
      alert("No valid PDF loaded");
      return;
    }

    if (selectedPages.length === 0) {
      setError("Please select pages before downloading");
      return;
    }

    const newPdfDoc = await PDFDocument.create();
    for (const pageIndex of selectedPages) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfFile, [pageIndex]);
      newPdfDoc.addPage(copiedPage);
    }
    const pdfBytes = await newPdfDoc.save();

    // Create a download link for the new PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "new-pdf.pdf";
    a.click();
  };

  return (
    <>
      <NavbarComponent />
      <div className="pdf-viewer-container">
        {" "}
        <div className="pdf-download-container">
          <Container>
            <span>Please select the pages in order you wish to download</span>
            {currentPdf && (
              <div className="checkboxes">
                {Array.from({ length: pdfFile.getPageCount() }).map(
                  (_, index) => (
                    <label
                      key={index}
                      className={
                        selectedPages.includes(index) ? "darkBlueLabel" : ""
                      }
                    >
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(index)}
                        onChange={() => togglePageSelection(index)}
                      />{" "}
                      Page {index + 1}
                    </label>
                  )
                )}
              </div>
            )}
            <button variant="primary" onClick={createNewPdf}>
              Download Selected Pages
            </button>
            <div className="error">{error}</div>
          </Container>
        </div>
        <div className="pdf-view-main">
          {base64PDF ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
              <Viewer
                // defaultScale={SpecialZoomLevel.PageFit * 80}
                theme="dark"
                fileUrl={"data:application/pdf;base64," + base64PDF}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          ) : (
            <>
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
