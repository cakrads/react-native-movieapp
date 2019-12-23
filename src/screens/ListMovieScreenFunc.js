import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {getGlobalList, genreByID} from '../store/actions/movie';
import GlobalStyle from './../theme/style';
import LoadingIndicator from './../components/loading/LoadingActivity';
import ListsCard from './../components/list/ListsCard';
import ListsCardV2 from '../components/list/ListsCardV2';
import ListsCardV3 from '../components/list/ListsCardV3';
import ListsCardV4 from '../components/list/ListsCardV4';

const ListMovieScreen = props => {
  // console.log("ListMovieScreen", props.navigation.getParam('data'))
  const navData = props.navigation.getParam('data');

  const dispatch = useDispatch();
  const movieData = useSelector(state => state.movieReducer);
  const deviceHeight = Dimensions.get('window').height;
  const [isLoadingPull, setIsLoadingPull] = useState(true);
  const [isLoadingScrolled, setIsLoadingScrolled] = useState(false);
  const [title, setTitle] = useState(true);

  useEffect(() => {
    getData(true);
  }, []);

  const initData = type => {
    let title =
      type == 'inTheater'
        ? 'Now Showing'
        : type == 'popular'
        ? 'Popular'
        : dispatch(genreByID(28));
    // : dispatch(genreByID(navData.genreID));
    setTitle(title);
  };

  const getData = async firstInit => {
    let type = 'genre'; //navData.listType;
    let params = {type: type};
    if (type == 'genre') params.with_genres = 28; //navData.genreID;

    if (firstInit) initData(type);

    try {
      console.log('getData', new Date().getTime());
      await dispatch(getGlobalList(firstInit, params));
      setIsLoadingScrolled(false);
      console.log('isLoadingScrolled', isLoadingScrolled);
      setIsLoadingPull(false);
    } catch (error) {
      setIsLoadingPull(false);
      setIsLoadingScrolled(false);
      console.log('Error', error);
      Alert.alert(error.message);
    }
  };

  // ACTION
  const goToDetail = param => {
    console.log('goToDetail', param);
    // props.navigation.navigate('Detail', {data: {movieID: param}});
  };

  const pullToRequest = () => {
    setIsLoadingPull(true);
    getData(true);
  };

  const getMoreData = nativeEvent => {
    if (isCloseToBottom(nativeEvent)) {
      if (isLoadingScrolled) return;
      setIsLoadingScrolled(true);
      getData(false);
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{minHeight: deviceHeight}}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={({nativeEvent}) => {
            getMoreData(nativeEvent);
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingPull}
              onRefresh={() => pullToRequest(true)}
              tintColor={GlobalStyle.danger}
              colors={[GlobalStyle.primary]}
            />
          }>
          <View style={GlobalStyle.container}>
            <Text style={GlobalStyle.titleList}>{title}</Text>
            <ListsCardV4
              data={movieData.globalList.list}
              clickAction={goToDetail}
              actionOnScroll={getData}
            />
          </View>
        </ScrollView>

        {isLoadingScrolled ? (
          <View style={styles.loadingFooter}>
            <LoadingIndicator bg={true} />
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loadingFooter: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default ListMovieScreen;
