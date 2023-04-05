# md-Links-Patricia
Es una libreria en JavaScrip que nos permitira leer los archivos `Markdown` para poder verificar el status de los links que contenga.
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Se implemento md-Links-Patricia la cual lee y analiza archivos en formato  `Markdown` ya que normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Instalaciòn
```js
npm install md-Links-patricia
```

## 3. Comando CLI (Interfaz de Línea de Comando)

Ejecuta en la terminal siguiento la siguiente estructura:
```js
md-links <path> --validate
```
Indica lo siguiente:
* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.


```js
md-links <path> --stats
```
Indica lo siguiente:
[Total]: Numero total de links
[Unique]: Numero total links unicos

```js
md-links <path> --stats --validate
```
Indica lo siguiente:
[Total]: Numero total de links.
[Unique]: Numero total links unicos.
[Broken]: Numero total de links rots.


## Diagrama de flujo
