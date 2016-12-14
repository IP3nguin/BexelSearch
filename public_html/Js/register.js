 var map;
        var Latlng = new google.maps.LatLng(53.38914, -6.600050); //Default Location
        var marker;
        var clickLat;
        var clickLon;

        function initialise() {
            console.log("I got called");
            var mapOptions = {
                zoom: 11
                , center: Latlng
                , mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions); //Create new map
            var isChromium = window.chrome
                , winNav = window.navigator
                , vendorName = winNav.vendor
                , isIEedge = winNav.userAgent.indexOf("Edge") > -1;
            if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isIEedge == false) {
                locEnable = confirm("Would you like to share your location with this site?");
                if (locEnable) {
                    $.getJSON("http://ip-api.com/json", function (json) {
                        chromeLat = json.lat;
                        chromeLon = json.lon;
                        initialLocation = new google.maps.LatLng(chromeLat, chromeLon);
                        map.setCenter(initialLocation);
                    });
                }
                else {
                    alert("Some functionalities may not work properly without your location. To continue, refresh this page and accept location services");
                }
            }
            else if (navigator.geolocation) { //if location allowed
                navigator.geolocation.getCurrentPosition(function (position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Get User location using GeoLocation API
                    map.setCenter(initialLocation); // Refresh map to centre on user location
                });
            }
            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(event.latLng);
                clickLat = event.latLng.lat();
                clickLon = event.latLng.lng();
                console.log("clickLat: " + clickLat + "\nclickLon: " + clickLon);
            });

            function placeMarker(location) {
                if (!marker) {
                    marker = new google.maps.Marker({
                        position: location
                        , map: map
                    });
                }
                else {
                    marker.setPosition(location);
                }
            }
        }
        /**
         	Add new class to the database, usage:
         	
         	var newClass = addNewClass("ClassInstructorName", "ClassTitle", "ClassDescription", "Email", "Facebook", "Location", "Phone", "Twitter", "Website");
         
         	the variable newClass will hold the key of the newly created Class
        */
        function addNewClass(instructor, title, description, email, facebook, clickLat, clickLon, phone, twitter, website) {
            var newClassKey = firebase.database().ref().child('classes'+ firebase.auth().currentUser.uid).push().key;
            firebase.database().ref('classes/' + firebase.auth().currentUser.uid +"/"+ newClassKey).set({
                ClassInstructor: instructor
                , ClassTitle: title
                , Description: description
                , Email: email
                , Facebook: facebook
                , LocationLat: clickLat
                , LocationLong: clickLon
                , Phone: phone
                , Twitter: twitter
                , Website: website
            });
            console.log("Added new class, key: " + newClassKey);
            return newClassKey;
        }
        /**		
        		Delete a class from the database
        		
        		Usage:
        		deleteClass(classKey)
        		
        */
        function deleteClass(classID) {
            firebase.database().ref('classes/' + classID).remove();
            console.log("Deleted class with ID: " + classID);
        }

        function submitForm() {
            var title = document.getElementById("title").value;
            var desc = document.getElementById("desc").value;
            var instr = document.getElementById("instr").value;
            var phone = document.getElementById("phone").value;
            var email = document.getElementById("email").value;
            var web = document.getElementById("web").value;
            var face = document.getElementById("face").value;
            var tweet = document.getElementById("tweet").value;
            var newClass = addNewClass(instr, title, desc, email, face, clickLat, clickLon, phone, tweet, web);
            var form = document.getElementById("regForm");
            form.reset();
            return false;
        }
        $(document).ready(function () { // load the function that moves you on if you already signed in.
            var user;
            var unsub = firebase.auth().onAuthStateChanged(function (user) { // create a listener to waits for firebase initialisation before attempting to get currentUser. 
                user = firebase.auth().currentUser;
                if (!user) { //if logged in, move user to the homepage
                    window.location = 'index';
                }
                unsub(); //unsub() here is used to listen on pageload for a user if one is found then move on, if not then stop listening as the return value of unsub() is the function to kill the listener.
                //This is needed as the database connection becomes erratic for other function while listener is active.
            });
        });
        function logOut() {
            firebase.auth().signOut();
            window.location = 'index';
        }