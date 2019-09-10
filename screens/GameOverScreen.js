import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const GameOverScreen = () => {
   return (
      <View style = {styles.screens}>
         <Text>GAME OVER!</Text>
      </View>
   )
}


const styles = StyleSheet.create({
   screen: {
      flex: 1,
   }
})


export default GameOverScreen