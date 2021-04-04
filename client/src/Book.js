import React from 'react';
import './Book.css';

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

    handleSubmit(event) {
        console.log(this.state);
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