import React from 'react'
import { View, Text , Image} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
const CustomDrawerContent = (props) => {
    const logout=()=>{
        props.navigation.closeDrawer();
        props.navigation.replace('Login')
    }
    return (
        <View style={{flex:1, backgroundColor:'#EDBF69'}}>
        <DrawerContentScrollView {...props}
        
          >
            <View style={{backgroundColor:'tomato', height:150, alignItems:'center', justifyContent:'center',
        display:'flex'
        }}>

            <Image
          style={{ width: 150, height: 100 }}
          source={require('../../Images/Logo.png')}
          resizeMode='contain'
        />
       
        <Text style={{
            color:'white', 
            fontWeight:'bold',
            fontSize:15,
            margin:10,
            alignSelf:'center'

        }}>VIDSHOW APP</Text>
            </View>
            <View style={{backgroundColor:'#EDBF69'}}>
      <DrawerItemList {...props} />
    
      
      <DrawerItem label="Trending WebSeries" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}} onPress={() => alert('Link to help')} />
      <DrawerItem label="Log Out" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}} onPress={() => logout() } />
      <DrawerItem label="Contact Us" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}} />
      <DrawerItem label="Help" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}}
        onPress={() => props.navigation.navigate('AllContent')} options={{}} />
      </View>
    </DrawerContentScrollView></View>
    )
}

export default CustomDrawerContent
