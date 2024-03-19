import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import CameraMain from "./CameraMain";
import "./Main.css";

function Main() {
  const [currentPerson, setCurrentPerson] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [cameraMainClicked, setCameraMainClicked] = useState(false);

  const handlePersonClick = (person) => {
    setCurrentPerson(person);
    setShowDescription(true);
    setTimeout(() => setShowDescription(false), 5000); // 5초 후에 설명 숨김
  };

  const handleCameraMainClick = () => {
    setCameraMainClicked(true);
  };

  return (
    <Router>
      <div className="main">
        {!cameraMainClicked && (
          <div className="container">
            <div className="header">
              <h1>
                <a href="/">VISIONERS</a>
              </h1>
              <div className="nav">
                
              </div>
            </div>
            <div className="hero">
              <h2>항공기 반입 물품 체크 서비스</h2>
              <p>헷갈리는 물품이 항공기에 반입 가능한지 <br />지금 바로 확인하실 수 있습니다.</p>
              <button className="btn" onClick={handleCameraMainClick}>
                <Link to="/camera-main">촬영으로 확인하기</Link>
              </button>
              <button className="btn">검색으로 확인하기</button>
            </div>
            
          </div>
        )}
        <Routes>
          <Route path="/camera-main" element={<CameraMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
