const express = require("express");
const app = express();
const http = require("node:http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
require("dotenv").config();
app.use(express.json());
var cors = require("cors");
app.use(cors());
const GameFunctions = require("./classes/GameFunctions");
const player = require("./services/player.service");
const host = require("./services/host.service");
const questionService = require("./services/question.service");
app.get("/", (req, res) => {
  res.json("Hello :)");
});
app.get("/question/:id", questionService.getQ);
app.post("/question", questionService.addQuestion);
app.post("/game/join", player.joinGame);
app.post("/game/create", host.createGame);

let gf = new GameFunctions();
io.on("connection", (socket) => {
  let countdown = 60;
  let timer;
  socket.on("join", async (gameID) => {
    io.socketsJoin(`room${gameID}`);
    let gameData = await gf.getGameData(gameID);
    const playersCount = gameData.noofplayers;
    const playersJoined = gameData.playersjoined;
    const players = await gf.getPlayers(gameID);
    const playersJoinedStr = `${playersJoined}/${playersCount}`;
    io.in(`room${gameID}`).emit("join", {
      playersJoinedStr,
      players,
      language: gameData.language,
    });
    if (playersJoined === playersCount) {
      console.log("starting game");
      await gf.prepareGame(gameID, gameData.language);
      let gameDetails = await gf.getGameDetails(gameID);
      io.in(`room${gameID}`).emit("start game", {
        gameDetails: gameDetails,
      });
    }
  });

  socket.on("selection started", (gameID) =>
    io.in(`room${gameID}`).emit("start timer")
  );

  socket.on("selected", async ({ gameID, playerID, answer }) => {
    console.log("we got here cause player made selection");
    let gameData = await gf.getGameData(gameID);
    let playersSelected = gameData.playersselectedanswer;
    let round = gameData.currentround;

    await gf.chooseAnswer(playerID, round, answer, gameID, playersSelected);
    gameData = await gf.getGameDetails(gameID);
    io.in(`room${gameID}`).emit("updated", gameData);
    if (
      gameData.gameData.playersselectedanswer === gameData.gameData.noofplayers
    ) {
      io.in(`room${gameID}`).emit("selection finished");
      io.in(`room${gameID}`).emit("stop timer");
      await gf.setStage(gameID, "guessing");
    }
    gameData = await gf.getGameDetails(gameID);
    io.in(`room${gameID}`).emit("updated", gameData);
  });
  socket.on("guessing started", (gameID) =>
    io.in(`room${gameID}`).emit("start timer")
  );
  socket.on("guessed", async ({ answer, gameID, points, playerID }) => {
    io.in(`room${gameID}`).emit("stop timer");
    let result = await gf.checkGuess(answer, gameID, playerID);
    if (result !== null) {
      io.in(`room${gameID}`).emit("guessed", {
        result: result,
        answer: answer,
      });
      let gameDetails = await gf.getGameDetails(gameID);
      if (result) {
        points++;
      }
      io.in(`room${gameID}`).emit("updated", gameDetails);
      io.in(`room${gameID}`).emit("result", {
        answer: answer,
        result: result,
        points: points,
      });
    }
  });

  socket.on("next to guess", async (gameID) => {
    let stillGuessing = await gf.moveToNextPlayerGuessing(gameID);
    gameDetails = await gf.getGameDetails(gameID);
    io.in(`room${gameID}`).emit("updated", gameDetails);
    if (!stillGuessing) {
      if (gameDetails.gameData.gamefinished === true) {
        io.in(`room${gameID}`).emit("game finished");
      } else {
        io.in(`room${gameID}`).emit("guessing finished");
        io.in(`room${gameID}`).emit("selection started");
      }
    } else {
      io.in(`room${gameID}`).emit("started next round");
    }
  });
  socket.on("stop timer", () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    countdown = 60;
  });
  socket.on("start timer", (gameID) => {
    if (!timer) {
      timer = setInterval(async () => {
        if (countdown > 0) {
          countdown--;
          io.in(`room${gameID}`).emit("timer", countdown);
        } else {
          let stage = await gf.getStage(gameID);
          io.in(`room${gameID}`).emit(`${stage} time up`);
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    }
  });
});

server.listen(3004), () => console.log("server is running correctly");
