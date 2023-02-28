import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search)
  let cityFromURL=search.split("=")[1]
  //console.log(cityFromURL)
  return cityFromURL;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let fetchedDatafromURL=await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    let fetchedToJSON= await fetchedDatafromURL.json()
    //console.log(fetchedToJSON)
    return fetchedToJSON;
  }
  catch(err)
  {
    console.log(err)
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures)

  adventures.forEach(element => {
    let {id,category,image,name,costPerHead,duration}=element;

  let container=document.createElement("div")
  container.className="col-12 col-lg-3 col-sm-6 col-12 mb-4"

  let innerHTMLforContainer=`<a href="detail/?adventure=${id}" id="${id}">
    <div class="card activity-card">
      <div class="category-banner">${category}</div>
      <img src="${image}">
      <div class="d-flex justify-content-between w-100">
        <p>${name}</p>
        <p>₹ ${costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between w-100">
        <p>Duration</p>
        <p>${duration} Hours</p>
      </div>
    </div>
  </a>`
  container.innerHTML=innerHTMLforContainer;
  document.getElementById("data").appendChild(container)
  });
  //console.log(adventures)
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredDurationList=list.filter(item => item.duration>=low && item.duration<=high)
  return filteredDurationList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCategoryList=list.filter(adventure => categoryList.includes(adventure.category))
 // console.log(filteredCategoryList)
  return filteredCategoryList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only 
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  //let [low,high]=filters.duration.split("-")

  if(filters.duration.length > 0 && filters.category.length >0)
  {
   
    let [low,high]=filters.duration.split(/[-+]/g)
    list=filterByDuration(list,low,high)
    list=filterByCategory(list,filters.category)
    return list
  }
  else if(filters.duration.length==0 && filters.category.length>0)
  {
    list=filterByCategory(list,filters.category)
    return list
  }
  else if(filters.category.length==0 && filters.duration.length>0)
  {
    let [low,high]=filters.duration.split(/[-+]/g)
    list=filterByDuration(list,low,high)
    return list;
  }
  else if(filters.duration.length==0 && filters.category.length==0)
  {
    return list
  }
  


  // Place holder for functionality to work in the Stubs
  return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  window.localStorage.setItem("filters",JSON.stringify(filters))
  //console.log(filters)

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let gotItem=window.localStorage.getItem("filters")
  gotItem=JSON.parse(gotItem)
 // console.log(gotItem)
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  //let categoryPill=[]

  
  let categories=filters["category"]
  
  for(let category of categories)
  {
    let pill=document.createElement("div")
    pill.classList="category-filter"
    pill.innerHTML=`${category}`
    document.getElementById("category-list").appendChild(pill)
  }

  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
