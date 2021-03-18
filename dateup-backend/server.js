import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCards.js";
import Cors from "cors";
import bodyParser from "body-parser";

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://Sunny:1B18oUBpOMh5NpHT@cluster0.bi7zx.mongodb.net/dateupDB?retryWrites=true&w=majority`;

//middlewares
app.use(express.json());
app.use(Cors());
//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API EndPoints
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/dateup/cards", (req, res) => {
//   console.log(req.body);
  const dbcard = req.body;
  Cards.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/dateup/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listeners
app.listen(port, (err) => {
  if (err) {
    console.log("error in running server: ", err);
    return;
  }
  console.log("listning on localhost:", port);
});
