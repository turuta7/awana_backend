const mongoose = require("mongoose");
require("dotenv").config();

const startDB = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI) // Используйте переменную окружения здесь
      .then(() => {
        resolve("Connected MongoDB");
      })
      .catch((err) => {
        reject("Error connecting MongoDB: " + err);
        console.error("Error connecting MongoDB: ", err);
      });
  });

module.exports = { startDB, mongoose };

// // Определение схемы (структуры) коллекции
// const clubSchema = new mongoose.Schema({
//   name: String,
//   location: String,
//   founded: Number,
// });

// // Создание модели на основе схемы
// const Club = mongoose.model("Club", clubSchema);

// // Добавление нового клуба
// const newClub = new Club({
//   name: "Club A",
//   location: "City A",
//   founded: 1990,
// });

// // Сохранение клуба в базу данных
// newClub
//   .save()
//   .then(() => {
//     console.log("Club saved successfully");
//   })
//   .catch((err) => {
//     console.error("Error saving club", err);
//   });

// // Получение всех клубов
// Club.find()
//   .then((clubs) => {
//     console.log("All clubs:", clubs);
//   })
//   .catch((err) => {
//     console.error("Error fetching clubs", err);
//   });
