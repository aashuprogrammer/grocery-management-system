import mongoose from "mongoose";
import app from "./app.mjs";
import "./config.mjs";

try {
  await mongoose.connect(process.env.DB_URL, {
    dbName: "Grocery_Management",
  });
  console.log("Connected to Database");
} catch (error) {
  console.log("Database connection error", error);
}
console.log("hello");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

(async () => {
  try {
    app.listen(process.env.PORT);
    console.log(`listen on port:${process.env.PORT}`);
  } catch (error) {
    return error;
  }
})();
