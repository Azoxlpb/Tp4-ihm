async function list_ville() {
    const response = await fetch('http://gigondas:1111/sprietna/ihm/tp4/cities');
    const names = await response.json();
    for (let index = 0; index < names.length; index++) {
        document.querySelector("#search_depart").innerHTML += ` <option value="${names[index].name}">${names[index].name}</option>`;
    }
    for (let index = 0; index < names.length; index++) {
        document.querySelector("#search_arrivee").innerHTML += ` <option value="${names[index].name}">${names[index].name}</option>`;
    }
}
list_ville();