import { ApolloProvider } from '@apollo/client';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/test';
import Auth from './layout/Auth';
import { IRoute, routes } from './router/config';
import { client } from './utils/apolloClient';

function App() {
  console.log('app')
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<p>loading...</p>}>
        <Router>
          <Switch>
            {
              routes.map((route: IRoute) => {
                const { path, component } = route
                return <Route key={path} path={path} component={component}></Route>
              })
            }
          </Switch>
        </Router>
      </Suspense>
    </ApolloProvider>
  );
}

export default App;
