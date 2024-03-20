import React, { useState, useEffect, useRef } from "react";
import "./Domestic.css";

function Domestic() {
  const [currentPerson, setCurrentPerson] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const videoRef = useRef(null); // useRef 훅을 사용하여 video 요소에 대한 참조 생성

  useEffect(() => {
    accessWebcam(); // 컴포넌트가 마운트될 때 웹캠에 접근
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []); // 한 번만 실행되어야 함

  const handleCapture = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // 비디오 프레임을 캔버스에 그립니다.
      context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

      // 캔버스를 이미지로 변환합니다.
      const image = canvas.toDataURL("image/png");

      // 이미지를 내 노트북에 저장하거나 다른 작업을 수행합니다.
      saveImageToFile(image);
    }
  };

  const saveImageToFile = (imageData) => {
    // 이미지 데이터를 Blob 형태로 변환합니다.
    const byteString = atob(imageData.split(",")[1]);
    const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // 파일 다운로드 링크를 생성합니다.
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    // 파일 이름을 지정합니다. 예시에서는 "captured_image.png"로 설정합니다.
    downloadLink.download = "captured_image.png";

    // 파일 다운로드를 실행합니다.
    downloadLink.click();
  };

  const accessWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          const videoElement = videoRef.current;
          videoElement.srcObject = stream;
          videoElement.play();
          setTimeout(centerWebcam, 100);
        }
      })
      .catch((error) => {
        console.error("웹캠에 접근 실패:", error);
      });
  };

  const centerWebcam = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const containerWidth = document.getElementById("webcam-container")
        .offsetWidth;
      const videoWidth = videoElement.videoWidth;
      const marginLeft = (containerWidth - videoWidth) / 2;
      videoElement.style.left = `${marginLeft}px`;
      videoElement.style.marginTop = "-150px";
    }
  };

  const handlePersonClick = (person) => {
    setCurrentPerson(person);
    setShowDescription(true);
    setTimeout(() => setShowDescription(false), 5000);
  };

  return (
    <div className="domestic">
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
        <div id="webcam-container" className="webcam-container">
          <video ref={videoRef} className="webcam-video" />
          <div className="hero">
            <p>규칙<br /> <br />
               새로운 규칙2<br /> <br />
               새로운 규칙3<br /> <br />
               새로운 규칙4<br /> <br />
            </p>
          </div>
          <button className="btn capture-button" onClick={handleCapture}>
              촬영하기
          </button>
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
    </div>
  );
}

export default Domestic;
