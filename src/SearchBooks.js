import React from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash';


class SearchBooks extends React.Component{
    state = {
        searchBooks: [],
        booksInShelf: [],
    }
    search = _.debounce(query => {
        if (!query) {
            this.setState({ searchBooks: [] });
            return;
        }
        BooksAPI.search(query).then((books) => {
            if(books.error) {
                this.setState({ searchBooks: [] });
                return;
            }else{
                for(let book of books){
                    for(let bookInShelf of this.state.booksInShelf){
                        if(bookInShelf.id === book.id){
                            book.shelf = bookInShelf.shelf;
                        }
                    }
                }
                this.setState({ searchBooks:books });
            }
        })
    },400)
    componentDidMount() {
        this.setState({ booksInShelf: this.props.books });
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
                        <Books books={this.state.searchBooks} changeBookState={this.props.onChangeBookState}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
