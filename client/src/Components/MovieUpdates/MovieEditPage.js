import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MoviesApi from '../Data/MoviesApi';
import { movieActions } from '../Redux/MovieSlice';
import EditForm from './EditForm';

const MovieEditPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(() => {
  MoviesApi.getMovieById(id,data=>setMovie(data))
    }, [id]);

    const updateData=(updatedData)=>{
  // e.preventDefault()
    MoviesApi.updateMovieById(id,updatedData)
    dispatch(movieActions.updateMovieById(updatedData))
    navigate('/')
    }
  return (
    <Container>
        <Row>
            <Col></Col>
            <Col xs={5}>
                <Card className="text-center mt-5" border="success" style={{boxShadow:'0px 12px 18px -6px rgba(0,0,0,0.7)'}}>
                    <Card.Body>
                      <Card.Title><b> Edit Movie Details</b></Card.Title>
                      <hr/>   
                      {movie && <EditForm  id={movie._id} name={movie.movieName} director={movie.Director}
                      details={movie.details} src={movie.src} reviews={movie.reviews} rating={movie.Rating}
                      onSubmit={(value)=>updateData(value)}/>}
                    </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
        </Row>
    </Container>
  )
}

export default MovieEditPage