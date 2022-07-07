const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const rutaGenre = require('./genres');
const rutaVideoGames = require('./videogames')
const rutaVideoGame = require('./create')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', rutaGenre)
router.use('/videogames', rutaVideoGames)
router.use('/create', rutaVideoGame)
  
module.exports = router;