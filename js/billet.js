
async function decodetravels() {
	document.querySelector('form>section').style.display = 'none';
	let finalurl = '?';
	let cityorigin = false;
	let stationorigin = false;
	let citydest = false;
	let stationdest = false
	let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();

	for (let i = 0; i < req.length; i++) {
		if (req[i].city == document.querySelector('#origin').value && cityorigin == false) {
			finalurl = finalurl + 'cityFrom=' + req[i].cityId;
			cityorigin = true;
		}
	}

	for (let i = 0; i < req.length; i++) {

		if (req[i].name == document.querySelector('#stationorigin').value && stationorigin == false) {
			finalurl += '&stationFrom=' + req[i].id;
			stationorigin = true;
		}
		if (req[i].city == document.querySelector('#destinationsearch').value && citydest == false) {
			finalurl += '&cityTo=' + req[i].cityId;
			citydest = true;
		}
		if (req[i].name == document.querySelector('#stationdestination').value && stationdest == false) {
			finalurl += '&stationTo=' + req[i].id;
			stationdest = true;
		}
	}
	finalurl += '&date=' + document.querySelector('#departure').value;
	finalurl += '&timeFrom=' + document.querySelector('#dpthour').value;
	console.log(finalurl);
	getTravels(finalurl);
}


//getTravels("?cityFrom=4&cityTo=1&stationTo=1&stationFrom=12&date=2022-05-11&timeFrom=");
async function getTravels(url) {
	document.querySelector('.ticketsaredisplayedherelol').innerHTML = "<h1>Recherche en cours..</h1>"

	let req = await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/schedules${url}`)
	let schedules = await req.json()
	console.log(schedules.length);

	document.querySelector('.ticketsaredisplayedherelol').innerHTML = ""

	if (schedules.length == 0) {
		document.querySelector('.ticketsaredisplayedherelol').innerHTML = "<h1>Aucun trajet ne correspond à votre recherche</h1>"
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


			document.querySelector('.ticketsaredisplayedherelol').innerHTML += `
			<article class="ticket ticket_n${element}">
								<section class="topticket">
									<div class="traveldetail">
										<section class="trajet depart">
											<h3>Départ</h3>
											<div>
												<svg id="typetrain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g data-name="electricity train"><path d="M80.44 47.154h-7.119a1 1 0 0 0-1 1V61.76a1 1 0 0 0 1 1h33.892A30.888 30.888 0 0 0 80.44 47.154z"/><rect x="44.536" y="47.154" width="16.072" height="15.606" rx="1"/><rect x="16.75" y="47.154" width="16.072" height="15.606" rx="1"/><path d="M103.64 80.11a1.314 1.314 0 0 0 1.31 1.31h16.3V78.8h-16.3a1.314 1.314 0 0 0-1.31 1.31z"/><path d="M80.44 37.15H9.75a3.009 3.009 0 0 0-3 3v37.96H73a2 2 0 0 1 0 4H6.75v5.74a3.009 3.009 0 0 0 3 3h108.5a3.009 3.009 0 0 0 3-3v-2.43h-16.3a5.31 5.31 0 0 1 0-10.62h16.18a40.868 40.868 0 0 0-40.69-37.65zM36.822 61.76a5.006 5.006 0 0 1-5 5H17.75a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h14.072a5.006 5.006 0 0 1 5 5zm27.786 0a5.006 5.006 0 0 1-5 5H45.536a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h14.072a5.006 5.006 0 0 1 5 5zm46.068 3.005a3.965 3.965 0 0 1-3.463 2H73.321a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h7.119a34.916 34.916 0 0 1 30.253 17.621 3.96 3.96 0 0 1-.017 3.99z"/></g></svg>
												<span class="start">${schedules[element].travel.from.city} - ${schedules[element].departureTime}</span>
											</div>
										</section>
										<p>→</p>
										<section class="trajet arrivée">
											<h3>Départ</h3>
											<div>
												<svg id="destination" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z"/><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></svg>
												<span class="start">${schedules[element].travel.to.city} - ${arrivalhours + "h" + arrivalminutes}</span>
											</div>
										</section>
									</div>
									<div class="priceANDbook">
										<article id="price">
											<p class="price">${schedules[element].price}€</p>
										</article>
										<button onclick="bookticket(${schedules[element].id})" class="tickket ${schedules[element].id}">Réserver</button>
									</div>
								</section>
	
								<section class="bottomticket">
									<div class="date">
										<svg version="1.1" id="calendars" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}.st2{fill:#232323}.st3{display:inline;fill:#fff}.st4{font-family:&apos;Helvetica-Bold&apos;}.st6{fill-rule:evenodd;clip-rule:evenodd}.st6,.st7{display:inline;fill:#232323}</style><g id="calendar_:_4"><path class="st2" d="M114.2 8.9v6.4s3.2 2.8 3.2 6.2v37H93.2V39.2H90v19.2H65.6V39.2h-3.2v19.2H38.1V39.2h-3.2v19.2H10.5v-37c0-3.4 3.2-6.2 3.2-6.2V8.9C8.4 8.9 4 14.7 4 20v95.9c0 5.3 4.4 11.2 9.7 11.2h100.5c5.4 0 9.7-5.9 9.7-11.2V20c.1-5.3-4.3-11.1-9.7-11.1zM89.9 61.6v17.6H65.6V61.6h24.3zM65.6 82.4h24.3V100H65.6V82.4zM62.4 100H38.1V82.4h24.3V100zm0-38.4v17.6H38.1V61.6h24.3zm-51.9 0h24.3v17.6H10.5V61.6zm0 20.8h24.3V100H10.5V82.4zm4.7 38.3c-3.5 0-4.7-1.2-4.7-4.6v-13h24.3v17.6H15.2zm22.9 0v-17.6h24.3v17.6H38.1zm27.5 0v-17.6h24.3v17.6H65.6zm51.9-4.5c0 3.4-1.2 4.6-4.7 4.6H93.2v-17.6h24.3v13zm0-16.2H93.2V82.4h24.3V100zm0-20.8H93.2V61.6h24.3v17.6z" id="border_5_"/><path id="select_2_" style="fill-rule:evenodd;clip-rule:evenodd;fill:#232323" d="M38.1 61.6h24.3v17.6H38.1z"/><path class="st2" d="M64.1 27.9c2.7 0 4.9-2 4.9-4.5v-18C69 2.9 66.8.9 64.1.9s-4.9 2-4.9 4.5v18c0 2.5 2.2 4.5 4.9 4.5zm-35.9.1c2.6 0 4.7-2 4.7-4.5V5.4c0-2.5-2.1-4.5-4.7-4.5s-4.7 2-4.7 4.5v18.1c0 2.5 2.1 4.5 4.7 4.5zm87.6-19.1h-9.7v16c0 2.6-3.8 4.8-6.5 4.8s-6.5-2.1-6.5-4.8v-16H70.5v16c0 2.6-3.8 4.8-6.5 4.8s-6.5-2.1-6.5-4.8v-16H34.8v16c0 2.6-3.8 4.8-6.5 4.8s-6.5-2.1-6.5-4.8v-16h-9.7C8.3 8.9 4 14.7 4 18.4v22.4h120V18.4c0-3.7-4.3-9.5-8.2-9.5zm-16.2 19c2.7 0 4.9-2 4.9-4.5v-18c0-2.5-2.2-4.5-4.9-4.5s-4.9 2-4.9 4.5v18c.1 2.5 2.3 4.5 4.9 4.5z" id="top_5_"/></g></svg>
										<span>${schedules[element].date}</span> 
									</div>
									<div class="duration">
										<svg id="clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 73.82c-100.617 0-182.18 81.563-182.18 182.172S155.383 438.18 256 438.18c100.608 0 182.18-81.572 182.18-182.188 0-100.61-81.572-182.172-182.18-182.172zm12.604 204.223c0 .079-.027.149-.027.228a11.358 11.358 0 0 1-.149 1.433c-.044.36-.071.73-.15 1.08a10.65 10.65 0 0 1-.342 1.1 13.823 13.823 0 0 1-.457 1.31c-.036.07-.045.149-.08.22a11.605 11.605 0 0 1-.94 1.652c-.026.035-.052.07-.07.097a13.245 13.245 0 0 1-1.327 1.617 7.83 7.83 0 0 1-.413.377 11.232 11.232 0 0 1-1.318 1.108c-.15.096-.29.21-.44.308a11.915 11.915 0 0 1-1.889 1.028c-.141.062-.29.105-.431.158a12.965 12.965 0 0 1-1.697.519c-.21.053-.413.105-.623.14a12.816 12.816 0 0 1-2.26.228c-.158 0-.307-.052-.465-.052a12.49 12.49 0 0 1-2.153-.238c-.22-.044-.43-.14-.651-.201a13.458 13.458 0 0 1-1.89-.642c-.061-.035-.14-.035-.21-.071l-69.847-32.95a12.599 12.599 0 0 1 10.749-22.79l51.873 24.468V149.424a12.604 12.604 0 1 1 25.207 0z" data-name="Time 10 O'clock"/></svg>
										<span>${hours + "h" + minutes}</span>
									</div>
									<div class="typeTrain">
										<svg id="typetrain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g data-name="electricity train"><path d="M80.44 47.154h-7.119a1 1 0 0 0-1 1V61.76a1 1 0 0 0 1 1h33.892A30.888 30.888 0 0 0 80.44 47.154z"/><rect x="44.536" y="47.154" width="16.072" height="15.606" rx="1"/><rect x="16.75" y="47.154" width="16.072" height="15.606" rx="1"/><path d="M103.64 80.11a1.314 1.314 0 0 0 1.31 1.31h16.3V78.8h-16.3a1.314 1.314 0 0 0-1.31 1.31z"/><path d="M80.44 37.15H9.75a3.009 3.009 0 0 0-3 3v37.96H73a2 2 0 0 1 0 4H6.75v5.74a3.009 3.009 0 0 0 3 3h108.5a3.009 3.009 0 0 0 3-3v-2.43h-16.3a5.31 5.31 0 0 1 0-10.62h16.18a40.868 40.868 0 0 0-40.69-37.65zM36.822 61.76a5.006 5.006 0 0 1-5 5H17.75a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h14.072a5.006 5.006 0 0 1 5 5zm27.786 0a5.006 5.006 0 0 1-5 5H45.536a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h14.072a5.006 5.006 0 0 1 5 5zm46.068 3.005a3.965 3.965 0 0 1-3.463 2H73.321a5.006 5.006 0 0 1-5-5V48.154a5.006 5.006 0 0 1 5-5h7.119a34.916 34.916 0 0 1 30.253 17.621 3.96 3.96 0 0 1-.017 3.99z"/></g></svg>
										<span>TGV</span>
									</div>
									<div class="price">
										<svg id="money" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g data-name="Euro Currency"><path d="M255.998 120.712A135.288 135.288 0 1 0 391.286 256a135.288 135.288 0 0 0-135.288-135.288zm-.07 252.55A117.273 117.273 0 1 1 373.205 255.99 117.405 117.405 0 0 1 255.93 373.262z"/><path d="M255.929 158.67a97.323 97.323 0 1 0 97.325 97.323 97.43 97.43 0 0 0-97.325-97.322zm17.2 154.323a57.013 57.013 0 0 1-51.567-32.89h-21.218v-19.95h16.004c-.1-1.377-.21-2.754-.21-4.157s.11-2.779.21-4.156h-16.004v-19.95h21.218a56.923 56.923 0 0 1 89.465-18.47l-13.267 14.903a36.972 36.972 0 0 0-52.697 3.567h28.235v19.95h-36.96a34.688 34.688 0 0 0 0 8.312h36.96v19.95h-28.235a36.979 36.979 0 0 0 53.18 3.136l13.526 14.664a56.832 56.832 0 0 1-38.64 15.091z"/></g></svg>
										<span>${schedules[element].price}€</span>
									</div>
								</section>
							</article>
			`
		}

	}



}