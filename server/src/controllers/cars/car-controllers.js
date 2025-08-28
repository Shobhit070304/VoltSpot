import EV from "../../models/cars/EV.js";

const fetchCars = async (req, res) => {
  try {
    const evs = await EV.find();
    res.json(evs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching EVs" });
  }
};

export { fetchCars };
