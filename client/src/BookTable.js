import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './BookTable.css';
import { Link } from 'react-router-dom';

function BookTable(props) {
    let bookList = props.books.map(book => {

        let date = book.published.toString().substr(0, 4);
        return (
            <tr key={book.id}>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{date}</td>
                <td><Link to={'/edit/' + book.id}><EditIcon /></Link></td>
                {/* */}
                <td><Link onClick={() => { if (window.confirm('Would you like to delete this entry?')) props.handleDelete(book.id) }} to="/"><DeleteForeverIcon /></Link></td>
            </tr>
        )
    });

    let tHeader = <tr><th>Author</th><th>Title</th><th>Published</th></tr>;

    return (
        <div>
            <table>
                <thead>
                    {tHeader}
                </thead>
                <tbody>
                    {bookList}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable;

