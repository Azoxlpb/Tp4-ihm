async function list_gare() {
    const response = await fetch('http://gigondas:1111/sprietna/ihm/tp4/stations');
    const names = await response.json();
    for (let index = 0; index < names.length; index++) {
        document.querySelector("#search_depart_gare").innerHTML += ` <option value="${names[index].name}">${names[index].name}</option>`;
    }
    for (let index = 0; index < names.length; index++) {
        document.querySelector("#search_arrivee_gare").innerHTML += ` <option value="${names[index].name}">${names[index].name}</option>`;
    }
    
    const response2 = await fetch('http://gigondas:1111/sprietna/ihm/tp4/cities');
    const names2 = await response2.json();
    for (let index = 0; index < names2.length; index++) {
        document.querySelector("#search_depart").innerHTML += ` <option value="${names2[index].name}">${names2[index].name}</option>`;
    }
    for (let index = 0; index < names2.length; index++) {
        document.querySelector("#search_arrivee").innerHTML += ` <option value="${names2[index].name}">${names2[index].name}</option>`;
    }
}
list_gare();

async function addStation(){
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
	document.querySelector(`#search_depart_gare`).innerHTML = '';
    let value =  document.querySelector(`#dep`).value;
    for (let i = 0; i < req.length; i++) {
		if (req[i].city == value) {
			document.querySelector(`#search_depart_gare`).innerHTML += `<option value="${req[i].name}"></option>`;
		}
	}

    let req2 = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
	document.querySelector(`#search_depart_gare`).innerHTML = '';
    let value2 =  document.querySelector(`#arr`).value;
    for (let i = 0; i < req2.length; i++) {
		if (req2[i].city == value2) {
			document.querySelector(`#search_arrivee_gare`).innerHTML += `<option value="${req2[i].name}"></option>`;
		}
	}

}

addStation();
