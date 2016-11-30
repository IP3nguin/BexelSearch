var map;
var Latlng = new google.maps.LatLng(53.38914, -6.600050); //Default Location
var marker;
var clickLat;
var clickLon;

function initialize() {

     var mapOptions = {
         zoom: 13,
         center: Latlng,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById('map'), mapOptions); //Create new map

     if (navigator.geolocation) { console.log("geo");
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Get User location using GeoLocation API
             map.setCenter(initialLocation); // Refresh map to centre on user location
         });
			google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
		
			clickLat = event.latLng.lat();
			clickLon = event.latLng.lng();
			
			console.log("clickLat: "+clickLat+"\nclickLon: "+clickLon);
			
			  		 

		});

		function placeMarker(location) {
			if(!marker){
				marker = new google.maps.Marker({
					position: location, 
					map: map
				});
			}
			else{
				marker.setPosition(location);
			}
		}
     }
     console.log("initialized");
 }
 
 
/**
 	Add new class to the database, usage:
 	
 	var newClass = addNewClass("ClassInstructorName", "ClassTitle", "ClassDescription", "Email", "Facebook", "Location", "Phone", "Twitter", "Website");
 
 	the variable newClass will hold the key of the newly created Class
*/
	

function addNewClass(instructor, title, description, email, facebook, clickLat, clickLon, phone, twitter, website) {
	var newClassKey = firebase.database().ref().child('classes').push().key;
	firebase.database().ref('classes/'+newClassKey).set({
		ClassInstructor: instructor,
		ClassTitle: title,
		Description: description,
		Email: email,
		Facebook: facebook,
		LocationLat: clickLat,
		LocationLong: clickLon,
		Phone: phone,
		Twitter: twitter,
		Website: website		
	});
	console.log("Added new class, key: "+newClassKey);
	return newClassKey;
}

/**		
		Delete a class from the database
		
		Usage:
		deleteClass(classKey)
		
*/
function deleteClass(classID) {
	firebase.database().ref('classes/'+classID).remove();
	console.log("Deleted class with ID: "+classID);
}


function submitForm() {
	var title = document.getElementById("title").value;
	var desc = document.getElementById("desc").value;
	var instr =	document.getElementById("instr").value;
	var phone =	document.getElementById("phone").value; 
	var email =	document.getElementById("email").value;
	var web = document.getElementById("web").value;
	var face = document.getElementById("face").value;
	var tweet = document.getElementById("tweet").value;
	var newClass = addNewClass(instr, title, desc, email, face, clickLat, clickLon, phone, tweet, web);				
				
	return false;
}

console.log("Loaded dbScripts");

