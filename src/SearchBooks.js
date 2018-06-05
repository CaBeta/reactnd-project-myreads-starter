import React from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component{
    state = {
        searchBooks: [],
        booksInShelf: [],
    }
    search = (query) => {
        if (!query) {
            this.setState({ searchBooks: [] });
            return;
        }
        BooksAPI.search(query).then((books) => {
            for(let book of books){
                for(let bookInShelf of this.state.booksInShelf){
                    if(bookInShelf.id === book.id){
                        book.shelf = bookInShelf.shelf;
                    }
                }
            }
            if(books){
                this.setState({ searchBooks:books });
                console.log(books);
            }
        })
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ booksInShelf: books });
        })
    }
    changeBookState(book, shelf){
        BooksAPI.update(book, shelf);
    }
    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(event) => this.search(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Books books={this.state.searchBooks} changeBookState={this.changeBookState}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
