// storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const readData = async (STORAGE_KEY, setTodoList) => {
    try {
        const temp = await AsyncStorage.getItem(STORAGE_KEY);
        if (temp !== null) {
            setTodoList(JSON.parse(temp));
        } else {
            // Handle the case where AsyncStorage value is null (no existing data)
            setTodoList([]); // Set an empty array as the initial todoList
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const setData = async (STORAGE_KEY, updatedTodoList) => {
    try {
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedTodoList)
        );
    } catch (e) {
        console.log(e.message);
    }
};
