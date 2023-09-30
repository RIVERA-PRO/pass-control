import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';


import LoadingPublicacionesY from './LoadingPublicacionesY'; // Cambiado el nombre del componente

export default function AllAlojamientosY() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [alojamiento, setAlojamiento] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noAlojamientos, setNoAlojamientos] = useState(false); // Cambiado el nombre del estado
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredAlojamiento, setFilteredAlojamiento] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas'); // Estado para la categoría seleccionada


    const categories = ['Todas', 'Hotel', 'Motel', 'Hostal', 'Posada', 'Albergue', 'Casa de huespedes', 'Pensión', 'Cabaña', 'Camping', 'Casa de campo']; // Lista de categorías


    const fetchAlojamientos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(
                'https://turismo-salta.onrender.com/alojamiento',
                { headers }
            );

            if (response.status === 200) {
                const reversedAlojamientos = response.data.alojamientos.reverse();
                setAlojamiento(reversedAlojamientos);
                setLoading(false);
                setNoAlojamientos(reversedAlojamientos.length === 0);
                console.log(reversedAlojamientos.length);
            } else {
                console.error('Error fetching alojamientos:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching alojamientos:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAlojamientos();
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

    const navigateToDetailScreen = (alojamientoId) => {
        navigation.navigate('DetailAlojamientos', { _id: alojamientoId });
        console.log(alojamientoId)
    };

    const filterAlojamientosByTitle = () => {
        const filtered = alojamiento.filter((alojamiento) =>
            alojamiento.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
        setFilteredAlojamiento(filtered);
    };

    useEffect(() => {
        filterAlojamientosByTitle();
    }, [searchTitle, alojamiento]);
    const filterAlojamientosByCategory = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? alojamiento
                : alojamiento.filter((alojamiento) => alojamiento.categoria === selectedCategory);
        setFilteredAlojamiento(filtered);
    };

    useEffect(() => {
        filterAlojamientosByTitle();
        filterAlojamientosByCategory();
    }, [searchTitle, alojamiento, selectedCategory]);

    const filterAlojamientos = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? alojamiento
                : alojamiento.filter((alojamiento) => alojamiento.categoria === selectedCategory);
        return filtered.filter((alojamiento) =>
            alojamiento.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
    };

    useEffect(() => {
        filterAlojamientosByTitle();
        const filtered = filterAlojamientos();
        setFilteredAlojamiento(filtered);
    }, [searchTitle, alojamiento, selectedCategory]);
    return (
        <View style={styles.container}>

            {loading ? (

                <LoadingPublicacionesY />
            ) : (

                <>

                    <ScrollView style={styles.alojamientoContainer}>
                        <View style={styles.searchInputFlex}>
                            <AntDesign name="search1" size={18} color='#fff' style={styles.icon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar "
                                onChangeText={(text) => setSearchTitle(text)}
                                value={searchTitle}
                            />
                        </View>

                        {/* Componente Picker para seleccionar categoría */}
                        <View style={styles.pickerContainer}>

                            <Picker
                                style={styles.picker}
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            >
                                {categories.map((category, index) => (
                                    <Picker.Item key={index} label={category} value={category} />
                                ))}
                            </Picker>
                        </View>
                        {filteredAlojamiento.length === 0 ? (
                            <Text style={styles.noResult}>No hay resultados.</Text>
                        ) : (
                            filteredAlojamiento.map((alojamientos, index) => (
                                <View key={index} >
                                    {alojamientos.cover_photo ? (
                                        <TouchableOpacity
                                            style={styles.alojamientoCard}
                                            onPress={() => navigateToDetailScreen(alojamientos._id)}
                                        >
                                            <ImageBackground
                                                source={{ uri: alojamientos.cover_photo }}
                                                style={styles.contenedorBg}
                                            >
                                            </ImageBackground>
                                            <View style={styles.deColumn}>
                                                {alojamientos.title.length > 15 ? (
                                                    <Text style={styles.textTitle}>{alojamientos.title.slice(0, 15)}...</Text>
                                                ) : (
                                                    <Text style={styles.textTitle}>{alojamientos.title}</Text>
                                                )}
                                                {alojamientos.description.length > 30 ? (
                                                    <Text style={styles.textDescription}>{alojamientos.description.slice(0, 30)}..</Text>
                                                ) : (
                                                    <Text style={styles.textDescription}>{alojamientos.description}</Text>
                                                )}
                                                <View style={styles.deFlex}>
                                                    <Text style={styles.date}>{new Date(alojamientos.createdAt).toLocaleString()} </Text>
                                                    <AntDesign name="rightsquare" size={19} color="#F80050" />
                                                </View>
                                            </View>

                                        </TouchableOpacity>
                                    ) : null}
                                </View>
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
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 100,
        padding: 15,
    },
    alojamientoContainer: {
        flexDirection: 'column',
        gap: 10,
        width: '100%',
    },
    contenedorBg: {
        width: 120,
        justifyContent: 'flex-end',
        padding: 10,
    },
    alojamientoCard: {
        flexDirection: 'row',
        height: 110,
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 0 }, // Cambia la altura a 0 para tener sombreado en todos los lados
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 8,
        marginTop: 10,
        marginHorizontal: 5,
    },
    textDescription: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 15,
        paddingHorizontal: 10,
    },
    textTitle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 19,
        paddingLeft: 10,
        paddingTop: 10,
    },
    date: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        paddingHorizontal: 10,
    },
    searchInput: {
        paddingHorizontal: 10,
        width: '100%',
    },
    pickerContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFF',
        marginBottom: 10,
        borderColor: '#000',
        borderWidth: 0.2,
    },
    icon: {
        backgroundColor: '#F80050',
        padding: 10,
        borderRadius: 8,
    },
    searchInputFlex: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 10,
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 5,
        gap: 10,
        marginBottom: 10,
        borderColor: '#000',
        borderWidth: 0.2,
        marginTop: 10,
    },
    noResult: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 100,
        height: 400,
    },
    deColumn: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
    },
});


