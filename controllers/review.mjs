import { Review } from "../model/review.mjs";

const reviews = async (req, res) => {
  try {
    const review = new Review({
      user_id: req.body.user_id,
      rating: req.body.rating,
      massage: req.body.massage,
    });
    await review.save();
    res.json({
      msg: "Review Success",
      review,
    });
  } catch (error) {
    res.json(error);
  }
};

export { reviews };
