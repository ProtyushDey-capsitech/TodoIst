import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router";
import {Provider} from "react-redux";
import { store } from "./redux/store.ts"; 

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <BrowserRouter>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </BrowserRouter>
  </Provider>,
);
