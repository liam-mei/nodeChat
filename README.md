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