//IMPORTS
import { getGovernors, getColonies, getPurchasedMinerals, setGovernor } from "./database.js";


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

                         //COLONY AND PURCHASES//

// find the minerals that this colony has purchased
const findMinerals = (colonyId) => {
    let purchasedMinerals = []
    for( const mineral of getPurchasedMinerals()){
        if (mineral.colonyId === colonyId){
            purchasedMinerals.push(mineral)
        }
    }
    return purchasedMinerals
}

// find the colony of the selected governor
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener( "change", (event) => {
    if (event.target.id === "governors") {

        const [governorId,colonyId] = event.target.value.split("--")
        setGovernor(parseInt(governorId))
        for (const colony of getColonies()){
            if(colony.id === parseInt(colonyId)){
                let purchases = findMinerals(colony.id)
                return `
                    <h1>${colony.name}</h1>
                    <ul>
                    ${purchases.map(mineral =>{ 
                        return `<li>${mineral.name}</li>`
                        }).join("")
                    }
                    </ul>`
            }
        }
    }
})


