import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    props.showAlert("Logout Succesfully", "success");
  };

  //Get user detail
  const [user, setUser] = useState("");

  const getUser = async () => {
    // API Call
    const response = await fetch(
      "https://inotebook-server.herokuapp.com/api/auth/getuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setUser(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      console.log("Cannot get user details");
    }
    // eslint-disable-next-line
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
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
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <>
              <span className="navbar-text text-warning  mx-5">
                <strong>{user.name}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
