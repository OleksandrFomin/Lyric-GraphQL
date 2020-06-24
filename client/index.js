import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost"; // interacts with the GraphQL server(makes request and stores the data)
import { ApolloProvider } from "@apollo/react-hooks"; //connects ApolloClient to React (similar to Provider from react-redux)
import SongList from "./components/SongList";

const client = new ApolloClient({});

const Root = () => {
  return (
    <div>
      <SongList />
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
