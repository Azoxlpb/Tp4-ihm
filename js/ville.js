async function list_ville() {
    const response = await fetch('http://gigondas:1111/sprietna/ihm/tp4/cities');
    const names = await response.json();
    var villes = Object.keys(names.name);
    console.log(villes)
    /* for (let index = 0; index < villes.length; index++) {
        document.querySelector("#champs-list").innerHTML += ` <option value="${champion[index]}">${champion[index]}</option>`;
    }
    */
  }
  list_ville();