import React from 'react'
import {View, Button, Text, StyleSheet } from 'react-native'
import Colors  from '../constants/colors';

const Start = (props) => {
   return (
   <View style = {{...styles.start, ...props.style}}>
         <View style = {styles.textField}>
              <Text style= {styles.textField}>Your Number</Text>
         </View>

         <View style = {styles.box}>
            <Text style={styles.boxText}>{props.number}</Text>
         </View>
         
         <View  style= {{...styles.textField, ...styles.button}}>
               <Button  color = 'green' title = "START"/>
         </View>
         
   </View>
   )
}


const styles = StyleSheet.create({
   start: {
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


export default Start