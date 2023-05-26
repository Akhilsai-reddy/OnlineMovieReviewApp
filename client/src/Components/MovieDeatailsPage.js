import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import MoviesApi from "./Data/MoviesApi";
import ReviewPage from "./Reviews/ReviewPage";
import "./CSS/MovieDetailsPage.css";
import { userContext } from "./USERCONTEXT/UserContext";
// import { movieContext } from "./MoviesDataContext/Moviesdata";
import { useDispatch } from "react-redux";
import { movieActions } from "./Redux/MovieSlice";

const MovieDeatailsPage = () => {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const { user } = useContext(userContext);
  // const { deleteMovie } = useContext(movieContext);// by using contextApi
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(() => {
    MoviesApi.getMovieById(id, (data) => setMovie(data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("do you want to delete?")) {
      MoviesApi.deleteMovieById(id);
      // deleteMovie(id); //-->contextApi
      dispatch(movieActions.deleteMovieById(id)) //-->redux-toolkit
      navigate("/");
    }
  };
  return (
    <Container className="mt-2" style={{ position: "relative" }}>
      {movie ? (
        <>
          <div
            className="backgroundImage "
            style={{ backgroundImage: `url(${movie.src})`,boxShadow:'10px 12px 18px -6px turquoise',borderRadius:'15px' }}
          />
          <Card
            className="text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              height: "400px",
            }}
          >
            <Card.Title className="text-left mt-5 px-5 text-warning">
              <h1>
                <b>{movie.movieName}</b>
              </h1>
            </Card.Title>
            <Card.Body>
              <h5> {movie.details}</h5> <br />
              <br />
              <Card.Text>
                <b>Director</b> : {movie.Director} <br />
                <br />
                <b>Overal Rating</b> :{" "}
                {movie.Rating === null ? 0 : movie.Rating.toFixed(1)}⭐
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              {user && user.FirstName === "Admin" && (
                <>
                  <Link
                    to={"/movie/edit/" + id}
                    className="btn btn-md btn-warning"
                  >
                    Update
                  </Link>
                  <Button
                    className="btn btn-md btn-danger"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </Button>
                </>
              )}{" "}
            </Card.Footer>
          </Card>
          
          {user ? (
            <ReviewPage movie={movie} id={id} user={user} />
          ) : (
            <h5 className=" mt-5 alert alert-primary" role="alert">
              <i className="bi bi-exclamation-triangle-fill " /> If you want to
              see reviews or want to give your review please login.
            </h5>
          )}
        </>
      ) : (
        <h3>Loading Content please wait....</h3>
      )}
    </Container>
  );
};

export default MovieDeatailsPage;
