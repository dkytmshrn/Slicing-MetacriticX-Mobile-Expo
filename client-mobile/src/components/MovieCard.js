import { Card } from "react-native-elements"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";

function MovieCard({movie}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Detail', {
              id: movie.id
            })}
        }>
        <Card>
            <View style={styles.cardContainer}>
                <View style={styles.cardImageContainer}>
                    <Card.Image source={{ uri: movie.imgUrl }}/>
                </View>
                <View style={styles.cardDetailsContainer}>
                    <Text style={styles.cardTitle}>{movie.title}</Text>
                    <Text>{movie.synopsis}</Text>
                </View>
            </View>
        </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    cardContainer: {
        flexDirection: 'row'
    },
    cardImageContainer: {
        flex: 3,
        marginRight: 10,
    },
    cardDetailsContainer: {
        flex: 7,
    },
    cardImage : {
        borderRadius: 5
    },
    cardTitle : {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    }
})
export default MovieCard