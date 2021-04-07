import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {API_KEY} from '@env';

export default function App() {
  const [state, setState] = useState({
    movie: '',
    results: [],
  });
  const getMoviesFromApi = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=marvel&page=1`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json.movies;
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
        value={state.movie}
        onChangeText={text => setState({movie: text})}
        onSubmitEditing={getMoviesFromApi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
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
});
