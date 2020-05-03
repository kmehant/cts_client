import * as React from 'react';
import { Card, Button, CheckBox } from 'react-native-elements';
import { Platform, Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import Cards from '../components/card'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import Dialog from "react-native-dialog";
import ResolvedComponent from './ResolvedComponent';
import *as Animatable from 'react-native-animatable';

export default class TeachersComp extends React.Component {


  constructor(props) {
    super(props);
    global.c_id = -1;
    global.c_text = "";

    this.state = {
      loading: false,
      emaildid: '',
      data: [],
      exp: '',
      is_r: false,
      is_v: 1,
      compid: -1,
      dialogVisible: false
    };
  }

  comp = async () => {
    this.setState({
      loading: true
    })
    let t = await AsyncStorage.getItem('token');
    console.log(t);



    if (t == '[object Object]' || t == '') {

      Alert.alert('Authentication Failure', 'Please login again!');
      this.setState({
        loading: false
      })
      return;
    }

    let str = '';
    str = "https://cts-server.herokuapp.com/tcomplaints/" + t;

    fetch(str, {

    })
      .then((resp) => {
        return resp.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading: false,
          data: jsonData
        })


      })
      .catch((e) => {
        console.log(e);
      })

    }

    invalidFunc = async () => {
      this.setState({
        loading: true
      })
      let t = await AsyncStorage.getItem('token');
      console.log(t);
      console.log(global.c_text);


      if (t == '[object Object]' || t == '') {

        Alert.alert('Authentication Failure', 'Please login again!');
        this.setState({
          loading: false
        })
        return;
      }

      if (this.state.exp.trim() == "")
      {
        this.setState({
          dialogVisible: false
        })
        Alert.alert('CTS', 'Please add some explanation.');
        this.setState({
          loading: false
        });
        return;
      }
      else {
      let str = '';
      let cid = global.c_id;
      str = "https://cts-server.herokuapp.com/complaints/u/" + cid + "/" + t;

      fetch(str, {
        headers: {
          exp: this.state.exp,
          is_resolved: 1,
          is_valid: 0
        }
      })
        .then((resp) => {
          return resp.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          this.setState({
            loading: false
          });
          Alert.alert(
            'Success', 'Complaint has been closed!',
            [
              { text: 'OK', onPress: () => this.comp() }
            ],
            { cancelable: false }
          );
          this.setState({
            dialogVisible: false,
            exp: '',
    
          });
          global.c_id = -1;
                })
        .catch((e) => {
          console.log(e);
          Alert.alert('Failed', 'Server might be down, please try sometime later')
          this.setState({
            loading: false
          });
          global.c_id = -1; 

        })
      }
    }
    resolveFunc = async () => {
      this.setState({
        loading: true
      })
      let t = await AsyncStorage.getItem('token');
      console.log(t);

      if (this.state.exp.trim() == "")
      {
        this.setState({
          dialogVisible: false
        })
        Alert.alert('CTS', 'Please add some explanation.');
        this.setState({
          loading: false
        });
        return;
      }
      else{

      if (t == '[object Object]' || t == '') {

        Alert.alert('Authentication Failure', 'Please login again!');
        this.setState({
          loading: false
        })
        return;
      }

      let str = '';
      console.log(global.cid);
      let cid = global.c_id;
      str = "https://cts-server.herokuapp.com/complaints/u/" + cid + "/" + t;

      fetch(str, {
        headers: {
          exp: this.state.exp,
          is_resolved: 1,
          is_valid: 1
        }
      })
        .then((resp) => {
          return resp.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          this.setState({
            loading: false          });
            Alert.alert(
              'Success', 'Complaint has been closed!',
              [
                { text: 'OK', onPress: () => this.comp() }
              ],
              { cancelable: false }
            );      
            this.setState({
            dialogVisible: false,
            exp: '',
    
          });
          global.c_id = -1;
        })
        .catch((e) => {
          console.log(e);
          Alert.alert('Failed', 'Server might be down, please try sometime later')
          this.setState({
            loading: false          });
            this.setState({
              dialogVisible: false,
              exp: '',
      
            });
            global.c_id = -1;

        })
      }
    }

    getEmail = async () => {
      let em = await AsyncStorage.getItem('email');

      this.setState({ emailid: em });
    }

    cancelDialog = () => {
      this.setState({
        dialogVisible: false,
        exp: '',

      });
      global.c_id = -1;
    }

    componentDidMount() {
      this.getEmail();
    }


