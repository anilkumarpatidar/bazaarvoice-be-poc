import { BazaarvoiceDeviceReviewSchema, Photo, Result } from '../../schema/deviceReviewSchema';
import {
  deviceReviewModelSchema,
  deviceReviewItemModelSchema,
  secondaryRatingSchema,
  reviewCommentsIdSchema,
  devicePhotoViewModelSchema,
} from '../../schema/devceReviewUIModel';

function convert(data: BazaarvoiceDeviceReviewSchema): deviceReviewModelSchema {
  console.log(data);
  const deviceReviewUIData = {
    limit: data.Limit,
    offset: data.Offset,
    totalReviewsCount: data.TotalResults,
    overallRatingRange: getOverallRatingRange(data),
    //featuredReview: DeviceReviewItemViewModel,
    //featuredReview:  getFeaturedReview(),
    reviews: getDeviceReview(data),
    //ratingDistributions: Type.Array(RatingDistributionViewModel),
    ratingDistributions: null,
    //secondaryAverageRatings: Type.Array(SecondaryRatingViewModel),
    //secondaryAverageRatings: getSecondaryAverageRatings(),
    hasErrors: data.HasErrors,
  };

  return deviceReviewUIData;
}

function getFeaturedReview() {}

function getSecondaryAverageRatings() {}

function getDeviceReview(data: BazaarvoiceDeviceReviewSchema) {
  const results = data.Results;
  const deviceReviews: deviceReviewItemModelSchema[] = [];
  results.forEach((result: Result) => {
    const deviceReviewItem = {
      id: result.Id,
      userName: result.UserNickname ? result.UserNickname : 'Anonymous',
      lastModificationTime: result.SubmissionTime,
      title: result.Title ? result.Title : '',
      cardText: result.ReviewText ? result.ReviewText : '',
      negativeFeedbackCount: result.TotalNegativeFeedbackCount,
      positiveFeedbackCount: result.TotalPositiveFeedbackCount,
      rating: result.Rating,
      ratingRange: result.RatingRange,
      originallyPostedByLabel: result.IsSyndicated ? result.SyndicationSource.Name : '',
      secondaryRatings: getSecondaryRating(result),
      commentIds: getCommentsIds(result),
      photos: getReviewPhotos(result),
    };
    deviceReviews.push(deviceReviewItem);
  });
  return deviceReviews;
}

function getReviewPhotos(result: Result) {
  const devicePhotoViewModel: devicePhotoViewModelSchema[] = [];
  if (!!result.Photos) {
    result.Photos.forEach((photo) => {
      const photoObj = {
        id: photo.Id,
        caption: photo.Caption,
        sizes: getPhotoSizes(photo),
      };
      devicePhotoViewModel.push(photoObj);
    });
  }
  return devicePhotoViewModel;
}

function getPhotoSizes(photo: Photo) {
  const photoRecord: Record<string, string> = {};
  photoRecord[photo.Sizes.large.Id] = photo.Sizes.large.Url;
  photoRecord[photo.Sizes.normal.Id] = photo.Sizes.normal.Url;
  photoRecord[photo.Sizes.thumbnail.Id] = photo.Sizes.thumbnail.Url;
  return photoRecord;
}

function getCommentsIds(result: Result): reviewCommentsIdSchema[] {
  const reviewCommentsIds: reviewCommentsIdSchema[] = [];
  if (!!result.CommentIds) {
    result.CommentIds.forEach((id) => {
      reviewCommentsIds.push(id);
    });
  }
  return reviewCommentsIds;
}

function getSecondaryRating(result: Result): secondaryRatingSchema[] | null {
  const secondaryRatings: secondaryRatingSchema[] = [];
  if (!!result.SecondaryRatings && !!result.SecondaryRatings.Value) {
    const secondaryRatingsValue = {
      name: result.SecondaryRatings.Value.Id,
      value: result.SecondaryRatings.Value.Value ?? 0,
      valueRange: result.SecondaryRatings.Value.ValueRange,
    };

    secondaryRatings.push(secondaryRatingsValue);
  }
  return secondaryRatings;
}

//actual value need to set
function getOverallRatingRange(data: BazaarvoiceDeviceReviewSchema) {
  const product = getreviewStatistics(data);
  return 0;
}

function getreviewStatistics(data: BazaarvoiceDeviceReviewSchema) {
  if (data.Includes && data.Includes.Products) {
    return data.Includes.Products;
  }
  return null;
}

export default convert;
