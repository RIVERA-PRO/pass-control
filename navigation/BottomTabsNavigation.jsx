import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, image, style, Platform } from 'react-native';
import Home from '../screens/Home'


import NotasScreen from "../screens/NotasScreen";

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {




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
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(255, 255, 255, 0.8)',


            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#022a9b',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />



            <Tab.Screen
                name="NotasScreen"
                component={NotasScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View
                            style={{
                                top: Platform.OS === "ios" ? -20 : -20,
                                width: Platform.OS === "ios" ? 45 : 55,
                                height: Platform.OS === "ios" ? 45 : 55,
                                borderRadius: Platform.OS === "ios" ? 25 : 30,
                                position: 'absolute',
                                bottom: 10,
                                backgroundColor: '#320D5B',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 10, height: 20 },
                                shadowOpacity: 10.25,
                                shadowRadius: 300,
                                elevation: 7,

                            }}
                        >
                            <Feather name="plus" size={30} color="#fff" />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',

                    },
                    activeTintColor: '#022a9b',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                }}
            />

        </Tab.Navigator >


    );
}

export default BottomTabsNavigation;
