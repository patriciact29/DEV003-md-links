#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const path = process.argv[2];
//posicion 0 es node instalado
//posicion 1 es la ruta de mi ubicacion actual
//posicion 2 es la ruta que yo ingreso
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');
const options = {validate, stats };


//FUNCION TOTAL
const total = (links) => {
  const totalLinks = links.length
  return `Total: ${totalLinks} `
}
//FUNCION UNIQUE
const unique = (links) => {
  const href = links.map(link => link.href)
  const uniqueLinks = new Set(href)
  return `Unique: ${uniqueLinks.size} `
}


//FUNCION BROKEN
const broken = (links) => {
  const messages = links.filter(link => link.message === 'fail');
  return `Broken: ${messages.length}`;
}


mdLinks(path, options)
  .then((resulLink) => {
    if (stats && validate) {
      console.log(total(resulLink));
      console.log(unique(resulLink));
      console.log(broken(resulLink));
    } else if (validate) {
      console.log(resulLink);
    } else if (stats) {
      console.log(total(resulLink));
      console.log(unique(resulLink));
    }else{
      console.log(resulLink)
    }
  })
  .catch((reject) => {
    console.log(reject)
  });

// const validate = process.argv[3] === 'true'; // si 'true' devuelve true, de lo contrario devuelve false
// const options = { validate };

  // mdLinks(path, {validate:true}).then((arrayLinks) => console.log(arrayLinks))
  // .catch((error) => console.error(error));
