import React from 'react'
import Styles from './AddGame.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { postVideogame } from '../../redux/actions';

const AddGame = () => {

  const dispatch = useDispatch()

  return (
    <>
    <Formik
        initialValues={{
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
        plataformas: []
        }}

        validate={(values) => {
            let errores = {}
          if (!values.name) 
            errores.name = "Provide a name."
          else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name))
            errores.name = "Only strings!"
            if (!values.description) 
            errores.description = "Provide a description."

          return errores
        }}

      onSubmit={(input, {resetForm}) => {
        console.log(input)
        dispatch(postVideogame(input))
        alert('Game added!')
        resetForm();
      }}
    >
     {({handleSubmit, errors, touched}) => (
        
        <div className={Styles.container}>
        <Form onSubmit={handleSubmit} className={Styles.form}>

            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component={() => ( <div>{errors.name}</div> )} />

            <label>Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component={() => ( <div>{errors.description}</div>  )} />

            <button type='submit'>Submit</button>

        </Form>
        </div>
     )

     }

    </Formik>
        </>
  )
}

export default AddGame