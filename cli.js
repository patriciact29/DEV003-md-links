const { mdLinks}  = require('./index.js');
//posicion 0 es node instalado
//posicion 1 es la ruta de mi ubicacion actual
//posicion 2 es la ruta que yo ingreso
const path = process.argv[2];
mdLinks(path)
.then((resolve)=>{
  console.log(resolve)
})
.catch((reject)=>{
  console.log(reject)
});
