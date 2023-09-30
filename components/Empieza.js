import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagen from '../assets/salta.jpg';
import imagen2 from '../assets/Cloud.png';

export default function Empieza() {
    const [selectedImage, setSelectedImage] = useState(imagen); // Inicia con la primera imagen
    const navigation = useNavigation();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedImage((prevImage) =>
                prevImage === imagen ? imagen2 : imagen
            );
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => {
            clearInterval(intervalId); // Limpia el intervalo cuando se desmonta el componente
        };
    }, []);

    const handleImagePress = () => {
        navigation.navigate('AllPublicacionesScreen');
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleImagePress}>
            {selectedImage && (
                <ImageBackground source={selectedImage} style={styles.image} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        height: 130,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10

    },
    image: {
        width: '100%',
        height: 130,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 8,
        overflow: 'hidden',
    },
});
