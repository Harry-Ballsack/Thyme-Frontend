const reg_name_fld = document.getElementById("reg_name_fld");
const reg_login_fld = document.getElementById("reg_login_fld");
const reg_pass_fld = document.getElementById("reg_pass_fld");
const register_btn = document.getElementById("register_btn");
const register_lbl = document.getElementById("register_lbl");

const login_fld = document.getElementById("login_fld");
const pass_fld = document.getElementById("pass_fld");
const login_btn = document.getElementById("login_btn");
const login_lbl = document.getElementById("login_lbl");
const name_lbl = document.getElementById("name_lbl");
const stations_lbl = document.getElementById("stations_lbl");

const station_fld = document.getElementById("station_fld");
const add_btn = document.getElementById("add_btn");
const remove_btn = document.getElementById("remove_btn");
const fetch_btn = document.getElementById("fetch_btn");
const station_lbl = document.getElementById("station_lbl");
const state_fld = document.getElementById("state_fld");
const state_btn = document.getElementById("state_btn");
const conf_fld = document.getElementById("conf_fld");
const conf_btn = document.getElementById("conf_btn");
const data_div = document.getElementById("data_div");

register_btn.addEventListener("click", register);
login_btn.addEventListener("click", login);
add_btn.addEventListener("click", add_station);
remove_btn.addEventListener("click", remove_station);
fetch_btn.addEventListener("click", fetch_station);
state_btn.addEventListener("click", state);
conf_btn.addEventListener("click", conf);

async function register() {
    await create_user(reg_name_fld.value, reg_login_fld.value, reg_pass_fld.value);
    register_lbl.textContent = "Ok";
}

async function login() {
    get_user(login_fld.value, pass_fld.value).then(d => {
        login_lbl.textContent = "Ok";
        name_lbl.textContent = d.name;
    });
    get_stations(login_fld.value, pass_fld.value).then(d => {
        stations_lbl.textContent = d.join(", ");
    });
}

async function fetch_station() {
    get_station(station_fld.value, login_fld.value, pass_fld.value).then(d => {
        station_lbl.textContent = d.name;
        conf_fld.textContent = d.conf;
    });
    get_state(station_fld.value, login_fld.value, pass_fld.value).then(d => state_fld.value = d);

    const data = await get_data(station_fld.value, login_fld.value, pass_fld.value);
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

async function add_station() {
    await register_station(station_fld.value, login_fld.value, pass_fld.value);
    get_stations(login_fld.value, pass_fld.value).then(d => {
        stations_lbl.textContent = d.join(", ");
    });
}

async function remove_station() {
    await delete_station(station_fld.value, login_fld.value, pass_fld.value);
    get_stations(login_fld.value, pass_fld.value).then(d => {
        stations_lbl.textContent = d.join(", ");
    });
}

async function state() {
    await update_state(state_fld.value, station_fld.value, login_fld.value, pass_fld.value);
}

async function conf() {
    await update_conf(conf_fld.textContent, station_fld.value, login_fld.value, pass_fld.value);
}
