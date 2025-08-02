import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotCapture = ({ onCapture }) => {
  const captureScreen = () => {
    html2canvas(document.body).then(canvas => {
      onCapture(canvas.toDataURL());
    });
  };

  return (
    <button onClick={captureScreen}>Capture para ayuda</button>
  );
};

export default ScreenshotCapture;