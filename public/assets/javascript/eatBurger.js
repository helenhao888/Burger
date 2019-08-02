$(document).on("click","#btnBurger",function(event){
    
    event.preventDefault();
    var burgerName = $("#inputBurger").val().trim();
    

    if( burgerName === ""){
        alert(" input burger ");
    }else{
         createBurger(burgerName);
    }
})

function createBurger(burger){

    var newBurger = {
        burger_name: burger
    };
   
    $.post("/api/burgers",newBurger,function(data){

        if ( data ){     
           
            $("#inputBurger").val("");
            // var newDiv = $("<div>").addClass("ordered");
            // var newCol = $("<div>").addClass("col-6");
            // var newList=$("<li>").text(burger);
            // newCol.append(newList);
            // var btnCol =  $("<div>").addClass("col-4");
            // var newBtn = $("<button>").text("DEVOUR IT!").addClass("btn btn-info btnDevour");
            // newBtn.attr({"data-id":data.id,"bName":data.burger_name});
            // btnCol.append(newBtn);
            // newDiv.append(newCol,btnCol);
            // $("#orderedBurger").append(newDiv);
            location.reload();

        } else {
            console.log("insert error");
        }
    })
}


$(document).on("click",".btnDevour",function(event){

    event.preventDefault();

    var burgerUpd = $(this).attr("bName");
    var burgerId = $(this).attr("data-id");
    var newDevour = {
        devoured: true
    };  

    updateDb(burgerId,newDevour);
    
    
})  

function updateDb(burgerIdU,newDevourU){


    $.ajax("api/burgers/"+burgerIdU,{
        type:"PUT",
        data:newDevourU
        }).then(function(data){
            if(data.status){
                location.reload();
            }else{
                console.log("update err");
            }
    })
} 