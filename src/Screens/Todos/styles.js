import styled from 'styled-components';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
export const ParentWrapper = styled(View)`
    flex: 1;
    align-items: center;
    background-color: ${(props) =>
        props.isDarkMode ? 'darkcolor' : 'lightcolor'};
    position: absolute;
    padding-top: 30px;
`;
export const Input = styled(TextInput)`
    border-radius: 10px;
    height: 40px;
    width: ${(props) => props.width};
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
    background: ${(props) => (props.isDarkMode ? '#444443' : '#E5E4E2')};
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
`;

export const AddButton = styled(TouchableOpacity)`
    height: 60px;
    width: 60px;
    padding: 7px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2a3dc6;
`;
export const AddText = styled(Text)`
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
`;

export const TodosView = styled(View)`
    background-color: ${(props) => (props.isDarkMode ? '#36454f' : '#E7E7E6')};

    flex-direction: row;
    height: 40px;
    border-radius: 10px;
`;
