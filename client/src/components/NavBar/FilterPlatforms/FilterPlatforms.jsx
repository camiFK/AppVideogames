import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlatforms, filterByPlatform } from '../../../redux/actions'
import Styles from './FilterPlatforms.module.scss'

const FilterPlatforms = ({setcurrentPage}) => {

    const dispatch = useDispatch();
    const platforms = useSelector((state) => state.allPlatforms)

    useEffect(() => {
        dispatch(getPlatforms());
    }, [dispatch])

    const handleFilterPlatforms = (e) => {
        e.preventDefault();
        dispatch(filterByPlatform(e.target.value))
        setcurrentPage(1)
    }

  return (
    <>
    <div className={Styles.filterctn}>
        <select
        className={Styles.selectctn}
        onChange={(e) => handleFilterPlatforms(e)}
        >
        <option className={Styles.optionctn} value='all'>All</option>
            {
                platforms?.map((platform, index) => (
                    <option className={Styles.optionctn} key={index} value={platform.name}>
                        {platform.name}
                    </option>
                ))
            }

        </select>

    </div>
    </>
  )
}

export default FilterPlatforms
