import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import LoadingGastronomia from './LoadingGastronomia'; // Cambiado el nombre del componente

export default function AllGastronomia() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [gastronomia, setGastronomia] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noGastronomia, setNoGastronomia] = useState(false); // Cambiado el nombre del estado

    const fetchGastronomia = async () => { // Cambiado el nombre de la función
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get('https://turismo-salta.onrender.com/gastronomia', { headers }); // Cambiado el nombre de la URL

            if (response.status === 200) {
                const reversedGastronomia = response.data.gastronomias.reverse(); // Cambiado el nombre del array
                setGastronomia(reversedGastronomia); // Cambiado el nombre del estado
                setLoading(false);
                setNoGastronomia(reversedGastronomia.length === 0); // Verifica si no hay publicaciones
                console.log(reversedGastronomia.length);
            } else {
                console.error('Error fetching gastronomia:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching gastronomia:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchGastronomia();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);



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

    const navigateToDetailScreen = (gastronomiaId) => {
        navigation.navigate('DetailGastronomia', { _id: gastronomiaId });
        console.log(gastronomiaId);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingGastronomia />
            ) : (
                <>
                    <ScrollView horizontal={true} style={styles.ScrollView}>
                        {gastronomia?.length === 0 ? (
                            <Text style={styles.textName}></Text>
                        ) : (
                            gastronomia.slice(0, 6).map((gastronomias, index) => ( // Cambiado el nombre del array y las variables
                                <>
                                    <View key={index} style={styles.gastronomiaCard}>
                                        {gastronomias.cover_photo ? (
                                            <TouchableOpacity style={styles.cardGastronomia} onPress={() => navigateToDetailScreen(gastronomias._id)}>
                                                <ImageBackground source={{ uri: gastronomias.cover_photo }} style={styles.contenedorBg}>

                                                </ImageBackground>
                                                {gastronomias.title.length > 10 ? (
                                                    <Text style={styles.textTitle}>{gastronomias.title.slice(0, 10)}..</Text>
                                                ) : (
                                                    <Text style={styles.textTitle}>{gastronomias.title}</Text>
                                                )}
                                                <View style={styles.deFlex}>
                                                    {gastronomias.description.length > 10 ? (
                                                        <Text style={styles.textDescription}>{gastronomias.description.slice(0, 10)}..</Text>
                                                    ) : (
                                                        <Text style={styles.textDescription}>{gastronomias.description}</Text>

                                                    )}
                                                    <AntDesign name="rightsquare" size={19} style={styles.icon} color="#F80050" />
                                                </View>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </>
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


        marginTop: 10,
        borderRadius: 10,
    },
    contenedorBg: {
        height: 80,
        justifyContent: 'flex-end',
        padding: 10,

    },
    gastronomiaCard: {
        height: 140,
        width: 114,

        overflow: 'hidden',
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 0 }, // Cambia la altura a 0 para tener sombreado en todos los lados
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 15,

    },
    textDescription: {
        color: 'rgba(0, 0, 0, 0.5)',
        paddingLeft: 10,
        fontSize: 13
    },
    textTitle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10
    },
    deFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    }
});
