import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    inputView: {
        padding: 20,
        marginTop: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const InputPlace = ({ InputValue, handleInput, handleSubmit }) => (
    <View style={styles.inputView}>
        <TextInput
            style={{
                width: '80%',
                borderBottomWidth: 1,
                borderColor: 'green',
                padding: 7,
            }}
            onChangeText={(text) => handleInput(text)}
            value={InputValue}
            placeholder="Add your place..."
        />
        <Button title="Add" onPress={() => handleSubmit()} />
    </View>
);

export default InputPlace;
