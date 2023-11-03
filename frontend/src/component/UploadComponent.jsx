import React, { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [currFile, setCurrFile] = useState("");
  const formRef = useRef();

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const handelPDFChange = (e) => {
    const size = Number(e.target.files[0].size / 1000000);
    const ext = getExtension(e.target.files[0].name);
    if (size > 12.5) {
      setMessage("Please choose a PDF under 12 MB.");
      formRef.current.value = null;
    } else if (ext.toLowerCase() !== "pdf") {
      setMessage("Only PDF files are allowed");
      formRef.current.value = null;
    } else {
      setMessage("");
      setSelectedFile(e.target.files[0]);
      setCurrFile(e.target.files[0].name);
    }
  };

  const onClickHandler = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // data.append(userDetails.id);
    const file = selectedFile;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target.result.split(",")[1];
      await axios
        .post(
          `http://localhost:5000/api/upload-pdf`,
          { base64String, currFile, email: userDetails.email },
          {
            params: userDetails,
          }
        )
        .then((res) => {
          // then print response status
          setSelectedFile(null);
          formRef.current.value = null;
          Swal.fire("Success!", "PDF Uploaded Successfully", "success").then(
            () => {
              window.location.reload();
            }
          );
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="user-home">
      <>
        <div>
          <h2>Upload your PDF</h2>
          <p>
            Please continue refreshing if the currently uploaded PDF is not
            visible, as the live server may require some time to load large PDFs
            from the database.
          </p>
          <div className="pdf-uploading">
            <label htmlFor="file-upload" className="custom-file-upload">
              <img
                src="https://cdn-icons-png.flaticon.com/512/568/568717.png"
                alt=""
              />{" "}
              {selectedFile ? <>{selectedFile.name}</> : <>Select PDF</>}
            </label>
            <input
              type="file"
              name="file"
              onChange={handelPDFChange}
              accept=".pdf"
              required
              ref={formRef}
              id="file-upload"
            />
            <button
              type="button"
              onClick={onClickHandler}
              disabled={!selectedFile}
            >
              Upload
            </button>
            <div className="pdf-err-msg">{message}</div>
          </div>
        </div>
      </>
    </div>
  );
}

export default UploadComponent;
