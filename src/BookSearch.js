import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

/**
 * Component for book search (calls bookshelf component to display results)
 */
class BookSearch extends Component {
    static propTypes = {
        bookSearchResult: PropTypes.array.isRequired,
    }
    state = {
        query: '',
        bookSearchResult: [],
    }

    /**
     * Update the search query
     * @param query
     */
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        BooksAPI.search(query)
            .then((bookSearchResult) => {
                this.setState(() => ({
                    bookSearchResult
                }))
            })
    }

    /**
     * Force an update of the search poge
     */
    updatePage = () => {
        this.forceUpdate();
    }

    /**
     * render the search component
     * @returns {JSX.Element}
     */
    render() {
        const { query, bookSearchResult } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <button className="close-search" onClick={()=>{window.location.href='/'}}>Close</button>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            className='search-books'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) =>
                                this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {(bookSearchResult !== undefined) &&
                    (bookSearchResult.length > 0) ? (
                        <BookShelf
                            title='Search Results:'
                            books={this.state.bookSearchResult}
                            updatePage={this.updatePage}
                        />
                    ) : (
                        <div>
                            {(query.length > 0) &&
                                /* No book found, display some message */
                                <div className='search-error-text'>
                                    Sorry, no books found. Please try a different search.
                                </div>
                            }
                            {/* No query entered yet, or no books found, display possible search terms */}
                            <div className='search-help-text'>
                                <strong>Supported search terms are:</strong> 'Android', 'Art', 'Artificial
                                Intelligence',
                                'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
                                'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
                                'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
                                'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
                                'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
                                'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson',
                                'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
                                'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
                                'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
                                'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                                'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default BookSearch;