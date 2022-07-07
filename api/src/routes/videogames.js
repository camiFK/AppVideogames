const router = require('express').Router();
const {getAllGames, getVideogameById} = require('../controllers/videogameC')

//Traigo la info de los juegos
router.get('/', async (req, res) => {
  const {name} = req.query
  let totalVideoGames = await getAllGames();
  //console.log(totalVideoGames)
    if (name) { 
      let gamesFiltered = totalVideoGames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      gamesFiltered.length ? 
      res.status(200).json(gamesFiltered) : 
      res.status(404).send('No existe ese videojuego') 
         
    } else {
      res.status(200).send(totalVideoGames)
    }  
});

router.get('/:id', async (req, res) => {
  
    const {id} = req.params
    const allGamesById = await getVideogameById(id);
    
    id ? res.status(200).send(allGamesById) : res.status(404).send("Id not found")
   
})
  


module.exports = router;