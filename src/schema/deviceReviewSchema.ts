export interface BazaarvoiceDeviceReviewSchema {
  Limit: number;
  Offset: number;
  TotalResults: number;
  Locale: string;
  Results: Result[];
  Includes: Includes;
  HasErrors: boolean;
  Errors: ReviewError[];
}

export interface ReviewError{
  Message: string,
  Code: string
}

export interface Includes {
  Products: Products;
  ProductsOrder: string[];
  Comments: Comments[];
}

export interface Comments {
  Id: number;
  Title: string;
  ReviewText: string;
  UserNickname: string;
  SubmissionTime: string;
  TotalNegativeFeedbackCount: number;
  TotalPositiveFeedbackCount: number;
}

export interface Products {
  [key: string]: Product;
}

export interface Product {
  Description: string;
  ImageUrl: string;
  Name: string;
  Id: string;
  CategoryId: string;
  Active: boolean;
  Disabled: boolean;
  AttributesOrder: any[];
  ReviewIds: any[];
  ModelNumbers: any[];
  EANs: any[];
  StoryIds: any[];
  ISBNs: any[];
  Attributes: AdditionalFields;
  UPCs: any[];
  Brand: AdditionalFields;
  QuestionIds: any[];
  ManufacturerPartNumbers: any[];
  ProductPageUrl: null;
  FamilyIds: any[];
  BrandExternalId: null;
  FilteredReviewStatistics: FilteredReviewStatistics;
  ReviewStatistics: FilteredReviewStatistics;
}

export interface AdditionalFields {}

export interface FilteredReviewStatistics {
  RatingDistribution: RatingDistribution[];
  HelpfulVoteCount: number;
  FirstSubmissionTime: Date;
  LastSubmissionTime: Date;
  ContextDataDistributionOrder: string[];
  ContextDataDistribution: ContextDataDistribution;
  AverageOverallRating: number;
  RecommendedCount: number;
  NotRecommendedCount: number;
  TotalReviewCount: number;
  RatingsOnlyReviewCount: number;
  NotHelpfulVoteCount: number;
  SecondaryRatingsAveragesOrder: string[];
  SecondaryRatingsAverages: SecondaryRatings;
  FeaturedReviewCount: number;
  OverallRatingRange: number;
  TagDistributionOrder: any[];
  TagDistribution: AdditionalFields;
}

export interface ContextDataDistribution {
  Age: ReadReviewsClass;
  Gender: ReadReviewsClass;
  IncentivizedReview: ReadReviewsClass;
  ReadReviews: ReadReviewsClass;
}

export interface ReadReviewsClass {
  Id: string;
  Values: ValueElement[];
  Label: string;
}

export interface ValueElement {
  Count: number;
  Value: string;
  ValueLabel: string;
}

export interface RatingDistribution {
  RatingValue: number;
  Count: number;
}

export interface SecondaryRatings {
  Value?: SecondaryRatingsValue;
}

export interface SecondaryRatingsValue {
  Id: string;
  AverageRating?: number;
  ValueRange: number;
  MinLabel: null;
  MaxLabel: null;
  DisplayType: string;
  Label: string;
  Value?: number;
  ValueLabel?: null;
}

export interface Result {
  Id: string;
  CID: string;
  SourceClient: string;
  Badges: Badges;
  BadgesOrder: string[];
  LastModeratedTime: Date;
  LastModificationTime: Date;
  ProductId: string;
  OriginalProductName: string;
  ContextDataValuesOrder: string[];
  ClientResponses: ClientResponse[];
  UserLocation: string;
  AuthorId: string;
  ContentLocale: string;
  IsFeatured: boolean;
  TotalInappropriateFeedbackCount: number;
  TotalClientResponseCount: number;
  TotalCommentCount: number;
  Photos: Photo[];
  Rating: number;
  IsRatingsOnly: boolean;
  IsRecommended: boolean;
  Helpfulness: number;
  TotalFeedbackCount: number;
  TotalNegativeFeedbackCount: number;
  TotalPositiveFeedbackCount: number;
  ModerationStatus: string;
  SubmissionTime: string;
  ReviewText: string;
  Title: string;
  UserNickname: string;
  ContextDataValues: ContextDataValues;
  TagDimensionsOrder: any[];
  CampaignId: null;
  AdditionalFields: AdditionalFields;
  Cons: null;
  SecondaryRatings: SecondaryRatings;
  InappropriateFeedbackList: any[];
  SecondaryRatingsOrder: string[];
  ProductRecommendationIds: any[];
  RatingRange: number;
  SubmissionId: null;
  CommentIds: any[];
  Videos: Video[];
  TagDimensions: AdditionalFields;
  AdditionalFieldsOrder: any[];
  Pros: null;
  IsSyndicated: boolean;
  SyndicationSource: SyndicationSource;
}

export interface SyndicationSource {
  Name: string;
}

export interface Badges {
  incentivizedReview?: Expert;
  Expert?: Expert;
  Staff?: Expert;
  top10?: Expert;
}

export interface Expert {
  ContentType: string;
  Id: string;
  BadgeType: string;
}

export interface ClientResponse {
  Department: string;
  Response: string;
  ResponseType: string;
  ResponseSource: string;
  Name: string;
  Date: Date;
  SourceClientName: string;
}

export interface ContextDataValues {
  Age?: ContextDataValuesAge;
  IncentivizedReview?: ContextDataValuesAge;
  Gender?: ContextDataValuesAge;
}

export interface ContextDataValuesAge {
  Value: string;
  Id: string;
  ValueLabel: string;
  DimensionLabel: string;
}

export interface Photo {
  Sizes: Sizes;
  Id: string;
  SizesOrder: SizesOrder[];
  Caption: null | string;
}

export interface Sizes {
  normal: Large;
  thumbnail: Large;
  large: Large;
}

export interface Large {
  Id: SizesOrder;
  Url: string;
}

export enum SizesOrder {
  Large = 'large',
  Normal = 'normal',
  Thumbnail = 'thumbnail',
}

export interface Video {
  VideoId: string;
  VideoHost: string;
  VideoThumbnailUrl: null;
  VideoIframeUrl: string;
  Caption: null;
  VideoUrl: string;
}
