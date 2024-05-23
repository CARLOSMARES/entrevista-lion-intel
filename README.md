# entrevista-lion-intel

Ejercicio de Entrevista Tecnica para la empresa Lion Intel

## Explicacion

### 1. INTRODUCCIÓN

De antemano Muchas Gracias por el Interés, te compartimos que el proyecto está
diseñado para demostrar tus habilidades e ingenio en programación.
La sección del ejercicio práctico o proyecto se evaluará dependiendo la profundidad
de la solución obtenida, es determinante que los entregables cuenten con una
calidad que sorprenda al comité de evaluación.

### 2. DESCRIPCIÓN BREVE DEL PROYECTO

Se debe realizar una aplicación para administrar salas de juntas, la aplicación
debe de cumplir los siguientes puntos:

#### 1. Creación de CRUD para sala de juntas

#### 2. Se debe de reservar una sala de juntas con un rango de horario inicial y fina

#### 3. No puede reservar sala de juntas que estén ocupada

#### 4. No puede reservar sala de juntas por más de 2 hora

#### 5. Se debe de liberar la sala de juntas al vencer horario de reserva

#### 6. Se puede liberar la sala de juntas de manera manual antes de finalizar

### 3. TECNOLOGIAS A UTILIZAR

Se deben realizar microservicios en tecnologías orientadas al caso, el uso de
algún framework queda a consideración del evaluado, ejemplo:

Node.js / Express / Angular

### 4. OBSERVACIONES

Front opcional en Vue.js
En caso de usar Node.js / Express / Angular incluir base de datos a tu entregable

### 5. CONSIDERACIONES

Se tomará en cuenta historial de cambios en el repositorio, estructura del proyecto,
comentarios en el código, creación de casos de prueba y todo lo que el aspirante
considere agregar al entregable. Se tomará en cuenta el paradigma de desarrollo
(POO).

## Como correr el Servidor

### Pasos

1. cd server
2. Ejecutar migrations.sh o migrations.bat
3. npm run dev o npmrun build para produccion

Al ejecutat migrations.sh migrations.bat, creara la base de datos y al ejecutar npm run dev ingresango a la url <http://localhost:3000/setup> y creara el usuario <admin@admin.com> y contraseña adminadmin

## Correr el cliente

### Pasos

1. cd client
2. ng serve

y al ejecutar el cliente ingresando a la url <http://localhost:4200/> podra ingresar con el usuario anterior mente mencionado y podra ingresar 2 tipos de usuarios recepcionista y cliente

### Roles

Recepcionista: Confirmar y entregar sala de juntas

Cliente: Resrvar sala
