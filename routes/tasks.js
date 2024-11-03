const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;


const { CategoryModel, TaskModel , getTasksWithCategory } = require('../models/task.js');

const jwt = require('jsonwebtoken');
const {authenticateToken, secretKey} = require('../authMiddleware');

// create categories 
router.post("/category", (req,res,next)=>{
    console.log('tasks>>category');


    const category = new CategoryModel({
        name: req.body.name
    });

    category.save();

    res.status(200).json({
        message: "category created successfully",
        data: category
    });

});








router.post("/add", (req,res,next)=>{
    console.log('tasks>>add');


    const task = new TaskModel({
        categoryObjectId: new ObjectId(req.body.category_id),
        title:req.body.title,
        content:req.body.content
    });


    task.save();

    res.status(200).json({
        message: "task created successfully",
        data: task
    });

});






router.get("/list", authenticateToken, (req,res,next)=>{
    console.log('tasks>>list');


    getTasksWithCategory().then((document) => {

        console.log(document);

        res.status(200).json({
            message: "task list extracted successfully",
            tasks: document
        });


    });

   

});









module.exports = router;