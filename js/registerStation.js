const loginBtn = document.getElementById("loginBtn");
const statIdFld = document.getElementById("nameFld");
const statRegAlert = document.getElementById("statRegError");

const PASS = sessionStorage.getItem("passwd");
const USRID = sessionStorage.getItem("userID");

loginBtn.addEventListener("click", login);

async function login() {
	try {
		registerRequest();
	} catch(error) {
		loginAlert.textContent = "there was an issue registering, please try again";
		console.log("error registering station:" + error);
	}
}

async function registerRequest() {
	let statId = statIdFld.value;
	
	if(!statIdFld) {
		loginAlert.textContent = "invalid station id";
		return;
	}
	
	let newStation = await register_station(statId, USRID, PASS);
	location.href = "registerStation.html";
}