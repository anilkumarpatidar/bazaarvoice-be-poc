import axios, { AxiosResponse } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import dotenv from 'dotenv';
import { BazaarvoiceDeviceReviewSchema } from '../schema/deviceReviewSchema';
import { convert, convertError } from './converter/bazaarvoice-review-converter';

dotenv.config();

const getDeviceReviews = async (req: FastifyRequest, reply: FastifyReply) => {
  const reviewUrl: string = process.env.BAZAARVOICE_REVIEW_URL || '';
  const featuredReviewUrl: string = process.env.BAZAARVOICE_FEATURED_REVIEW_URL || '';
  const reviewResponse: AxiosResponse<BazaarvoiceDeviceReviewSchema> = await axios.get(reviewUrl, {
    params: {
      apiversion: 5.4,
      passkey: 'caB45h2jBqXFw1OE043qoMBD1gJC8EwFNCjktzgwncXY4',
      Filter: ['ProductId:data-gen-moppq9ekthfzbc6qff3bqokie', 'HasPhotos:eq:true'],
      Include: 'Products',
      FilteredStats: 'Reviews',
    },
  });

  const featuredReviewResponse: AxiosResponse<BazaarvoiceDeviceReviewSchema> = await axios.get(
    featuredReviewUrl,
    {
      params: {
        apiversion: 5.4,
        passkey: 'caB45h2jBqXFw1OE043qoMBD1gJC8EwFNCjktzgwncXY4',
        Filter: 'ProductId:data-gen-moppq9ekthfzbc6qff3bqokie',
        Include: 'Products,Comments',
        FilteredStats: 'Reviews',
        Sort: 'Helpfulness:desc,SubmissionTime:desc',
      },
    },
  );

  console.log(`========================${featuredReviewResponse}`);

  const uiData = convert(reviewResponse.data, featuredReviewResponse.data);

  return reply.send(uiData);
};

const getDeviceReviewsWithImages = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ msg: 'HI getDeviceReviewsWithImages' });
};

export { getDeviceReviews, getDeviceReviewsWithImages };
