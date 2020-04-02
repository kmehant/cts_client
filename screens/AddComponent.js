import * as React from 'react';
import {Card, Button}  from 'react-native-elements';
import { Platform,Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';

export default class AddComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        emailid: '',
        data: '',
        loading: false,
        at:'Academics',
        ht:'Hostel',
        ot:'Other',
        mt:'Mess Food'
    };
}
a = () => {
if (this.state.at == 'Academics' )
{
  this.setState({
    at: 'Selected'
  })
}
else {
  this.setState({
    at: 'Academics'
  })
}
}

h = () => {
  if (this.state.ht == 'Hostel' )
  {
    this.setState({
      ht: 'Selected'
    })

  }
  else {
    this.setState({
      ht: 'Hostel'
    })
  }
  }
  m = () => {
    if (this.state.mt == 'Mess Food' )
    {
      this.setState({
        mt: 'Selected'
      })
    }
    else {
      this.setState({
        mt: 'Mess Food'
      })
    }
    }

    o = () => {
      if (this.state.ot == 'Other' )
      {
        this.setState({
          ot: 'Selected'
        })
      }
      else {
        this.setState({
          ot: 'Other'
        })
      }
      }   
pushC = async () => {
  this.setState({
    loading:true
  })
  let ts = '';
  if (this.state.at == "Selected")
  {
    ts+= "Academics;";
  }
  if (this.state.ht == "Selected")
  {
    ts+= "Hostel;";
  }
  if (this.state.mt == "Selected")
  {
    ts+= "Mess_Food;";
  }
  if (this.state.ot == "Selected")
  {
    ts+="Other;";
  }


   if (this.state.data == ''){
    Alert.alert('Failed','Please fill the fields');
    this.setState({
      loading:false
    })
    return;
  }
  let token = await AsyncStorage.getItem('token');
  if (token == '[object Object]')
  {
    Alert.alert('Authentication Failure', 'Please login again!');
    this.setState({
      loading:false
    })
    return;
  }
  let type = await AsyncStorage.getItem('type');
  if (type == 'Student')
  str = "https://cts-server.herokuapp.com/sfiles/"+token;
  else if (type == 'Teacher')
  str = "https://cts-server.herokuapp.com/tfiles/"+token;

  fetch(str, {
    headers: {
      data: this.state.data,
      tags: ts
    }
  })
      .then((resp)=>{ return resp.text();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading:false
        })
        Alert.alert("Success", "Your complaint has been successfully dispatched :)")
          
      })
      .catch((e)=>{
          console.log(e);
      })



}
  componentDidMount() {
    AsyncStorage.getItem('email').then((email) => {
        if(email){
            this.setState({emailid: email});
        }
    });
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
</Card>
<Card    style={styles.mainContainer}>
          <ScrollView>
          <TextInput
            style={styles.input}
            value={this.state.data}
            placeholder='Write your complaint here.'
            onChangeText={text=>this.setState({data:text})}
            multiline={true}
            underlineColorAndroid='transparent'
    />
          <Text style={{color:'black',fontSize: 20, color: 'grey', marginTop: 10}}>Tags:</Text>
    <View style= {{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>

         <TouchableOpacity style={styles.tags1} onPress={this.a}>
          <Text style={{color:'black',fontSize: 15}}>{this.state.at}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tags2} onPress={this.h}>
          <Text style={{color:'black',fontSize: 15}}>{this.state.ht}</Text>
        </TouchableOpacity>
        </View>
        <View style= {{flexDirection: 'row', justifyContent:'center'}}>
        <TouchableOpacity style={styles.tags3} onPress={this.m}>
          <Text style={{color:'black',fontSize: 15}}>{this.state.mt}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tags4} onPress={this.o}>
          <Text style={{color:'black',fontSize: 15}}>{this.state.ot}</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.pushC}>
          <Text style={{color:'black',fontSize: 20}}>Post</Text>
        </TouchableOpacity>
</ScrollView>
  </Card>
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
    height:50,
    alignItems:"center",
    justifyContent:"center",
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
