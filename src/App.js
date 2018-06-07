import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Home from './Home'

class BooksApp extends React.Component {
  state={
    books:[],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
      this.setState({ currentlyReadingBooks: books.filter((book) => (book.shelf === "currentlyReading")) });
      this.setState({ wantToReadBooks: books.filter((book) => (book.shelf === "wantToRead")) });
      this.setState({ readBooks: books.filter((book) => (book.shelf === "read")) });
    })
  }
  changeBookState = (book, shelf) => {
    const defaultShelf = book.shelf;
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      switch (defaultShelf) {
        case "currentlyReading":
          this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks.filter((lastBook) => (lastBook.id !== book.id)) });
          break;
        case "wantToRead":
          this.setState({ wantToReadBooks: this.state.wantToReadBooks.filter((lastBook) => (lastBook.id !== book.id)) });
          break;
        case "read":
          this.setState({ ReadBooks: this.state.ReadBooks.filter((lastBook) => (lastBook.id !== book.id)) });
          break;
        default:
          break;
      }
      switch (shelf) {
        case "currentlyReading":
          this.state.currentlyReadingBooks.push(book);
          this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks });
          break;
        case "wantToRead":
          this.state.wantToReadBooks.push(book);
          this.setState({ wantToReadBooks: this.state.wantToReadBooks });
          break;
        case "read":
          this.state.ReadBooks.push(book);
          this.setState({ ReadBooks: this.state.ReadBooks });
          break;
        default:
          break;
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Home
            currentlyReadingBooks={this.state.currentlyReadingBooks}
            wantToReadBooks={this.state.wantToReadBooks}
            readBooks={this.state.readBooks}
            onChangeBookState={this.changeBookState}
          />
        )} />
        <Route path='/search' render={() =>(
          <SearchBooks
            books={this.state.books}
            onChangeBookState={this.changeBookState}
          />
        )} />
      </Switch>
    )
  }
}

export default BooksApp;