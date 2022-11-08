import { governorsFunction } from "./colonyInfo.js";
import { facilityDropDown, facilityRadio } from "./facilities.js";
import { Cart } from "./Cart.js";
import { thisIsntEvenMyFinalForm } from "./form.js";
const mainContainer = document.querySelector("#container")
document.addEventListener("stateChanged", (event) => {
    render()
    }
)

const render = () => {
    mainContainer.innerHTML = thisIsntEvenMyFinalForm()
}

mainContainer.innerHTML = thisIsntEvenMyFinalForm()
