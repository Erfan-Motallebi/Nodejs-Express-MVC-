const express = require("express");
const server = express();

const { router: userRouter } = require("./route/userRouter");

const { authorize } = require("./auth");

//Server setting

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

server.get("/", (clientReq, serverReq) => {
  serverReq
    .status(200)
    .sendFile("/index.html", { root: path.join("../views") }, function (err) {
      if (err) {
        return serverReq.status(400).json({ success: false, data: [] });
      }
    });
});

// USER ROUTER CHECKUP
server.use("/users", userRouter);

server.get(["/[aA]bout", "/[Aa]bout-us"], (clientReq, serverReq) => {
  serverReq.status(200).sendFile("/about.html", { root: path.join("./views") });
});

// server.get("/about-us", (clientReq, serverReq) => {
//   serverReq.redirect("/about");
// });

server.all("*", (req, res) => {
  res.status(404).sendFile("/404.html", { root: path.join("./views") });
});

server.listen(5000, "localhost", (err) => {
  if (!err) {
    console.log("listening to port 5000");
  } else {
    console.log(err.message);
  }
});
