import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import LottieView from 'lottie-react-native';

let { geolocation } = navigator;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      latitude: -23.597410772305587,
      longitude: -46.68226607143879,
      latitudeDelta:0.01,
      longitudeDelta:0.001,
    };
  }

  componentDidMount() {

    setTimeout(()=>{
      this.setState({isLoading: false})
    }, 5000)
    geolocation.getCurrentPosition(
      response => {
        response = JSON.parse(JSON.stringify(response));
        let { latitude, longitude } = response.coords;
        this.setState({ latitude, longitude });
        console.log('GEO LOCATION: ', response.coords);
      },
      error => {
        console.log('GEO LOCATION: ', error);
      },
      {
        enableHighAccuracy: true
      }
    );

    let watchID = geolocation.watchPosition(
      response => {
        response = JSON.parse(JSON.stringify(response));
        let { latitude, longitude } = response.coords;
        this.setState({ latitude, longitude });
        console.log('GEO LOCATION: ', response);
      },
      error => {
        console.log('GEO LOCATION ERROR: ', error);
      },
      {
        enableHighAccuracy: true
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

          <LottieView source={require('./src/LottieFiles/loading.json')} autoPlay loop />

        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1000
          }}
        >
          V
        </Text>
        <MapView
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '100%' }}
          onRegionChange={event => {
            console.log(event);
          }}
        />
      </View>
    );
  }
}
