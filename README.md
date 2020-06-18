# FlinssuVideo
## Tabla de Contenido
- [Crear una Aplicación con React JS](#crear-una-aplicación-con-react-js)
  - [Create React App y Tipos de Componentes](#create-react-app-y-tipos-de-componentes)
  - [Instalación y configuración de entorno](#instalación-y-configuración-de-entorno)
  - [Agregando compatibilidad con todos los navegadores usando Babel](#agregando-compatibilidad-con-todos-los-navegadores-usando-babel)
  - [Webpack: Empaquetando nuestros módulos](#webpack-empaquetando-nuestros-módulos)
  - [Webpack Dev Server: Reporte de errores y Cambios en tiempo real](#webpack-dev-server-reporte-de-errores-y-cambios-en-tiempo-real)
  - [Estilos con SASS](#estilos-con-sass)
  - [Configuración final: ESLint y Git Ignore](#configuración-final-eslint-y-git-ignore)
  - [Añadiendo imágenes con Webpack](#añadiendo-imágenes-con-webpack)
  - [Imports, Variables y Fuentes de Google en Sass](#imports-variables-y-fuentes-de-google-en-sass)
 - [Uso de una API de desarrollo (Fake API)](#uso-de-una-api-de-desarrollo-fake-api)
  
## Crear una Aplicación con React JS

### Create React App y Tipos de Componentes
**Inicialización de un proyecto en React**

Creación de nuestro sitio web usando la plantilla por defecto de [create-react-app](https://create-react-app.dev/docs/getting-started/):

```bash
npx create-react-app nombre-de-tu-proyecto
```

**Creación y Tipos de Componentes**

Los nombres de nuestros componentes deben empezar con una letra mayúscula, al igual que cada nueva palabra del componente. Esto lo conocemos como Pascal Case o Upper Camel Case.

Los componentes **Stateful** son los más robustos de React. Los usamos creando clases que extiendan de React.Component. Nos permiten manejar estado y ciclo de vida (más adelante los estudiaremos a profundidad).

```js
import React, { Component } from 'react';

class Stateful extends Component {
  constructor(props) {
    super(props);

    this.state = { hello: 'hello world' };
  }

  render() {
    return (
      <h1>{this.state.hello}h1>
    );
  }
}

export default Stateful;
```

También tenemos componentes **Stateless** o Presentacionales. Los usamos creando funciones que devuelvan código en formato JSX (del cual hablaremos en la próxima clase).

```js
import React from 'react';

const Stateless = () => {
  return (
    <h1>¡Hola!h1>
  );
}

// Otra forma de crearlos:
const Stateless = () => <h1>¡Hola!h1>;

export default Stateless;
```

### Instalación y configuración de entorno
Iniciar un repositorio en GIT:
```bash
git init
```

Iniciar un proyecto de Node.js:
```bash
npm init -y
```

Instalar React:

```bash
npm install --save react react-dom
```

### Agregando compatibilidad con todos los navegadores usando Babel
**Babel** es una herramienta muy popular para escribir JavaScript moderno y transformarlo en código que pueda entender cualquier navegador.

Instalación de Babel y otras herramientas para que funcione con React:

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

Configuración de Babel (.babelrc):

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

### Webpack: Empaquetando nuestros módulos
**Webpack** es una herramienta que nos ayuda a compilar multiples archivos (JavaScript, HTML, CSS, imágenes) en uno solo (o a veces un poco más) que tendrá todo nuestro código listo para producción.

Instalación de Webpack y algunos plugins:

```bash
npm install webpack webpack-cli html-webpack-plugin html-loader  --save-dev
```

Configuración de Webpack (webpack.config.js):

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
};
```

Script para ejecutar las tareas de Webpack (package.json):

```js
{
  "scripts": {
    "build": "webpack --mode production"
  },
}
```

### Webpack Dev Server: Reporte de errores y Cambios en tiempo real
Instalación de **Webpack Dev Server**:

```bash
npm install --save-dev webpack-dev-server
```

Script para ejecutar el servidor de Webpack y visualizar los cambios en tiempo real (package.json):

```js
{
  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --open --mode development"
  },
}
```

### Estilos con SASS
Los **preprocesadores** como **Sass** son herramientas que nos permiten escribir CSS con una sintaxis un poco diferente y más amigable que luego se transformará en CSS normal. Gracias a Sass podemos escribir CSS con variables, mixins, bucles, entre otras características.

Instalación de Sass:

```bash
npm install --save-dev mini-css-extract-plugin css-loader node-sass sass-loader
```

Configuración de Sass en Webpack (webpack.config.js):

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// ...

module: {
  rules: [
    {
      test: /\.(s*)css$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        'css-loader',
        'sass-loader',
      ],
    }, 
  ],
},

// ...

plugins: [
  new MiniCssExtractPlugin({
    filename: 'assets/[name].css',
  }),
],
```

### Configuración final: ESLint y Git Ignore
El **Git Ignore** es un archivo que nos permite definir qué archivos NO queremos publicar en nuestros repositorios. Solo debemos crear el archivo **.gitignore** y escribir los nombres de los archivos y/o carpetas que no queremos publicar.

Los linters como **ESLint** son herramientas que nos ayudan a seguir buenas prácticas o guías de estilo de nuestro código.

Se encargan de revisar el código que escribimos para indicarnos dónde tenemos errores o posibles errores. En algunos casos también pueden solucionar los errores automáticamente. De esta manera podemos solucionar los errores incluso antes de que sucedan.
Instalación de ESLint:

```bash
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
```

Podemos configurar las reglas de ESLint en el archivo **.eslintrc**.

### Añadiendo imágenes con Webpack
Vamos a usar File Loader para acceder a las imágenes de nuestro proyecto desde el código.

Inicialmente, estos archivos estáticos se encuentran junto al código de desarrollo. Pero al momento de compilar, Webpack guardará las imágenes en una nueva carpeta junto al código para producción y actualizará nuestros componentes (o donde sea que usemos las imágenes) con los nuevos nombres y rutas de los archivos.

Instalación de File Loader:

```bash
npm install --save-dev file-loader
```

Configuración de File Loader en Webpack (webpack.config.js):

```js
rules: [
  {
    test: /\.(png|gif|jpg)$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'assets/[hash].[ext]' },
      }
    ],
  },
],
```

Uso de File Loader con React:

```js
import React from 'react';
import nombreDeLaImagen from '../assets/static/nombre-del-archivo';

const Component = () => (
  <img src={nombreDeLaImagen} />
);

export default Component;
```

### Imports, Variables y Fuentes de Google en Sass
Así como JavaScript, Sass nos permite almacenar valores en variables que podemos usar en cualquier otra parte de nuestras hojas de estilo.

```js
$theme-font: 'Muli, sans-serif;
$main-color: #8f57fd;

body {
  background: $main-color;
  font-family: $theme-font;
}
```

Podemos guardar nuestras variables en un archivo especial e importarlo desde los archivos de estilo donde queremos usar estas variables.

```js
# Vars.scss
$theme-font: 'Muli', sans-serif;
$main-color: #8f57fd;

# App.scss
@import "./Vars.scss";

body {
  background: $main-color;
  font-family: $theme-font;
}
```

También podemos importar hojas de estilo externas a nuestra aplicación. Por ejemplo: las fuentes de Google.

```js
@import url(https://fonts.googleapis.com/css?family=Muli&display-swap)
```

## Uso de una API de desarrollo (Fake API)

### Creando una Fake API
Vamos a usar **JSON Server** para crear una Fake API: una API ““falsa”” construida a partir de un archivo JSON que nos permite preparar nuestro código para consumir una API de verdad en el futuro.

Instalación de JSON Server:

```bash
sudo npm install json-server -g
```

Recuerda que en Windows debes correr tu terminal de comandos en modo administrador.

Ejecutar el servidor de JSON Server:

```bash
json-server archivoParaTuAPI.json
```