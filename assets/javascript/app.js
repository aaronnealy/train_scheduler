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

    //An object to hold new train info
    var newTrain = {
        train: trainName,
        destination: trainDes,
        time: trainTime,
        frequency: trainFreq,
    };

    // A way to upload info to firebase
    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("New Train added")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time").val("");
    $("#freq-input").val(""); 
});

