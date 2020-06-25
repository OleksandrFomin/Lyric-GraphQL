import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost"; // interacts with the GraphQL server(makes request and stores the data)
import { ApolloProvider } from "@apollo/react-hooks"; //connects ApolloClient to React (similar to Provider from react-redux)
import SongList from "./components/SongList";
import CreateSong from "./components/CreateSong";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const client = new ApolloClient({});

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={SongList} />
      <Route exact path="/song/new" component={CreateSong} />
    </Switch>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Root />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
