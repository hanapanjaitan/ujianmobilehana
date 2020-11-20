import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import TabRoot from './TabRoot'
import LoginScreen from './../screen/LoginScreen'

const Stack = createStackNavigator()

const StackRoot = () => {
    return ( 
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TabRoot' component={TabRoot}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
        </Stack.Navigator>
    );
}
 
export default StackRoot;
