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
import DoctorList from "./pages/DoctorList";
import Checkout from "./pages/Checkout";
import Table from "./pages/Table";
import PortalPassword from "./components/PortalPassword";
import { Data } from "./components/Data";
import { PatientList } from "./pages/PatientList";

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
        <Route path="/registration" element={<Registration />} />
        <Route path="/doctors/list" element={<DoctorList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/data/table" element={<Table />} />
        <Route path="/doctor/password" element={<PortalPassword />} />
        <Route path="/doctor/table" element={<PatientList />} />
      </Routes>
    </>
  );
}

export default App;
