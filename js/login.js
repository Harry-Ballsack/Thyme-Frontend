const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");

loginBtn.addEventListener("click", login);

async function login() {
    get_user(userFld.value, passwdFld.value).then(d => {
        console.log(d.name);
		
    })
	.catch( error => alert(error));
	
    get_stations(userFld.value, passwdFld.value).then(d => {
        console.log(d.join(", "));
    });
}