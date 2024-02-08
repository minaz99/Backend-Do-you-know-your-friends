const express = require("express");
const db = require("../dbConfig");
const app = express();
app.use(express.json());

class GameFunctions {
  getStage = async (gameID) => {
    let stage = (await db.query(`SELECT * FROM games where id = $1`, [gameID]))
      .rows[0].stage;
    return stage;
  };
  setStage = async (gameID, stage) => {
    await db.query(`UPDATE games SET stage = $1 WHERE id = $2`, [
      stage,
      gameID,
    ]);
  };
  getGameData = async (gameID) => {
    const game = await db.query(`SELECT * FROM games where id = $1`, [gameID]);
    return game.rows[0];
  };
  getNextQuestionID = (questions, currentQuestionID) => {
    let currentQuestionIndex = questions
      .split(",")
      .indexOf(currentQuestionID.toString());
    let nextQuestion =
      questions.split(",")[
        (currentQuestionIndex + 1) % questions.split(",").length
      ];
    return parseInt(nextQuestion);
  };
  FinishGuessingRound = async (gameID) => {
    let game = await this.getGameData(gameID);
    let isGameFinished = game.currentround + 1 > game.rounds ? true : false;
    let round =
      game.currentround === game.rounds
        ? game.currentround
        : game.currentround + 1;
    let noofplayers = game.noofplayers;
    let playerGuessing = game.playerguessing;
    let playersOrder = game.playersorder;    
    let playerGuessingIndex = playersOrder
      .split(",")
      .indexOf(playerGuessing.toString());
    let nextPlayerGuessingID =
      playersOrder.split(",")[(playerGuessingIndex + 1) % noofplayers];
    let nextPlayerGuessingIndex = playersOrder
      .split(",")
      .indexOf(nextPlayerGuessingID.toString());
    let playerBeingGuessedID =
      playersOrder.split(",")[(nextPlayerGuessingIndex + 1) % noofplayers];
    let nextQuestionID = this.getNextQuestionID(
      game.questionids,
      game.currentquestionid
    );
    if (!isGameFinished) {
      await db.query(
        `UPDATE games set playerguessing = $1, playersguessed = $2, playerbeingguessed = $3, playersselectedanswer = $4, currentround = $5, currentquestionid = $6, gamefinished=$7,stage=$8 where id = $9`,
        [
          parseInt(nextPlayerGuessingID),
          1,
          parseInt(playerBeingGuessedID),
          1,
          round,
          nextQuestionID,
          isGameFinished,
          "selection",
          gameID,
        ]
      );
    } else {
      await db.query(
        `UPDATE games set gamefinished=$1, stage=$2 where id = $3`,
        [isGameFinished, "game finished", gameID]
      );
    }
  };
  moveToNextPlayerGuessing = async (gameID) => {
    let game = await this.getGameData(gameID);
    let playersGuessed = game.playersguessed;
    let playersCount = game.noofplayers;
    if (playersGuessed < playersCount) {      
      let playersOrder = game.playersorder;
      let playerBeingGuessed = game.playerbeingguessed;
      let PlayerBeingGuessedIndex = playersOrder
        .split(",")
        .indexOf(playerBeingGuessed.toString());
      let nextPlayerToBeGuessedID =
        playersOrder.split(",")[(PlayerBeingGuessedIndex + 1) % playersCount];
      await db.query(`UPDATE games set playerbeingguessed = $1 where id = $2`, [
        parseInt(nextPlayerToBeGuessedID),
        gameID,
      ]);
      return true;
    } else {
      await this.FinishGuessingRound(gameID);
      return false;
    }
  };
  checkGuess = async (answer, gameID, playerID) => {
    let game = await this.getGameData(gameID);
    let answerForPlayerGuessed = await db.query(
      `SELECT * FROM answers where playerid = $1 AND gameid= $2 AND round = $3`,
      [game.playerbeingguessed, gameID, game.currentround]
    );
    if (
      !answerForPlayerGuessed.rows[0].guessed &&
      game.playerguessing === playerID
    ) {
      await db.query(
        `UPDATE answers set guessed = $1 where gameid = $2 AND round = $3 AND playerid = $4`,
        [true, gameID, game.currentround, game.playerbeingguessed]
      );
      let playerSelectedAnswer =
        answerForPlayerGuessed.rows[0].answeridselected;
      await db.query(`UPDATE games SET playersguessed = $1 where id = $2`, [
        game.playersguessed + 1,
        gameID,
      ]);
      if (playerSelectedAnswer === answer) {
        let playerGuessing = await this.getPlayerGuessing(gameID);
        await db.query(`UPDATE players set score = $1 where id = $2`, [
          playerGuessing.score + 1,
          playerGuessing.id,
        ]);
        return true;
      } else return false;
    } else return null;
  };
  getPlayerBeingGuessed = async (playerID) => {
    const player = await db.query(`SELECT * FROM players where id = $1`, [
      playerID,
    ]);
    return player.rows[0];
  };
  getGameDetails = async (gameID) => {
    const game = await this.getGameData(gameID);
    const question = await this.getQuestion(game.currentquestionid);
    const scores = await this.getScores(gameID);
    const playerGuessing = await this.getPlayerGuessing(gameID);
    const playerBeingGuessed = await this.getPlayerBeingGuessed(
      game.playerbeingguessed
    );
    return {
      question: question.question,
      scores: scores,
      playerGuessing: playerGuessing,
      gameData: game,
      playerBeingGuessed: playerBeingGuessed,
    };
  };
  async getScores(gameID) {
    const players = await db.query(
      `SELECT * FROM players where gameid = $1 ORDER BY score DESC`,
      [gameID]
    );
    return players.rows;
  }
  getPlayerGuessing = async (gameID) => {
    const game = await this.getGameData(gameID);
    const playerGuessingID = game.playerguessing;
    const playerGuessing = await db.query(
      `SELECT * FROM players where id = $1`,
      [playerGuessingID]
    );
    return playerGuessing.rows[0];
  };
  getPlayers = async (gameID) => {
    const players = await db.query(`SELECT * FROM players where gameid = $1`, [
      gameID,
    ]);
    return players.rows;
  };
  shuffleQuestions(array) {
    let questionsIndices = [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    array.forEach((item, index) => (questionsIndices[index] = item.id));
    return questionsIndices.toString();
  }
  getQuestion = async (questionID) => {
    let question = await db.query(`SELECT * FROM questions where id = $1`, [
      questionID,
    ]);
    return question.rows[0];
  };
  async prepareGame(gameID) {
    let questions = (await db.query(`SELECT * FROM questions`)).rows;
    let players = (
      await db.query(`SELECT * FROM players where gameid = $1`, [gameID])
    ).rows;
    let questionsIDsString = this.shuffleQuestions(questions);
    let playersOrder = this.shuffleQuestions(players);
    let currentQuestionID = questionsIDsString.split(",")[0];
    let playerGuessing = playersOrder.split(",")[0];
    let playerBeingGuessed = playersOrder.split(",")[1];

    await db.query(
      `UPDATE games SET questionids = $1, currentround = $2, currentquestionid = $3, playerguessing = $4, playerbeingguessed=$5, playersselectedanswer = $6, playersguessed = $7, playersorder = $8, stage=$9 WHERE id = $10`,
      [
        questionsIDsString,
        1,
        parseInt(currentQuestionID),
        parseInt(playerGuessing),
        parseInt(playerBeingGuessed),
        1,
        1,
        playersOrder,
        "selection",
        gameID,
      ]
    );
  }
  async chooseAnswer(playerID, round, answerID, gameID, playersSelected) {
    let game = await this.getGameDetails(gameID);
    if (game.playerGuessing.id !== playerID) {
      let answer = await db.query(
        `SELECT * from answers where playerid = $1 AND round = $2 AND gameid = $3`,
        [playerID, round, gameID]
      );
      if (answer.rows.length === 0) {
        await db.query(
          `INSERT INTO answers(playerid,round,answeridselected,gameid,guessed) VALUES($1,$2,$3,$4,$5) `,
          [playerID, round, answerID, gameID, false]
        );
        await db.query(
          `UPDATE games SET playersselectedanswer = $1 where id = $2`,
          [playersSelected + 1, gameID]
        );
      } else
        await db.query(
          `UPDATE  answers SET answeridselected = $1 where round = $2 AND gameid = $3 AND playerid = $4`,
          [answerID, round, gameID, playerID]
        );
    }
  }
}

module.exports = GameFunctions;
