import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try
  {
    let responseReservationAPI=await fetch(`${config.backendEndpoint}/reservations/`)
    let reservations=await responseReservationAPI.json()
    return reservations
  }
  catch(error)
  {
    console.log(error)
    return null
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations.length)
  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations.length===0)
  {
    document.querySelector("#no-reservation-banner").style.display="block"
    document.querySelector("#reservation-table-parent").style.display="none"
  }
  else
  {
    document.querySelector("#no-reservation-banner").style.display="none"
    document.querySelector("#reservation-table-parent").style.display="block"
  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 let tableBody=document.querySelector("#reservation-table")
 for(let reservationItem of reservations)
 {
   console.log(reservationItem)
   const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  let date=new Date(reservationItem["date"]).toLocaleDateString("en-IN").split("/")
  let dateObj={
    dd:date[0],
    mm:date[1],
    yy:date[2]
  }
  console.log(dateObj)
  let time=new Date(reservationItem["time"])
   let rowOfReservervationItem=document.createElement("tr")
   rowOfReservervationItem.innerHTML=`
   <th scope="col">${reservationItem["id"]}</th>
   <th scope="col">${reservationItem["name"]}</th>
   <th scope="col">${reservationItem["adventureName"]}</th>
   <th scope="col">${reservationItem["person"]}</th>
   <th scope="col">${dateObj["dd"]}/${dateObj["mm"]}/${dateObj["yy"]}</th>
   <th scope="col">${reservationItem["price"]}</th>
   <th scope="col">${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}, ${time.toLocaleTimeString("en-IN").toLowerCase()}</th>
   <td><div class="reservation-visit-button" id=${reservationItem.id}><a href="../detail/?adventure=${reservationItem.adventure}">Visit Adventure</a></div></td>
   `
   tableBody.append(rowOfReservervationItem)
 }
}

export { fetchReservations, addReservationToTable };
