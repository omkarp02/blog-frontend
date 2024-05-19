import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../services/store/authStore";

const defaultRoutes = [
  {
    link: "/register",
    label: "Register",
  },
  {
    link: "/login",
    label: "Login",
  },
];

const adminRoutes = [
  {
    link: "/user",
    label: "User",
  },
];

const userRoutes = [];

const pickRoute = {
  default: defaultRoutes,
  admin: adminRoutes,
  user: userRoutes,
};

const Navbar = () => {
  const [page, setPage] = useState(window.location.pathname);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const removeToken = useAuthStore((state) => state.removeToken);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light position-fixed w-100 top-0"
      style={{ zIndex: 2 }}
    >
      <div className="container-fluid">
        <Link to={"/blog"} className="navbar-brand" href="#">
          Blog App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pickRoute[user ? user.role : "default"].map((ele, i) => (
              <li className="nav-item" key={i}>
                <Link
                  className={`nav-link ${page === ele.link ? "active" : ""}`}
                  onClick={() => setPage(ele.link)}
                  to={ele.link}
                >
                  {ele.label}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/reset-password"}
                    className="nav-link"
                  >
                    Reset Password
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
