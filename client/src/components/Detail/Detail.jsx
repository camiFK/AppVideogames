import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Styles from './Detail.module.scss'
import {getVideogameDetail, reset} from '../../redux/actions'
import Loader from '../helpers/Loader';

const Detail = () => {

    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(() => {
        dispatch(reset())
        dispatch(getVideogameDetail(id))
    }, [dispatch, id]);

    const details = useSelector((state) => state.videogameDetail)

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(details.description, "text/html");
    const description = htmlDoc.body.innerText;

    return details.hasOwnProperty('id') ? (
    <>
    <div className={Styles.detailContainer}>

        {
            <div className={Styles.detailCard}>

                <div className={Styles.content}>

                <div className={Styles.imgctn}>
                 <img className={Styles.image} src={details.background_image} alt="Img not found"/>
                </div>

                <h1 className={Styles.name}>{details.name}</h1>

                <p className={Styles.desc}>{description}</p>

                <div className={Styles.table}>
                    
                  
                  <h3 className={Styles.title}>Rating</h3>
                  <h3 className={Styles.title}>Release date</h3> 
                    <p className={Styles.r}>{details.rating}</p>
                    <p className={Styles.r}>{details.released}</p>

                    <h3 className={Styles.title}>Genres</h3>
                  <h3 className={Styles.title}>Platforms</h3>
                    <p className={Styles.genre}>{details.genres?.map(g => (<li className={Styles.list}>{g}</li>))}</p>
                    <p className={Styles.plat}>{details.platforms?.map(p => (<li className={Styles.list}>{p}</li>))}</p>
                  
                 </div>

                </div>

          <div className={Styles.homebtn}>
             <Link to='/home'> 
             <button className={Styles.btn}>Back</button>
             </Link>
            </div>

            </div>
        }

    </div>
    </>
  )
  : <Loader/>
}

export default Detail