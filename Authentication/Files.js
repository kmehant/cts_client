import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import Students from './Students';
import ProblemDash from './ProblemDash';
import Home from './Home';
import Teachers from './Teachers';
import Resolvers from './Resolvers';
import ResolverDash from './ResolverDash';

const Navigator =createStackNavigator({
    Home:Home,
    Students:Students,
    Teachers:Teachers,
    Resolvers:Resolvers
},
{
   defaultNavigationOptions :{
        headerShown:false
    }
});

const switching =createSwitchNavigator({
    navigator:Navigator,
    ProblemDash:ProblemDash,
    ResolverDash:ResolverDash
});

const Appcontainer=createAppContainer(switching);
export default  class Files extends React.Component {
    render(){
        return <Appcontainer />;
    }
}