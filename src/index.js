import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster, toast } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

toast("Only Front-End Avaliable for Site", {
  icon: "🥺",
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
});

root.render(
  <React.StrictMode>
    <Toaster position="bottom-center" reverseOrder={true} toastOptions />

    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
