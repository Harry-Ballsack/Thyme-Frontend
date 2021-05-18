const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");
const loginAlert = document.getElementById("loginError");

loginBtn.addEventListener("click", login);

async function logintest() {
	localStorage.setItem("name", userFld.value);
	localStorage.setItem("passwd", passwdFld.value);
	console.log("name: " + localStorage.getItem("name"));
	location.href = "index.html";
}

async function login() {
    get_user(userFld.value, passwdFld.value).then(d => {
        console.log(d.name);
		localStorage.setItem("name", d.name);
    })
	.catch( error => {
		console.log('there has been an issue my g');
		console.log(error);
		loginAlert.textContent = "invalid password or username";
	});
	
    get_stations(userFld.value, passwdFld.value).then(d => {
        console.log(d.join(", "));
		console.log(d[0]);
		localStorage.setItem("stationID", d[0]);
    });
}