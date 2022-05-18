async function list_ville() {    
    document.querySelector("#search_depart").innerHTML = ''
    document.querySelector("#search_arrivee").innerHTML = ''
    const response = await (await fetch('http://gigondas:1111/sprietna/ihm/tp4/cities')).json();
    for (let index = 0; index < response.length; index++) {
        document.querySelector("#search_depart").innerHTML += ` <option value="${response[index].name}">${response[index].name}</option>`;
        document.querySelector("#search_arrivee").innerHTML += ` <option value="${response[index].name}">${response[index].name}</option>`;
    }
}
list_ville();

async function addStation(){
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
	document.querySelector(`#search_depart_gare`).innerHTML = '';
    let value =  document.querySelector(`#dep`).value;
    for (let i = 0; i < req.length; i++) {
		if (req[i].city == value) {
			document.querySelector(`#search_depart_gare`).innerHTML += `<option value="${req[i].name}"></option>`;
		}
	}

	document.querySelector(`#search_arrivee_gare`).innerHTML = '';
    let value2 =  document.querySelector(`#arr`).value;
    for (let i = 0; i < req.length; i++) {
		if (req[i].city == value2) {
			document.querySelector(`#search_arrivee_gare`).innerHTML += `<option value="${req[i].name}"></option>`;
		}
	}

}
addStation();
