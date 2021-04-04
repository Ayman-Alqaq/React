import React from 'react';
import './Book.css';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import FlashMessage from './FlashMessage';

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
            id: props.match.params.id,
            author: '',
            title: '',
            published: '',
            warningCount: 0
        };

        //Specifies the change is this function and not the DOM Object
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Allows data to be prefilled when using the EDIT button
    componentDidMount(){
        if(!this.state.id){
            return;
        }

        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
        .then(result =>{
            //Use error handling to handle empty data set
            let { author, title, published} = result.data[0];

            this.setState({
                author: author,
                title: title,
                published: published.substr(0,4)
            })

        })
        .catch(error => {
            this.warning("Unable to Load Book.")
        })
    }

    warning(message){
        this.setState({ message: message, warningCount: this.state.warningCount + 1 });
    }

    //Function for form validation rules
    validate() {
        for (let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if (!value.match(rule)) {
                this.warning(message);
                return false;
            }

        }
        return true;
    }

    //POST to Database
    handleSubmit(event) {

        //Prevent Rerouting
        event.preventDefault();

        if (!this.validate()) {
            return;
        };
        let { id, author, title, published } = this.state;

        published += '-01-01';

        const book = {
            id: id,
            author: author,
            title: title,
            published: published
        }

        let updateFunc = axios.post;
        let url = process.env.REACT_APP_SERVER_URL;

        //Allows functionality of Editing entries 
        if(id){
            updateFunc = axios.put;
            url += '/' + id;
        }

        updateFunc(url, book)
            .then(result => {
                this.setState({ created: true })
            })
            .catch(error => {
                this.warning("Unable to Save Book")
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
                    {/* Every time the submit button is pressed, the key value is incremented.  key={this.state.submitAttempt} */}
                    <FlashMessage message={this.state.message} duration='3000' key={this.state.warningCount}/>
                </form>

            </div>
        );
    }
}

export default withRouter(Book);