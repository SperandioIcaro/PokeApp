import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

interface CardProps {
    imageSource?: string;
    title: string;
    types?: string[]; // Updated prop name to "types" and changed type to string[]
}

const imageMap: { [key: string]: any } = {
    normal: require('../../assets/types/normal.png'),
    fighting: require('../../assets/types/fighting.png'),
    flying: require('../../assets/types/flying.png'),
    poison: require('../../assets/types/poison.png'),
    ground: require('../../assets/types/ground.png'),
    rock: require('../../assets/types/rock.png'),
    bug: require('../../assets/types/bug.png'),
    ghost: require('../../assets/types/ghost.png'),
    steel: require('../../assets/types/steel.png'),
    fire: require('../../assets/types/fire.png'),
    water: require('../../assets/types/water.png'),
    grass: require('../../assets/types/grass.png'),
    electric: require('../../assets/types/electric.png'),
    psychic: require('../../assets/types/psychic.png'),
    ice: require('../../assets/types/ice.png'),
    dragon: require('../../assets/types/dragon.png'),
    dark: require('../../assets/types/dark.png'),
    // fairy: require('../../assets/types/fairy.png'),
    // unknown: require('../../assets/types/unknown.png'),
    // shadow: require('../../assets/types/shadow.png'),
};

const Card: React.FC<CardProps> = ({ imageSource, title, types }) => {
    const fallbackImage = require('../../assets/nfc.png');
    

    return (
        <>
            <View style={styles.card}>
                <Image source={imageSource ? { uri: imageSource } : fallbackImage} style={styles.image} /> 
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.viewTypes}>
                      {types && types.map((type, index) => (
                        <Image key={index} source={imageMap[type]} style={styles.types} />
                    ))}
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%'
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
    },
    viewTypes: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute',
        right: 0,
    },
    types: {
        flexDirection: 'row',
        width: 40,
        height: 40,
        marginLeft: 8,
    }
});

export default Card;
