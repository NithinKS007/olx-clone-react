import AuthFormPage from "./pages/AuthFormPage";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AuthContextProvider from "./contexts/AuthContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <div className="min-h-screen ">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<AuthFormPage />} />

              <Route
                path="/addItem"
                element={
                  <ProtectedRoute>
                    <AddItemPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/item/:id" element={<ItemDetailPage />} />
            </Routes>
          </div>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
