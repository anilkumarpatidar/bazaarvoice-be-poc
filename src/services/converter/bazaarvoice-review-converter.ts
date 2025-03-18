import {
  BazaarvoiceDeviceReviewSchema,
  Photo,
  Product,
  Result,
  ReviewError,
} from '../../schema/deviceReviewSchema';
import {
  deviceReviewModelSchema,
  deviceReviewItemModelSchema,
  secondaryRatingSchema,
  reviewCommentsIdSchema,
  devicePhotoViewModelSchema,
  reviewCommentSchema,
  ratingDistributionViewModelSchema,
  ratingSecondaryRatingViewModelSchema,
  reviewErrorModelSchema,
} from '../../schema/devceReviewUIModel';

function convertError(data: BazaarvoiceDeviceReviewSchema){
  const errorData = {
    hasErrors: data.HasErrors,
    errors: getErrors(data.Errors)
  }
}


function convert(
  data: BazaarvoiceDeviceReviewSchema,
  featuredReviewData: BazaarvoiceDeviceReviewSchema,
): deviceReviewModelSchema {
  
    const deviceReviewUIData = {
      limit: data.Limit,
      offset: data.Offset,
      totalReviewsCount: data.TotalResults,
      overallRatingRange: getOverallRatingRange(data),
      featuredReview: getFeaturedReview(featuredReviewData),
      reviews: getDeviceReview(data),
      ratingDistributions: getRatingDistributions(data),
      secondaryAverageRatings: getSecondaryAverageRatings(data),
      hasErrors: data.HasErrors,
      allComments: getAllComments(data),
    };

    return deviceReviewUIData;
  
}

function getErrors(errors: ReviewError[]){
  const errorList : reviewErrorModelSchema[]=[];
  errors.forEach(error => {
    const reviewError={
      message: error.Message,
      code: error.Code
    }
    errorList.push(reviewError);
  });
  return errorList;
}

function getFeaturedReview(featuredReviewData: BazaarvoiceDeviceReviewSchema) {
  const result: Result = featuredReviewData.Results[0];
  const deviceFeaturedReviewItem = {
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

  return deviceFeaturedReviewItem;
}

function getRatingDistributions(data: BazaarvoiceDeviceReviewSchema) {
  const ratingDistributions: ratingDistributionViewModelSchema[] = [];
  if (!!data.Includes.Products) {
    const reviewStatistics = data.Includes.Products[getProductKey(data)].FilteredReviewStatistics;
    if (!!reviewStatistics) {
      reviewStatistics.RatingDistribution.forEach((ratingDistribution) => {
        const ratingDistributionObj = {
          ratingValue: ratingDistribution.RatingValue,
          count: ratingDistribution.Count,
        };
        ratingDistributions.push(ratingDistributionObj);
      });
    }
  }
  return ratingDistributions;
}

function getAllComments(data: BazaarvoiceDeviceReviewSchema) {
  const reviewComments: reviewCommentSchema[] = [];
  if (data.Includes && data.Includes.Comments) {
    data.Includes.Comments.forEach((comment) => {
      const reviewComment = {
        id: comment.Id,
        userName: comment.UserNickname ?? 'Anonymous',
        lastModificationTime: comment.SubmissionTime,
        title: comment.Title,
        cardText: comment.ReviewText ?? '',
        negativeFeedbackCount: comment.TotalNegativeFeedbackCount,
        positiveFeedbackCount: comment.TotalPositiveFeedbackCount,
      };
      reviewComments.push(reviewComment);
    });
  }
  return reviewComments;
}

function getSecondaryAverageRatings(data: BazaarvoiceDeviceReviewSchema) {
  const secondaryRatings: ratingSecondaryRatingViewModelSchema[] = [];
  if (!!data.Includes.Products) {
    const reviewStatistics = data.Includes.Products[getProductKey(data)].FilteredReviewStatistics;
    if (!!reviewStatistics) {
      const secondaryRating = reviewStatistics.SecondaryRatingsAverages.Value;
      if (!!secondaryRating) {
        const secondaryRatingObj = {
          name: secondaryRating.Id,
          value: secondaryRating.AverageRating,
          valueRange: secondaryRating.ValueRange,
        };

        secondaryRatings.push(secondaryRatingObj);
      }
    }
  }
  return secondaryRatings;
}

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
  if (data.Includes && data.Includes.Products) {
    return data.Includes.Products[getProductKey(data)].FilteredReviewStatistics.OverallRatingRange;
  }
  return 0;
}

function getProductKey(data: BazaarvoiceDeviceReviewSchema) {
  const productKey: string = data.Includes.ProductsOrder[0];
  return productKey;
}

export {convert, convertError};

