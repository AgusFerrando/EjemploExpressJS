const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

/* Pasar variables por ejs significa tener la seguridad de que nadie puede
  cambiar el valor de dichas variables, por lo que da un extra de seguridad
  a nuestro sitio web
*/

//Un array con datos JSON en su interior
let datos = [
  {
    id: 1,
    nombre: "Andrea",
    lugar: "Logroño",
    cursos: ["JavaScript", "HTML5", "CSS3", "Java", "C"]
  },

  {
    id: 2,
    nombre: "Pablo",
    lugar: "Barcelona",
    cursos: ["JavaScript", "Python", "MySQL", "PHP"]
  },

  {
    id: 3,
    nombre: "Laura",
    lugar: "Tudela",
    cursos: ["Python", "C++", "PHP", "Linux", "MongoDB"]
  }
]

const division = (a,b)=>{
  
  if (b == 0){
    return "Error. No se puede dividir por 0";
  }else{
    return a / b;
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mis variables ejs', pregunta: '¿te gustaría aprender a programar variables en ejs?', saludo: 'Hola Programador ', personas:datos, division});
});


// Creo un array vacio para luego llenarlo con los elementos de la Api Pokemones y asi obtendremos atributos como nombre, altura, imagen, etc para trabajar con ello

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


router.get('/cards', function(req, res, next) {
  res.render('cards', { pokeList });
});


module.exports = router;







