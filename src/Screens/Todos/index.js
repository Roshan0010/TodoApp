/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-undef */
import {
    View,
    useColorScheme,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-native-modals';
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
    const inputRef = useRef(null);
    const [todoModal, setTodoModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        readData(STORAGE_KEY, setTodoList);
    }, []); // Add an empty dependency array to trigger only once on mount

    // eslint-disable-next-line react/no-unstable-nested-components
    const ViewModal = () => {
        console.log('here');
        console.log(todoModal);
        const temp = todoList.find((item) => item.id === selectedItemId);
        console.log(temp);
        return (
            <Modal
                animationType="slide"
                transparent
                visible={todoModal}
                height={screenHeight / 4}
                width={screenWidth / 1.5}
                onRequestClose={() => {
                    setTodoModal(false);
                    setSelectedItemId(null);
                }}
                supportedOrientations={['portrait', 'landscape']}
            >
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'grey',
                        zIndex: 200,
                    }}
                >
                    <Text>{temp.title}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setTodoModal(false);
                            setSelectedItemId(null);
                        }}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                    {/* Add more components or text here */}
                </View>
            </Modal>
        );
    };
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
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }

    const renderTodos = ({ item }) => (
        <TodoList
            item={item}
            todoList={todoList}
            setTodoList={setTodoList}
            handleEdit={handleEdit}
            setTodoModal={setTodoModal}
            todoModal={todoModal}
            setSelectedItemId={setSelectedItemId}
        />
    );

    return (
        <>
            {todoModal ? (
                <ViewModal />
            ) : (
                <SC.ParentWrapper
                    isDarkMode={isDarkMode}
                    style={{ height: screenHeight }}
                >
                    <View style={{ flex: 3 }}>
                        <SC.Input
                            ref={inputRef}
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
            )}
        </>
    );
};

export default Todos;
