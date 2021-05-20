const deleteBtn = document.getElementById("deleteBtn");
const nameFld = document.getElementById("nameFld");
const passwdFld1 = document.getElementById("passwdFld1");

deleteBtn.addEventListener("click", register);

async function register() {
	try {
		await registerRequest();
	} catch(error) {
		loginAlert.textContent = "there was an issue registering, please try again";
		console.log("error registering:" + error);
	}
}

async function registerRequest() {
	let userId = userFld.value;
	let pass1 = passwdFld1.value;
	
	await delete_user(userId, pass1);
}