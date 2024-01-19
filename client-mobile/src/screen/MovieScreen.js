import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import DrawerHeader from "../components/DrawerHead";
import { FlatList } from "react-native-gesture-handler";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";

export default function MovieScreen({ navigation }) {
    const {
        loading,
        error,
        data
    } = useQuery(GET_MOVIES)
    
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
        {loading? <ActivityIndicator size="large"/> : <View>
          <View style={styles.headContainer}>
            <Text style={[styles.screenTitle]}>MOVIES</Text>
            <Text style={[styles.screenSubTitle]}>Find your next captivating movie moment</Text>
          </View>
          <View style={[styles.headContainer]}>
            <View style={[styles.subHeadContainer]}>
              <Text style={[styles.headTitle]}>All Movie</Text>
            </View>
          </View>
          <View style={[styles.flatListContainer]}>
            <FlatList
                data={data.getMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <MovieCard movie={item} />
                )}
            />
          </View>
        </View>
        }
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },
    subHeadContainer: {
      borderBottomWidth: 1,
    },
    headTitle: {
      fontSize: 20,
      marginBottom: 5,
      fontWeight: '700'
    },
    screenTitle: {
      fontSize: 50,
      fontWeight: '900'
    },
    screenSubTitle: {
      fontSize: 15,
      marginBottom: 20
    },
    flatListContainer: {
        marginBottom: 60
    }
  });