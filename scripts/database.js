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
            locationId: 2,
            productionId: 3
        }
    ],

    transientState: {},

    purchasedMinerals:[]


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

export const purchaseMineral = () => {

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

