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
	sessionStorage.setItem("stationIDs", stationIDs);
	sessionStorage.setItem("stations", JSON.stringify(stations));
	sessionStorage.setItem("passwd", passwdFld.value);
	if(userName && stations) {
		location.href = "index.html";
	}
}

async function getStations(IDs, login, pass) {
	let stations = [];
	
	/*await Promise.all(IDs.map(async(s) => {
		const newStation = await get_station(s, login, pass);
		newStation.id = s;
		console.log(station);
	}));*/
	
	for(let i = 0; i < IDs.length; i++) {
		let newStation = await get_station(IDs[i], login, pass);
		newStation.id = IDs[i];
		stations.push(JSON.stringify(newStation));
	}
	console.log(stations);
	return stations;
}

