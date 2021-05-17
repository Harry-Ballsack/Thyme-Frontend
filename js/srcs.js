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

console.log("the script does in fact run");
var i = 0;
setMeterLevel( 'meterFillWater', 50);
setInterval(changeMeterLevel, 10);


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

async function getStationData( stationID )
{
	const resp = await fetch("https://stomata.undertheprinter.com/v1/stations/" + stationID, {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data;
}