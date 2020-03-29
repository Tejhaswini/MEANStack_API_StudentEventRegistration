const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { mongoose } = require('./db.js');
var studentController = require('./controllers/studentController.js');

var app = express();
app.use(cors({origin: 'http://157.245.133.81:4200'}));
app.use(bodyParser.json());

const options ={
    definition :{
      info :
        {
      "title": "Student Details API",
      "description": "Notes API documentation.",
      "contact": {
        "name": "Tejaswini Atluri",
        "url": "https://github.com/tejhaswini",
        "email": "tatluri@uncc.edu"
      },
      "servers" : ["http://157.245.133.81:3000/"]
    }
  },
      apis: ["./controllers/studentController.js"]
  }

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/students',studentController);

app.listen(3000, () => console.log('Server started at port : 3000'));


 