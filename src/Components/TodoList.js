import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

import React from 'react'
const screenWidth = Dimensions.get('window').width;

const TodoList = ({ item,todoList,setTodoList }) => {
  
  function handleDeleteTodo(id) {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  }
  return (
    <View style={{flex:1,width:screenWidth,padding:15,}}>
    <View style={{backgroundColor:'#36454F',flexDirection:'row',height:40,borderRadius:10}}>
<Text style={{ flex: 1, fontSize: 20, padding: 5, paddingEnd: 20 }}>
  {item.title}
</Text>

    <View style={{flexDirection:'row'}} >
    <TouchableOpacity style={styles.removeButton}>
    <Text style={{ textAlign: 'center', fontSize: 20, color: '#84563c' }}>&lt;-</Text>

    
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.removeButton}
       onPress={() => handleDeleteTodo(item.id)}
      >
        
      <Text style={{textAlign:'center',fontSize:20,color:'#84563c'} }>-</Text>
      </TouchableOpacity>
    </View>
    
    
</View>
</View>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
  
    }, 
    whiteText:{
     color:'#FFFFFF',
  
    },
    darkText:{
     color:'#000000'
     
    },

    todoinputDark:{
        backgroundColor:'#E5E4E2',
        color:'#848884'
    },
    todoInputLight:{
        backgroundColor:'#D3D3D3',
        color:'#000000'
    },
    TouchableOpacity:{
        
        height:60,
        width:60,
      
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:500,
        borderColor:'gray',
        backgroundColor:'#84563c',

      },
      removeButton:{
        height:40,
        width:40,
      
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:500,
        // borderColor:'gray',
        // backgroundColor:'#B2BEB5',
        
      }
     
  })

export default TodoList;