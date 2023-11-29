import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Todos from './src/Screens/Todos';
import { ModalPortal } from 'react-native-modals';

const App = () => {
  return (
   <>
    <ModalPortal />
     <Todos/>  
   </>
   
    
  )
}

export default App;