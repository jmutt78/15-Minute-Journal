const express = require("express");
const router = express.Router();

const { StretchGoal } = require("./models");



router.get('/', (req, res) => {
  let completed = req.query.completed;
  let findParam = {};
  if (completed != null) {
      findParam.completed = completed;
    }
  StretchGoal
    .find(findParam)
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

router.get('/:id', (req, res) => {
  StretchGoal
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['text'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  StretchGoal
  .create({
    text: req.body.text
  })
  .then(goals => res.status(201).json(goals.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

router.delete('/:id', (req, res) => {
  StretchGoal
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
const updateableFields = ['text', 'completed'];
updateableFields.forEach(field => {
  if (field in req.body) {
    updated[field] = req.body[field];
  }
});

StretchGoal
  .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedGoal => res.status(204).end())
  .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


router.delete('/:id', (req, res) => {
StretchGoal
  .findByIdAndRemove(req.params.id)
  .then(() => {
    console.log(`Deleted goal goal with id \`${req.params.id}\``);
    res.status(204).end();
  });
});


router.use('*', function (req, res) {
res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
