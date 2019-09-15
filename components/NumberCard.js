import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import Colors  from '../constants/colors';
import NumberContainer from './NumberContainer'
import MainButton from '../components/MainButton'

const NumberCard = (props) => {
   return (
   <View style = {{...styles.numberContainer, ...props.style}}>
         <View style = {styles.textField}>
              <Text style= {styles.textField}>Your Number</Text>
         </View>
         <NumberContainer>{props.number}</NumberContainer>
         <MainButton  color = 'green' onPress = {props.onStartGame}>START</MainButton>
   </View>
   )
}


const styles = StyleSheet.create({
   numberContainer: {
      padding: 5,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   textField: {
      marginVertical: 10,
      textAlign: 'center',
   },
   boxText: {
      textAlign: 'center',
   },
   box: {
      marginVertical: 10,
      borderColor: Colors.accent,
      borderWidth: 1,
      borderRadius: 10,
      padding: 3,
      width: 50,
      height: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
})


export default NumberCard