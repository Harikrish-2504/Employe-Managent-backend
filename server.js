const express = require("express");
const errorHandler = require("./middleware/errorHandller");
const path = require("path");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {sessionId} = require("./authentication");

connectDB();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionId);

app.use(express.json());
app.use(errorHandler);

//*ejs view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//*static files
// app.use("/javascript", express.static(path.resolve(__dirname, "public/javascript")));
// app.use("/css", express.static(path.resolve(__dirname, "public/css")));
// app.use("/img", express.static(path.resolve(__dirname, "public/img")));
app.use(express.static("public"));
app.use(express.static(path.join()));

//*seting routes
app.use("/employees", require("./routes/empRoutes"));
app.use("/", require("./routes/viewRoutes"));
app.use("/users", require("./routes/userRoutes"));


app.listen(PORT, () => {
  console.log(`The server is running on: http://localhost:${PORT}`);
});
