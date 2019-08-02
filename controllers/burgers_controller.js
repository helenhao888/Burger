var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

router.get("/",function(req,res){

    burger.selectAll(function(data){
        
        var burgerObj = {
            burgers: data
        };
        res.render("index",burgerObj);
    });
})

router.post("/api/burgers",function(req,res){
    console.log("server post burger");
    console.log("req.body",req.body);

    burger.insertOne(["burger_name"],[req.body.burger_name],function(result){

        res.json({id:result.insertId});
    });
})

router.put("/api/burgers/:id",function(req,res){

    var condition = "id ="+req.params.id;
    
    burger.updateOne({devoured:req.body.devoured},condition,function(result){
        console.log("result",result);
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).json({
                status:true,
                msg:"updated successfully"
            }).end();
          }
        
    });

})

module.exports=router;