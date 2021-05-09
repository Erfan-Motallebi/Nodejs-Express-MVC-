const { users } = require("../users");

const getUsers = (clientReq, serverReq) => {
  if (users) {
    return serverReq.status(200).json(users);
  }
  return serverReq.sendStatus(400);
};

const getSingleUser = function (clientReq, serverReq) {
  const { id } = clientReq.params;
  if (id) {
    const singlePerson = users.find((person) => person.id === +id);
    return serverReq.status(200).json(singlePerson);
  }
  return serverReq.status(404).json({ success: false, data: [] });
};

const userPost = (clientReq, serverReq) => {
  const personInfo = clientReq.body;

  if (users) {
    users.push(personInfo);
    return serverReq.status(200).json(users);
  }
  return serverReq.status(404).json({ success: false, data: [] });
};

const userSearch = (clientReq, serverReq) => {
  let newPeople = [...users];
  const {
    limit: { number, name },
  } = clientReq.query;
  if (name) {
    newPeople = newPeople.find((person) => person.name === name);
    if (newPeople) {
      return serverReq.status(200).json(newPeople);
    } else {
      return serverReq.status(400).json({ success: false, data: [] });
    }
  }

  if (number) {
    newPeople = users.slice(0, +number);
    return serverReq.status(200).json(newPeople);
  }
  console.log(newPeople);
  return serverReq.status(400).json({ success: false, data: [] });
};

const userUpdate = (clientReq, serverReq) => {
  const newPeople = [...users];
  const { id } = clientReq.params;
  const { name } = clientReq.body;

  const singlePerson = users.find((person) => person.id === +id);
  if (singlePerson) {
    const peopleChanged = newPeople.map((person) => {
      if (person.id === +id) {
        person.name = name;
      }
      return person;
    });
    return serverReq.status(200).json(peopleChanged);
  }
  return serverReq.status(400).json({ success: false, data: [] });
};

const userDelete = (clientReq, serverReq) => {
  const { id } = clientReq.params;
  const person = users.find((person) => person.id === +id);
  if (!person) {
    serverReq.status(402).jso({ success: false, data: [] });
  }
  const subtractedPeople = users.filter((item) => {
    return item.id !== Number(id);
  });
  console.log(subtractedPeople);
  return serverReq.status(200).json(subtractedPeople);
};

const addUser = (clientReq, serverReq) => {
  serverReq
    .status(200)
    .sendFile("/addUser.html", { root: path.join("../views") }, function (err) {
      if (err) {
        return serverReq.status(400).json({ success: false, data: [] });
      }
    });
};

module.exports = {
  getUsers,
  getSingleUser,
  userPost,
  userUpdate,
  userDelete,
  userSearch,
  addUser,
};
