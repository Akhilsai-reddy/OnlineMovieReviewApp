import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Card, Col, Container, Row } from 'react-bootstrap'
import UserApi from '../Data/UserApi'
import {  useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../USERCONTEXT/UserContext'
import UserActions from '../USERACTIONS/UserActions'

const AdminLoginForm = (props) => {

  const{setUser}=useContext(userContext)
  const navigate=useNavigate()
  return(
    <Container className='text-center mt-5'> 
<Row>
  <Col/>
  <Card style={{width:'20rem' , height:'22rem', boxShadow:'0px 12px 18px -6px rgba(0,0,0,0.7)'}} border='info'>
    <Card.Title>  <h2>Login Form</h2>
    <hr/></Card.Title>
      <Card.Body>
     
      <Formik
  initialValues={{
    email: '',
      password:''
  }}
    validationSchema={
    yup.object().shape({
      email:yup.string().email().required(),
      password:yup.string().min(6,'password must be at least 6 characters').required()
    })
  }
  onSubmit={
      values=>{
        console.log(values)
      UserApi.getAdmin(values,user=>{
     if( user!==undefined && user.email==="admin1@admin.com" &&user.password==="admin@123"){
      UserActions.loginUser(setUser,user)
      alert('successfully logged In')
      navigate('/')
     }
    if(user==='invalid credentials'){
      alert('invalid credentials')
    }
    else if(user==='invalid password'){
      alert('invalid password')
    }
      })
      }
  }
  >

      <Form>Login as User<input type='checkbox' onChange={()=>props.setIsAdmin(!props.isAdmin)}/>
    <div className="form-group">
         <label htmlFor="email"><h4><i className='bi bi-envelope'/> &nbsp;</h4> </label>
         <Field type='email' name='email' placeholder='Admin Id' />
         <span style={{color:'red'}}><ErrorMessage name="email"/></span>
         </div>
        <br/> 
         <div className="form-group">
         <label htmlFor="password"><h4><i className='bi bi-eye'/> &nbsp;</h4></label>
         <Field type='password' name='password' placeholder='Enter password'/>
         <span style={{color:'red'}}><ErrorMessage name="password"/></span>
         </div>
         <br/>
         <button className="btn btn-success btn-sm" type='submit'>Login</button>
      </Form>
  </Formik>
     </Card.Body>
     </Card>
     <Col/>
     </Row>
  </Container>
  )
}

export default AdminLoginForm