import reviewRepository from '../repositories/review.repository.js';
import stationRepository from '../repositories/station.repository.js';
import { redis } from '../config/redisConnection.js';

const create = async ({ stationId, userId, rating, comment }) => {
  // Create review
  const review = await reviewRepository.create({
    user: userId,
    station: stationId,
    rating,
    comment,
  });

  // Get all reviews for average calculation
  const reviews = await reviewRepository.findByStation(stationId);

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // Update station’s avg rating
  await stationRepository.updateAverageRating(stationId, avg.toFixed(1));

  // Invalidate cache
  await redis.del(`station:${stationId}`);

  return review;
};

const getByStation = async (stationId) => {
  return reviewRepository.findByStationPopulated(stationId);
};

export default { create, getByStation };
