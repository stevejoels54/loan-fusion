import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, App as AntdApp } from "antd";
import App from "./App.jsx";
import { PRIMARY_COLOR } from "./config/constants/index.js";
import "./custom.scss";
import "./index.css";
import setUpInterceptors from "./config/services/http.service.js";

setUpInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: PRIMARY_COLOR || "#1677FF",
        },
      }}
      componentSize="middle"
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
