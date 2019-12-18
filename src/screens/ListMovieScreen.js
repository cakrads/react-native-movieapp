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
} from 'react-native';
import {getGlobalList, genreByID} from '../store/actions/movie';
import GlobalStyle from './../theme/style';
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
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitlte] = useState(true);

  useEffect(() => {
    getData(true);
  }, []);

  const getData = async firstInit => {
    let type = 'genre'; //navData.listType;
    let params = {type: type};
    if (type == 'genre') params.with_genres = 28; //navData.genreID;
    // console.log('params', params);
    let title =
      type == 'inTheater'
        ? 'Now Showing'
        : type == 'popular'
        ? 'Popular'
        : dispatch(genreByID(28));
    // : dispatch(genreByID(navData.genreID));
    setTitlte(title);

    try {
      setIsLoading(true);
      await dispatch(getGlobalList(firstInit, params));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error', error);
      Alert.alert(error);
    }
  };

  // ACTION
  const goToDetail = param => {
    console.log('goToDetail', param);
    // props.navigation.navigate('Detail', {data: {movieID: param}});
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{minHeight: deviceHeight}}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getData(true)}
              tintColor={GlobalStyle.danger}
              colors={[GlobalStyle.primary]}
            />
          }>
          <View style={GlobalStyle.container}>
            <Text style={GlobalStyle.titleList}>{title}</Text>
            <ListsCardV4
              data={movieData.globalList.list}
              clickAction={goToDetail}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ListMovieScreen;
