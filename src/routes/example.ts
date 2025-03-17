import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

// Example schema
const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  age: Type.Number({ minimum: 0 }),
});

// Response schema
const GetUserResponseSchema = Type.Object({
  user: UserSchema,
});

// Define route with schema validation
export default async function (fastify: FastifyInstance) {
  // Use TypeBox for type provider
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

  server.route({
    method: 'GET',
    url: '/users/:id',
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: GetUserResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const userId = request.params.id;
      // Fetch user from database (mocked)
      const user = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      };

      return { user };
    },
  });
}
