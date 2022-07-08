import React from "react";
import Styles from './Pagination.module.scss'

const Pagination = ({videogamesPerPage, allVideoGames, paginate}) => {
     const pageNumber = []
     const myPages = Math.ceil(allVideoGames/videogamesPerPage)

     for (let i = 1; i < myPages; i++) {
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