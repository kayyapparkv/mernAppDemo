const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost');

//Routes
router.get('/', (req, res) => {
    BlogPost.find({ })
    .then((data) => {
        console.log('Data:', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error:', error);
    });
});

router.post('/save', (req, res) => {
    console.log('Body:', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    //.save()
    newBlogPost.save((error) => {
        if(error) {
            res.status(500).json({
                message: 'Sorry, Internal server error'
            });
            return;
        }
        return res.json({
            message:'Your Data has been saved!'
        });
    })
});

module.exports = router;