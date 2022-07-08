import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import Styles from './NavBar.module.scss'
import FilterGenre from './FilterGenre/FilterGenre'
import FilterPlatforms from './FilterPlatforms/FilterPlatforms'
import Spinner from '../helpers/Spinner'
import Loader from '../helpers/Loader'
import { useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { getAllVideoGames } from '../../redux/actions'

const NavBar = ({setcurrentPage}) => {


  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getAllVideoGames())
  }

   return (
    <div className={Styles.navcontainer}>
 
       <button
       className={Styles.navbtn}
       onClick={() => navigate('/')}
       >Create</button>
      <FilterPlatforms setcurrentPage={setcurrentPage}/>
      <FilterGenre setcurrentPage={setcurrentPage}/> 
      <SearchBar
      loading={loading}
      setLoading={setLoading} 
      setcurrentPage={setcurrentPage} />
      <button 
      className={Styles.navbtn}
      onClick={(e) => handleClick(e)}
      >
        Clear
      </button>
      
    </div>
  )
}

export default NavBar