import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGenres, filterByGenre } from '../../../redux/actions';
import Styles from './FilterGenre.module.scss'

const FilterGenre = ({setcurrentPage}) => {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.allGenres)

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    const handleFilterGenres = (e) => {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value))
        setcurrentPage(1)
    }

  return (
    <div className={Styles.filterctn}>
        <select
        className={Styles.select}
        onChange={(e) => handleFilterGenres(e)}
        >
        <option className={Styles.option} value='all'>All</option>
            {
                genres?.map((genre, index) => (
                    <option className={Styles.option} key={index} value={genre}>
                        {genre}
                    </option>
                ))
            }

        </select>

    </div>
  )
}

export default FilterGenre