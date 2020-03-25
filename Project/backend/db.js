const mongoose = require('mongoose');
const uri = "mongodb+srv://studentUser:studentUser12345@studentcluster-7tq6p.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true}, () => 
console.log("connected to database!")
);

module.exports = mongoose;
