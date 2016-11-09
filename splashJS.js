function signUp() { //this function handles the sign up with the auth server as well as error handling and detail insertion
    var email = document.getElementById('suemail').value;
    var password = document.getElementById('supassword').value;
    var userName = document.getElementById('suusername').value;
    var firstName = document.getElementById('sufirstname').value;
    var lastName = document.getElementById('sulastname').value; //declare and pull data from html form


    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a longer password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) { // actual firebase fucntion to create the user, along with firebase error handling
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
        console.log(error);

    });
    
    saveDetails(userName, firstName, lastName, email); // call the function to insert user details to database, currently has timing errors
}

function logIn() { //this function handles login and error handling

    var email = document.getElementById('logEmail').value;
    var password = document.getElementById('logPass').value; //declare and pull data from html form.

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) { //actual firebase function for sign in, handles errors as well

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error); //log the errors for debugging dont know how to view though :P

    });



}

function saveDetails(user, first, last, email) { //takes the user detaisl as input then puts them into the "users" object in the database
    var database = firebase.database();
    var uId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + uId).set({ // creats new objects in the database with the name = their userid
        "username": user,
        "firstName": first,
        "lastName": last,
        "email": email
    });

}

window.onload = function () { // load the function that moves you on when you are signed in
    //   watchLogin(); //currently breaking user data saving
}

function watchLogin() {

    firebase.auth().onAuthStateChanged(function (user) { // listen for login status 
        if (user) { //if logged in, move user to the homepage
            window.location = 'homePage.html'; //please change this to location of our home page
        }
    });
}