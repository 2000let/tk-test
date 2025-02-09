import { ApolloProvider } from "@apollo/client";
import { client } from "@/shared/apolloClient";

export const withProviders = (component: React.ReactNode) => (
  <ApolloProvider client={client}>{component}</ApolloProvider>
);
