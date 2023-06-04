import React from "react";
import ReactDOM from "react-dom/client";
import MainWindow from "./Components/MainWindow.jsx";
import "./CSS/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>
);
