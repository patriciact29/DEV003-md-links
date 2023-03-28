
const { mdLinks } = require('../index');
jest.mock('axios');

describe('mdLinks', () => {

  // it('should...', () => {
  //   console.log('FIX ME!');
  // });
  // it('devuelve una promesa'() => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // //});
  it('Debe rechazar la promesa cuando la ruta no existe', () => {
    return mdLinks('/estaRutaNoExiste.md', '--validate').catch((error) => {
      expect(error.message).toBe('La ruta no existe');
    })
  });

  it('Debe rechazar la promesa si no hay archivos dentro del directorio', () => {
    return mdLinks('PRUEBA/SINARCHIVOS').catch((error) => {
      expect(error.message).toBe('No hay archivos dentro del directorio');
    })
  });

  it('Debe retornar los links', () => {
    return mdLinks('PRUEBA/CONARCHIVOS/Prueba.md').then(resp => {
      expect(resp).toEqual(
        [{
          text: 'pag Google',
          href: 'https://www.google.com/',
          file: 'PRUEBA/CONARCHIVOS/Prueba.md',
          status: 200,
          message: 'ok'
        },
        ]);
    });
  });

  it('Debe rechazar la promesa si no existe archivo .md', () => {
    return mdLinks('PRUEBA/Prueba-text.txt').catch((error) => {
      expect(error.message).toBe('la ruta no es .md');
    })
  });

  // it('Debe rechazar la promesa si el archivo no tiene links', () => {
  //   jest.setTimeout(70000);
  //   return mdLinks('PRUEBA/CONARCHIVOS/prueba-sinLinks.md').catch((error) => {
  //     expect(error.message).toBe('Ruta no tiene links');
  //   });
  // });
});
