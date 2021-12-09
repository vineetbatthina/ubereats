import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:3080/graphql"
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
