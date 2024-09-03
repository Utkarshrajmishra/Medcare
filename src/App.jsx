import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Symptom from "./pages/Sympton";
import Prediction from "./pages/Prediction";
import Recording from "./pages/Recording";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sympton" element={<Symptom />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/audio-analysis" element={<Recording/>}/>
      </Routes>
    </>
  );
}

export default App;
