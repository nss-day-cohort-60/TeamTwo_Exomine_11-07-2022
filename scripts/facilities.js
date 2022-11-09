import { getFacilities, setFacility, getFacilityMinerals, getTransientState, setMineral } from "./database.js";

//function to make a drop down of all available facilities - the id is the facilityID for each HTML element
export const facilityDropDown = () => {
    let facilities = getFacilities()
    let state = getTransientState()
    let html = ""
    if (state.governorId){
        html +=`<label class="label">Choose a facility:</label>
            <select name="facilityDropDown">
            <option id="defaultdropdown">Choose a Facility</option>`
    } else {
        html +=`<label class="label">Choose a facility:</label>
            <select disabled name="facilityDropDown">
            <option id="defaultdropdown">Choose a Facility</option>`
    }
    let listItems = facilities.map (facility => {
        return `<option value="${facility.id}">${facility.name}</option>`
    }).join("")
    html += listItems
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
    <input type="radio" name="facilityMinerals" value="${facilityM.name}" /> ${facilityM.name}
    </li>`})
    html += listItems.join("")
    html += "</ul>"
    console.log(transientState)

    return html
}

//code for event listener to set facility drop selection
document.addEventListener("change", (event) => {
    if (event.target.name === "facilityDropDown") {
        setFacility(parseInt(event.target.value))
    }
})

//code for event listener to set facility mineral selection
document.addEventListener("change", (event) => {
    if (event.target.name === "facilityMinerals") {
        setMineral((event.target.value))
    }
})


