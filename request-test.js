'use strict';

const axios = require('axios');

const book = {
    'author': 'Oliver Sacks',
    'title': 'The Man Who Mistook His Wife For A Hat',
    'published': '1985-01-01'
}

axios.post('http://localhost:3000/books', book)
.then(response =>{
    console.log(response);
})
.catch(error => {
    console.log(error);
});

// axios.get('http://localhost:3000/books', book)
// .then(response =>{
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });

// axios.put('http://localhost:3000/books', book)
// .then(response =>{
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });

// axios.delete('http://localhost:3000/books/12345')
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });