const router = require('express').Router();
let Consumer = require('../models/consumers.model');

router.route('/').get((req, res) => {
  Consumer.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body.firstName)
  console.log(req.body.phoneNumber)
  const firstName = req.body.firstName;  
  const phoneNumber = req.body.phoneNumber;
  const newConsumer = new Consumer({
    firstName,
    phoneNumber
  });
  newConsumer.save()
    .then(() => res.json('Consumer Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Consumer.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Consumer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Consumer Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;