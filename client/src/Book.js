import React from 'react';
import './Book.css';

function Book(){

    console.log('server url', process.env.REACT_APP_SERVER_URL);

    return (
        <div id="book-message">Hello, I am a book.</div>
    );
}

export default Book;