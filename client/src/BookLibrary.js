import React from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './BookLibrary.css';
import { Link } from 'react-router-dom';

class BookLibrary extends React.Component {

    //Add Constructor
    constructor(props) {
        super(props);

        //Initialize State
        this.state = {
            books: [],
        };

        //Prevent function from using the DOM element
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // If Server is connected
        axios(process.env.REACT_APP_SERVER_URL)
            // State Requires a Key Value pair (Books: result.data)
            .then(result => this.setState({ books: result.data }))
            .catch(error => console.log(error));
    }

    refresh() {
        axios(process.env.REACT_APP_SERVER_URL)
            // State Requires a Key Value pair (Books: result.data)
            .then(result => this.setState({ books: result.data }))
            .catch(error => console.log(error));
    }

    handleDelete(id) {
        console.log('Deleting entry...', id);
        axios.delete(process.env.REACT_APP_SERVER_URL + '/' + id)
            .then(result => {
                this.refresh();
                //Refresh using JS or React component refresh
            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        let bookList = this.state.books.map(book => {

            let date = book.published.toString().substr(0, 4);
            return (
                <tr key={book.id}>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{date}</td>
                    <td><Link to={'/edit/' + book.id}><EditIcon /></Link></td>
                    {/* */}
                    <td><Link onClick={() => {if(window.confirm('Would you like to delete this entry?'))this.handleDelete(book.id)}} to="/"><DeleteForeverIcon /></Link></td>
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
}

export default BookLibrary;