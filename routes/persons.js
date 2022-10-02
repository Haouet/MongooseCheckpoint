var express = require('express');
var router = express.Router();
var personCtl = require('../controllers/persons');

/* GET persons listing. */
router.get('/',personCtl.getAllPersons);
/* GET person by id. */
router.get('/:id',personCtl.getPerson);
/* GET user listing. 
:3000/persons/add */
router.post('/add',personCtl.addPerson);
//Add All persons :3000/persons/addall
router.post('/addall',personCtl.addAll);
//Find One
// router.get('/findone',personCtl.findOne);
// /* Remove person listing. */
router.delete('/remove/:id',personCtl.deletePerson);
/* Update person listing. */
router.put('/update/:id',personCtl.updatePerson);
router.delete('/removeMany/:name',personCtl.deleteManyPersons);


module.exports = router;
