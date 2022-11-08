//module for displaying purchase button and pushing purchase selection data when pressed, also displays pending purchase
import { getTransientState, purchaseMineral, getFacilities } from "./database.js"

// const mainContainer = document.querySelector("#cart")
const errorMessage = () => {window.alert("Please select a mineral to purchase. \n\n If you feel this message has been recieved in error, please find another space mining purchasing organization and tell them about it.")}
document.addEventListener("click", (event) => {
    if (event.target.id === "purchase") {
        try{purchaseMineral()}
        catch {errorMessage()}
    }
})

export const Cart = () => {
    const transientState = getTransientState()
    const facilities = getFacilities()
    
    let html = `
        <section class="pendingPurchase">
            <h3>Space Cart</h3>`

    if (transientState.governorId && transientState.colonyId && transientState.productionId && transientState.mineralName) {
        html += `    
        <div class="cart">
            1 ton of ${transientState.mineralName} from ${facilities.find(facility => facility.id === transientState.productionId).name}
        </div>`}

    html += `<button class="purchase" id="purchase">Purchase Mineral</button>
    </section>`

    return html
}
// mainContainer.innerHTML=Cart()