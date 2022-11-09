//IMPORTS
import { colonyInventoryHTML, governorsFunction } from "./colonyInfo.js";
import { facilityDropDown, facilityRadio } from "./facilities.js";
import { Cart } from "./Cart.js";

export const thisIsntEvenMyFinalForm = () => {
    let html = "<h1>Space Adventure! (Its An Adventure In Space)</h1>"

    //GOVERNER DROP, colony name, and inventory
    html += `
        <section class="colonyInfo">
            <div>    
                Choose a governor ${governorsFunction()}
            </div>
            <div>
                ${colonyInventoryHTML()}
            </div>
        </section>`

    //MINERALS RADIO and facility drop
    html +=
        `<section class="facilityDropDown">
            ${facilityDropDown()}
        </section>`
    html +=
        `<section class="facilityRadio">
            ${facilityRadio()}
        </section>`
    //PURCHASE BUTTON and cart
    html +=
        `<section class="cart">
            ${Cart()}
        </section>`
    // console.log(html)
    return html
}