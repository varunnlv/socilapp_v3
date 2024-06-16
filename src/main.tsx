import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { DarkModeContextProvider } from "./context/DarkModel";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { SocketContextProvider } from "./context/SocketContext";
import { AuthContextProvider } from "./context/AuthContext2";

// Use ReactDOM.render instead of ReactDOM.createRoot for legacy browser compatibility
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap the entire application with the QueryProvider */}
      <QueryProvider>
        {/* Wrap the entire application with the DarkModeContextProvider */}
        <DarkModeContextProvider>
          {/* Wrap the entire application with the AuthProvider */}
          <AuthProvider>

            <AuthContextProvider>

              <SocketContextProvider>

                {/* Render the App component */}
                <App />

              </SocketContextProvider>

            </AuthContextProvider>



          </AuthProvider>
        </DarkModeContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
