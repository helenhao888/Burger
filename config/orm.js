var connection = require("./connection.js");

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
                          " VALUES ("+ vals.printQuestionMarks() +")";
                  
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

// Change obj (for example {name: panther, sleepy: true}) 
function objToSql(obj){

    console.log("obj",obj);
    var colArr=obj.split(",");

    for (var i=0;i<colArr.length;i++){
         colArr[i].replace(":","=");  
    }

    return colArr.toString();
}

//Export the ORM object
module.exports = orm;