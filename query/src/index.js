const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const postsDB = new Map();

app.use(cors());
app.use(bodyParser.json());

/** The function for event handling. */
const handleEvent = ({ type, data }) => {
  switch (type) {
    case 'PostCreate':
      postsDB.set(data?.id, { ...data, comments: [] });
      return;
    case 'CommentCreate':
      const { id, comments } = data;
      if (postsDB.has(id)) {
        const posts = postsDB.get(id);
        postsDB.set(id, { ...posts, comments: [...posts.comments, ...comments] });
      } else postsDB.set(id, data);
      return;
    case 'CommentUpdate':
      if (postsDB.has(data.id)) {
        const { id: postId, comments } = data;
        const { id, status, content } = comments[0];
        const post = postsDB.get(postId);

        let comment = {};
        const updatedComments = post.comments.map(item => {
          if (item.id === id) {
            item.updatedAt = new Date(Date.now());
            item.status = status;
            item.content = content;
            comment = item;
          }
          return item;
        });

        postsDB.set(postId, { id: postId, comments: updatedComments });
      }

      return;
    default:
      break;
  }
};

app.get('/posts', (req, res) => {
  const posts = [];

  postsDB.forEach(item => {
    posts.push(item);
  });

  res.status(201).send({
    posts,
  });
});

app.post('/events', function (req, res) {
  handleEvent(req.body);
  res.status(201).end();
});

app.listen(5003, async () => {
  console.log('Listening on 5003');
  const { data } = await axios.get(`http://event-bus:5005/events`).catch(err => {
    console.log('event-bus:', err.message);
  });

  for (const iterator of data) {
    handleEvent(iterator);
  }
});
