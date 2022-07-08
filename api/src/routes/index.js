const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreRoute = require('./genres');
const videogamesRoute = require('./videogames')
const createVGroute = require('./create')
const platformsRoute = require('./platforms')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRoute)
router.use('/create', createVGroute)
router.use('/platforms', platformsRoute)
router.use('/genres', genreRoute)
  
module.exports = router;