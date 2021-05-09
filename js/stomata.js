async function create_user(name, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users", {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            pass
        })
    });
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

async function delete_user(login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
}

async function register_station(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        },
        body: JSON.stringify({
            id,
        })
    });
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
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations/" + id, {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data;
}

async function delete_station(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
}

async function get_data(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations/" + id + "/data", {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data.data;
}

async function get_state(id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations/" + id + "/state", {
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        }
    });
    const data = await resp.json();
    return data.state;
}

async function update_state(state, id, login, pass) {
    const resp = await fetch("https://stomata.undertheprinter.com/v1/users/" + login + "/stations/" + id + "/state", {
        method: "PUT",
        headers: {
            "Authorization": "Basic " + btoa(login + ":" + pass)
        },
        body: JSON.stringify({
            state,
        })
    });
}
