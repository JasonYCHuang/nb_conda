import React, { Component } from 'react';

import BookList from './book/book-list';
import BookDetail from './book/book-detail';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}
