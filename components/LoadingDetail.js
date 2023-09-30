import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Modal, ScrollView } from 'react-native';


export default function LoadingDetail() {


    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>

            </View>
            <View>
                <Text style={styles.text}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
                <Text style={styles.text2}></Text>
            </View>
            <View style={styles.btn}>

            </View>
            <ScrollView horizontal={true} >
                <View style={styles.img}>

                </View>
                <View style={styles.img}>

                </View>
                <View style={styles.img}>

                </View>
                <View style={styles.img}>

                </View>
            </ScrollView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    container: {

        backgroundColor: '#fff',
        padding: 10
    },

    card: {
        backgroundColor: '#fff',
        marginTop: 10,
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 10,

        borderRadius: 10,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        height: 200,
        flex: 1,
        justifyContent: 'flex-end'
    },

    text: {
        height: 20,
        width: 200,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        marginTop: 15

    },
    text2: {
        height: 13,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        marginTop: 15

    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        marginRight: 10
    },
    btn: {
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        padding: 25,
        borderRadius: 10,
        marginTop: 15,
    }



})
