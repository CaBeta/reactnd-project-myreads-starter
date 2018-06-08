import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Home from './Home'

class BooksApp extends React.Component {
  state={
    books:[],
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    })
  }
  changeBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => {
        let newBooks;

        // 获取除了当前操作的图书的所有其它图书
        const restOfBooksInShelf = prevState.books.filter(
          preBook => preBook.id !== book.id
        );

        if (shelf !== "none") {
          // 如果对图书所做的操作不是从书架移除，那么将这本书合并到 restOfBooksInShelf 中并返回一个全新的图书数组
          book.shelf = shelf;
          newBooks = restOfBooksInShelf.concat([book]);
        } else {
          newBooks = restOfBooksInShelf;
        }
        // 更新数据并渲染界面
        return {
          books: newBooks
        };
      });
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Home
            currentlyReadingBooks={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}
            wantToReadBooks={this.state.books.filter((book) => (book.shelf === "wantToRead"))}
            readBooks={this.state.books.filter((book) => (book.shelf === "read"))}
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