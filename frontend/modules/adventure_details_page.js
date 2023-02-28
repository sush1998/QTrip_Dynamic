import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    
    let adventureID=search.split("=")[1]
    //console.log(adventureID)
    return adventureID


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let fetchURL=await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`)
    let fetchJSON=await fetchURL.json()
    //console.log(fetchJSON)
    return fetchJSON
  }
  catch(err)
  {
    console.log(err)
    return null
  }
  
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
 function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure)
  document.getElementById("adventure-name").textContent=`${adventure["name"]}`
  document.getElementById("adventure-subtitle").textContent=`${adventure["subtitle"]}`

  //let imgDiv=document.getElementById("photo-gallery")
  let images=adventure["images"]
  for(let img of images)
  {
    let imgDiv=document.createElement("div")
    imgDiv.innerHTML=`<img class="activity-card-image" src="${img}">`
    document.getElementById("photo-gallery").appendChild(imgDiv)
  }

  document.getElementById("adventure-content").textContent=adventure["content"]


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images)

  ///let photoGallery=document.getElementById("photo-gallery")

  let photoGallery=document.getElementById("photo-gallery")

  photoGallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" id="carousel-inner">

  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`

for(let img in images)
{
  let carouselItem=document.createElement("div")
  carouselItem.className=`carousel-item ${img==0?"active":""}`
  // carouselItem.setAttribute("class","carousel-item")
  // if(img==0)
  // {
  //   carouselItem.setAttribute("class","carousel-item active")
  // }
  carouselItem.innerHTML=`<img src="${images[img]}" class="d-block w-100 activity-card-image" alt="image">`
  document.querySelector(".carousel-inner").appendChild(carouselItem)
  //console.log(document.querySelector(".carousel-inner"))
}

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // /console.log(adventure)

  if(adventure["available"]==true)
  {
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").textContent=adventure["costPerHead"]

    let persons=document.getElementsByName("person")[0].value
    calculateReservationCostAndUpdateDOM(adventure,persons)
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block"
    document.getElementById("reservation-panel-available").style.display="none"
  
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    
    let totalCost =parseInt(persons) * parseInt(adventure["costPerHead"])
    document.getElementById("reservation-cost").textContent=totalCost
    if(persons=="")
    {
      document.getElementById("reservation-cost").textContent=0
    }
    //console.log(totalCost)
    return totalCost
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let form=document.querySelector("#myForm")
  form.addEventListener("submit", async event=>
  {
    event.preventDefault()

    let data={
      
      name:form.elements["name"].value,
      date:form.elements["date"].value,
      person:form.elements["person"].value,
      adventure:adventure["id"],
    }
    //console.log(data)
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    }
  
    try{
      const responseFetchPOST=await fetch(`${config.backendEndpoint}/reservations/new`,options)
      window.alert("Reservation Successful")
      //showBannerIfAlreadyReserved(responseFetchPOST)
      console.log(responseFetchPOST)
    }
    catch(err)
    {
      console.log(err)
      window.alert("Something wrong happened !")
      return null
    }
    

  })
  
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  console.log(adventure["reserved"])
  if(adventure["reserved"])
  {
    document.querySelector("#reserved-banner").style.display="block"
  }
  else
  {
    document.querySelector("#reserved-banner").style.display="none"
  }
 
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
