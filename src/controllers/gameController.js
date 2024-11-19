const Models = require("../db/models/models");

class GameController {
  // Get all games
  async getAllGames(req, res) {
    try {
      const games = await Models.Game.find().populate("club");
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving games" });
    }
  }

  async getAllGamesByClub(req, res) {
    try {
      const { clubId } = req.params; 
      const games = await Models.Game.find({ club: clubId }).populate("club");
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving games", error: error.message });
    }
  }

  // Create a new game
  async createGame(req, res) {
    try {
      const newGame = await Models.Game.create(req.body);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(400).json({ message: "Error creating game" });
    }
  }

  // Update a game
  async updateGame(req, res) {
    try {
      const updatedGame = await Models.Game.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedGame) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.status(200).json(updatedGame);
    } catch (error) {
      res.status(400).json({ message: "Error updating game" });
    }
  }

  // Delete a game
  async deleteGame(req, res) {
    try {
      const deletedGame = await Models.Game.findByIdAndDelete(req.params.id);
      console.log("deletedGame: ", deletedGame);
      res.status(200).json({ message: "Game deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting game" });
    }
  }
}

// Exporting an instance of the class
module.exports = new GameController();
