/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { Modal, ModalContent } from 'react-native-modals';
import * as SC from '../Screens/Todos/styles';
import { setData } from '../../utils/storage';
import { STORAGE_KEY } from '../../utils/strings';

const screenWidth = Dimensions.get('window').width;

const TodoList = ({
    item,
    todoList,
    setTodoList,
    handleEdit,
    setTodoModal,
    todoModal,
}) => {
    function handleDeleteTodo(id) {
        const updatedTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(updatedTodoList);
        setData(STORAGE_KEY, updatedTodoList);
    }
    const isDarkMode = useColorScheme() === 'dark';

    // eslint-disable-next-line react/no-unstable-nested-components

    return (
        <View style={{ flex: 1, width: screenWidth, padding: 15 }}>
            <SC.TodosView
                isDarkMode={isDarkMode}
                onPress={() => setTodoModal(!todoModal)}
            >
                <SC.TodosText isDarkMode={isDarkMode}>
                    {item.title}
                </SC.TodosText>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleEdit(item.id)}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#84563c',
                            }}
                        >
                            &lt;-
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleDeleteTodo(item.id)}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#84563c',
                            }}
                        >
                            -
                        </Text>
                    </TouchableOpacity>
                </View>
            </SC.TodosView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    whiteText: {
        color: '#FFFFFF',
    },
    darkText: {
        color: '#000000',
    },

    todoinputDark: {
        backgroundColor: '#E5E4E2',
        color: '#848884',
    },
    todoInputLight: {
        backgroundColor: '#D3D3D3',
        color: '#000000',
    },
    TouchableOpacity: {
        height: 60,
        width: 60,

        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 500,
        borderColor: 'gray',
        backgroundColor: '#84563c',
    },
    removeButton: {
        height: 40,
        width: 40,

        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 500,
        // borderColor:'gray',
        // backgroundColor:'#B2BEB5',
    },
});

export default TodoList;
