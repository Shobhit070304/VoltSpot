import reviewRepository from '../repositories/review.repository.js';
import stationRepository from '../repositories/station.repository.js';
import { redis } from '../config/redisConnection.js';
import { IReview } from '../models/Review.js';

interface CreateReviewParams {
  stationId: string,
  userId: string,
  rating: number,
  comment: string
}

const create = async ({ stationId, userId, rating, comment }: CreateReviewParams): Promise<IReview> => {
  // Create review
  const review = await reviewRepository.create({
    user: userId as any,
    station: stationId as any,
    rating,
    comment,
  } as any);

  // Calculate average using database aggregation
  const avg = await reviewRepository.calculateAverageRating(stationId);

  // Update station’s avg rating
  await stationRepository.updateAverageRating(stationId, parseFloat(avg.toFixed(1)));

  // Invalidate cache
  try {
    await redis.del(`station:${stationId}`);
    await redis.incr('stations:version');
  } catch (error) {
    // Ignore cache error
  }

  return review;
};

const getByStation = async (stationId: string): Promise<IReview[]> => {
  return reviewRepository.findByStationPopulated(stationId);
};

export default { create, getByStation };
