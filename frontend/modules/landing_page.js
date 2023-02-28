import config from "../conf/index.js";

async function init() {

  console.log("From init()");
  console.log(`${config.backendEndpoint}/cities`)
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities)

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try
  {
    let cityFetch=await fetch(`${config.backendEndpoint}/cities`)
    console.log(cityFetch)
    let cityInJson=await cityFetch.json();
    return cityInJson
  }
  catch(err)
  {
    console.log(err)
    return null
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container=document.createElement("div")
  container.className="col-12 col-lg-3 col-sm-6 col-12 mb-4"
  let innerHTMLofContainer=`<a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile d-flex justify-content-end text-center align-items-end text-white">
      <div class="tile-text d-flex flex-column align-self-center ">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img src="${image}" alt="${city}">
    </div> 
  </a>`

  container.innerHTML=innerHTMLofContainer
  document.getElementById("data").appendChild(container)
  return container
  
}

export { init, fetchCities, addCityToDOM };
