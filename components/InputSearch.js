import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

export default function Empieza() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [allResults, setAllResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        // Implement your fetching logic for users, publicaciones, and alojamiento here
        // Fetch all results initially and store them in allResults
        const fetchData = async () => {
            try {
                const responseUsers = await fetch("https://turismo-salta.onrender.com/gastronomia");
                const dataUsers = await responseUsers.json();

                const responsePublicaciones = await fetch("https://turismo-salta.onrender.com/publicacion");
                const dataPublicaciones = await responsePublicaciones.json();

                const responseAlojamiento = await fetch("https://turismo-salta.onrender.com/alojamiento"); // Agregado para alojamiento
                const dataAlojamiento = await responseAlojamiento.json(); // Agregado para alojamiento

                // Combine data from different sources
                const combinedResults = [
                    ...dataUsers.gastronomias,
                    ...dataPublicaciones.publicaciones,
                    ...dataAlojamiento.alojamientos, // Agregado para alojamiento
                ];
                setAllResults(combinedResults);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter the results based on the search term whenever searchTerm changes
        const filteredResults = allResults.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredResults(filteredResults);
    }, [searchTerm]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.searchInputFlex} onPress={openModal}>
                <AntDesign name="search1" size={18} color='#fff' style={styles.icon} />
                <Text style={styles.Text}>Buscar</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modaLHeader}>
                        <TouchableOpacity onPress={closeModal}>
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Buscar.."
                            placeholderTextColor='rgba(0, 0, 0, 0.6)'
                            style={[styles.inputSearch,]}
                            multiline={true}
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>
                    <ScrollView>
                        {filteredResults.map((item) => (
                            <TouchableOpacity
                                style={styles.resultItem}
                                key={item._id}
                                onPress={() => {
                                    closeModal(!modalVisible);
                                    if (item.tipo === "Atractivos") {
                                        navigation.navigate('Detail', { _id: item._id });
                                    } else if (item.tipo === "Gastronomia") {
                                        navigation.navigate('DetailGastronomia', { _id: item._id });
                                    } else if (item.tipo === "Alojamientos") { // Agregado para alojamiento
                                        navigation.navigate('DetailAlojamientos', { _id: item._id }); // Agregado para alojamiento
                                    }
                                }}
                            >
                                <Image source={{ uri: item.cover_photo }} style={styles.img} />
                                <View>
                                    {item.title.length > 35 ? (
                                        <Text style={styles.resultText}>{item.title.slice(0, 35)}...</Text>
                                    ) : (
                                        <Text style={styles.resultText}>{item.title}</Text>
                                    )}

                                    {item.tipo && (
                                        <Text style={item.tipo === "publicacion" ? styles.categoriaPublicacion : styles.categoriaPublicacion}>
                                            {item.tipo}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );

}
const styles = StyleSheet.create({
    searchInputFlex: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 10,
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 15,
        padding: 5,
        gap: 20,
        marginBottom: 10,
        borderColor: '#000',
        borderWidth: 0.2,
        marginTop: 10


    },
    icon: {
        backgroundColor: '#F80050',
        padding: 10,
        borderRadius: 8,
    },
    Text: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',

    },
    input: {
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        width: '100%',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    inputText: {
        color: 'rgba(0, 0, 0, 0.6)',
    },
    modaLHeader: {
        flexDirection: 'row',
        backgroundColor: '#F80050',

        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    inputSearch: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 7,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    resultItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: '90%'
    },
    resultText: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 17
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 100,

    },
    categoriaPublicacion: {
        color: 'rgba(0, 0, 0, 0.6)',
    },
    categoriaOtra: {
        color: 'green', // Cambia este color a tu preferencia
    },


});
