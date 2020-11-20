import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Input, Icon, Button} from 'react-native-elements'
import {useDispatch, useSelector} from 'react-redux'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({navigation}) => {
    const [isusernamefilled, setisusernamefilled] = useState(false)
    const [ispasswordfilled, setispasswordfilled] = useState(false)
    const [secure, setsecure] = useState(true)
    const [flexView, setFlexView] = useState(2)
    const [datauser, setdatauser] = useState({
      username: '',
      password:''
    })
    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    const _keyboardDidShow=()=>{
        setFlexView(5)
    }

    const _keyboardDidHide=()=>{
        setFlexView(2)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);
    
  
    const onInputChangeText=(text)=>{
      if(text){
        setisusernamefilled(true)
      }else{
        setisusernamefilled(false)
      }
      setdatauser({...datauser, username:text})
    }
  
    const onPasswordChangeText=(text)=>{
      if(text){
        setispasswordfilled(true)
      }else{
        setispasswordfilled(false)
      }
      setdatauser({...datauser, password:text})
    }

    
    
    const onLoginPress=()=>{
        AsyncStorage.setItem('username', datauser.username)
        .then(val=>{
            dispatch({type:'LOGIN', payload: datauser.username})
        }).catch(err=>{
            console.log(err)
        })
    }
  
    return (
      // <>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            {/* <View style={{flex:1}}> */}
                <LinearGradient style={{flex:1}} useAngle angle={45} locations={[0.3, 0.9]} colors={['#FE6B8B', '#FF8353']}>
                    <StatusBar backgroundColor='#FF8353' barStyle="light-content" />
                    <View style={{flex:Platform.OS=='ios'?2:1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                          <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                            <Icon
                              name='pizza-slice'
                              type='font-awesome-5'
                              color='white'
                              size={38}
                            />
                            <Text style={{fontSize:40, fontWeight:'bold', color:'white', paddingBottom:8}}>
                                {'  TomatoApp'}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Animatable.View animation='fadeInUpBig' style={[styles.containerStyle, {flex: flexView}]}>
                        {/* <View > */}
                            <Input
                                value={datauser.username}
                                placeholder={'Username'}
                                placeholderTextColor={isusernamefilled?'#FF8E53':'gray'}
                                leftIcon={{type:'font-awesome', name:'user', color:isusernamefilled?'#FF8E53':'gray'}}
                                inputContainerStyle={{borderColor:isusernamefilled?'#FF8E53':'gray'}}
                                inputStyle={{color:'#FE6B8B'}}
                                labelStyle={{color:isusernamefilled?'#FF8E53':'gray'}}
                                onChangeText={onInputChangeText}
                                rightIcon={
                                    isusernamefilled?
                                    <Animatable.View>
                                    <Icon
                                        type='Feather'
                                        name='check-circle'
                                        color='#FF8E53'
                                        size={20}
                                    />
                                    </Animatable.View>
                                    : null
                                }
                            />
                            <Button
                                ViewComponent={LinearGradient}
                                style={{
                                    paddingVertical:5
                                }}
                                linearGradientProps={{
                                    useAngle:true, 
                                    angle:45, 
                                    locations:[0.3, 0.9],
                                    colors:['#FE6B8B', '#FF8353']
                                }}
                                title='Sign In'
                                onPress={onLoginPress}
                            />
                        {/* </View> */}
                    </Animatable.View>
                </LinearGradient>
            {/* </View> */}
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    containerStyle:{
      backgroundColor:'white', 
      borderTopRightRadius:30, 
      borderTopLeftRadius:30,
      paddingHorizontal:20,
      justifyContent:'center'  
    }
    
  });
  
  export default LoginScreen;