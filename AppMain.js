import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import StackRoot from './src/navigation/StackRoot'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginScreen from './src/screen/LoginScreen'
import SplashScreen from './src/screen/SplashScreen'

const AuthStack = createStackNavigator()

const AuthStackNav=()=>(
    <AuthStack.Navigator headerMode='none'>
        <AuthStack.Screen name='Login' component={LoginScreen}/>
    </AuthStack.Navigator>
)


const AppMain = () => {
    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        AsyncStorage.getItem('username')
        .then((val)=>{
            if (val !== null) {
                dispatch({type:'LOGIN', payload: val})
                setLoading(false)
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    })

    if(loading){
        return (
            <SplashScreen/>
        )
    }

    return (
        <NavigationContainer>
            {
                Auth.isLogin ?
                <StackRoot/>
                :
                <AuthStackNav/>
            }
        </NavigationContainer>
    );
};


export default AppMain;
