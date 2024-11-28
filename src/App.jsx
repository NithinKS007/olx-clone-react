import AuthFormPage from "./pages/AuthFormPage";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AuthContextProvider from "./contexts/AuthContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import SellItemContextProvider from "./contexts/SellItemContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <SearchContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
        <SellItemContextProvider> 
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
          </SellItemContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  );
};

export default App;
