const { Router } = require('express');
const {Genres, Videogame, Platforms} = require('../db')
//const axios = require('axios')
const router = Router();
//const {apikey} = process.env;

router.post('/', async (req, res) => {
    let {name, description, released, rating, genres, platforms, image, createdDb} = req.body

     if (!name || !description || !released || !rating || !genres || !platforms) 
      return res.status(404).send('All fields required')

      let newVideoGame = await Videogame.create({
        name,
        description,
        released,
        rating, 
        image,
        createdDb
      }) //

      let genreDb = await Genres.findAll({
        where: {name: genres}
      })

      let platformDb = await Platforms.findAll({
        where: {name: platforms}
      })
      
      await newVideoGame.addGenres(genreDb)
      await newVideoGame.addPlatforms(platformDb)
      res.status(200).send(newVideoGame)
     
})

module.exports = router;