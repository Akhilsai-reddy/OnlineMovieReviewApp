import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesApi from '../Data/MoviesApi';
// import { movieContext } from '../MoviesDataContext/Moviesdata';
import { movieActions } from '../Redux/MovieSlice';
import AddForm from './AddForm'

const AddMoviePage = () => {

    // const {addNewMovie}=useContext(movieContext) //--> by using contextApi
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const AddMovie = (movie) => {
     MoviesApi.addMovie(movie)
     dispatch(movieActions.addNewMovie(movie)) //-->for redux-toolkit
      //  addNewMovie(movie) //-->it is for contextApi
         navigate('/')
         toast.info(
          "movie added...!",{
            position:'top-center',
            autoClose:'2000',
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            theme:"light"
          }
        )
      };
  return (

    <Container>
      <Row>
        <Col></Col>
        <Col xs={5}>
          <Card className="text-center mt-5" border="info" style={{boxShadow:'0px 12px 18px -6px rgba(0,0,0,0.7)'}}>
            <Card.Body>
              <Card.Title>
                <b>Add New Product</b>
              </Card.Title>
              <hr />
              <AddForm onSubmit={(product) => AddMovie(product)} />
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>

  )
}

export default AddMoviePage