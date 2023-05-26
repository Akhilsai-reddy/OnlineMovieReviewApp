import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
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
      className="navbar  navbar-expand-lg navbar-blue bg-dark text-info sticky-top"
      style={{ boxShadow: "10px 12px 18px -6px blue" }}
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
              <NavLink to="/" className="nav-link text-info ">
                <h2>
                  <b>Movie Review</b>
                </h2>
              </NavLink>
            </li>
            <li className="nav-item  px-5 py-3">
              <Form.Control
                type="search"
                placeholder="search movie here"
                style={{
                  width: "20rem",
                  boxShadow: "10px 12px 18px -6px blue",
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
              <b>
                <NavLink
                  className="text-info"
                  style={{ textDecoration: "none" }}
                  to={`/${name}`}
                >
                  <i className="bi bi-person-circle" /> welcome {name}
                </NavLink>
                &nbsp;
                <button
                  className="btn btn-outline-danger btn-sm "
                  onClick={(e) => logout(e)}
                >
                  log out?
                </button>
              </b>
            ) : (
              <NavLink to="/login" className="nav-link text-info">
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
