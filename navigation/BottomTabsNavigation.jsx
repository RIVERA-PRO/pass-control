import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, image, style, Platform } from 'react-native';
import Home from '../screens/Home'
import Detail from '../screens/Detail'
import DetailAlojamientos from '../screens/DetailAlojamientos'
import DetailGastronomia from '../screens/DetailGastronomia'
import AllPublicacionesScreen from '../screens/AllPublicacionesScreen'
import AllAlojamientosSreen from '../screens/AllAlojamientosSreen'
import AllGastronomiasScreen from '../screens/AllGastronomiasScreen'
import PerfilScreen from '../screens/PerfilScreen'
import Perfil from '../screens/Perfil'
import SearchScreen from '../screens/SearchScreen'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {

    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();
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
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottonm: 25,
                    left: 20,
                    right: 20,

                    borderRadius: 15,
                    height: 56,


                },
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 3,
                },
                activeTintColor: '#F80050',
                inactiveTintColor: 'rgba(0, 0, 0, 0.3)',


            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    // tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',
                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#fff',
                    headerShown: false,
                    tabBarLabel: 'Home',

                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />



            <Tab.Screen
                name="AllPublicacionesScreen"
                component={AllPublicacionesScreen}
                options={{

                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'AllGastronomiasScreen',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="local-attraction" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AllAlojamientosSreen"
                component={AllAlojamientosSreen}
                options={{

                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'AllAlojamientosSreen',
                    tabBarIcon: ({ color }) => (

                        <Ionicons name="bed" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AllGastronomiasScreen"
                component={AllGastronomiasScreen}
                options={{

                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'AllGastronomiasScreen',
                    tabBarIcon: ({ color }) => (

                        <MaterialIcons name="no-meals" size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={20} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="Detail"
                component={Detail}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Detail',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'SearchScreen',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="DetailGastronomia"
                component={DetailGastronomia}
                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'DetailGastronomia',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="DetailAlojamientos"
                component={DetailAlojamientos}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'DetailAlojamientos',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="PerfilScreen"
                component={PerfilScreen}

                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'PerfilScreen',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={20} color={color} />
                    ),
                }}
            />




        </Tab.Navigator >


    );
}

export default BottomTabsNavigation;
