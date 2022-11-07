//IMPORTS
import { getGoverners } from "./database,js";

let activeGoverners = []

//GOVERNER DROP

// find the active governers and put them in a new array
const findActiveGoverners = () => {
    for (const governer of getGoverners()){
        if (governer.active === true){
            activeGoverners.push(governer)
        }
    }
    return activeGoverners
}

// loop through the active governers and display them in a drop down
export const governersFuntion = () => {
    findActiveGoverners()
    let html = `
    <select class="governers" id="governers">
        <option value="">Choose Governer</option>
        ${ activeGoverners.map(governer=> {
            return `<option value="${governer.id}--${governer.colonyId}">${governer.name}</option>`
        }).join("")}
    </select>`

    return html
}

// find the colony of the selected governer
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener( "change", (event) => {
    if (event.target.id === "governers") {

        const [,colonyId] = event.target.value.split("--")
        for (const colony of getColonies()){
            if(colony.id === parseInt(colonyId)){
                return `${colony.name}`
            }
        }
    }
})


