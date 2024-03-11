// International.js       국제선 클릭 후 아시아나, 대한항공 버튼 출력 페이지
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Domestic from "./Domestic";
import "./International.css";

function International() {
  const [currentPerson, setCurrentPerson] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [domesticClicked, setDomesticClicked] = useState(false);

  const handlePersonClick = (person) => {
    setCurrentPerson(person);
    setShowDescription(true);
    setTimeout(() => setShowDescription(false), 5000);
  };

  const handleDomesticClick = () => {
    setDomesticClicked(true);
    // setInternationalClicked(false); // 국내선 버튼 클릭 시 국제선 상태를 false로 설정
  };


  return (
    <div className="international">
      {!domesticClicked && (
        <div className="container">
          <div className="header">
            <h1>
              <a href="/">VISIONERS</a>
            </h1>
            <div className="nav">
              <ul>
                <li><button onClick={() => handlePersonClick("선애")}>선애</button></li>
                <li><button onClick={() => handlePersonClick("효진")}>효진</button></li>
                <li><button onClick={() => handlePersonClick("홍민")}>홍민</button></li>
                <li><button onClick={() => handlePersonClick("유빈")}>유빈</button></li>
              </ul>
            </div>
          </div>
          <div className="hero">
            <h2> 항공사를 선택해주세요!</h2>
            <p>헷갈리는 물품이 항공기에 반입 가능한지<br />지금 바로 확인하실 수 있습니다.</p>
            <button className="btn" onClick={handleDomesticClick}>아시아나</button>
            <button className="btn" onClick={handleDomesticClick}>대한항공</button>
          </div>
          {showDescription && (
            <div className="person-description">
              <h3>{currentPerson}</h3>
              {currentPerson === "선애" && (
                <p>AI기능 개발을 담당하고 있어.</p>
              )}
              {currentPerson === "효진" && (
                <p>BackEnd 개발을 담당하고 있어.</p>
              )}
              {currentPerson === "홍민" && (
                <p>FrontEnd 개발을 담당하고 있어.</p>
              )}
              {currentPerson === "유빈" && (
                <p>FrontEnd 개발을 담당하고 있어.</p>
              )}
            </div>
          )}
        </div>
      )}
      {domesticClicked && <Domestic />}
    </div>
  );
}

export default International;
