const registerBtn = document.getElementById("registerBtn");
const nameFld = document.getElementById("nameFld");
const userFld = document.getElementById("userFld");
const passwdFld1 = document.getElementById("passwdFld1");
const passwdFld2 = document.getElementById("passwdFld2");
const registerAlert = document.getElementById("registerError");

registerBtn.addEventListener("click", register);

async function register() {
	try {
		await registerRequest();
	} catch(error) {
		loginAlert.textContent = "there was an issue registering, please try again";
		console.log("error registering:" + error);
	}
}

async function registerRequest() {
	let userName = nameFld.value;
	let userId = userFld.value;
	let pass1 = passwdFld1.value;
	let pass2 = passwdFld2.value;
	
	if(pass1 !== pass2 || !userName || !userId || !pass1) {
		registerAlert.textContent = "please enter name, email and matching passwords";
		return;
	}
	
	let newUser = await create_user(userName, userId, pass1);
	sessionStorage.setItem("name", userName);
	sessionStorage.setItem("userID", userId);
	sessionStorage.setItem("passwd", pass1);
	location.href = "index.html";
}

function homeLink() {
	location.href = "index.html";
}