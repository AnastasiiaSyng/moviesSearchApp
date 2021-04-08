import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  Button,
} from 'react-native';

import {API_KEY} from '@env';

export default function MoviesSearch() {
  const [state, setState] = useState({
    movies: '',
    moviesList: [],
    selectedMovie: {},
  });
  const {movies, moviesList, selectedMovie} = state;

  const getMoviesFromApi = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movies}&page=1`,
    )
      .then(response => response.json())
      .then(({results}) => {
        setState(prevState => {
          return {...prevState, moviesList: results};
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  const openSelectedMovie = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
      .then(response => response.json())
      .then(data => {
        setState(prevState => {
          return {...prevState, selectedMovie: data};
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie search</Text>
      <TextInput
        placeholder="Find movie..."
        style={styles.searchInput}
        value={state.movies}
        onChangeText={text =>
          setState(prevState => {
            return {...prevState, movies: text};
          })
        }
        onSubmitEditing={getMoviesFromApi}
      />

      <ScrollView style={styles.results}>
        {moviesList?.map(({id, backdrop_path, original_title}) => (
          <View key={id} style={styles.result}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + backdrop_path,
              }}
            />
            <Text style={styles.heading}>{original_title}</Text>
            <Button title="View" onPress={() => openSelectedMovie(id)} />
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof selectedMovie.id !== 'undefined'}>
        <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://image.tmdb.org/t/p/w500' + selectedMovie.backdrop_path,
            }}
          />
          <Text>{selectedMovie.original_title}</Text>
          <Text>{selectedMovie.overview}</Text>
          <Text>Budget:${selectedMovie.budget}</Text>
          <Text>Releas date: {selectedMovie.release_date}</Text>
        </View>
        <Button
          title="Back"
          onPress={() =>
            setState(prevState => {
              return {...prevState, selectedMovie: {}};
            })
          }
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
  },
  searchInput: {
    width: '90%',
    fontSize: 20,
    fontWeight: '300',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    marginBottom: 40,
  },
  results: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'black',
  },
  heading: {
    color: 'white',
    padding: 20,
    fontSize: 20,
    fontWeight: 'normal',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  image: {
    width: '40%',
    height: 150,
  },
  result: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
