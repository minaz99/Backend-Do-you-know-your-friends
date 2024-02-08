const express = require("express");
const Host = require("../classes/Host");
const app = express();
app.use(express.json());
let hst = new Host();

const host = {
  createGame: async (req, res) => {
    try {
      const { username, noOfPlayers, rounds, password } = req.body;
      const playerGameDetails = await hst.createGame(
        username,
        noOfPlayers,
        rounds,
        password
      );
      res.json(playerGameDetails);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  monitorPlayersJoinedTheGame: async (req, res) => {
    try {
      const gameID = req.params.id;
      await hst.monitorPlayersJoinedTheGame(gameID);
      res.json("Waiting for players");
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  prepareGame: async (req, res) => {
    try {
      const gameID = req.paras.id;
      await hst.prepareGame(gameID);
      res.json("Game prepared");
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
};

module.exports = host;
