const express = require('express');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET homepage
router.get('/', async (req, res) => {
  try {
      if(!req.session.loggedIn){
          res.render('notlogged')
          return;
      }
      const postData = await Post.findAll({
          include: [
              {
                  model: User,
                  attributes: ['name'],
              },
          ],
          order: [['createdAt', 'DESC']],
      });

      const posts = postData.map(post => post.get({ plain: true }));

      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
  }

  try {
      const userPostsData = await Post.findAll({
          where: {
              userId: req.session.userId
          },
          include: [User]
      });

      const posts = userPostsData.map(post => post.get({ plain: true }));

      res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.get('/viewpost/:id', async (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
  }

  try {
      const post = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['name']
              },
              {
                  model: Comment,
                  include: [{
                      model: User,
                      attributes: ['name']
                  }]
              }
          ]
      });

      if (post) {
          const postPlain = post.get({ plain: true });
          res.render('viewPost', { post: postPlain, loggedIn: req.session.loggedIn });
      } else {
          res.status(404).send("Post not found");
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;