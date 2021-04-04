import React from 'react';
import './Book.css';
import axios from 'axios';

class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            title: '',
            published: ''
        };

        //Specifies the change is this function and not the DOM Object
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //POST to Database
    handleSubmit(event) {
        //console.log(this.state);
        let {author, title, published} = this.state;

        published+= '-01-01';

        const book = {
            author: author,
            title: title,
            published: published
        }

        axios.post(process.env.REACT_APP_SERVER_URL, book)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
        //Prevent Rerouting
        event.preventDefault();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }



    render() {

        return (
            <div>
                {/* onSubmit={this.handleSubmit} <== This is used to handle submissions */}
                <form onSubmit={this.handleSubmit}>
                    {/* value={this.state.author} onChange={this.handleChange} <== This is used to control forms */}
                    <label htmlFor="author">Author</label>
                    <input value={this.state.author} onChange={this.handleChange} type="text" name="author" id="author" />
                    <label htmlFor="title">Title</label>
                    <input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="title" />
                    <label htmlFor="published">Published</label>
                    <input value={this.state.published} onChange={this.handleChange} type="text" name="published" id="published" />
                    <input type="submit" value="Save" />
                </form>
            </div>
        );
    }
}

export default Book;