## Ejercicio 1

### Enunciado

- Crear una gráfica de barras que muestre las estadísticas de un pokemon. Las estadísticas a mostrar son: HP, Attack, Defense, Sp. Atk, Sp. Def, Speed. Para ello tendremos que utilizar la librería [Chart.js](https://www.chartjs.org/) y los datos que nos proporciona la API de [PokeAPI](https://pokeapi.co/).

Ejemplo de llamada a la API para obtener los datos de un pokemon:

```js
fetch('https://pokeapi.co/api/v2/pokemon/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

- Generar un input de búsqueda que nos permita buscar un pokemon por su número. Al hacer click en el botón de buscar, se deberá mostrar la información del pokemon en la gráfica de barras.

- También se deberá mostrar la imagen del pokemon y su nombre.

- Si el pokemon no existe, se deberá mostrar un mensaje de error.

- Generar un botón que nos permita obtener un pokemon aleatorio. Al hacer click en el botón, se deberá mostrar la información del pokemon en la gráfica de barras y la imagen del pokemon con su nombre.