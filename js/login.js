const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");
const loginAlert = document.getElementById("loginError");

loginBtn.addEventListener("click", login);

async function logintest() {
	sessionStorage.setItem("name", userFld.value);
	sessionStorage.setItem("passwd", passwdFld.value);
	console.log("name: " + sessionStorage.getItem("name"));
	location.href = "index.html";
}

async function login() {
    get_user(userFld.value, passwdFld.value).then(d => {
        console.log(d.name);
		sessionStorage.setItem("name", d.name);
		console.log(d.join(", "));
		console.log(d[0]);
		sessionStorage.setItem("stationID", d[0]);
		sessionStorage.setItem("passwd", passwdFld.value);
		console.log("pass: " + sessionStorage.getItem("passwd"));
		location.href = "index.html";
    })
	.catch( error => {
		console.log('issue fetching username');
		console.log(error);
		loginAlert.textContent = "invalid password or username";
	});
	
    /*get_stations(userFld.value, passwdFld.value).then(d => {
        
    })
	.catch( error => {
		console.log("issue fetching password");
		console.log(error);
		loginAlert.textContent = "invalid password or username";
	});*/
	
}