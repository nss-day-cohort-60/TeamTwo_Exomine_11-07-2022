//module for displaying purchase button and pushing purchase selection data when pressed, also displays pending purchase
import { getTransientState, purchaseMineral } from "./database.js"
export const Cart = () => {
    const transientState = getTransientState()

    document.addEventListener("click", (event) => {
        if (event.target.id === "purchase") {
            purchaseMineral()
        }
    })    

    return `
    <section class="pendingPurchase">
        <h3>Space Cart</h3>
        <div class="cart">
            1 ton of ${transientState.mineral.name} from ${transientState.facility.name}
        </div>
        <button class="purchase" id="purchase">Purchase Mineral</button>
    </section>`

}