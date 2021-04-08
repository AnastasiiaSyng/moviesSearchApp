import React from 'react';
import MoviesSearch from '../components/MoviesSearch';
import renderer from 'react-test-renderer';

describe('MoviesSearch', () => {
  it('renders correctly MoviesSearch', () => {
    const tree = renderer.create(<MoviesSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
