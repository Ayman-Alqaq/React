import React from 'react';
import axios from 'axios';

class BookLibrary extends React.Component {

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        axios(process.env.REACT_APP_SERVER_URL)
            .then(result => this.setState({ books: result.data }))
            .catch(error => this.setState({ errorMessage: error.toString() }));
    }


    render() {
        return (<div>Library</div>)
    }
}

export default BookLibrary;