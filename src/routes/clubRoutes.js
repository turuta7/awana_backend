const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

// GET: Retrieve all clubs
router.get("/", clubController.getAllClubs);

// POST: Create a new club
router.post("/", clubController.createClub);

// PUT: Update a club by ID
router.put("/:id", clubController.updateClub);

// DELETE: Delete a club by ID
router.delete("/:id", clubController.deleteClub);

module.exports = router;
