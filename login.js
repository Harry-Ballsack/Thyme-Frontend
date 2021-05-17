const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");

loginBtn.addEventListener("click", login);

async function login() {
    get_user(userFld.value, passwdFld.value).then(
		function(response) {
			if(response.status !== 200) {
				console.log('Problem status: ' + response.status);
			}
			return;
		}
        console.log(d.name);
    )
	.catch(function(e) {
		console.log('Error: ' + e);
	});
	
    get_stations(userFld.value, passwdFld.value).then(d => {
        console.log(d.join(", "));
    });
}

