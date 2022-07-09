const axios = require('axios');
// Acá se conectan el front y el back!!
// Conecto con la ruta que cree en el back y me trae todos los videojuegos 

export const getAllVideoGames =  () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/videogames`);
      dispatch({type: 'GET_ALL_VIDEOGAMES', payload: json.data})
    } catch (error) {console.error(error);}
  };
}  

export const getVideogameByName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      dispatch({type: 'GET_VIDEOGAME', payload: json.data})
    } catch (error) {
      alert('Sorry, no results found')
    }
  }
}

export const getVideogameDetail = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/videogames/${id}`)
      dispatch({type: 'GET_DETAIL', payload: json.data})
    } catch (error) {
      console.log(error)
    }
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/genres`)
      dispatch({type: 'GET_GENRES', payload: json.data.map(genre => genre.name)})
    } catch (error) { console.log(error) }
  }
}

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/platforms`)
      dispatch({type: 'GET_PLATFORMS', payload: json.data.map(platform => platform.name)})     
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
      const newVideogame = await axios.post(`http://localhost:3001/videogames`, input)
      dispatch({type: 'POST_VIDEOGAME', payload: newVideogame})
    } catch (error) { console.log(error) }
  }
}