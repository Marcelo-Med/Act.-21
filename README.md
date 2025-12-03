# Cifrado Hill – Marcelo Medina

## Información Personal
- Nombre: Marcelo Medina
- Grupo: 1-B
- Materia: Fundamentos de Álgebra / Programación
- Proyecto: Implementación del Cifrado Hill con Encriptado y Desencriptado

---

## Descripción del Proyecto

Este proyecto implementa el Cifrado Hill 2×2, un método de criptografía basado en álgebra lineal que utiliza matrices para cifrar y descifrar mensajes.
Está desarrollado con HTML, CSS y JavaScript y se ejecuta directamente desde el navegador.

Permite:
- Ingresar una matriz clave.
- Encriptar texto.
- Desencriptar mensajes.
- Mostrar determinante e inverso de la matriz.
- Validar automáticamente si la clave es correcta.

---

## Cómo usar el programa

1. Abrir el archivo index.html.
2. Escribir una matriz clave 2×2.
3. Escribir un mensaje (solo letras A-Z).
4. Presionar el botón Encriptar.
5. Presionar Desencriptar para recuperar el mensaje.

---

## Reglas del sistema

- Se utilizan únicamente letras A–Z.
- El sistema trabaja módulo 26.
- Los textos se convierten automáticamente a mayúsculas.
- Los símbolos y acentos son ignorados.
- El sistema cifra el mensaje en bloques de 2 letras.
- Si el número de letras es impar, se agrega una X.

---

## Fundamento Matemático

### Representación de las letras

A = 0, B = 1, C = 2, …, Z = 25

Ejemplo:

HOLA → [7, 14] y [11, 0]

---

### Encriptación

C = K · P mod 26

Donde:
- K es la matriz clave.
- P es el vector del mensaje.
- C es el mensaje cifrado.

---

### Desencriptación

P = K⁻¹ · C mod 26

Para que exista inversa, el determinante debe cumplir:

gcd(det(K), 26) = 1

---

## Uso de números primos

Se recomienda usar números primos en la matriz clave para que el determinante sea coprimo con 26.

Ejemplo de matriz:

[ 3  3 ]
[ 2  5 ]

---

## Uso de la letra X

Cuando un mensaje tiene número impar de letras, se agrega una X para completar el bloque.
Al desencriptar, esta X puede aparecer, pero no forma parte del mensaje original.

---

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript

---

## Estructura del proyecto

index.html
script.js
style.css
README.md

---

## Control de Versiones

El proyecto contiene varios commits que muestran el progreso del trabajo:
- creación de estructura
- implementación del cifrado
- corrección del desencriptado
- mejoras visuales
- documentación

---

## Autor

Marcelo Medina
Grupo 1-B
Materia: Fundamentos de Álgebra / Programación