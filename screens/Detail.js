import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/HeaderBlanco';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import { FontAwesome } from '@expo/vector-icons';
import LoadingDetail from '../components/LoadingDetail';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Linking } from 'react-native';
export default function Detail() {

    const isFocused = useIsFocused();
    const [activeSlide, setActiveSlide] = useState(0);

    const [animationValue] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const startAnimation = () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            startAnimation();
            return () => {
                animationValue.setValue(0);
            };
        }, [])
    );

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
    });



    const route = useRoute();
    const { _id } = route.params;
    const [publicacion, setPublicacion] = useState(null);
    console.log(_id)
    // Supongamos que tienes una función para cargar los detalles de la publicación con el _id
    const cargarDetallePublicacion = async (_id) => {
        try {
            // Llama a la API o realiza la consulta para obtener los detalles de la publicación
            const response = await fetch(`https://turismo-salta.onrender.com/publicacion/${_id}`);
            const data = await response.json();
            setPublicacion(data.publicacion);

            console.log(data)
        } catch (error) {
            console.error('Error al cargar el detalle de la publicación:', error);
        }
    };
    useEffect(() => {
        cargarDetallePublicacion();
    }, []);
    useEffect(() => {
        // Verificar si el _id se encuentra en los params de la ruta
        if (route.params && route.params._id) {
            // Si se encuentra, cargar los detalles de la publicación
            cargarDetallePublicacion(route.params._id);
        }
    }, [route.params]);
    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };
    const openImageModal = (imageURL) => {
        setSelectedImage(imageURL);

        setModalVisible(true);

    };
    const closeImageModal = () => {
        setSelectedImage('');

        setModalVisible(false);
    };


    const openLocationInMap = (ubicacion) => {
        Linking.openURL(ubicacion);
    };




    return (
        <View contentContainerStyle={styles.scrollContainer2}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                <Animated.View style={[{ transform: [{ translateY }] }]}>

                    {publicacion ? (
                        <>
                            <Carousel
                                data={publicacion ? [
                                    { uri: publicacion.cover_photo },
                                    { uri: publicacion.cover_photo1 },
                                    { uri: publicacion.cover_photo2 },
                                    { uri: publicacion.cover_photo3 },
                                ].filter(item => item.uri && item.uri.trim() !== '') : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => openImageModal(item.uri)}>
                                        <Image source={{ uri: item.uri }} style={styles.coverImage} />
                                    </TouchableOpacity>
                                )}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />


                            <View style={styles.pagination}>
                                {publicacion && (
                                    <Pagination
                                        dotsLength={
                                            [publicacion.cover_photo, publicacion.cover_photo1, publicacion.cover_photo2, publicacion.cover_photo3]
                                                .filter(uri => uri && uri.trim() !== '')
                                                .length
                                        }
                                        activeDotIndex={activeSlide}
                                        containerStyle={styles.paginationContainer}
                                        dotStyle={styles.paginationDot} // Cambiar el color de los puntos activos aquí
                                        inactiveDotStyle={styles.paginationInactiveDot}

                                    />
                                )}
                            </View>

                            <View style={styles.textContainer}>

                                <Text style={styles.textTitle}>{publicacion.title}</Text>
                                <View style={styles.deFlex}>

                                    <View style={styles.deFlex2}>
                                        <Feather name="star" size={20} color='rgba(0, 0, 0, 0.5)' />
                                        <Text style={styles.text}>  {publicacion.categoria}</Text>
                                    </View>
                                    <View style={styles.deFlex2}>
                                        <MaterialIcons name="local-attraction" size={20} color='rgba(0, 0, 0, 0.5)' />

                                        <Text style={styles.text}>  {publicacion.tipo}</Text>
                                    </View>

                                </View>
                                <Text style={styles.date}>{new Date(publicacion.createdAt).toLocaleString()} </Text>
                                <Text style={styles.textDescription}>{publicacion.description}</Text>

                                <TouchableOpacity onPress={() => openLocationInMap(publicacion.ubicacion)} style={styles.ubicacionFlex}>
                                    <FontAwesome name="map-marker" size={20} color="#FFF" />
                                    <Text style={styles.ubicacion}>{publicacion.ubicacion.slice(0, 40)}..</Text>
                                </TouchableOpacity>



                                <ScrollView horizontal={true}>
                                    {publicacion.cover_photo !== "" && (
                                        <TouchableOpacity onPress={() => openImageModal(publicacion.cover_photo)}>
                                            <Image source={{ uri: publicacion.cover_photo }} style={styles.photosFlexImg} />
                                        </TouchableOpacity>

                                    )}

                                    {publicacion.cover_photo1 !== "" && (
                                        <TouchableOpacity onPress={() => openImageModal(publicacion.cover_photo1)}>
                                            <Image source={{ uri: publicacion.cover_photo1 }} style={styles.photosFlexImg} />
                                        </TouchableOpacity>

                                    )}

                                    {publicacion.cover_photo2 !== "" && (
                                        <TouchableOpacity onPress={() => openImageModal(publicacion.cover_photo2)}>
                                            <Image source={{ uri: publicacion.cover_photo2 }} style={styles.photosFlexImg} />
                                        </TouchableOpacity>
                                    )}

                                    {publicacion.cover_photo3 !== "" && (
                                        <TouchableOpacity onPress={() => openImageModal(publicacion.cover_photo3)}>
                                            <Image source={{ uri: publicacion.cover_photo3 }} style={styles.photosFlexImg} />
                                        </TouchableOpacity>
                                    )}
                                </ScrollView>

                            </View>

                        </>
                    ) : (
                        <LoadingDetail />
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View style={styles.modalContainer}>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <ImageViewer
                                imageUrls={[{ url: selectedImage }]}
                                enableSwipeDown={true}
                                onSwipeDown={closeImageModal}
                                style={styles.modalImage}
                            />
                        </View>
                    </Modal>


                </Animated.View>

                <View style={styles.espacio}>

                </View>




            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    scrollContainer: {
        backgroundColor: '#ffff',
        marginTop: 100
    },

    espacio: {
        height: 200
    },
    coverImage: {
        height: 300,
        width: '100%',
        objectFit: 'cover'
    },
    modalContainer: {
        backgroundColor: '#000',
        height: '100%',
        justifyContent: 'center'

    },
    modalImage: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    closeButtonText: {
        color: '#fff',
        padding: 10,
        fontWeight: 'bold'
    },
    closeButton: {
        width: '100%',
        left: '90%',

    },
    textContainer: {
        backgroundColor: '#ffff',
        flexDirection: 'column',
        gap: 10,
        marginTop: -60,
        borderRadius: 30,

    },
    textDescription: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 15,
        paddingHorizontal: 15,

    },
    textTitle: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingTop: 40


    },
    date: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        paddingHorizontal: 15,

    },
    ubicacion: {
        color: '#fff',

    },
    ubicacionFlex: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#F80050',
        padding: 10,
        margin: 15,
        borderRadius: 10
    },

    photosFlexImg: {

        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 15,

    },
    deFlex: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between'
    },
    deFlex2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.5)',

    },
    pagination: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 220,
        zIndex: 2,
        color: 'rgba(0, 0, 0, 0.5)',
    },


});
