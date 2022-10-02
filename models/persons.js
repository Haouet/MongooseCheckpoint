const mongoose = require('mongoose');
const personsSchema = mongoose.Schema({
    name : { type : String, required : true  },
    age : { type : Number, required : true  },
    favoriteFood : [{type : String  }]
       
})
 const Person = mongoose.model('person', personsSchema);
 module.exports = Person;
