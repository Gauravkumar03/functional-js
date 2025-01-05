let store = {
    // user: { name: "Student" },
    // apod: '',
    // rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    curiosityData: {},
    opportunityData: {},
    spiritData: {}
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state, rover) => {
    root.innerHTML = App(state, rover)
}


// create content
const App = (state, rover) => {
    //let { Curiosity, Opportunity, Spirit } = state

    return `
        <header></header>
        <main>
            <section>
                <h3>Put things on the page!</h3>
                <button onclick='curiosityFun(event)'>Curiosity</button>
                <button onclick='opportunityFun()'>Opportunity</button>
                <button onclick='spiritFun()'>Spirit</button>
                ${RoverImage(state, rover)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

function curiosityFun(event) {
    render(root, store, event.target.textContent)
    console.log(store.curiosityData.latest_photos[0])
    console.log(store)
}

function opportunityFun() {
    render(root, store, event.target.textContent)
    console.log(store.opportunityData.latest_photos[0])
}

function spiritFun() {
    render(root, store, event.target.textContent)
    console.log(store.spiritData.latest_photos[0])
}

// ------------------------------------------------------  COMPONENTS

// Example of a pure function that renders infomation requested from the backend
const RoverImage = (state, rover) => {

    if (Object.keys(state.curiosityData).length === 0) {
        fetchRover(store)
        return `<p>...Loading Rover's Data</p>`
    } else if (rover === 'Curiosity') {
        return `
        <p>Launch Date: ${state.curiosityData.latest_photos[0].rover.launch_date}</p>
        <p>Landing Date: ${state.curiosityData.latest_photos[0].rover.landing_date}</p>
        <p>Status: ${state.curiosityData.latest_photos[0].rover.status}</p>
        <p>Recent Available Photo's Date: ${state.curiosityData.latest_photos[0].earth_date}</p>
        <br>
        <img src=${state.curiosityData.latest_photos[0].img_src} alt='Curiosity Image' style='width: 200px; height: 200px'>
        `

    } else if (rover === 'Opportunity') {
        return `
        <p>Launch Date: ${state.opportunityData.latest_photos[0].rover.launch_date}</p>
        <p>Landing Date: ${state.opportunityData.latest_photos[0].rover.landing_date}</p>
        <p>Status: ${state.opportunityData.latest_photos[0].rover.status}</p>
        <p>Recent Available Photo's Date: ${state.opportunityData.latest_photos[0].earth_date}</p>
        <br>
        <img src=${state.opportunityData.latest_photos[0].img_src} alt='Curiosity Image' style='width: 200px; height: 200px'>
        `
    } else if (rover === 'Spirit') {
        return `
        <p>Launch Date: ${state.spiritData.latest_photos[0].rover.launch_date}</p>
        <p>Landing Date: ${state.spiritData.latest_photos[0].rover.landing_date}</p>
        <p>Status: ${state.spiritData.latest_photos[0].rover.status}</p>
        <p>Recent Available Photo's Date: ${state.spiritData.latest_photos[0].earth_date}</p>
        <br>
        <img src=${state.spiritData.latest_photos[0].img_src} alt='Curiosity Image' style='width: 200px; height: 200px'>
        `
    } else {
        return `<p>Loading Complete. Click the button to see the images of rovers you want.</p>`
    }

    // check if the photo of the day is actually type video!
    // if (apod.media_type === "video") {
    //     return (`
    //         <p>See today's featured video <a href="${apod.url}">here</a></p>
    //         <p>${apod.title}</p>
    //         <p>${apod.explanation}</p>
    //     `)
    // } else {
    //     return (`
    //         <img src="${apod.image.url}" height="350px" width="100%" />
    //         <p>${apod.image.explanation}</p>
    //     `)
    // }
    
}

// ------------------------------------------------------  API CALLS

// Example API call
const fetchRover = (state) => {
    console.log('entering this')
    fetch(`http://localhost:3000/roversData`)
        .then(res => res.json())
        .then(data => updateStore(store, data))
        //.then(apod => updateStore(store, { apod }))
}
