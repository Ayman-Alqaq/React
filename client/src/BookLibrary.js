import React from 'react';
import axios from 'axios';
import './BookLibrary.css';
import BookTable from './BookTable';
import FlashMessage from './FlashMessage';

class BookLibrary extends React.Component {

    //Add Constructor
    constructor(props) {
        super(props);

        //Initialize State
        this.state = {
            books: [],
            loading: false,
            error: false,
            warning: '',
            warningCount: 0
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
        // Create a loading state
        this.setState({
            loading: true,
            error: false,
        });

        axios(process.env.REACT_APP_SERVER_URL)
            // State Requires a Key Value pair (Books: result.data)
            .then(result => this.setState({ loading: false, books: result.data }))
            .catch(error => {
                this.setState({ error: true, loading: false });
            });
    }

    handleDelete(id) {
        console.log('Deleting entry...', id);
        axios.delete(process.env.REACT_APP_SERVER_URL + '/' + id)
            .then(result => {
                //Refresh using JS or React component refresh
                this.refresh();
            })
            .catch(error => {
                this.setState({
                    warningCount: this.state.warningCount + 1,
                    warning: 'Delete Failed...',
                })
            });

    }


    render() {
        let content = '';


        //Not sure why this isn't rendering
        if (this.state.loading) {
            content = (<div className="library-message" > Loading... </div>);
        //Not sure why this isn't rendering
        } else if (this.state.error) {
            content = (<div className="library-message" > An error occured. Please try again later. </div>);
        } else {
            content = (
                <div className='book-library'>
                    <FlashMessage message={this.state.warning} key={this.state.warningCount} duration='3000'/>
            <BookTable books={this.state.books} handleDelete={this.handleDelete} />
            </div>);
        }
        return content;
    }
}

export default BookLibrary;