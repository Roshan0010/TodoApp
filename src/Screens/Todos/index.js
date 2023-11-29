/* eslint-disable react/jsx-no-bind */
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
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readData, setData } from '../../../utils/storage';
import { STORAGE_KEY } from '../../../utils/strings';
import TodoList from '../../Components/TodoList';
import * as SC from './styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Todos = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    useEffect(() => {
        readData(STORAGE_KEY, setTodoList);
    }, []); // Add an empty dependency array to trigger only once on mount

    // ... existing code ...

    function handleAddTodo() {
        if (selectedTodoId) {
            const updatedTodoList = todoList.map((item) => {
                if (item.id === selectedTodoId) {
                    return { ...item, title: todo };
                }
                return item;
            });
            setTodoList(updatedTodoList);
            setTodo('');
            setData(STORAGE_KEY, updatedTodoList);
            setSelectedTodoId(null);
        } else {
            const newTodoList = [
                { id: Date.now().toString(), title: todo },
                ...todoList,
            ];
            setTodoList(newTodoList);
            setTodo(''); // Clear the input field
            setData(STORAGE_KEY, newTodoList);
        }
    }
    function handleEdit(id) {
        setSelectedTodoId(id);
        const selectedTodo = todoList.find((item) => item.id === id);
        if (selectedTodo) {
            setTodo(selectedTodo.title);
        }
    }

    const renderTodos = ({ item }) => (
        <TodoList
            item={item}
            todoList={todoList}
            setTodoList={setTodoList}
            handleEdit={handleEdit}
        />
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
