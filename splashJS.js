var newAcc = 0;
var email, password, userName, firstName, lastName;

function signUp() { //this function handles the sign up with the auth server as well as error handling and detail insertion
    email = document.getElementById('suemail').value;
    password = document.getElementById('supassword').value;
    userName = document.getElementById('suusername').value;
    firstName = document.getElementById('sufirstname').value;
    lastName = document.getElementById('sulastname').value; //declare and pull data from html form
    newAcc = 1;

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

    //saveDetails(userName, firstName, lastName, email); // call the function to insert user details to database, currently has timing errors

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
        console.log(error); //log the errors for debugging

    });
}

function saveDetails(user, first, last, email, uId) { //takes the user detaisl as input then puts them into the "users" object in the database
    var database = firebase.database();

    firebase.database().ref('users/' + uId).set({ // creats new objects in the database with the name = their userid
        "username": user,
        "firstName": first,
        "lastName": last,
        "email": email
    });

    document.write('<button type="button" id="SignUpBut" onclick="redirect()">Sign up sucessful!</button>');


}




function watchLogin() {

    firebase.auth().onAuthStateChanged(function (user) {
        if ((user) && (newAcc == 1)) {
            var uId = firebase.auth().currentUser.uid;
            saveDetails(userName, firstName, lastName, email, uId);

        } else if (user) {
            window.location = 'homePage.html';
        }
    });
}

window.onload = function () {
    watchLogin();
}

function redirect() {
    window.location = 'homePage.html';
}
