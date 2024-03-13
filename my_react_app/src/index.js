import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MyStore } from "./store/Context";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));

const customStoreValue = {
  number: 5,
  name: "Ivan",
  email: "1@mail.ru",
};
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
{
  /* // <MyStore.Provider value={customStoreValue}> */
}
{
  /* // </MyStore.Provider> */
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
