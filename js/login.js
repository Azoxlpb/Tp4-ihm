function logincookiestest() {
	if (document.cookie.indexOf("UserID") != -1) {  
		window.location.replace(`/login.html`)
	} else {
        document.querySelector('#login-button').style.display = "none";
	}
}

async function login(){
    console.log(document.getElementById('#login-password').value);
    console.log(document.getElementById('#login-id').value);
    let pass = document.getElementById('#login-password').value;
    let id = document.getElementById('#login-id').value;

    fetch('http://gigondas:1111/sprietna/ihm/tp4/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mail: id,
            password: pass
        })
    })
    .then((response) => {
        console.log("test");
        if (response.ok) {
            return response.text();
        } else {
            throw response;
        }
    })
    .then((userId) => {
        console.log(userId);
        document.cookie = "UserID" + "=" + userId + ";" + 30 + "; path=/";
        sessionStorage.setItem("UserID", userId);
    })
    .catch((error) => {
        error.text().then((errorMessage) => {
            console.log('Request Failed : ' + errorMessage);
        });
    });
    
    
}