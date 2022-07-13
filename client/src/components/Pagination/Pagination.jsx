import React from "react";
import Styles from './Pagination.module.scss'

const Pagination = ({videogamesPerPage, reducerVideoGames, paginate}) => {
     const pageNumber = []

     for (let i = 1; i <= Math.ceil(reducerVideoGames/videogamesPerPage); i++) {
        pageNumber.push(i)
     }

    return (
        <div>   

        <div className={Styles.paginate}>
        {
          pageNumber?.map(num => {
            return <div key={num} className={Styles.numbers} onClick={() => paginate(num)}>{num}</div>
        })

        }
        </div>

       </div>  
    )
}

export default Pagination;