const axios = require('axios');
const {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
  readDirectory,
  isFile,
  existeMd,
  readAllFiles,
  readFileAndExtractLinks,
  getLinkStatus } = require('../functions.js');
const { mdLinks } = require('../index.js');


//Mock axios
jest.mock('axios');

const pathExistsEjm = 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\README.md'
const pathNoExists = 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\estaRutaNoExiste.md'
const pathRelative = 'README.md'

//Test si existe ruta
describe('pathExists', () => {
  it('Nos dara TRUE si existe la ruta', () => {
    expect(pathExists(pathExistsEjm)).toEqual(true);
  });
  it('Nos dara FALSE si la ruta no existe', () => {
    expect(pathExists(pathNoExists)).toEqual(false);
  });
});

//Test si es una ruta absoluta
describe('pathIsAbsolute', () => {
  it('Nos dara TRUE si la ruta es Absoluta', () => {
    expect(pathIsAbsolute(pathExistsEjm)).toEqual(true);
  });
  it('Nos dara FALSE si la ruta no es absoluta', () => {
    expect(pathIsAbsolute(pathRelative)).toEqual(false);
  })
});

//Test para convertir la ruta en absoluta
describe('turnPathAbsolute', () => {
  it('Nos dara la misma ruta si es absoluta', () => {
    expect(turnPathAbsolute(pathExistsEjm)).toEqual(pathExistsEjm);
  });
});
// Test si la ruta es relativa la convierte en absoluta
describe('turnPathAbsolute', () => {
  it('Nos dara la ruta convertida en absoluta', () => {
    expect(turnPathAbsolute(pathRelative)).toEqual(pathExistsEjm);
  });
});

//test si hay archivos dentro de directorio
describe('readDirectory', () => {
  it('Nos dara TRUE si existen archivos', () => {
    expect(readDirectory('PRUEBA')).toEqual(true)
  })
  it('Nos dara FALSE si no existen archivos', () => {
    expect(readDirectory('PRUEBA//SINARCHIVOS')).toEqual(false)
  })
})

//Test si es archivo
describe('isFile', () => {
  it('Nos dara TRUE si es un archivo', () => {
    expect(isFile(pathExistsEjm)).toEqual(true)
  })
  it('Nos dara FALSE si no es un archivo', () => {
    expect(isFile('PRUEBA')).toEqual(false)
  })
})

//test si existe .md
describe('existeMd', () => {
  it('Nos dara TRUE si existe archivos .md', () => {
    expect(existeMd(pathExistsEjm)).toEqual(true);
  })
  it('Nos dara FALSE si no existe archivos .md', () => {
    expect(existeMd('Prueba-text.txt')).toEqual(false);
  })
})

//test para leer archivos dentro del directorio
describe('readAllFiles', () => {
  it('Nos dara todos los archivos dentro del directorio', () => {
    expect(readAllFiles('PRUEBA')).toEqual(
      [
        'PRUEBA\\CONARCHIVOS\\prueba-sinLinks.md',
        'PRUEBA\\CONARCHIVOS\\Prueba.md',
        'PRUEBA\\Prueba-text.txt',
        'PRUEBA\\READMEPRUEBA.md',
        'PRUEBA\\READMEPRUEBA2.md'
      ])
  })
})
test('Debe retornar los links', () => {
  return readFileAndExtractLinks('PRUEBA/CONARCHIVOS/Prueba.md').then(data => {
    expect(data).toEqual(
      [
        {
          text: 'pag Google',
          href: 'https://www.google.com/',
          file: 'PRUEBA/CONARCHIVOS/Prueba.md'
        },
      ]);
  });
});

// test('Debe salir Error al tener un archivo vacio', () => {
//   return expect(readFileAndExtractLinks('PRUEBA/CONARCHIVOS/prueba-sinLinks.md')).rejects.toBe("[Error: No se encontraron links en el archivo]");
// });

//Test para el status
describe('getLinkStatus',()=>{
  test('Deberia dar el status del link valido', () => {
    const urls = [{
      text: 'pag Google',
      href: 'https://www.google.com/',
      file: 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\PRUEBA\\CONARCHIVOS\\Prueba.md'
    }];
    const resp = {status: 200, message: 'ok'};
    axios.get.mockResolvedValueOnce(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))
    return getLinkStatus(urls)
    .then(resp => expect(resp).toEqual(
      [{
        text: 'pag Google',
        href: 'https://www.google.com/',
        file: 'C:\\Users\\Patricia\\Documents\\LABORATORIA\\DEV003-md-links\\PRUEBA\\CONARCHIVOS\\Prueba.md',
        status: 200,
        message: 'ok'
      }]
    ));
  });
  it('Deberia dar el status del link invalido', () => {
    axios.get.mockClear();
    const urls = [{
      text: 'ESTO ES PRUEBA',
      href: 'https://prueba.noexiste.com',
      file: 'C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/PRUEBA/READMEPRUEBA2.md'
    }];
    const resp = {status: 400, message: 'fail'};
    axios.get.mockImplementationOnce(() => Promise.reject(resp))
    return getLinkStatus(urls)
    .then(resp => expect(resp).toEqual(
      [{
        text: 'ESTO ES PRUEBA',
        href: 'https://prueba.noexiste.com',
        file: 'C:/Users/Patricia/Documents/LABORATORIA/DEV003-md-links/PRUEBA/READMEPRUEBA2.md',
        status: 400,
        message: 'fail'
      }]
    ));
  });
  it('Deberia dar el status del link invalido', () => {
    const urls = [{
      text: 'PRUEBA2',
      href: 'https://www.example.com/mypage?loggedin=false',
      file: 'PRUEBA/READMEPRUEBA2.md'
    }];
    const resp = {status: 400, message: 'fail'};
    axios.get.mockClear();
    axios.get.mockImplementation(() => Promise.reject(resp))
    return getLinkStatus(urls)
    .catch(resp => expect(resp).toEqual(
      [{
        text: 'PRUEBA2',
        href: 'https://www.example.com/mypage?loggedin=false',
        file: 'PRUEBA/READMEPRUEBA2.md',
        status: 400,
        message: 'fail'
      }]
    ));
  });

})
