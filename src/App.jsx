import "./App.css";
import Blog from "./pages/Home/blog";
import Login from "./pages/Login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/Register/register";
import Navbar from "./components/Navbar";
import User from "./pages/User/user";
import useAuthStore from "./services/store/authStore";
import RequrireAuth from "./components/ProtectedRoutes/requrireAuth";
import ResetPassword from "./pages/Login/resetPassword";

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route element={<RequrireAuth requireRoles={["admin"]} />}>
            <Route path="/user" element={<User />} />
          </Route>
          <Route element={<RequrireAuth requireRoles={["user", "admin"]} />}>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/blog" element={<Blog />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}

export default App;
