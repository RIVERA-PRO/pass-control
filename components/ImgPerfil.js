import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function ImgPerfil() {
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
        }
    };

    return (

        <>
            {userData ? (


                <TouchableOpacity
                    onPress={() => navigation.navigate('PerfilScreen', { user_id: userData.user_id })}
                    style={styles.imgBorder} >



                    <Image source={{ uri: userData.photo }} style={styles.img} />
                </TouchableOpacity>


            ) : (
                <Image source={{ uri: 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png' }} style={styles.img} />
            )}
        </>

    );
}


const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        gap: 10
    },

    img: {
        width: 40,
        height: 40,
        objectFit: 'cover',
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        margin: 2
    },
    imgBorder: {
        backgroundColor: '#1FC2D7',
        borderRadius: 100,
    },
    text: {
        color: "#ffff",
        fontSize: 13
    },
    textName: {
        color: "#ffff",
        fontSize: 17,
        fontWeight: 'bold',
    },
    deColumn: {
        flexDirection: 'column',
        gap: 10
    }

});
