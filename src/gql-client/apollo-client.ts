import { ApolloClient, InMemoryCache } from "@apollo/client";
import { headers, SchemaURL } from "./constants";

const apolloClient = new ApolloClient({
  uri: SchemaURL,
  cache: new InMemoryCache(),
  headers: headers,
});

export default apolloClient;
