import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'

class Home extends React.Component {
    state = {
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        ReadBooks: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ currentlyReadingBooks: books.filter((book) => (book.shelf === "currentlyReading")) });
            this.setState({ wantToReadBooks: books.filter((book) => (book.shelf === "wantToRead")) });
            this.setState({ ReadBooks: books.filter((book) => (book.shelf === "read")) });
            console.log(books);
        })
    }
    changeBookState = (book, shelf) => {
        BooksAPI.update(book, shelf);
        BooksAPI.getAll().then((books) => {
            this.setState({ currentlyReadingBooks: books.filter((book) => (book.shelf === "currentlyReading")) });
            this.setState({ wantToReadBooks: books.filter((book) => (book.shelf === "wantToRead")) });
            this.setState({ ReadBooks: books.filter((book) => (book.shelf === "read")) });
            console.log(books);
        })
    }
    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        <Books books={this.state.currentlyReadingBooks} changeBookState={this.changeBookState} />
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        <Books books={this.state.wantToReadBooks} changeBookState={this.changeBookState} />
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        <Books books={this.state.ReadBooks} changeBookState={this.changeBookState} />
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
