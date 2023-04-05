# md-Links-Patricia
Es una libreria en JavaScrip que nos permitira leer los archivos `Markdown` para poder verificar el status de los links que contenga.
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Instalaciòn](#2-instalaciòn)
* [3. Comando CLI (Interfaz de Línea de Comando)](#3-comando-CLI)
* [4. Diagrama de flujo](#4-Diagrama-deflujo)

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

* [Total]: Numero total de links
* [Unique]: Numero total links unicos

```js
md-links <path> --stats --validate
```
Indica lo siguiente:

* [Total]: Numero total de links.
* [Unique]: Numero total links unicos.
* [Broken]: Numero total de links rots.


## 4. Diagrama de flujo
![Diagrama_de_flujo](https://user-images.githubusercontent.com/118831504/230196321-ff0cf0fe-695e-43e4-9abe-276e6b704e4e.jpg)

Creado por:

*Patricia Cornelio T.*

[<img src='https://user-images.githubusercontent.com/118831504/229262127-d261522b-bb71-4a95-bb74-f8ef50570fb8.png' alt='linkedin' height='30'>](https://www.linkedin.com/in/patriciact29//)

[<img src='https://user-images.githubusercontent.com/118831504/229262989-79b14efa-1980-4325-a311-9cdf22bb5025.png' alt='gmail' height='30'>](mailto:patricia.ct29@gmail.com)
