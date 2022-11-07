const database = {
    transientState: {}, 

    colonies: [
        {
            id: 1,
            name: "Earth",
            minerals: [
                {
                    id: 1,
                    name: "salt",
                    qty: 0
                },{
                    id: 2,
                    name: "solid Gold",
                    qty: 1
                },{
                    id: 3,
                    name: "pepper",
                    qty: 1
                }
            ]

        },
        {
            id: 3,
            name: "Mars",
            minerals: [
                {
                    id: 1,
                    name: "pepper",
                    qty: 0
                },{
                    id: 2,
                    name: "solid Gold",
                    qty: 1
                },{
                    id: 3,
                    name: "salt",
                    qty: 1
                }
            ]

        },
        {
            id: 3,
            name: "Europa",
            minerals: [
                {
                    id: 1,
                    name: "pepper",
                    qty: 0
                },{
                    id: 2,
                    name: "solid Gold",
                    qty: 1
                },{
                    id: 3,
                    name: "salt",
                    qty: 1
                }
            ]

        }
    ],
    governors: [
        {
            id: 1,
            name: "Skip Governorson",
            colonyId: 1,
            active: true
        },{
            id: 2,
            name: "Skip Governorson",
            colonyId: 1,
            active: true
        },
    ]
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

