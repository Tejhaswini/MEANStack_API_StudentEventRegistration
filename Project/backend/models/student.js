const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var Student = mongoose.model('students' , {
    firstName : {type : String },
    lastName : {type : String},
    degree : {type : String},
    program : {type : String},
    graduationYear :  {type : Number},
    emailAddress : {type : String}
});

module.exports = { Student };
   