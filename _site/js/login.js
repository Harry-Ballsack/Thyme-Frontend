const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");
const loginAlert = document.getElementById("loginError");

loginBtn.addEventListener("click", login);
passwdFld.addEventListener("keyup", function(event) {
	if(event.key === 'Enter') {
		login();
	}
});

async function login() {
	try {
		await loginRequest();
	} catch(error) {
		loginAlert.textContent = "invalid password or username";
		console.log("error loging in: " + error);
	}
}

async function loginRequest() {
	let userData = await get_user(userFld.value, passwdFld.value);
	
	let userName = userData.name;
	
	sessionStorage.setItem("name", userName);
	sessionStorage.setItem("userID", userFld.value);
	sessionStorage.setItem("passwd", passwdFld.value);
	if(userName != undefined) {
		location.href = "index.html";
	}
}