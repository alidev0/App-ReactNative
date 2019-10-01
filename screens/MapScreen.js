import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';

let lat1, lon1, lat2, lon2, name;

class MapScreen extends Component {

  static navigationOptions = { title: 'Kthehu'};

  getMapCoor = () => {

    lat1 = this.props.navigation.state.params.lat1;
    lon1 = this.props.navigation.state.params.lon1;
    lat2 = this.props.navigation.state.params.lat2;
    lon2 = this.props.navigation.state.params.lon2;
    name = this.props.navigation.state.params.name;
  }

  render() {

    this.getMapCoor();

    return (

      <View style={{flex:1}}>

        <MapView style={{flex:1}}

          initialRegion={{
            latitude: lat1,
            longitude: lon1,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >

          <Marker
            coordinate={{
              latitude: lat1,
              longitude: lon1}}
              title={'Vendodhja Juaj'}
              />

          <Marker
              coordinate={{
                latitude: lat2,
                longitude: lon2}}
                title={'Rruga '+name}
          />

          <Polyline
            coordinates={[
              { latitude: lat1, longitude: lon1 },
              { latitude: lat2, longitude: lon2 },
            ]}
            strokeWidth={3}
          />
        </MapView>

      </View>
    );
  }
}

export default MapScreen;
