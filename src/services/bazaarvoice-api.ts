import axios, { AxiosResponse } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import dotenv from 'dotenv';
import { BazaarvoiceDeviceReviewSchema } from '../schema/deviceReviewSchema';
import { convert, convertError, reviewWithImageConvert } from './converter/bazaarvoice-review-converter';

dotenv.config();

const getDeviceReviews = async (req: FastifyRequest, reply: FastifyReply) => {
  const reviewUrl: string = process.env.BAZAARVOICE_REVIEW_URL || '';
  const apiKey: string = process.env.PASS_KEY || '';
  const reviewResponse: AxiosResponse<BazaarvoiceDeviceReviewSchema> = await axios.get(reviewUrl, {
    params: {
      apiversion: 5.4,
      passkey: apiKey,
      Filter: ['ProductId:data-gen-moppq9ekthfzbc6qff3bqokie', 'HasPhotos:eq:true'],
      Include: 'Products',
      FilteredStats: 'Reviews',
    },
  });

  const featuredReviewResponse: AxiosResponse<BazaarvoiceDeviceReviewSchema> = await axios.get(
    reviewUrl,
    {
      params: {
        apiversion: 5.4,
        passkey: apiKey,
        Filter: 'ProductId:data-gen-moppq9ekthfzbc6qff3bqokie',
        Include: 'Products,Comments',
        FilteredStats: 'Reviews',
        Sort: 'Helpfulness:desc,SubmissionTime:desc',
      },
    },
  );

  const uiData = convert(reviewResponse.data, featuredReviewResponse.data);

  return reply.send(uiData);
};

const getDeviceReviewsWithImages = async (req: FastifyRequest, reply: FastifyReply) => {
  const reviewWithImageUrl: string = process.env.BAZAARVOICE_REVIEW_URL || '';
  const apiKey: string = process.env.PASS_KEY || '';
  const reviewWithImageData: AxiosResponse<BazaarvoiceDeviceReviewSchema> = await axios.get(
    reviewWithImageUrl,
    {
      params: {
        apiversion: 5.4,
        passkey: apiKey,
        Filter: ['ProductId:data-gen-moppq9ekthfzbc6qff3bqokie', 'HasPhotos:eq:true'],
        Include: 'Products,Comments',
        Stats: 'Reviews',
        Sort: 'Helpfulness:desc,SubmissionTime:desc',
        Limit: 10,
        Offset: 0,
      },
    },
  );
  const deviceReview = convert(reviewWithImageData.data, reviewWithImageData.data);

  const deviceReviewWithImage = reviewWithImageConvert(deviceReview);
  reply.send(deviceReviewWithImage);
};

export { getDeviceReviews, getDeviceReviewsWithImages };
