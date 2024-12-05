import AuthFormPage from "./pages/AuthFormPage";
import HomePage from "./pages/HomePage";
import { ContextProvider } from "./contexts/ContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import React, { Suspense, lazy } from "react";
const AddItemPage = lazy(() => import("./pages/AddItemPage"));
const ItemDetailPage = lazy(() => import("./pages/ItemDetailPage"));

const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="min-h-screen ">
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<AuthFormPage />} />

            <Route
              path="/addItem"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectedRoute>
                    <AddItemPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/item/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ItemDetailPage />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
