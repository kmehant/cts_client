import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons,MaterialIcons,AntDesign } from 'react-native-vector-icons';
import TeachersC from '../screens/TeachersC';
import StudentsC from '../screens/StudentsC';


const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default class ResolverDash extends React.Component {




  render(){
    return (
      
  <NavigationContainer>
              <BottomTab.Navigator    initialRouteName={INITIAL_ROUTE_NAME}
                      activeColor="white"
                      inactiveColor="lightgrey"
                      
                      barStyle={{ backgroundColor: '#424242',
                    
                      }} >
                      
                    

     
     <BottomTab.Screen
       name="Student"
       component={StudentsC}
       options={{
         title: 'Students',
         
         fontFamily:'open-sans-bold',
         tabBarIcon: ({ color}) => <AntDesign name="team"  color={color} size={24}/>,
       }}
     />
     
     <BottomTab.Screen
       name="Teacher"
       component={TeachersC}
       options={{
         title: 'Teachers',
         fontFamily:'open-sans-bold',
         tabBarIcon: ({color }) => <AntDesign name="team"  color={color}  size={24} />,
       }}
     />

    
   </BottomTab.Navigator>
    </NavigationContainer>
    );
  }
}

