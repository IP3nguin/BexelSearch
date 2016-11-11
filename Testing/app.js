function print() {
	
	const preObject = document.getElementById('JSONout');
	const dbRefClasses = firebase.database().ref().child('classes');	//Creates a reference to the actual database object 'classes'
	
	dbRefClasses.on('value', snap => {	//This reads from the database in real time and updates every time a 'value' changes in the object
	console.log(snap.val());
	preObject.innerText = JSON.stringify(snap.val(), null, 3);	//Change the <pre> to a JSONified classes object
});
}







