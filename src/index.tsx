import React, { useState, useEffect } from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// 서비스 워커가 준비된 후에만 상태가 나오도록 변경
const RootApp = () => {
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const { worker } = require("./mocks/browser");
      worker.start().then(() => {
        console.log("Mock Service Worker started");
        setIsWorkerReady(true);
      });
    } else {
      setIsWorkerReady(true);
    }
  }, []);

  if (!isWorkerReady) {
    return <div>Loading...</div>;
  }

  return <App />;
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
