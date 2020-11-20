import React from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogoutScreen = () => {
    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    return ( 
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button
                title='Logout'
                onPress={()=>{
                    AsyncStorage.removeItem('username')
                    .then(()=>{
                        dispatch({type:'LOGOUT'})
                    }).catch(err=>{
                        console.log(err)
                    })
                }}
            />
        </View>
     );
}
 
export default LogoutScreen;