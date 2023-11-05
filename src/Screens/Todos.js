import { View, Text,StyleSheet,SafeAreaView,  useColorScheme, TextInput,Button, TouchableOpacity,Dimensions,
    FlatList,
    Alert
    
 } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';


const screenWidth = Dimensions.get('window').width;



const Todos = () => {
  const isDarkMode=useColorScheme()==='dark';
 const [todo,setTodo]=useState("");
 const [todoList,setTodoList]=useState([]);


    function handleAddTodo(){
      setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
      setTodo(''); // Clear the input field

    }

    function HandleDeleteTodo(id){
      const updateTodoList=todoList.filter((todo)=>todo.id!==id);
      setTodoList(updateTodoList);
    }




    const renderTodos=({item,index})=>{

 
      return(
        <TodoList item={item} todoList={todoList} setTodoList={setTodoList}/>
      
          
      )
  }



    
  return (
    <View style={{gap:15,flex:1, alignItems:'center',backgroundColor:'#1FFFFFF',position:'absolute', padding:10}}>
    <View >
      <Text style={[isDarkMode?styles.whiteText:styles.darkText,{fontSize:25,textAlign:'center',height:30}]}>ToDo List</Text>

    </View>
    
        <TextInput style={[isDarkMode?styles.todoinputDark:styles.todoInputLight,{borderRadius:10,height:40,width:screenWidth-10}]}
        value={todo}
        onChangeText={(text)=>setTodo(text)}
        ></TextInput>
    
    <FlatList data={todoList} renderItem={renderTodos}/>
   
     


        <TouchableOpacity style={styles.TouchableOpacity}
        onPress={() => handleAddTodo()} >
            <Text style={{textAlign:'center',fontSize:40}}>+</Text>
            </TouchableOpacity>
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

export default Todos;