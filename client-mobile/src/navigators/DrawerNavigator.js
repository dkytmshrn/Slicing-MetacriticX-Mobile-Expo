import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/HomeScreen';
import DetailScreen from '../screen/DetailScreen';
import MovieScreen from '../screen/MovieScreen';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

const screenDrawerOptions = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: 'white',
  headerTitle : null,
  headerName: null,
};

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      screenOptions={{
        headerShown: false,
        headerTitle: null,
        drawerStyle: {
          backgroundColor: 'white',
          width: '100%',
        },
      }}
    >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ ...screenDrawerOptions }}
        />
        <Drawer.Screen
          name="Movie"
          component={MovieScreen}
          options={{ ...screenDrawerOptions }}
        />
        <Drawer.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            ...screenDrawerOptions,
            drawerLabel: () => null,
            drawerItemStyle: { opacity: 0, height: 0 }
          }}
        />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});