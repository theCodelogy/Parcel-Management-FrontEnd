import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import router from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./provider/AuthContext";
import Modal from "react-modal";
import { Provider } from 'react-redux'
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient();

// Set the app element for react-modal
Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  // <AuthProvider>
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate>
        <Toaster />
      </QueryClientProvider>
      </Provider>
    </StrictMode>
  </BrowserRouter>
  // </AuthProvider>
);
