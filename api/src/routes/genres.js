const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {apikey} = process.env;
const {Genres} = require('../db')

router.get('/', async (req, res) => {
   try {     
      const genres = await axios.get(`https://api.rawg.io/api/genres?key=8b94a3c60bd8434b9cd313dbc0bda939`)

      const allgenres = genres.data.results.map(el => el.name)
   
      allgenres.forEach(v => {
          Genres.findOrCreate({ // Los busca o los crea
            where: {name: v}
         })        
      });
   
      const allGenres = await Genres.findAll()
      res.status(200).send(allGenres)

   } catch (error) {
      console.log(error)
   }

});


module.exports = router;