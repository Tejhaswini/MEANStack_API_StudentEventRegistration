const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { mongoose } = require('./db.js');
var studentController = require('./controllers/studentController.js');

var app = express();
app.use(cors({origin: 'http://67.207.80.168:4200'}));
app.use(bodyParser.json());

const options ={
    definition :{
      info :
        {
      "title": "Student API",
      "description": "Notes API documentation.",
      "contact": {
        "name": "Tejaswini Atluri",
        "url": "https://github.com/tejhaswini",
        "email": "tatluri@uncc.edu"
      },
      "servers" : ["http://67.207.80.168:3002/"]
    }
  },
      apis: ["./controllers/studentController.js"]
  }

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/students',studentController);

app.listen(3002, () => console.log('Server started at port : 3002'));


 