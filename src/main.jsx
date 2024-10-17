import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { DoctorProvider } from "./context/IsDoctor.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </BrowserRouter>
  </StrictMode>
);
