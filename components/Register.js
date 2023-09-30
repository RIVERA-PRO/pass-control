import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register() {
    const [email, setEmail] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [photoUser, setPhotoUser] = useState('');
    const [password, setPassword] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {
        setIsLoading(true);

        const userData = {
            name: nameUser,
            mail: email,
            photo: photoUser,
            password: password,
        };

        const url = 'https://turismo-salta.onrender.com/users/signup';

        try {
            await axios.post(url, userData);

            setSuccessModalVisible(true);
            setIsLoading(false);
            setEmail('');
            setNameUser('');
            setPhotoUser('')
            setPassword('');
        } catch (error) {
            console.error('Error creating user:', error);

            let errorMessage = 'Se produjo un error al procesar la solicitud.';
            if (error.response && error.response.data && error.response.data.message) {
                if (typeof error.response.data.message === 'string') {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = error.response.data.message.join(' ');
                }
            }

            console.log(errorMessage);

            setErrorMessage(errorMessage);
            setErrorModalVisible(true);
            setIsLoading(false); // Hide loading indicator on error
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#888"
                value={nameUser}
                onChangeText={setNameUser}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electronico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="URL FOTO"
                placeholderTextColor="#888"
                value={photoUser}
                onChangeText={setPhotoUser}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={23}
                    color="#888"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#fff" />}

            <Modal visible={successModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalError}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorTitle}>Registrado </Text>
                        <Text style={styles.errorText}>Exitosamente</Text>
                        <TouchableOpacity onPress={() => setSuccessModalVisible(false)} style={styles.okButton}>
                            <Text style={styles.okButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={errorModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalError}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorTitle}>Se produjo un error</Text>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                        <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.okButton}>
                            <Text style={styles.okButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 20,
        padding: 20,


    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.4,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#000'
    },
    button: {
        backgroundColor: '#F80050',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '100%',
        textAlign: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    modalError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: 260,

        borderRadius: 3,
        padding: 20,
        zIndex: 3
    },
    okButtonText: {
        color: '#F80050',
        fontSize: 16,
    },
    errorText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
    },
    errorTitle: {
        fontSize: 20,
        color: '#000',
        marginBottom: 10,
    },
    okButton: {


        borderRadius: 5,
        justifyContent: 'flex-end',
        marginLeft: '70%',
        paddingTop: 30
    },
    loader: {
        marginHorizontal: 20,
        height: 10,
        backgroundColor: '#F80050',
        top: '93%',
        zIndex: 2,
        position: 'absolute',
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30
    },
    toggleButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: '72%',
        left: '89%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    toggleButtonText: {
        color: '#888',

    },


});
