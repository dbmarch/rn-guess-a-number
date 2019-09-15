import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'

const GameOverScreen = ({roundsNumber, userNumber, onRestart}) => {
   return (
      <View style = {styles.screen}>
         <TitleText style = {styles.title}>GAME OVER!</TitleText>
         <View style={styles.imageContainer}>
            <Image 
            fadeDuration={1000}
            style={styles.image} 
            source = {require('../assets/success.png')} 
            //source = {{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
            resizeMode = 'cover' 
            />
         </View>
         <View style={styles.resultsContainer}>
            <BodyText style = {styles.resultText}>Your phone needed {' '}
               <Text style={styles.highlight}>
                  {roundsNumber}
               </Text> rounds to guess the number{' '}
               <Text style={styles.highlight}>
                  {userNumber}
               </Text>.
            </BodyText>
         </View>
         <Button title = "NEW GAME" onPress = {onRestart}/>
      </View>
   )
}

// for web images, you always have to set a width & height.  For our local images, it isn't required as we can tell size at compile time.

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   imageContainer: {
      width:  300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: 30
   }, 
   resultsContainer: {
      marginHorizontal: 30,
      marginVertical: 15
   },
   resultText: {
      textAlign: 'center',
      fontSize: 20
   },
   image: {
      width: '100%',
      height: '100%',
   },
   highlight: {
      fontFamily: 'open-sans-bold',
      color: Colors.primary,
   },

})


export default GameOverScreen