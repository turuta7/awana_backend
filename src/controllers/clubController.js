const Models = require("../db/models/models");

class ClubController {
  // Get all clubs
  async getAllClubs(req, res) {
    try {
      const clubs = await Models.Club.find();
      res.status(200).json(clubs);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving clubs" });
    }
  }

  // Create a new club
  async createClub(req, res) {
    try {
      const newClub = await Models.Club.create(req.body);
      res.status(201).json(newClub);
    } catch (error) {
      res.status(400).json({ message: "Error creating club" });
    }
  }

  // Update a club
  async updateClub(req, res) {
    try {
      const updatedClub = await Models.Club.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedClub) {
        return res.status(404).json({ message: "Club not found" });
      }
      res.status(200).json(updatedClub);
    } catch (error) {
      res.status(400).json({ message: "Error updating club" });
    }
  }

  // Delete a club
  async deleteClub(req, res) {
    try {
      const { password } = req.body;
      // const { password } = req.cookies;
      // console.log("****cookies****");
      // console.log(req.cookies);

      if (!password || password !== "tur098") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const deletedClub = await Models.Club.findByIdAndDelete(req.params.id);

      // Delete all games associated with the club
      await Models.Game.deleteMany({ club: req.params.id });

      console.log("deletedClub: ", deletedClub);
      res.status(200).json({ message: "Club deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting club" });
    }
  }
}

// Exporting an instance of the class
module.exports = new ClubController();
