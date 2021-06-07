const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");
const loginAlert = document.getElementById("loginError");

loginBtn.addEventListener("click", login);

async function login() {
	try {
		await loginRequest();
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
	let stationIDs = userData[1];
	let stations = await getStations(stationIDs, userFld.value, passwdFld.value);
	console.log(userName);
	console.log(stations.join(", "));
	
	sessionStorage.setItem("name", userName);
	sessionStorage.setItem("userID", userFld.value);
	sessionStorage.setItem("stationIDs", stationsIDs);
	sessionStorage.setItem("stations", stations);
	sessionStorage.setItem("passwd", passwdFld.value);
	if(userName && stations) {
		location.href = "index.html";
	}
}

async function getStations(IDs, login, pass) {
	let stations = [];
	for(let i = 0; i < IDs.length; i++) {
		let newStation = await get_station(IDs[i], login, pass);
		stations.push(JSON.stringify(newStation));
	}
	console.log(stations);
	return stations;
}