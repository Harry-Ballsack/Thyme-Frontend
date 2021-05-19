const usrName = sessionStorage.getItem("name");
console.log("name" + usrName);
const stationID = sessionStorage.getItem("stationID");
console.log("id" + stationID);
const pass = sessionStorage.getItem("passwd");
console.log("pass" + pass);
const usrID = sessionStorage.getItem("userID");

/*var stationData = getStationData(stationID, usrID, pass);
var recentData = [stationData[stationData.length - 1],
					stationData[stationData.length - 2],
					stationData[stationData.length - 3],
					stationData[stationData.length - 4],
					stationData[stationData.length - 5],
					stationData[stationData.length - 6],
					stationData[stationData.length - 7],
					stationData[stationData.length - 8],
					stationData[stationData.length - 9],
					stationData[stationData.length - 10]];
					
console.log(recentData);*/

async function displayStationData(s, n, p) {
	let statData = await get_data(s, n, p);
	console.log(statData);
	let newData = [statData[statData.length - 1].temperature,
					statData[statData.length - 2].temperature,
					statData[statData.length - 3].temperature,
					statData[statData.length - 4].temperature,
					statData[statData.length - 5].temperature,
					statData[statData.length - 6].temperature,
					statData[statData.length - 7].temperature,
					statData[statData.length - 8].temperature,
					statData[statData.length - 9].temperature,
					statData[statData.length - 10].temperature];
	console.log(newData);
	myChart.data.datasets.data = newData;
	myChart.update();
	return statData;
}

displayStationData(stationID, usrID, pass);


document.getElementById('Title').textContent = (usrName + '\'s Station');







var datalist = [1,3,2,4,2,3,1,2,3,1];
var chart = document.getElementById('dataChart').getContext('2d');
var myChart = new Chart(chart, {
	type: 'line',
	data: {
		labels: [1,2,3,4,5,6,7,8,9,10],
		datasets: [{
			label: 'Temperatur',
			data: [1,2,3,2,6,2,7,2,8,7],
			pointRadius: 0,
			borderColor: '#ff7d7d'
		},
		{
			label: 'Feuchtigkeit',
			data: datalist,
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

var i = 0;
setMeterLevel( 'meterFillWater', 50);
setInterval(changeMeterLevel, 1000);


function changeMeterLevel()
{
	i += 0.1;
	i %= 100;
	setMeterLevel('meterFillWater', i);
	setMeterLevel('meterFillTemp', 100-i);
	console.log("changeMeterLevel");
}

function setMeterLevel( meter, percentage )
{
	document.getElementById(meter).style.setProperty('height', percentage + '%');
}

function rotArr( arr )
{
	console.log('rotArr');
	let temp = arr[0];
	arr[0] = arr[arr.length-1];
	arr[arr.length-1] = temp;
	return arr;
}
