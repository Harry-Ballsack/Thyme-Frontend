const USRNAME = sessionStorage.getItem("name");
console.log("name" + USRNAME);
const STATIONIDS = sessionStorage.getItem("stationIDs").split(",");
console.log("ids" + STATIONIDS);
var CURRENTSTATION = STATIONIDS[0];
console.log("station" + CURRENTSTATION);
const PASS = sessionStorage.getItem("passwd");
console.log("pass" + PASS);
const USRID = sessionStorage.getItem("userID");

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
setActiveStation(CURRENTSTATION, USRID, PASS);
//displayStationData(CURRENTSTATION, USRID, PASS);
document.getElementById('Title').textContent = (USRNAME + '\'s Station');


async function displayStationData(id, login, pass) {
	let statData = await get_data(id, login, pass);
	console.log(statData);
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

function setActiveStation(id, login, pass) {
	displayStationData(id, login, pass);
	document.getElementById(id + "w").style.setProperty("background-color", "white");
	console.log("now active: " + id);
}

function setUserStations(IDs) {
	let statListField = document.getElementById("stationDash");
	let stationList = "";
	for(let i = 0; i < STATIONIDS.length; i++) {
		stationList += "<div id=" + IDs[i] + "w class=\"statListWrapper\">";
		stationList += "<div id=" + IDs[i] + "e class=\"statListElement\">";
		stationList += "<p>" + IDs[i] + "</p>";
		stationList += "</div></div>";
	}
	statListField.innerHTML = stationList;
	
	for(let i = 0; i < STATIONIDS.length; i++) {
		document.getElementById(IDs[i] + "w").addEventListener("click", function(){setActiveStation(IDs[i], USRID, PASS)});
	}
}





function setMeterLevel( meter, percentage )
{
	document.getElementById(meter).style.setProperty('height', percentage + '%');
}

