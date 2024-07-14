import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface CardInfoProps {
    imageUrl: string;
    profileImageUrl: string;
    name: string;
    description: string;
    onClose: () => void;
    layoutURL: string;
}

const CardInfo: React.FC<CardInfoProps> = ({
    imageUrl,
    profileImageUrl,
    name,
    description,
    onClose,
    layoutURL,
}) => {
    return (
        <View style={styles.modal}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.backgroundImage}>
                <Image source={{ uri: layoutURL }} style={styles.backgroundImage} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.profileImage} />
                </View>
                <Text style={styles.name}>{name}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            <View>
                <Text style={styles.sectionTitle}>Principais habilidades</Text>
                <View style={styles.attackContainer}>
                    <Text style={styles.attackTitle}>Ataque:</Text>
                    <Text style={styles.attackDescription}>descrição de ataque</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        maxWidth: '95%',
        height: '95%',
        marginTop: 55,
        position: 'absolute',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        marginBottom: -20,
        borderBottomWidth: 1,
        zIndex: -10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: 16,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        color: 'gray',
        marginLeft: '15%',
        fontSize: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    attackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    attackTitle: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    attackDescription: {
        color: 'gray',
    },
});

export default CardInfo;