import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';

import Card from '../components/card';
export default class Login extends React.Component {

students = () => {
  this.props.navigation.navigate('Students');
}

teachers = () => {
  this.props.navigation.navigate('Teachers');
}


resolver = () => {
  this.props.navigation.navigate('Resolvers');
}

  render(){

    return (
      
      <View style={{flex:1,alignItems:'center', backgroundColor:'#242424'}}>
       <View style={{flex:0.5 ,alignItems:'center',justifyContent:'center',marginTop:100}}>
         <ImageBackground source={require('../assets/images/splash.png')} style={styles.backgroundImage} ></ImageBackground>
         </View> 
        <Card    style={styles.authContainer}>
          <ScrollView>
          <Text style= {{color:'white', fontSize: 25, marginBottom: 10}}>Who are you?</Text>
         <TouchableOpacity style={styles.loginBtn} onPress={this.students}>
          <Text style={{color:'black',fontSize: 20}}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.teachers}>
          <Text style={{color:'black',fontSize: 20}}>Teaching Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.resolver}>
          <Text style={{color:'black',fontSize: 20}}>Resolver</Text>
        </TouchableOpacity>

</ScrollView>
  </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {

    alignContent:'center',
    width: '90%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor:'#424242'
  },
  inputView:{
    width:"100%",
    backgroundColor:"white",
    borderRadius:10,
    height:50,
    marginBottom:10,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"100%",
    backgroundColor:"#d1d1d1",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242"
   },
  backgroundImage:{
    width:200,
       height:200,
       paddingVertical:100
       }
});