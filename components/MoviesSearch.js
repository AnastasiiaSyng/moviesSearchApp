import React, {useState} from 'react';
import {styles} from './MoviesSearch.styles';
import {
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  Button,
  TouchableHighlight,
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
        value={movies}
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
            <TouchableHighlight style={styles.buttonStyles}>
              <Button
                color="#374785"
                title="View"
                onPress={() => openSelectedMovie(id)}
              />
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof selectedMovie.id !== 'undefined'}>
        <View style={styles.modalContainer}>
          <Image
            style={styles.imageModal}
            source={{
              uri:
                'https://image.tmdb.org/t/p/w500' + selectedMovie.backdrop_path,
            }}
          />
          <Text style={styles.infoModal}>{selectedMovie.original_title}</Text>
          <Text style={styles.infoModal}>{selectedMovie.overview}</Text>
          <Text style={styles.infoModal}>Budget:${selectedMovie.budget}</Text>
          <Text style={styles.infoModal}>
            Releas date: {selectedMovie.release_date}
          </Text>

          <TouchableHighlight style={styles.buttonStyles}>
            <Button
              color="#374785"
              title="Back"
              onPress={() =>
                setState(prevState => {
                  return {...prevState, selectedMovie: {}};
                })
              }
            />
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}
