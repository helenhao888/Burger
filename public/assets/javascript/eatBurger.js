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
    console.log("before post");
    $.post("/api/burgers",newBurger,function(data){

        if ( data ){      
         
            $("#inputBurger").val("");
            var newDiv = $("<div>").addClass("ordered");
            var newCol = $("<div>").addClass("col-6");
            var newList=$("<li>").text(burger);
            newCol.append(newList);
            var btnCol =  $("<div>").addClass("col-4");
            var newBtn = $("<button>").text("Devour it").addClass("btn btn-info btnDevour");
            newBtn.attr("bName",burger);
            btnCol.append(newBtn);
            newDiv.append(newCol,btnCol);
            $("#orderedBurger").append(newDiv);
            // $(".btnDiv").append(newBtn);

        } else {
            console.log("insert error");
        }
    })
}


$(document).on("click",".btnDevour",function(event){

    event.preventDefault();

    var burgerUpd = $(this).attr("bName");
    console.log("burger",burgerUpd);
    var newList = $("<li>").text(burgerUpd);
    $("#devouredBurger").append(newList);
    $(this).closest(".ordered").empty();

    // updateDb(burgerUpd);
    
})  

// function updateDb(burgerName){

//     $.put("api/")
// }