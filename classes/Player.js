const express = require("express");
const db = require("../dbConfig");
const app = express();
app.use(express.json());

class Player {
  async joinGame(username, gameid, password) {
    const gameRoom = await db.query(`SELECT * FROM games where id = $1`, [
      gameid,
    ]);
    if (gameRoom.rows[0].password === password) {
      const player = await db.query(
        `INSERT INTO players(username,score,gameid) VALUES($1,$2,$3) RETURNING *`,
        [username, 0, gameid]
      );
      let playersJoined = gameRoom.rows[0].playersjoined + 1;
      await db.query(`UPDATE games set playersjoined = $1 where id = $2`, [
        playersJoined,
        gameid,
      ]);

      return player.rows[0];
    } else return null;
  }
}
module.exports = Player;
