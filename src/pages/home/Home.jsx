import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  
  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/logo.png')} />
        <Button title='Catalogo' onPress={() => navigation.navigate("Catalog")} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1, // Adiciona flex para garantir que o container ocupe todo o espaço disponível
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  logo: {
    width: '100%',
    height: 140,
    margin: 16,
  },
});
