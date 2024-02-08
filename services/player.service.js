const express = require("express");
const Player = require("../classes/Player");
const app = express();
app.use(express.json());
let pl = new Player();
const player = {
  joinGame: async (req, res) => {
    try {
      const { username, gameID, password } = req.body;
      const player = await pl.joinGame(username, gameID, password);
      res.json({ gameID: gameID, player: player });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  chooseAnswer: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playerID = req.params.playerid;
      const { answer, round } = req.body;
      const ans = await pl.chooseAnswer(playerID, round, answer, gameID);
      res.json({ answer: ans });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  guessAnswer: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playerGuessingID = req.params.playerid;
      const { playerID, round, answer } = req.body;
      const guessingResult = await pl.guessAnswer(
        gameID,
        playerGuessingID,
        answer,
        playerID,
        round
      );
      res.json(guessingResult);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getScores: async (req, res) => {
    try {
      const gameID = req.params.id;
      const players = await pl.getScores(gameID);
      res.json({ players: players });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getQuestion: async (req, res) => {
    try {
      const gameID = req.params.id;
      const question = await pl.getQuestion(gameID);
      res.json({ question: question });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getPlayerGuessing: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playerGuessing = await pl.getPlayerGuessing(gameID);
      res.json({ player: playerGuessing });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getPlayersJoined: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playersJoined = await pl.getPlayersJoined(gameID);
      res.json(playersJoined);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getPlayersSelected: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playersSelected = await pl.getPlayersSelected(gameID);
      res.json(playersSelected);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getPlayersGuessed: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playersGuessed = await pl.getPlayersGuessed(gameID);
      res.json(playersGuessed);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getPlayerBeingGuessed: async (req, res) => {
    try {
      const gameID = req.params.id;
      const playerBeingGuessed = await pl.getPlayerBeingGuessed(gameID);
      res.json({ player: playerBeingGuessed });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getTimer: async (req, res) => {
    try {
      const gameID = req.params.id;
      const timer = await pl.getTimer(gameID);
      res.json(timer);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  getGameDetails: async (req, res) => {
    try {
      const gameID = req.params.id;
      const details = await pl.getGameDetails(gameID);
      res.json(details);
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  updateGameData: async (req, res) => {
    try {
      const gameID = req.params.id;
      pl.updateGameData(gameID);
      res.json("Game updated");
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
  guessAnswers: async (req, res) => {
    try {
      const { answers } = req.body;
      const gameID = req.params.id;
      const playerGuessingID = req.params.playerid;
      pl.guessAnswers(gameID, answers, playerGuessingID);
      res.json("Guess Success");
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
  getTimers: async (req, res) => {
    try {
      const gameID = req.params.id;
      const timers = await pl.getTimers(gameID);
      res.json(timers);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
  reviewGuesses: async (req, res) => {
    try {
      const gameID = req.params.id;
      const {
        results,
        playerGuessing,
        playerGuessingID,
        points,
        playerGuesses,
      } = await pl.reviewAnswers(gameID);
      res.json({
        results: results,
        playerGuessing: playerGuessing,
        points: points,
        playerGuesses: playerGuesses,
        playerGuessingID: playerGuessingID,
      });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
};

module.exports = player;
