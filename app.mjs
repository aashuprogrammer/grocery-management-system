import express from "express";
import cors from "cors";
import productRoutor from "./routers/productRouter.mjs";
import variantRouter from "./routers/variantRouter.mjs";
import cartRouter from "./routers/cartRouter.mjs";

import { userRoute } from "./routers/users.mjs";
import { categoryRoute } from "./routers/category.mjs";
import { reviewRouter } from "./routers/review.mjs";
import bodyParser from "body-parser";
import { errorController } from "./error.mjs";
import { tagRoute } from "./routers/tag.mjs";

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.json());
app.use("/product", productRoutor);
app.use("/variant", variantRouter);
app.use("/cart", cartRouter);

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/review", reviewRouter);

app.use('/tag', tagRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("*", async (req, res) => {
  res.send("Route Not Exists");
});
app.use(errorController);
export default app;
