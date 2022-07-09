import React, {useEffect} from 'react'
import Styles from './AddGame.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres, getPlatforms } from '../../redux/actions';

const AddGame = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    const genres = useSelector((state) => state.allGenres)
    const platforms = useSelector((state) => state.allPlatforms)

    console.log(genres)

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

          if(!values.released)
            errores.released = "Provide a release date."

          if(!values.rating) 
            errores.rating = "Provide a rating."

          if(!values.image)
            errores.image = "Provide an image."

          if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(values.image))
            errores.image = "Image must be an URL."

          if(!values.genres.length)
            errores.genres = "Select at least one genre."

          if(!values.plataformas.length)
            errores.plataformas = "Select at least one plataform."

          return errores
        }}

      onSubmit={(input, {resetForm}) => {
        console.log(input)
        dispatch(postVideogame(input))
        alert('Game added!')
        resetForm();
      }}
    >
     {({handleSubmit, errors, values}) => (

        <div className={Styles.container}>
        <Form onSubmit={handleSubmit} className={Styles.form}>

            <div className={Styles.content}>


            <label>Name</label>
            <Field placeholder="Enter name" type="text" name="name" className={Styles.ctninput}/>
            <ErrorMessage name="name" component={() => ( <div>{errors.name}</div> )} />

            <label>Description</label>
            <Field placeholder="Enter description" type="text" name="description" className={Styles.ctninput}/>
            <ErrorMessage name="description" component={() => ( <div>{errors.description}</div>  )} />

            <label>Release date</label>
            <Field type="date" name="released" />
            <ErrorMessage name="released" component={() => ( <div>{errors.released}</div>  )} />

            <label>Rating</label>
            <Field type="range" min="1" max="5" name="rating" />{values.rating}
            <ErrorMessage name="rating" component={() => ( <div>{errors.rating}</div>  )} />

            <label>Image</label>
            <Field placeholder="Enter image" type="text" name="image" className={Styles.ctninput}/>
            <ErrorMessage name="image" component={() => ( <div>{errors.image}</div>  )} />

            <label>Genres</label>
            <Field as="select" name="genres" className={Styles.select}>
            {
                genres?.map(genre => (
                    <option key={genre.id} value={genre}>{genre}</option>
                    ))
                }
            </Field>
            <ErrorMessage name="genres" component={() => ( <div>{errors.genres}</div>  )} />

            <label>Platforms</label>
            <Field as="select" name="plataformas" className={Styles.select}>
            {
                platforms?.map(platform => (
                    <option key={platform.id} value={platform}>{platform}</option>
                    ))
                }
            </Field>
            <ErrorMessage name="plataformas" component={() => ( <div>{errors.plataformas}</div>  )} />

            <button type='submit' className={Styles.submitbtn}>CREATE</button>
                </div>

        </Form>
        </div>
     )

     }

    </Formik>
        </>
  )
}

export default AddGame