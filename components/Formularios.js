import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Register from './Register';
import Login from './Login';

export default function Formularios() {
    const [showRegister, setShowRegister] = useState(true);

    const toggleForm = () => {
        setShowRegister(!showRegister);
    };

    return (
        <View style={styles.Formularios}>
            {showRegister ? <Login /> : <Register />}

            <TouchableOpacity onPress={toggleForm} style={styles.button}>
                <Text style={styles.buttonText}>{showRegister ? " ¿No tienes una cuenta? Registrate" : "¿Ya tienes una cuenta? Inicia sesión"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    Formularios: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100

    }

});
