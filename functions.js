const path = require('path');
const fs = require('fs');
const axios = require('axios');
//const { rejects } = require('assert');
const path1 = process.argv[2];
//C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/README.md >> absoluta
//README.md >> relativa
//C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/PRUEBA/READMEPRUEBA.md
//PRUEBA/READMEPRUEBA.md

// verificar si el path existe
const pathExists = (path1) => {
  return fs.existsSync(path1);
}

// verificar si es absoluta
const pathIsAbsolute = (path1) => {
  return path.isAbsolute(path1);
}


//convertir la ruta en absoluto
const turnPathAbsolute = (path1) => {
  return path.resolve(path1);
}

//Es archivo o directorio
//Es directorio?
// const isDirectory = (path1) => {
//   const stats = fs.statSync(path1)
//   return stats.isDirectory(path1)
// }

//hay archivos dentro del directorio?
const readDirectory = (path1) => {
  if (fs.readdirSync(path1).length>0){
    return true
  } else {
    return false
  }
}

//Es archivo?
const isFile = (path1) => {
  const stats = fs.statSync(path1);
  return stats.isFile(path1)
};

//Existen archivos .md
const existeMd = (path1) => {
 const extension = path.extname(path1)
  return extension === '.md'
}
// //Leer el archivo
// const readFiles = (path1) => new Promise((resolve, reject) => {
//   fs.readFile(path1, 'utf-8', (error, data) =>{
//     if(error){
//       reject(new Error('Error'));
//     }else
//     resolve(data)
//   })
// })

// // extraer los links de .md
// const getLinks = (path1, data) => {
//   const links = data.match(/\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g).map((link) => {
//     const linkParts = link.match(/\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/);
//     if(!links){
//       console.log('no existen links');
//     }else{
//       console.log(links);
//       // for (let i = 0; i < links.length; i++) {
//       //   text: linkParts[1]
//       //   href: linkParts[2],
//       //   file: path1 /
//       // }
//     }
//       });
// }
//leer y extraer links
const readFileAndExtractLinks = (path1) => {
fs.readFile(path1, 'utf-8', (error, data) =>{
  if(error){
    console.error('error');
  }
  const links = data.match(/\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g).map((link) => {// Se busca coincidencia y se crea un arreglo
  const linkParts = link.match(/\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/);
    return {
      text: linkParts[1],
      href: linkParts[2],
      file: path1
      };
    });
    //return links
    console.log("Existen los siguientes links", links );
});
}

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
  //console.log(respuesta);
  .catch((error) => { // error
    let errorStatus;
    if (error.respuesta) {
      // La respuesta fue hecha y el servidor respondió con un código de estado
      errorStatus = error.respuesta.status;
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorStatus = 500;
    }
    // console.log('errorStatus', errorStatus);
    return {
      text: link.text,
      href: link.href,
      file: link.file,
      status: respuesta.status,
      message: 'fail'
    };
  })));
// const probando = [
//   {
//     href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
//     text: 'description',
//     file: 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
//   },
// ];

// // verificar si el path existe
// console.log("¿Existe la ruta? ", path1,": " ,pathExists(path1));
// // verificar si es absoluta
// console.log(`¿La ruta ${path1} es absoluta? ${pathIsAbsolute(path1)}`);
// //convertir la ruta en absoluto
// console.log(`La ruta absoluta es ${path.resolve(path1)}`)
// //Verificar si es un directorio
// //console.log(`${path1} es un directorio?`, isDirectory(path1))
// //Verificar si el directorio contiene archivos true/false
// //console.log(`El directorio ${path1} contiene archivos? ${readDirectory(path1)}`)
// //Es archivo
// console.log(`${path1} es un archivo?`, isFile(path1))
// //Verificar si hay archivos.md
// console.log(`dentro de ${path1} contiene archivos.md? ${existeMd(path1)}`)
// //leer el archivo
// //console.log(readFiles(path1));
// //Extraemos los links del archivo.md
console.log( readFileAndExtractLinks(path1));
// const probandolinks = readFileAndExtractLinks(path1);
// console.log(typeof probandolinks);
// getLinkStatus(probandolinks)
//   .then((links) => {
//     console.log(links);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = {
  pathExists, pathIsAbsolute, readFileAndExtractLinks, turnPathAbsolute, existeMd,isFile, getLinkStatus
  // ...
};
