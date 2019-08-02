$(document).on("click","#btnBurger",function(event){
    
    event.preventDefault();
    var burgerName = $("#inputBurger").val().trim();
    
   //validate input field
    if( burgerName === ""){
        $(".modal-body-info").empty();
        var divTagQ=$("<div>").text("Please input burger name!");
        $(".modal-body-info").append(divTagQ);
        $("#modal-info").modal("show");
    }else{
         createBurger(burgerName);
    }
})

//make ajax call to insert new burger into table 
function createBurger(burger){

    var newBurger = {
        burger_name: burger
    };
   
    $.post("/api/burgers",newBurger,function(data){

        if ( data.status ){     
           
            $("#inputBurger").val("");
            //after inserted, reload the page to reflect the updated items.
            location.reload();

        } else {
            console.log("insert error");
        }
    })
}


$(document).on("click",".btnDevour",function(event){

    event.preventDefault();
  
    var burgerId = $(this).attr("data-id");
    var newDevour = {
        devoured: true
    };  

    updateDb(burgerId,newDevour);
    
    
})  

//make ajax call to update burger table with devoured status to true
function updateDb(burgerIdU,newDevourU){


    $.ajax("api/burgers/"+burgerIdU,{
        type:"PUT",
        data:newDevourU
        }).then(function(data){
            if(data.status){
                //after updated, reload the page to reflect the updated items.
                location.reload();
            }else{
                console.log("update err");
            }
    })
} 