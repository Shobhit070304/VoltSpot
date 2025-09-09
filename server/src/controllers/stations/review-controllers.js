import Review from "../../models/stations/Review.js";
import Station from "../../models/stations/Station.js";

export const createReview = async (req, res, next) => {
  const { stationId } = req.params;
  const { rating, comment } = req.body;

  if (!stationId || !rating || !comment) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const review = await Review.create({
      user: req.user.userId,
      station: stationId,
      rating,
      comment,
    });

    // Update station avg rating
    const reviews = await Review.find({ station: stationId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Station.findByIdAndUpdate(stationId, {
      averageRating: avg.toFixed(1),
    });

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByStation = async (req, res, next) => {
  const { stationId } = req.params;

  if (!stationId) {
    return res.status(400).send("Station ID is required.");
  }

  try {
    const reviews = await Review.find({ station: stationId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
