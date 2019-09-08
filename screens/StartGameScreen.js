import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import Start from '../components/Start'
import Colors from '../constants/colors'

const StartGameScreen = () =>{
   const [enteredValue, setEnteredValue] = useState('')
   const [confirmed, setConfirmed] = useState(false)
   const [selectedNumber, setSelectedNumber] = useState(0)

   const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, ''))
   }

   const resetInputHandler = () =>{
      setEnteredValue('')
      Keyboard.dismiss()
   }

   const confirmInputHandler = () =>{
      const chosenNumber = parseInt(enteredValue)
      if (isNaN(chosenNumber) || (chosenNumber <=0) || (chosenNumber > 99) ) {
         Alert.alert("Invalid Entry", "Number must be between 1 and 99.", [{text: 'OK', style: 'destructive', onPress:resetInputHandler}])
         return
      }
      Keyboard.dismiss()
      setConfirmed(true)
      setSelectedNumber(chosenNumber)
      setEnteredValue('')
   }

   let confirmedOutput 
   if (confirmed) {
      confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>
   }

   return (
      <TouchableWithoutFeedback onPress={()=>{
         Keyboard.dismiss()
      }}>
         <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            {!confirmed && <Card style={styles.inputContainer}>
               <Text >Select a Number</Text>
               <Input 
                  style={styles.input} 
                  blurOnSubmit 
                  autoCapitalize='none' 
                  autoCorrect={false} 
                  keyboardType='number-pad' 
                  maxLength = {2}
                  onChangeText={numberInputHandler}
                  value = {enteredValue}
                />
               <View style = {styles.buttonContainer}>
                  <View style = {styles.button} >
                     <Button title="Reset" color ={Colors.accent} onPress={resetInputHandler}/>
                  </View>
                  <View style = {styles.button} >
                     <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                  </View>
               </View>
            </Card>}
            {confirmed && <Card style ={styles.start} ><Start number = {selectedNumber}/></Card>} 
         </View>
   </TouchableWithoutFeedback>
)}


const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
      marginVertical: 10
   },
   button: {
      width: 90,
   },
   inputContainer:{
      width: 300,
      maxWidth: '80%',
      alignItems: 'center',
   },
   buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
   },
   input: {
      width: 50,
      textAlign: 'center'
   },
   start: {
      marginVertical: 10,
      width: 250,
      maxWidth: '80%',
      alignItems: 'center',
   }

 });

export default StartGameScreen





