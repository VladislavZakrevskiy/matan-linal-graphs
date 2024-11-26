import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
    <App />
  </ConfigProvider>
);
