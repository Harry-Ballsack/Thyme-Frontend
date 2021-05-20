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
	try {
		loginRequest();
	} catch(error) {
		loginAlert.textContent = "invalid password or username";
		console.log("error loging in");
	}
}

async function loginRequest() {
	let userData = await Promise.all([
		get_user(userFld.value, passwdFld.value),
		get_stations(userFld.value, passwdFld.value)
	]);
	
	let userName = userData[0].name;
	let stations = userData[1];
	console.log(userName);
	console.log(stations.join(", "));
	
	sessionStorage.setItem("name", userName);
	sessionStorage.setItem("userID", userFld.value);
	sessionStorage.setItem("stationIDs", stations);
	sessionStorage.setItem("passwd", passwdFld.value);
	if(userName && stations) {
		location.href = "index.html";
	}
}