# Laberinto (Aplicación 3D)

## Planteamiento del problema 

Implementar una aplicación web 3D.


{{< details "Laberintos de Conexión Simple" open >}}
Este tipo de laberinto cuenta con una única solución, es decir, solo existe una forma de llegar a la salida 
a partir de un punto de entrada determinado, los caminos errados acaban en pasillos sin salida.
{{< /details >}}

{{< details "Algoritmo de construcción de Prim" open >}}
Existen varias formas de abordar el problema de construir un laberinto de conexión simple, uno de ellos es el 
Algoritmo de construcción de Prim. Grosso modo, este consiste en etiquetar las celdas que pertenecen al 
laberinto y las que no, permitiendo generar conexiones aleatorias entre una región perteneciente al laberinto 
y una que hasta el momento esté aislada pero sea adyacente al mismo.
{{< /details >}}

{{< hint info >}}
**Instrucciones de Uso**  
→: Rota la cámara hacia la derecha.
←: Rota la cámara hacia la izquierda.
↑: Avanza en la dirección de tu punto de vista.
↓: Retrocede respecto a tu punto de vista.
{{< /hint >}}

{{< hint info >}}
**Inspiración:**
* «Si no tienes cuidado y te sales de la realidad en las áreas equivocadas, 
terminarás en los Backrooms, donde no hay más que el hedor de la alfombra 
húmeda, la locura del mono amarillo y el interminable ruido de fondo de las 
luces fluorescentes al máximo zumbido, y aproximadamente seiscientos 
millones de millas de habitaciones vacías segmentadas al azar en las que 
puedes quedar atrapado. Dios te salva si escuchas a algo deambulando 
cerca, porque seguro que te ha escuchado...« *
{{< /hint >}}

{{< p5-iframe sketch="/visualcomputing/content/sketches/Labyrinth/sketch.js" width="620" height="620" >}}

{{< details "References" open >}}
  https://www.uaeh.edu.mx/scige/boletin/huejutla/n1/a4.html
{{< /details >}}
