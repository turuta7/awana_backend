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
const allowedOrigins = [
  "https://awana-front.onrender.com", // Продуктивный URL
  "https://awana-front2.onrender.com",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Security with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Отключаем CSP, если вызывает конфликты
  })
);

// Body parsing for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cookie parsing
app.use(cookieParser());

// Example route to set cookies
app.get("/set-cookie", (req, res) => {
  res.cookie("sessionId", "exampleSessionId", {
    // httpOnly: true, // Protects cookie from being accessed by client-side scripts
    secure: true, // Requires HTTPS
    sameSite: "None", // Allows cross-domain usage of cookies
  });
  res.status(200).send({ message: "Cookie set successfully" });
});

// Routes
const clubRoutes = require("../routes/clubRoutes");
const gameRoutes = require("../routes/gameRoutes");

app.use("/api/clubs", clubRoutes);
app.use("/api/games", gameRoutes);

// Handle unmatched routes
app.get("*", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

// Keep server alive by pinging itself
setInterval(async () => {
  try {
    console.log("Ping");
    const response = await axios({
      method: "get",
      url:
        process.env.API_URL + "/api/clubs" ||
        "https://awana-backend.onrender.com/api/clubs",
    });
    console.log(response.data);

    const responseFront = await axios({
      method: "get",
      url: process.env.API_URL_FRONT || "https://awana-front.onrender.com",
    });
    console.log(responseFront.data);
  } catch (error) {
    console.error(error);
  }
}, 10 * 60 * 1000);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app, PORT };

// Uncomment to start the server if needed
// app.listen(PORT, () => {
//   console.log(`Server started on port: ${PORT}`);
// });
