import React from 'react'
import {View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = ({roundsNumber, userNumber, onRestart}) => {
   return (
      <ScrollView>
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
         <MainButton onPress = {onRestart}>NEW GAME</MainButton>
      </View>
      </ScrollView>
   )
}

// for web images, you always have to set a width & height.  For our local images, it isn't required as we can tell size at compile time.

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10
   },
   imageContainer: {
      width:  Dimensions.get('window').width * 0.7,
      height: Dimensions.get('window').width * 0.7,
      borderRadius: Dimensions.get('window').width * 0.7 / 2,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: Dimensions.get('window').height / 20
   }, 
   resultsContainer: {
      marginHorizontal: 30,
      marginVertical: Dimensions.get('window').height / 60
   },
   resultText: {
      textAlign: 'center',
      fontSize: Dimensions.get('window').height < 400 ? 16 : 20
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