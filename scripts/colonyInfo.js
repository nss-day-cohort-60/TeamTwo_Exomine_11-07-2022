//IMPORTS
import { getGovernors, getColonies, getPurchasedMinerals, setGovernor, getTransientState, setColony } from "./database.js";


                             //GOVERNER//

// find the active governors and put them in a new array

const findActiveGovernors = () => {
    let activeGovernors = []
    for (const governor of getGovernors()){
        if (governor.active === true){
            activeGovernors.push(governor)
        }
    }
    return activeGovernors
}

// loop through the active governors and display them in a drop down

export const governorsFunction = () => {
    let html = `
    <select class="governors" id="governors">
        <option value="">Choose Governor</option>
        ${ findActiveGovernors().map(governor=> {
            return `<option value="${governor.id}--${governor.colonyId}">${governor.name}</option>`
        }).join("")}
    </select>`
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener( "change", (event) => {
    if (event.target.id === "governors") {
        const [governorId,] = event.target.value.split("--")
        setGovernor(governorId)
    }
})




                         //COLONY AND PURCHASES//

const findColony = (govColonyId) => {
    for(const colony of getColonies()){
        if(colony.id == govColonyId){
          setColony(colony.id)
          return colony.name
        }
    }
}

// find the minerals that this colony has purchased

const findMinerals = (colonyId) => {
    let colonyMinerals = []
    for( const mineral of getPurchasedMinerals()){
        if (mineral.colonyId === colonyId){
            colonyMinerals.push(mineral)
        }
    }
    return colonyMinerals
}


// find the colony of the selected governor
// create html for that colony's name and inventory

export const colonyInventoryHTML = () => {
    return `
    <div id="colonyName">
        <h2>${findColony()}</h2>
    </div>
    <div id="inventory">
        <ul>
        ${findMinerals(getTransientState().colonyId).map(mineral =>{ 
            return `<li>${mineral.name}</li>`
            }).join("")
        }
        </ul>
    </div>` 
}

