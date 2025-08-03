import React, {useState} from "react";
import { Link } from 'react-router-dom'
import ScreenshotCapture from '../components/ScreenshotCapture';
import useVoiceInteraction from '../hooks/useVoiceInteraction';
import { getHelpFromGemini } from '../services/geminiService';

export const Navbar = () => {
    const [screenshot, setScreenshot] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { isListening, transcript, startListening, speak } = useVoiceInteraction();
    
    const handleCapture = (screenshotDataUrl) => {
        setScreenshot(screenshotDataUrl);
        startListening();
    };

    const handleInteraction = async () => {
    if (screenshot && transcript) {
      setIsProcessing(true);
      try {
        const helpText = await getHelpFromGemini(screenshot, transcript);
        speak(helpText);
      } catch (error) {
        console.error("Error getting help from Gemini:", error);
        speak("I'm sorry, I couldn't process your request.");
      } finally {
        setIsProcessing(false);
        setScreenshot(null);
      }
    }
  };

  React.useEffect(() => {
    if (transcript) {
      handleInteraction();
    }
  }, [transcript]);

    return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Seguros Overmind</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/shopcar">Compra</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/about">Acerca de</Link>
                    </li>
                </ul>
            </div>

            <div className="row p-1">
                {isListening && <h6 className="col"><span className="badge text-bg-primary">Escuchando...</span></h6>}
                {isProcessing && <h6 className="col"><span className="badge text-bg-warning">Procesando...</span></h6>}
                {transcript && <h6 className="col">Usted dijo: <span className="badge text-bg-secondary">{transcript}</span></h6> }
                
            </div>
            <ScreenshotCapture className="col" onCapture={handleCapture} />
            
            
        </div>
    </nav>
    )
}