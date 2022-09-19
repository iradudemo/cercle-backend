const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectToDb = require("./config/db");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

connectToDb();

const auth = require("./routes/auth");
const users = require("./routes/users");
const playGround = require("./routes/playGround");
const trans = require("./routes/transaction");
const playGroundcategory = require("./routes/pCategory");
const time = require("./routes/time");
const bookTime = require("./routes/bookedTime");
const reviews = require("./routes/reviews");
const upload = require("./routes/uploads");
const app = express();

const port = process.env.PORT || 2004;

app.use(cors());
app.use(express.json());

app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// file upload
app.use(fileupload({ useTempFiles: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/playGround", playGround);
app.use("/api/transaction", trans);
app.use("/api/groundCategory", playGroundcategory);
app.use("/api/reviews", reviews);
app.use("/api/time", time);
app.use("/api/booktime", bookTime);
app.use("/api/uploads", upload);
app.use("/", require("./routes/index"));

app.use(errorHandler);

app.listen(
  port,
  console.log(`Server started at ${process.env.NODE_ENV} mode on port ${port}`)
);
