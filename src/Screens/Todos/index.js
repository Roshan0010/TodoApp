/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-undef */
import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { Center } from 'native-base';
import TodoList from '../../Components/TodoList';
import * as SC from './styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Todos = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);

    function handleAddTodo() {
        setTodoList([{ id: Date.now().toString(), title: todo }, ...todoList]);
        setTodo(''); // Clear the input field
    }

    const renderTodos = ({ item }) => (
        <TodoList item={item} todoList={todoList} setTodoList={setTodoList} />
    );

    return (
        <SC.ParentWrapper
            isDarkMode={isDarkMode}
            style={{ height: screenHeight }}
        >
            <View style={{ flex: 3 }}>
                <SC.Input
                    style={{ width: screenWidth - 10 }}
                    isDarkMode={isDarkMode}
                    value={todo}
                    onChangeText={(text) => setTodo(text)}
                />
            </View>

            <View style={{ flex: 20 }}>
                <FlatList data={todoList} renderItem={renderTodos} />
            </View>

            <View style={{ flex: 3 }}>
                <SC.AddButton onPress={() => handleAddTodo()}>
                    <SC.AddText>+</SC.AddText>
                </SC.AddButton>
            </View>
        </SC.ParentWrapper>
    );
};

export default Todos;
