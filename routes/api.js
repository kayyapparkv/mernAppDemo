const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const BlogPost = require('../models/blogPost');

//Routes
router.get('/', (req, res) => {

    //normal data with sorted date with created date
    // BlogPost.find({ }).limit(7).sort({'DATE ': -1, 'CREATED_AT': -1})
    // n((data) => {
    //     console.log(data);
    //     res.json(data);
    // })
    // .catch((error) => {
    //     console.log('error:', error);
    // });

    //data with uniques data eithout created at
    // BlogPost.aggregate(
    //     [
    //         {
    //           '$sort': {
    //             'DATE ': 1
    //           }
    //         }, {
    //           '$group': {
    //             '_id': {
    //               'FAT ': '$FAT', 
    //               'MILK PRICE': '$MILK PRICE', 
    //               'MILK PRODUCTION ': '$MILK PRODUCTION ', 
    //               'SNF': '$SNF', 
    //               'DATE ': '$DATE '
    //             }
    //           }
    //         }, {
    //           '$limit': 7
    //         }
    //       ]).then((res) => {
    //         res.json(res);
    //       })
    //       .catch ((err) => {
    //         console.log('error:', error);
    //       })

    //most recent data in redundant date
    BlogPost.aggregate(
        [
            {
              '$sort': {
                'CREATED_AT': -1
              }
            }, {
              '$group': {
                '_id': '$DATE ', 
                'array': {
                  '$push': {
                    'DATE ': '$DATE ', 
                    'CREATED_AT': '$CREATED_AT',
                    'FAT': '$FAT', 
                    'MILK PRICE': '$MILK PRICE', 
                    'MILK PRODUCTION ': '$MILK PRODUCTION ', 
                    'SNF': '$SNF'
                  }
                }
              }
            }, {
              '$sort': {
                '_id': -1
              }
            }, {
              '$project': {
                '_id': 0, 
                'recent': {
                  '$slice': [
                    '$array', -1
                  ]
                }
              }
            }, {
              '$limit': 7
            }
            
          ]).then((data) => {
            data.forEach((item) => {
              console.log(item);
            })
            res.json(data);
          })
          .catch ((err) => {
            console.log('error:', err);
          })

    

});

router.post('/save', (req, res) => {
    // console.log('Body:', req.body);
    const data = req.body;

    data.forEach((item) => {
      let date = item['DATE '];
      date = (new Date(date).getTime() + (60 * 60 * 24 * 1000));
      item['DATE '] = date;
    })
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