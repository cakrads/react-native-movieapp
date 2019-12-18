import React, {useEffect, useCallback, useState} from 'react';
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
import GlobalStyle from './../theme/style';

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
import LoadingIndicator from '../components/loading/LoadingActivity';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const movieData = useSelector(state => state.movieReducer);

  const [inTheaterLoading, setInTheaterLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(true);

  const deviceHeight = Dimensions.get('window').height;
  const carouselImages = [
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  ];

  // INIT PAGE DATA
  useEffect(() => {
    inTheaterMovie();
    popularMovie();
    GenrereMovie();
    // detailMovie();
  }, []);

  const popularMovie = useCallback(async () => {
    try {
      setPopularLoading(true);
      await dispatch(getMoviePopular(true));
      setPopularLoading(false);
    } catch (error) {
      setPopularLoading(false);
      console.log('popularMovie: ', error);
      Alert.alert('Something Wrong');
    }
  });

  const inTheaterMovie = useCallback(async () => {
    try {
      setInTheaterLoading(true);
      await dispatch(getMovieInTheater(true));
      setInTheaterLoading(false);
    } catch (error) {
      setInTheaterLoading(false);
      console.log('inTheaterMovie: ', error);
      Alert.alert('Something Wrong');
    }
  });

  const GenrereMovie = useCallback(async () => {
    try {
      setGenreLoading(true);
      await dispatch(getGenreAll());
      setGenreLoading(false);
    } catch (error) {
      setGenreLoading(false);
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
  // END INIT PAGE DATA

  // ACTION
  const goTo = (page, param = {}) => {
    props.navigation.navigate(page, param);
  };

  const goToDetail = param => {
    console.log('goToDetail: ', param);
    props.navigation.navigate('Detail', {data: {movieID: param}});
  };

  const goToList = param => {
    console.log('goToList: ', param);
    props.navigation.navigate('ListMovieScreen', {data: param});
  };

  // SHOW COMPONENT
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{minHeight: deviceHeight}}
          contentInsetAdjustmentBehavior="automatic"
          style={{...styles.scrollView}}>
          {/* CAROUSEL */}
          <SimpleCarousel images={carouselImages} />

          <View style={GlobalStyle.container}>
            {/* IN THEATHER MOVIE */}
            <View style={styles.titleSubPart}>
              <Text style={styles.titleSubPartText}>Now Showing</Text>
              <TouchableOpacity
                style={styles.titleSubPartButton}
                onPress={() => goToList({listType: 'inTheater'})}>
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
            {inTheaterLoading ? (
              <LoadingIndicator />
            ) : (
              <HorizontalCardV2
                data={movieData.inTheatre}
                clickAction={goToDetail}
              />
            )}

            {/* END THEATHER MOVIE */}

            {/* POPULAR MOVIE */}
            <View style={styles.titleSubPart}>
              <Text style={styles.titleSubPartText}>Popular Movie</Text>
              <TouchableOpacity
                style={styles.titleSubPartButton}
                onPress={() => goToList({listType: 'popular'})}>
                <Text>
                  See All <Ionicons name="md-checkmark-circle" size={16} />
                </Text>
              </TouchableOpacity>
            </View>
            {popularLoading ? (
              <LoadingIndicator />
            ) : (
              <HorizontalCard data={movieData.popular} />
            )}
            {/* END POPULAR MOVIE */}

            {/* MOVIE GENRE */}
            {genreLoading ? (
              <LoadingIndicator />
            ) : (
              <HorizontalBadge data={movieData.genre} clickAction={goToList} />
            )}
            {/* END MOVIE GENRE */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
