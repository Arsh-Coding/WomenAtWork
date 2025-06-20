import { createRoot } from "react-dom/client";
// import './index.css'
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./services/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
