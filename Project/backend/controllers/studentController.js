const express = require('express');
const _ = require('lodash');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Student } = require('../models/student');

/**
  * @swagger
  * definitions:
  *   Student:
  *     properties:
  *       firstName:
  *         type: string
  *       lastName:
  *         type: string
  *       degree:
  *         type: string
  *       program:
  *         type: string
  *       graduationYear:
  *         type : integer
  *       emailAddress:
  *         type : string
  */

    /**
   * @swagger
   * definitions:
   *   affectedResponse:
   *     properties:
   *       fieldCount:
   *         type: integer
   *       affectedRows:
   *         type: integer
   *       insertId:
   *         type: integer
   *       serverStatus:
   *         type: integer
   *       warningCount:
   *         type: integer
   *       message:
   *         type: string
   *       protocol41:
   *         type: boolean
   *       changedRows:
   *         type: integer
   */

  /**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - students
 *     summary: List all Students
 *     description: List all students
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of students
 *       404:
 *         description: No Students
 *       500: 
 *         description: Problem communicating with db
 *         schema:
 *           $ref: '#/definitions/Student'
 */

router.get('/',(req,res) => {
    Student.find((err,docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error in Retriving Students :' + JSON.stringify(err,undefined, 2));}
    });
});

/**
  * @swagger
  * /students/{id}:
  *   get:
  *     tags:
  *       - students
  *     summary: Get Student Profile
  *     description: Get Student Profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Student's Id
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: A Single Student
  *       404:
  *         description: No Student with that Id
  *       500:
  *         description: Problem communicating with db
  *         schema:
  *           $ref: '#/definitions/Student'
  */

router.get('/:id',(req,res) => {
   /*if(!ObjectId.isValid(req.params.id))
   return res.status(400).send(`No record with given id : ${req.params.firstName}`);*/
   Student.findById(req.params.id,(err,doc) =>{
       console.log("Hello");
       console.log(doc);
       if(!err) { res.send(doc); }
       else { console.log('Error in Retriving Student :' + JSON.stringify(err, undefined, 2));}
   });
});
 /**
 * @swagger
 * /students:
 *   post:
 *     tags:
 *       - students
 *     summary: Add New Student
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: body
 *         in: body
 *         title: title
 *         detail: detail
 *         schema:
 *           $ref: '#/definitions/Student'
 *         required: true
 *     responses:
 *       200:
 *         description: Student is added to the db
 *       404:
 *         description: No Student in db with that Id
 *       500:
 *         description: Problem communicating with db
 */
router.post('/',(req,res) => {
    var std = new Student({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        degree : req.body.degree,
        program : req.body.program,
        graduationYear : req.body.graduationYear,
        emailAddress : req.body.emailAddress
        });
        std.save((err,doc) => {
         if(!err){ res.send(doc); }
         else {console.log('Error in Student save object')}
        });
        });

  /**
  * @swagger
  * /students/{id}:
  *   put:
  *     tags:
  *       - students
  *     name: Update Student Profile
  *     summary: Update Student Profile
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description : student's Id
  *         in: path
  *         required: true
  *         type: string
  *       - name: body
  *         in: body
  *         description: Fields for the Student resource
  *         schema:
  *           type: object
  *           properties: 
  *              firstName:
  *                 type: string
  *              lastName:
  *                 type: string
  *              degree:
  *                 type: string
  *              program:
  *                 type: string
  *              graduationYear:
  *                 type: integer
  *              emailAddress:
  *                 type: string  
  */
router.put('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    var std = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        degree : req.body.degree,
        program : req.body.program,
        graduationYear : req.body.graduationYear,
        emailAddress : req.body.emailAddress
    };
    Student.findByIdAndUpdate(req.params.id, { $set : std }, {new : true}, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in Student Update :' + JSON.stringify(err,undefined, 2));}
    });
});
/**
  * @swagger
  * /students/{id}:
  *   patch:
  *     tags:
  *       - students
  *     summary: Update Degree Program
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Student's Id
  *         in: path
  *         required: true
  *         type: string
  *       - name: body
  *         in: body
  *         description: Update part of Student Data
  *         schema:
  *           type: object
  *           properties:
  *              program:
  *                 type: string
  *              graduationYear:
  *                 type: string     
  *     responses:
  *       200:
  *         description: List of Student object
  *       404:
  *         description: No Student in db with that Id
  *       500:
  *         description: Problem communicating with db
  *         schema:
  *           $ref: '#/definitions/affectedResponse'
  */
router.patch('/:id',(req,res) =>{

    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    var std = _.pick(req.body,['program','graduationYear']);

    Student.findByIdAndUpdate(req.params.id, { $set : std }, {new : true}, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in Student Patch:' + JSON.stringify(err,undefined, 2));}
    });
});

 /**
  * @swagger
  * /students/{id}:
  *   delete:
  *     tags:
  *       - students
  *     summary: Delete Student
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Student's Id
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Student Deleted Successfully
  *       404:
  *         description: No Student in db with that Id
  *       500:
  *         description: Problem communicating with db
  */
router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findByIdAndDelete(req.params.id, (err,doc) =>{
        if(!err) { res.send(doc);}
        else {console.log('Error in Student Delete : '+ JSON.stringify(err,undefined, 2));}
    });
});

module.exports = router;