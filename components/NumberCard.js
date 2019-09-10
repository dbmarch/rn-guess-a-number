import React from 'react'
import {View, Button, Text, StyleSheet } from 'react-native'
import Colors  from '../constants/colors';
import NumberContainer from './NumberContainer'

const NumberCard = (props) => {
   return (
   <View style = {{...styles.numberContainer, ...props.style}}>
         <View style = {styles.textField}>
              <Text style= {styles.textField}>Your Number</Text>
         </View>
         <NumberContainer>{props.number}</NumberContainer>
         <View  style= {{...styles.textField, ...styles.button}}>
               <Button  color = 'green' title = "START" onPress = {props.onStartGame}/>
         </View>
         
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
   button: {
      width: 80,
    
   }
})


export default NumberCard