var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
const posts = require('../models/posts');
const users = require('../models/users');
var passport = require('../services/passport'); 

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
        res.redirect('/users/login');
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
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/users/login');
      } else {
        res.send('This user already exists');
      }
    });
});

// user Login in 

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) { res.redirect('/users/profile') });
  
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
  } else {
    res.redirect('/users/login');
  }
});

// members by id

router.get('/profile/:id', function(req, res, next) {
  if (req.user) {
  models.users
    .findOne({  
      where: { UserId: parseInt(req.params.id) }
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
  res.redirect('/users/login');
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
  res.redirect('/users/login');
}
});

// artist & user profile 

router.get('/profile', function (req, res, next) {
  if (req.user && req.user.Admin) {
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
      } 
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
res.redirect('/users/login');
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
res.redirect('/users/login');
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
    res.redirect('/users/login');
  }
});

// logout

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;