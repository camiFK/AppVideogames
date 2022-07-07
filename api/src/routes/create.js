const { Router } = require('express');
const {Genres, Videogame} = require('../db')
//const axios = require('axios')
const router = Router();
//const {apikey} = process.env;

router.post('/', async (req, res) => {
    let {name, description, released, rating, genres, platforms, createdDb} = req.body
    platforms = platforms.toString()

     if (!name || !description || !released || !rating || !genres || !platforms) 
      return res.status(404).send('All fields required')

      let newVideoGame = await Videogame.create({
        name,
        description,
        released,
        rating, 
        genres,
        platforms,
        createdDb
      }) //

      let genreDb = await Genres.findAll({
        where: {name: genres}
      })
      
      newVideoGame.addGenres(genreDb)
      res.status(200).send(newVideoGame)
     
})

module.exports = router;