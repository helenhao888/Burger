var connection = require("./connection.js");

//orm functions
var orm = {
    selectAll: function(table,cb){

        var queryString = "SELECT * from "+ table + ";";
        connection.query(queryString,function(err,result){
            if (err) throw err;
            cb(result);
        })
    },

    insertOne: function(table,cols,vals,cb){

        var queryString = "INSERT INTO " + table + "(" +cols.toString()+ ")"+
                          " VALUES ("+ printQuestionMarks(vals) +")";
                  
        connection.query(queryString,vals,function(err,result){
            if (err) throw err;
            cb(result);
        })                  
    },

    updateOne: function(table,objColVals,condition,cb){

        var queryString = "UPDATE " + table + " SET "+
                          objToSql(objColVals) + 
                          " WHERE " + condition + ";";
        
        connection.query(queryString,function(err,result){
            if (err) throw err;
            cb(result);
        })
    }
}


function printQuestionMarks(val){
    var quesArr=[];
    for (var i=0;i<val.length;i++){
        quesArr.push("?");
    }
    return quesArr.toString();
}

// Change object to sql format 
function objToSql(obj){

   
    var resArray=[];
   
    for (key in obj){
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj,key))
        {
            if (typeof(value) === "string" && value.indexOf(" ")>=0){

                value = "'"+value+"'";
            }
            resArray.push(key+"="+value);
        }
    }

    return resArray.toString();
}

//Export the ORM object
module.exports = orm;