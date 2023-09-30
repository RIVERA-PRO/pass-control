import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
export default function MoreTextPublicaciones() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('AllPublicacionesScreen');
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>

            <Text style={styles.title}>Atracciones</Text>
            <View style={styles.deFlex}>
                <Text style={styles.Text}>Más</Text>
                <AntDesign name="right" size={16} color="#F80050" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',

        color: 'rgba(0, 0, 0, 0.6)',
    },
    Text: {
        color: '#F80050',
    }

});
