const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const events = [];

app.post('/events', function (req, res) {
  const event = req.body;

  events.push(event);

  axios.post(`http://posts-clusterip-srv:5002/events`, event).catch(err => {
    console.log('posts-clusterip-srv:', err.message);
  });
  axios.post(`http://comments-clusterip-srv:5001/events`, event).catch(err => {
    console.log('comments-clusterip-srv:', err.message);
  });
  axios.post(`http://query-clusterip-srv:5003/events`, event).catch(err => {
    console.log('query-clusterip-srv:', err.message);
  });
  axios.post(`http://moderation-clusterip-srv:5004/events`, event).catch(err => {
    console.log('moderation-clusterip-srv:', err.message);
  });

  res.status(201).send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.status(201).send(events);
});

app.listen(5005, () => {
  console.log('Listening on 5005');
});
