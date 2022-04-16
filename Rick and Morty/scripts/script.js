let mainAreaElement;

function renderCharacter(name, status, species, image) {
  const cardCharacterElement = document.createElement("div");
  mainAreaElement.appendChild(cardCharacterElement);
  const characterImage = document.createElement("img");
  characterImage.src = image;
  cardCharacterElement.appendChild(characterImage);
}

async function fetchCharacters(charactersURLs) {
  const characterFetchPromises = charactersURLs.map((charactersURL) =>
    fetch(charactersURL)
  );
  const resolvedFetchResponses = await Promise.all(characterFetchPromises);
  const jsonPromises = resolvedFetchResponses.map((resolvedFetchResponse) =>
    resolvedFetchResponse.json()
  );
  const resolvedjsonPromises = await Promise.all(jsonPromises);
  console.log(resolvedjsonPromises);
  resolvedjsonPromises.forEach((characterJSON) =>
    renderCharacter(
      characterJSON.name,
      characterJSON.status,
      characterJSON.species,
      characterJSON.image
    )
  );
}

function updateMainArea(name, date, episodeCode, charactersURLs) {
  mainAreaElement.innerHTML = "";

  const titleElement = document.createElement("h2");
  titleElement.innerText = name;
  const dateAndCodeElement = document.createElement("h3");
  dateAndCodeElement.innerText = date | episodeCode;

  mainAreaElement.appendChild(titleElement);
  mainAreaElement.appendChild(dateAndCodeElement);

  renderCharacters(charactersURLs);
}

function sidebar() {
  const sidebarElement = document.createElement("div");
  sidebarElement.id = "sidebar";
  document.getElementById("root").appendChild(sidebarElement);
  fetch("https://rickandmortyapi.com/api/episode")
    .then((result) => result.json())
    .then((json) => {
      console.log(json.results);
      json.results.forEach((episode) => {
        const titleElement = document.createElement("p");
        titleElement.innerText = "Episode" + episode.id;
        sidebarElement.appendChild(titleElement);
        titleElement.addEventListener("click", () => {
          updateMainArea(
            episode.name,
            episode.air_date,
            episode.episode,
            episode.characters
          );
        });
        console.log("Episode " + episode);
      });
    });
}

function mainArea() {
  const mainAreaElement = document.createElement("div");
  document.getElementById("root").appendChild(mainAreaElement);
  mainAreaElement.innerText = "";
}

sidebar();
mainArea();
