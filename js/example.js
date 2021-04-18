const login_fld = document.getElementById("login_fld");
const pass_fld = document.getElementById("pass_fld");
const login_btn = document.getElementById("login_btn");
const name_lbl = document.getElementById("name_lbl");
const stations_lbl = document.getElementById("stations_lbl");
const station_lbl = document.getElementById("station_lbl");
const state_lbl = document.getElementById("state_lbl");
const data_div = document.getElementById("data_div");

login_btn.addEventListener("click", login);

async function login() {
    get_user(login_fld.value, pass_fld.value).then(d => name_lbl.textContent = d.name);

    const stations = await get_stations(login_fld.value, pass_fld.value);
    var list = "";
    for (var i = 0; i < stations.length; i++) {
        list += stations[i] + " ";
    }
    stations_lbl.textContent = list;

    get_station(stations[0], login_fld.value, pass_fld.value).then(d => station_lbl.textContent = d.name);
    get_state(stations[0], login_fld.value, pass_fld.value).then(d => state_lbl.textContent = d);

    const data = await get_data(stations[0], login_fld.value, pass_fld.value);
    var table = "";
    for (var i = 0; i < data.length; i++) {
        table += "<tr>";
        table += "<td>" + new Date(data[i].time * 1000) + "</td>";
        table += "<td>" + data[i].moisture + "</td>";
        table += "<td>" + data[i].temperature + "°C</td>";
        table += "<td>" + data[i].tank_empty + "</td>";
        table += "</tr>";
    }
    data_div.innerHTML = table;
}
