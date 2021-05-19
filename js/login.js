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
	let userData = await Promise.all([
		get_user(userFld.value, passwdFld.value),
		get_stations(userFld.value, passwdFld.value)
	]);
	console.log(userData[0].name);
	console.log(userData[1].join(", "));
	
	sessionStorage.setItem("name", userData[0].name);
	sessionStorage.setItem("stationID", userData[1][0]);
	sessionStorage.setItem("passwd", passwdFld.value);
    /*get_user(userFld.value, passwdFld.value).then(d => {
        console.log(d.name);
		sessionStorage.setItem("name", d.name);
    })
	.catch( error => {
		console.log('issue fetching username');
		console.log(error);
		loginAlert.textContent = "invalid password or username";
	});
	
    get_stations(userFld.value, passwdFld.value).then(d => {
        console.log(d.join(", "));
		console.log(d[0]);
		sessionStorage.setItem("stationID", d[0]);
    })
	.catch( error => {
		console.log("issue fetching password");
		console.log(error);
		loginAlert.textContent = "invalid password or username";
	});
	sessionStorage.setItem("passwd", passwdFld.value);
	console.log("pass: " + sessionStorage.getItem("passwd"));
	location.href = "index.html";*/
}