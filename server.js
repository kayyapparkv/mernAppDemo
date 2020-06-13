// import npm packages

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

//MONGODB ATLAS
const MONGODB_URI = 'mongodb+srv://ayyappa:9848723169@cluster0-1is9c.mongodb.net/BANDBUDHDB?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log(`mongoose is connected`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//HTTP request Logger
app.use(morgan('tiny'));

app.use('/api', routes);


if(process.env.NODE_ENV === 'production') {
    app.use(require('express').static('./client/build'));
}


app.listen(PORT, console.log(`server is started at port ${PORT}`));