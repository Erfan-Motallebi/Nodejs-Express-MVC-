const express = require("express");
const router = express.Router();

const path = require("node:path");
const morgan = require("morgan");

const {
  getUsers,
  getSingleUser,
  userPost,
  userUpdate,
  userDelete,
  userSearch,
  addUser,
} = require("../controllers/users");

router.use("/", morgan("dev"));

// users actions - Routers

router.get("/", getUsers);

// HTTP && JS method to get the details of a form [ Front-end ]
router.post("/", userPost);

router.get("/:id", getSingleUser);

//user add form
router.get("/add", addUser);

// Search Query
router.get("/q/search", userSearch);

// Put Request

router.put("/person/:id", userUpdate);

// delete Request

router.delete("/person/:id", userDelete);

module.exports = { router };
