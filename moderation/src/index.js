const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const eventBusPath = 'http://event-bus-srv:5005';

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'PostCreate':
      return;
    case 'CommentCreate':
      const { id, comments } = data;
      const status = comments[0].status === 'order' ? 'approved' : 'rejected';

      await axios
        .post(`${eventBusPath}/events`, {
          type: 'CommentModerated',
          data: { id, comments: [{ ...comments[0], status, updatedAt: new Date(Date.now()) }] },
        })
        .catch(err => {
          console.log('moderation:', err.message);
        });
      return;
    default:
      break;
  }

  res.status(201).end();
});

app.listen(5004, () => {
  console.log('Listening on 5004');
});
