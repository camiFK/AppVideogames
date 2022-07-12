import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllVideoGames, getGenres } from '../../redux/actions'
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination'
import VideogameCard from '../VideogameCard/VideogameCard'
import Styles from './Home.module.scss'
import Loader from '../helpers/Loader'
import Spinner from '../helpers/Spinner'


const Home = () => {

    const dispatch = useDispatch();
    const reducerVideoGames = useSelector((state) => state.allVideoGames)

     const [currentPage, setcurrentPage] = useState(1);
     const [videogamesPerPage] = useState(12);
     const lastVideogame = currentPage * videogamesPerPage;
     const firstVideogame = lastVideogame - videogamesPerPage;
     const currentVideogames = reducerVideoGames.slice(firstVideogame, lastVideogame);

      const paginate = (pageNumber) => setcurrentPage(pageNumber)

      const [loading, setLoading] = useState(false)

      useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(getGenres())
        setLoading(true);
        setTimeout(() => {
        setLoading(false)
      }, 6000)
      }, [dispatch]) 

      if (loading) {
        return <Loader/>
      } 
      else

      return (
        <div>
      {reducerVideoGames.length > 0 ? 

      <div className={Styles.home}>

      <NavBar 
      setcurrentPage={setcurrentPage}
      loading={loading}
      setLoading={setLoading}
       />

        <Pagination
         videogamesPerPage = {videogamesPerPage}
         allVideoGames = {reducerVideoGames.length}
         paginate = {paginate}
         /> 
         
        <div className={Styles.allCards}>
          {
            currentVideogames?.map((videogame, index) => {
              return (
                <VideogameCard 
                key={videogame.id}
                id={videogame.id}
                name={videogame.name}
                image={videogame.background_image}
                genres={videogame.genres}
                rating={videogame.rating}
                />
                )
              })
            }

        </div> 


    </div>

    : <Loader />
    }
     
  </div>
  )
}

export default Home;