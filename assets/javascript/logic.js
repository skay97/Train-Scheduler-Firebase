$(document).ready(function () {

    
    $("#button").on("click", function (e) {
        e.preventDefault();
        
        var trainName = $("#trainName").val();
        var destination = $("#destination").val();
        var trainTime = $("#trainTime").val();
        var frequency = $("#frequency")
        
        console.log(trainName);
        console.log(destination);
    })

});