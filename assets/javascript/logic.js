$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAJrUhFJXc0D4dGgs8Bx2tmdQWso8qxfGI",
        authDomain: "train-scheduler-f83d4.firebaseapp.com",
        databaseURL: "https://train-scheduler-f83d4.firebaseio.com",
        projectId: "train-scheduler-f83d4",
        storageBucket: "",
        messagingSenderId: "349357243992"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#button").on("click", function (e) {
        e.preventDefault();

        var trainName = $("#trainName").val();
        var destination = $("#destination").val();
        var frequency = $("#frequency").val()
        var trainTime = $("#trainTime").val();

        var newTrain = {
            name: trainName,
            destination: destination,
            frequeny: frequency,
            time: trainTime
        }

        database.ref().push(newTrain)

        $("#trainName").val("");
        $("#destination").val("");
        $("#frequency").val("")
        $("#trainTime").val("");
    })

    database.ref().on("child_added", function (childsnapshot) {
        console.log(childsnapshot.val());
        var trainName = childsnapshot.val().name;
        var destination = childsnapshot.val().destination;
        var frequency = childsnapshot.val().frequeny;
        var trainTime = childsnapshot.val().time;

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(trainTimeConverted);

        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var minutesAway = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minutesAway);


        $("tbody").append(
            `<tr>
            <td>${trainName}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${trainTime}</td>
            <td>${minutesAway}</td>
            </tr>`)
    })
});