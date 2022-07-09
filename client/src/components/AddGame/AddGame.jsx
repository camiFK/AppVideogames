import React, {useEffect, useState} from 'react'
import Styles from './AddGame.module.scss'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres, getPlatforms } from '../../redux/actions';

const AddGame = () => {

    const dispatch = useDispatch()
    const [selectedGenres, setSelectedGenres] = useState('')
    const [selectedPlatforms, setSelectedPlatforms] = useState('')

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    const genres = useSelector((state) => state.allGenres)
    const platforms = useSelector((state) => state.allPlatforms)
    
    const handleGenre = (e) => {
        setSelectedGenres(e.target.value)
    }

  return (
    <>
    <Formik
        initialValues={{
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        genres: [1, 2, 3],
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
            <ErrorMessage name="name" component={() => ( <div className={Styles.msg}>{errors.name}</div> )} />

            <label>Description</label>
            <Field placeholder="Enter description" type="text" name="description" className={Styles.ctninput}/>
            <ErrorMessage name="description" component={() => ( <div className={Styles.msg}>{errors.description}</div>  )} />

            <label>Release date</label>
            <Field type="date" name="released" />
            <ErrorMessage name="released" component={() => ( <div className={Styles.msg}>{errors.released}</div>  )} />

            <label>Rating</label>
            <Field type="range" min="1" max="5" name="rating" />{values.rating}
            <ErrorMessage name="rating" component={() => ( <div className={Styles.msg}>{errors.rating}</div>  )} />

            <label>Image</label>
            <Field placeholder="Enter image" type="text" name="image" className={Styles.ctninput}/>
            <ErrorMessage name="image" component={() => ( <div className={Styles.msg}>{errors.image}</div>  )} />

            <label>Genres</label>
            <FieldArray as="select" name="genres" className={Styles.select}>
                {
                    fieldArrayprops => {
                       console.log(fieldArrayprops)
                       const {push, remove} = fieldArrayprops

                            {
                                genres.map((genre, index) => (
                                    <option key={index}>
                                        {genre}
                                    </option>
                                ))
                            }
                       
                    }
                }
            {/* {
                genres?.map(genre => (
                    <option key={genre.id} value={genre}>{genre}</option>
                    ))
                } */}
            </FieldArray>
            <ErrorMessage name="genres" component={() => ( <div className={Styles.msg}>{errors.genres}</div>  )} />

            {/* {
                values.genres?.map(genre => (
                    <div key={genre.id} className={Styles.genre}>{genre}</div>
                ))
            } */}

            <label>Platforms</label>
            <FieldArray as="select" name="plataformas" className={Styles.select}>
            {/* {
                platforms?.map(platform => (
                    <option key={platform.id} value={platform}>{platform}</option>
                    ))
                } */}
            </FieldArray>
            <ErrorMessage name="plataformas" component={() => ( <div className={Styles.msg}>{errors.plataformas}</div>  )} />

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