import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import Header from './components/Header'
import data from '../data.json'
const Allcontent = ({navigation}) => {
    return (

        <View style={{backgroundColor:'black', height:'100%'}}>
           {/* <Header/> */}
           <ScrollView>
               <View style={styles.contentView}>
                   
           {data.map((item, index )=> 
            
<View key={index} style={{height:150, width:100, backgroundColor:'white', margin:10}}>
<TouchableOpacity onPress={()=>navigation.navigate('Player',{item})}>
<Image
          style={{height:'100%', width:'100%'}}
          source={{
              uri: item.image,
            }}
        />
    </TouchableOpacity>   
</View>  )}
{/* <View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View>
<View style={{height:150, width:100, backgroundColor:'tomato', margin:10}}>

</View> */}


              
</View>
           </ScrollView>
        </View>
    )
}

export default Allcontent
 const styles = StyleSheet.create({
     contentView:{
         display:'flex',
         flexDirection:'row',
         flexWrap:'wrap',
         justifyContent:'space-around'
     }
 })
