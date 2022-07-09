import React, {useState} from 'react'
import Styles from './SearchBar.module.scss'
import {useDispatch} from 'react-redux'
import { getVideogameByName } from '../../../redux/actions'
import Loader from '../../helpers/Loader'

const SearchBar = ({setcurrentPage, loading, setLoading}) => {

  const dispatch = useDispatch();

  const [name, setName] = useState("") // av


  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogameByName(name))
    setLoading(true);
         setTimeout(() => {
         setLoading(false)
    }, 6000)
    setcurrentPage(1)
    setName('')
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>

         <div className={Styles.searchbar}>
         <input
          className={Styles.input}
          type='text'
          placeholder='Search...'
          onChange={(e) => handleChange(e)}
          value={name}
          />

         <button type='submit' className={Styles.searchbtn}>
          Search
         </button>
         
         </div>
          </form>
    </div>
  )
}

export default SearchBar