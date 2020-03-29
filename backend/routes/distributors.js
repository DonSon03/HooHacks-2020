const router = require('express').Router();
let Distributor = require('../models/distributors.model');

router.route('/').get((req, res) => {
  Distributor.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const pharmacyName = req.body.pharmacyName;
    const companyNumber = req.body.companyNumber;
  
    Distributor.find({companyNumber: companyNumber})
    .then(exercise => {
      console.log(exercise)
      if(exercise.length === 0){
        const newDistributor = new Distributor({
            pharmacyName,
            companyNumber
        });
        
          newDistributor.save()
          .then(result => res.json(result))
          .catch(err => res.status(400).json('Error: ' + err));
      }
      else{
        res.json(exercise[0])
      }
      
    })
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