$(function() {
    // Setting up firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDMpoSlhWeeUiw4MX-fRH0CuLio_tLi-2w",
        authDomain: "spoints-app.firebaseapp.com",
        databaseURL: "https://spoints-app-default-rtdb.firebaseio.com",
        projectId: "spoints-app",
        storageBucket: "spoints-app.appspot.com",
        messagingSenderId: "185403952318",
        appId: "1:185403952318:web:3460ad5de244091e45e2ef"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    $("#loginForm").submit(function(event) {
        let ref = firebase.database().ref("users/")

        event.preventDefault();
        ref.on('value', (snapshot) => {
            let usersArray = Object.keys(snapshot.val())
            let username = $('#login__username').val();

            if (usersArray.includes(username)) {
                window.location.href = "../app/" + '?user=' + username;  
            } else {
                Swal.fire("Error", "Your username is incorrect, please try again", "error")
            }

        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
            
        });
    });
});