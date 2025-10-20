import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import "./styles/global.css";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/query" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </StrictMode>,
);
