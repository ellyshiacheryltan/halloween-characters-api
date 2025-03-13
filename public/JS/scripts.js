const url = `${window.location.origin}/`;
const charactersURL = "characters";

let fetchCharacters = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // get data length
    console.log(data.length)

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

let index = 0;
let dataLength = 50;

let displayItems = (data, index) => {
  const nameElem = document.getElementById("name");
  const typeElem = document.getElementById("type");
  const ageElem = document.getElementById("age");
  const charNumElem = document.getElementById("charNumber");

  console.log(data);

  nameElem.innerHTML = data[index].name;
  typeElem.innerHTML = data[index].type;
  ageElem.innerHTML = data[index].age;
  charNumElem.innerHTML = index + 1;
};

const displayCharacters = async () => {
  const characters = await fetchCharacters(url + charactersURL);

  displayItems(characters, index);
};

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

backBtn.addEventListener("click", () => {
  if (index === 0) {
    index = dataLength - 1;
  } else {
    index -= 1;
  }

  displayCharacters();
});

nextBtn.addEventListener("click", () => {
  if (index === dataLength - 1) {
    index = 0;
  } else {
    index += 1;
  }

  displayCharacters();
});

displayCharacters();