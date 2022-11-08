import { thisIsntEvenMyFinalForm } from "./form.js";

const mainContainer = document.querySelector("#container")

const render = () => {
    mainContainer.innerHTML = thisIsntEvenMyFinalForm()
}

mainContainer.addEventListener(
    "stateChanged", (customEvent) => { render() }
)
render()