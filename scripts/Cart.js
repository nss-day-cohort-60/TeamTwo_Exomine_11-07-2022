//module for displaying purchase button and pushing purchase selection data when pressed, also displays pending purchase
import { getTransientState, purchaseMineral, getFacilities, getCartMinerals } from "./database.js"

// const mainContainer = document.querySelector("#cart")
const errorMessage = () => { window.alert("Please select a mineral to purchase. \n\n If you feel this message has been recieved in error, please find another space mining purchasing organization and tell them about it.") }
document.addEventListener("click", (event) => {
    if (event.target.id === "purchase") {
        try { purchaseMineral() }
        catch { errorMessage() }
    }
})

export const Cart = () => {
    const transientState = getTransientState()
    const facilities = getFacilities()
    const cartMinerals = getCartMinerals()

    const howManyMinerals = (mineralName, productionId) =>{
        return cartMinerals.filter(cM => cM.mineralName === mineralName && cM.productionId === productionId).length+1
    }

    let html = `
        <section class="pendingPurchase">
            <h3>Space Cart</h3>`

    if (transientState.governorId && transientState.colonyId && cartMinerals.length > 0) {
        html += `    
        <div class="cart">
            ${cartMinerals.map(mineral => {
            return `<div class="cartItem">
            ${mineral.quantity} tons of ${mineral.mineralName} from ${facilities.find(facility => facility.id === mineral.productionId).name}
            </div>`
        }).join("")}
        <div>`
        }             

    html += `<button class="purchase" id="purchase">Purchase Mineral</button>
    </section>`

    return html
}
// mainContainer.innerHTML=Cart()