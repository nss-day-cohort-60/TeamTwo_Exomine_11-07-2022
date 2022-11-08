//IMPORTS
import { getGovernors } from "./database,js";


//GOVERNER DROP
export const governorsFunction = () => {

    const governors = getGovernors()

    let html = `
    <select class="governors" id="governors">
        <option value="">Choose Governor</option>
        ${ governors.map(governor=> {
            return `<option value="${governor.id}">${governor.name}</option>`
        }).join("")}
    </select>`

    return html
}

//MINERALS RADIO

//PURCHASE BUTTON