var firebaseConfig = {
    apiKey: "AIzaSyAFM6JT_tzqGBAKHASeElGZ0SZEXEMmJY8",
    authDomain: "drip-irrigation-fce41.firebaseapp.com",
    databaseURL:"https://drip-irrigation-fce41-default-rtdb.firebaseio.com",
    projectId: "drip-irrigation-fce41",
    storageBucket: "drip-irrigation-fce41.appspot.com",
    messagingSenderId: "949132855759",
    appId: "1:949132855759:web:584c55e512f5ae718c6aba",
    measurementId: "G-H3JRHDSXS6"
  };
firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
    var database = firebase.database();
    var motorSwitch;
    var relay1;
    var relay2;
    var relay3;

    database.ref().on("value", function(snap){
        motorSwitch = snap.val().motorSwitch;
        relay1 = snap.val().relay1;
        relay2 = snap.val().relay2;
        relay3 = snap.val().relay3;

        // Update the UI based on the values from the database
        updateUI(motorSwitch, relay1, relay2, relay3);
    });

    // Motor switch button click event
    $("#motorSwitchBtn").click(function(){
        if (motorSwitch === "0") {
            motorSwitch = "1";
        } else {
            motorSwitch = "0";
            // Motor switch is turned off, set relay values to 0
            relay1 = "0";
            relay2 = "0";
            relay3 = "0";
        }
        firebase.database().ref().update({ motorSwitch: motorSwitch, relay1: relay1, relay2: relay2, relay3: relay3 });
    });

    // Relay 1 button click event
    $("#relay1Btn").click(function(){
        if (motorSwitch === "1") {
            if (relay1 === "0") {
                relay1 = "1";
            } else {
                relay1 = "0";
            }
            firebase.database().ref().update({ relay1: relay1 });
        }
    });

    // Relay 2 button click event
    $("#relay2Btn").click(function(){
        if (motorSwitch === "1") {
            if (relay2 === "0") {
                relay2 = "1";
            } else {
                relay2 = "0";
            }
            firebase.database().ref().update({ relay2: relay2 });
        }
    });

    // Relay 3 button click event
    $("#relay3Btn").click(function(){
        if (motorSwitch === "1") {
            if (relay3 === "0") {
                relay3 = "1";
            } else {
                relay3 = "0";
            }
            firebase.database().ref().update({ relay3: relay3 });
        }
    });

    // Function to update the UI
    function updateUI(motor, r1, r2, r3) {
        if (motor === "0") {
            // Motor switch is off, turn off relay buttons
            $(".toggle-btn").removeClass("active");
        } else {
            // Motor switch is on, update relay buttons based on their state
            $("#motorSwitchBtn").toggleClass("active", motor === "1");
            $("#relay1Btn").toggleClass("active", r1 === "1");
            $("#relay2Btn").toggleClass("active", r2 === "1");
            $("#relay3Btn").toggleClass("active", r3 === "1");
        }
    }
});