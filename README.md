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
- I create a static method to find the user exist or not and then use the methot to the service
- I removed the password field from the create response and find also

## Running the project

```bash
npm run start:dev //development
npm run start:prod //production
```

## Scripts

```javascript
"scripts": {
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npm run lint --fix",
    "start:prod": "node dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## .env setup

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.k0vsmln.mongodb.net/<databasename>?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=10
```
