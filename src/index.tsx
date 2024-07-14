import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Card from './components/cardbox';
import CardInfo from './components/cardInfo';

const Index = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCardInfo, setShowCardInfo] = useState<boolean>(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState<any>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allDataFetched, setAllDataFetched] = useState<boolean>(false);
  
  const fetchData = async () => {
    try {
      setLoadingMore(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

      const results = response.data.results;
      const pokemonData = await Promise.all(results.map(async (pokemon: any) => {
        const pokemonResponse = await axios.get(pokemon.url);
        const descriptionResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonResponse.data.id}/`);
        
        const formattedDescription = descriptionResponse.data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' ');
  
        return {
          name: pokemonResponse.data.name,
          id: pokemonResponse.data.id,
          image: pokemonResponse.data.sprites.other.home.front_default,
          layout:pokemonResponse.data.sprites.other.showdown.front_default,
          types: pokemonResponse.data.types.map((type: any) => type.type.name),
          description: formattedDescription,
        };
      }));
  
      if (pokemonData.length === 0) {
        setAllDataFetched(true);
      } else {
        setPokemonList(prevPokemonList => [...prevPokemonList, ...pokemonData]);
        setOffset(offset + limit);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = (event: any) => {
    if (!event.nativeEvent) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (!loadingMore && !allDataFetched) {
        fetchData();
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <ScrollView
        style={styles.cardList}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pokemonList.map((pokemon: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedCardInfo({
                imageSource: pokemon.image,
                title: pokemon.name,
                types: pokemon.types,
                description: pokemon.description,
                layout: pokemon.layout
              });
              setShowCardInfo(true);
            }}
          >
            <Card imageSource={pokemon.image} title={pokemon.name} types={pokemon.types} />
          </TouchableOpacity>
        ))}
        {loadingMore && <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Carregando mais...</Text>}
      </ScrollView>

      {showCardInfo && (
        <CardInfo
          imageUrl={selectedCardInfo.imageSource}
          name={selectedCardInfo.title}
          onClose={() => setShowCardInfo(false)}
          profileImageUrl={''}
          description={selectedCardInfo.description} layoutURL={selectedCardInfo.layout}        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#636161',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  logo: {
    width: '100%',
    height: 140,
    margin: 16,
  },
  cardList: {
    flex: 1,
    width: '100%',
    marginLeft: 30,
  },
});

export default Index;
