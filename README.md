# backend

## Requisitos
1. node-v6.11.3 lts.
2. mongodb sin contraseña.

## Instalación
Para realizar la instalacion se debe hacer:

1. git clone https://github.com/juliotorresmoreno/backend.git
2. cd backend
3. yarn install o npm install

## Como usar
ejecutar: 
1. cd backend
2. yarn start o npm start

## Integraciones
Para usar las consultas fuera del entorno graphiql provisto puedes usar la url http://localhost:3000/grqphql para hacer las consultas.

![alt text](https://raw.githubusercontent.com/juliotorresmoreno/backend/master/captura.png)

Para acceder a la api se debe ingresar a http://localhost:3000 en el navegador.

## Consultas

### Estudiantes
1. Consultas
todos los campos de salida son string.
```
{
  studentsQuery {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

2. Creación
todos los campos de entrada y salida son string.
```
mutation {
  studentsCreate(_id: "", identificacion: "", nombres: "", apellidos: "", genero: "") {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

3. Actualización
todos los campos de entrada y salida son string.
```
mutation {
  studentsUpdate(_id: "", identificacion: "", nombres: "", apellidos: "", genero: "") {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

4. Eliminación
todos los campos de entrada y salida son string.
```
mutation {
  studentsRemove(_id: "") {
    status
  }
}
```

### Docentes
1. Consultas
todos los campos de salida son string.
```
{
  teachersQuery {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

2. Creación
todos los campos de entrada y salida son string.
```
mutation {
  teachersCreate(_id: "", identificacion: "", nombres: "", apellidos: "", genero: "") {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

3. Actualización
todos los campos de entrada y salida son string.
```
mutation {
  teachersUpdate(_id: "", identificacion: "", nombres: "", apellidos: "", genero: "") {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

4. Eliminación
todos los campos de entrada y salida son string.
```
mutation {
  teachersRemove(_id: "") {
    status
  }
}
```

### Cursos
1. Consultas
todos los campos de salida son string.
```
{
  coursesQuery {
    _id
    identificacion
    nombres
    apellidos
    genero
  }
}
```

2. Creación
todos los campos de entrada y salida son string.
```
mutation {
  coursesCreate(_id:"", codigo: "", nombre: "", observaciones: "") {
    _id
    codigo
    nombre
    observaciones
  }
}
```

3. Actualización
todos los campos de entrada y salida son string.
```
mutation {
  coursesUpdate(_id:"", codigo: "", nombre: "", observaciones: "") {
    _id
    codigo
    nombre
    observaciones
  }
}
```

4. Eliminación
todos los campos de entrada y salida son string.
```
mutation {
  coursesRemove(_id: "") {
    status
  }
}
```

See more complete documentation at http://graphql.org/ and
http://graphql.org/graphql-js/.
