var user, ct, cd, ci, ph, fb, tw, em, ws;
            $(document).ready(function () { // load the function that moves you on if you already signed in.
                var contentString;
                var unsub = firebase.auth().onAuthStateChanged(function (user) { // create a listener to waits for firebase initialisation before attempting to get currentUser. 
                    user = firebase.auth().currentUser;
                    if (!user) { //if not logged in, move user to the index page
                        window.location = 'index';
                    }
                    var databaseRef = firebase.database().ref('classes/' + user.uid).orderByKey();
                    databaseRef.on("value", function (snap) {
                        snap.forEach(function (item) {
                            var classid = item.key;
                            var classtitle = item.val().ClassTitle;        
                            $("#list").append('<a class="list-group-item list-group-item-action" href="' + "javascript:showForm('"+classid+"');" + '">' + classtitle + '</a>');
                        });
                    });
                    unsub(); //unsub() here is used to listen on pageload for a user if one is found then move on, if not then stop listening as the return value of unsub() is the function to kill the listener.
                    //This is needed as the database connection becomes erratic for other function while listener is active.
                });
            });

            function showForm(classx) {
                gclassx = classx;
    
               $("#sentModal").modal(); document.getElementById("classFormDiv").style.display = "block";
                user = firebase.auth().currentUser;
                var databaseRef2 = firebase.database().ref('classes/' + user.uid + "/" + classx);
                databaseRef2.on("value", function (snap) {
                    snap.forEach(function (item) {
                        ct = snap.val().ClassTitle;
                        cd = snap.val().ClassDescription;
                        ci = snap.val().ClassInstructor;
                        ph = snap.val().Phone;
                        fb = snap.val().Facebook;
                        tw = snap.val().Twitter;
                        em = snap.val().Email;
                        ws = snap.val().Website;
                        document.getElementById("title").placeholder = ct;
                        document.getElementById("desc").placeholder = cd;
                        document.getElementById("instr").placeholder = ci;
                        document.getElementById("phone").placeholder = ph;
                        document.getElementById("face").placeholder = fb;
                        document.getElementById("tweet").placeholder = tw;
                        document.getElementById("email").placeholder = em;
                        document.getElementById("web").placeholder = ws;
                    });
                });
            }

            function writeNewPost() {
                console.log("Haii");
                var x = document.forms["classForm"]["title"].value;
                var y = document.forms["classForm"]["desc"].value;
                var z = document.forms["classForm"]["instr"].value;
                var w = document.forms["classForm"]["email"].value;
                var v = document.forms["classForm"]["phone"].value;
                var u = document.forms["classForm"]["face"].value;
                var s = document.forms["classForm"]["tweet"].value;
                var r = document.forms["classForm"]["web"].value;
                if (x != "") {
                    ct = x;
                }
                if (y != "") {
                    cd = y;
                }
                if (z != "") {
                    ci = z;
                }
                if (w != "") {
                    em = w;
                }
                if (v != "") {
                    ph = v;
                }
                if (u != "") {
                    fb = u;
                }
                if (s != "") {
                    tw = s;
                }
                if (r != "") {
                    ws = r;
                }
                // A post entry.
                var updates = {
                    ClassTitle: ct
                    , ClassDescription: cd
                    , ClassInstructor: instr
                    , Email: em
                    , Facebook: fb
                    , Twitter: tw
                    , Website: ws
                    , Phone: ph
                };
                // Get a key for a new Post.
                var databaseRef2 = firebase.database().ref('classes/' + user.uid + "/" + gclassx);
                databaseRef2.update(updates);
                return false;
            }