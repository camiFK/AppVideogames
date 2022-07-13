import React from 'react'
import Styles from './Landing.module.scss'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

    const navigate = useNavigate()

  return (
    <>
      <div className={Styles.landingPage}>

        <div className={Styles.elements}>
          <h1 className={Styles.title}>VideoGames App</h1>
  
            <button 
             className={Styles.myButton} 
             onClick={() => navigate('/home')}
             >Start</button>
             
         </div>

       </div>
    </>
  )
}

export default Landing