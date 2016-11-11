function print() {
	
	const preObject = document.getElementById('JSONout');
	const dbRefClasses = firebase.database().ref().child('classes');
	
	dbRefClasses.on('value', snap => {
	console.log(snap.val());
	preObject.innerText = JSON.stringify(snap.val(), null, 3);
});
}







