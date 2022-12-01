# Shaders

## Modelos de Iluminación 

### Objetivo:
Crear una escena que cuente con distintos tipos de modelos de iluminación e incorpore atenuación de las fuentes de luz.


####Modelos de Iluminación" open 
Una forma de simular el comportamiento de la luz, estos son utilizados para dar más realismo a las escenas o generar interesantes materiales. Los modelos trabajados en este ejercicio son: 

- **Luz ambiental:** Simula la cantidad de luz presente en la escena, esta no está asociada a una fuente de luz en particular.
- **Luz difusa:** Simula materiales con pocos reflejos, las formas y estructuras son poco acentuadas.
- **Luz especular:** Materiales altamente reflectantes donde la forma del objeto cobra más importancia respecto a la interacción con la fuente de luz.

Para más información consulte la referencia número 1.


####Curvas de Atenuación.
El factor de atenuación determina la caida de la intensidad de luz que llega a un objeto respecto a su distancia con la fuente de luz, este se suele calcular por medio del inverso multiplicativo de una función cuadrática.
{{< katex [display] [class="text-center"]  >}}
f(d) = \dfrac{1}{a \cdot d^2 + b \cdot d + c} 
{{< /katex >}}

Este factor multiplicará la luz especular o difusa calculada en los shaders.

Para más información, consulte la fuente 2.

{{< hint info >}}
**Instrucciones de Uso:**
A continuación se describe la función de cada uno de los elementos dispuestos para modificar la iluminación de la escena, se hablará de estos de izquierda a derecha del sketch.

- Modificar la cantidad de luz ambiental de la escena.
- Seleccionar el color de la luz ambiental.
- Determinar el factor cuadrático (a) en la atenuación.
- Determinar el factor linear (b) en la atenuación.
- Determinar el factor constante (c) en la atenuación.
- Seleccionar el color del cubo que contiene a la esfera.
- Seleccionar rl color de la esfera.

{{< /hint >}}

{{< hint info >}}
**Descripción de la escena:** El elemento central es un sólido compuésto por un cubo que es atravesado por una esfera, dichos objetos son concéntricos. Dicho sólido se encuentra en una caja formada por seis planos. 
Este ejercicio también utilizó conceptos de mezcla de colores, ya que la luz ambiental se combina con los colores base de los diversos materiales de las paredes, que se generan de forma aleatoria, y los de la figura. Tanto el cubo como la mitad de las paredes están formados por un material especular, el resto de los elementos son iluminados de forma difusa.
La fuente de luz es una pequeña esfera que se mueve dentro de la caja describiendo un helicoide.
Es importante tener en cuenta que para que la fuente de luz tuviera efecto en todas las paredes, estas tuvieron que ser acomodadas de modo que sus normales apunten hacia el punto central de la escena. si dicho vector se orienta en sentido contrario, no será iluminado, por tanto, no basta con que la rotación sea naturalmente simétrica en un plano si esta se hace a 180° sobre un eje dado.
{{< /hint >}}

{{< p5-iframe sketch="/visualcomputing/sketches/Shaders/Light/sketch.js" lib1= "/visualcomputing/sketches/Shaders/Light/libraries/p5.treegl.js" width="600" height="425" >}}

{{< details "References" open >}}

  1. https://visualcomputing.github.io/docs/shaders/lighting/
  2. https://learn.microsoft.com/es-es/windows/uwp/graphics-concepts/attenuation-and-spotlight-factor
  3. https://registry.khronos.org/OpenGL-Refpages/gl4/

{{< /details >}}
