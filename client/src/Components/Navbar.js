import { useContext, useState } from "react";
import {  Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import MoviesApi from "./Data/MoviesApi";
// import { movieContext } from "./MoviesDataContext/Moviesdata";
import { movieActions } from "./Redux/MovieSlice";

import UserActions from "./USERACTIONS/UserActions";
import { userContext } from "./USERCONTEXT/UserContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState();
  const { user, logoutUser } = useContext(userContext);
  // const {getSearchedData}=useContext(movieContext)
  const navigate = useNavigate();
  const name = user?.FirstName;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const logout = (e) => {
    e.preventDefault();
    if (window.confirm("do you want to logout?")) {
      UserActions.logoutUser();
      logoutUser();
      toast.warning(" logged out successfully!", {
        position: "top-center",
        autoClose: "2000",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  };

  const searchHandler = (e) => {
    // getSearchedData(e.target.value)
    // dispatch(movieActions.getSearchedMovie(e.target.value))
    setSearchQuery(e.target.value);
    if (searchQuery.length < 1) {
      dispatch(movieActions.getSearchedMovie());
    }
  };

  return (
    <nav
      className="navbar  navbar-expand-lg navbar-light bg-light text-info shadow sticky-top"
      // style={{ boxShadow: "10px 12px 18px -6px blue" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-disabled="false"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-dark ">
                <h2>
                  <img src={`https://img.favpng.com/9/23/19/movie-logo-png-favpng-nRr1DmYq3SNYSLN8571CHQTEG.jpg`} alt="kk" height='60'/>
                 <b> <sub>Movie Review</sub></b> 
                </h2>
              </NavLink>
            </li>
            <li className="nav-item  px-5 py-4">
              <Form.Control
                type="search"
                placeholder="search movie here"

                style={{
                  width: "20rem",
                  
                  // boxShadow: "10px 12px 18px -6px black",
                }}
                value={searchQuery}
                onChange={(e) => searchHandler(e)}
              />
              <div
                style={{
                  position: "absolute",
                  maxHeight: "150px",
                  overflowY: "hidden",
                  height: "fitContent",
                  width: "330px",
                }}
                className="mt-5 bg-dark text-info "
              >
                {searchQuery &&
                  movies
                    ?.filter((movie) =>
                      movie.movieName
                        ?.toLowerCase()
                        .includes(searchQuery?.toLowerCase())
                    )
                    .map((query) => (
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/movie/${query._id}`);
                          setSearchQuery("");
                        }}
                      >
                        {query.movieName}
                      </p>
                    ))}
              </div>

              {/* &nbsp; <button className="btn btn-sm btn-outline-info" onClick={()=>searchHandler()}> <i className="bi bi-search "/></button> */}
            </li>
          </ul>
          <form className="d-flex">
            {user ? (
              <>
                <NavLink
                  className="text-info px-4"
                  style={{ textDecoration: "none" }}
                  to={`/${name}`}
                >
                  <button  className="btn btn-outline-info shadow "> <i className="bi bi-person-circle" /> {name}</button> 
                </NavLink>
                &nbsp;
                <button
                  className="btn btn-outline-danger btn-sm shadow "
                  onClick={(e) => logout(e)}
                >
                  log out?
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link text-info shadow">
                <b>LOGIN</b>
              </NavLink>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
