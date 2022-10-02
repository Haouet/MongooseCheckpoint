var Person = require('../models/persons')
// function  add person 
exports.addPerson = async(req,res,next) =>{
   
    var person = new Person({
        age: req.body.age,
        name: req.body.name,
        favoriteFood: req.body.favoriteFood       
       
    });
    await person.save().then(data => {
          return res.status(201).json({ success: true, msg: 'Successful created new Person', data:data });  //creation successfull
        }).catch(err => {
          return res.status(403).json({ err: err });
        });
        next();
}
// function  getAll persons 
exports.getAllPersons = async(req,res,next) =>{
    try{   
        await Person.find({}).then((result) => {
            res.send(result);
             });
        } catch(err) {
    
            console.log(err);
        }
   
    next();
};
//  Find person by One
exports.findOne = async(req,res,next) =>{
try {
    await Person.findOne({}).then((result) => {
        res.send(result);
         });
    
} catch (error) {
    console.log(error);
}
next();
 }

//  Find person by id
exports.getPerson = (req,res,next) =>{ 

  Person.findById({_id : req.params.id}).then(person => {
    res.status(200).json({ person: person });
    }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
        error: err
    });
    });
   
}
// fanction addall
exports.addAll = (req,res,next)=>{
  Person.insertMany(req.body.persons).then(function(){
        return res.status(201).json({ success: true, msg: 'Successful created multiple User'});  //creation successfull
    }).catch(function(error){
      return res.status(401).json({ success: true, msg: 'User existt', error:error});  //creation successfull
  });
  }
  //delete person
  exports.deletePerson = (req, res, next) => {
      Person.findOneAndDelete({_id: req.params.id }).then(
      () => {
        res.status(201).json({
          message: 'User Deleted !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  }
// update person updatePerson
exports.updatePerson = (req, res, next) => {

  console.log("i'm updating the user now");
  console.log(req.body);

  let person = new Person({
      name: req.body.name,
      age: req.body.age,
      favoriteFood : req.body.favoriteFood
  });
  console.log('hani badaltou' + person);
  Person.updateOne({ _id: req.params.id }, req.body).then(
      (newPerson) => {
          res.status(201).json({
              message: 'User updated successfully!',
              person: newPerson
          });
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

// Delete  person delete many
exports.deleteManyPersons = (req, res, next) => {
  Person.deleteMany({ name: new RegExp('^' + req.params.name, "i") }).then(data => {
      return res.status(200).json({ success: true, msg: 'Successful deleted User', data: data });  //creation successfull
  }).catch(err => {
      return res.status(403).json({ success: false, err: err });
  });
}
 
    
    



