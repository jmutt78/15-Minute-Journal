const express = require("express");
const router = express.Router();

const { Tasks } = require("./models");



router.get('/', (req, res) => {
  Tasks
    .find()
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

router.get('/:id', (req, res) => {
  Tasks
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['text','due',];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Tasks
  .create({
    text: req.body.text
  })
  .then(tasks => res.status(201).json(tasks.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

router.delete('/:id', (req, res) => {
  Tasks
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
const updateableFields = ['text', 'due'];
updateableFields.forEach(field => {
  if (field in req.body) {
    updated[field] = req.body[field];
  }
});

Tasks
  .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedTask => res.status(204).end())
  .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


router.delete('/:id', (req, res) => {
Tasks
  .findByIdAndRemove(req.params.id)
  .then(() => {
    console.log(`Deleted task post with id \`${req.params.id}\``);
    res.status(204).end();
  });
});


router.use('*', function (req, res) {
res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
