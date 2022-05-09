async function decodetravels() {
	document.querySelector('form>section').style.display = 'none';
	let finalurl = '?';
	let cityorigin = false;
	let stationorigin = false;
	let citydest = false;
	let stationdest = false
	let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();

	for (let i = 0; i < req.length; i++) {
		if (req[i].city == document.querySelector('#search_depart').value && cityorigin == false) {
			finalurl = finalurl + 'cityFrom=' + req[i].cityId;
			cityorigin = true;
		}
	}

	for (let i = 0; i < req.length; i++) {

		if (req[i].name == document.querySelector('#search_depart_gare').value && stationorigin == false) {
			finalurl += '&stationFrom=' + req[i].id;
			stationorigin = true;
		}
		if (req[i].city == document.querySelector('#search_arrivee').value && citydest == false) {
			finalurl += '&cityTo=' + req[i].cityId;
			citydest = true;
		}
		if (req[i].name == document.querySelector('#search_arrivee_gare').value && stationdest == false) {
			finalurl += '&stationTo=' + req[i].id;
			stationdest = true;
		}
	}
	finalurl += '&date=' + document.querySelector('#date').value;
	finalurl += '&timeFrom=' + document.querySelector('#time').value;
	console.log(finalurl);
	getTravels(finalurl);
}

async function getTravels(url) {
	let req = await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/schedules${url}`)
	let schedules = await req.json()
	console.log(schedules.length);
	if (schedules.length == 0) {
		document.querySelector('#more-result').innerHTML = "<h1>Aucun trajet ne correspond à votre recherche</h1>"
	} else {
		for (let element = 0; element < schedules.length; element++) {
			let hours = parseInt(Math.floor(schedules[element].travel.duration / 60));
			let minutes = parseInt(schedules[element].travel.duration % 60);
			let departhours = parseInt(((schedules[element].departureTime).split(':'))[0])
			let departminutes = parseInt(((schedules[element].departureTime).split(':'))[1])


			let arrivalhours = hours + departhours
			let arrivalminutes = minutes + departminutes
			if (arrivalminutes > 59) {
				arrivalminutes = arrivalminutes % 60
				arrivalhours = arrivalhours + Math.floor(arrivalminutes / 60)
			}

			var button = document.getElementById("#more-result");
			while (button.firstChild) {
				button.removeChild(button.firstChild);
			}

			document.querySelector('#more-result').innerHTML += `
			
			`
		}

	}



}