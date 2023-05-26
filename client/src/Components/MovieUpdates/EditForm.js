import { ErrorMessage, Field, Formik,Form } from 'formik'
import * as yup from 'yup'
import React from 'react'


const EditForm = (props) => {

  const prevData={
    _id:props.id,
    movieName:props.name,
    Director: props.director,
    src: props.src,
    details:props.details,
    reviews:props.reviews,
    Rating:props.rating
  }
  return(
   
    <Formik
    initialValues={prevData}
    enableReinitialize={true}

      validationSchema={
      yup.object().shape({
        movieName:yup.string().required(),
        Director:yup.string().required(),
        details:yup.string().required()
      })
    }
    onSubmit={
        (values)=>{
          props.onSubmit(values)
        }
    }
    >
        <Form>
          <div className="form-group">
           <label htmlFor="movieName"><b>movieName</b>  </label><br/>
           <Field type='text' name='movieName'  />
           <span style={{color:'red'}}><ErrorMessage name="movieName"/></span>
           </div>
           <div className="form-group">
           <label htmlFor="details"><b>details</b></label><br/> 
           <Field as='textarea' name='details'   />
           <span style={{color:'red'}}><ErrorMessage name="details"/></span>
           </div> 
           <div className="form-group">
           <label htmlFor="Director"><b>Director</b></label><br/>
           <Field type='text' name='Director' />
           <span style={{color:'red'}}><ErrorMessage name="Director"/></span>
           </div>
           <div>
           <button className="btn btn-success btn-sm" type='submit'>UPDATE</button>
           </div>
        </Form>
       
    </Formik>
)
  }

export default EditForm