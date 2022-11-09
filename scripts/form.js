//IMPORTS
import { colonyInventoryHTML, governorsFunction } from "./colonyInfo.js";
import { facilityDropDown, facilityRadio } from "./facilities.js";
import { Cart } from "./Cart.js";

export const thisIsntEvenMyFinalForm = () => {
    let html = `<section class="biggestBox"> 
    <h1>Space Adventure! (Its An Adventure In Space)</h1>`

    //GOVERNER DROP, colony name, and inventory
    html += `
        <section class="colonyInfo">
            <div>    
                Choose a governor ${governorsFunction()}
            </div>
            <div class="colonyAndInventory">
                ${colonyInventoryHTML()}
            </div>
        </section>`

    //MINERALS RADIO and facility drop
    html+= `<section class="facilityAndCart">`
    html +=
        `<section class="facilityInfo">
            <div class="facilityDropDown">
                ${facilityDropDown()}
            </div>
            <section class="facilityRadio">
                ${facilityRadio()}
            </section>
        </section>`
    //PURCHASE BUTTON and cart
    html +=
        `<section class="cart">
            ${Cart()}
        </section>`
    // console.log(html)

    //closing tags for biggestBox and facilityAndCart
    html+= `</section>
            </section>`
    return html
}