default() {
    this.setState({
      compid: ""
    });
    console.log(this.state.compid)
  }
  handler(compid, compText) {
    console.log("passed:"+ compid);
    this.setState({
      dialogVisible: true

    });
    global.c_id = compid;
    global.c_text = compText;
  }




  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Close Complaint</Dialog.Title>
            <Dialog.Description>
            Description: {global.c_text}
          </Dialog.Description>
            <Dialog.Input onChangeText={text => this.setState({ exp: text })}
              multiline={true}
              underlineColorAndroid='transparent'
              placeholder='Please give your explanation here.'
            >
            </Dialog.Input>

            <Dialog.Button label="Cancel" onPress={this.cancelDialog} />
            <Dialog.Button label="Invalid" style={styles.tagsd1} onPress={this.invalidFunc} />
            <Dialog.Button label="Resolve" style={styles.tagsd2} onPress={this.resolveFunc} />
          </Dialog.Container>
        </View>
        <Card
          title='NIT Andhra Pradesh CTS'>
          <Text style={{ marginBottom: 10, alignSelf: 'center', fontSize: 15 }}>
            {this.state.emailid}
          </Text>
          <TouchableOpacity style={styles.tags1} onPress={this.comp}>
            <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>Fetch Complaints</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.MainContainer}>

          <Card title=" Complaints">
          <View style={styles.viewStyle}>
        <View style ={styles.searchbar}>
        <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText= {this.fun}     // write your search code here
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="   Search Here"
        />
        </Animatable.View>
        </View>
        </View>
            {



           
              this.state.data.map((u, i) => {


                return (
                  <View key={i} style={styles.loginBtn}>
                    <Cards>
                      <View style={{ margin: 7 }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Text style={{ fontFamily: 'open-sans-bold' }}>  {u[9]}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                          <Text style={{ fontFamily: 'open-sans-bold' }}>Complaint :</Text>
                          <Text style={{ marginLeft: 5 }}>{u[5]}</Text>
                        </View>


                        <View style={{ margin: 5 }}>

                          <Text style={{ fontFamily: 'open-sans-bold', marginBottom: 5 }}>Tags :</Text>



                          <View style={{ flexDirection: 'row' }}>

                            {u[6].match(/Academics/g) ? <TouchableWithoutFeedback onPress={this.handle}>
                              <View style={{
                                backgroundColor: "#e87d7d", marginLeft: 2,
                                padding: 3, borderRadius: 8
                              }}>
                                <Text style={{ marginLeft: 5 }}>{u[6].match(/Academics/g)}</Text>
                              </View>
                            </TouchableWithoutFeedback> : null}



                            {u[6].match(/Hostel/g) ? <TouchableWithoutFeedback onPress={this.handle}>
                              <View style={{
                                backgroundColor: "#94f092", marginLeft: 10,
                                padding: 3, borderRadius: 8
                              }}>
                                <Text style={{ marginLeft: 5 }}>{u[6].match(/Hostel/g)}</Text>
                              </View>
                            </TouchableWithoutFeedback> : null}


                            {u[6].match(/Mess_Food/g) ? <TouchableWithoutFeedback onPress={this.handle}>
                              <View style={{
                                backgroundColor: "#92d1f0", marginLeft: 10,
                                padding: 3, borderRadius: 8
                              }}>
                                <Text style={{ marginLeft: 5 }}>{u[6].match(/Mess_Food/g)}</Text>
                              </View>
                            </TouchableWithoutFeedback> : null}


                            {u[6].match(/Others/g) ? <TouchableWithoutFeedback onPress={this.handle}>
                              <View style={{
                                backgroundColor: "#d6d57c", marginLeft: 10,
                                padding: 3, borderRadius: 8
                              }}>
                                <Text style={{ marginLeft: 5 }}>{u[6].match(/Others/g)}</Text>
                              </View>
                            </TouchableWithoutFeedback> : null}

                            {u[6] === "" ? <Text>  No tags </Text> : null}
                          </View>
                        </View>


                      </View>




                      <TouchableOpacity style={styles.tags2} onPress={() => { this.handler(u[4], u[5]) }}>

                        <Text style={{ alignSelf: "center", fontFamily: "open-sans-bold", fontSize: 15, color: 'white' }}>Resolve</Text>

                      </TouchableOpacity>

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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
    backgroundColor: "#424242"
  },
  input: {
    fontSize: 15,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    borderRadius: 10
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  tags1: {
    margin: 5,
    padding: 10,
    backgroundColor: "#e87d7d",
    borderRadius: 8
  },
  tagsd1: {
    margin: 5,
    padding: 10,
    backgroundColor: "#e87d7d",
    borderRadius: 8,
    textDecorationColor: 'white',
    color: 'white'
  },
  textInputStyle: {
    height: 40,
    width:'100%',
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: 'red',
    borderRadius:10,
    fontFamily:'open-sans-bold',
    backgroundColor: '#FFFFFF',
  },
  tags2: {
    margin: 5,
    padding: 10,
    backgroundColor: "#94f092",
    borderRadius: 8
  },
  tagsd2: {
    margin: 5,
    padding: 10,
    backgroundColor: "#94f092",
    borderRadius: 8,
    textDecorationColor: 'white',
    color: 'white'
  },
  tags3: {
    margin: 5,
    padding: 10,
    backgroundColor: "#92d1f0",
    borderRadius: 8
  },
  tags4: {
    margin: 5,
    padding: 10,
    backgroundColor: "#d6d57c",
    borderRadius: 8
  },
  authContainer: {

    alignContent: 'center',
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#424242',
  },
  mainContainer: {
    alignContent: 'center',
    width: '100%',
    height: 800,
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#424242',
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
