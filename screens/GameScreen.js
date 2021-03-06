import React, {useState, useRef, useEffect} from 'react'
import{View, FlatList, Text, StyleSheet, Alert, Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {ScreenOrientation} from 'expo'
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
   // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
   const initialGuess = generateRandomBetween(1,100, userChoice)
   const [currentGuess, setCurrentGuess] = useState(initialGuess)
   const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
   const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
   const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
   const currentLow = useRef(1)
   const currentHigh = useRef(100)

   useEffect(()=>{
      const updateLayout = () => {
         setAvailableDeviceWidth(Dimensions.get('window').width)
         setAvailableDeviceHeight(Dimensions.get('window').height)
      }
      Dimensions.addEventListener('change', updateLayout)

      return (()=>{Dimensions.removeEventListener('change', updateLayout)
      })
   })
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
         currentHigh.current = currentGuess -1
      } else{
         currentLow.current = currentGuess + 1
      }
      const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
   
      setCurrentGuess(nextNumber)
      setPastGuesses(current=>[nextNumber.toString(), ...current ] )
   }

   let listContainerStyle = styles.listContainer

   if (availableDeviceWidth  < 350) {
      listContainerStyle = styles.listContainerBig
   }

   if (availableDeviceHeight < 500) {
      return (
         <View style = {styles.screen}>
         <Text> Opponent's Guess</Text>
         <View style = {styles.landscape}>
            <MainButton onPress={()=>{nextGuessHandler('lower')}}>
               {/* <Ionicons name='md-arrow-round-down' size={24} color='white'/> */}
               <Ionicons name='md-remove' size={24} color='white'/>
            </MainButton>

            <NumberContainer>{currentGuess}</NumberContainer>
      
            <MainButton onPress={()=>{nextGuessHandler('greater')}}>
               {/* <Ionicons name='md-arrow-round-up'size={24} color='white'/> */}
               <Ionicons name='md-add' size={24} color='white'/>
            </MainButton>
         </View>
         <View style={listContainerStyle}>
         <FlatList contentContainerStyle={styles.list}
            keyExtractor={item=>item} 
            data={pastGuesses} 
            renderItem={(item)=>renderListItem(pastGuesses.length, item)}/>
         </View>
      </View>

      )
   }

   return (
      <View style = {styles.screen}>
         <Text> Opponent's Guess</Text>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card style = {styles.buttonContainer}>
            <MainButton onPress={()=>{nextGuessHandler('lower')}}>
               {/* <Ionicons name='md-arrow-round-down' size={24} color='white'/> */}
               <Ionicons name='md-remove' size={24} color='white'/>
            </MainButton>
            <MainButton onPress={()=>{nextGuessHandler('greater')}}>
               {/* <Ionicons name='md-arrow-round-up'size={24} color='white'/> */}
               <Ionicons name='md-add' size={24} color='white'/>
            </MainButton>
         </Card>
         <View style={listContainerStyle}>
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
   landscape: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop : Dimensions.get('window').height > 600 ? 20 : 10,
      width: 400,
      alignItems: 'center',
      maxWidth: '90%'
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop : Dimensions.get('window').height > 600 ? 20 : 10,
      width: 400,
      maxWidth: '90%'
   },
   listContainer: {
      flex: 1,
      // width: '60%'
      width: Dimensions.get('window').width > 350 ? '60%' : '80%'
   },
   listContainerBig: {
      flex: 1,
      width:'80%'
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