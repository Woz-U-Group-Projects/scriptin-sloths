var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport'); 

// default page

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Sign up  

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});



// Login in 

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) { res.redirect('profile') });

//profile by ID

router.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});

// create post 

router.post('/posts', (req, res) => {

  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {

  models.posts
  
    .findOrCreate({
      where: {
        PostTitle: req.body.PostTitle,
        PostBody: req.body.PostBody,
        UserId  : user.UserId,
        Deleted: req.body.Deleted ? req.body.Deleted : null,
        createdAt: req.body.createdAt ? req.body.createdAt : null,
        updatedAt: req.body.updatedAt ? req.body.updatedAt : null
      }
    })
    .spread(function (result) {
      if (result) {
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send({success: false});
      }
    });

  } else {
    res.send('User not found');
  }
});
} else {
res.redirect('/users/login');
}
});



module.exports = router;
