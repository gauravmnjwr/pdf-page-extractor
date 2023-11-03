import React, { useEffect, useState } from "react";
import PdfList from "./component/PdfList";
import "./App.css";
import PDFViewer from "./component/PDFViewer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import BASE_URL from "./helper/helper";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentPdf, setCurrentPdf] = useState(null);

  const [token, setToken] = useState("");

  const startBackend = async () => {
    await axios.get(`${BASE_URL}`);
  };

  useEffect(() => {
    startBackend();
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {}, [token]);
  const getCurrentPdf = (base64) => {
    setCurrentPdf(base64);
  };

  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route
            path="/"
            element={<PdfList getCurrentPdf={getCurrentPdf} token={token} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/:id" element={<PDFViewer token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
