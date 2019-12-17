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
import {getGlobalList} from '../store/actions/movie';
import LoadingIndicator from '../components/loading/LoadingActivity';
import GlobalStyle from './../theme/style';
import ListsCard from './../components/list/ListsCard';

const ListMovieScreen = props => {
  const dispatch = useDispatch();
  const movieData = useSelector(state => state.movieReducer);
  const [isLoading, setIsLoading] = useState(true);
  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    getData(true);
  }, []);

  const getData = async firstInit => {
    let type = props.listType ? props.listType : 'genre';
    let params = {type: type};
    if (type == 'genre')
      params.with_genres = props.genreID ? props.genreID : 28;
    console.log('params', params);
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
      console.log("goToDetail", param);
    // props.navigation.navigate('Detail', {data: {movieID: param}});
  };

  return (
    <>
      <SafeAreaView>
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
            <ListsCard
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
