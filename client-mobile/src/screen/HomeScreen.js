import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ActivityIndicator} from "react-native";
import { StyleSheet } from "react-native";
import PagerView from 'react-native-pager-view';
import HomeCard from '../components/HomeCard';

import DrawerHeader from "../components/DrawerHead";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";

export default function HomeScreen({ navigation }) {
    const {
        loading,
        error,
        data
    } = useQuery(GET_MOVIES)
    console.log(loading, error, data);
    if (error) {
        <SafeAreaView>
            <DrawerHeader />
            <View>
                <Text>Something Went Wrong!</Text>
            </View>
        </SafeAreaView>
    }
    return (
      <SafeAreaView>
        <DrawerHeader />
        <View style={styles.container}>
          <View>
            <View style={styles.insideContainer}>
              <Text style={styles.header}>New and Notable</Text>
            </View>
            {loading? <ActivityIndicator size="large"/> :
                <PagerView style={styles.pagerView} initialPage={0}>
                {data.getMovies.map((movie, idx) => (
                    <View key={movie.id}>
                    <HomeCard movie={movie} />
                    </View>
                ))}
                </PagerView>
            }
            <View style={styles.insideContainer}>
              <Text style={styles.header}>Latest Movies</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 15,
    },
    insideContainer: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginTop: 30,
    },
    header: {
      fontWeight: '800',
      color: 'black',
      fontSize: 20,
      marginBottom: 10,
    },
    pagerView: {
      height: 480,
    },
  });