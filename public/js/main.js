console.log("js file loaded");

async function loadPokemon() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1`);
    let jsonObj = await response.json();
    console.log(jsonObj);
    let pokemon = jsonObj.results[0];

    console.log(pokemon.name);
    let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    let jsonObj2 = await response2.json();
    console.log(jsonObj2);
    console.log(jsonObj2.sprites.other['official-artwork'].front_default);
}
loadPokemon();

document.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	let scrollbuffer = 5;
    if (scrollTop + clientHeight + scrollbuffer >= scrollHeight) {
        console.log("End of page reached");
    }
});

