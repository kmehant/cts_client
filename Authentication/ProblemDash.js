import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons,MaterialIcons,AntDesign } from 'react-native-vector-icons';
import ReslovedScreen from '../screens/ReslovedScreen';
import AddScreen from '../screens/AddScreen';
import MyComplaintsScreen from '../screens/MyComplaintsScreen';


const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default class ProblemDash extends React.Component {




  render(){
    return (
      
  <NavigationContainer>
              <BottomTab.Navigator    initialRouteName={INITIAL_ROUTE_NAME}
                      activeColor="white"
                      inactiveColor="lightgrey"
                      
                      barStyle={{ backgroundColor: '#424242',
                    
                      }} >
                      
                    

     
     <BottomTab.Screen
       name="Add"
       component={AddScreen}
       options={{
         title: 'Add',
         
         fontFamily:'open-sans-bold',
         tabBarIcon: ({ color}) => <AntDesign name="upload"  color={color} size={24}/>,
       }}
     />
     
     <BottomTab.Screen
       name="Resloved"
       component={ReslovedScreen}
       options={{
         title: 'Resloved',
         fontFamily:'open-sans-bold',
         tabBarIcon: ({color }) => <AntDesign name="check"  color={color}  size={24} />,
       }}
     />
      <BottomTab.Screen
       name="MyComplaints"
       component={MyComplaintsScreen}
       options={{
         title: 'My Complaints',
         tabBarIcon:  ({ color}) => (
           <AntDesign name='book'  color={color} size={24} />
         ),
           
        
       }}
     />
    
   </BottomTab.Navigator>
    </NavigationContainer>
    );
  }
}

