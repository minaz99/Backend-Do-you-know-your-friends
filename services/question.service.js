const express = require("express");
const db = require("../dbConfig");
const app = express();
app.use(express.json());

const question = {
  getQ: async (req, res) => {
    try {
      let { id } = req.params;
      const result = await db.query(`SELECT * FROM questions where id = $1`, [
        id,
      ]);
      res.json({ question: result.rows[0] });
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  addQuestion: async (req, res) => {
    try {
      let { question, language } = req.body;
      const result = await db.query(
        `INSERT INTO questions (question,language) VALUES($1,$2)`,
        [question, language]
      );
      res.json("Success");
    } catch (err) {
      res.status(404).json({ error: err });
    }
  },
  shuffleQuestions: (array) => {
    let questionsIndices = [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    array.forEach((item, index) => (questionsIndices[index] = item.id));
    return questionsIndices.toString();
  },
  getQuestion: async (currentQuestionID) => {
    return (
      await db.query(`SELECT * FROM questions where id = $1`, [
        currentQuestionID,
      ])
    ).rows[0];
  },
};

module.exports = question;
