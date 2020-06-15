const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost');

//Routes
router.get('/', (req, res) => {
    BlogPost.find({ }).limit(7).sort({"DATE ": -1})
    .then((data) => {
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
    BlogPost.insertMany(data, (error) => {
        if(error) {
            res.status(500).json({
                message: 'Sorry, Internal server error or Wrong Format Data'
            });
            return;
        }
        return res.json({
            message:'Your Data has been saved!'
        });
    })
});

module.exports = router;