const NEWSTATBTN = document.getElementById("newStatBtn");
const WATERTIME = document.getElementById("waterTime");
const MOISTLBL = document.getElementById("feuchtVar");
const TEMPLBL = document.getElementById("tempVar");
const STATUSBL = document.getElementById("stationstatusVar");
const WATERBTN = document.getElementById("cloud");
const MENUBAR = document.getElementById("menuBar");

const USRNAME = sessionStorage.getItem("name");
const USRID = sessionStorage.getItem("userID");
const PASS = sessionStorage.getItem("passwd");

if(!USRNAME || !USRID || !PASS) {
	location.href = "login.html";
}

var chart = document.getElementById('dataChart').getContext('2d');
var myChart = new Chart(chart, {
	type: 'line',
	data: {
		labels: [1,2,3,4,5,6,7,8,9,10],
		datasets: [/*{
			label: 'Temperatur',
			data: [0,0,0,0,0,0,0,0,0,0],
			pointRadius: 0,
			borderColor: '#ff7d7d',
			yAxisID: 'tempScale',
		},
		{
			label: 'Feuchtigkeit',
			data: [0,0,0,0,0,0,0,0,0,0],
			pointRadius: 0,
			borderColor: '#8cc0ff',
			yAxisID: 'moistScale',
		}*/]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		scales:
		{
			x: {
				text: 'Uhrzeit',
			},
			tempScale: {
				type: 'linear',
				//grace: '10%',
				position: 'left',
				title: {
					display: true,
					text: 'Temperatur/°C',
				},
				min: 0,
				max: 40,
			},
			moistScale: {
				type: 'linear',
				position: 'right',
				title: {
					display: true,
					text: 'Feuchtigkeit/%',
				},
				grid: {
					drawOnChartArea: false,
				},
				min: 0,
				max: 100,
			},
		},
		tooltips: {
			callbacks: {
				label: function(context) {
					console.log(context);
					if(context.dataset.yAxisID == "tempScale") {
						context.dataset.label += "°C";
					}
					if(context.dataset.yAxisID == "moistScale") {
						context.dataset.label += "%";
					}
					return context.dataset.label;
				}
			},
		},
	}
});

document.getElementById('Title').textContent = (USRNAME + '\'s Station');
NEWSTATBTN.addEventListener("click", function(){ location.href = "registerStation.html"; });
WATERBTN.addEventListener("click", rainAnimation);

/* ACTIONS */

function switchSideBar() {
	if(MENUBAR.style.width == "0px") {
		MENUBAR.style.removeProperty("width");
		MENUBAR.style.removeProperty("padding");
		MENUBAR.style.setProperty("padding", "1em");
	} else {
		MENUBAR.style.setProperty("padding", "0px");
		MENUBAR.style.setProperty("width", "0px");
	}
}

async function setWetVal() {
    let s = await getStation(selectedStation);

	new_moisture_sensor_wet=prompt("Benutzerdefinierter Nasswert: ",s.conf.moisture_sensor_wet);
	if(new_moisture_sensor_wet!=null){
		s.conf.moisture_sensor_wet=new_moisture_sensor_wet;
		await update_conf(s.conf, s.id, USRID,PASS);
	}

/* 	if(confirm("Den momentanen Sensorwert als Nasswert zu übernehmen?")){
		s.conf.moisture_sensor_wet = s.data[0].moisture;
		await update_conf(s.conf, s.id, USRID, PASS);
	} */
}

async function setDryVal() {
    let s = await getStation(selectedStation);

	new_moisture_sensor_dry=prompt("Benutzerdefinierter Trockenwert: ",s.conf.moisture_sensor_dry);
	if(new_moisture_sensor_dry!=null){
		s.conf.moisture_sensor_dry=new_moisture_sensor_dry;
		await update_conf(s.conf, s.id, USRID,PASS);
	}

/* 	if(confirm("Den momentanen Sensorwert als Trockenwert übernehmen?")){
		s.conf.moisture_sensor_dry = s.data[0].moisture;
		await update_conf(s.conf, s.id, USRID, PASS);
	} */
}

async function setThreshhold() {
    let s = await getStation(selectedStation);
	new_moisture_threshold=prompt("Geben Sie einen  Schwellenwert in Prozent (%) ein: ",s.conf.moisture_threshold/10);
	if(new_moisture_threshold!=null){
		s.conf.moisture_threshold=new_moisture_threshold*10;
		await update_conf(s.conf, s.id, USRID,PASS);
	}
/* 	if(confirm("Den momentanen Sensorwert als Schwellenwert zum Wässern übernehmen?")){
		s.conf.moisture_threshold = s.data[0].moisture;
		await update_conf(s.conf, s.id, USRID, PASS);
	} */
}

