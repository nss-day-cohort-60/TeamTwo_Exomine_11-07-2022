import { getFacilities, setFacility, getFacilityMinerals, getTransientState } from "./database.js";


//function to make a drop down of all available facilities - the id is the facilityID for each HTML element
export const facilityDropDown = () => {
    let facilities = getFacilities()
    let html= `<label class="label">Choose a facility:</label>
            <select name="facilityDropDown">
            <option id="defaultdropdown">Choose a Facility</option>`
    let listItems = facilities.map (facility => {
        return `<option id="${facility.id}">${facility.name}</option>`
    })
    html += listItems.join("")
    html += "</select>"
    return html
}




/*define function to output html for facilityMinerals radio buttons
grab current transient state, faacilityMinerals. Filter facilityMinerals by productionId
return HTML */

export const facilityRadio = () => {
    let transientState = getTransientState()
    let facilityMineralA = getFacilityMinerals()
    let facilityMineral = facilityMineralA.filter(filtered => {if (filtered.productionId === transientState.productionId) return filtered})

    let html= "<h3> Facility Minerals</h3><ul>"
    const listItems = facilityMineral.map (facilityM => {return `<li> 
    <input type="radio" name="facilityMinerals" value="${facilityM.id}" /> ${facilityM.name}
    </li>`})
    html += listItems.join("")
    html += "</ul>"
    return html
}





//code for event listener
document.addEventListener("change", (event) => {
    if (event.target.name === "facilityDropDown") {
        setFacility(parseInt(event.target.id))
    }
})
