const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/connect');
const passport = require('passport');
// Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load User model
const User = require('../../models/Users')

//@route  GET /api/users/test
//@desc   Test url users
//@access public

router.get('/test',(req,res) => res.json({msg : 'welcome to user page'}));

//@route  POST /api/users/register
//@desc   Register User
//@access public

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  //check valid
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({email:req.body.email}).then(user => {
    if(user){
      errors.email = 'Email already exist'
      // return res.status(400).json({email:'Email already exist'});
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email,{
        s:'200', //size
        r:'bg', //rating
        d:'mm', //Default
        });
      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password ,salt, function(err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  });
 }
);

//@route  POST /api/users/login
//@desc   Login User
//@access public

router.post('/login',(req,res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  //check valid
  if(!isValid){
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //Find user by email
  User.findOne({email})
    .then(user => {
      //check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      //check for password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
            //Matched
            //create JWT paylod
            const payload = {id:user.id, name:user.name};
            //Sign Token
            jwt.sign(
              payload,
              key.secretOrKey,
              {expiresIn: '30d'},
              (err, token) => {
                res.json({
                  success: true,
                  token : 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'password is incorrect';
            return res.status(400).json(errors);
          }
        })
    })
  }
);

//@route  POST /api/users/current
//@desc   Return current User
//@access Private

router.get('/current',passport.authenticate('jwt',{session:false}) ,(req,res) => {
  // res.json(req.user);
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});


module.exports = router;