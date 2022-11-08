//IMPORTS
import { getGoverners, getColonies, getPurchasedMinerals } from "./database.js";


                             //GOVERNER//

// find the active governers and put them in a new array
const findActiveGoverners = () => {
    let activeGoverners = []
    for (const governer of getGoverners()){
        if (governer.active === true){
            activeGoverners.push(governer)
        }
    }
    return activeGoverners
}

// loop through the active governers and display them in a drop down
export const governersFuntion = () => {
    let html = `
    <select class="governers" id="governers">
        <option value="">Choose Governer</option>
        ${ findActiveGoverners().map(governer=> {
            return `<option value="${governer.id}--${governer.colonyId}">${governer.name}</option>`
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

// find the colony of the selected governer
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener( "change", (event) => {
    if (event.target.id === "governers") {

        const [,colonyId] = event.target.value.split("--")
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


