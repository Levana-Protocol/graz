import "./index.css";

import { GrazProvider } from "graz";
import { cosmoshub } from "graz/chains";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <GrazProvider
        grazOptions={{
          chains: [cosmoshub],
        }}
      >
        <App />
      </GrazProvider>
    </React.StrictMode>,
  );
}
