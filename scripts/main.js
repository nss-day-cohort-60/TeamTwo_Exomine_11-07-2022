import { governorsFunction } from "./colonyInfo.js";
import { facilityDropDown, facilityRadio } from "./facilities.js";
import { Cart } from "./Cart.js";
const mainContainer = document.querySelector("#container")
document.addEventListener("stateChanged", (event) => {
    render()
    }
)

const render = () => {
    return `
    <div>
    ${governorsFunction()}
    </div>    
    <div>
    ${facilityDropDown()}
    </div>
    <div>
    ${facilityRadio()}
    </div>
    <div>
    ${Cart()}
    </div>`
    
}

mainContainer.innerHTML = render()