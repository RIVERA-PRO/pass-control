import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Modal, ScrollView } from 'react-native';


export default function LoadingUsers() {

    return (
        <ScrollView horizontal={true}>
            <View style={styles.card}>

                <Text style={styles.img}></Text>
                <Text style={styles.text2}></Text>

            </View>
            <View style={styles.card}>

                <Text style={styles.img}></Text>
                <Text style={styles.text2}></Text>

            </View>
            <View style={styles.card}>

                <Text style={styles.img}></Text>
                <Text style={styles.text2}></Text>

            </View>
            <View style={styles.card}>

                <Text style={styles.img}></Text>
                <Text style={styles.text2}></Text>

            </View>
            <View style={styles.card}>

                <Text style={styles.img}></Text>
                <Text style={styles.text2}></Text>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({



    card: {
        backgroundColor: '#000',

        flexDirection: 'column',
        gap: 20,
        paddingVertical: 10,
        padding: 10,

        borderRadius: 10,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        height: 100,
        flex: 1,

        marginLeft: 15,
        height: 140,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },

    img: {
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        margin: 2
    },
    text2: {
        height: 20,
        width: 90,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        margin: 2

    },



})
