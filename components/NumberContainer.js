import React from 'react'
import {View, Button, Text, StyleSheet } from 'react-native'
import Colors  from '../constants/colors';

const NumberContainer = (props) => {
   return (
      <View style = {styles.box}>
         <Text style={styles.boxText}>{props.children}</Text>
      </View>
   )
}


const styles = StyleSheet.create({
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


export default NumberContainer