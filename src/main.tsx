import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#000000",
          solidBorder: "#000000",
          solidHoverBg: "rgba(0, 0, 0, 0.8)",
          solidHoverBorder: "rgba(0, 0, 0, 0.8)",
          solidActiveBg: "rgba(0, 0, 0, 1)",
          solidActiveBorder: "rgba(0, 0, 0, 1)",
          solidDisabledBg: "#000000",
          solidDisabledBorder: "#000000",

          //outline
          outlinedHoverBg: "rgba(0, 0, 0, 0.05)",
          outlinedActiveBg: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CssVarsProvider theme={theme}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              // pauseOnFocusLoss
              // draggable
              // pauseOnHover
              theme="light"
            />
            <App />

            <ToastContainer />
          </CssVarsProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
