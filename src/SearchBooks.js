import React from 'react'
import Books from './Books'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component{
    state = {
        searchBooks: [],
    }
    search = (query) => {
        BooksAPI.search(query).then((books) => {
            if(books){
                this.setState({ searchBooks:books });
                console.log(books);
            }
        })
    }
    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(event) => this.search(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Books books={this.state.searchBooks} />
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
