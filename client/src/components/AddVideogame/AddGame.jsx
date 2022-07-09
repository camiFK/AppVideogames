import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getGenres, postVideogame} from '../../redux/actions'
import Styles from './AddGame.module.scss'

const check = /\S+/;
const regExpr = /^[a-z]+$/i;

function validate(input) {
    let errors = {}
    if (!check.test(input.name) || !regExpr.test(input.name) || input.name.length < 3) {
      errors.name = "Provide a name. Only strings (more than two characters).";
      }
    if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(input.image)) {errors.image = "Only URL directions.";}
    if(!input.genres.length < 1) {errors.genres = "Select at least one genre.";}
    if (!input.plataformas.length < 1) {errors.plataformas = "Select at least one plataform.";}
  
      return errors;
  }

const AddGame = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setError] = useState({})

    const genres = useSelector(state => state.allGenres)
    const platforms = useSelector(state => state.allPlatforms)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
        plataformas: []
    })


    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        setError(validate({
          ...input,
          [e.target.name] : e.target.value
        }))
      }

      function handleGenre(e) {
        setInput({
          ...input,
          genres: [...input.genres, e.target.value]
        })
        setError(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
      }


  return (
    <div className={Styles.container}>
        <button onClick={() => navigate('/home')}>Home</button>
        <h1>Create your own videogame!</h1>

        <form className={Styles.form}>

            <label>Name:</label>
            <input type="text" name="name" value={input.name} onChange={handleChange}/>

            <label>Description:</label>
            <input type="text" name="description" value={input.description} onChange={handleChange}/>

            <label>Released:</label>
            <input type="text" name="released" value={input.released} onChange={handleChange}/>

            <label>Rating:</label>
            <input type="text" name="rating" value={input.rating} onChange={handleChange}/>

            <label>Image:</label>
            <input type="text" name="image" value={input.image} onChange={handleChange}/>

            <label>Genres:</label>
            <select name="genres" value={input.genres} onChange={handleGenre}>
                <option value="">Select a genre</option>
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre}</option>)}
            </select>

            <label>Platforms:</label>
            <select name="plataformas" value={input.plataformas} onChange={handleChange}>
                <option value="">Select a platform</option>
                {platforms.map(platform => <option key={platform.id} value={platform.id}>{platform}</option>)}
            </select>

        </form>

    </div>
  )
}

export default AddGame