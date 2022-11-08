//IMPORTS
import { governorsFunction } from "./colonyInfojs";
//import facility html
//import cart html

export const thisIsntEvenMyFinalForm = () => {
    let html = "<h1>Space Adventure! (Its An Adventure In Space)</h1>"

    //GOVERNER DROP, colony name, and inventory
    html += `
        <section class="colonyInfo">
            Choose a governor ${governorsFunction()}
        </section>`

    //MINERALS RADIO and facility drop

    //PURCHASE BUTTON and cart

    return html
}