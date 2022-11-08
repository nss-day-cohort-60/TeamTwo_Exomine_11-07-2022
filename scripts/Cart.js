//module for displaying purchase button and pushing purchase selection data when pressed, also displays pending purchase
import { getTransientState, purchaseMineral, getFacilities } from "./database.js"

const mainContainer = document.querySelector("#cart")

export const Cart = () => {
    const transientState = getTransientState()
    const facilities = getFacilities()
    document.addEventListener("click", (event) => {
        if (event.target.id === "purchase") {
            purchaseMineral()
        }
    })    

    return `
    <section class="pendingPurchase">
        <h3>Space Cart</h3>
        <div class="cart">
            1 ton of ${transientState.mineralName} from ${facilities.find(facility=>facility.id===transientState.productionId).name}
        </div>
        <button class="purchase" id="purchase">Purchase Mineral</button>
    </section>`

}
mainContainer.innerHTML=Cart()