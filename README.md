# User Management

- First I init a file and install express, mongoose, dotenv and cors
- Then I install eslint and prettier for typescript
- After that I make some script for run server, eslint and prettier
- I make a configure file for import the .env file.
- I use moduler pattern for my project
- First I make interfact after that module.
- then I create routes, services and controllers
- I use zod package for validation.
- I use bcrypt for encrypting password

## Scripts

```javascript
"scripts": {
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npm eslint src --fix",
    "start:prod": "node dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
