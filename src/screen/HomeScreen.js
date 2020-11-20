import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native'
import {
    Header,
    Left,
    Right,
    Thumbnail,
    Icon
} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'

const data = [
    {name:'creditcard', type:'AntDesign', text:'Credit'},
    {name:'food-variant', type:'MaterialCommunityIcons', text:'Variant'},
    {name:'food-fork-drink', type:'MaterialCommunityIcons', text:'Recipe'},
    {name:'location-pin', type:'Entypo', text:'Location'},
    {name:'shopping-cart', type:'Entypo', text:'Cart'},
    {name:'pizza', type:'MaterialCommunityIcons', text:'Pizza'},
    {name:'hamburger', type:'MaterialCommunityIcons', text:'Burger'},
    {name:'more-horizontal', type:'Feather', text:'More'},

]

const urlAlternatif = 'https://images.unsplash.com/photo-1600271644420-f2a77271b6f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'

const HomeScreen = (props) => {
    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()
    const [dataRestos, setDataRestos] = useState([])
    const [username, setUserName] = useState('')

    useEffect(()=>{
        Axios.get('https://developers.zomato.com/api/v2.1/search?start=1&count=10&sort=rating', {
            headers:{ 
                "user-key":"75c807b16bfc5ab281251b596eead964" 
            } 
        }).then((res)=>{
            // console.log(res.data.restaurants)
            setDataRestos(res.data.restaurants)
            // console.log(res.data.restaurants[0].restaurant.name)
            // AsyncStorage.getItem('username')
            // .then((val)=>{
            //     if (val !== null) {
            //         setUserName(val)
            //     }
            // }).catch(err=>{
            //     console.log(err)
            // })
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onToDetailsPress=(item)=>{
        console.log(item)
        props.navigation.navigate('Details', {data: item})
    }

    const renderNamaUser=()=>{
        AsyncStorage.getItem('username')
        .then((val)=>{
            if (val !== null) {
                dispatch({type:'LOGIN', payload: val})
                setLoading(false)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const renderIcon=()=>{
        return data.map((val,index)=>{
            return (
                <View key={index} style={{flexBasis:'25%', paddingHorizontal:20, paddingTop:20, justifyContent:'center', alignItems:'center',}}>
                    <View style={{
                        width:50, 
                        height:50, 
                        borderRadius:25, 
                        borderWidth:1, 
                        borderColor:'tomato', 
                        justifyContent:'center', 
                        alignItems:'center',
                    }}
                    >
                        <Icon name={val.name} type={val.type} style={{color:'tomato', fontSize:40}}/>
                    </View>
                    <View style={{}}>
                        <Text style={{fontSize:10}}>{val.text}</Text>
                    </View>
                </View>
            )
        })
    }

    const renderResto=()=>{
        return dataRestos.map((val, index)=>{
            return (
                <View key={index} style={{flexBasis:'50%', padding:5}}>
                    <TouchableWithoutFeedback onPress={()=>onToDetailsPress(val)}>
                        <Thumbnail square source={{uri:val.restaurant.featured_image ? val.restaurant.featured_image : urlAlternatif }} style={{height:180, width:'100%'}}/>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:'row', paddingLeft:12, paddingTop:10}}>
                        <Icon name='star' type='Entypo' style={{color:'yellow', fontSize:10}}/>
                        <Text style={{fontSize:12}}>  {val.restaurant.user_rating.aggregate_rating}</Text>
                    </View>
                    <View style={{paddingLeft:10, paddingVertical:10}}>
                        <Text style={{fontSize:15, fontWeight:'900'}}>{val.restaurant.name}</Text>
                    </View>
                </View>
            )
        })
    }


    return ( 
        <View style={{flex:1}}>
            <StatusBar backgroundColor={'tomato'} barStyle={'light-content'}/>
            <Header style={{backgroundColor:'tomato', paddingHorizontal:10}}>
                <Left >
                    <Icon name='ticket-account' type='MaterialCommunityIcons' style={{color:'white'}}/>
                    
                </Left>
                <Right>
                    <Text style={{color:'white', fontSize:20}}>Hallo {Auth.username}</Text>
                </Right>
            </Header>
            <View style={{ flexDirection:'row', flexWrap:'wrap', backgroundColor:'white', paddingBottom:20}}>
                {renderIcon()}
            </View>
            <ScrollView>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    {renderResto()}
                </View>
            </ScrollView>
        </View>
     );
}
 
export default HomeScreen;