import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./custom.scss";
import "./index.css";
import setUpInterceptors from "./config/services/http.service.js";

setUpInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
