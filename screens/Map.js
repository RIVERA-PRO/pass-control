import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    const [region, setRegion] = useState({
        latitude: -24.7859, // Latitud de Salta Capital
        longitude: -65.4117, // Longitud de Salta Capital
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestLocationPermission();
        }
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permiso de ubicación',
                    message: 'Necesitamos acceder a tu ubicación para mostrar el mapa.',
                    buttonPositive: 'Aceptar',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permiso de ubicación otorgado');
            } else {
                console.log('Permiso de ubicación denegado');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                <Marker
                    coordinate={{
                        latitude: -24.7859, // Latitud del marcador (Salta Capital)
                        longitude: -65.4117, // Longitud del marcador (Salta Capital)
                    }}
                    title="Salta Capital"
                    description="Ciudad de Salta, Argentina"
                />
            </MapView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
