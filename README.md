Cifrado Hill – Marcelo Medina

Nombre: Marcelo Medina

Grupo: 1-B

Materia: Fundamentos de Álgebra / Programación

Proyecto: Implementación del Cifrado Hill con Encriptado y Desencriptado

Descripción del Proyecto

Este proyecto implementa el Cifrado Hill 2×2, un método de criptografía basado en álgebra lineal que utiliza matrices para cifrar y descifrar mensajes.

El sistema permite al usuario:

Ingresar una matriz clave 2×2.

Encriptar mensajes usando multiplicación de matrices.

Desencriptar los mensajes usando la matriz inversa.

Visualizar información matemática como determinante e inverso modular.

El proyecto está desarrollado con HTML, CSS y JavaScript, y se puede ejecutar directamente desde un navegador web.

¿Cómo usar el programa?

Abre el archivo index.html o entra a la versión desplegada en GitHub Pages.

Ingresa la matriz clave 2×2 (preferentemente con números primos).

Escribe un mensaje en el cuadro de texto.

Presiona Encriptar para cifrar el mensaje.

Presiona Desencriptar para recuperar el mensaje original.

En la sección Detalles del Proceso puedes ver información matemática adicional.

Reglas del Sistema

Solo se usan letras del alfabeto inglés (A–Z).

Todos los acentos, espacios y signos se eliminan automáticamente.

El sistema trabaja con bloques de tamaño 2 (por la matriz 2×2).

Si el mensaje tiene una cantidad impar de letras, se agrega una X al final como relleno (padding).

El cálculo se realiza usando aritmética modular módulo 26.

Fundamento Matemático
Representación del texto

Cada letra se convierte a número usando este esquema:

Letra	Número
A	0
B	1
C	2
...	...
Z	25

El mensaje se agrupa en pares y se representa como vectores columna.

Ejemplo:

HOLA → [7, 14] y [11, 0]

Encriptado

Se aplica la fórmula:

𝐶
=
𝐾
⋅
𝑃
(
m
o
d
26
)
C=K⋅P(mod26)

Donde:

𝐾
K es la matriz clave.

𝑃
P es el vector del mensaje.

𝐶
C es el vector cifrado.

Desencriptado

Primero se calcula la matriz inversa:

𝐾
−
1
=
1
det
⁡
(
𝐾
)
⋅
𝑎
𝑑
𝑗
(
𝐾
)
(
m
o
d
26
)
K
−1
=
det(K)
1
	​

⋅adj(K)(mod26)

Luego:

𝑃
=
𝐾
−
1
⋅
𝐶
(
m
o
d
26
)
P=K
−1
⋅C(mod26)

Si el determinante no tiene inverso módulo 26, la matriz no es válida.

Uso de números primos

Se recomienda usar números primos en la matriz clave (como 2, 3, 5, 7, 11), ya que aumentan la probabilidad de que el determinante sea coprimo con 26, condición necesaria para que exista inversa modular.

Ejemplo de matriz válida con primos:

[ 3   3 ]
[ 2   5 ]

Sobre la letra X al final

Si el mensaje tiene número impar de letras, se agrega una X al final como relleno para completar el último bloque de 2 letras.

Ejemplo:

MENSAJE → MENSAJEX


Al desencriptar, esta X puede aparecer al final, aunque no forme parte del mensaje real.

Tecnologías usadas

HTML5

CSS3

JavaScript

GitHub Pages

Despliegue

Este proyecto puede ejecutarse localmente o desde GitHub Pages.

Ejemplo de enlace (reemplazar por el real):

https://usuario.github.io/repositorio-cifrado-hill

Control de versiones

Este repositorio contiene varios commits que representan:

Implementación del cifrado.

Corrección del desencriptado.

Mejoras visuales.

Actualización de la documentación.

Esto demuestra el desarrollo progresivo del proyecto.

Autor

Marcelo Medina
Grupo 1-B
Materia: Fundamentos de Álgebra / Programación