import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/HeaderBlanco';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AllPubliaciones from '../components/AllPublicaciones'
import Empieza from '../components/Empieza'
import ConoceGastronomia from '../components/ConoceGastronomia'
import InputSearch from '../components/InputSearch'
import AllGastronomia from '../components/AllGastronomia';
import MoreTextGastronomia from '../components/MoreTextGastronomia'
import MoreTextPublicaciones from '../components/MoreTextPublicaciones'
import AllAlojamientos from '../components/AllAlojamientos';
import MoreTextAlojamientos from '../components/MoreTextAlojamientos';
import ConoceAlojamientos from '../components/ConoceAlojamientos'
import AllCuentas from '../components/AllCuentas'
export default function Home() {



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




    return (
        <View contentContainerStyle={styles.scrollContainer}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                <Animated.View style={[{ transform: [{ translateY }] }]}>
                    <InputSearch />

                    <MoreTextGastronomia />
                    <AllGastronomia />
                    <ConoceGastronomia />
                    <MoreTextPublicaciones />

                    <AllPubliaciones />
                    <Empieza />
                    <ConoceAlojamientos />
                    <MoreTextAlojamientos />
                    <AllAlojamientos />
                    <AllCuentas />

                </Animated.View>

                <View style={styles.espacio}>

                </View>




            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    scrollContainer: {
        backgroundColor: '#fefefe',
        marginTop: 100,
        paddingTop: 20,

    },

    espacio: {
        height: 200
    }
});
