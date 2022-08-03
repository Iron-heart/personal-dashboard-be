const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

//GET income
userRoutes.route("/income").get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("income")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching income!");
       } else {
          res.json(result);
        }
      });
  });

// POST income
userRoutes.route("/income").post(function (req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        title: req.body.title,
        amount: req.body.amount,
        date: Date.now()
    };
  
    dbConnect
      .collection("income")
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting user!");
        } else {
          console.log(`Added a new user with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  });

module.exports = userRoutes;
