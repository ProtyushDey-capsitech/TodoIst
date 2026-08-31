import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router";
import {Provider} from "react-redux";
import { store } from "./redux/store.ts"; 
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <BrowserRouter>
    <FluentProvider theme={webLightTheme}>
      <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </FluentProvider>
  </BrowserRouter>
  </Provider>,
);
