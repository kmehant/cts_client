import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';

import Card from '../components/card';
export default class Login extends React.Component {
  state={
    email:"",
    pin:"",
    type: "Teacher",
    loading: false
  }

  login = () => {
    this.setState({
      loading: true
    });
    let e = this.state.email;
    let p = this.state.pin;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (e == "" || p == "" || reg.test(e) === false){
    Alert.alert("CTS", "Incorrect credentials");
    this.setState({
      loading: false
    });
   return;  
  }
    str = "https://cts-server.herokuapp.com/login/t?"+"email="+e+"&pin="+p;
    

    fetch(str, {

    })
        .then((resp)=>{
            if (resp.ok && resp.status == 200) // login success
            return "success";
            else if (resp.status == 401){
              console.log(resp.status);
            return "UnAuth";
            }
            else 
            return "Failed";
        })
        .then((jsonData) => {
          console.log(jsonData);
            if(jsonData == "Failed"){
              
                Alert.alert("Failed","Server might be down please try again later");

            }
            else if (jsonData == "success"){
              // store values and navigate to dasboard
           AsyncStorage.setItem('email', this.state.email);
           AsyncStorage.setItem('token', this.state.pin);
           AsyncStorage.setItem('type', this.state.type);
           this.props.navigation.navigate('ProblemDash');

          //  alert(jsonData);
            }
            else{
              Alert.alert("Authentication Failed","Invalid credentials");

            }

            this.setState({
              loading: false
            });
        })
        .catch((e)=>{
            console.log(e);
        })

}

getPin = () => {
  this.setState({
    loading: true
  });
  let e = this.state.email;
  let str = "";
  if (e == "" || reg.test(e) === false){
    Alert.alert("CTS", "Please fill NIT Andhra Pradesh email id");
    this.setState({
    loading: false
  });
 return;  
}

  str = "https://cts-server.herokuapp.com/login/t?"+"email="+e;

  fetch(str, {

  })
      .then((resp)=>{
          if (resp.ok && resp.status == 200) // pin success
          return "success";
          else {
            console.log(resp.status);
          return "failed";
          }
      })
      .then((jsonData) => {
        console.log(jsonData);
          if(jsonData == "failed"){
            
              Alert.alert("Authentication Failed","Probably server is down, please try sometime later");

          }
          else if (jsonData == "success"){
            Alert.alert("Success","PIN has been sent to your University email");
          }

          this.setState({
            loading: false
          });
      })
      .catch((e)=>{
          console.log(e);
      })

}
  render(){
    if(this.state.loading){
      return( 
        <View style={ styles.loader}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
    )}
    return (
      
      <View style={{flex:1,alignItems:'center', backgroundColor:'#242424'}}>
       <View style={{flex:0.5 ,alignItems:'center',justifyContent:'center',marginTop:100}}>
         <ImageBackground source={require('../assets/images/ctslogo.png')} style={styles.backgroundImage} ></ImageBackground>
         </View> 
        <Card    style={styles.authContainer}>
          <ScrollView>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.getPin}>
          <Text style={{color:'black',fontSize: 20}}>Get PIN</Text>
        </TouchableOpacity>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="PIN" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({pin:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
          <Text style={{color:'black',fontSize: 20}}>Login</Text>
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
    width:160,
       height:160,
       paddingVertical:100
       }
});