//IMPORTS
import { getGoverners } from "./database,js";


//GOVERNER DROP
export const governersFuntion = () => {

    const governers = getGoverners()

    let html = `
    <select class="governers" id="governers">
        <option value="">Choose Governer</option>
        ${ governers.map(governer=> {
            return `<option value="${governer.id}">${governer.name}</option>`
        }).join("")}
    </select>`

    return html
}

//MINERALS RADIO

//PURCHASE BUTTON