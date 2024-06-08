import React from 'react';
import {View, TextInput, Text} from 'react-native'

import styles from './InputField.styles';

const FieldInput = ({label,placeholder,width = 250, onChange} : any)  => {

    return (
        <View style ={styles.container}>
            <Text>{label}:</Text>
            <TextInput 
                style={[styles.textInput, {width: width}]}
                placeholder={placeholder}
                secureTextEntry={label === "Password" ? true : false}
                onChangeText={(text) => onChange(text,label)}
            />
        </View>
    );
}

export default FieldInput;