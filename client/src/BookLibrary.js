import React from 'react';
import axios from 'axios';
import './BookLibrary.css';
import BookTable from './BookTable';

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
        return <BookTable books={this.state.books} handleDelete={this.handleDelete} />
    }
}

export default BookLibrary;