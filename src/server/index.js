const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = 3000;

// Request logging
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

// Security with Helmet
app.use(helmet());

// Body parsing for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clubRoutes = require("../routes/clubRoutes");
const gameRoutes = require("../routes/gameRoutes");

app.use("/api/clubs", clubRoutes);
app.use("/api/games", gameRoutes);

// Request handler
app.get("*", (req, res, next) => {
  res.status(404).send({ message: "Server working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app, PORT };

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server started on port: ${PORT}`);
// });
