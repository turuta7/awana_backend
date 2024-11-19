const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// GET: Retrieve all games
router.get("/", gameController.getAllGames);

// GET: Retrieve all games bt club
router.get("/club/:clubId", gameController.getAllGamesByClub);

// POST: Create a new game
router.post("/", gameController.createGame);

// PUT: Update a game by ID
router.put("/:id", gameController.updateGame);

// DELETE: Delete a game by ID
router.delete("/:id", gameController.deleteGame);

module.exports = router;
