const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging
app.use(morgan("dev"));

// Enable CORS
app.use(
  cors({
    origin: "https://awana-front.onrender.com", // Specific frontend URL
    credentials: true, // Allow cookies to be included
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly define allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly define allowed headers
  })
);

// Security with Helmet
app.use(helmet());

// Body parsing for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const clubRoutes = require("../routes/clubRoutes");
const gameRoutes = require("../routes/gameRoutes");

app.use("/api/clubs", clubRoutes);
app.use("/api/games", gameRoutes);

// Request handler
app.get("*", (req, res, next) => {
  res.status(404).send({ message: "Server working" });
});

setInterval(async () => {
  try {
    console.log("Ping");
    const response = await axios({
      method: "get",
      url: "https://awana-backend.onrender.com/api/clubs",
    });
    console.log(response.data);

    const responseFron = await axios({
      method: "get",
      url: "https://awana-front.onrender.com",
    });
    console.log(responseFron.data);
  } catch (error) {
    console.log(error);
  }
}, 10 * 60 * 1000);

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
