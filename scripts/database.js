const database = {
    colonies: [
        {
            id: 1,
            name: "Earth",
        },
        {
            id: 3,
            name: "Mars",

        },
        {
            id: 2,
            name: "Europa",

        }
    ],

    governor: [
        {
            id: 1,
            name: "Patricia Purdy",
            colonyId: 1,
            active: true
        },
        {
            id: 2,
            name: "Lola Wolff",
            colonyId: 1,
            active: true
        },
        {
            id: 3,
            name: "Damon Hartmann",
            colonyId: 2,
            active: true
        },
        {
            id: 4,
            name: "Leslie Knope",
            colonyId: 3,
            active: true
        }
    ],

    facilities: [
        {
            id: 1,
            name: "spacebar",
            active: true,

        },
        {
            id: 2,
            name: "Ganymede",
            active: true,

        },
        {
            id: 3,
            name: "Titan",
            active: true,

        },
        {
            id: 4,
            name: "SHHHH",
            active: false,

        }
    ],

    facilityMinerals: [
        {
            id: 1,
            name: "pepsi",
            productionId: 1,
            quantity: 200
        },
        {
            id: 2,
            name: "salt",
            productionId: 1,
            quantity: 40
        },
        {
            id: 3,
            name: "pepsi",
            productionId: 2,
            quantity: 305
        },
        {
            id: 4,
            name: "solid gold",
            productionId: 2,
            quantity: 60
        },
        {
            id: 5,
            name: "solid gold",
            productionId: 3,
            quantity: 80
        },
        {
            id: 6,
            name: "salt",
            productionId: 3,
            quantity: 28
        },
        {
            id: 7,
            name: "pepsi",
            productionId: 4,
            quantity: 500
        },
        {
            id: 8,
            name: "salt",
            productionId: 4,
            quantity: 900
        }
    ],

    transientState: {
        // colonyId:1,
        // productionId: 1, //now only held to pass into setMineral for cart inventory objects
        // mineralName: "salt", //moving to cartMinerals for multimineral purchasing implementation
        // governorId: 1
    },

    purchasedMinerals: [],

    cartMinerals: []
}

export const setMineral = (mineralName) => {
    database.transientState.mineralName = mineralName

    const existingCartMineralCheck = () => {
        const existing = database.cartMinerals.filter(cM => {
            return cM.mineralName === mineralName && cM.productionId === database.transientState.productionId
        })

        return existing
    }
    if (existingCartMineralCheck().length > 0) {
        let existing = existingCartMineralCheck()
        existing[0].quantity++
    } else {
        database.cartMinerals.push({ mineralName: database.transientState.mineralName, productionId: database.transientState.productionId, quantity: 1 })
    }
    // console.log(database.cartMinerals)
    delete database.transientState.mineralName, database.transientState.productionId
    // console.log(database.transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFacilityMinerals = () => {
    return database.facilityMinerals.map(fM => ({ ...fM }))
}
export const getCartMinerals = () => {
    return database.cartMinerals.map(cM => ({ ...cM }))
}

export const getPurchasedMinerals = () => {
    return database.purchasedMinerals.map(pM => ({ ...pM }))
}

export const setGovernor = (governorId) => {
    database.transientState.governorId = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getGovernors = () => {
    return database.governor.map(g => ({ ...g }))
}

export const setColony = (colonyId) => {
    database.transientState.colonyId = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getColonies = () => {
    return database.colonies.map(c => ({ ...c }))
}

export const setFacility = (productionId) => {
    database.transientState.productionId = productionId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}

export const getTransientState = () => {
    return structuredClone(database.transientState)
}

export const purchaseMineral = () => {
    //add transient state inventory to purchasedMaterials array
    //refactored to allow multiple purchases with one button press. Map through cartMinerals to retain as much single purchase code as possible
    let carted = database.cartMinerals

    carted.map(cartObj => {

        const existingInventoryCheck = () => {
            const existing = database.purchasedMinerals.filter(pM => {
                return pM.mineralName === cartObj.mineralName && pM.colonyId === database.transientState.colonyId
            })
            return existing
        }
        const facilityMineralDeduction = () => {
            // let cartMinerals = getCartMinerals()
                let thisFoundMineral = database.facilityMinerals.find(fM => {
                    return fM.productionId === cartObj.productionId && fM.name === cartObj.mineralName
                })
                thisFoundMineral.quantity = thisFoundMineral.quantity - cartObj.quantity
            }
        

        //code commented out from previous single-mineral purchase im[;ementation for new multimineral purchasing]
        // let facilityMineral = database.facilityMinerals.find(fM => {
        //     return fM.productionId == database.transientState.productionId && fM.name == database.transientState.mineralName
        // })
        // console.log(facilityMineral.quantity--)
        // console.log(facilityMineral)
        // facilityMineral.quantity--
        let oldInv = existingInventoryCheck()
        if (oldInv[0]) {
            const foundMineral = existingInventoryCheck()
            foundMineral[0].quantity += cartObj.quantity 
    } else {

            const getMaxId = () => {
                return Math.max(...(database.purchasedMinerals.map(mineral => { return mineral.id })), 0)
            }
            database.purchasedMinerals.push(
                {
                    id: getMaxId() + 1,
                    colonyId: database.transientState.colonyId,
                    mineralName: cartObj.mineralName,
                    quantity: cartObj.quantity
                }
            )

        }
        //remove inventory from providing mining facility
        facilityMineralDeduction()
        console.log(database.purchasedMinerals)
        console.log(database.facilityMinerals[1])
    })
    //reset transient state
    database.cartMinerals = []
    // database.transientState = {}


    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

