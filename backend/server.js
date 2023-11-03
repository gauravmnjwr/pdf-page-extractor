import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Routes from "./routes/index.js";

import bodyParser from "body-parser";

dotenv.config();

const app = express();
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 500000,
  })
);
// app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

// Set up MongoDB connection
connectDB(process.env.MONGO_URL);

//
app.get("/", (req, res) => {
  res.json({ message: "Hye" });
});

app.use("/api", Routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is running on Port", PORT));
