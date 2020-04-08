import * as React from 'react';
import {Card, Button}  from 'react-native-elements';
import { Platform,Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import Cards from '../components/card'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default class MyComplaintsComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emaildid: '',
      data:[],
      res:true
    };
}


comp = async () => {
  this.setState({
    loading:true
  })
  let t = await AsyncStorage.getItem('token');
  console.log(t);
  let type = await AsyncStorage.getItem('type');
  console.log(type);

  if (t == '[object Object]')
  {
    Alert.alert('Authentication Failure', 'Please login again!');
    this.setState({
      loading:false
    })
    return;
  }

  let str = '';

  if (type == 'Teacher')
  str = "https://cts-server.herokuapp.com/mytcomplaints/"+t;
  else
  str = "https://cts-server.herokuapp.com/myscomplaints/"+t;
  
  fetch(str, {

  })
      .then((resp)=>{ return resp.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading:false,
          data: jsonData,
           
        })

          
      })
      .catch((e)=>{
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
handle=()=> {
  {
    this.state.res=false
  }
  
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
     {this.state.emailid}
  </Text>
  <TouchableOpacity style={styles.tags1} onPress={this.comp}>
          <Text style={{color:'white',fontSize: 15, alignSelf:'center'}}>Fetch Your Complaints</Text>
        </TouchableOpacity>
</Card>

<View style={styles.MainContainer}>
<Card title="Your Complaints">
  {
     
    this.state.data.map((u, i) => {
      
      return (
        
        <View key={i} style={{}} >
          
          <Cards  style={{width:'100%',marginBottom:10}}>
            <View style={{margin:7}}>
            <View style={{flexDirection:'row-reverse'}}>
      <Text   style={{fontFamily:'open-sans-bold'}}>  {u[9]}</Text>
    
      </View>
         <View style={{flexDirection:'row',marginBottom:10}}>
          <Text style={{fontFamily:'open-sans-bold'}}>Complaint :</Text>
          <Text style={{marginLeft:5}}>{u[5]}</Text>
          </View>
         
           
          <View  style={{margin:5}}>
    
          <Text style={{fontFamily:'open-sans-bold',marginBottom:5}}>Tags :</Text>

         

          <View style={{flexDirection:'row'}}>

        { u[6].match(/Academics/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#e87d7d", marginLeft:2,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Academics/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }
          
 

        { u[6].match(/Hostel/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#94f092",marginLeft:10,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Hostel/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }


        { u[6].match(/Mess_Food/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#92d1f0",marginLeft:10,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Mess_Food/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }
        
           
        { u[6].match(/Others/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#d6d57c",marginLeft:10,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Others/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null } 

        {u[6]===""? <Text>  No tags </Text>:null }
</View>
      </View>


         </View>
          </Cards>
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
    height: 1200,
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
