import { ErrorMessage, Field, Formik,Form } from 'formik'
import * as yup from 'yup'
import React from 'react'


const AddForm = (props) => {

  return(
   
    <Formik
    initialValues={{
    movieName:'',
    Director: '',
    src: '',
    details:'',
    reviews:[],
    Rating:0
    }}

      validationSchema={
      yup.object().shape({
        movieName:yup.string().required(),
        Director:yup.string().required(),
        details:yup.string().required(),
       src:yup.string().required()
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
           <Field as='textarea' name='details'  />
           <span style={{color:'red'}}><ErrorMessage name="details"/></span>
           </div> 
           <div className="form-group">
           <label htmlFor="Director"><b>Director</b></label><br/>
           <Field type='text' name='Director' />
           <span style={{color:'red'}}><ErrorMessage name="Director"/></span>
           </div>
           <div className="form-group">
           <label htmlFor="src"><b>Movie Url</b></label><br/>
           <Field type='text' name='src'/>
           <span style={{color:'red'}}><ErrorMessage name="src"/></span>
           </div>
           <div>
           <button className="btn btn-primary btn-md" type='submit'>ADD</button>
           </div>
        </Form>
       
    </Formik>
)
  }

export default AddForm 