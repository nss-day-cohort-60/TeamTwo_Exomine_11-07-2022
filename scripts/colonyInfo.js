//IMPORTS
import { getGovernors, getColonies, getPurchasedMinerals, setGovernor, getTransientState, setColony } from "./database.js";


//GOVERNER//

// find the active governers and put them in a new array

const findActiveGovernors = () => {
    let activeGoverners = []
    for (const governer of getGovernors()) {
        if (governer.active === true) {
            activeGoverners.push(governer)
        }
    }
    return activeGoverners
}

// loop through the active governers and display them in a drop down

export const governorsFunction = () => {
    let state = getTransientState()
    let html = `
    <select class="governors" id="governors">`
    html+=`
        <option value="">Choose Governor</option>
        ${findActiveGovernors().map(governor => {
        return `<option ${state.governorId===governor.id? "selected": ""} value="${governor.id}--${governor.colonyId}">${governor.name}</option>`
    }).join("")}
    </select>`
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "governors") {
        const [governorId, colonyId] = event.target.value.split("--")
        setGovernor(parseInt(governorId))
        setColony(parseInt(colonyId))
      
    }
})

//COLONY AND PURCHASES//

// find the colony of the selected governor

const findColony = () => {
    let state= getTransientState()
    for (const colony of getColonies()) {
        if (colony.id == state.colonyId) {
            return colony.name
        }
    }
}


// find the minerals that this colony has purchased

const findMinerals = (colonyId) => {
    let colonyMinerals = []
    for (const mineral of getPurchasedMinerals()) {
        if (mineral.colonyId === colonyId) {
            colonyMinerals.push(mineral)
        }
    }
    return colonyMinerals
}


// create html for that colony's name and inventory

export const colonyInventoryHTML = () => {
    let state = getTransientState()
    if (state.governorId){
    let html = ""
        html += `
            <div id="colonyName">
                <h2>${findColony()}</h2>
            </div>
            <div id="inventory">
                <ul>
                    ${findMinerals(state.colonyId).map(mineral => {
                    return `<li>${mineral.quantity} tons of ${mineral.mineralName}</li>`
                    }).join("")
                    }
                </ul>
            </div>`
    return html} else {return ""}
}
