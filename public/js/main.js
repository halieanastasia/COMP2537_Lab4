console.log("js file loaded");

var offset = 0;
var isLoading = false;

async function loadPokemon() {
  isLoading = true;

  console.log("Offset: ", offset);
  if (offset >= 1025) {
    offset = 0;
  }

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`,
  );
  let jsonObj = await response.json();
  console.log(jsonObj);

  let pokemonBasicArray = [];
  for (let i = 0; i < jsonObj.results.length; i++) {
    pokemonBasicArray.push(jsonObj.results[i]);
  }
  console.log("Basic: ", pokemonBasicArray);

  let pokemonDetailedArray = [];
  for (let i = 0; i < pokemonBasicArray.length; i++) {
    let response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonBasicArray[i].name}`,
    );
    pokemonDetailedArray.push(await response2.json());
    console.log("Detailed: ", pokemonDetailedArray.at(-1));
  }

  for (let i = 0; i < pokemonDetailedArray.length; i++) {
    {
      displayPokemon(
        pokemonDetailedArray[i].name,
        pokemonDetailedArray[i].sprites.other["official-artwork"].front_shiny,
      );
    }
  }
  offset += 10;
  isLoading = false;
}
loadPokemon();

function displayPokemon(name, imgSource) {
  const pokemonList = document.getElementById("pokemonList");

  const cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");
  cardDiv.setAttribute("style", "width: 475px");

  const pokemonImg = document.createElement("img");
  pokemonImg.setAttribute("src", imgSource);
  pokemonImg.setAttribute("class", "card-img-top");
  cardDiv.appendChild(pokemonImg);

  const pokemonNameDiv = document.createElement("div");
  pokemonNameDiv.setAttribute("class", "card-body");
  pokemonNameDiv.setAttribute("style", "background-color: #f8f8f8");

  const pokemonName = document.createElement("h3");
  pokemonName.setAttribute("class", "card-title");
  pokemonName.innerHTML = name;
  pokemonNameDiv.appendChild(pokemonName);

  cardDiv.appendChild(pokemonNameDiv);
  pokemonList.appendChild(cardDiv);
}

// Detects when the user has scrolled to the end of the page
document.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let scrollbuffer = 5;
  if (scrollTop + clientHeight + scrollbuffer >= scrollHeight) {
    if (!isLoading) {
      loadPokemon();
    }
    console.log("End of page reached");
  }
});

