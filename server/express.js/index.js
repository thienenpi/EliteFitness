const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const {
  muscleRouter,
  exercisesRouter,
  productsRouter,
  usersRouter,
  staffRouter,
  ordersRouter,
  orderDetailsRouter,
} = require("./routes");
const port = 3000;
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "https://eliteserver.azurewebsites.net/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).json("Welcome to Elite Fitness FTISU"));
app.get("/privacy-policy", (req, res) => {
  res.status(200).sendFile(__dirname + "/privacy-policy.html");
});
app.use("/api/muscles", muscleRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderDetails", orderDetailsRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`EliteFitness app listening on port ${port}!`)
);
