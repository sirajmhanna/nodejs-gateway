
# NodeJS Gateway Service

This is a repository built using NodeJS, ExpressJS, and MySQL.



## Features

API Gateway

## Tech Stack

**Server:** Node, Express, and MySQL


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`SERVICE_NAME`
`ENVIRONMENT`

`AUTHENTICATION_SERVICE_URL`

`FRONTEND_BASE_URL`


## Run Locally

Clone the project

```bash
  git clone https://github.com/sirajmhanna/nodejs-gateway.git
```

Go to the project directory

```bash
  cd ./nodejs-gateway
```
Install dependencies

```bash
  npm ci
```

Create .env file (check .env.example file)

```bash
  touch .env 
```

Start the server

```bash
  npm run dev 
```

## Create Docs

```bash
node_modules/.bin/jsdoc -c ./jsdoc.conf.json
```