var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
const posts = require('../models/posts');
const users = require('../models/users');
var passport = require('../services/passport'); 
var authService = require('../services/auth');


// artist sign up

router.get('/artistsu', function(req, res, next) {
  res.render('/users/artistsu');
});

router.post('/artistsu', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
        Admin: true
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('http://localhost:8080/');
      } else {
        res.send('This user already exists');
      }
    });
});

//user Sign up  

router.get('/signup', function(req, res, next) {
  res.render('/users/signup');
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
        Password: req.body.password,
        Admin: false
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('http://localhost:8080/');
      } else {
        res.send('This user already exists');
      }
    });
});



// new user login

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username,
      Password: req.body.password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
      res.cookie('jwt', token); // <--- Adds token to response as a cookie
      res.send(JSON.stringify(req.user));
    } else {
      console.log('Wrong password');
      res.redirect('http://localhost:8080/');
    }
  });
});


// old user Login in 



router.post('/oldlogin', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) { 
    if (req.user && req.user.Admin){
      
      res.send(JSON.stringify(req.user));
          
     
    }
    else {
    res.redirect('http://localhost:8080/myprofile');
  }
});
  
// Find all Users

router.get('/members', function (req, res, next) {
  if (req.user) {
    models.users
      .findAll({
        where: {Admin: false}
      })
      .then(members => {
        res.send(JSON.stringify(members));
      });
    } 

    else {
      res.redirect('http://localhost:8080/');
    }
    
});

// Find all Artists

router.get('/artists', function (req, res, next) {
  if (req.user) {
    models.users
      .findAll({
        where: {Admin: true}
      })
      .then(artists => {
        res.send(JSON.stringify(artists));
      });
    } 
    else {
      res.redirect('http://localhost:8080/');
    }
});



   

// members by id

router.get('/profile/:id', function(req, res, next) {
  if (req.user) {
  models.users
    .findOne({  
      where: { UserId: parseInt(req.user.UserId) }
    })
    .then(user => {
  
      models.comments
      .findAll({
        where: {
          UserId: user.UserId
        }
      })
      .then(comments => {
        models.status
        .findAll({
          where: {
            UserId: user.UserId
          }
        })
        .then(status => {
          if (user.Admin) {


            res.send(JSON.stringify(user,comments,status));
      }
else {

  res.send(JSON.stringify(user,comments,status));
  
}


        })

    }) 
    });
}
else {
  res.redirect('http://localhost:8080/');
}
});

// Kuddos system

router.post('/profile/:id', function(req, res, next) {
  if (req.user) {
    models.users
    .findByPk(parseInt(req.user.UserId))
    .then(profile => {

  models.users
    .findOne({  
      where: { UserId: parseInt(req.params.id) }
    })
    .then(user => {

      if (user) {
      
      models.comments
  
      .findOrCreate({
        where: {
          Username: profile.Username,
          CommentBody: req.body.CommentBody,
          UserId  : user.UserId,
          Deleted: req.body.Deleted ? req.body.Deleted : null,
          createdAt: req.body.createdAt ? req.body.createdAt : null,
          updatedAt: req.body.updatedAt ? req.body.updatedAt : null
        }
      }).spread(function (result) {
        if (result) {
          models.comments
          .findAll({
            where: {
              UserId: user.UserId
            }
          })
          .then(comments => {
          models.status
        .findAll({
          where: {
            UserId: user.UserId
          }
        })
        .then(status => {



          if (user.Admin) {


            res.send(JSON.stringify(user,comments,status));
          }
    else {
    
      res.send(JSON.stringify(user,comments,status));
      
    }
        })
        })
        } else {
          res.send({success: false});
        }
      }); 
    }
    else {
      res.send('User not found');
    }
    });

      })

} 

else {
  res.redirect('http://localhost:8080/');
}
});

// new profile

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});


// artist & user old profile 


router.get('/oldprofile', function (req, res, next) {
  if (req.user && req.user.Admin) {
    models.users
    .findByPk(parseInt(req.user.UserId))
    .then(user => {
      res.send(JSON.stringify(user)); 
    });
  }
  
else {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          models.status
          .findAll({
            where: {
              UserId: user.UserId
            }
          })
          .then(status => {
          models.comments
          .findAll({
            where: {
              UserId: user.UserId
            }
          })
          .then(comments => {

            res.send(JSON.stringify(user,comments,status));
          }
          )
          })
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
}
});

// create artist status

router.post('/astatus', (req, res) => {

  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {

  models.status
  
    .findOrCreate({
      where: {
        Username: user.Username,
        StatusBody: req.body.StatusBody,
        UserId  : user.UserId,
        Deleted: req.body.Deleted ? req.body.Deleted : null,
        createdAt: req.body.createdAt ? req.body.createdAt : null,
        updatedAt: req.body.updatedAt ? req.body.updatedAt : null
      }
    })
    .spread(function (result) {
      if (result) {
        models.status
        .findAll({
          where: {
            UserId: user.UserId
          }
        })
        .then(status => {
          res.send(JSON.stringify(user,status));
      })
      } else {
        res.send({success: false});
      }
    });
  } else {
    res.send('User not found');
  }
});
} else {
res.redirect('http://localhost:8080/');
}
});

// create user status

router.post('/status', (req, res) => {

  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {

  models.status
  
    .findOrCreate({
      where: {
        Username: user.Username,
        StatusBody: req.body.StatusBody,
        UserId  : user.UserId,
        Deleted: req.body.Deleted ? req.body.Deleted : null,
        createdAt: req.body.createdAt ? req.body.createdAt : null,
        updatedAt: req.body.updatedAt ? req.body.updatedAt : null
      }
    })
    .spread(function (result) {
      if (result) {
        models.status
        .findAll({
          where: {
            UserId: user.UserId
          }
        })
        .then(status => {
          
          res.redirect('http://localhost:8080/myprofile');
      })
      } else {
        res.send({success: false});
      }
    });
  } else {
    res.send('User not found');
  }
});
} else {
res.redirect('http://localhost:8080/');
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
        Username: user.Username,
        PostBody: req.body.PostBody,
        UserId  : user.UserId,
        Deleted: req.body.Deleted ? req.body.Deleted : null,
        createdAt: req.body.createdAt ? req.body.createdAt : null,
        updatedAt: req.body.updatedAt ? req.body.updatedAt : null
      }
    })
    .spread(function (result) {
      if (result) {
        models.posts
        .findAll({})
        .then(posts => {
          res.send(JSON.stringify(user,posts));
      })
      } else {
        res.send({success: false});
      }
    });

  } else {
    res.send('User not found');
  }
});
} else {
res.redirect('http://localhost:8080/');
}
});

// posts community

router.get('/posts', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
         
          models.posts
          .findAll({ 
          })
          .then(posts => {
            res.send(JSON.stringify(user,posts));
          })
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('http://localhost:8080/');
  }
});



//

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });


// logout

router.get('/oldlogout', function(req, res){
  req.logout();
  res.redirect('http://localhost:8080/');
});

module.exports = router;