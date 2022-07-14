import swal from 'sweetalert'
const axios = require('axios');
// Acá se conectan el front y el back!!
// Conecto con la ruta que cree en el back y me trae todos los videojuegos 

export const getAllVideoGames =  () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://cfk-videogames.herokuapp.com/videogames`);
      dispatch({type: 'GET_ALL_VIDEOGAMES', payload: json.data})
    } catch (error) {console.error(error);}
  };
}  

export const getVideogameByName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://cfk-videogames.herokuapp.com/videogames?name=${name}`)
      dispatch({type: 'GET_VIDEOGAME', payload: json.data})
    } catch (error) {
      swal({
        title: "Error",
        text: `${name} was not found`,
        icon: "error",
      })
    }
  }
}

export const getVideogameDetail = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://cfk-videogames.herokuapp.com/videogames/${id}`)
      dispatch({type: 'GET_DETAIL', payload: json.data})
    } catch (error) {
      console.log(error)
    }
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://cfk-videogames.herokuapp.com/genres`)
      dispatch({type: 'GET_GENRES', payload: json.data})
    } catch (error) { console.log(error) }
  }
}

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://cfk-videogames.herokuapp.com/platforms`)
      dispatch({type: 'GET_PLATFORMS', payload: json.data})     
    } catch (error) { console.log(error) }
  }
}

export const filterByGenre = (payload) => {
  return { type: 'FILTER_BY_GENRE', payload }
}

export const filterByPlatform = (payload) => {
  return { type: 'FILTER_BY_PLATFORM', payload }
}

export const reset = () => {
  return {type: 'reset_videogame'}
}

export const postVideogame = (input) => {
  return async (dispatch) => {
    try {
      let newVideogame = await axios.post(`https://cfk-videogames.herokuapp.com/create`, input)
      return newVideogame
    } catch (error) { console.log(error) }
  }
}

export const deleteVideogame = (id) => {
  return async (dispatch) => {
    try {
      let deletedVideogame = await axios.delete(`https://cfk-videogames.herokuapp.com/videogames/${id}`)
      return deletedVideogame
    } catch (error) { console.log(error) }
  }
}