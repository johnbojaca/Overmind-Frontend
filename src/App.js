import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScreenshotCapture from './components/ScreenshotCapture';
import useVoiceInteraction from './hooks/useVoiceInteraction';
import { getHelpFromGemini } from './services/geminiService';

import {Navbar} from './components/Navbar'
import {Insurances} from './components/Insurances'
import {Shopcar} from './components/Shopcar'
import {Purchase} from './components/Purchase'
import {About} from './components/About'


function App() {
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
    <div className="App">
      <header className="App-header">
        <h1>Multimodal Help with Gemini</h1>
        <div id="capture-area"></div>

    <Router>
      <Navbar/>
      <div className='container p-4'>
      <div id="capture-area">
        <Routes>
          <Route path="/" element={<Insurances/>}/>
          <Route path="/shopcar" element={<Shopcar/>}/>
          <Route path="/purchase" element={<Purchase/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
      <ScreenshotCapture onCapture={handleCapture} />
      {isListening && <p>Escuchando...</p>}
        {isProcessing && <p>Pensando...</p>}
        {transcript && <p>Usted dijo: {transcript}</p>}
      </div>
    </Router>
    </header>
    </div>
  )
}


export default App;
