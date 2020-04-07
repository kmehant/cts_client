import * as React from 'react';
import {Card, Button, CheckBox}  from 'react-native-elements';
import { Platform,Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';

export default class TeachersComp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emaildid: '',
      data:[],
      exp:'',
      is_r: 0,
      is_v: 1
    };
}


comp = async () => {
  this.setState({
    loading:true
  })
  let t = await AsyncStorage.getItem('token');
  console.log(t);


  if (t == '[object Object]' || t==''  )
  {
    Alert.alert('Authentication Failure', 'Please login again!');
    this.setState({
      loading:false
    })
    return;
  }

  let str = '';
  str = "https://cts-server.herokuapp.com/tcomplaints/"+t;
  
  fetch(str, {

  })
      .then((resp)=>{ return resp.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading:false,
          data: jsonData
        })

          
      })
      .catch((e)=>{
        this.setState({
          loading:false,
          data: jsonData
        })
        Alert.alert('Server is down', 'Please retry sometime later!');

          console.log(e);
      })

}


getEmail = async () => {
  let em = await AsyncStorage.getItem('email');
  this.setState({emailid: em});
}

 componentDidMount() {
      this.getEmail();


      

  


}
  render(){
    if(this.state.loading){
      return( 
        <View style={ styles.loader}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
    )}

  return (
            <View style={styles.container}>
<Card
  title='NIT Andhra Pradesh CTS'>
  <Text style={{marginBottom: 10, alignSelf: 'center', fontSize: 15}}>
    Welcome, {this.state.emailid}
  </Text>
  <TouchableOpacity style={styles.tags1} onPress={this.comp}>
          <Text style={{color:'white',fontSize: 15, alignSelf:'center'}}>Fetch Complaints</Text>
        </TouchableOpacity>
</Card>

<View style={styles.MainContainer}>
 
<Card title="Your Complaints">
  {
    this.state.data.map((u, i) => {
      return (
        <View key={i} style={styles.loginBtn}>
          <Text style={styles.name}>{u[5]}</Text>
          <Text style={styles.name}>{u[6]}</Text>
          <Text style={styles.name}>{u[9]}</Text>
          <TextInput
            style={styles.input}
            placeholder='Anything to say regarding the resolution'
            onChangeText={text=>this.setState({exp:text})}
            multiline={true}
            underlineColorAndroid='transparent'
    />
<CheckBox
  center
  title='Resolved'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={this.state.is_r}
  onPress={() => this.setState({is_r: !this.state.is_r})}
/>



        </View>
      );
    })
  }
</Card>

</View>



    </View>
  );
}
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e6e6e',
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
    backgroundColor: "#424242"
   },
  input: {
    fontSize: 15,
    borderColor:'grey',
    borderWidth:1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius:10
},
  loginBtn:{
    width:"100%",
    backgroundColor:"#d1d1d1",
    borderRadius:5,
    marginTop:10,
    marginBottom:10
  },
  tags1:{
    margin: 5,
    padding: 10,
    backgroundColor:"#e87d7d",
    borderRadius:8
    },
    tags2:{
      margin: 5,
      padding: 10,
      backgroundColor:"#94f092",
      borderRadius:8
      },
      tags3:{
        margin: 5,
        padding: 10,
        backgroundColor:"#92d1f0",
        borderRadius:8
        },
        tags4:{
          margin: 5,
          padding: 10,
          backgroundColor:"#d6d57c",
          borderRadius:8
          },
  authContainer: {

    alignContent:'center',
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor:'#424242',
  },
  mainContainer: {
    alignContent:'center',
    width: '100%',
    height: 800,
    maxWidth: 400,
    padding: 20,
    backgroundColor:'#424242',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
