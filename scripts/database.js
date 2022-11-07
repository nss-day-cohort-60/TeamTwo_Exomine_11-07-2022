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
            id: 3,
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

    transientState: {},

    purchasedMinerals: []


}


export const setGoverner = (governerId) => {
    database.transientState.selectedFacility = governerId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getGoverners = () => {
    return database.governers.map(g => ({ ...g }))
}

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}

export const getTransientState = () => {
    return database.transientState.map(s => ({ ...s }))
}

export const purchaseMineral = () => {
    //add transient state inventory to purchasedMaterials array
    const existingInventoryCheck = () => { 
        const existing = database.purchasedMinerals.filter(pM => {
            return pM.mineralId === database.transientState.mineralId && pM.colonyId === database.transientState.colonyId})

            return existing
    }
    const facilityMineralDeduction = () =>{
        let facilityMineral = database.facilityMinerals.facilityId === database.transientState.facilityId && facilityMinerals.mineralId === database.transientState.mineralId
        facilityMineral.qty--
    }   

    if (existingInventoryCheck().length > 0) {
            existingInventoryCheck().qty ++
    } else {
        const getMaxId = () => {
            return Math.max(...(database.purchasedMinerals.map(mineral => { return mineral.id })))
        }
        database.purchasedMinerals.push[
            {
                id: getMaxId()+1,
                colonyId: database.transientState.colonyId,
                mineralId: database.transientState.mineralId,
                qty: 1
            }
        ]
    }
    //remove inventory from providing mining facility
    facilityMineralDeduction()

    //reset transient state
    database.transientState = {}

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

