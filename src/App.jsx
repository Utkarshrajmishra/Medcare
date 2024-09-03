import "./App.css";
import Home from "./pages/Home";
import "regenerator-runtime/runtime";
import { Route, Routes } from "react-router-dom";
import Symptom from "./pages/Sympton";
import Prediction from "./pages/Prediction";
import Recording from "./pages/Recording";
import AudioPrediction from "./pages/audioPrediction";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sympton" element={<Symptom />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/audio-analysis" element={<Recording />} />
        <Route path="/audio-prediction" element={<AudioPrediction />} />
      </Routes>
    </>
  );
}

export default App;
