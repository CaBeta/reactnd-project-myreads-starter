import React from 'react'

function Books(props){
    const isBooksError = props.books.error;
    return(
      isBooksError ? ( <div></div>
      ): (props.books.map((book) => (
      <li key={book.id}>
        <div className="book" >
          <div className="book-top">
            {book.imageLinks ? (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>):
            (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(https://books.google.com/googlebooks/images/no_cover_thumb.gif)"}}></div>)}
            <div className="book-shelf-changer">
              <select onChange={(event) => props.changeBookState(book, event.target.value)} value={book.shelf ? book.shelf : "move"}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>)
        )))
}

export default Books
