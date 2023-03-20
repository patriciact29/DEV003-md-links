const {pathExists, turnPathAbsolute, existeMd, } = require('./functions.js');
const path = process.argv[2];

const mdLinks = (path, options) =>  new Promise((resolve, reject) => {
    //identificamos si la ruta existe.
    if(!pathExists(path)){
      reject(new Error('la ruta no existe'));
    }
  // saber si es absoluta.
   if(!existeMd(turnPathAbsolute(path))){
        reject(new Error('la ruta no es .md'));
        return
       }
  readFileAndExtractLinks(turnPathAbsolute(path)).then((arrayLinks)=>{
    if (arrayLinks.length === 0){
      reject(new Error('Ruta no tiene links'));
      return;
    }
    if(options === {validate: false}){
      resolve(arrayLinks);
      return
    }
//validar links

  });
  });
  // mdLinks(path, {validate:true}).then((arrayLinks) => console.log(arrayLinks))
  // .catch((error) => console.error(error));


  // console.log(`Existe la ruta? ${pathExists(path)}`);
  // console.log(`¿La ruta ${path} es absoluta? ${pathIsAbsolute(path)}`);
  // console.log(`¿La ruta ${path} es absoluta? ${(turnPathAbsolute(path))}`);
  // console.log(`¿contiene archivos .md? ${existeMd(path)}`);
  // console.log(readFileAndExtractLinks(path));
//console.log(mdLinks(path))

  module.exports = {
  mdLinks
  // ...
};
