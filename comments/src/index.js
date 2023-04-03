const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsDB = new Map();
const eventBusPath = 'http://event-bus-srv:5005';

const requestTime = function (req, res, next) {
  req.requestTime = new Date(Date.now());
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  res.status(201).send({
    service: 'Comments',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.get('/posts/:id/comments', function (req, res) {
  const { id } = req.params;
  const post = commentsDB.get(id);

  res.status(post ? 201 : 404).send({
    post: post || null,
    service: 'Comments',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const createdAt = req.requestTime;

  if (comment && id) {
    const commentId = randomBytes(10).toString('hex');

    const newComment = {
      id: commentId,
      status: 'pending',
      createdAt,
      ...comment,
    };

    if (commentsDB.has(id)) {
      const posts = commentsDB.get(id);
      // Update the comments to the posts.
      commentsDB.set(id, { id, comments: [...posts.comments, newComment] });
    } else {
      // Add first comment to posts.
      commentsDB.set(id, { id, comments: [newComment] });
    }

    await axios
      .post(`${eventBusPath}/events`, {
        type: 'CommentCreate',
        data: { id, comments: [newComment] },
      })
      .catch(err => {
        console.log('event-bus:', err.message);
      });
  }

  res.status(201).send({
    post: commentsDB.get(id) || null,
    service: 'Comments',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'CommentModerated':
      const { id: postId, comments } = data;
      const { id, status } = comments[0];

      if (!commentsDB.has(postId)) {
        console.warn('not found');
        return;
      }

      const post = commentsDB.get(postId);

      let comment = {};
      const updatedComments = post.comments.map(item => {
        if (item.id === id) {
          item.status = status;
          comment = item;
        }
        return item;
      });
      commentsDB.set(postId, { id: postId, comments: updatedComments });

      await axios
        .post(`${eventBusPath}/events`, { type: 'CommentUpdate', data: { id: postId, comments: [comment] } })
        .catch(err => console.log('event-bus:', err.message));

      return;
    case 'CommentUpdate':
      console.dir('CommentUpdate');
      return;
    default:
      break;
  }
  res.status(201).end();
});

app.listen(5001, () => {
  console.dir('Posts');
  console.log('Listening on 5001');
});
