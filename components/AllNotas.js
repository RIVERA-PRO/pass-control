import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Animated,
    Modal

} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from "react-native-popup-dialog";

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function AllNotas() {
    const isFocused = useIsFocused();
    const [notas, setNotas] = useState([]);
    const navigation = useNavigation();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [edittitulo, setEditTitulo] = useState('');
    const [editNota, setEditNota] = useState('');
    const [editContraseña, setEditContraseña] = useState('');
    const [editNotaId, setEditNotaId] = useState('');

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);




    useEffect(() => {
        ObtenerNotas()
    }, [isFocused])

    const ObtenerNotas = async () => {
        try {
            const notasGuardadas = await AsyncStorage.getItem('notas');
            if (notasGuardadas) {
                const notasParseadas = JSON.parse(notasGuardadas);
                const notasOrdenadas = notasParseadas.reverse()

                setNotas(notasOrdenadas);
            }
        } catch (error) {
            console.log('Error al obtener las notas:', error);
        }
    }


    const abrirModalEdicion = (id, titulo, nota, contraseña) => {
        setEditModalVisible(true);
        setEditTitulo(titulo);
        setEditNota(nota);
        setEditContraseña(contraseña);
        setEditNotaId(id);
    };

    const guardarEdicion = async () => {
        try {
            const notasGuardadas = await AsyncStorage.getItem('notas');
            if (notasGuardadas) {
                const notasParseadas = JSON.parse(notasGuardadas);
                const nuevasNotas = notasParseadas.reverse().map((nota) => {
                    if (nota.id === editNotaId) {
                        return {
                            ...nota,
                            titulo: edittitulo,
                            email: editNota,
                            contraseña: editContraseña
                        };
                    }
                    return nota;
                });
                await AsyncStorage.setItem(
                    'notas',
                    JSON.stringify(nuevasNotas)
                );
                setNotas(nuevasNotas);
                setEditModalVisible(false);
            }
        } catch (error) {
            console.log('Error al guardar la edición:', error);
        }
    };
    const eliminarNota = async () => {
        try {
            const notasGuardadas = await AsyncStorage.getItem('notas');
            if (notasGuardadas) {
                const notasParseadas = JSON.parse(notasGuardadas);
                const nuevasNotas = notasParseadas.filter(
                    (nota) => nota.id !== editNotaId
                );
                await AsyncStorage.setItem('notas', JSON.stringify(nuevasNotas));
                setNotas(nuevasNotas);
                setEditModalVisible(false);
                setDeleteModalVisible(false);
            }
        } catch (error) {
            console.log('Error al eliminar la nota:', error);
        }
    };
    const borrarTodasNotas = async () => {
        try {
            await AsyncStorage.removeItem('notas');
            setNotas([]);
        } catch (error) {
            console.log('Error al borrar todas las notas:', error);
        }
    };
    const goToNotas = () => {
        navigation.navigate('FormNotas');

    };

    const colores = [
        '#ffff',
        '#ffff',
    ];


    if (notas.length === 0) {
        return (


            <View style={styles.noHayContain}>
                <Text style={styles.noHay}>No hay Notas</Text>
            </View>



        )
    }


    return (
        <View style={styles.notasContainer}>


            <View style={styles.notasContainer}>
                {notas.map((nota, index) => (
                    <TouchableOpacity
                        style={[styles.nota, { backgroundColor: colores[index % colores.length] }]}
                        key={nota.id}
                        onPress={() => abrirModalEdicion(nota.id, nota.titulo, nota.email, nota.contraseña)}
                    >
                        <MaterialIcons name="description" style={[styles.icon]} size={0} color='#fff' />


                        <View style={[styles.card]}>


                            {nota.titulo.length > 25 ? (
                                <Text style={styles.titleTetxt}>{nota.titulo.slice(0, 25)}..</Text>
                            ) : (
                                <Text style={styles.titleTetxt}>{nota.titulo}</Text>
                            )}


                            {nota.email.length > 36 ? (
                                <Text style={styles.notaText}>{nota.email.slice(0, 36)}..</Text>
                            ) : (
                                <Text style={styles.notaText}>{nota.email}</Text>
                            )}

                            {nota.contraseña.length > 36 ? (
                                <Text style={styles.notaText}>{nota.contraseña.slice(0, 36)}..</Text>
                            ) : (
                                <Text style={styles.notaText}>{nota.contraseña}</Text>
                            )}

                            <Text style={styles.Date}>{new Date(nota.createdAt).toLocaleString()}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <ScrollView style={styles.modalContainer}>
                    <LinearGradient
                        colors={['#320D5B', '#320D5B']}
                        style={styles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.headerAtras2}>
                            <TouchableOpacity
                                style={styles.atras}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>

                        </View>
                    </LinearGradient>
                    <View style={styles.inputsEdit}>
                        <View style={styles.inputsFlex}>
                            <MaterialIcons
                                name="description"
                                size={20}
                                color="rgba(0, 0, 0, 0.3)"
                                style={styles.Icon}
                            />
                            <TextInput
                                value={edittitulo}
                                onChangeText={setEditTitulo}
                                placeholder="Titulo"
                                style={styles.inputEdit}
                                multiline={true} // Permite múltiples líneas de texto
                                numberOfLines={4} // Especifica el número inicial de líneas mostradas
                            />
                        </View>
                        <View style={styles.inputsFlex}>
                            <MaterialIcons
                                name="description"
                                size={20}
                                color="rgba(0, 0, 0, 0.3)"
                                style={styles.Icon2}

                            />
                            <TextInput
                                value={editNota}
                                onChangeText={setEditNota}
                                placeholder="Nota"
                                style={styles.inputEdit}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>


                        <View style={styles.inputsFlex}>
                            <MaterialIcons
                                name="description"
                                size={20}
                                color="rgba(0, 0, 0, 0.3)"
                                style={styles.Icon2}

                            />
                            <TextInput
                                value={editContraseña}
                                onChangeText={setEditContraseña}
                                placeholder="Nota"
                                style={styles.inputEdit}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                    </View>
                    <View style={styles.deFlexButon}>
                        <TouchableOpacity
                            style={styles.buttonGuardar}
                            onPress={() => guardarEdicion()}
                        >
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                        <View style={styles.deFlex2}>
                            <TouchableOpacity
                                style={styles.buttonEliminar}

                                onPress={() => eliminarNota()}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </Modal>
            <View style={styles.seccion}>

                <Text style={styles.text}>

                </Text>

            </View>
            <View style={styles.seccion}>

                <Text style={styles.text}>

                </Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    notasContainer: {

        paddingTop: 10,
        paddingBottom: '30%',


    },
    card: {
        flexDirection: 'column',
        width: '95%',
        gap: 4
    },
    nota: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        margin: 10,
        padding: 7,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 15,
        marginHorizontal: 20,


    },

    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        justifyContent: 'center'

    },

    notaText: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.6)',

    },
    titleTetxt: {
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: '600',

    },
    icon: {


        backgroundColor: '#320D5B',
        borderRadius: 8,
        padding: 2,
        borderRadius: 100,
        height: '100%'

    },
    Date: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 11,
        textAlign: 'right'
    },
    headerAtras2: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
    },

    inputsEdit: {
        padding: 20
    },
    inputsFlex: {
        flexDirection: 'row',


        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(203, 108, 230, 0.1)',

        borderRadius: 7,
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    inputEdit: {
        paddingHorizontal: 10,
        justifyContent: 'center',

    },
    Icon: {
        paddingTop: 24
    },
    Icon2: {
        paddingTop: 24
    },
    deFlexButon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        margin: 20,

    },
    buttonEliminar: {
        backgroundColor: '#320D5B',
        padding: 10,
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonGuardar: {
        backgroundColor: '#320D5B',
        padding: 10,
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    noHay: {
        flexGrow: 1,
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: '80%',

    },
    noHayContain: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',

        backgroundColor: '#f9f9f9',

        paddingTop: '50%',
    }
})