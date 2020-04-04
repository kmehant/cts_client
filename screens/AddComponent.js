import * as React from 'react';
import { Card, Button } from 'react-native-elements';
import { Platform, Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Ionicons, FontAwesome5 } from 'react-native-vector-icons';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';


export default class AddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: '',
      data: '',
      loading: false,
      at: 'Academics',
      ht: 'Hostel',
      ot: 'Other',
      mt: 'Mess Food',
      flag1: false, flag2: false, flag3: false, flag4: false,
      TextValue: '0',
      defaultAnimationDialog: false
    };
  }

  a = () => {
    this.setState({
      flag1: !this.state.flag1


    })

  }

  h = () => {
    this.setState({
      flag2: !this.state.flag2


    })

  }
  m = () => {
    this.setState({
      flag3: !this.state.flag3


    })

  }

  o = () => {
    this.setState({
      flag4: !this.state.flag4


    })

  }
  alertmessage1 = () => {
    Alert.alert(
      'Instructions :',
      '1.Do not use Unparliamentary words \n \n2.Submit Constructive Complaints\n \n3.Complaint cannot be backrolled after committing it',

    )

  };

  alertmessage = () => {
    Alert.alert(
      'Proceed to Submit ?',
      ' ',
      [
        { text: 'CANCEL', onPress: () => { } },
        { text: 'Proceed', onPress: () => this.pushC() }
      ],
      { cancelable: false }
    )

  };
  DofindLength = (data) => {
    var Value = data.length.toString();

    this.setState({ TextValue: Value });
    if (this.state.TextValue === '') {
      this.setState({ TextValue: '0' })
    }
  }
  handleChangeText = data => this.setState({ data }, this.DofindLength(data));

  pushC = async () => {
    this.setState({
      loading: true
    })

    let ts = '';
    if (this.state.flag1 == true) {
      ts += "Academics/";
    }
    if (this.state.flag2 == true) {
      ts += "Hostel/";
    }
    if (this.state.flag3 == true) {
      ts += "Mess_Food/";
    }
    if (this.state.flag4 == true) {
      ts += "Others/";
    }


    if (this.state.data == '') {
      Alert.alert('Failed', 'Please fill the fields');
      this.setState({
        loading: false
      })
      return;
    }
    let token = await AsyncStorage.getItem('token');
    if (token == '[object Object]') {
      Alert.alert('Authentication Failure', 'Please login again!');
      this.setState({
        loading: false
      })
      return;
    }
    let type = await AsyncStorage.getItem('type');
    if (type == 'Student')
      str = "https://cts-server.herokuapp.com/sfiles/" + token;
    else if (type == 'Teacher')
      str = "https://cts-server.herokuapp.com/tfiles/" + token;

    fetch(str, {
      headers: {
        data: this.state.data,
        tags: ts
      }
    })
      .then((resp) => {
        return resp.text();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading: false
        })
        Alert.alert("Success", "Your complaint has been successfully dispatched :)")

      })
      .catch((e) => {
        console.log(e);
      })


  }
  componentDidMount() {
    AsyncStorage.getItem('email').then((email) => {
      if (email) {
        this.setState({ emailid: email });
      }
    });
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
      <View style={styles.contianerm}>
        <Card
          title='NIT Andhra Pradesh CTS'>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 name="user-alt" size={25} color="black" />
            <Text style={{ marginLeft: 30, marginTop: 5, alignContent: 'center', fontSize: 17 }}>
              {this.state.emailid}
            </Text>
          </View>

        </Card>



        <Card style={styles.mainContainer}>
          <ScrollView>
            <Text style={{ flexDirection: 'row', alignContent: 'flex-end' }}>       {this.state.TextValue}/200</Text>
            <TextInput
              style={styles.input}
              value={this.state.data}
              placeholder='Write your complaint here.'
              onChangeText={this.handleChangeText}

              multiline={true}
              underlineColorAndroid='transparent'
              maxLength={200}
            />

            <View style={{ alignSelf:'center',paddingTop: 10, flex:1, flexDirection:'row' }}>
              <Ionicons name="ios-pricetags" size={30} />         
                  <Text style= {{fontSize: 20, marginLeft: 10}}>Tags:</Text>
  
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >

              <TouchableOpacity style={styles.tags1} onPress={this.a}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {this.state.flag1 ? <Text>
                    <Icon name="check" size={30} color="#900" />
                  </Text> : null}
                  <Text style={{ color: 'black', fontSize: 15 }}>Academics</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style={styles.tags2} onPress={this.h}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {this.state.flag2 ? <Text>
                    <Icon name="check" size={30} color="#900" />
                  </Text> : null}
                  <Text style={{ color: 'black', fontSize: 15 }}>Hostel</Text>
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.tags3} onPress={this.m}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {this.state.flag3 ? <Text>
                    <Icon name="check" size={30} color="#900" />
                  </Text> : null}
                  <Text style={{ color: 'black', fontSize: 15 }}>Mess_Food</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style={styles.tags4} onPress={this.o}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {this.state.flag4 ? <Text>
                    <Icon name="check" size={30} color="#900" />
                  </Text> : null}

                  <Text style={{ color: 'black', fontSize: 15 }}>Others</Text>
                </View>
              </TouchableOpacity>

            </View>


            <TouchableOpacity style={styles.post} onPress={this.alertmessage}>
              <Text style={{ color: 'black', fontSize: 20 }}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={this.alertmessage1}>
              <Text style={{ color: 'white', fontSize: 20 }}>Rules</Text>
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
  containerm: {
    flex: 1,
    height: Dimensions.get('window').height,
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#e6807c",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  post: {
    width: "100%",
    backgroundColor: "#d1d1d1",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  tags1: {
    margin: 5,
    padding: 10,
    backgroundColor: "#e87d7d",
    borderRadius: 8
  },
  tags2: {
    margin: 5,
    padding: 10,
    backgroundColor: "#94f092",
    borderRadius: 8
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
