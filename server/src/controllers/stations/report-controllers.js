import { redis } from "../../config/redisConnection.js";
import Report from "../../models/stations/Report.js";

// Create report
export const createReport = async (req, res, next) => {
  const { stationId } = req.params;
  const { comment } = req.body;

  if (!stationId || !comment) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const report = await Report.create({
      user: req.user.userId,
      station: stationId,
      comment,
    });

    await redis.del(`station:${stationId}`); // Invalidate cache

    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (error) {
    next(error);
  }
};
