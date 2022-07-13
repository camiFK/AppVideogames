import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getPlatforms, getGenres, postVideogame} from '../../redux/actions'
import Styles from './AddGame.module.scss'
import swal from 'sweetalert';

const AddGame = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch]);

    const genres = useSelector(state => state.allGenres)
    const platforms = useSelector(state => state.allPlatforms)

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        background_image: '',
        genres: [],
        platforms: []
    })

    function handleChange(e) {
        setInput({...input, [e.target.name] : e.target.value})
      }

      function handleGenre(e) {
        setInput({ ...input, 
          genres: [...input.genres, e.target.value] 
        })
      }

      function handlePlatforms(e) {
        setInput({ ...input, 
          platforms: [...input.platforms, e.target.value] 
        })
      }

      const handleDeleteGenre = (e) => {
        setInput({ ...input, 
          genres: input.genres.filter(el => el !== e)
        })
      }

      const handleDeletePlatform = (e) => {
        setInput({ ...input,  
          platforms: input.platforms.filter(el => el !== e) 
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postVideogame(input))
        console.log(input)
        swal({
            title: "Success!",
            text: "Videogame added successfully!",
            icon: "success",
        })
        setInput({
          name: '',
          description: '',
          released: '',
          rating: '',
          background_image: '',
          genres: [],
          platforms: []
        })
        navigate('/home')
      }


  return (
    <div className={Styles.container}>

        <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>

        <button className={Styles.homebtn} onClick={() => navigate('/home')}>Home</button>
           <h2>Create your own videogame!</h2> 
          <div className={Styles.content}>

            <input 
            required 
            type="text" 
            name="name" 
            placeholder='Name'
            value={input.name} 
            onChange={handleChange} 
            className={Styles.ctninput}/>

            <input 
            required 
            type="text" 
            name="description" 
            placeholder='Description'
            value={input.description} 
            onChange={handleChange} 
            className={Styles.ctninput}/>

            <input 
            required 
            type="date" 
            name="released" 
            placeholder='Released'
            value={input.released} 
            onChange={handleChange} 
            className={Styles.ctninput}/>

            <input 
            required 
            type="number" min={1} max={5}
            name="rating" 
            placeholder='Rating'
            value={input.rating} 
            onChange={handleChange} 
            className={Styles.ctninput}/>

            <input 
            required 
            type="text" 
            name="background_image" 
            placeholder='Image'
            value={input.background_image} 
            onChange={handleChange} 
            className={Styles.ctninput}/>

            <label>Genres:</label>
            <select name="genres" onChange={handleGenre} className={Styles.select}>
                <option value="">Select a genre</option>
                {genres?.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
            </select>

            <div className={Styles.genrectn}>
              {
                input.genres.map(genre => (
                  <div className={Styles.selected}>
                    <p key={genre} >{genre}</p>
                    <button className={Styles.selectbtn} onClick={() => handleDeleteGenre(genre)}>X</button>
                </div>
                ))
              }
            </div>

            <label>Platforms:</label>
            <select name="platforms" onChange={handlePlatforms} className={Styles.select}>
                <option value="">Select a platform</option>
                {platforms?.map(platform => <option key={platform.id} value={platform.name}>{platform.name}</option>)}
            </select>

            <div className={Styles.platformctn}>
              {
                input.platforms.map(platform => (
                  <div className={Styles.selected}>
                    <p key={platform}>{platform}</p>
                    <button className={Styles.selectbtn} onClick={() => handleDeletePlatform(platform)}>X</button>
                </div>
                ))
              }
            </div>

            <button className={Styles.submitbtn} type='submit'>CREATE</button>
          </div>

        </form>

    </div>
  )
}

export default AddGame