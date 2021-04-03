import React from 'react';
import axios from 'axios';

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
        console.log('render', this.state.books);
        return (<div>Library</div>)
    }
}

export default BookLibrary;