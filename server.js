const dotenv = require("dotenv").config();
const app = require("./src");
const connectDB = require("./src/db/config");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
