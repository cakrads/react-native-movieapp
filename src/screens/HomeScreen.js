import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  getMoviePopular,
  getMovieInTheater,
  getMovieDetail,
  getGenreAll,
} from '../store/actions/movie';

import SimpleCarousel from './../components/carousel/SimpleCarousel';
import HorizontalCard from './../components/card/HorizontalCard';
import HorizontalCardV2 from './../components/card/HorizontalCardV2';
import HorizontalBadge from '../components/badge/HorizontalBadge';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const movieData = useSelector(state => state.movieReducer);

  const deviceHeight = Dimensions.get('window').height;
  const carouselImages = [
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  ];

  useEffect(() => {
    inTheaterMovie();
    popularMovie();
    allGenreMovie();
    // detailMovie();
  }, []);

  const popularMovie = useCallback(async () => {
    try {
      dispatch(getMoviePopular(true));
    } catch (error) {
      console.log('popularMovie: ', error);
      Alert.alert('Something Wrong');
    }
  });

  const inTheaterMovie = useCallback(async () => {
    try {
      dispatch(getMovieInTheater(true));
    } catch (error) {
      console.log('inTheaterMovie: ', error);
      Alert.alert('Something Wrong');
    }
  });

  const allGenreMovie = useCallback(async () => {
    try {
      dispatch(getGenreAll());
    } catch (error) {
      console.log('inTheaterMovie: ', error);
      Alert.alert('Something Wrong Genre');
    }
  });

  // const detailMovie = useCallback(async () => {
  //   try {
  //     dispatch(getMovieDetail(512200));
  //   } catch (error) {
  //     console.log('inTheaterMovie: ', error);
  //     Alert.alert('Something Wrong');
  //   }
  // });
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{minHeight: deviceHeight}}
          contentInsetAdjustmentBehavior="automatic"
          style={{...styles.scrollView}}>
          {/* CAROUSEL */}
          <SimpleCarousel images={carouselImages} />

          <View style={styles.container}>
            {/* IN THEATHER MOVIE */}
            <View style={styles.titleSubPart}>
              <Text style={styles.titleSubPartText}>Now Showing</Text>
              <TouchableOpacity style={styles.titleSubPartButton}>
                <Text>
                  See All{' '}
                  <Ionicons
                    name="md-checkmark-circle"
                    size={32}
                    color="green"
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <HorizontalCardV2 data={movieData.inTheatre.list} />
            {/* END THEATHER MOVIE */}

            {/* POPULAR MOVIE */}
            <View style={styles.titleSubPart}>
              <Text style={styles.titleSubPartText}>Popular Movie</Text>
              <TouchableOpacity style={styles.titleSubPartButton}>
                <Text>
                  See All <Ionicons name="md-checkmark-circle" size={16} />
                </Text>
              </TouchableOpacity>
            </View>
            <HorizontalCard data={movieData.popular.list} />
            {/* END POPULAR MOVIE */}
            
            {/* MOVIE GENRE */}
            <HorizontalBadge data={movieData.genre} />
            {/* END MOVIE GENRE */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleSubPart: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  titleSubPartText: {
    fontSize: 16,
    fontWeight: '700',
  },
  titleSubPartButton: {
    justifyContent: 'flex-end',
    fontSize: 12,
    marginRight: 10,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
