const { Todo } = require("../database/models");

module.exports = {
  create(req, res) {
    return Todo.create({
      title: req.body.title,
    })
      .then((todo) => res.status(201).send(todo))
      .catch((err) => res.status(400).send(err));
  },
};
