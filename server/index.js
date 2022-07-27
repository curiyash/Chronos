const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/articles"));

// const dbo = require("./db/conn");

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
})
