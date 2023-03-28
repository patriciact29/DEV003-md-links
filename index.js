const {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
  isFile,
  readDirectory,
  readFileAndExtractLinks,
  existeMd,
  getLinkStatus,
  readAllFiles,
} = require('./functions');
const path = process.argv[2];

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  //identificamos si la ruta existe.
  if (!pathExists(path)) {
    reject(new Error('La ruta no existe'));
  } if (!pathIsAbsolute(path)) {
    pathAbsolute = turnPathAbsolute(path)
    //console.log(pathAbsolute);
  } if (!isFile(path)) {
    //entonces es directorio
    elementsDirectory = readDirectory(path) // leemos el directorio
    if (elementsDirectory === false) {
      reject(new Error('No hay archivos dentro del directorio'))
    } else {
      const ArrayDirectory = readAllFiles(path, arrayOfFiles = [])
      const allArrayMd = readAllFiles(path, arrayOfFiles = [])
      const allPromises = [];
      allArrayMd.forEach(element => {
        allPromises.push(mdLinks(element))
      });
      Promise.allSettled(allPromises)
        .then((result) => {
          let allLinks = [];
          result.forEach(element => {
            allLinks = allLinks.concat(element.value)
          });
          resolve(allLinks)
        })
    };

  } else {
    if (!existeMd(pathAbsolute)) {
      reject(new Error('la ruta no es .md'));
      return
    }
    readFileAndExtractLinks(pathAbsolute)
      .then((arrayLinks) => {
        if (arrayLinks.length === 0) {
          reject(new Error('Ruta no tiene links'));
          return;
        }
        if (options && options.validate === false) {
          resolve(arrayLinks);

        } else {
          getLinkStatus(arrayLinks)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
      .catch((error) => {
        reject(error);
      });
  }

});
// mdLinks(path)
// .then((resolve) => console.log('los links son los siguientes:', resolve))
// .catch((error)=>console.log(error))



// console.log(`Existe la ruta? ${pathExists(path)}`);
// console.log(`¿La ruta ${path} es absoluta? ${pathIsAbsolute(path)}`);
// console.log(`¿La ruta ${path} es absoluta? ${(turnPathAbsolute(path))}`);
// console.log(`¿contiene archivos .md? ${existeMd(path)}`);
// console.log(readFileAndExtractLinks(path));
//console.log(mdLinks(path))

module.exports = {
  mdLinks
};
