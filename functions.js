const path = require('path');
const fs = require('fs');
const { isAbsolute } = require('path');
const path1 = process.argv[2];
//C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/README.md >> absoluta
//README.md >> relativa


// verificar si el path exite
const pathExists = (path1) => {
  return fs.existsSync(path1);
}
console.log("¿Existe la ruta? ", path1,": " ,pathExists(path1));

// verificar si es absoluta
const pathIsAbsolute = (path1) => {
  return path.isAbsolute(path1);
}
console.log("¿Es absoluta?", path1, ": ", pathIsAbsolute(path1));

//convertir la ruta en absoluto
const turnPathAbsolute = (path1) => {
  return path.resolve(path1);
}
console.log("la ruta absoluta es:", turnPathAbsolute(path1))

//Es archivo o directorio
//Empezamos sabiendo si es directorio
const isDirectory = (path1) => {
  const stats = fs.statSync(path1)
  return stats.isDirectory(path1)
}
console.log(path1,"es un directorio?", isDirectory(path1))

//existen archivos dentro del directorio?
// const readDirectory =(path1) => {
//   return fs.readdir(path1)
// }
// console.log( readDirectory(path1));







module.exports = {
  pathExists
  // ...
};
