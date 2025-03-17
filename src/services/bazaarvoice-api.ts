import axios, { AxiosResponse } from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { BazaarvoiceDeviceReviewSchema } from "../schema/deviceReviewSchema";
import convert from "./converter/bazaarvoice-review-converter";

const getDeviceReviews = async (req: FastifyRequest, reply: FastifyReply) => {
  const BAZZARVOICE_URL: string =
    "https://stg.api.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=caB45h2jBqXFw1OE043qoMBD1gJC8EwFNCjktzgwncXY4&Filter=ProductId:data-gen-moppq9ekthfzbc6qff3bqokie&Include=Products&FilteredStats=Reviews&Filter=HasPhotos:eq:true";

  const responseData: AxiosResponse<BazaarvoiceDeviceReviewSchema> =
    await axios.get(BAZZARVOICE_URL);
  const uiData = convert(responseData.data);
  console.log('========================');
  console.log(uiData);
  return reply.send(uiData);
};

export default getDeviceReviews;

function res(
  value: AxiosResponse<any, any>
): AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>> {
  throw new Error("Function not implemented.");
}
