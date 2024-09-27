const mongoose = require("mongoose");

// Схема для клуба
const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Схема для игры
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Определяем модели
const Club = mongoose.model("Club", clubSchema);
const Game = mongoose.model("Game", gameSchema);

// Экспортируем модели
class Models {
  static Club = Club;
  static Game = Game;
}

module.exports = Models;
