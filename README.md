# 01 - Setup

Nessa etapa vamos remover o Karma e configurar o Jest no projeto.

## Remova o Karma e suas configs

```
npm remove karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
```

```
rm ./karma.conf.js ./src/test.ts
```

```
rm ./projects/task-state/karma.conf.js ./projects/task-state/src/test.ts
```

## Instalar o [Jest](https://jestjs.io/docs/en/getting-started)

```
npm i -D jest @types/jest @angular-builders/jest
```

## Instalar o [Angular testing library](https://testing-library.com/docs/angular-testing-library/intro)

Esse pacote é opcional, mas é muito importante para nossa estratégia de testes.

```
npm install --save-dev @testing-library/angular @testing-library/jest-dom
```

## Atualizar o tsconfig.spec.json

Na raiz:

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./out-tsc/spec",
    "types": [
      "jest",
      "node"
    ],
    "paths": {
      "task-state": [
        "dist/task-state/task-state",
        "dist/task-state"
      ]
    },
    "sourceMap": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowJs": true,
    "target": "es2015",
    "lib": ["es2018", "es2015"]
  },
  "files": [
    "src/polyfills.ts"
  ],
  "include": [
    "node_modules/**/*.d.ts",
    "src/**/*.spec.ts",
    "setupJest.ts"
  ]
}
```

Em projects/task-state/tsconfig.spec.json:

```
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/spec",
    "types": [
      "jest",
      "node"
    ]
  },
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
}
```

## Criar o arquivo setupJest.ts

Vamos criar o arquivo `setupJest.ts` na raiz.

```
import 'jest-preset-angular';
import '@testing-library/jest-dom';
```

## Criar o arquivo base de configuração

Vamos criar o arquivo `jest.base.config.js` na raiz.

```
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer'
      ],
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  collectCoverageFrom: [
    "projects/task-state/src/lib/**/*.ts",
    "src/app/**/*.ts",
    "!src/app/**/*.module.ts",
    "!src/app/**/*.array.ts",
    "!src/app/**/*.model.ts",
    "!src/app/fragmentTypes.ts"
  ],
  modulePaths: ['<rootDir>/dist'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: [
    "./node_modules/@angular-builders/jest/dist/jest-config/setup.js",
    "./setupJest.ts"
  ],
};
```

## Criar o arquivo de configuração específico para o app

Vamos criar o arquivo `jest.app.config.js` na raiz.

```
const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  modulePathIgnorePatterns: ['projects/.*/package.json'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/dist']
};
```

## Criar o arquivo de configuração específico para a library.

Vamos criar o arquivo `jest.lib.config.js` na raiz.

```
const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects']
};
```

## Configurar o angular.json

Para o projeto:

```
"projects": {
    "ws-unit-tests": {
      ...
      "architect": {
        ...
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "configPath": "./jest.app.config.js"
          }
        },
...
```

Para a lib:

```
  "projects": {
    ...
    "task-state": {
      ...
      "architect": {
        ...
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "configPath": "../../jest.lib.config.js"
          }
        },
```
