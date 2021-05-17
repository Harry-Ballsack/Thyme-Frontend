const loginBtn = document.getElementById("loginBtn");
const userFld = document.getElementById("userFld");
const passwdFld = document.getElementById("passwdFld");

loginBtn.addEventListener("click", login);

async function login() {
    get_user(userFld.value, passwdFld.value).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
    )
    .catch(function(err) {
		console.log('Fetch Error :-S', err);
    });
	
    get_stations(userFld.value, passwdFld.value).then(d => {
        console.log(d.join(", "));
    });
}
