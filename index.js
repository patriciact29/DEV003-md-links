const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //identificamos si la ruta existe.
    if(fs.existsSync(path)){
      resolve("La ruta existe");
  // saber si es absoluta.
      const pathAbsolute = (path) => {
      if(fs.isAbsolute(path)){
     resolve("LA RUTA ES ABSOLUTA")
       }
      };
  // const pathAbsolute = (path) => {
  //     return fs.isAbsolute(path);
  //     }
  //     console.log(pathAbsolute);
//saber si es archivo o directorio
    }else{
      //si no existe ruta se rechaza la promesa.
      reject("La ruta no existe");
    }
  });

};
module.exports = {
  mdLinks
  // ...
};
