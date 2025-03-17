import { Static, Type } from '@sinclair/typebox';

const SecondaryRatingViewModel = Type.Object({
  name: Type.String(),
  value: Type.Number(),
  valueRange: Type.Number(),
});

export const ReviewCommentsId = Type.Object({
  id: Type.Number(),
});

export const DevicePhotoViewModel = Type.Object({
  id: Type.String(),
  caption: Type.Union([Type.String(), Type.Null()]),
  sizes: Type.Record(Type.String(), Type.String()),
});

export const DeviceReviewItemViewModel = Type.Object({
  id: Type.String(),
  userName: Type.String(),
  lastModificationTime: Type.String(),
  title: Type.String(),
  cardText: Type.String(),
  negativeFeedbackCount: Type.Number(),
  positiveFeedbackCount: Type.Number(),
  rating: Type.Number(),
  ratingRange: Type.Number(),
  originallyPostedByLabel: Type.String(),
  secondaryRatings: Type.Union([Type.Array(SecondaryRatingViewModel), Type.Null()]),
  commentIds: Type.Array(ReviewCommentsId),
  photos: Type.Array(DevicePhotoViewModel),
});

const RatingDistributionViewModel = Type.Object({
  ratingValue: Type.Number(),
  count: Type.Number(),
});

export const DeviceReviewModel = Type.Object({
  limit: Type.Number(),
  offset: Type.Number(),
  totalReviewsCount: Type.Number(),
  overallRatingRange: Type.Number(),
  //featuredReview: Type.Object(DeviceReviewItemViewModel),
  reviews: Type.Array(DeviceReviewItemViewModel),
  ratingDistributions: Type.Union([Type.Array(RatingDistributionViewModel), Type.Null()]),
  //secondaryAverageRatings: Type.Array(SecondaryRatingViewModel),
  hasErrors: Type.Boolean(),
});

export type secondaryRatingSchema = Static<typeof SecondaryRatingViewModel>;
export type deviceReviewModelSchema = Static<typeof DeviceReviewModel>;
export type deviceReviewItemModelSchema = Static<typeof DeviceReviewItemViewModel>;
export type reviewCommentsIdSchema = Static<typeof ReviewCommentsId>;
export type devicePhotoViewModelSchema = Static<typeof DevicePhotoViewModel>;
