import React, {Component} from 'react';
import {TouchableOpacity, View, Text, TextInput, Image, Alert} from 'react-native';

class LoginScreen extends Component {

  static navigationOptions = {header:null};

  navigationVar = this.props.navigation;

  userName = "";
  psw = "";

  inputFun = (x, y) => {
    if(y == 0){
      this.userName = x;
    }else{
      this.psw = x;
    }
    console.log(this.userName + "-"+ this.psw);
  }

  async sendRequest() {
    if(this.userName.length == 0 || this.psw == 0){
      Alert.alert('Plotesoni te gjitha Fushat');
    }else{
        const request = await fetch('http://www.mocky.io/v2/5d921799310000e1ac10cdb6', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        jsonAnswer = await request.json();

        if(jsonAnswer.data.output){
          this.navigationVar.navigate('Abc');
        }else{
          Alert.alert('Kontrolloni Nr. e perdoruesit dhe fjalekalimin');
        }
    }
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'space-between', alignItems:'center'}}>

      <Text style={{height:'20%', textAlign:'center', textAlignVertical:'center', fontWeight:'700', fontSize:40, color:'blue'}}>
        MIRESEVINI</Text>

      <TextInput style={{height:'15%', width: '99%', borderWidth: 1, borderRadius: 6, textAlign: 'center', backgroundColor:'white'}}
    		placeholder={'Nr. i Perdoruesit'}
    		onChangeText={(x) => this.inputFun(x,0)}/>

      <TextInput
        style={{height:'15%', width: '99%', borderWidth: 1, borderRadius: 6, textAlign: 'center', backgroundColor:'white'}}
        secureTextEntry={true}
        placeholder={'Fjalëkalimi'}
        onChangeText={(x) => this.inputFun(x,1)}/>

        <TouchableOpacity
          onPress={() => this.sendRequest()}
          style={{height:'15%', width:'99%', alignItems: 'center', justifyContent:'center', borderRadius: 6,
            backgroundColor:'lightgray', borderRadius: 15}}>
          <Text style={{height:'100%', textAlign:'center', textAlignVertical:'center', fontWeight:'700'}}>HYR</Text>
        </TouchableOpacity>

        <Image style={{width:'100%', height:'20%', resizeMode:'contain', alignSelf:'center'}}
          borderRadius={30}
          source={ require('../assets/img_logo.png')}/>
      </View>
    );
  }
}

export default LoginScreen;
