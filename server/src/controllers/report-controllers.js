import Report from "../models/Report.js";

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

    res.status(200).json({ message: "Report submitted successfully", report });
  } catch (error) {
    next(error);
  }
};
