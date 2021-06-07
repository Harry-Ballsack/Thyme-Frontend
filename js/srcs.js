
const USRNAME = sessionStorage.getItem("name");
const USRID = sessionStorage.getItem("userID");
console.log("name" + USRNAME);
const PASS = sessionStorage.getItem("passwd");
console.log("pass" + PASS);

if(!USRNAME || !USRID || !PASS) {
	location.href = "login.html";
}

const STATIONS = (function() {
	let jsonArray = JSON.parse(sessionStorage.getItem("stations"));
	let stationObjects = [];
	for(let i = 0; i<jsonArray.length; i++) {
		stationObjects.push(JSON.parse(jsonArray[i]));
	}
	return stationObjects;
})();
	
console.log(STATIONS);

const STATIONIDS = sessionStorage.getItem("stationIDs").split(",");
console.log("ids" + STATIONIDS);

var currentStation = STATIONIDS[0];
console.log("station" + currentStation);

const NEWSTATBTN = document.getElementById("newStatBtn");
const WATERTIME = document.getElementById("waterTime");
const MOISTLBL = document.getElementById("feuchtVar");
const TEMPLBL = document.getElementById("tempVar");
const TANKLBL = document.getElementById("wasserstandVar");


var chart = document.getElementById('dataChart').getContext('2d');
var myChart = new Chart(chart, {
	type: 'line',
	data: {
		labels: [1,2,3,4,5,6,7,8,9,10],
		datasets: [{
			label: 'Temperatur',
			data: [0,0,0,0,0,0,0,0,0,0],
			pointRadius: 0,
			borderColor: '#ff7d7d'
		},
		{
			label: 'Feuchtigkeit',
			data: [0,0,0,0,0,0,0,0,0,0],
			pointRadius: 0,
			borderColor: '#8cc0ff'
		}]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'nearest',
			intersect: false
		},
		scales:
		{
			y: {
				type: 'linear',
				grace: '80%'
			}
		}
	}
});

setUserStations(STATIONIDS);
setActiveStation(currentStation, USRID, PASS);
//displayStationData(CURRENTSTATION, USRID, PASS);
document.getElementById('Title').textContent = (USRNAME + '\'s Station');
NEWSTATBTN.addEventListener("click", function(){ location.href = "registerStation.html"; });

async function displayStationData(id, login, pass) {
	
	let statData = await get_data(id, login, pass, 120);
	console.log(statData);
	
	MOISTLBL.innerHTML = statData[0].moisture;
	TEMPLBL.innerHTML = statData[0].temperature;
	TANKLBL.innerHTML = statData[0].tank_fill;
	
	let newDataTemp = [statData[statData.length - 10].temperature,
					statData[statData.length - 20].temperature,
					statData[statData.length - 30].temperature,
					statData[statData.length - 40].temperature,
					statData[statData.length - 50].temperature,
					statData[statData.length - 60].temperature,
					statData[statData.length - 70].temperature,
					statData[statData.length - 80].temperature,
					statData[statData.length - 90].temperature,
					statData[statData.length - 100].temperature];
	console.log(newDataTemp);
	myChart.data.datasets[0].data = newDataTemp;
	
	let newDataMoist = [statData[statData.length - 10].moisture,
					statData[statData.length - 20].moisture,
					statData[statData.length - 30].moisture,
					statData[statData.length - 40].moisture,
					statData[statData.length - 50].moisture,
					statData[statData.length - 60].moisture,
					statData[statData.length - 70].moisture,
					statData[statData.length - 80].moisture,
					statData[statData.length - 90].moisture,
					statData[statData.length - 100].moisture];
	console.log(newDataMoist);
	myChart.data.datasets[1].data = newDataMoist;
	myChart.update();
	
	setMeterLevel('meterFillWater', Math.max(Math.min((statData[statData.length - 1].moisture)/10, 100), 0));
	setMeterLevel('meterFillTemp', statData[statData.length - 1].temperature);
	
	return statData;
}

async function setActiveStation(id, login, pass) {
	for(let i = 0; i < STATIONIDS.length; i++) {
		document.getElementById(STATIONIDS[i] + "w").style.setProperty("background-color", "grey");
		document.getElementById(STATIONIDS[i] + "w").style.setProperty("color", "white");
	}
	document.getElementById(id + "w").style.setProperty("background-color", "white");
	document.getElementById(id + "w").style.setProperty("color", "grey");
	let displayData = await displayStationData(id, login, pass);
	currentStation = id;
	currentConfig = await get_station(currentStation, USRID, PASS).conf;
	console.log("now active: " + id);
}

function setUserStations(IDs) {
	let statListField = document.getElementById("stationDash");
	let stationList = "";
	for(let i = 0; i < STATIONIDS.length; i++) {
		stationList += "<div id=" + IDs[i] + "w class=\"statListWrapper\">";
		stationList += "<div id=" + IDs[i] + "e class=\"statListElement\">";
		stationList += "<p>Station:<br />" + IDs[i] + "</p>";
		stationList += "</div></div>";
	}
	statListField.innerHTML = stationList;
	
	for(let i = 0; i < STATIONIDS.length; i++) {
		document.getElementById(IDs[i] + "w").addEventListener("click", function(){setActiveStation(IDs[i], USRID, PASS)});
	}
}

function setSidebarSettings() {
	WATERTIME = currentConfig.watering_duration;
}
	

function openSideBar() {
	document.getElementById("sideBar").style.width = "25%";
}

function closeSideBar() {
	document.getElementById("sideBar").style.width = "0";
}

async function setWetVal() {
	if(confirm("Den momentanen Sensorwert als Nasswert zu übernehmen?")){
		currentConfig.moisture_sensor_wet = statData[0].moisture;
		let newconf = await update_conf(currentConfig, currentStation, USRID, PASS);
		return newconf;
	}
}

async function setDryVal() {
	if(confirm("Den momentanen Sensorwert als Trockenwert übernehmen?")){
		currentConfig.moisture_sensor_dry = statData[0].moisture;
		let newconf = await update_conf(currentConfig, currentStation, USRID, PASS);
		return newconf;
	}
}

async function setThreshhold() {
	if(confirm("Den momentanen Sensorwert als Schwellenwert zum Wässern übernehmen?")){
		currentConfig.moisture_threshold = statData[0].moisture;
		let newconf = await update_conf(currentConfig, currentStation, USRID, PASS);
		return newconf;
	}
}

async function deleteCurrentStation() {
	if(confirm("Wollen Sie die Station " + currentStation + " wirklich löschen?")){
		await delete_station(currentStation, USRID, PASS);
		location.reload();
	}
}

async function deleteUser() {
	if(confirm("Wollen Sie ihren Account wirklich löschen?")){
		await delete_user(USRID, PASS);
		sessionStorage.clear();
		location.reload();
	}
}

function logout() {
	sessionStorage.clear();
	location.reload();
}

function addToWaterTime(t) {
	WATERTIME.value = parseFloat(WATERTIME.value) + t;
}

async function setWaterTime(){
	let currentStationData = await get_station(currentStation, USRID, PASS);
	console.log(currentStationData);
	let currentConfig = JSON.parse(currentStationData.conf);
	console.log(currentConfig);
	console.log(currentStationData.watering_duration);
	
	
	/*currentConfig.water_time = parseInt(WATERTIME.value);
	let newconf = await update_conf(currentConfig, currentStation, USRID, PASS);
	console.log(newconf);*/
}

function setMeterLevel( meter, percentage ) {
	document.getElementById(meter).style.setProperty('height', percentage + '%');
}

