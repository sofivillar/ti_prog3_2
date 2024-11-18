import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Ir a Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Ir a Register</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});