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
} from 'react-native';
import React, { useState } from 'react';
import { Center } from 'native-base';
import TodoList from '../../Components/TodoList';
import * as SC from './styles';

const screenWidth = Dimensions.get('window').width;

const Todos = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);

    function handleAddTodo() {
        setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
        setTodo(''); // Clear the input field
    }

    const renderTodos = ({ item }) => (
        <TodoList item={item} todoList={todoList} setTodoList={setTodoList} />
    );

    return (
        <SC.ParentWrapper isDarkMode={isDarkMode}>
            <SC.Input
                isDarkMode={isDarkMode}
                width={screenWidth}
                value={todo}
                onChangeText={(text) => setTodo(text)}
            />

            <FlatList data={todoList} renderItem={renderTodos} />

            <SC.AddButton onPress={() => handleAddTodo()}>
                <SC.AddText>+</SC.AddText>
            </SC.AddButton>
        </SC.ParentWrapper>
    );
};

export default Todos;
