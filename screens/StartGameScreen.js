import React, {useState, useEffect} from 'react'
import {View, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberCard from '../components/NumberCard'
import Colors from '../constants/colors'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'

const StartGameScreen = ({onStartGame}) =>{
   const [enteredValue, setEnteredValue] = useState('')
   const [confirmed, setConfirmed] = useState(false)
   const [selectedNumber, setSelectedNumber] = useState(0)
   const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width)

   const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, ''))
   }

   useEffect(()=> {
      const updateLayout = () => {
         setAvailableWidth(Dimensions.get('window').width)
      }
      Dimensions.addEventListener('change', updateLayout)
      return ()=>{
         Dimensions.removeEventListener('change', updateLayout)
      }
   })

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

   return (
      <ScrollView>
      <KeyboardAvoidingView behavior = 'position' keyboardVerticalOffset ={30}>
      <TouchableWithoutFeedback onPress={()=>{
         Keyboard.dismiss()
      }}>
         <View style={styles.screen}>
            <TitleText >Start a New Game!</TitleText>
            {!confirmed && <Card style={{...styles.inputContainer, width: availableWidth}}>
               <BodyText style={styles.text}>Select a Number</BodyText>
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
                  <View style = {{width: availableWidth/4}}>
                     <Button title="Reset" color ={Colors.accent} onPress={resetInputHandler}/>
                  </View>
                  <View style = {{width: availableWidth/4}}>
                     <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                  </View>
               </View>
            </Card>}
            {confirmed && <Card style ={styles.start} ><NumberCard number = {selectedNumber} onStartGame={()=>onStartGame(selectedNumber)}/></Card>} 
         </View>
   </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
   </ScrollView>

)}


const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
   },
   title: {
      marginVertical: 10,
   },
   // button: {
   //    // width: 90,
   //    width: Dimensions.get('window').width/4,
   // },
   inputContainer:{
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





