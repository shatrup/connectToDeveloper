const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


//Load profile model
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

//@route  GET /api/profiles/test
//@desc   test url profiles
//@access public

router.get('/test',(req, res) => res.json({msg : 'welcome to user profile'})
);

//@route  GET /api/profiles
//@desc   Get current user profiles
//@access private

router.get('/',passport.authenticate('jwt',{session:false}), (req, res) =>{
  const errors = {};
  Profile.findOne({user:req.user.id})
    .populate('user',['name','avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err =>  res.status(404).json(err))
  }
);

// @route   GET api/profiles/handle/:handle
// @desc    Get profile by handle
// @access  public

router.get('/handle/:handle', (req,res) => {
  const errors = {};
  Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by User ID
// @access  public

router.get('/user/:user_id', (req,res) => {
  const errors = {};
  Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profiles/all
// @desc    Get profile by all user
// @access  public

router.get('/all', (req,res) => {
  const errors = {};
  Profile.find()
    .populate('user',['name','avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profiles
// @desc    Create or edit user profile
// @access  Private

router.post( '/',  passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
     });
  }
);

// @route   POST api/profiles/experience
// @desc    Create or edit user experience
// @access  Private

router.post( '/experience',  passport.authenticate('jwt', { session: false }), (req, res) => {
  const {errors, isValid} = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({user:req.user.id})
    .then(profile => {
      const newExp = {
        title : req.body.title,
        company : req.body.company,
        location : req.body.location,
        from : req.body.from,
        to : req.body.to,
        current : req.body.current,
        description : req.body.description
      }
      //add to experience array
      profile.experience.unshift(newExp)

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profiles/education
// @desc    Create or edit user education
// @access  Private

router.post( '/education',  passport.authenticate('jwt', { session: false }), (req, res) => {
  const {errors, isValid} = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({user:req.user.id})
    .then(profile => {
      const newEdu = {
        school : req.body.school,
        degree : req.body.degree,
        fieldofstudy : req.body.fieldofstudy,
        from : req.body.from,
        to : req.body.to,
        current : req.body.current,
        description : req.body.description
      }
      //add to experience array
      profile.education.unshift(newEdu)

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profiles/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete( '/experience/:exp_id',  passport.authenticate('jwt', { session: false }), (req, res) => {
  // const {errors, isValid} = validateExperienceInput(req.body);
  Profile.findOne({user:req.user.id})
    .then(profile => {
      //get remove Index
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      //splice out of Array
      profile.experience.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profiles/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete( '/education/:edu_id',  passport.authenticate('jwt', { session: false }), (req, res) => {
  // const {errors, isValid} = validateExperienceInput(req.body);
  Profile.findOne({user:req.user.id})
    .then(profile => {
      //get remove Index
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      //splice out of Array
      profile.education.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profiles
// @desc    Delete user and profiles
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
