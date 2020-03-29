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
  Distributor.findById(req.params.id)
    .then(distributor => res.json(distributor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Distributor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Distributor Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Distributor.findById(req.params.id)
    .then(distributor => {
      distributor.address = req.body.address  ; 
      distributor.toiletPaper = req.body.toiletPaper;
      distributor.mask = req.body.mask;
      distributor.handSanitizers = req.body.handSanitizers;
      distributor.descriptions = req.body.descriptions;

      distributor.save()
        .then(() => res.json())
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateCompanyPhoneList/').post((req, res) => {
  const phoneNumber = req.body.phoneNumber
  const company_id = req.body.id;
  Distributor.find({unique_id:company_id})
    .then(findResult => {
      let distributor = findResult[0];
      if(distributor.phone_list.includes(phoneNumber)){
        distributor.phone_list.splice(distributor.phone_list.indexOf(phoneNumber),1);
      }
      else{
        distributor.phone_list.push(phoneNumber);
      }

      distributor.save()
        .then(result => res.json(result.pharmacyName))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;