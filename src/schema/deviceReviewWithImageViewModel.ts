import { Static, Type } from '@sinclair/typebox';
import {
    DevicePhotoViewModel,
  DeviceReviewItemViewModel,
} from './devceReviewUIModel';

export const ImageReviewViewModel = Type.Object({
  photo: DevicePhotoViewModel,
  review: DeviceReviewItemViewModel,
});

export type img = Static<typeof ImageReviewViewModel>;

export const DeviceReviewWithImageViewModel = Type.Object({
  offset: Type.Number(),
  imageReviews: Type.Array(ImageReviewViewModel),
});


export type deviceReviewWithImageSchema = Static<typeof DeviceReviewWithImageViewModel>;
export type imageReviewSchema = Static<typeof ImageReviewViewModel>;
export type deviceReviewItemSchema = Static<typeof DeviceReviewItemViewModel>;