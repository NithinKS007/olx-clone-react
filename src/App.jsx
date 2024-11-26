import AuthFormPage from "./pages/AuthFormPage";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<AuthFormPage />} />
          <Route path="/addItem" element={<AddItemPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
