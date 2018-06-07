import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Books from './Books'

class Home extends React.Component {
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
                                        <Books books={this.props.currentlyReadingBooks} changeBookState={this.props.onChangeBookState} />
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        <Books books={this.props.wantToReadBooks} changeBookState={this.props.onChangeBookState} />
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        <Books books={this.props.readBooks} changeBookState={this.props.onChangeBookState} />
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
