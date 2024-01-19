import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigators/DrawerNavigator'
import { ApolloProvider } from '@apollo/client';
import client from './src/config/client';

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}