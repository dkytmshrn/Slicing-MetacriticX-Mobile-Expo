import { Card, Text } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function HomeCard({ movie }) {
  const [status, setStatus] = useState('');
  const [ratingStyle, setRatingStyle] = useState(styles.ratingBad);

  useEffect(() => {
    if (movie.rating > 75) {
      setStatus('Excellent Movie!');
      setRatingStyle(styles.ratingGood);
    } else if (movie.rating >= 50) {
      setStatus('Good Movie!');
      setRatingStyle(styles.ratingMedium);
    } else {
      setStatus('Bad Movie!');
      setRatingStyle(styles.ratingBad);
    }
  }, [movie.rating]);

  return (
    <View>
        <Card containerStyle={styles.container}>
            <View style={[styles.outerImageContainer]}>
                <View style={[styles.cardContainer, ratingStyle]}>
                    <Card.Image source={{ uri: movie.imgUrl }} style={styles.card} />
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={styles.titleInsideContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.genre}>{movie.Genre.name}</Text>
                </View>
            </View>
            <View style={styles.ratingContainer}>
                <View style={styles.statusContainer}>
                <Text style={styles.statusTitle}>M E T A S C O R E</Text>
                <Text style={styles.statusMovie}>{status}</Text>
                </View>
                <View style={[styles.scoreContainer, ratingStyle]}>
                <Text style={styles.scoreBox}>{movie.rating}</Text>
                </View>
            </View>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(240,240,240,1)',
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden'
  },
  insideContainer: {
    height:300
  },
  cardContainer: {
    marginBottom: 10,
    padding: 15,
    height: 170,
  },
  outerImageContainer: {
    height: 240
  },
  titleContainer: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  titleInsideContainer: {
    height: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  ratingContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    marginTop: 20,
    flexDirection: 'row',
  },
  statusContainer: {
    flex: 3,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 10,
  },
  statusMovie: {
    fontSize: 20,
    fontWeight: '700',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 40,
    height: 70
  },
  scoreBox: {
    fontSize: 30,
    fontWeight: '800',
  },
  card: {
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: 'stretch'
  },
  genre: {
    fontSize: 15,
    color: 'black',
  },
  title: {
    fontWeight: '900',
    fontSize: 25,
  },
  ratingGood: {
    backgroundColor: 'rgba(0, 255, 120, 1)',
  },
  ratingMedium: {
    backgroundColor: 'rgba(255, 160, 0, 1)',
  },
  ratingBad: {
    backgroundColor: 'rgba(255, 0, 119,1)',
  },
});

export default HomeCard;
