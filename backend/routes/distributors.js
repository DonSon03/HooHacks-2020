const router = require('express').Router();
let Distributor = require('../models/distributors.model');

router.route('/').get((req, res) => {
  Distributor.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const pharmacyName = req.body.pharmacyName;
    const phoneNumber = req.body.phoneNumber;
  

  const newDistributor = new Distributor({
    pharmacyName,
    phoneNumber
});

  newDistributor.save()
  .then(() => res.json('Distributor Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Distributor Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;