async function deleteCurrentStation() {
    const s = await getStation(selectedStation);
	if(confirm("Wollen Sie die Station " + s.name + " wirklich löschen?")){
		await delete_station(s.id, USRID, PASS);
        await repopulateStationCache();
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
    let s = await getStation(selectedStation);
	s.conf.watering_duration = parseInt(WATERTIME.value);
	await update_conf(s.conf, s.id, USRID, PASS);
}

async function waterRequest() {
	let s = await getStation(selectedStation);
	let state = await get_state(s.id, USRID, PASS);
	console.log(state);
	
	if(state != "empty") {
		setWaterInput(false);
		await update_state("water", s.id, USRID, PASS);
		setWaterInput(true);
	} else {
		setWaterInput(false);
	}
}

function setWaterInput(inputEnable) {
		if(inputEnable == true) {
			WATERBTN.onclick = "rainAnimation()";
			WATERBTN.style.setProperty("--cloudHoverStyle", "pointer");
		} else if(inputEnable == false) {
			WATERBTN.onclick = "";
			WATERBTN.style.setProperty("--cloudHoverStyle", "not-allowed");
		}
}

async function rainAnimation() {
    const s = await getStation(selectedStation);
    await update_state("water", s.id, USRID, PASS);

	let drop1 = document.getElementById("drop1");
	let drop2 = document.getElementById("drop2");
	let drop3 = document.getElementById("drop3");
	
	setTimeout(function() {
		drop1.style.setProperty("animation", "dropFade 1.5s");
	}, 0);
	
	setTimeout(function() {
		drop2.style.setProperty("animation", "dropFade 1.5s");
	}, 500);
	
	setTimeout(function() {
		drop3.style.setProperty("animation", "dropFade 1.5s");
	}, 1000);
	
	drop1.style.animation = "";
	drop2.style.animation = "";
	drop3.style.animation = "";
}

function homeLink() {
	location.href = "index.html";
}

/* RENDERING */

async function redraw() {
    let statListField = document.getElementById("stationDash");
	let stationList = "";
	for (let i = 0; i < stationCount(); i++) {
		stationList += "<div id=" + i + "w class=\"statListWrapper\">";
		stationList += "<div id=" + i + "e class=\"statListElement\">";
        // Access cache directly as sensor data is not needed
		stationList += "<p><b>" + (stationCache[i].name != undefined ? stationCache[i].name : stationCache[i].id) + "</b></p>";
		stationList += "</div></div>";
	}
	
	statListField.innerHTML = stationList;
	
	for (let i = 0; i < stationCount(); i++) {
		document.getElementById(i + "w").addEventListener("click", _ => {
            selectedStation = i;
            redraw().then(_ => {});
        });
	}
	
    if (selectedStation != null && selectedStation < stationCount()) {
        for(let i = 0; i < stationCount(); i++) {
		    document.getElementById(i + "w").style.setProperty("background-color", "#707070");
		    document.getElementById(i + "w").style.setProperty("color", "#FFFFFF");
	    }
	    document.getElementById(selectedStation + "w").style.setProperty("background-color", "#FFFFFF");
	    document.getElementById(selectedStation + "w").style.setProperty("color", "#707070");

        const station = await getStation(selectedStation);

	    let statData = station.data;
		const current_status = station.state;
	    MOISTLBL.innerHTML = statData[statData.length - 1].moisture / 10 + " %";
	    TEMPLBL.innerHTML = statData[statData.length - 1].temperature + " °C";
		if (current_status=="water") {
			STATUSBL.innerHTML = "bewässert";
			STATUSBL.style = "color: #C1FFFD";
		} else if (current_status=="idle") {
			STATUSBL.innerHTML = "OK";
			STATUSBL.style = "color: #C5FAB2";
		} else {
			STATUSBL.innerHTML = "Tank empty";
			STATUSBL.style = "color: #E0E0E0";
		}
	    
	    WATERTIME.value = station.conf.watering_duration;
	
	    let newDataTemp = [];
	    let newDataMoist = [];
	    let newDataHum = [];
	    let xAxisTimes = [];
	
	    for(let i = Math.max(0, statData.length - (12*6) - 1); i < statData.length; i += 1) {
		    newDataTemp.push(statData[i].temperature);
		    newDataMoist.push(Math.min((statData[i].moisture) / 10, 100));
		    newDataHum.push((statData[i].humidity));
		
		    let timeDate = new Date(statData[i].time * 1000);
		    let timeString = timeDate.getHours() + ":" + timeDate.getMinutes();
		    xAxisTimes.push(timeString);
	    }
	
	    myChart.data.datasets = [];

	    myChart.data.datasets.push({
		    label: "Temperatur",
		    data: newDataTemp,
		    borderColor: "#C5FAB2",
		    yAxisID: "tempScale",
	    });
	
	    myChart.data.datasets.push({
		    label: "Erdfeuchtigkeit",
		    data: newDataMoist,
		    borderColor: "#C1FFFD",
		    yAxisID: "moistScale",
	    });
	
	    myChart.data.datasets.push({
		    label: "Luftfeuchtigkeit",
		    data: newDataHum,
		    borderColor: "#E0E0E0",
		    yAxisID: "moistScale",
	    });
	
	    myChart.data.labels = xAxisTimes;
	    myChart.update();
	
	    setMeterLevel('meterFillWater', Math.max(Math.min((statData[statData.length - 1].moisture)/10, 100), 0));
	    setMeterLevel('meterFillTemp', statData[statData.length - 1].temperature);
    }
}

function setMeterLevel( meter, percentage ) {
	document.getElementById(meter).style.setProperty('height', (100-percentage) + '%');
}

/* LOCAL STATION DATA CACHE */

stationCache = [];
selectedStation = null;

// Call whenever a user's registered stations could have changed
async function repopulateStationCache() {
	const stations = await get_stations(USRID, PASS);
    stationCache = [];
    selectedStation = null;
    for (const s of stations) {
        stationCache.push({
            id: s
        });
    }

    await redraw();

    for (let s of stationCache) {
	    get_station(s.id, USRID, PASS).then(d => {
            s.name = d.name;
            s.conf = d.conf;

            if (selectedStation == null) {
		        selectedStation = 0;
            }
            redraw().then(_ => {});
        });
    }
}

// Get data from cache or the server
async function getStation(i) {
    if (i >= stationCache.length) {
        return null;
    }

    if (stationCache[i].data != undefined) {
        return stationCache[i];
    } else {
	    const [data, state] = await Promise.all([get_data(stationCache[i].id, USRID, PASS), get_state(stationCache[i].id, USRID, PASS)]);
        stationCache[i].data = data;
        stationCache[i].state = state;
        return stationCache[i];
    }
}

function stationCount() {
    return stationCache.length;
}

repopulateStationCache().then(_ => {});
