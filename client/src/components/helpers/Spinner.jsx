import React from 'react'
import Styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.spinner}></div>
    </div>
  )
}

export default Spinner