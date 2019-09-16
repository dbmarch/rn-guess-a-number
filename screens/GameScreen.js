import React, {useState, useRef, useEffect} from 'react'
import{View, ScrollView, Text, StyleSheet, Alert} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   const rndNum = Math.floor(Math.random()* (max - min) + min)
   if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude)
   }else{
      return rndNum
   }
}

const renderListItem = (value, numOfRound) => {
   return (
   <View key= {value} style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
   </View>
   )
}

const GameScreen = ({userChoice, onGameOver}) => {
   const initialGuess = generateRandomBetween(1,100, userChoice)
   const [currentGuess, setCurrentGuess] = useState(initialGuess)
   const [pastGuesses, setPastGuesses] = useState([initialGuess])
   const currentLow = useRef(1)
   const currentHigh = useRef(100)

   useEffect(()=>{
      if (currentGuess === userChoice) {
         onGameOver(pastGuesses.length)
      }
   }, [currentGuess, userChoice, onGameOver])

   const nextGuessHandler = direction => {
      if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
         Alert.alert("Don't lie!", "That is wrong", [{text: 'Sorry!' ,style: 'cancel'}])
         return 
      } 
      if (direction === 'lower') {
         currentHigh.current = currentGuess
      } else{
         currentLow.current = currentGuess
      }
      const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
   
      setCurrentGuess(nextNumber)
      setPastGuesses(current=>[nextNumber, ...current ] )
   }

   console.info ('Guesses', pastGuesses)

   return (
      <View style = {styles.screen}>
         <Text> Opponent's Guess</Text>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card style = {styles.buttonContainer}>
            <MainButton onPress={()=>{nextGuessHandler('lower')}}>
               <Ionicons name='md-arrow-round-down' size={24} color='white'/>
               {/* <Ionicons name='md-remove' size={24} color='white'/> */}
            </MainButton>
            <MainButton onPress={()=>{nextGuessHandler('greater')}}>
               <Ionicons name='md-arrow-round-up'size={24} color='white'/>
               {/* <Ionicons name='md-add' size={24} color='white'/> */}
            </MainButton>
         </Card>
         <View style={styles.list}>
         <ScrollView>
            {pastGuesses.map(guess=>renderListItem(guess))}
         </ScrollView>
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop : 20,
      width: 400,
      maxWidth: '90%'
   },
   list: {
      width: '80%'
   },
   listItem: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      backgroundColor: 'white',
      flexDirection: 'row'
   }
})

export default GameScreen