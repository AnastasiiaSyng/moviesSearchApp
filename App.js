import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {API_KEY} from '@env';

export default function App() {
  const [state, setState] = useState({
    movie: '',
    results: [],
  });
  const getMoviesFromApi = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${state.movie}&page=1`,
    )
      .then(response => response.json())
      .then(({results}) => {
        setState({results: results});
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log(state.results, 'state');
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

      <ScrollView style={styles.results}>
        {state.results?.map(result => (
          <TouchableHighlight key={result.id}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + result.backdrop_path,
                }}
              />
              <Text style={styles.heading}>{result.original_title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
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
  results: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    padding: 20,
    fontSize: 30,
    fontWeight: '200',
  },
  image: {
    width: '100%',
    height: 200,
  }
});
