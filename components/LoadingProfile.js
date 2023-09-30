import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ImgPerfil from './ImgPerfil';
export default function LoadingProfile() {
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        getUserData();
    }, []);
    const getUserData = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('user');
            if (userDataJSON) {
                const userDataObj = JSON.parse(userDataJSON);
                setUserData(userDataObj);
            }
        } catch (error) {
            console.error('Error getting user data:', error);
            Alert.alert(error);
        }
    };
    return (
        <ScrollView >
            <View style={styles.card}>
                <Text style={styles.img}></Text>
                <View style={styles.deFLex}>
                    <Text style={styles.foto}></Text>

                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.text2}></Text>
                </View>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({



    card: {
        backgroundColor: '#fff',

        flexDirection: 'column',
        gap: 20,
        paddingVertical: 10,
        padding: 10,

        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
        height: 800

    },

    text: {
        height: 20,
        width: 200,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        margin: 2
    },
    text2: {
        height: 10,
        width: 160,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        margin: 2

    },
    foto: {
        height: 120,
        width: 120,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 100,

    },

    img: {
        width: '100%',
        height: 140,
        borderRadius: 20,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
    },
    deFLex: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    }
})
