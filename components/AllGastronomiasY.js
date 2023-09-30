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

export default function AllGastronomiasY() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [gastronomia, setGastronomia] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noGastronomias, setNoGastronomias] = useState(false); // Cambiado el nombre del estado
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredGastronomia, setFilteredGastronomia] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas'); // Estado para la categoría seleccionada


    const categories = ['Todas', 'Bares', 'Restaurantes', 'Cafes', 'Parrillas', 'Heladerias', 'Pizerias']; // Lista de categorías


    const fetchGastronomias = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(
                'https://turismo-salta.onrender.com/gastronomia',
                { headers }
            );

            if (response.status === 200) {
                const reversedGastronomias = response.data.gastronomias.reverse();
                setGastronomia(reversedGastronomias);
                setLoading(false);
                setNoGastronomias(reversedGastronomias.length === 0);
                console.log(reversedGastronomias.length);
            } else {
                console.error('Error fetching gastronomias:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching gastronomias:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchGastronomias();
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
        console.log(gastronomiaId)
    };

    const filterGastronomiasByTitle = () => {
        const filtered = gastronomia.filter((gastronomia) =>
            gastronomia.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
        setFilteredGastronomia(filtered);
    };

    useEffect(() => {
        filterGastronomiasByTitle();
    }, [searchTitle, gastronomia]);

    const filterGastronomiasByCategory = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? gastronomia
                : gastronomia.filter((gastronomia) => gastronomia.categoria === selectedCategory);
        setFilteredGastronomia(filtered);
    };

    useEffect(() => {
        filterGastronomiasByTitle();
        filterGastronomiasByCategory();
    }, [searchTitle, gastronomia, selectedCategory]);

    const filterGastronomias = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? gastronomia
                : gastronomia.filter((gastronomia) => gastronomia.categoria === selectedCategory);
        return filtered.filter((gastronomia) =>
            gastronomia.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
    };

    useEffect(() => {
        filterGastronomiasByTitle();
        const filtered = filterGastronomias();
        setFilteredGastronomia(filtered);
    }, [searchTitle, gastronomia, selectedCategory]);

    return (
        <View style={styles.container}>

            {loading ? (

                <LoadingPublicacionesY /> // Cambiado el nombre del componente
            ) : (

                <>

                    <ScrollView style={styles.gastronomiaContainer}>
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
                        {filteredGastronomia.length === 0 ? (
                            <Text style={styles.noResult}>No hay resultados.</Text>
                        ) : (
                            filteredGastronomia.map((gastronomias, index) => (
                                <View key={index}>
                                    {gastronomias.cover_photo ? (
                                        <TouchableOpacity
                                            style={styles.gastronomiaCard}
                                            onPress={() => navigateToDetailScreen(gastronomias._id)}
                                        >
                                            <ImageBackground
                                                source={{ uri: gastronomias.cover_photo }}
                                                style={styles.contenedorBg}
                                            >
                                            </ImageBackground>
                                            <View style={styles.deColumn}>
                                                {gastronomias.title.length > 15 ? (
                                                    <Text style={styles.textTitle}>{gastronomias.title.slice(0, 15)}...</Text>
                                                ) : (
                                                    <Text style={styles.textTitle}>{gastronomias.title}</Text>
                                                )}
                                                {gastronomias.description.length > 30 ? (
                                                    <Text style={styles.textDescription}>{gastronomias.description.slice(0, 30)}..</Text>
                                                ) : (
                                                    <Text style={styles.textDescription}>{gastronomias.description}</Text>
                                                )}
                                                <View style={styles.deFlex}>
                                                    <Text style={styles.date}>{new Date(gastronomias.createdAt).toLocaleString()} </Text>
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
    publicacionContainer: {
        flexDirection: 'column',
        gap: 10,

        width: '100%'
    },

    contenedorBg: {
        width: 120,
        justifyContent: 'flex-end',
        padding: 10
    },
    gastronomiaCard: {
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
        marginHorizontal: 5

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
        paddingTop: 10

    },
    date: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        paddingHorizontal: 10,

    },
    searchInput: {
        paddingHorizontal: 10,

        width: '100%'
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
        marginTop: 10


    },
    noResult: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 100,
        height: 400
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
    }
});
