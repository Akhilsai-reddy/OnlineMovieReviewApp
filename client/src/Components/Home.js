import React from "react";
import { useContext } from "react";
import { Card, Container } from "react-bootstrap";
// import { movieContext } from "./MoviesDataContext/Moviesdata";
import ReactStars from "react-rating-stars-component";
import "./CSS/Home.css";
import { Link } from "react-router-dom";
import { userContext } from "./USERCONTEXT/UserContext";
import {  useSelector } from "react-redux";


const Home = () => {
  // const { movies } = useContext(movieContext);  //by using contextApi
  const movies =useSelector((state)=> state.movies.movies)
  const { user } = useContext(userContext);
 
  // const dispatch=useDispatch();

  // //by using redux-toolkit
  // useEffect(() => {
  //   MoviesApi.getAllMoviesList((data)=>dispatch(movieActions.getAllMovies(data)))
  // }, [dispatch]);

  return (
      <Container className=" home mt-5">
        {movies.length>0? (<div className="movieList">
           {(user&&user.FirstName==="Admin")&&<Card className="text-center" style={{backgroundColor:'gainsboro'}}>
            {/* <Card.Title className="bg-warning">Add Movie</Card.Title> */}
         <h1 className="text-primary mt-5 py-5" ><Link to='/movie/add' > <i className="bi bi-plus-circle"></i><br/></Link></h1>
          </Card>}
  
        { movies.map((movie, index) => (
            <Card key={index} className="text" border="info"  style={{boxShadow:'10px 12px 18px -6px black'}}>
              <Link to={'/movie/'+movie._id}>
              <Card.Img
                src={movie.src}
                style={{ width: "100%", height: "14rem" }}
              /> </Link>
               <Card.Title className="px-3 py-2">{movie.movieName}</Card.Title>
              <Card.Footer >
                <ReactStars
                  count={5}
                  size={24}
                  value={movie.Rating}
                  isHalf={true}
                  edit={false}
                  color2={"#ffd700"}
                />
              </Card.Footer>
            </Card>
          ))}
        </div>):<h5 className="text-center text-info mt-5 py-5">The Movie/Movies you are looking for is not yet added, will be added soon..</h5>}
      </Container>
  );
};

export default Home;
