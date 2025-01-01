const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


router.get('/', async (req, res) => {
    try {
        const data = await prisma.user.findMany({})
        res.status(200).send(data);

  } catch (err) {
    console.log(err);
    res.status(500).send('There has been an error' + err)
  }
})

router.get('/user/:username/posts', async (req, res) => {
  try {
    const { username } = req.params;
    // console.log(`\n ${username} \n `);

    const userWithPosts = await prisma.user.findUnique({
      where: { username: username },
      include: { posts: true }, // Include the related posts
    });

    if (!userWithPosts) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(userWithPosts.posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error');
  }
});


router.post('/addUser', async (req, res) => {
  try {
    const { username } = req.body;

    const data = await prisma.user.create({
      data: {
        username: username,
      }
    })
  res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error')
  }
})

router.post('/addPost', async (req, res) => {
  try {
    const { postname , author, content } = req.body;

    const data = await prisma.post.create({
      data: {
        name: postname,
        authorName: author,
        content: content,
      }
    })
  res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error')
  }
})

router.post('/addComment', async (req, res) => {
  try {
    const { postname , author, content } = req.body;

    console.log(author);

    const data = await prisma.comment.create({
      data: {
        relatedPost: {
          connect: { name: postname}
        },
        author: {
          connect: {username: author}
        },
        content: content,
      }
    })
  res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error')
  }
})

module.exports = router;