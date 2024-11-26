import AuthFormPage from "./pages/AuthForm/AuthFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" />
      <AuthFormPage />
    </div>
  );
};

export default App;
