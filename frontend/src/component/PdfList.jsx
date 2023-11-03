import axios from "axios";
import React, { useState, useEffect } from "react";
import UploadComponent from "./UploadComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarComponent from "./Navbar";

function PdfList({ getCurrentPdf, token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPdfList = async () => {
    setLoading(true);
    const userDetails = await JSON.parse(localStorage.getItem("userDetails"));

    try {
      const response = await axios.post("http://localhost:5000/api/fetchPdf", {
        email: userDetails.email,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getPdfList();
    const data = localStorage?.getItem("token");
    if (!data) {
      navigate("/login");
    }
  }, []);

  const handlePdfClick = async (base64, id) => {
    getCurrentPdf(base64);
    navigate(`/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post("http://localhost:5000/api/delete", { id: id })
          .then((res) => {})
          .catch((err) => console.log(err));
        window.location.reload();
      }
    });
  };
  return (
    <div>
      <NavbarComponent />
      <div className="upload-component">
        <UploadComponent />
      </div>
      <div className="pdfs-container">
        {data &&
          data.map((k, i) => {
            return (
              <div key={i} className="pdf-main">
                <div className="pdf-image">
                  {" "}
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/438/438920.png"
                    alt="PDF"
                  />
                </div>
                <div className="pdf-info">
                  <div className="pdf-name">{k.name}</div>
                  <div className="pdf-links">
                    <div>
                      <div
                        style={{ cursor: "pointer", color: "#3d5af1" }}
                        onClick={() => handlePdfClick(k.base64Data, k._id)}
                      >
                        Open
                      </div>{" "}
                    </div>
                    <div>
                      <div
                        style={{ cursor: "pointer", color: "#3d5af1" }}
                        onClick={() => handleDelete(k._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {loading && (
        <>
          {" "}
          <div className="loader-container-home">
            <div className="spinner"></div>
            <span>Loading....</span>
          </div>
        </>
      )}
      {!loading && data.length === 0 && (
        <>
          {" "}
          <div className="loader-container-home no-data">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                alt=""
              />
            </div>
            <div>No Data Found</div>
          </div>
        </>
      )}
    </div>
  );
}

export default PdfList;
