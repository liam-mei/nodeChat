# nodeChat
basic backend to experiment with sequelize, postgres, socket.io, node/express


HTTP Endpoints
/login
/makeRoom
/listRooms/searchString
/joinRoom


// create database command
Sequelize Commands
1. create rc (run command files)
2. sequelize init
3. createdb todos-dev
4. sequelize model:create --name Todo --attributes title:string
5. sequelize model:create --name TodoItem --attributes content:string,complete:boolean
6. sequelize db:migrate
7. sequelize-cli seed:generate --name todo
8. sequelize db:seed:all


// Stop all node processes
kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')

1. Todos
   1. seed data -done
   2. make login endpoint - done
   3. react side login - done
   5. messages returned with nested users don't have their token returned. -done
2. Authentication
   1. get payload from token and assert token is from actual user when getting rooms
   2. handle when user signs in from multiple clients

const currentRooms = await RoomAccessObject.find(
      {},
      [
        {
          model: "Messages",
          limit: 1,
          include: [{ model: "User", attributes: ["username"] }],
        },
      ],
      [["Messages", "id", "DESC"]]
    );

    ``` javascript // successfully order but not limit
    const currentRooms = await RoomUserAccessObject.find({
      include: [
        { model: user, attributes: ["id", "username"] },
        {
          model: room,
          include: [{ model: message, order: [["id", "DESC"]] }],
        },
      ],
      where: { userId: 2 },
      order: [[room, message, "id", "DESC"]],
    });
    ```

``` js // successfully limit nested, but not order
const currentRooms = await RoomUserAccessObject.find({
    include: [
      { model: user, attributes: ["id", "username"] },
      {
        model: room,
        include: [
          { model: message, limit: 1, order: [["id", "DESC"]] },
        ],
        order: [["messages", "id", "DESC"]],
      },
    ],
    where: { userId: 2 },
  });
```

``` js  // order but not limit
const currentRooms = await RoomAccessObject.find({
      attributes: ["id", "name"],
      include: [
        {
          model: message,
          attributes: ["id", "roomId", "message", 'userId'],
          include: [
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
      order: [["messages", "id", "DESC"]],
    });
```

``` js // limit but not order

```

``` js
const rooms = {
    room1: {
      id: 1,
      users: [{}],
      messages: [{ message: "", user: { username: "" } }],
      order: undefined,
      name: 'room1'
    },
  }
```