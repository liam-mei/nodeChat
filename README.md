# nodeChat
basic backend to experiment with sequelize, postgres, socket.io, node/express


HTTP Endpoints
/login


Socket Endpoints
/chat


Database
user
  name password

chat
  userId string createdAt

## Steps

1. make http endpoint (login)
2. make socket endpoint (chat)
3. make database using postgres/sequelize
   1. users table
   2. chat table - room table probably


// create database command
Sequelize Commands
1. create rc (run command files)
2. sequelize init
3. createdb todos-dev
4. sequelize model:create --name Todo --attributes title:string
5. sequelize model:create --name TodoItem --attributes content:string,complete:boolean
6. sequelize db:migrate
7. sequelize-cli seed:generate --name todo
