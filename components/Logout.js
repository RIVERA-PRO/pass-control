
import { MaterialIcons } from '@expo/vector-icons';
import { React, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }] // O cambia a 'Register' si corresponde
            });
            // Recargar la aplicación

            window.location.reload();

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // This will run when the component is in focus
    //         handleLogout();

    //     });

    //     return unsubscribe;
    // }, []);

    return (

        <TouchableOpacity onPress={handleLogout} style={styles.BtnLogout}>
            <MaterialIcons name="logout" size={18} color='rgba(0, 0, 0, 0.7)' />
            <Text style={styles.social}>Cerrar sesion</Text>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    social: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        fontSize: 14
    },
    BtnLogout: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    }
});
