import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374785',
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
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
    backgroundColor: '#24305E',
  },
  heading: {
    color: 'white',
    padding: 20,
    fontSize: 20,
    fontWeight: 'normal',
    flexWrap: 'wrap',
    flexShrink: 1,
    fontFamily: 'Cochin',
  },
  image: {
    width: '40%',
    height: 150,
  },
  result: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageModal: {
    marginVertical: 40,
    width: '100%',
    height: 250,
  },
  infoModal: {
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Cochin',
  },
  buttonStyles: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F76C6C',
    marginTop: 20,
    marginHorizontal: 5,
  },
  modalContainer: {
    backgroundColor: '#F8E9A1',
    flex: 1,
  },
});

export {styles};
