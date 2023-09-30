import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import LoadingAlojamientos from './LoadingAlojamientos'; // Cambiado el nombre del componente

export default function AllAlojamientos() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [publicacion, setPublicacion] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noPublicaciones, setNoPublicaciones] = useState(false); // Cambiado el nombre del estado

    const fetchPublicaciones = async () => { // Cambiado el nombre de la función
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get('https://turismo-salta.onrender.com/alojamiento', { headers }); // Cambiado el nombre de la URL

            if (response.status === 200) {
                const reversedPublicaciones = response.data.alojamientos.reverse(); // Cambiado el nombre del array
                setPublicacion(reversedPublicaciones); // Cambiado el nombre del estado
                setLoading(false);
                setNoPublicaciones(reversedPublicaciones.length === 0); // Verifica si no hay publicaciones
                console.log(reversedPublicaciones.length);
            } else {
                console.error('Error fetching publicaciones:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPublicaciones();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    const navigateToPerfilScreen = (user_id) => {
        navigation.navigate('PerfilScreen', { user_id });
    };

    const showErrorAlert = () => {
        Alert.alert(
            '¡Ops!',
            'Ha ocurrido un error en la petición',
            [
                {
                    text: 'Aceptar',
                    onPress: () => console.log('Error alert closed'),
                },
            ],
            { cancelable: false }
        );
    };

    const navigateToDetailScreen = (publicacionId) => {
        navigation.navigate('DetailAlojamientos', { _id: publicacionId });
        console.log(publicacionId)
    };



    return (
        <View style={styles.container}>
            {loading ? (

                <LoadingAlojamientos />
            ) : (

                <>

                    <ScrollView horizontal={true} style={styles.ScrollView}>
                        {publicacion?.length === 0 ? (
                            <Text style={styles.textName}></Text>
                        ) : (publicacion.slice(0, 6).map((publicaciones, index) => ( // Cambiado el nombre del array y las variables
                            <>

                                <View key={index} style={styles.publicacionCard}>
                                    {publicaciones.cover_photo ? (
                                        <TouchableOpacity style={styles.cardPublicacion} onPress={() => navigateToDetailScreen(publicaciones._id)}>
                                            <ImageBackground source={{ uri: publicaciones.cover_photo }} style={styles.contenedorBg}>


                                            </ImageBackground>
                                            <View style={styles.deColumn}>
                                                <View style={styles.deColumn}>
                                                    {publicaciones.title.length > 15 ? (
                                                        <Text style={styles.textTitle}>{publicaciones.title.slice(0, 15)}...</Text>
                                                    ) : (
                                                        <Text style={styles.textTitle}>{publicaciones.title}</Text>
                                                    )}
                                                    {publicaciones.description.length > 17 ? (
                                                        <Text style={styles.textDescription}>{publicaciones.description.slice(0, 17)}..</Text>
                                                    ) : (
                                                        <Text style={styles.textDescription}>{publicaciones.description}</Text>
                                                    )}
                                                </View>
                                                <AntDesign name="rightsquare" size={19} style={styles.icon} color="#F80050" />

                                            </View>
                                        </TouchableOpacity>
                                    ) : null}
                                </View></>
                        ))

                        )}

                    </ScrollView>

                </>


            )}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {



        marginBottom: 10,

        borderRadius: 10,


    },


    contenedorBg: {
        height: 100,



        padding: 10


    },
    publicacionCard: {




    },
    cardPublicacion: {
        flexDirection: 'column',
        height: 190,
        width: 160,
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 0 }, // Cambia la altura a 0 para tener sombreado en todos los lados
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 8,
        marginLeft: 15,
        marginTop: 10,

    },

    textDescription: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingTop: 5
    },
    textTitle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 10

    },
    deColumn: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',


    },
    icon: {
        marginLeft: '85%'
    }


});
