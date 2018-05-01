import React from 'react'

class Books extends React.Component {
  render(){
    const isBooksError = this.props.books.error;
    return(
      isBooksError ? ( <div></div>
      ): (this.props.books.map((book) => (
        <div className="book" key={book.id}>
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>)
        )))
    }
     
    
  }


export default Books
