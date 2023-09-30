import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import image from '../assets/Cloud.png'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../assets/logo.png';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PerfilComponent from './PerfilComponent'
export default function Header() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home');
        setModalVisible(false);
    };
    const goToAtractivos = () => {
        navigation.navigate('AllPublicacionesScreen');
        setModalVisible(false);
    };

    const goToGastronomias = () => {
        navigation.navigate('AllGastronomiasScreen');
        setModalVisible(false);
    };
    const goToAlojamientos = () => {
        navigation.navigate('AllAlojamientosSreen');
        setModalVisible(false);
    };
    const goToLogin = () => {
        navigation.navigate('Perfil');
        setModalVisible(false);
    };

    const openLinkedInProfile = () => {
        const linkedInURL = 'https://www.linkedin.com/in/juan-rivera-9ba866215/'; // Reemplaza con tu URL de LinkedIn
        Linking.openURL(linkedInURL);
    };

    const openWebsite = () => {
        const websiteURL = 'https://www.juan-rivera-developer.net'; // Reemplaza con tu URL del sitio web
        Linking.openURL(websiteURL);
    };

    const openWhatsAppChat = () => {
        const phoneNumber = '1234567890'; // Reemplaza con tu número de teléfono
        const whatsappURL = `https://wa.me/qr/AHQDYWM7EKATH1`;
        Linking.openURL(whatsappURL);
    };

    const [userData, setUserData] = useState(null);

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
        <LinearGradient colors={['#F80050', '#F80050',]} style={styles.container} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>


            <View >


                <View style={styles.logoContainer} >
                    <TouchableOpacity onPress={goToHome} style={styles.logoContainer} >
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoText}>Turismo Salta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}>
                        <EvilIcons name="navicon" size={24} color="#ffff" />
                    </TouchableOpacity>
                </View>





                <Modal
                    isVisible={isModalVisible}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    swipeDirection="left"
                    onSwipeComplete={toggleModal}
                    onBackdropPress={toggleModal}
                    style={styles.modal}
                >


                    <View style={styles.modalContent} >

                        <Image source={image} style={styles.img} />
                        <View style={styles.navBtns}>

                            {userData &&
                                <PerfilComponent />
                            }

                            <TouchableOpacity onPress={goToHome} style={styles.btnNav}>
                                <FontAwesome name="home" size={20} color='#F80050' />
                                <Text style={styles.buttonText}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={goToAtractivos} style={styles.btnNav}>


                                <MaterialCommunityIcons name="map-marker-star" size={20} color='#F80050' />
                                <Text style={styles.buttonText}>Atractivos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={goToGastronomias} style={styles.btnNav}>


                                <MaterialIcons name="no-meals" size={20} color='#F80050' />
                                <Text style={styles.buttonText}>Gastronomia</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={goToAlojamientos} style={styles.btnNav}>
                                <Ionicons name="bed" size={20} color='#F80050' />
                                <Text style={styles.buttonText}>Alojamientos</Text>
                            </TouchableOpacity>


                            {!userData &&
                                <TouchableOpacity onPress={goToLogin} style={styles.btnNav}>

                                    <FontAwesome5 name="user-alt" size={18} color='#F80050' />
                                    <Text style={styles.buttonText}>Ingresar</Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={toggleModal} style={styles.btnNav}>

                                <MaterialIcons name="logout" size={20} color="#F80050" />
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </TouchableOpacity>

                            <Text style={styles.text}>Contacto del desarrollador</Text>
                            <View style={styles.social}>
                                <TouchableOpacity onPress={openLinkedInProfile} style={styles.btnNav}>
                                    <FontAwesome name="linkedin" size={20} color="#F80050" />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={openWebsite} style={styles.btnNav}>
                                    <FontAwesome name="globe" size={20} color="#F80050" />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={openWhatsAppChat} style={styles.btnNav}>
                                    <FontAwesome name="whatsapp" size={20} color="#F80050" />

                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>

                </Modal>
            </View>
        </LinearGradient>
    );
}

const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
    container: {

        paddingHorizontal: 10,
        flexDirection: 'column',
        padding: 20,
        height: 100,
        paddingTop: 60,
        justifyContent: 'center',

        width: '100%',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,



    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        padding: 2,
    },
    logo: {
        width: 20,
        height: 20,


    },
    logoText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    logoDate: {
        color: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        fontSize: 17,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,

    },
    buttonText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: 'bold',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',

    },
    modalContent: {
        backgroundColor: '#fff',

        overflow: 'hidden',
        width: '80%',
        height: '100%',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10

    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: 160,
        objectFit: 'cover'
    },
    navBtns: {
        marginTop: 10
    },

    btnNav: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 8,
        padding: 10,
        margin: 9,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    social: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    text: {
        textAlign: 'center',
        marginTop: 60
    },
    modal: {
        margin: 0,

    }
});
