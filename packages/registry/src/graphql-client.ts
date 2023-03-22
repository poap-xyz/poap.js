import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://explorer.poap.tech/v1/graphql';

const client = new GraphQLClient(endpoint, {
  headers: {
    // Add any headers if needed
  },
});

export const graphqlRequest = async (
  query: string,
  variables?: Record<string, unknown>
): Promise<any> => {
  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
