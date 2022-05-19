async function decodetravels() {
	// document.querySelector('form>section').style.display = 'none';
	let finalurl = '?';
	let cityorigin = false;
	let stationorigin = false;
	let citydest = false;
	let stationdest = false
	let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();

	for (let i = 0; i < req.length; i++) {
		if (req[i].city == document.querySelector('#dep').value && cityorigin == false) {
			finalurl = finalurl + 'cityFrom=' + req[i].cityId;
			cityorigin = true;
		}
	}

	for (let i = 0; i < req.length; i++) {
		if (req[i].name == document.querySelector('#dep2').value && stationorigin == false) {
			finalurl += '&stationFrom=' + req[i].id;
			stationorigin = true;
		}
		if (req[i].city == document.querySelector('#arr').value && citydest == false) {
			finalurl += '&cityTo=' + req[i].cityId;
			citydest = true;
		}
		if (req[i].name == document.querySelector('#arr2').value && stationdest == false) {
			finalurl += '&stationTo=' + req[i].id;
			stationdest = true;
		}
	}
	finalurl += '&date=' + document.querySelector('#datedep').value;
	finalurl += '&timeFrom=' + document.querySelector('#time').value;
	console.log(finalurl);
	getTravels(finalurl);
}



async function getTravels(url) {
	let req = await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/schedules${url}`)
	let schedules = await req.json()
	console.log(schedules.length);
	if (schedules.length == 0) {
		document.querySelector('#train-button').innerHTML = "<h1>Aucun trajet ne correspond à votre recherche</h1>"
	} else {
		document.querySelector('footer').style.position = 'inherit';
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


			document.querySelector('.train-button').innerHTML += ` 
			<article>
			<img src="img/logo-train.png" id="logo-train">
			<section class="depart">
				<span> ${schedules[element].travel.from.city} </span>
				<span> ${schedules[element].departureTime} </span>
			</section>
			<section class="arrivee">
				<span> ${schedules[element].travel.to.city}</span>
				<span> ${arrivalhours + "h" + arrivalminutes} </span>
			</section>
			<section class="price">
				<span> ${schedules[element].price}€</span>
				<button class="reserver">
					Réserver
				</button>
			</section>
		</article>
		<section class="bottom-ticket">
			<span> ${schedules[element].date} </span>
			<span> ${hours + "h" + minutes}</span>
		</section>
		`
		}
	}



}