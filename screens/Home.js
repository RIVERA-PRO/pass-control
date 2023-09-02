import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/HeaderBlanco';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AllNotas from '../components/AllNotas';
import Notas from '../components/Notas';

export default function Home() {
    const navigation = useNavigation();
    const [showHomeComponent, setShowHomeComponent] = useState(true);
    const [showActividad, setShowActividad] = useState(false);
    const [homeOpacity] = useState(new Animated.Value(0));
    const [actividadOpacity] = useState(new Animated.Value(0));
    const [homeTranslateY] = useState(new Animated.Value(100));
    const [actividadTranslateY] = useState(new Animated.Value(100));
    const [isGrafica1Visible, setIsGrafica1Visible] = useState(true);
    const isFocused = useIsFocused();
    const [actividades, setActividades] = useState([]);
    const [activeButton, setActiveButton] = useState('ingresos');

    const toggleGrafica = (button) => {
        setIsGrafica1Visible(!isGrafica1Visible);
        setActiveButton(button);
    };

    useEffect(() => {
        obtenerActividades();
    }, [isFocused]);

    const obtenerActividades = async () => {
        try {
            const actividadesGuardadas = await AsyncStorage.getItem('actividades');
            if (actividadesGuardadas) {
                const actividadesParseadas = JSON.parse(actividadesGuardadas);
                const actividadesInvertidas = actividadesParseadas.reverse();
                setActividades(actividadesInvertidas);
            }
        } catch (error) {
            console.log('Error al obtener las actividades:', error);
        }
    };

    const [animationValue] = useState(new Animated.Value(0));
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

    useEffect(() => {
        animateComponent(showHomeComponent, homeOpacity, homeTranslateY);
        animateComponent(showActividad, actividadOpacity, actividadTranslateY);
    }, [showHomeComponent, showActividad]);

    const animateComponent = (show, opacityValue, translateYValue) => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: show ? 1 : 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateYValue, {
                toValue: show ? 0 : 100,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const showHome = () => {
        setShowHomeComponent(true);
        setShowActividad(false);
    };

    const showActividadComponent = () => {
        setShowHomeComponent(false);
        setShowActividad(true);
    };

    return (
        <View contentContainerStyle={styles.scrollContaisner}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LinearGradient colors={['#320D5B', '#320D5B',]} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonBtns}>
                            <TouchableOpacity
                                style={[styles.button, showHomeComponent && styles.activeButton]}
                                onPress={showHome}
                            >
                                <Text style={[styles.buttonText, showHomeComponent && styles.activeButtonText]}>Notas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, showActividad && styles.activeButton]}
                                onPress={showActividadComponent}
                            >
                                <Text style={[styles.buttonText, showActividad && styles.activeButtonText]}>Crear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <Animated.View style={[{ transform: [{ translateY }] }]}>


                    <Animated.View style={[styles.componentContainer, { opacity: homeOpacity, transform: [{ translateY: homeTranslateY }] }]}>
                        {showHomeComponent && <AllNotas />}
                    </Animated.View>

                    <Animated.View style={[styles.componentContainer, { opacity: actividadOpacity, transform: [{ translateY: actividadTranslateY }] }]}>
                        {showActividad && (

                            <Notas />

                        )}

                    </Animated.View>
                </Animated.View>

                <View style={styles.espacio}>

                </View>




            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    scrollContaisner: {
        backgroundColor: '#f9f9f9',

    },
    scrollContainer: {
        flexGrow: 1,

        marginTop: 80,
        backgroundColor: '#f9f9f9',

    },
    scrollViewHome: {
        flex: 1,
        gap: 30,
    },
    buttonContainer: {
        padding: 20,

        width: '100%',
        height: 150,
        marginTop: 20,
        paddingTop: 50
    },
    buttonBtns: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 35,
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
    activeButtonText: {
        color: '#320D5B'
    },


    icon: {

        backgroundColor: 'rgba(2, 42, 155, 0.2)',
        backgroundColor: 'rgba(31, 194, 215, 0.1)',
        backgroundColor: 'rgba(203, 108, 230, 0.1)',
        borderRadius: 8,
        padding: 4
    },



    cambiar: {

        flexDirection: 'row',

        borderRadius: 20,

        alignItems: 'center',
        width: '50%',
        justifyContent: 'center'
    },
    cambiarText: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: '600',
        padding: 8,
        textAlign: 'center'
    },
    cambiarBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(31, 194, 215, 0.1)',
        borderRadius: 20,
        marginBottom: 20,

        margin: 15


    },

    componentContainer3: {
        marginTop: -150
    },
    espacio: {
        height: 100
    }
});
