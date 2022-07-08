const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {apikey} = process.env;
const {Platforms} = require('../db')

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/platforms?key=' + apikey)

        const allplatforms = response.data.results.map(el => el.name)

        allplatforms.forEach(p => {
            Platforms.findOrCreate({
                where : {name: p}
            })
        })
        
        const platforms = await Platforms.findAll()
        res.status(200).send(platforms)

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;