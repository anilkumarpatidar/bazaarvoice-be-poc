import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import getDeviceReviews from '../services/bazaarvoice-api';
import { FastifyInstance } from 'fastify';
import {DeviceReviewModel} from '../schema/devceReviewUIModel'

function deviceDetailsRouter(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
  server.get('/getDeviceReviews',{schema: DeviceReviewModel}, getDeviceReviews);
}

export default deviceDetailsRouter;
