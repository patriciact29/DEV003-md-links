const path = require('path');
const fs = require('fs');
const axios = require('axios');
const path1 = process.argv[2];

//C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/README.md >> absoluta
//README.md >> relativa
//C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/PRUEBA/READMEPRUEBA.md
//PRUEBA/READMEPRUEBA2.md

// VERIFICAR SI EL PATH EXISTE
const pathExists = (path1) => {
  return fs.existsSync(path1);
}

// VERIFICAR SI ES ABSOLUTA
const pathIsAbsolute = (path1) => {
  return path.isAbsolute(path1);
}


//CONVERTIMOS LA RUTA EN ABSOLUTA
const turnPathAbsolute = (path1) => {
  return path.resolve(path1);
}

//HAY ARCHIVOS DENTRO DEL DIRECTORIO?
const readDirectory = (path1) => {
  if (fs.readdirSync(path1).length > 0) {
    return true
  }
  return false
};

//ES ARCHIVO?
const isFile = (path1) => {
  const stats = fs.statSync(path1);
  return stats.isFile(path1)
};

//EXISTEN ARCHIVOS .MD
const existeMd = (path1) => {
  const extension = path.extname(path1)
  return extension === '.md'
}

//Leer todos los archivos dentro del directorio
function readAllFiles(path1, arrayOfFiles = []) {
  const readFiles = fs.readdirSync(path1) //
  readFiles.forEach((file) => {
    readFiles
    const elements = path1 + path.sep + file //
    const stats = fs.statSync(elements)
    if (stats.isDirectory()) {
      readAllFiles(elements, arrayOfFiles)
    } else {
      arrayOfFiles.push(elements)
    }
  }
  )
  return arrayOfFiles
}
//console.log(readAllFiles(path1, arrayOfFiles = []));

//Leer archivo y extraer links
const readFileAndExtractLinks = (path1) => new Promise((resolve, reject) => {
  fs.readFile(path1, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
      const matchedLinks = data.match(regex);
      //console.log((matchedLinks));
      const links = matchedLinks.map(link => {
        const linkParts = link.match(/\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/); // Se busca coincidencia y se crea un arreglo
        return ({
          text: linkParts[1],
          href: linkParts[2],
          file: path1
        });
      })
      resolve(links)
    }
  })
})

// readFileAndExtractLinks(path1)
// .then((links) => console.log(links)).catch((reject) => console.log(reject))

// STATUS DE LOS LINKS
const getLinkStatus = (urls) => Promise.all(urls.map((link) => axios.get(link.href)
  .then((respuesta) => {
    return {
      text: link.text,
      href: link.href,
      file: link.file,
      status: respuesta.status,
      message: 'ok'
    };
  })
  .catch((error) => { // error
    let errorStatus;
    if (error.response) {
      errorStatus = error.response.status;
    } else if (error.request) {
      errorStatus = 500;
    } else {
      errorStatus = 400;
    }
    return {
      text: link.text,
      href: link.href,
      file: link.file,
      status: errorStatus,
      message: 'fail'
    };
  }
  )));
// const probando = [
//   {
//     text: 'Tomando decisiones en tu código — condicionales - MDN',
//     href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals',
//     file: 'PRUEBA/READMEPRUEBA2.md'
//   },
// ];
// getLinkStatus(probando)
//   .then((probando) => {
//     console.log(probando);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// /*verificar si el path existe*/ console.log("¿Existe la ruta? ", path1,": " ,pathExists(path1));
// /*verificar si es absoluta*/  console.log(`¿La ruta ${path1} es absoluta? ${pathIsAbsolute(path1)}`);
// /*convertir la ruta en absoluto*/ console.log(`La ruta absoluta es ${path.resolve(path1)}`)
// /*Es archivo? */ console.log(`${path1} es un archivo?`, isFile(path1))
// /*Verificar si hay archivos.md */ console.log(`dentro de ${path1} contiene archivos.md? ${existeMd(path1)}`)
// /*leer el archivo*/ console.log(readFiles(path1));
// //Verificar si es un directorio
// console.log(`${path1} es un directorio?`, isDirectory(path1))
// //Verificar si el directorio contiene archivos true/false
// console.log(`El directorio ${path1} contiene archivos? ${readDirectory(path1)}`)



module.exports = {
  pathExists, pathIsAbsolute, turnPathAbsolute, isFile, readDirectory, existeMd, readFileAndExtractLinks, getLinkStatus, readAllFiles
  // ...
};
