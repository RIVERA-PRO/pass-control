import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function PerfilComponent() {
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState('');
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

    useEffect(() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        if (currentHour >= 6 && currentHour < 13) {
            setGreeting('Buenos días');
        } else if (currentHour >= 13 && currentHour < 19) {
            setGreeting('Buenas tardes');
        } else {
            setGreeting('Buenas noches');
        }
    }, []);
    return (

        <>
            {userData ? (


                <TouchableOpacity
                    onPress={() => navigation.navigate('PerfilScreen', { user_id: userData.user_id })}
                    style={styles.perfil} >
                    <View style={styles.imgBorder} >
                        <Image source={{ uri: userData.photo }} style={styles.img} />
                    </View>
                    <View>
                        <Text style={styles.date}>{greeting} !</Text>
                        <Text style={styles.textName} >{userData.name}</Text>
                    </View>
                </TouchableOpacity>


            ) : (
                <Image source={{ uri: 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png' }} style={styles.img} />
            )}
        </>

    );
}


const styles = StyleSheet.create({


    img: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        margin: 2
    },
    imgBorder: {
        backgroundColor: '#F80050',
        borderRadius: 100,
    },
    perfil: {
        flexDirection: 'row',
        gap: 10,

        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 10

    },
    date: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textName: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 15,
        fontWeight: 'bold',
    },
    deColumn: {
        flexDirection: 'column',
        gap: 10
    }

});
