const express = require("express");
const db = require("../dbConfig");
const app = express();
app.use(express.json());
//const cron = require("node-cron");
const Player = require("./Player");

class Host extends Player {
  async createGame(username, noOfPlayers, rounds, password) {
    const game = await db.query(
      `INSERT INTO games(noofplayers,rounds,password,playersjoined,hostid) VALUES($1,$2,$3,$4,$5) RETURNING id`,
      [noOfPlayers, rounds, password, 0, -1]
    );
    const player = await this.joinGame(username, game.rows[0].id, password);
    await db.query(`UPDATE games SET hostid = $1 WHERE id = $2`, [
      player.id,
      game.rows[0].id,
    ]);
    return { gameID: game.rows[0].id, player: player };
  }
}

module.exports = Host;
