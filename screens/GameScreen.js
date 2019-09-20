import React, {useState, useRef, useEffect} from 'react'
import{View, FlatList, Text, StyleSheet, Alert} from 'react-native'
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

const renderListItem = (listLength, itemData) => {
   return (
   <View style={styles.listItem}>
      <BodyText>#{listLength-itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
   </View>
   )
}

const GameScreen = ({userChoice, onGameOver}) => {
   const initialGuess = generateRandomBetween(1,100, userChoice)
   const [currentGuess, setCurrentGuess] = useState(initialGuess)
   const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
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
      setPastGuesses(current=>[nextNumber.toString(), ...current ] )
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
         <View style={styles.listContainer}>
         {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length-index))}
         </ScrollView> */}
         <FlatList contentContainerStyle={styles.list}
            keyExtractor={item=>item} 
            data={pastGuesses} 
            renderItem={(item)=>renderListItem(pastGuesses.length, item)}/>
         </View>
      </View>
   )
}
// For android to scroll, the list needs a flex:1
// use flexGrow to keep the list scroll stationary

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
   listContainer: {
      flex: 1,
      width: '60%'
   },
   list: {
      // flex: 1,
      flexGrow: 1,
      // alignItems: 'center',
      justifyContent: 'flex-end'
   },
   listItem: {
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-around'
   }
})

export default GameScreen