# Project-Events

## Backend


first open the server folder and:

1 - Fill the .env file with the following variables (you can copy and paste .env.example and rename to .env):
```dotenv
  APP_PORT=3000
  JWT_SECRET="secret"
  JWT_EXPIRATION_TIME="5m"
  JWT_REFRESH_TOKEN_SECRET="secret"
  JWT_REFRESH_TOKEN_EXPIRATION_TIME="7d"
  DATABASE_URL="postgresql://root:root@localhost:5432/mydb?schema=tokentest"
  SMTP_HOST="smtp.gmail.com"
  SMTP_SERVICE="gmail"
  SMTP_MAIL="email@gmail.com"
  SMTP_PASSWORD="msvj cteo dede tttt"
```
2 - Run the command ```npm install``` to install the dependencies

3 - Run the command ```npx prisma generate``` to update db types

4 - Run the command ```npx prisma migrate dev``` to update db migrations

5 - Run the command ```npm run start:dev``` to run local server

ps: I used postgresSQL to this project


## Frontend

first open the client folder and: 

1 - Fill the .env file with the following variables (you can copy and paste .env.example and rename to .env):
```dotenv
  VITE_API_KEY="http://localhost:3000/api_v1/"
```

2 - Run the command ```npm install``` to install the dependencies

3 - Run the command ```npm run dev``` to run a local server
