import express from "express";
import cors from "cors";
import productRoutor from "./routers/productRouter.mjs";
import variantRouter from "./routers/variantRouter.mjs";
const app = express();
app.use(cors("*"));
app.use(express.json());
// ////////////////////////
app.use("/product", productRoutor);
app.use("/variant", variantRouter);

// ////////////////////////

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("*", async (req, res) => {
  res.send("Route Not Exists");
});
export default app;
