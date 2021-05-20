const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { API, AUTH } = require("./constants/routes");
const signIn = require("./routes/signIn");
const signUp = require("./routes/signUp");
const root = require("./routes/root");
const addImage = require("./routes/addImage");
const getImages = require("./routes/getImages");
require("dotenv").config();

const { PORT, MONGO_URI } = process.env;
const app = express();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected ${MONGO_URI}`))
  .catch((err) => console.log(err));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(`${API}${AUTH}`, signUp);
app.use(`${API}${AUTH}`, signIn);
app.use(`${API}${AUTH}`, root);
app.use(`${API}`, addImage);
app.use(`${API}`, getImages);
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
