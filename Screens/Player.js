import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, 
  ScrollView, TouchableOpacity,Dimensions, Image, Share } from 'react-native'
import Header from './components/Header'
import Slider from './components/Slider'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player'
import data1 from '../data.json'
const Player = (props) => {
    const [orientation, setOrientation] = useState("PORTRAIT");
    // console.log('player props', props.route.params.item)
const data= props.route.params.item
console.log(data)
console.log(data.video)
    // useEffect(() => {
    //     getData()
    //     Dimensions.addEventListener('change', ({window:{width,height}})=>{
    //       if (width<height) {
    //         setOrientation("PORTRAIT")
    //       } else {
    //         setOrientation("LANDSCAPE")
        
    //       }
    //     })
    
    //   }, []);

     
  
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('isLoggedIn')
  //     if(value == 'false') {
  //       navigation.navigate('Login')
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  
  const onShare = async () => {
    try {
      console.log('share button pressed')
      const result = await Share.share({
       title: 'VIDSHOW APP',
  message: `To Watch ${data.title} and Popular Shows and Movies.Please install VIDSHOW app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`, 
  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
    } catch (error) {
      console.log(error)
    }
  };

    return (
        <View style={{backgroundColor:'black', flex:1}}>
            {/* {orientation=='LANDSCAPE' ? <View></View> : <Header navigation={props.navigation}/> } */}
            
            <View style={styles.PlayerView}>
            <VideoPlayer
    video={{ uri: data.video }}
    videoWidth={1600}
    videoHeight={860}
    rotateToFullScreen={true}
    onLoad={(data)=>{console.log('ready')}}
    resizeMode="cover"
//     onProgress={(progress)=>{
//       console.log(progress)
//     //   if(progress.currentTime<= 77.116 && progress.currentTime>= 70.116 )
//     // {
      
//     //   alert('time')
//     // }
//   }}
    fullScreenOnLongPress
    showDuration={true}
    
    thumbnail={{ uri: data.image }}
    // customStyles={{seekBarBackground:'white'}}
/>
            </View>
            <View style={{height:80, display:'flex', flexDirection:'row'}}>
            <Text style={styles.about}>Title : {data.title} 
            {"\n"}
            Category: {data.category}
            {"\n"}
            Year Of Release : {data.year}
         
            </Text>
            <TouchableOpacity style={{height:40, width:90, backgroundColor:'red', borderRadius:20, 
            alignItems:'center', justifyContent:'center', alignSelf:'center',}} onPress={()=>onShare()}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Share</Text>
            </TouchableOpacity>
            </View>
            <ScrollView>
            <ScrollView style={styles.descView}>
                <Text  style={{color:'black', fontSize:20
            , fontWeight:'bold', margin:10
            }}> Description : </Text>
<Text style={styles.descText} numberOfLines={8}>

{data.Description}

</Text>
            </ScrollView>
            <View>
      <Text style={styles.scrollViewText} >Special For You</Text>
<ScrollView horizontal={true}>

    {data1.slice(0,7).map((item, index )=>
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%'}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    )}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('AllContent')}>
      <Text style={styles.seemore}>See More...</Text>
      </TouchableOpacity>
     
      <View>
      <Text style={styles.scrollViewText} >Trending Shows</Text>
<ScrollView horizontal={true}>

    {data1.slice(0,7).map((item, index )=>
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%'}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    )}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('AllContent')}>
      <Text style={styles.seemore}>See More...</Text>
      </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Player
const styles= StyleSheet.create({
    PlayerView:{
        height:190,
        backgroundColor:"white"
    },
    descView:{
        height:'100%',
        backgroundColor:'tomato',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
       marginTop:30
    },
    about:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        margin:10
    },
    descText:{
        fontSize:15,
        color:'white',
        fontWeight:'bold',
        margin:10,
        lineHeight:20,
        
    },
    scrollViewStyle:{
        height:130,
        width:120,
        margin:10,
        backgroundColor:'white'
          },
          scrollViewText:{
            fontSize:20,
            fontWeight:'bold',
            color:'tomato',
            margin:10,
          
          },
          seemore:{
            color:'white',
            alignSelf:'center',
            fontWeight:'bold',
            margin:10,
            fontSize:20
          },
})
