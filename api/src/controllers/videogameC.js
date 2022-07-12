const {Genres, Videogame, Platforms} = require('../db')
const axios = require('axios')
const {apikey} = process.env;

const videoGamesApi = async () => {
    let response = await axios.get(`https://api.rawg.io/api/games?key=${apikey}`)
    let allGamesApi = []
    let pages = 0;
  
   while (pages < 5) { 
      pages++;
      response.data.results.map(game => {
         allGamesApi.push({
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          genres: game.genres.map(v => { return { name: v.name}}),
          platforms: game.platforms.map(p => { return {name: p.platform.name}})
      })
   })
    response = await axios.get(response.data.next)
    // Trae todos
  }
   return allGamesApi;
  }

  const videoGamesDb = async () => { 
    const allGamesDb = await Videogame.findAll({
     include: [
      { 
       model: Genres,
       attributes: ['name'],
       through: {attributes: [] }
      },
      {
        model: Platforms,
        attributes: ["name"],
        through: { attributes: [] }
    }]
   })
   return allGamesDb;
  }
  
  const getAllGames = async (id) => {
    const apiGames = await videoGamesApi(id); // Guardo la llamada a los juegos de la Api
    const dbGames = await videoGamesDb(id); // Guardo la llamada a los juegos de la base de datos
    const allGames = apiGames.concat(dbGames) // Los junto
    return allGames
  } 

  const getVideogameById = async (id) => {

    if (id.includes('-')) {
      const videogamedb = await Videogame.findByPk(id, {
        include: {
          model: Genres,
          attributes: ['name'],
          through: {attributes: []}
        }
      });
      return videogamedb;
      
    } else {

      const {data} = await axios(`https://api.rawg.io/api/games/${id}?key=${apikey}`)

      let gameDetail = {
        id: data.id,
        name: data.name,
        description: data.description,
        background_image: data.background_image,
        genres: data.genres.map(v => v.name),
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map(p => p.platform.name)
      }
      return gameDetail;
    }

  }

module.exports = {
  getAllGames,
  getVideogameById
}