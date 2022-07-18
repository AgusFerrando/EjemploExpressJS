const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();


let listaItems = [
  item1= 'item1',
  item2= 'item2',
  item3= 'item3'
]

let pokeList = []


fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    .then(response => response.json())
    .then(res => {
      for (let i of res.results) {
        fetch(i.url)
          .then(x => x.json())
          .then(x => {
            pokeList.push({"name": x.name, "height":x.height, "image":x.sprites.front_default}); 
          })
        }                                          
      })

let funcionPrueba = () => {
  console.log('hola!!');
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { listaItems , pokeList, funcionPrueba });
});

router.get('/cards', function(req, res, next) {
  res.render('cards', { pokeList });
});


module.exports = router;
