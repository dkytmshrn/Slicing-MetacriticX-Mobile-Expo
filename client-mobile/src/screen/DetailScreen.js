import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import DrawerHeader from "../components/DrawerHead";
import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import { GET_MOVIE } from "../config/queries";
import YoutubePlayer from "react-native-youtube-iframe"

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params;
  const [status, setStatus] = useState('');
  const [ratingStyle, setRatingStyle] = useState(styles.ratingBad);

  const {
    loading,
    error,
    data
  } = useQuery(GET_MOVIE, {
    variables: {
      getMovieId: id
    }
  });

  const getVideoIdFromUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (data && data.getMovie) {
      if (data.getMovie.rating > 75) {
        setStatus('Excellent Movie!');
        setRatingStyle(styles.ratingGood);
      } else if (data.getMovie.rating >= 50) {
        setStatus('Good Movie!');
        setRatingStyle(styles.ratingMedium);
      } else {
        setStatus('Bad Movie!');
        setRatingStyle(styles.ratingBad);
      }
    }
  }, [data]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return (
        <SafeAreaView>
          <DrawerHeader />
          <View>
            <Text>Something Went Wrong!</Text>
          </View>
        </SafeAreaView>
      );
    }

    if (data && data.getMovie) {
      return (
        <ScrollView>
          <View style={[styles.detailContainer]}>
            <View style={[styles.videoPlayer]}>
              <YoutubePlayer
                height={300}
                play={true}
                videoId={getVideoIdFromUrl(data.getMovie.trailerUrl)}
              />
            </View>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.title]}>{data.getMovie.title}</Text>
            </View>
            <View>
              <Text style={[styles.scoreTitle]}>M E T A S C O R E</Text>
            </View>
            <View style={[styles.scoreContainer]}>
              <View style={[styles.statusContainer]}>
                <Text style={[styles.status]}>{status}</Text>
              </View>
              <View style={[styles.scoreBox]}>
                <Text style={[styles.score, ratingStyle]}>
                  {data.getMovie.rating}
                </Text>
              </View>
            </View>
            <View style={[styles.itemContainer]}>
              <Text style={[styles.itemTitle]}>Summary</Text>
              <Text style={[styles.summary]}>{data.getMovie.synopsis}</Text>
            </View>
            <View style={[styles.itemContainer]}>
              <Text style={[styles.itemTitle]}>Cast</Text>
              {data.getMovie.Casts.map((item) => (
              <View style={styles.castItemContainer} key={item.id}>
                  <Image
                    source={{ uri: item.profilePict }}
                    style={styles.castImage}
                  />
                  <Text style={styles.castName}>{item.name}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.uploader]}>
              <Text>Uploader : {data.getMovie.Author.username}</Text>
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView>
      <DrawerHeader />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailContainer: {
      paddingLeft: 10,
      paddingRight: 10
    },
    titleContainer: {
      marginBottom: 20
    },
    title : {
      fontSize: 30,
      fontWeight: '700',
      borderBottomWidth: 1
    },
    scoreTitle: {
      fontWeight: '300',
      fontSize: 12,
      marginBottom: 20
    },
    scoreContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    statusContainer: {
      justifyContent: 'center',
    },
    status: {
      fontSize: 20,
      fontWeight: '600'
    },
    scoreBox: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    score: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 30,
      fontWeight: '700',
      borderRadius: 10
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
    itemContainer : {
      marginBottom: 30
    },
    itemTitle : {
      fontSize: 20,
      fontWeight: '600',
      borderBottomWidth: 1,
      marginBottom: 20
    },
    summary : {
      fontSize: 20,
    },
    castItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    castImage: {
      width: 100,
      height: 100,
      borderRadius: 25,
      marginRight: 10,
    },
    castName: {
      fontSize: 20,
      fontWeight: "600",
    },
    videoPlayer: {
      marginTop: 10,
      height: 210
    },
    uploader: {
      height : 100,
    }
  });