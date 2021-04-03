import React from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './BookLibrary.css';
class BookLibrary extends React.Component {

    //Add Constructor
    constructor(props) {
        super(props);

        //Initialize State
        this.state = {
            books: [],
        };
    }

    componentDidMount() {
        // If Server is connected
        axios(process.env.REACT_APP_SERVER_URL)
            // State Requires a Key Value pair (Books: result.data)
            .then(result => this.setState({ books: result.data }))
            .catch(error => console.log(error));
    }


    render() {
        let bookList = this.state.books.map(book => {
            
            let date = book.published.toString().substr(0,4);
            return (
                <tr key={book.id}>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{date}</td>
                    <td><EditIcon /></td>
                    <td><DeleteForeverIcon /></td>
                </tr>
            )
        });

        let tHeader = <tr><th>Author</th><th>Title</th><th>Published</th></tr>;

        console.log('render', this.state.books);
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