import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { getDeviceReviews, getDeviceReviewsWithImages } from '../services/bazaarvoice-api';
import { FastifyInstance } from 'fastify';
import { DeviceReviewModel } from '../schema/devceReviewUIModel';

function deviceDetailsRouter(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
  server.get('/getDeviceReviews/:productId', { schema: DeviceReviewModel }, getDeviceReviews);
  server.get('/getDeviceReviewsWithImages/:productId', { schema: DeviceReviewModel }, getDeviceReviewsWithImages);
}

export default deviceDetailsRouter;
