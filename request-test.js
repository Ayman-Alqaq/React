'use strict';

const axios = require('axios');

const book = {
    'author': 'V. S. Ramachandran',
    'title': 'Phantoms in the Brain',
    'published': '1998-01-01'
}

// axios.post('http://localhost:3000/books', book)
// .then(response =>{
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });

// axios.get('http://localhost:3000/books', book)
// .then(response =>{
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });

// axios.put('http://localhost:3000/books/114', book)
// .then(response =>{
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });

axios.delete('http://localhost:3000/books/111')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });