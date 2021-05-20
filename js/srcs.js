const usrName = sessionStorage.getItem("name");
console.log("name" + usrName);
const stationIDs = sessionStorage.getItem("stationIDs").split(",");
console.log("ids" + stationIDs);
var currentStation = stationIDs[0];
console.log("station" + currentStation);
const pass = sessionStorage.getItem("passwd");
console.log("pass" + pass);
const usrID = sessionStorage.getItem("userID");

async function displayStationData(s, n, p) {
	let statData = await get_data(s, n, p);
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

displayStationData(currentStation, usrID, pass);
document.getElementById('Title').textContent = (usrName + '\'s Station');
setUserStations(stationIDs);



function setUserStations(IDs) {
	let statListField = document.getElementById("stationDash");
	let stationList = "";
	for(let i = 0; i < stationIDs.length; i++) {
		stationList += "<div id=" + IDs[i] + "w class=\"statListWrapper\">";
		stationList += "<div id=" + IDs[i] + "e class=\"statListElement\">";
		stationList += "<a href=\"#\">" + IDs[i] + "</a>";
		stationList += "</div></div>";
	}
	statListField.innerHTML = stationList;
}

var datalist = [1,3,2,4,2,3,1,2,3,1];
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



function setMeterLevel( meter, percentage )
{
	document.getElementById(meter).style.setProperty('height', percentage + '%');
}

