const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");

loginBtn.addEventListener("click", login);

async function login() {
    get_user(login_fld.value, pass_fld.value).then(d => {
        console.log(d.name);
		
    });
    get_stations(login_fld.value, pass_fld.value).then(d => {
        console.log(d.join(", "));
    });
}