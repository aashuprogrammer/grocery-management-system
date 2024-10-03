import express from "express";
import cors from "cors";
import productRoutor from "./routers/productRouter.mjs";
import variantRouter from "./routers/variantRouter.mjs";
import cartRouter from "./routers/cartRouter.mjs";
import bodyParser from "body-parser";

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ////////////////////////
app.use("/product", productRoutor);
app.use("/variant", variantRouter);
app.use("/cart", cartRouter);

// ////////////////////////

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("*", async (req, res) => {
  res.send("Route Not Exists");
});
export default app;
