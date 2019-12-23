import React, {Component} from 'react';
import {connect} from 'react-redux';
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

class ListMovieScreen extends Component {
  constructor(props) {
    super(props);
    navData = this.props.navigation.getParam('data');
    deviceHeight = Dimensions.get('window').height;
  }

  state = {
    isLoadingPull: false,
    isLoadingScrolled: false,
    title: '',
  };

  componentDidMount() {
    this.getData(true);
  }

  initData(type) {
    let title =
      type == 'inTheater'
        ? 'Now Showing'
        : type == 'popular'
        ? 'Popular'
        : this.props.dispatch(genreByID(28));
    // : this.props.dispatch(genreByID(navData.genreID));
    this.setState({title: title});
  }

  async getData(firstInit) {
    let type = 'genre'; //navData.listType;
    let params = {type: type};
    if (type == 'genre') params.with_genres = 28; //navData.genreID;

    if (firstInit) this.initData(type);

    try {
      console.log('getData', new Date().getTime());
      await this.props.dispatch(getGlobalList(firstInit, params));
      console.log('finished');
      this.setState({isLoadingScrolled: false});
      console.log('isLoadingScrolled', this.state.isLoadingScrolled);
      this.setState({isLoadingPull: false});
    } catch (error) {
      this.setState({isLoadingPull: false});
      this.setState({isLoadingScrolled: false});
      console.log('Error', error);
      Alert.alert(error.message);
    }
  }

  // ACTION
  goToDetail() {
    console.log('goToDetail', param);
    // props.navigation.navigate('Detail', {data: {movieID: param}});
  }

  pullToRequest() {
    this.setState({isLoadingPull: true});
    this.getData(true);
  }

  getMoreData(nativeEvent) {
    if (this.isCloseToBottom(nativeEvent)) {
      if (this.state.isLoadingScrolled) return;
      this.setState({isLoadingScrolled: true});
      this.getData(false);
    }
  }

  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  render() {

    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{minHeight: deviceHeight}}
            contentInsetAdjustmentBehavior="automatic"
            onScroll={({nativeEvent}) => {
              this.getMoreData(nativeEvent);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoadingPull}
                onRefresh={() => this.pullToRequest(true)}
                tintColor={GlobalStyle.danger}
                colors={[GlobalStyle.primary]}
              />
            }>
            <View style={GlobalStyle.container}>
              <Text style={GlobalStyle.titleList}>{this.state.title}</Text>
              <ListsCardV4
                data={this.props.movieData.globalList.list}
                clickAction={this.goToDetail}
                actionOnScroll={this.getData}
              />
            </View>
          </ScrollView>

          {this.state.isLoadingScrolled ? (
            <View style={styles.loadingFooter}>
              <LoadingIndicator bg={true} />
            </View>
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loadingFooter: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
});

// export default ListMovieScreen;
export default connect(state => ({
  movieData: state.movieReducer,
}))(ListMovieScreen);
