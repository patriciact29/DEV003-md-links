const {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
  existeMd} = require('../functions.js');

const pathExistsEjm = 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\README.md'
const pathNoExists = 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\estaRutaNoExiste.md'
const pathRelative = 'README.md'

//Test si existe ruta
describe('pathExists', () => {
it('Nos dara TRUE si existe la ruta', () =>{
  expect(pathExists(pathExistsEjm)).toEqual(true);
});
});
//Test no existe ruta
describe('pathExists', () => {
it ('Nos dara FALSE si la ruta no existe', ()=>{
  expect(pathExists(pathNoExists)).toEqual(false);
});
});
//Test si es una ruta absoluta
describe('pathIsAbsolute', () => {
it ('Nos dara TRUE si la ruta es Absoluta', () =>{
  expect(pathIsAbsolute(pathExistsEjm)).toEqual(true);
});
});
//Test si no es una ruta absoluta
describe ('pathIsAbsolute', () => {
  it ('Nos dara FALSE si la ruta no es absoluta', () => {
    expect(pathIsAbsolute(pathRelative)).toEqual(false);
})
})

//Test para convertir la ruta en absoluta
describe('turnPathAbsolute', () => {
  it ('Nos dara la misma ruta si es absoluta', () =>{
    expect(turnPathAbsolute(pathExistsEjm)).toEqual(pathExistsEjm);
  });
  });
// Test si la ruta es relativa la convierte en absoluta
describe('turnPathAbsolute', () => {
  it ('Nos dara la ruta convertida en absoluta', () =>{
    expect(turnPathAbsolute(pathRelative)).toEqual(pathExistsEjm);
  });
  });
//test si existe .md
describe('existeMd', ()=>{
  it ('Nos dira si existe archivos .md', ()=>{
    expect (existeMd(pathExistsEjm)).toEqual(true);
  })

})
