import "./App.css";
import Home from "./pages/Home";
import "regenerator-runtime/runtime";
import { Route, Routes } from "react-router-dom";
import Symptom from "./pages/Sympton";
import Prediction from "./pages/Prediction";
import Recording from "./pages/Recording";
import AudioPrediction from "./pages/audioPrediction";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import Registration from "./pages/Registration";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sympton" element={<Symptom />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/audio-analysis" element={<Recording />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/audio-prediction" element={<AudioPrediction />} />
        <Route path="/registration" element={<Registration/>} />
      </Routes>
    </>
  );
}

export default App;
