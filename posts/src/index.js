const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const postsDB = new Map();

const requestTime = function (req, res, next) {
  req.requestTime = new Date(Date.now());
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  res.status(201).send({
    service: 'Posts',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.get('/posts', function (req, res) {
  const posts = [];

  postsDB.forEach(item => {
    posts.push(item);
  });

  res.status(201).send({
    posts,
    service: 'Posts',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(10).toString('hex');

  if (req.body) {
    const { body } = req;
    if (body?.post) {
      postsDB.set(id, { id, ...body.post });
    }
  }

  const post = postsDB.get(id) || null;

  try {
    await axios.post(`http://event-bus:5005/events`, {
      type: 'PostCreate',
      data: post,
    });
  } catch (e) {
    console.dir({ e });
  }

  res.status(201).send({
    post,
    service: 'Posts',
    time: `Requested at:  ${req.requestTime}`,
  });
});

app.post('/events', function (req, res) {
  console.dir(req.body.type);
  res.status(201).end();
});

app.listen(5002, () => {
  console.log('Listening on 5002');
});
