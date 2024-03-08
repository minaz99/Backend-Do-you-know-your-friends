const express = require("express");
const Host = require("../classes/Host");
const app = express();
app.use(express.json());
let hst = new Host();

const host = {
  createGame: async (req, res) => {
    try {
      const { username, language, noOfPlayers, rounds, password } = req.body;
      const playerGameDetails = await hst.createGame(
        username,
        language,
        noOfPlayers,
        rounds,
        password
      );
      res.json(playerGameDetails);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
};

module.exports = host;
