import React, {Component} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';

class AAA extends Component {

  userName;
  psw;
  inputFun = (x, y) => {
    if(y === 0){
      userName = x;
    }else{
      psw = x;
    }
  }

    navigationVar = this.props.navigation;

  render() {
    return (
      <View style={{flex:1}}>
      <Text style={{height:'20%', textAlign:'center', textAlignVertical:'center', fontWeight: '700', fontSize:20}}>SomeText</Text>
      <TextInput style={{height:20, width: '100%', borderWidth: 1, borderRadius: 6, textAlign: 'center', backgroundColor:'white'}}
    		placeholder={'Nr. i Perdoruesit'}
    		onChangeText={(x) => this.inputFun(x,0)}/>

      <TouchableOpacity
        onPress={() => this.navigationVar.navigate('Bnm')}
    		style={{alignItems: 'center', justifyContent:'center', borderRadius: 6, height: '20%', backgroundColor: 'blue'}}>
    	</TouchableOpacity>

      </View>);
    }
}

export default AAA;
