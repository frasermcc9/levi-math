import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GQLSchemaIntrospectionJson } from '@levi-math/gql';
import { withScalars } from 'apollo-link-scalars';
import { buildClientSchema, IntrospectionQuery } from 'graphql';
import { DateTime } from 'luxon';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}\nPath: ${path}\n`,
        locations
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env['NX_GQL_ENDPOINT'],
});

const schema = buildClientSchema(
  GQLSchemaIntrospectionJson as unknown as IntrospectionQuery
);

const scalarsLink = withScalars({
  schema,
  typesMap: {
    DateTime: {
      serialize: (dt: DateTime) => {
        return dt.toUTC().toISO();
      },
      parseValue: (dt: string) => {
        const dateTime = DateTime.fromISO(dt).toLocal();
        return dateTime;
      },
    },
  },
});

const gqlClient = new ApolloClient({
  link: scalarsLink.concat(httpLink).concat(errorLink),
  cache: new InMemoryCache({}),
});

export { gqlClient };
