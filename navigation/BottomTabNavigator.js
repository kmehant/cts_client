/*import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreens from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import InfoScreen from '../screens/InfoScreen';
import InputScreen from '../screens/InputScreen';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons,Fontisto,Ionicons,Entypo,MaterialIcons,AntDesign } from 'react-native-vector-icons';
import { Feather } from '@expo/vector-icons';
//import { Fontisto } from 'react-native-vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route),
    headerStyle:{
      backgroundColor:'orange'
    }
   });


   

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
     
      <BottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          title: 'Inform',
          fontFamily:'open-sans-bold',
          tabBarIcon: ({ color,size }) => <AntDesign name="book"  color={color} size={size}/>,
        }}
      />
      
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color,size}) => <AntDesign name="wechat" color={color}  size={size} />,
        }}
      />
       <BottomTab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          title: 'Dash',
          tabBarIcon:  ({ color, size }) => (
            <Ionicons name='ios-stats' color={color} size={size} />
          ),
            
         
        }}
      />
      <BottomTab.Screen
        name="Input"
        component={InputScreen}
        options={{
          title: 'Input',

          tabBarIcon:  ({ color, size }) => (
            <MaterialIcons name="input" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon:  ({ color, size }) => (
            <Ionicons name='md-cog' color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {

  switch (routeName) {
    case 'Home':
      return 'DashBoard';
    case 'Chat':
      return 'Chat';
    case 'Info':
      return 'Info';
    case 'Input':
      return 'Input';
    case 'Settings':
      return 'Settings';
  }
}
/*function getColor(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'orange';
    case 'Chat':
      return 'pink';
    case 'Info':
      return 'violet';
    case 'Input':
      return 'green';
    case 'Settings':
      return 'red';
  }
}*/
