/* Utils class */

/* Back button handler. 
By default double touch always exits the app */
function handleBackButton(e) {
	// From main page, the button exits the app
    if($.mobile.activePage.is('#pagePersonas') || 1000 > e.timeStamp - dblBackButton){
       e.preventDefault();
       navigator.app.exitApp();
   }
   else {
       dblBackButton = e.timeStamp;
       navigator.app.backHistory();
   }
}

/* Set application title in all pages*/
function setTitle(title) {
	var n = $(".appTitle").length;
	for (var i = 0; i < n; i++)
    	$(".appTitle")[i].textContent = title;
}

/* Change page */
function changePage() {
	
}