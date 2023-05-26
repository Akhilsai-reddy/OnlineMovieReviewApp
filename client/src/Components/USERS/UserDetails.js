import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userContext } from '../USERCONTEXT/UserContext'


const UserDetails = () => {

    const {user}=useContext(userContext)
  return (
   <Container className='text-right mt-5'>
    <Row>
        <Col/>
    <Card style={{width:'20rem',}} border='warning'>
        <Card.Title><b className='text-center px-5 '><i className="bi bi-person-circle" /> {user.FirstName+ " "+user.LastName}</b></Card.Title>
       <hr/>
        <Card.Body>
           <span> <b>Email Id:&emsp;</b>{user.email} </span><br/><br/>
           <span> <b>Phone Num:&emsp;</b>{user.PhoneNumber} </span><br/><br/>
           {/* <span> <b>Password:&emsp;</b>{user.Password} </span><br/><br/> */}
           <span> <b>Location:&emsp;</b>{user.Location} </span><br/><br/>
        </Card.Body>
    <Card.Footer>
    <Link className='text-center text-warning px-5' to='/'>Back to Home?</Link>
    </Card.Footer>
    </Card>
    <Col/>
    </Row>
   </Container>
  )
}

export default UserDetails