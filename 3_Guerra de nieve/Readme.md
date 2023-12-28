## Ejercicio 1 - Uso de clases de JS - Guerra de nieve

### Enunciado

- Crear una clase que represente a un jugador de guerra de nieve. El jugador debe tener un nombre, cantidad de vidas, cantidad de daño por bola de nieve y un método para lanzar una bola de nieve.

- Crear dos clases que se extiendan de la clase jugador: `Guerrero` y `Mago`. El guerrero debe tener 3 vidas y 1 de daño por bola de nieve. El mago debe tener 2 vidas y 2 de dañor de bola de nieve.

- Crear una clase que represente a un equipo de guerra de nieve. El equipo debe tener la lista de jugadores, un método para agregar jugadores y un método para determinar si el equipo perdió (si todos los jugadores tienen 0 vidas).

- BONUS: Crear una clase que represente a una guerra de nieve. La guerra debe tener dos equipos y un método para simular la guerra. Para simular la guerra, cada equipo tendrá un turno para lanzar bolas de nieve. En cada turno, cada jugador del equipo lanzará una bola de nieve a un jugador del otro equipo. La selección de los jugadores deberá de ser aleatoria, por tanto deberá de exisitir un método que seleccione a un jugador que ataque y a otro jugador que reciba el ataque. El jugador que reciba la bola de nieve perderá la vida correspondiente al dañor del personaj. Recordar que no puede realizar ni recibir un ataque cuyo jugador tenga vida 0 o inferior. La guerra termina cuando un equipo pierde.

Ejemplo de guerra de nieve:

``` js
const equipo1 = new Equipo();
const equipo2 = new Equipo();

equipo1.agregarJugador(new Guerrero('Goku'));
equipo1.agregarJugador(new Mago('Gandalf'));

equipo2.agregarJugador(new Guerrero('Superman'));
equipo2.agregarJugador(new Mago('Harry Potter'));

const guerra = new Guerra(equipo1, equipo2);
guerra.simular();
```


- BONUS: Utilizar un setInterval para simular la guerra. En cada intervalo de tiempo, cada equipo lanzará una bola de nieve. El intervalo de tiempo deberá ser aleatorio entre 1 y 3 segundos. Cuando un equipo pierda, deberá de detenerse el intervalo de tiempo.

- BONUS: Utilizar la librería [Chart.js](https://www.chartjs.org/) para mostrar una gráfica de barras con la cantidad de vidas de cada jugador por quipo.
