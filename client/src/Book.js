import React from 'react';
import './Book.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Book extends React.Component {

    //Regex Validation
    validation = {
        author: {
            rule: /^\S.{0,48}\S$/,
            message: 'Author field must have 2-50 characters'
        },
        title: {
            rule: /^\S.{0,68}\S$/,
            message: 'Title field must have 2-70 characters'
        },
        published: {
            rule: /^\d{4}$/,
            message: 'Published date must be a 4 digit year'
        }
    }

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

    //Function for form validation rules
    validate() {
        

        for (let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if(!value.match(rule)){
                this.showMessage(message);
                return false;
            }

        }
        return true;
    }

    //Input Flash Message
    showMessage(message){
        this.setState({message: message});
        setTimeout(()=>{
            this.setState({message:''})
        },3000);
    }

    //POST to Database
    handleSubmit(event) {

        //Prevent Rerouting
        event.preventDefault();

        if(!this.validate()){
            return;
        };
        let { author, title, published } = this.state;

        published += '-01-01';

        const book = {
            author: author,
            title: title,
            published: published
        }

        axios.post(process.env.REACT_APP_SERVER_URL, book)
            .then(result => {
                this.setState({ created: true })
            })
            .catch(error => {
                console.log(error);
            });
        
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }



    render() {
        if (this.state.created) {
            return <Redirect to="/" />;
        }
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
                    <div className="message">{this.state.message}</div>
                </form>
                
            </div>
        );
    }
}

export default Book;