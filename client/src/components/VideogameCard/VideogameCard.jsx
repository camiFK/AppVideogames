import React from "react";
import Styles from './VideogameCard.module.scss'
import { Link } from 'react-router-dom'

const VideogameCard = ({name, image, genres, id}) => {

    return (
        <div className={Styles.containerVG}>
            <div className={Styles.cards}>

            <Link to={`/detail/${id}`}>
             <p className={Styles.name}>{name}</p>
           </Link>

            <img src={image} className={Styles.img} alt="Img not found"/>   

            <div className={Styles.genres}>
              Genres:
              <ul>
                {genres?.map(g => (<li>{g}</li>))}
              </ul>
            </div>

            </div>
        </div>

    )

}

export default VideogameCard;