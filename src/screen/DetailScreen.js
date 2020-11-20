import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import {
    Header,
    Left,
    Right,
    Thumbnail,
    Icon
} from 'native-base'

const urlAlternatif = 'https://images.unsplash.com/photo-1600271644420-f2a77271b6f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'

const DetailScreen = ({navigation, route}) => {
    // console.log(route.params.data.restaurant.name)
    const {restaurant} = route.params.data
    return ( 
        <View style={{flex:1}}>
            <Header style={{backgroundColor:'tomato', paddingHorizontal:10, justifyContent:'flex-start'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Icon name='arrow-left' type='Feather' style={{color:'white'}}/>
                    </TouchableWithoutFeedback>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>  {restaurant.name}</Text>
                </View>
            </Header>
            <View>
                <Thumbnail 
                    square 
                    source={{uri:restaurant.featured_image ? restaurant.featured_image : urlAlternatif}} 
                    style={{height:180, width:'100%'}}
                />
                <Text style={{paddingHorizontal:8, paddingTop:15}}>Rating :{restaurant.user_rating.aggregate_rating}</Text>
                <Text style={{paddingHorizontal:8, paddingTop:15}}>Address :{restaurant.location.address}</Text>
                <Text style={{paddingHorizontal:8, paddingTop:15}}>Cuisines :{restaurant.cuisines}</Text>
                <Text style={{paddingHorizontal:8, paddingTop:15}}>Open :{restaurant.timings}</Text>
                <Text style={{paddingHorizontal:8, paddingTop:15}}>Cost for 2 :{restaurant.currency} {restaurant.average_cost_for_two}</Text>
            </View>
        </View>
     );
}
 
export default DetailScreen;