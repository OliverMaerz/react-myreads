import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import Book from "./Book";

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading, Want to Read, Read</h2>
                    <div className="bookshelf-books">
                        <Book
                            books={this.props.books}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf