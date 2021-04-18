async function create_user(login, name, pass) {
    fetch("https://stomata.undertheprinter.com/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login,
            name,
            pass
        })
    }).then(response => response.json()).then(data => console.log(data));
}

async function get_user(login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login, {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data;
}

async function get_stations(login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations", {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data.stations;
}

async function get_station(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/stations/" + id, {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data;
}

async function get_data(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/stations/" + id + "/data", {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data.data;
}

async function get_state(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/stations/" + id + "/state", {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data.state;
}
