var firebaseConfig = {
    apiKey: "AIzaSyDmUM47MPh_TPl3w9Yc6_ad90xNcIsUL7Q",
    authDomain: "aaron-s-demo-1.firebaseapp.com",
    databaseURL: "https://aaron-s-demo-1.firebaseio.com",
    projectId: "aaron-s-demo-1",
    storageBucket: "aaron-s-demo-1.appspot.com",
    messagingSenderId: "885770311836",
    appId: "1:885770311836:web:16c16d8b416b7687"
  
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

//   Button for adding to the train schedule
$("#add-time-btn").on("click", function (e) {
    e.preventDefault();

    // Grabbing the input values
    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainTime = $("#train-time").val().trim()
    var trainFreq = $("#freq-input").val();
    var dateAdded = firebase.database.ServerValue.TIMESTAMP
    

    

    //An object to hold new train info
    var newTrain = {
        train: trainName,
        destination: trainDes,
        time: trainTime,
        frequency: trainFreq,
        minutes: dateAdded,
    };

    // A way to upload info to firebase
    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    console.log(dateAdded);

    alert("New Train added")
    // A way to clear our values for new input
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time").val("");
    $("#freq-input").val(""); 
    
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var trainDes = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;
  var dateAdded = childSnapshot.val().minutes;

  console.log(trainName);
  console.log(trainDes);
  console.log(trainTime);
  console.log(trainFreq);

  var tFrequency = $("#freq-input").val("");

    // Time is 3:30 AM
    var firstTime = $("#train-time").val("");

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainFreq),
    $("<td>").text(trainTime),
    $("<td>").text(dateAdded),
    
      );

      $("#train-table > tbody").append(newRow);

      
     
      console.log(moment().endOf('day').fromNow("mm"));

      //map out math

//   var trainTimePretty = moment(trainName).endOf('day').fromNow();
});

