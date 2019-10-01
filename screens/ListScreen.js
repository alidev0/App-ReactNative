import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Alert} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

let storeNr;
let streetName = [];
let lat = [];
let lon = [];

let storeOb = [];
let locationOb;
let serverCheck, locationCheck;

class ListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      asd: [1,7],
      firstRender: true};
  };

  navigationVar = this.props.navigation;

  checkLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status == 'granted'){
        try{  locationOb = await Location.getCurrentPositionAsync({});  }
        catch(e){ console.log("catch "+e);  }

        if(typeof locationOb === 'undefined'){
            locationCheck = false;
            Alert.alert('Aktivizo GPS qe App e funksionojë normalisht');
        }else{
          if(serverCheck){
            this.getDistances();
          }
        }
      }else{
          Alert.alert("Disa aspekte te App nuk do te funksionojne nqs nuk jepni lejen e Vendodhjes");
      }
  }

  getDistances = () => {
    for (i=0; i<storeNr; i++) {
      storeOb[i].distanca = this.getDistanceBetween(locationOb.coords.latitude, locationOb.coords.longitude, storeOb[i].lat, storeOb[i].lon);
    }
    locationCheck = true;
  }

  getDistanceBetween = (lat1, lon1, lat2, lon2) => {
    var rlat1 = Math.PI * lat1 / 180;
    var rlat2 = Math.PI * lat2 / 180;
    var rlon1 = Math.PI * lon1 / 180;
    var rlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var rtheta = Math.PI * theta / 180;
    var dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    return dist.toFixed(3);
  }

  getDataFromServer = async () => {

    storeOb = [];

    const request = await fetch('http://www.mocky.io/v2/5d90dcfa3000007800cacff6', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        jsonAnswer = await request.json();

        this.getStoresFromArray(jsonAnswer);
  }

  getStoresFromArray = (JSONOb) => {

    storeNr = JSONOb.data.length;

    for (i=0; i<storeNr; i++) {
      storeOb.push(JSONOb.data[i]);
    }
    serverCheck = true;

    this.orderStoresByStreetName();
  }

  orderStoresByStreetName = () => {
    temp = 'A';
    temp2 = 0;

    while (temp2<storeNr) {
      for (i=0; i<storeNr; i++) {
        if (storeOb[i].rruga.charAt(0) == temp) {
          tempOb = storeOb[i];
          storeOb[i] = storeOb[temp2];
          storeOb[temp2] = tempOb;

          temp2++;
        }
      }
      temp = String.fromCharCode(temp.charCodeAt() + 1);
    }
    this.setState({firstRender:false});
  }

  orderStoresByDistance = () => {
    if(locationCheck){
      smDistanceIn = 0;
      prevSmDistance = 0;

      for (i=0; i<storeNr; i++) {
        smDistance = 999999999.9;
        for (j=0; j<storeNr; j++) {
          if (smDistance>storeOb[j].distanca && storeOb[j].distanca>prevSmDistance) {
            smDistance = storeOb[j].distanca;
            smDistanceIn = j;
          }
        }

        tempOb = storeOb[smDistanceIn];
        storeOb[smDistanceIn] = storeOb[i];
        storeOb[i] = tempOb;

        prevSmDistance = smDistance;
      }
      this.setState({});
    }else{
      this.checkLocation();
    }
  }

  mapBtnPressed = (i) =>{

    if(locationCheck){

      this.navigationVar.navigate('MapSc', {
        'lat1': locationOb.coords.latitude,
        'lon1': locationOb.coords.longitude,
        'lat2': storeOb[i].lat,
        'lon2': storeOb[i].lon,
        'name': storeOb[i].rruga,
      })

    }
  }

  render() {
    this.checkLocation();

    if(this.state.firstRender){
      this.getDataFromServer();
      return(
        <View style={{flex:1}}>
          <Text style={{flex:1, textAlign:'center', textAlignVertical:'center', fontWeight: '700', fontSize:50, color:'blue'}}>
            LOADING...</Text>
        </View>
      );
    }else{
      return (
        <View style={{flex:1, justifyContent:'space-between'}}>
          <Text style={{height:'10%', textAlign:'center', textAlignVertical:'center', fontWeight: '700', fontSize:50, color:'blue'}}>
            DYQANET</Text>
          <View style={{height:'10%', flexDirection: 'row', justifyContent:'space-between', padding:5}}>
            <TouchableOpacity
          		onPress={() => this.orderStoresByStreetName()}
          		style={{width:'47%', height:'100%', backgroundColor:'lightgray', alignItems: 'center', justifyContent:'center', borderRadius: 6}}>
              <Text style={{height:'100%', width:'100%', textAlign:'center', textAlignVertical:'center', fontWeight: '500', fontSize:15}}>
                LISTO SIPAS EMRIT TE RRUGES</Text>
          	</TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.orderStoresByDistance()}
                style={{width:'47%', height:'100%', backgroundColor:'lightgray', alignItems: 'center', justifyContent:'center',
                  borderRadius: 6}}>
                <Text style={{height:'100%', width:'100%', textAlign:'center', textAlignVertical:'center', fontWeight: '500',
                  fontSize:15}}>
                  LISTO SIPAS DISTANCES</Text>
              </TouchableOpacity>
            </View>
            <View style={{height:'75%'}}>
              {
                storeOb.map((x, i)=>{
                  return(
                    <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'space-between',
                      alignItems:'center', padding:5}}
                      key={i}>

                      <Text style={{height:'100%', width:'70%', textAlign:'center', textAlignVertical:'center', fontWeight: '500',
                        fontSize:18}}>{"Rruga "+storeOb[i].rruga} {locationCheck ? "("+storeOb[i].distanca+" km)" : ""}</Text>

                      <TouchableOpacity
                        onPress={() => this.mapBtnPressed(i)}
                        style={{width:'25%', height:'80%', alignItems: 'center', justifyContent:'center', borderRadius: 6,
                          backgroundColor:'lightgray'}}>
                        <Text style={{height:'100%', width:'100%', textAlign:'center', textAlignVertical:'center',
                          fontSize:15}}>Hap në Hartë</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              )
            }
          </View>
        </View>
      );
    }
  }
}

export default ListScreen;
